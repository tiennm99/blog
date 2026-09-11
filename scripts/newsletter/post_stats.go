// Count the entries already present in a newsletter post, so a handler can
// report a running tally after each insertion.
// Usage: go run ./scripts/newsletter post-stats <path/to/index.md>
// Outputs: JSON { post, newsletter, articles, images, videos, documents, total }
package main

import (
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
)

// Entry shapes, per the Bonus format in the shared post mechanics:
//
//	articles   "## [Title](url)"        (level-2 heading, main content)
//	images     "![label](url)"          (under **Images:**)
//	videos     "[Title](url)"           (under **Videos:**)
//	documents  "[PDF: title](url)"      (under **Documents:**)
var (
	articleHeadingRe = regexp.MustCompile(`^##\s+\[`)
	bonusHeadingRe   = regexp.MustCompile(`^###\s+Bonus\b`)
	subsectionRe     = regexp.MustCompile(`^\*\*(Images|Videos|Documents):\*\*`)
	imageEntryRe     = regexp.MustCompile(`^!\[`)
	linkEntryRe      = regexp.MustCompile(`^\[`)
)

type postStats struct {
	Post       string `json:"post"`
	Newsletter int    `json:"newsletter"`
	Articles   int    `json:"articles"`
	Images     int    `json:"images"`
	Videos     int    `json:"videos"`
	Documents  int    `json:"documents"`
	Total      int    `json:"total"`
}

// countPostEntries walks the post once. Article headings are counted anywhere
// outside Bonus; asset entries are attributed to whichever subsection is open.
func countPostEntries(content string) postStats {
	var s postStats
	inBonus := false
	subsection := ""

	for _, raw := range strings.Split(content, "\n") {
		line := strings.TrimSpace(raw)
		switch {
		case bonusHeadingRe.MatchString(line):
			inBonus = true
			subsection = ""
			continue
		case subsectionRe.MatchString(line):
			subsection = subsectionRe.FindStringSubmatch(line)[1]
			continue
		case articleHeadingRe.MatchString(line):
			s.Articles++
			continue
		}
		if !inBonus {
			continue
		}
		switch subsection {
		case "Images":
			if imageEntryRe.MatchString(line) {
				s.Images++
			}
		case "Videos":
			// A direct video file entry looks the same as a YouTube entry;
			// both belong to the Videos tally.
			if linkEntryRe.MatchString(line) {
				s.Videos++
			}
		case "Documents":
			if linkEntryRe.MatchString(line) {
				s.Documents++
			}
		}
	}
	s.Total = s.Articles + s.Images + s.Videos + s.Documents
	return s
}

func runPostStats(args []string) {
	if len(args) < 1 {
		fmt.Fprintln(os.Stderr, "usage: post-stats <path/to/index.md>")
		os.Exit(1)
	}
	path := args[0]
	content, err := os.ReadFile(path)
	if err != nil {
		fmt.Fprintln(os.Stderr, "read post:", err)
		os.Exit(1)
	}
	stats := countPostEntries(string(content))
	stats.Post = path
	if m := newsletterNumRe.FindSubmatch(content); m != nil {
		stats.Newsletter, _ = strconv.Atoi(string(m[1]))
	}
	printJSON(stats)
}
