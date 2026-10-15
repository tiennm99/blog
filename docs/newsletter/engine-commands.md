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

Skip it and `find-substack-post` prints
`newsletter engine: dependencies missing — run 'npm ci' from the repo root`
and exits 1 rather than a module-resolution stack trace. `fetch-via-defuddle`
loses only its local stage, so it falls through to the `defuddle.md` proxy and
can still succeed. The other subcommands need no dependencies.

## Invocation

Always from the repo root — repo-relative paths (`content/post`) resolve from the
process working directory:

```bash
node scripts/newsletter <command> [args]
```

JSON output is 2-space indented with a trailing newline, and is not HTML-escaped
(URLs keep their `&` readable). Optional fields are **omitted** when empty rather
than emitted as `""`.

Exit codes: 0 is success; 1 is a usage error, unknown command, missing
dependencies or uncaught error. `find-substack-post` exits 2 on a bad flag;
`fetch-via-defuddle` and `protected-lines --against` use the codes in their own
sections.

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
  transform and size variants collapse onto one identity. It is a boolean and
  does not name the post holding the URL; see
  [post-mechanics §6](post-mechanics.md#6-error-handling) for finding and
  reporting it.
- `http_status` is the final status (after redirects) of a HEAD request sent
  with Node's default User-Agent, not a browser one — `"000"` on network error
  or 10 s timeout. `accessible` is `http_status == "200"`, so a bot-blocking or
  HEAD-rejecting host reads `false` (see
  [post-mechanics §6](post-mechanics.md#6-error-handling)).

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

Fallback fetcher for pages that blocked the built-in fetch. Two stages, in order:
local defuddle extraction, then the `defuddle.md` proxy (which fetches from its
own IP — the stage that matters when this machine's IP is the blocked one).

Both stages write YAML frontmatter followed by the markdown body, so the caller
parses one shape either way; stderr names which stage failed and why. An
extraction that looks like a bot challenge rather than the requested page counts
as a local-stage failure, so the proxy still gets its turn.

| Exit | Meaning |
|---|---|
| 0 | content returned |
| 1 | both stages failed |
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

### `protected-lines <path/to/index.md> [--against <snapshot.json>]`

Lists the lines a rewrite (`mt-rewrite-newsletter`) must keep byte-for-byte:
frontmatter, headings (except `###` sub-headings inside a summary), HTML blocks
opened by `<i>`/`<em>`/`<div>`/`<p>`/`<blockquote>`, `**Đánh giá:** *…*` author
notes (kind `author-note`), whole-line italic notes, `~~struck~~` lines, fenced code blocks, and
asset links / Bonus subsection labels. Paragraphs mentioning `mình`
or `MiTi` come back as `candidates` for a human-style judgement; the machine
provenance note (`*Bài viết đã được … bởi …*`) comes back as `note` and is not
protected.

```json
{
  "post": "content/post/2025/03/16/index.md",
  "newsletter": 7,
  "newsletter_post": true,
  "note": "*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*",
  "lines": [{ "line": 8, "kind": "html-block", "text": "<i>" }],
  "candidates": [{ "line": 20, "kind": "first-person", "text": "…" }]
}
```

`newsletter_post` is `true` only when the frontmatter `categories` names
`Newsletter`. With `--against` (a snapshot saved from the first form), it checks
the post still contains every snapshot line, in order, and prints
`{ post, ok, missing }`; exit 1 when anything is missing.

## Tests

```bash
npm test                    # deterministic tier, offline, ~2s
NEWSLETTER_NET=1 npm test   # adds the live-upstream tier
```

Golden outputs under `scripts/newsletter/__fixtures__/golden/` were captured from
the previous Go implementation; see
`plans/reports/parity-260918-newsletter-js-migration-report.md`.
