---
phase: 1
title: "Port the engine to JavaScript"
status: done
priority: P1
effort: "1.5d"
dependencies: []
---

# Phase 1: Port the engine to JavaScript

## Overview

Translate the 1168-LOC Go engine into Node ESM modules under
`scripts/newsletter/`, one JS file per Go file, replacing hand-rolled HTML/XML
regexes with cheerio. Go and JS coexist at the end of this phase — nothing is
deleted until phase 4.

## Requirements

**Functional**
- `node scripts/newsletter <cmd> [args]` dispatches all seven subcommands from
  the repo root, with the same usage text and the same argument shapes.
- Output is byte-identical to the Go engine except where this phase names a
  deliberate difference.
- Repo-relative paths (`content/post`) resolve from `process.cwd()`, preserving
  the "invoked from the repo root" contract.
- `config/substack-publications.json` stays the editable source of truth, read at
  runtime (no `go:embed` equivalent needed), with the same
  `["blog.bytebytego.com"]` fallback on read or parse failure.

**Non-functional**
- ESLint clean under the existing `eslint.config.mjs` (`eqeqeq`, `prefer-const`,
  `no-unused-vars` with `^_` escape).
- JSDoc type annotations on every exported function, per repo policy — types
  without TypeScript.
- Exactly three runtime dependencies. No dev dependencies.

## Architecture

```
scripts/newsletter/
  index.js                      subcommand dispatch, usage, printJson, dep-guard
  url-utils.js                  cleanUrl, bareUrl, isSubstackImage, substackImageUuid,
                                fetchTextOk, checkAccessibility, collectMarkdown,
                                checkDuplicate, classifyType, boundary helpers
  html-text.js                  stripTags, itemTitle, itemLink, extractCandidates,
                                captionForUuid, postTitleFromHtml   [cheerio]
  add-url.js                    add-url
  detect-image-source.js        detect-image-source
  find-substack-post.js         find-substack-post                  [cheerio]
  find-newsletter-number.js     find-newsletter-number
  list-existing-tags.js         list-existing-tags
  fetch-via-defuddle.js         fetch-via-defuddle                  [defuddle]
  post-stats.js                 post-stats
  config/substack-publications.json   (unchanged)
```

Each command module exports a single `run*(args)` function; `index.js` owns
dispatch and the missing-dependency guard.

**Deviation, made during review:** the shared JSON printer moved out of
`index.js` into its own `json-out.js`. Keeping it in `index.js` meant every
JSON-emitting command imported the dispatcher, and `index.js` runs `main()` at
module scope — so importing a command module executed the CLI against the host
argv, and the pure functions this phase exports for testing could not be imported
at all. One extra module removes the cycle outright.

`printJson(v)` = `process.stdout.write(JSON.stringify(v, null, 2) + "\n")`.
This matches Go's `SetEscapeHTML(false)` + `SetIndent("", "  ")` + `Encode`
exactly: JS does not HTML-escape, and `Encode` appends the newline.

## Related code files

- Create: `scripts/newsletter/index.js` and the nine modules above
- Modify: `package.json` (dependencies, `test` script)
- Modify: `package-lock.json` (via `npm install`)
- Unchanged: `scripts/newsletter/config/substack-publications.json`
- Untouched this phase: all `scripts/newsletter/*.go`

## The seven parity traps

Each is a place where the idiomatic JS differs from what the Go does. These are
the reason phase 2 exists; get them right here.

**T1 — `cleanUrl` must not re-encode the query.** `url_utils.go` splits
`u.RawQuery` on `&` and rejoins surviving pairs verbatim, with a comment
explaining that Go's `url.Values` would sort keys and that sorted output must not
leak into stored `clean_url` values. JS `URLSearchParams.delete()` preserves
order but *normalizes percent-encoding* (e.g. `%7E` → `~`, `+` → `%20`), which is
the same class of bug. Split `url.search.slice(1)` on `&` and rejoin the kept
pairs as raw strings. Filter rule: drop any key whose lowercase form starts with
`utm_`, or is in the exact-match set (`fbclid gclid msclkid mc_eid aid ref
ref_src ref_url source s ck_subscriber_id igshid yclid vero_id`).

**T2 — keep `hasBoundaryMatch` as an index loop.** Go hand-rolls it because RE2
has no lookahead. JS regex *does* have lookahead, so the tempting move is to
collapse it into one pattern. Do not: the byte-offset boundary checks
(`uuidBoundaryOk`, `urlBoundaryOk`, including the optional trailing-slash skip
and the `)]"'?#<>_&,` delimiter set) are what make a prefix URL not a false
duplicate. Port the loop literally. A regex rewrite is a separate, separately
verified change.

**T3 — `omitempty` fields must be absent, not empty.** Go omits `title`,
`author` (add-url) and `uuid`, `innerUrl` (detect-image-source) when empty.
Build those objects conditionally; never emit `"title": ""`.

**T4 — the deep-miss `cutoff` is `null`, not omitted.** `find-substack-post
--deep` on a total miss emits `{found, source, scanned, budget, cutoff}` where
`cutoff` is a `*string` — JSON `null` when no sitemap could be fetched. Emit
`null` explicitly.

**T5 — count runes, not UTF-16 units.** `extractCandidates` filters on
`utf8.RuneCountInString(text) < 6 || > 70`. JS `.length` counts UTF-16 code
units, so any non-BMP character (emoji in a TOC bullet) counts double and can
push a valid title past 70. Use `[...text].length`.

**T6 — `list-existing-tags` output is `%6d %s`.** Right-align the count in a
6-character field: `String(count).padStart(6) + " " + tag`. It is plain text, not
JSON, and the skill reads it.

**T7 — `extractInnerUrl` swallows decode errors.** Go's `url.PathUnescape`
returns an error on a malformed `%` sequence and the code falls back to the raw
substring. JS `decodeURIComponent` *throws*. Wrap in try/catch and return the
raw substring on failure.

Two more that are free in JS but worth confirming: `extractCandidates` must
marshal as `[]` not `null` when empty (natural in JS; Go needed an explicit
non-nil slice), and `URL` already serializes an empty path as `/` (Go had to add
that by hand).

## Implementation steps

1. `npm install cheerio defuddle linkedom` — confirm the lockfile records exactly
   these three plus their transitive deps, and that `npm ci` works offline
   afterward on this ARM64 box.
2. Add to `package.json`: `"test": "node --test scripts/newsletter/*.test.js"`.
   Leave `lint` and `projects:refresh` alone.
3. Write `index.js`: usage text (updated to `node scripts/newsletter …`),
   `switch` dispatch over `process.argv[2]`, `printJson`, and the R1 dependency
   guard — wrap the dynamic import of each command module and translate
   `ERR_MODULE_NOT_FOUND` into
   `newsletter engine: dependencies missing — run 'npm ci' from the repo root`
   on stderr with exit 1.
4. Port `url-utils.js`. No dependencies — pure stdlib (`node:fs`, `node:path`,
   `URL`, global `fetch`). Apply T1 and T2. `fetchTextOk` and
   `checkAccessibility` use `AbortSignal.timeout(ms)`; `checkAccessibility`
   returns the literal string `"000"` on any network error.
5. Port `html-text.js` using cheerio. This is the phase's real work:
   - `stripTags` → `cheerio.load(s).text()` then collapse whitespace and trim.
     Note cheerio decodes entities, replacing Go's `html.UnescapeString`.
   - `itemTitle` / `itemLink` → `$('title').first()` / `$('link').first()` under
     `xmlMode: true`, which handles CDATA natively.
   - `extractCandidates` → `$('li')` with the T5 rune filter, case-insensitive
     dedupe, first-seen order preserved.
   - `captionForUuid` → find the element whose serialized subtree contains the
     uuid, walk up with `.closest('figure')`, read `figcaption`. This replaces
     the `LastIndex("<figure")` / `Index("</figure>")` string surgery; expect
     *better* results on nested figures and record any difference under R3.
   - `postTitleFromHtml` → `meta[property="og:title"]` → `h1` → `title`, same
     precedence.
6. Port the five straightforward commands: `add-url.js`, `detect-image-source.js`
   (T7), `find-newsletter-number.js` (keep the per-year early exit: scan a whole
   year's months and days, then break only if that year yielded a number),
   `list-existing-tags.js` (T6), `post-stats.js`.
7. Port `find-substack-post.js`: `node:util`'s `parseArgs` for `--uuid` /
   `--deep`; cheerio `xmlMode` for RSS `<item>` and sitemap `<url>/<loc>/<lastmod>`;
   the 3-month cutoff; newest-first stable sort; the shared `deepFetchBudget = 40`
   spanning all publications; T4 on the miss output. Read the publications JSON
   at runtime with the documented fallback.
8. Port `fetch-via-defuddle.js` with the two-tier design from `plan.md`:
   local `defuddle/node` first, then `https://defuddle.md/<url>`. Exit 2 on bad
   args, 1 on both tiers failing, 0 with the body on stdout. Stderr names which
   tier failed and why.
9. `npx eslint scripts/newsletter/` and fix. Add JSDoc to every exported
   function.
10. Smoke every subcommand once by hand against a live URL before handing off to
    phase 2.

## Success criteria

- [x] All seven subcommands run under `node scripts/newsletter <cmd>` without a
      stack trace.
- [x] `npx eslint scripts/newsletter/` is clean.
- [x] Every exported function carries a JSDoc type annotation.
- [x] `package.json` lists exactly `cheerio`, `defuddle`, `linkedom` as new
      dependencies; no new devDependencies.
- [x] Each of T1-T7 is addressed, with a code comment at the site explaining the
      constraint (explain the invariant, not the trap number).
- [x] Deleting `node_modules` and running any subcommand prints the `npm ci`
      message, not a module-resolution stack trace.
- [x] No `.go` file modified or deleted.

## Risk assessment

**Cheerio's whitespace and entity handling differs from `html.UnescapeString` +
regex.** `stripTags` is used for captions and candidate titles that land verbatim
in published posts.
*Signal:* phase-2 fixture mismatches concentrated in `extractCandidates` /
`captionForUuid`.
*Response:* adjust the cheerio text pipeline to match Go on the fixtures. If a
difference is cheerio being correct on malformed markup, accept and record under
R3 — do not contort the parser back into regex behavior.

**`defuddle/node` may not work on headless ARM64 Linux.** linkedom is pure JS so
it should, but this is unverified.
*Signal:* step 1 or step 8 fails on import or on a real extraction.
*Response:* ship `fetch-via-defuddle` with the `defuddle.md` proxy tier only,
drop `defuddle` and `linkedom` from `package.json`, and note the reduction — the
command keeps exactly its current Go behavior, so nothing regresses.

**`parseArgs` is stricter than Go's `flag`.** Go's package accepts `-uuid` as
well as `--uuid`; `parseArgs` accepts only `--uuid`.
*Signal:* a skill or a user invoking the single-dash form.
*Response:* accept the narrowing — every documented call site uses `--uuid` —
and state it in the phase-2 report as a deliberate CLI difference.
