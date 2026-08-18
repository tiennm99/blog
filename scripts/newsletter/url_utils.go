// Shared URL helpers, ported from url-utils.js. Owned by the add-url router;
// reused by the other subcommands.
package main

import (
	"io"
	"io/fs"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"regexp"
	"strconv"
	"strings"
	"time"
)

// Exact-match tracking params; any key starting with utm_ is also dropped.
var exactTracking = map[string]bool{
	"fbclid": true, "gclid": true, "msclkid": true, "mc_eid": true,
	"aid": true, "ref": true, "ref_src": true, "ref_url": true, "source": true, "s": true,
	"ck_subscriber_id": true, "igshid": true, "yclid": true, "vero_id": true,
}

// cleanURL removes common tracking parameters. Surviving query pairs are kept
// verbatim (no re-encoding) and in their original order — Go's url.Values
// would sort keys alphabetically, which must not leak into stored clean_url
// values. Unparseable / non-absolute input is returned untouched rather than
// corrupted.
func cleanURL(raw string) string {
	u, err := url.Parse(raw)
	if err != nil || u.Scheme == "" || u.Host == "" {
		return raw
	}
	u.Host = strings.ToLower(u.Host)
	// WHATWG URL serializes an empty path as "/"; keep that shape so cleaned
	// URLs match what the JS engine has already written into posts.
	if u.Path == "" {
		u.Path = "/"
	}
	if u.RawQuery != "" {
		var kept []string
		for _, pair := range strings.Split(u.RawQuery, "&") {
			if pair == "" {
				continue
			}
			key := pair
			if i := strings.IndexByte(pair, '='); i != -1 {
				key = pair[:i]
			}
			k := strings.ToLower(key)
			if strings.HasPrefix(k, "utm_") || exactTracking[k] {
				continue
			}
			kept = append(kept, pair)
		}
		u.RawQuery = strings.Join(kept, "&")
	}
	u.ForceQuery = false
	return u.String()
}

// --- Substack image helpers (shared by add-url routing and detect-image-source) ---

var substackImageHosts = map[string]bool{
	"substackcdn.com":                      true,
	"substack-post-media.s3.amazonaws.com": true,
}

const uuidPattern = `[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}`

var (
	imageUUIDRe = regexp.MustCompile(`(?i)images(?:%2F|/)(` + uuidPattern + `)`)
	uuidExactRe = regexp.MustCompile(`(?i)^` + uuidPattern + `$`)
)

// isSubstackImage reports a Substack-hosted image (CDN wrapper or raw S3),
// regardless of file extension.
func isSubstackImage(target string) bool {
	host := ""
	if u, err := url.Parse(target); err == nil {
		host = strings.ToLower(u.Host)
	}
	return substackImageHosts[host] || strings.Contains(strings.ToLower(target), "substack-post-media")
}

// substackImageUUID extracts the stable image identity: the S3 image UUID
// under public/images/<uuid>, with raw (/) or percent-encoded (%2F) separators.
// Returns "" when absent.
func substackImageUUID(target string) string {
	m := imageUUIDRe.FindStringSubmatch(target)
	if m == nil {
		return ""
	}
	return strings.ToLower(m[1])
}

// Some sites carry the resource identity in a query param, not the path
// (e.g. YouTube /watch?v=ID). Preserve the identity param for those hosts so
// dedup does not collapse every video onto the same bare URL.
var identityParams = map[string]string{
	"youtube.com":     "v",
	"www.youtube.com": "v",
	"m.youtube.com":   "v",
}

// bareURL reduces a URL to a stable identity for duplicate detection:
//   - Substack image  → its S3 UUID (transform/size variants share one identity)
//   - YouTube         → scheme+host+path + the v= video id
//   - everything else → scheme + host + path
func bareURL(target string) string {
	if isSubstackImage(target) {
		if uuid := substackImageUUID(target); uuid != "" {
			return uuid
		}
	}
	u, err := url.Parse(target)
	if err != nil || u.Scheme == "" || u.Host == "" {
		return strings.TrimSuffix(strings.SplitN(target, "?", 2)[0], "/")
	}
	host := strings.ToLower(u.Host)
	bare := strings.TrimSuffix(u.Scheme+"://"+host+u.EscapedPath(), "/")
	if idParam, ok := identityParams[host]; ok {
		if v := u.Query().Get(idParam); v != "" {
			bare += "?" + idParam + "=" + v
		}
	}
	return bare
}

// fetchTextOK GETs target and returns the body on a 2xx response, "" on any
// error, non-2xx status, or timeout. Redirects are followed.
func fetchTextOK(target string, timeout time.Duration, userAgent string) string {
	req, err := http.NewRequest(http.MethodGet, target, nil)
	if err != nil {
		return ""
	}
	if userAgent != "" {
		req.Header.Set("User-Agent", userAgent)
	}
	res, err := (&http.Client{Timeout: timeout}).Do(req)
	if err != nil {
		return ""
	}
	defer res.Body.Close()
	if res.StatusCode < 200 || res.StatusCode >= 300 {
		return ""
	}
	body, err := io.ReadAll(res.Body)
	if err != nil {
		return ""
	}
	return string(body)
}

// checkAccessibility HEADs the URL and returns the final HTTP status code as a
// string, or "000" on network error / timeout (matching the JS sentinel).
func checkAccessibility(target string) string {
	req, err := http.NewRequest(http.MethodHead, target, nil)
	if err != nil {
		return "000"
	}
	res, err := (&http.Client{Timeout: 10 * time.Second}).Do(req)
	if err != nil {
		return "000"
	}
	res.Body.Close()
	return strconv.Itoa(res.StatusCode)
}

// collectMarkdown recursively collects *.md files under dir (the content tree
// is small). Missing or unreadable directories yield nothing.
func collectMarkdown(dir string) []string {
	var acc []string
	_ = filepath.WalkDir(dir, func(p string, d fs.DirEntry, err error) error {
		if err != nil {
			return nil // skip unreadable entries
		}
		if !d.IsDir() && strings.HasSuffix(strings.ToLower(d.Name()), ".md") {
			acc = append(acc, p)
		}
		return nil
	})
	return acc
}

// uuidBoundaryOK: the char after a UUID match must not extend the hex id, so
// <uuid>.png (cover image), <uuid>_WxH and <uuid>) all match.
func uuidBoundaryOK(text string, end int) bool {
	if end >= len(text) {
		return true
	}
	c := text[end]
	return !((c >= '0' && c <= '9') || (c >= 'a' && c <= 'f') || (c >= 'A' && c <= 'F'))
}

// urlBoundaryOK: an optional trailing slash (bareURL strips it, stored URLs may
// keep it), then a path/punctuation delimiter, whitespace, or end of text — so
// /p/foo does not match a stored /p/foo-bar. The '>' delimiter covers URLs
// stored in markdown autolink form <https://…>, which older posts use.
func urlBoundaryOK(text string, end int) bool {
	if end < len(text) && text[end] == '/' {
		end++
	}
	if end >= len(text) {
		return true
	}
	switch c := text[end]; c {
	case ' ', '\t', '\n', '\r', '\f', '\v':
		return true
	default:
		return strings.IndexByte(`)]"'?#<>_&,`, c) != -1
	}
}

// hasBoundaryMatch scans every occurrence of needle and applies the boundary
// check in code — Go's RE2 regexp has no lookahead, which the JS version used.
func hasBoundaryMatch(text, needle string, isUUID bool) bool {
	for from := 0; ; {
		i := strings.Index(text[from:], needle)
		if i == -1 {
			return false
		}
		end := from + i + len(needle)
		if isUUID {
			if uuidBoundaryOK(text, end) {
				return true
			}
		} else if urlBoundaryOK(text, end) {
			return true
		}
		from = from + i + 1
	}
}

// checkDuplicate reports whether a URL identity already exists in the stored
// markdown, boundary-aware so a needle that is merely a PREFIX of a stored
// longer string is NOT a false duplicate.
func checkDuplicate(target, contentDir string) bool {
	needle := bareURL(target)
	if needle == "" {
		return false
	}
	isUUID := uuidExactRe.MatchString(needle)
	for _, file := range collectMarkdown(contentDir) {
		data, err := os.ReadFile(file)
		if err != nil {
			continue
		}
		text := string(data)
		if strings.Contains(text, needle) && hasBoundaryMatch(text, needle, isUUID) {
			return true
		}
	}
	return false
}

var (
	imageExtRe    = regexp.MustCompile(`\.(png|jpg|jpeg|gif|webp|svg|avif|heic|heif|bmp|tiff?)(\?.*)?$`)
	videoExtRe    = regexp.MustCompile(`\.(mp4|webm|mov|avi|mkv)(\?.*)?$`)
	documentExtRe = regexp.MustCompile(`\.(pdf|docx?|xlsx?|pptx?)(\?.*)?$`)
)

// classifyType classifies a URL by file extension: image|video|document|article.
func classifyType(target string) string {
	lower := strings.ToLower(target)
	switch {
	case imageExtRe.MatchString(lower):
		return "image"
	case videoExtRe.MatchString(lower):
		return "video"
	case documentExtRe.MatchString(lower):
		return "document"
	default:
		return "article"
	}
}
