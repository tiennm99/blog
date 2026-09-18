# Newsletter engine commands

The portable newsletter engine lives in `scripts/newsletter/` — Node ESM, one
module per subcommand. **This file is the only place the commands are
enumerated**; skills and docs link here rather than restating the list.

## Prerequisite

The engine has three runtime dependencies (`cheerio`, `defuddle`, `linkedom`), so
a fresh clone needs one setup step:

```bash
npm ci
```

Skip it and the content-parsing subcommands print
`newsletter engine: dependencies missing — run 'npm ci' from the repo root`
and exit 1 rather than a module-resolution stack trace. `fetch-via-defuddle` is
the exception: its local tier needs the dependencies, so without them it falls
through to the `defuddle.md` proxy and still succeeds.

## Invocation

Always from the repo root — repo-relative paths (`content/post`) resolve from the
process working directory:

```bash
node scripts/newsletter <command> [args]
```

JSON output is 2-space indented with a trailing newline, and is not HTML-escaped
(URLs keep their `&` readable). Optional fields are **omitted** when empty rather
than emitted as `""`.

## Commands

### `add-url <url>`

Classifies and deduplicates one URL — the single entry point per URL.

```json
{
  "original_url": "…",
  "clean_url": "…",
  "http_status": "200",
  "accessible": true,
  "duplicate": false,
  "route": "article",
  "title": "…",
  "author": "…"
}
```

- `route` ∈ `youtube | image | video | document | article`
- `clean_url` has tracking parameters stripped (`utm_*`, `fbclid`, `gclid`,
  `ref`, …); surviving parameters keep their original order and encoding
- For `youtube`, `clean_url` is the canonical `https://www.youtube.com/watch?v=ID`
  and `title` / `author` come from oEmbed. Both keys are absent for every other
  route, and absent when oEmbed fails.
- `duplicate` is boundary-aware: a URL that is merely a *prefix* of one already
  stored is not a duplicate. Substack images dedupe on their image uuid, so
  transform and size variants collapse onto one identity.

### `find-newsletter-number`

Prints the next newsletter number (plain text). Scans `content/post/YYYY/MM/DD/`
newest-year-first and stops at the first year that holds a `Newsletter #N`
heading, so a stale higher number in an older year does not win. An empty tree
yields `1`.

### `list-existing-tags`

Prints tag frequencies, most-used first, top 40, as `%6d %s` — the count
right-aligned in six columns. Ties keep first-seen (lexical walk) order.

### `detect-image-source <url>`

Detects a Substack-hosted image and extracts its S3 image uuid.

```json
{
  "original_url": "…",
  "clean_url": "…",
  "isSubstack": true,
  "uuid": "…",
  "innerUrl": "…"
}
```

`uuid` and `innerUrl` are present only when the URL is a Substack image and the
value is non-empty. A malformed percent sequence in the CDN wrapper falls back to
the raw substring rather than failing.

### `find-substack-post --uuid <uuid> [--deep]`

Finds which Substack post embeds an image uuid, and extracts a label. Only the
double-dash flag form is accepted.

Searches each publication in `scripts/newsletter/config/substack-publications.json`
(editable, read at runtime) — the RSS feed first, then, with `--deep`, a sitemap
crawl back ~3 months sharing a 40-fetch budget across all publications.

On a hit:

```json
{
  "found": true,
  "source": "rss",
  "publication": "…",
  "postTitle": "…",
  "postUrl": "…",
  "caption": "…",
  "candidates": ["…"]
}
```

On a miss: `{"found": false}`, or with `--deep`
`{"found": false, "source": "sitemap", "scanned": 0, "budget": 40, "cutoff": null}`
where `cutoff` is the crawl boundary date, or `null` when no sitemap could be
fetched at all.

### `fetch-via-defuddle <url>`

Fallback fetcher for pages that blocked the built-in fetch. Two tiers, in order:
local defuddle extraction, then the `defuddle.md` proxy (which fetches from its
own IP — the tier that matters when this machine's IP is the blocked one).

Both tiers write YAML frontmatter followed by the markdown body, so the caller
parses one shape either way; stderr names which tier failed and why. An
extraction that looks like a bot challenge rather than the requested page counts
as a local-tier failure, so the proxy still gets its turn.

| Exit | Meaning |
|---|---|
| 0 | content returned |
| 1 | every tier failed |
| 2 | bad arguments |

### `post-stats <path/to/index.md>`

Counts what a post already holds, so a handler can report a running tally.

```json
{
  "post": "content/post/2026/09/10/index.md",
  "newsletter": 132,
  "articles": 8,
  "images": 3,
  "videos": 1,
  "documents": 0,
  "total": 12
}
```

`newsletter` is `0` when the post carries no `Newsletter #N` heading.

## Tests

```bash
npm test                    # deterministic tier, offline, ~2s
NEWSLETTER_NET=1 npm test   # adds the live-upstream tier
```

Golden outputs under `scripts/newsletter/__fixtures__/golden/` were captured from
the previous Go implementation; see
`plans/reports/parity-260918-newsletter-js-migration-report.md`.
