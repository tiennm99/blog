# Phase 1 — Port to Go

## Context

- Source: `scripts/newsletter/*.js` (8 files, ~740 LoC, Node stdlib only, CommonJS).
- Read first: all JS files, `AGENTS.md` (Shared Engine section), `docs/multi-tool-usage.md`.
- Go 1.26.5 available (linux/arm64). No existing `go.mod` anywhere in the repo.

## Files to Create

```
go.mod                                      module github.com/tiennm99/miti99, go 1.26
scripts/newsletter/main.go                  subcommand dispatch + usage text
scripts/newsletter/url_utils.go             cleanUrl, bareUrl, isSubstackImage, substackImageUuid,
                                            httpGet/httpHead helpers, checkAccessibility,
                                            checkDuplicate, classifyType, collectMarkdown
scripts/newsletter/html_text.go             stripTags, itemTitle, itemLink, extractCandidates,
                                            captionForUuid, postTitleFromHtml
scripts/newsletter/add_url.go               add-url: YouTube detect, oEmbed meta, route JSON
scripts/newsletter/detect_image_source.go   detect-image-source: CDN unwrap + uuid JSON
scripts/newsletter/find_substack_post.go    find-substack-post: RSS search, --deep sitemap crawl
scripts/newsletter/find_newsletter_number.go find-newsletter-number: scan YYYY/MM/DD, print max+1
scripts/newsletter/list_existing_tags.go    list-existing-tags: frontmatter tag frequency top-40
scripts/newsletter/fetch_via_defuddle.go    fetch-via-defuddle: proxy fetch, exit codes 0/1/2
```

`scripts/newsletter/config/substack-publications.json` — unchanged, loaded via `go:embed` (fallback `["blog.bytebytego.com"]` on parse error, matching JS).

All files are one `package main`; no `internal/` packaging (KISS — this is a script bundle, not a library).

## Implementation Steps

1. `go.mod` at repo root; verify `hugo` build still works untouched (it should — no `[module]` config in use).
2. `main.go`: `os.Args[1]` switch → handler funcs; unknown/missing subcommand prints usage to stderr, exit 1.
3. Port `url-utils.js` → `url_utils.go`. See parity traps below — this file has all the hard ones.
4. Port `html-text-utils.js` → `html_text.go`. Use `html.UnescapeString` (stdlib) instead of hand-rolled `decodeEntities` — strictly more complete, acceptable improvement.
5. Port the 6 entrypoints. JSON output via structs + `json.MarshalIndent(v, "", "  ")` with field order matching the JS key order; optional fields (`title`, `author`, `uuid`, `innerUrl`, `caption`…) use `omitempty` to reproduce JS's conditional key emission. **Skills parse these JSON shapes — field names are a public contract.**
6. `gofmt` + `go vet ./scripts/newsletter/`.

## Parity Traps (must handle explicitly)

| # | JS behavior | Go trap | Resolution |
|---|-------------|---------|------------|
| 1 | `checkDuplicate` boundary regexes use negative lookahead `(?![0-9a-f])` | RE2 has **no lookahead** | Scan `strings.Index` occurrences of the needle; check the following byte(s) in code: uuid → next char ∉ `[0-9a-f]`; URL → optional `/` then one of `)]"'?#<_&,` whitespace or end |
| 2 | `cleanUrl` rebuilds query via `URLSearchParams` preserving insertion order | `url.Values.Encode()` **sorts keys alphabetically** | Split `RawQuery` on `&`, drop `utm_*`/tracker keys (case-insensitive match on the key before `=`), rejoin the surviving pairs verbatim. Closer to "don't corrupt" than JS re-encoding; document any percent-encoding drift in phase 2 |
| 3 | `new URL()` lowercases host in output | Go keeps host casing as parsed | Lowercase host manually when rebuilding (`clean_url`, `bareUrl`) |
| 4 | `[\s\S]*?` in figure/caption/candidate regexes | Go `.` excludes newline by default | Use `(?s)` flag |
| 5 | `new Date(lastmod)` accepts RFC3339 and date-only | `time.Parse` needs explicit layouts | Try `time.RFC3339`, then `"2006-01-02"`; unparseable → skip entry (JS `isNaN` path) |
| 6 | `fetch` HEAD, 10s timeout, follows redirects; network error → status `"000"` | — | `http.Client{Timeout: 10s}` (follows redirects by default); any error → `"000"` |
| 7 | defuddle: 30s timeout, UA `mt-webfetch/1.0`, exit 0/1/2, raw body to stdout, diagnostics to stderr | — | Same client pattern; `os.Exit` codes identical |
| 8 | `--uuid <v> --deep` flag parsing | — | stdlib `flag` on a subcommand FlagSet (`--uuid v` and `--uuid=v` both accepted); missing uuid → usage + exit 1 |
| 9 | uuid/substack regexes are case-insensitive | — | `(?i)` prefix |
| 10 | oEmbed URL built with `encodeURIComponent` | — | `url.QueryEscape` |
| 11 | Deep-crawl shared budget `DEEP_FETCH_BUDGET = 40` across publications; miss JSON includes `scanned`, `budget`, `cutoff` (ISO date) | — | Same constant, same miss shape; cutoff `time.Format("2006-01-02")` |
| 12 | `classifyType` extension regexes allow trailing `?query` | — | Port regex as-is (RE2-safe) |

## Validation

- `go vet` clean; each subcommand runs without args → same usage/exit behavior as its JS counterpart.
- Spot-run each subcommand once (real output sanity, not yet full parity — that is phase 2).

## Risks / Rollback

- No call sites change in this phase; JS remains the live engine. Rollback = delete the `.go` files and `go.mod`.
