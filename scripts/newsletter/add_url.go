// Meta URL router for the mt-add-url skill — the single entry per URL.
// Usage: go run ./scripts/newsletter add-url "<url>"
// Outputs: JSON { original_url, clean_url, http_status, accessible,
//
//	duplicate, route, title?, author? }
//
// route ∈ youtube | image | video | document | article
package main

import (
	"encoding/json"
	"fmt"
	"net/url"
	"os"
	"path/filepath"
	"strings"
	"time"
)

// contentDir is repo-root relative (invocation contract: run from repo root).
func contentDir() string {
	return filepath.Join("content", "post")
}

var ytHosts = map[string]bool{
	"youtube.com":     true,
	"www.youtube.com": true,
	"m.youtube.com":   true,
}

// detectYouTube extracts a video id from the supported URL shapes:
// youtube.com/watch?v=ID, youtu.be/ID, youtube.com/shorts/ID.
// Playlists/channels are intentionally NOT YouTube routes (fall through to type).
func detectYouTube(target string) (bool, string) {
	u, err := url.Parse(target)
	if err != nil {
		return false, ""
	}
	host := strings.ToLower(u.Host)
	if host == "youtu.be" {
		id := strings.SplitN(strings.TrimPrefix(u.Path, "/"), "/", 2)[0]
		return id != "", id
	}
	if ytHosts[host] {
		if u.Path == "/watch" {
			id := u.Query().Get("v")
			return id != "", id
		}
		if strings.HasPrefix(u.Path, "/shorts/") {
			parts := strings.Split(u.Path, "/")
			if len(parts) > 2 && parts[2] != "" {
				return true, parts[2]
			}
		}
	}
	return false, ""
}

// canonicalWatchURL — oEmbed accepts watch URLs reliably for all shapes.
func canonicalWatchURL(videoID string) string {
	return "https://www.youtube.com/watch?v=" + videoID
}

// fetchYouTubeMeta fetches title/author via YouTube oEmbed (no API key).
// Best-effort: any failure returns empty strings so the route stays `youtube`
// and the skill can fall back.
func fetchYouTubeMeta(watchURL string) (title, author string) {
	endpoint := "https://www.youtube.com/oembed?url=" + url.QueryEscape(watchURL) + "&format=json"
	body := fetchTextOK(endpoint, 10*time.Second, "")
	if body == "" {
		return "", ""
	}
	var data struct {
		Title  string `json:"title"`
		Author string `json:"author_name"`
	}
	if json.Unmarshal([]byte(body), &data) != nil {
		return "", ""
	}
	return data.Title, data.Author
}

type addURLOutput struct {
	OriginalURL string `json:"original_url"`
	CleanURL    string `json:"clean_url"`
	HTTPStatus  string `json:"http_status"`
	Accessible  bool   `json:"accessible"`
	Duplicate   bool   `json:"duplicate"`
	Route       string `json:"route"`
	Title       string `json:"title,omitempty"`
	Author      string `json:"author,omitempty"`
}

func runAddURL(args []string) {
	if len(args) < 1 || args[0] == "" {
		fmt.Fprintln(os.Stderr, "Usage: go run ./scripts/newsletter add-url <url>")
		os.Exit(1)
	}
	target := args[0]

	cleaned := cleanURL(target)
	isYT, videoID := detectYouTube(cleaned)

	// For YouTube, dedup/store against the canonical watch URL so youtu.be and
	// shorts links collapse onto the same identity-param key as watch URLs.
	effectiveURL := cleaned
	if isYT {
		effectiveURL = canonicalWatchURL(videoID)
	}

	// Route order: YouTube → Substack image (by host, not extension, so f_auto /
	// .avif / .heic / extensionless CDN URLs still route to the image handler) →
	// file-extension classification.
	var route string
	switch {
	case isYT:
		route = "youtube"
	case isSubstackImage(cleaned):
		route = "image"
	default:
		route = classifyType(cleaned)
	}

	httpStatus := checkAccessibility(cleaned)

	out := addURLOutput{
		OriginalURL: target,
		CleanURL:    effectiveURL,
		HTTPStatus:  httpStatus,
		Accessible:  httpStatus == "200",
		Duplicate:   checkDuplicate(effectiveURL, contentDir()),
		Route:       route,
	}
	if route == "youtube" {
		out.Title, out.Author = fetchYouTubeMeta(effectiveURL)
	}
	printJSON(out)
}
