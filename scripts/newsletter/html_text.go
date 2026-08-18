// HTML / RSS text-extraction helpers for find-substack-post, ported from
// html-text-utils.js. Pure string functions — no network, no fs.
package main

import (
	"html"
	"regexp"
	"strings"
	"unicode/utf8"
)

var (
	tagRe        = regexp.MustCompile(`<[^>]+>`)
	spaceRe      = regexp.MustCompile(`\s+`)
	titleTagRe   = regexp.MustCompile(`(?s)<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?</title>`)
	linkTagRe    = regexp.MustCompile(`(?s)<link>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?</link>`)
	liRe         = regexp.MustCompile(`(?s)<li[^>]*>\s*(?:<p[^>]*>)?(.*?)(?:</p>)?\s*</li>`)
	figcaptionRe = regexp.MustCompile(`(?s)<figcaption[^>]*>(.*?)</figcaption>`)
	ogTitleRe    = regexp.MustCompile(`(?i)<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']`)
	h1Re         = regexp.MustCompile(`(?is)<h1[^>]*>(.*?)</h1>`)
	htmlTitleRe  = regexp.MustCompile(`(?is)<title>(.*?)</title>`)
)

// decodeEntities decodes HTML entities (named, numeric, hex) and trims.
// html.UnescapeString covers a superset of the entity map the JS hand-rolled.
func decodeEntities(s string) string {
	return strings.TrimSpace(html.UnescapeString(s))
}

func stripTags(s string) string {
	return strings.TrimSpace(spaceRe.ReplaceAllString(decodeEntities(tagRe.ReplaceAllString(s, "")), " "))
}

// itemTitle pulls the first <title> (CDATA or plain) from an RSS <item> chunk.
func itemTitle(item string) string {
	m := titleTagRe.FindStringSubmatch(item)
	if m == nil {
		return ""
	}
	return decodeEntities(m[1])
}

// itemLink pulls the first <link> (CDATA or plain) from an RSS <item> chunk.
func itemLink(item string) string {
	m := linkTagRe.FindStringSubmatch(item)
	if m == nil {
		return ""
	}
	return strings.TrimSpace(m[1])
}

// extractCandidates pulls candidate topic titles from a post's TOC bullet
// list. ByteByteGo does not attach captions to images — the topic titles live
// only in the "in this issue" bullets, and image→title cannot be mapped
// automatically (sponsor/video items interleave), so these are surfaced for
// the user to pick from. Light filtering keeps the list short: dedupe, drop
// sub-point explanations and over-long lines.
func extractCandidates(htmlSrc string) []string {
	seen := map[string]bool{}
	out := []string{} // non-nil: marshals as [] like the JS output
	for _, m := range liRe.FindAllStringSubmatch(htmlSrc, -1) {
		text := stripTags(m[1])
		if text == "" {
			continue
		}
		// titles are short; long lines are sub-point explanations
		if n := utf8.RuneCountInString(text); n < 6 || n > 70 {
			continue
		}
		key := strings.ToLower(text)
		if seen[key] { // content is duplicated in the page
			continue
		}
		seen[key] = true
		out = append(out, text)
	}
	return out
}

// captionForUUID returns the <figcaption> text of the <figure> containing the
// UUID. Cover images live in <enclosure> (no figure) → "".
func captionForUUID(item, id string) string {
	at := strings.Index(item, id)
	if at == -1 {
		return ""
	}
	figStart := strings.LastIndex(item[:at], "<figure")
	if figStart == -1 {
		return ""
	}
	rel := strings.Index(item[at:], "</figure>")
	if rel == -1 {
		return ""
	}
	figure := item[figStart : at+rel]
	m := figcaptionRe.FindStringSubmatch(figure)
	if m == nil {
		return ""
	}
	return stripTags(m[1])
}

// postTitleFromHTML extracts a post title from server-rendered post HTML
// (og:title preferred, then <h1>, then <title>).
func postTitleFromHTML(htmlSrc string) string {
	if m := ogTitleRe.FindStringSubmatch(htmlSrc); m != nil {
		return decodeEntities(m[1])
	}
	if m := h1Re.FindStringSubmatch(htmlSrc); m != nil {
		return stripTags(m[1])
	}
	if m := htmlTitleRe.FindStringSubmatch(htmlSrc); m != nil {
		return decodeEntities(m[1])
	}
	return ""
}
