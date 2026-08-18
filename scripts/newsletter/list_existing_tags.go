// List existing tags in the repo ranked by frequency.
// Usage: go run ./scripts/newsletter list-existing-tags
// Outputs: tag count and name, sorted most-used first (top 40).
//
// NOTE: not currently used by the mt-add-tags skill. Tag normalization is
// disabled until existing posts have standardized tags; to enable, uncomment
// step 4a in that skill's SKILL.md.
package main

import (
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"regexp"
	"sort"
)

var (
	tagsLineRe  = regexp.MustCompile(`(?m)^tags:\s*\[([^\]]*)\]`)
	quotedTagRe = regexp.MustCompile(`"([^"]+)"`)
)

// extractTags pulls quoted tag strings from an index.md frontmatter tags array.
func extractTags(path string) []string {
	content, err := os.ReadFile(path)
	if err != nil {
		return nil
	}
	m := tagsLineRe.FindSubmatch(content)
	if m == nil {
		return nil
	}
	var tags []string
	for _, q := range quotedTagRe.FindAllSubmatch(m[1], -1) {
		tags = append(tags, string(q[1]))
	}
	return tags
}

func runListExistingTags(_ []string) {
	type tagCount struct {
		tag   string
		count int
	}
	// Slice + index map keeps first-seen order for equal counts, so the stable
	// sort below ranks ties deterministically (walk order is lexical).
	var counts []tagCount
	index := map[string]int{}

	_ = filepath.WalkDir(contentDir(), func(p string, d fs.DirEntry, err error) error {
		if err != nil || d.IsDir() || d.Name() != "index.md" {
			return nil
		}
		for _, tag := range extractTags(p) {
			if i, ok := index[tag]; ok {
				counts[i].count++
			} else {
				index[tag] = len(counts)
				counts = append(counts, tagCount{tag: tag, count: 1})
			}
		}
		return nil
	})

	sort.SliceStable(counts, func(i, j int) bool {
		return counts[i].count > counts[j].count
	})
	if len(counts) > 40 {
		counts = counts[:40]
	}
	for _, tc := range counts {
		fmt.Printf("%6d %s\n", tc.count, tc.tag)
	}
}
