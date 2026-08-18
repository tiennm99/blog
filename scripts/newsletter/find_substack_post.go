// Find which Substack post embeds a given image UUID, and extract a label.
// Usage: go run ./scripts/newsletter find-substack-post --uuid <uuid> [--deep]
// Output on hit:  JSON { found:true, source, publication, postTitle, postUrl, caption, candidates }
// Output on miss: JSON { found:false } (RSS) or { found:false, source:"sitemap", scanned, budget, cutoff } (--deep)
//
// Strategy: RSS feed first (fast, ~recent weeks). With --deep, fall back to a
// heavier sitemap crawl up to ~3 months back — opt-in because it fetches many
// posts. A Substack CDN URL does not encode its publication, so we search each
// publication listed in config/substack-publications.json (embedded at build
// time; `go run` recompiles on change, so editing the JSON still takes effect).
package main

import (
	_ "embed"
	"encoding/json"
	"flag"
	"fmt"
	"os"
	"regexp"
	"sort"
	"strings"
	"time"
)

//go:embed config/substack-publications.json
var publicationsJSON []byte

func loadPublications() []string {
	var pubs []string
	if err := json.Unmarshal(publicationsJSON, &pubs); err != nil || len(pubs) == 0 {
		return []string{"blog.bytebytego.com"}
	}
	return pubs
}

// fetchPage: body text with a browser-ish UA, or "" on any error.
func fetchPage(target string) string {
	return fetchTextOK(target, 10*time.Second, "Mozilla/5.0")
}

// Total post fetches allowed across ALL publications during a --deep crawl.
const deepFetchBudget = 40

type postHit struct {
	Found       bool     `json:"found"`
	Source      string   `json:"source"`
	Publication string   `json:"publication"`
	PostTitle   string   `json:"postTitle"`
	PostURL     string   `json:"postUrl"`
	Caption     string   `json:"caption"`
	Candidates  []string `json:"candidates"`
}

var (
	locRe     = regexp.MustCompile(`<loc>([^<]+)</loc>`)
	lastmodRe = regexp.MustCompile(`<lastmod>([^<]+)</lastmod>`)
)

func parseLastmod(s string) (time.Time, bool) {
	for _, layout := range []string{time.RFC3339, "2006-01-02"} {
		if t, err := time.Parse(layout, s); err == nil {
			return t, true
		}
	}
	return time.Time{}, false
}

// searchSitemap is the deep fallback: crawl the sitemap back ~3 months, fetch
// posts most-recent-first (up to maxFetch from the shared budget), and look
// for the UUID. Heavier than RSS — only used on RSS miss.
// cutoff is "" when the sitemap itself could not be fetched.
func searchSitemap(publication, id string, maxFetch int) (hit *postHit, scanned int, cutoff string) {
	xml := fetchPage("https://" + publication + "/sitemap.xml")
	if xml == "" {
		return nil, 0, ""
	}

	cutoffTime := time.Now().UTC().AddDate(0, -3, 0)
	cutoff = cutoffTime.Format("2006-01-02")

	type candidate struct {
		url  string
		when time.Time
	}
	var candidates []candidate
	for _, block := range strings.Split(xml, "<url>")[1:] {
		loc := locRe.FindStringSubmatch(block)
		lastmod := lastmodRe.FindStringSubmatch(block)
		if loc == nil || lastmod == nil {
			continue
		}
		if !strings.Contains(loc[1], "/p/") { // posts only
			continue
		}
		when, ok := parseLastmod(lastmod[1])
		if !ok || when.Before(cutoffTime) {
			continue
		}
		candidates = append(candidates, candidate{url: loc[1], when: when})
	}
	sort.SliceStable(candidates, func(i, j int) bool {
		return candidates[i].when.After(candidates[j].when)
	})

	if len(candidates) > maxFetch {
		candidates = candidates[:maxFetch]
	}
	for _, c := range candidates {
		scanned++
		html := fetchPage(c.url)
		if html == "" || !strings.Contains(html, id) {
			continue
		}
		return &postHit{
			Found:       true,
			Source:      "sitemap",
			Publication: publication,
			PostTitle:   postTitleFromHTML(html),
			PostURL:     c.url,
			Caption:     captionForUUID(html, id),
			Candidates:  extractCandidates(html),
		}, scanned, cutoff
	}
	return nil, scanned, cutoff
}

func searchRSS(publication, id string) *postHit {
	xml := fetchPage("https://" + publication + "/feed")
	if xml == "" {
		return nil
	}
	for _, item := range strings.Split(xml, "<item>")[1:] {
		if !strings.Contains(item, id) {
			continue
		}
		return &postHit{
			Found:       true,
			Source:      "rss",
			Publication: publication,
			PostTitle:   itemTitle(item),
			PostURL:     itemLink(item),
			Caption:     captionForUUID(item, id),
			Candidates:  extractCandidates(item),
		}
	}
	return nil
}

func runFindSubstackPost(args []string) {
	fs := flag.NewFlagSet("find-substack-post", flag.ExitOnError)
	uuid := fs.String("uuid", "", "Substack S3 image uuid to search for")
	deep := fs.Bool("deep", false, "fall back to a sitemap crawl (~3 months back)")
	_ = fs.Parse(args)

	if *uuid == "" {
		fmt.Fprintln(os.Stderr, "Usage: go run ./scripts/newsletter find-substack-post --uuid <uuid> [--deep]")
		os.Exit(1)
	}

	publications := loadPublications()
	for _, pub := range publications {
		if hit := searchRSS(pub, *uuid); hit != nil {
			printJSON(hit)
			return
		}
	}

	// Deep fallback: sitemap crawl up to ~3 months back, sharing one global
	// fetch budget across all publications so coverage can't blow up as the
	// publications list grows.
	if *deep {
		totalScanned := 0
		var lastCutoff *string
		for _, pub := range publications {
			remaining := deepFetchBudget - totalScanned
			if remaining <= 0 {
				break
			}
			hit, scanned, cutoff := searchSitemap(pub, *uuid, remaining)
			totalScanned += scanned
			if cutoff != "" {
				lastCutoff = &cutoff
			}
			if hit != nil {
				printJSON(hit)
				return
			}
		}
		printJSON(struct {
			Found   bool    `json:"found"`
			Source  string  `json:"source"`
			Scanned int     `json:"scanned"`
			Budget  int     `json:"budget"`
			Cutoff  *string `json:"cutoff"`
		}{false, "sitemap", totalScanned, deepFetchBudget, lastCutoff})
		return
	}

	printJSON(struct {
		Found bool `json:"found"`
	}{false})
}
