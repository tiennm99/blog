# Parity Report — Newsletter Engine Go → JavaScript (2026-09-18)

The Go engine's stdout was captured for 26 deterministic cases before the
JavaScript port was trusted, committed under
`scripts/newsletter/__fixtures__/golden/`, and asserted byte-for-byte by
`scripts/newsletter/parity.test.js`. Live-upstream behaviour is covered by
`network.test.js`, which is opt-in.

## Results

`npm test` — 40 assertions, 40 pass, 0 fail, offline.
`NEWSLETTER_NET=1 npm test` — 48 assertions, 48 pass, 0 fail.

| Subcommand | Deterministic cases | Live cases | Result |
|---|---|---|---|
| `add-url` | 15 | 4 | pass |
| `detect-image-source` | 4 | — | pass |
| `find-newsletter-number` | 3 | — | pass |
| `list-existing-tags` | 1 | — | pass |
| `post-stats` | 3 | — | pass |
| `find-substack-post` | 3 (extraction, saved markup) | 3 | pass |
| `fetch-via-defuddle` | 1 (exit 2) | 2 | pass |

Content-scanning commands are pointed at `__fixtures__/repo` by setting the
subprocess working directory. Both engines resolve `content/post` from the
process CWD, so neither gained a test-only configuration knob. Verified by
renaming the real `content/post` away and re-running: 32/32 still pass.

`add-url` performs a HEAD request on every URL, so its deterministic cases use
`.invalid` hosts (RFC 2606, guaranteed not to resolve). The status is a stable
`"000"` whether or not the machine is online.

## Trap coverage

Each of the seven traps identified in phase 1 has a case that goes red when the
naive implementation is reintroduced. Verified by mutating the engine and
re-running:

| Trap | Discriminating case | Reintroducing the trap |
|---|---|---|
| Query kept verbatim | `add-url-query-verbatim` (`%20`, valueless key, lowercase `%7e`) | 1 failure |
| Boundary-aware dedup | `add-url-prefix-not-duplicate` | 3 failures |
| Empty optional fields omitted | `add-url-article-no-metadata`, `detect-image-non-substack` | 3 failures |
| `cutoff` is `null`, not omitted | live deep-miss case | see below |
| Code points, not UTF-16 units | the 70-code-point bullet | 5 failures |
| Six-column right-aligned counts | `list-existing-tags-main` | 3 failures |
| Malformed percent escape | `detect-image-malformed-percent` | 3 failures |

The first discriminating case chosen for the query trap did not discriminate:
`%7E` and `+` survive a `URLSearchParams` round trip unchanged. The case was
replaced with one that does — `%20` becomes `+`, a valueless key gains `=`, and
lowercase `%7e` is upper-cased by the re-encoder.

`cutoff` is exercised live only. The publication list is deliberately not
test-configurable (the "no test-only knob" decision), so the branch that emits
`"cutoff": null` cannot be reached offline. A live `--deep` miss was diffed
against the Go engine directly and came back byte-identical.

## Accepted differences

**The parser recovers a TOC bullet the regex dropped.** On the live ByteByteGo
feed, `extractCandidates` returns one more candidate than the Go regex did — the
first bullet of the "in this issue" list,
`"An LLM needs evidence to answer questions"`. The markup is
`<li><p><span>…</span></p></li>`, identical in shape to the bullets the regex did
match, so this is the regex losing an item, not the parser inventing one. Every
candidate the regex found is still present and in the same order; the suite
asserts that explicitly rather than pinning the full list.

Accepted: more complete candidate lists, nothing lost. This is the R3 case the
plan anticipated.

**`fetch-via-defuddle` exit 2 is now observable.** The Go source defined exit 2
for bad arguments and exit 1 for a failed fetch, but `go run` collapsed every
nonzero exit to 1. Node preserves them, so the distinction is real for the first
time. No caller depended on the collapsed behaviour.

**`fetch-via-defuddle` gained a local extraction tier.** Local defuddle runs
first, the `defuddle.md` proxy remains as the second tier. The proxy is the tier
that matters when this machine's IP is the one being blocked, so it was not
dropped. Verified on ARM64: `defuddle/node` + `linkedom` import and extract
without native dependencies.

**`--uuid` no longer accepts the single-dash form.** Go's `flag` package accepted
`-uuid`; `node:util`'s `parseArgs` accepts only `--uuid`. Every documented call
site uses the double-dash form. Accepted narrowing.

**RSS `<link>` entity handling is unchanged, deliberately.** cheerio's `.text()`
decodes entities, which would have turned a stored `&amp;` into `&`. The port
reads the element's raw serialized inner content instead. `&amp;` and CDATA
round-trip exactly; a *numeric* entity is normalized by the parser's
re-serialization (`&#38;` → `&amp;`), which no observed Substack feed emits.

**Sitemap `<loc>` entities are now decoded.** Go's `<loc>([^<]+)</loc>` kept
`&amp;` literal, so a sitemap entry with an escaped ampersand produced a URL the
crawler then failed to fetch and a broken `postUrl` on a hit. `children("loc").text()`
decodes it. XML says the decoded form is the URL; accepted as a fix.

**`cleanUrl` inherits WHATWG normalizations Go's `url.Parse` did not apply** —
dot-segment removal (`/a/../b` → `/b`), default-port stripping (`:443`), and a
raw space becoming `%20`. These are path- and authority-level; the query is still
rebuilt by string surgery and never re-encoded, which is what the stored
`clean_url` values depend on. No observed input in `content/post` is affected.

**JavaScript `\s` matches more than RE2's `\s`.** `NEWSLETTER_NUM_RE`,
`TAGS_LINE_RE` and the `post-stats` patterns now also match a non-breaking space
where Go did not. A silent widening, and in this content the forgiving direction:
`Newsletter #132` typed with an NBSP would be found rather than missed.

## Carried over from Go, not introduced here

`urlBoundaryOk` treats `_` as a delimiter, so a stored
`https://x.invalid/p/foo_bar` makes `https://x.invalid/p/foo` report as a
duplicate. Byte-identical to the Go behaviour and therefore out of this
migration's scope, recorded because the consequence — a URL silently dropped as a
false duplicate — is hard to notice after the fact.

## Found during review, fixed

**Piping any command into a reader that closes early crashed.**
`node scripts/newsletter list-existing-tags | head -3` printed an EPIPE stack
trace; Go took SIGPIPE and died silently. `index.js` now exits quietly on EPIPE,
with a regression test.

**Importing a command module ran the CLI.** The four JSON-emitting commands
imported `printJson` from `index.js`, which calls `main()` at module scope — so
importing any of them executed the dispatcher against the host process's argv,
and the pure functions the port exports for testing could not be imported at all.
`printJson` moved to `json-out.js`, breaking the cycle. Six unit tests now cover
`detectYouTube`, `extractInnerUrl`, `countPostEntries`, `parseLastmod`,
`loadPublications` and `findMostRecentNewsletter`, which is the standing proof
the cycle stays gone.

**The local defuddle tier could consume the proxy tier's turn.** A bot wall
answers 200 with a real body, which extracted to non-empty and returned exit 0 —
so the `defuddle.md` proxy, the tier that exists precisely because this machine's
IP is blocked, never ran. A challenge-shape check on the extraction title and the
opening of the body now counts that as a local failure. Marker-based rather than
length-based on purpose: a legitimate short page (example.com is 17 words) must
still succeed.

**The two tiers returned different shapes.** The proxy returns YAML frontmatter
plus body; the local tier returned a bare body, while the skill told the agent
tier 1 carries a title in frontmatter — for a value that becomes an article
heading in a published post. The local tier now emits the same frontmatter
(title, author, description, site, published, source) from defuddle's metadata.

## Fixtures

Reviewed by eye before commit. No fixture was found to encode a Go bug.

- `__fixtures__/repo/` — six posts covering every shape a URL is stored in
  (bare, trailing slash, markdown autolink, markdown link, image), a newsletter
  in an older year holding a *higher* number than the newest year, and the three
  `post-stats` shapes.
- `__fixtures__/repo-empty/`, `__fixtures__/repo-year-fallback/` — the empty tree
  and the newest-year-has-none cases for `find-newsletter-number`.
- `__fixtures__/markup/bytebytego-feed.xml` — two real feed items, 64 KB.
- `__fixtures__/markup/bytebytego-sitemap.xml` — 40 real sitemap entries, 6 KB.
- `__fixtures__/markup/edge-cases.html` — synthetic: a nested `<figure>`, a
  caption-less figure, and bullets at exactly 5, 6, 70 and 71 code points with a
  non-BMP character.

The live feed carries no `<figcaption>` at all, which is why the engine's own
comment says ByteByteGo does not caption its images. Caption extraction is
therefore covered by the synthetic nested-figure fixture, where the innermost
enclosing figure must supply the caption and a caption-less figure must yield
nothing rather than borrowing the outer one.

## Verdict

Parity proven. The JavaScript engine reproduces the Go engine on every captured
case, and every difference is deliberate, recorded above, and an improvement or
an accepted narrowing. Safe to cut the call sites over.
