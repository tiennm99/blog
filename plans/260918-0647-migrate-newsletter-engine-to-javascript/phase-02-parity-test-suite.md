---
phase: 2
title: "Golden-output parity suite"
status: done
priority: P1
effort: "0.5d"
dependencies: [1]
---

# Phase 2: Golden-output parity suite

## Overview

Capture the Go engine's stdout for a fixed case matrix, commit those outputs as
fixtures, and assert the JS engine reproduces them using `node:test`. This is
both the migration's proof of correctness and the regression net the engine has
never had. It must run while the Go engine still exists.

## Requirements

**Functional**
- Every subcommand covered; every parity trap T1-T7 from phase 1 covered by at
  least one case that would fail if the trap were mishandled.
- Fixtures are generated from the Go engine, never hand-written — a hand-written
  fixture proves nothing about parity.
- Network-dependent cases are separated from deterministic ones so `npm test`
  stays runnable offline.

**Non-functional**
- `node:test` + `node:assert` only. No test framework dependency.
- The suite runs in under 30 seconds offline.

## Architecture

```
scripts/newsletter/
  parity.test.js            deterministic cases, offline, runs in npm test
  network.test.js           live-network cases, skipped unless NEWSLETTER_NET=1
  __fixtures__/
    golden/<case-id>.json   or .txt — captured Go stdout, committed
    repo/content/post/      a small synthetic content tree; __fixtures__/repo
                            stands in as a repo root via the subprocess cwd
```

**Two test tiers.** Deterministic cases (URL cleaning, classification, dedup
against a fixture content tree, post-stats, tag listing, newsletter numbering,
HTML/RSS extraction from saved markup) run always. Live-network cases (YouTube
oEmbed, Substack RSS and sitemap, defuddle) run only with `NEWSLETTER_NET=1`,
because upstream content changes and a CI-red-on-someone-else's-outage test
teaches people to ignore red.

**Fixture content tree.** Dedup and the content-scanning commands must not read
the real `content/post` — it grows every day, so a fixture captured today fails
tomorrow. Build a small synthetic tree under `__fixtures__/repo/content/post/`
covering:
a post with a `Newsletter #N` heading, a post with a stored bare URL, a post with
a stored URL that is a strict *prefix* of the test URL (the T2 false-duplicate
case), a post with a Substack uuid in `<figure>` form, a post with a uuid in
markdown-autolink form, and a post with a frontmatter `tags:` array.

Tests point the engine at that tree by **setting the subprocess working
directory**, not by adding a config knob. Both engines already resolve
`content/post` relative to the process CWD — that is the documented repo-root
invocation contract — so `execFileSync(…, { cwd: fixtureRoot })` redirects every
content-scanning command with no change to either engine. The fixture tree
therefore lives at `__fixtures__/repo/content/post/…` so that `__fixtures__/repo`
can stand in as a repo root.

**Saved markup.** RSS and sitemap parsing cases use saved upstream responses in
`__fixtures__/`, captured once. This is what lets cheerio-vs-regex differences be
compared deterministically.

## Related code files

- Create: `scripts/newsletter/parity.test.js`
- Create: `scripts/newsletter/network.test.js`
- Create: `scripts/newsletter/__fixtures__/` (golden outputs, `repo/content/post` tree, saved markup)
- Create: `plans/reports/parity-260918-newsletter-js-migration-report.md`
- Modify: `scripts/newsletter/*.js` — only if a fixture mismatch reveals a port bug
- Modify: `.gitignore` if any capture artifact must be excluded (prefer not to)

## Case matrix

Capture from Go, assert against JS. Minimum coverage:

| Subcommand | Cases |
|---|---|
| `add-url` | article; article with `utm_*` + `fbclid` + `ref` params (T1); article with a param that must survive; `youtube.com/watch?v=`; `youtu.be/`; `youtube.com/shorts/`; a YouTube playlist URL (must *not* route youtube); substackcdn image URL; raw S3 substack image; `.pdf`; `.mp4`; `.avif` with query string; a URL that is a prefix of one already stored (T2, expect `duplicate:false`); a URL genuinely stored (expect `duplicate:true`); a non-YouTube URL (T3, expect no `title` key at all) |
| `detect-image-source` | substackcdn `/image/fetch/` wrapper; raw S3; non-Substack image (T3, no `uuid`/`innerUrl` keys); a wrapper with a malformed `%` sequence (T7) |
| `find-substack-post` | saved RSS containing the uuid; saved RSS missing it (`{found:false}`); `--deep` total miss against a saved sitemap (T4, `cutoff` present and `null` when the sitemap fetch fails); a saved RSS item whose TOC bullets include a non-BMP character near the 70-rune limit (T5) |
| `find-newsletter-number` | fixture tree with newsletters; empty tree (expect `1`); a tree where the newest year has no newsletter but an older year does (per-year early exit) |
| `list-existing-tags` | fixture tree — assert the exact `%6d %s` text including alignment (T6); tie-break ordering between two tags with equal counts |
| `post-stats` | a post with articles, all three Bonus subsections, and a `Newsletter #N` heading; a post with an empty Bonus; a post with no Bonus at all |
| `fetch-via-defuddle` | bad args → exit 2; unreachable host → exit 1; success → exit 0 with a body (network tier) |

## Implementation steps

1. Build `__fixtures__/repo/content/post/` by hand — six or so small `index.md`
   files, each documented with the case it exists for.
2. Confirm both engines resolve content paths from CWD with no env override, so
   the same fixture root drives the Go capture and the JS assertion.
3. Save the upstream RSS and sitemap responses used by the extraction cases.
4. Write a capture script in the scratchpad (not the repo) that runs every
   deterministic case through `go run ./scripts/newsletter …` — with the
   content-scanning cases run from `__fixtures__/repo` as CWD, using an absolute
   path to the Go package — and writes
   `__fixtures__/golden/<case-id>`. Record exit codes alongside stdout.
5. Review every captured fixture by eye before committing. A fixture that
   encodes a Go bug becomes a requirement the JS must match forever — catch that
   now, and if one is found, record it as a known-bug fixture with a comment
   rather than silently "fixing" it in the port.
6. Write `parity.test.js`: for each case, invoke the JS engine as a subprocess
   (`node:child_process` `execFileSync`) so the test exercises the real CLI
   surface including exit codes, passing `cwd: __fixtures__/repo` for the
   content-scanning cases, and compare stdout to the golden file.
7. Write `network.test.js` with the same shape, guarded by
   `{ skip: process.env.NEWSLETTER_NET !== "1" }`.
8. Run `npm test`. Every mismatch is triaged into exactly one of: **port bug**
   (fix the JS), **accepted improvement** (cheerio extracting better text; update
   the fixture and record the reason), or **accepted CLI difference** (e.g.
   `parseArgs` rejecting `-uuid`).
9. Run the network tier once manually with `NEWSLETTER_NET=1`.
10. Write `plans/reports/parity-260918-newsletter-js-migration-report.md`: the
    matrix, pass/fail per case, and every accepted difference with its
    justification. Mirror the structure of the existing
    `parity-260818-newsletter-go-migration-report.md`.

## Success criteria

- [x] `npm test` passes offline from a clean `npm ci`.
- [x] `NEWSLETTER_NET=1 npm test` passes against live upstreams.
- [x] Every subcommand has at least one case; T1-T7 each have a case that fails
      if the trap is mishandled (verify by temporarily reintroducing the naive
      implementation and watching the test go red).
- [x] Every fixture was generated from the Go engine and eyeballed before commit.
- [x] Zero unexplained differences. Every accepted difference is in the report
      with a reason.
- [x] Tests read only `__fixtures__/`, never the real `content/post` — verify by
      running the suite with the real `content/post` temporarily renamed.
- [x] Neither engine gained a test-only config knob; redirection is CWD alone.

## Risk assessment

**Fixtures that encode Go bugs.** Capturing blindly turns any existing bug into a
permanent contract.
*Signal:* step 5's review finds output that is wrong on its own terms.
*Response:* keep the fixture as-is with a comment naming the wrong behavior, so
the port is provably faithful; fix it as a separate change after cutover.

**Live-network cases rot.** ByteByteGo's RSS window moves; a uuid that resolves
today will not in a month.
*Mitigation:* the network tier is opt-in and never gates `npm test`.
*Response:* if a network case goes stale, re-capture the saved markup and move
the assertion into the deterministic tier rather than chasing live content.

**The synthetic content tree misses a real-world markdown shape.** Dedup
boundary handling is the highest-consequence logic in the engine — a false
negative publishes a duplicate, a false positive silently drops a URL the user
asked for.
*Mitigation:* seed the fixture tree by grepping the real `content/post` for the
distinct shapes stored URLs actually take (bare, trailing slash, autolink
`<…>`, inside a markdown link, inside an image) and cover each.
*Response:* if a shape is found that neither engine handles, that is a
pre-existing bug — record it, do not fix it inside the migration.
