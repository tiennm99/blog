// Find the most recent newsletter number and return the next one.
// Usage: go run ./scripts/newsletter find-newsletter-number
// Outputs: the next newsletter number.
package main

import (
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"sort"
	"strconv"
)

var (
	newsletterNumRe = regexp.MustCompile(`Newsletter\s*#(\d+)`)
	yearDirRe       = regexp.MustCompile(`^\d{4}$`)
	twoDigitDirRe   = regexp.MustCompile(`^\d{2}$`)
)

// listDirsDesc returns dir's subdirectory names matching re, sorted descending.
func listDirsDesc(dir string, re *regexp.Regexp) []string {
	entries, err := os.ReadDir(dir)
	if err != nil {
		return nil
	}
	var names []string
	for _, e := range entries {
		if re.MatchString(e.Name()) {
			names = append(names, e.Name())
		}
	}
	sort.Sort(sort.Reverse(sort.StringSlice(names)))
	return names
}

func extractNewsletterNumber(path string) int {
	content, err := os.ReadFile(path)
	if err != nil {
		return 0
	}
	m := newsletterNumRe.FindSubmatch(content)
	if m == nil {
		return 0
	}
	n, err := strconv.Atoi(string(m[1]))
	if err != nil {
		return 0
	}
	return n
}

// findMostRecentNewsletter scans year/month/day directories newest-first for
// the highest newsletter number.
func findMostRecentNewsletter() int {
	maxNumber := 0
	for _, year := range listDirsDesc(contentDir(), yearDirRe) {
		yearDir := filepath.Join(contentDir(), year)
		for _, month := range listDirsDesc(yearDir, twoDigitDirRe) {
			monthDir := filepath.Join(yearDir, month)
			for _, day := range listDirsDesc(monthDir, twoDigitDirRe) {
				if n := extractNewsletterNumber(filepath.Join(monthDir, day, "index.md")); n > maxNumber {
					maxNumber = n
				}
			}
		}
		// Early exit: a newsletter found in this year — no need to go further back.
		if maxNumber > 0 {
			break
		}
	}
	return maxNumber
}

func runFindNewsletterNumber(_ []string) {
	fmt.Println(findMostRecentNewsletter() + 1)
}
