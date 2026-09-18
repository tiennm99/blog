# Code Review — Newsletter engine Go → JavaScript migration (2026-09-18)

Reviewer pass over the uncommitted change set on `main`. Read-only: no file in
the change set was modified. Verification was done by reading the JS against
`git show HEAD:scripts/newsletter/*.go`, running `npm run lint` / `npm test`, and
probing the engine directly.

## Scope

- `scripts/newsletter/` — 10 new `.js` modules + 2 test files + `__fixtures__/`
  (~1,050 LOC), replacing 10 deleted `.go` files (1,168 LOC) and `go.mod`
- 6 `mt-*` skills restructured, `.agents/skills/` converted to symlinks
- `docs/newsletter/engine-commands.md` (new), `post-mechanics.md` (moved),
  `AGENTS.md`, `README.md`, `docs/multi-tool-usage.md`
- `.github/scripts/*.mjs` → `.js`, `hugo.yml`, `update-projects.yml`,
  `netlify.toml`, `.gitignore`, `package.json`, `eslint.config.mjs`

## Overall assessment

The port is careful and, on the evidence, faithful. All seven named traps are
genuinely handled — verified by reading, not by trusting the report. The golden
suite is real regression coverage (byte-for-byte stdout plus exit codes through
the actual CLI surface), not phantom tests. No scope drift: no invented
abstractions, no `any` widening, no catch-and-swallow beyond the deliberate
"return empty on network failure" contract the Go engine already had.

`npm run lint` passes clean. `npm test` passes 33/33 (8 network cases skipped).

One structural defect and three contract gaps are worth fixing before this is
committed. None is a security issue; the threat model here (a personal blog's
content CLI, run by the repo owner) does not warrant hardening beyond what is
present.

## Critical

None.

## High

### H1 — `index.js` runs the CLI as an import side effect

`scripts/newsletter/index.js:95` calls `main()` unconditionally at module scope,
with no entry-point guard. The four command modules that emit JSON
(`add-url.js`, `detect-image-source.js`, `find-substack-post.js`,
`post-stats.js`) statically `import { printJson } from "./index.js"`. Importing
any of them therefore *runs the CLI* against the host process's `argv`.

Reproduced:

```
$ node -e 'import("./scripts/newsletter/post-stats.js")'
Usage: node scripts/newsletter <command> [args]
...
exit=1
```

A one-line unit test for an exported pure function fails the same way:

```js
import { countPostEntries } from ".../post-stats.js";   // → suite dies, exit 1
```

Impact — this is the practical answer to "can you break `npm test`": yes, by
adding the most obvious next test. The port exports `detectYouTube`,
`extractInnerUrl`, `countPostEntries`, `parseLastmod` and `loadPublications`
specifically so they can be tested, and today none of them can be. The parity
suite only survives because it imports `html-text.js`, the one helper module with
no back-edge to `index.js`. Worse than the failure itself: if the host argv ever
begins with a valid command name, the import silently *executes that command*
instead of erroring.

The circular import is known — the comment at `index.js:93` works around its
deadlock symptom ("command modules import printJson from this file, so a
top-level await here would deadlock") rather than removing the cycle.

Fix (either one, both small):

- move `printJson` into its own module (`output.js`) so no command module imports
  the entry point; or
- guard the call:
  `if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) main().catch(...)`

## Medium

### M1 — the local defuddle tier can consume the proxy tier's turn on junk output

`fetch-via-defuddle.js:27,32` gates local success on exactly two conditions:
`res.ok`, and `body.trim() !== ""`. Anything else that comes back 200 with text —
a Cloudflare interstitial, a "Verifying you are human" page, a "Subscribe to keep
reading" paywall stub — extracts to a non-empty body, so `runFetchViaDefuddle`
returns at line 69 and **the `defuddle.md` proxy never runs**.

That is the scenario the proxy was deliberately kept for. `mt-fetch-url` is
invoked only *after* WebFetch was already blocked, which strongly predicts that a
fetch from this same box is also blocked. The agent-level mitigation in
`mt-fetch-url/SKILL.md` ("If tier 1 ... returns a body with no usable content,
try a reader proxy") routes past the failure to `r.jina.ai` — skipping the
proxy stage entirely, because the engine already reported exit 0.

Not re-litigating the two-tier decision (accepted, and the ordering is right).
The gap is the gate. A minimal quality check before returning local output —
e.g. fall through when `result.wordCount` is below a small threshold, or when the
body matches a short challenge/paywall shape — restores the intended chain.

### M2 — the local tier's output shape breaks `mt-fetch-url`'s documented parsing contract

The proxy returns YAML frontmatter plus body:

```
---
title: "Example Domain"
site: "example.com"
source: "https://example.com/"
...
---
<body>
```

The local tier returns `String(result.content)` only — bare markdown, no
frontmatter, no title. Verified against `https://example.com/`.

`mt-fetch-url/SKILL.md` still instructs the agent, for the tier the engine now
tries **first**:

- step 4: "Parse the returned markdown (tier 1 has YAML frontmatter with
  title/description/etc.)"
- Output handling: "The frontmatter gives you the page title for free —
  preferred over parsing from HTML."
- Failure modes: "Only frontmatter with no body" — a proxy-shaped signal that
  cannot occur on the local tier.

So on the common path the agent is told to read a title that is not there. For a
skill whose output feeds an article heading in a published post, a missing title
is exactly the "wrong output lands in a post" failure mode worth catching.

`Defuddle(...)` already returns `title`, `author`, `description`, `domain`,
`site`, `published` and `wordCount` (confirmed by inspecting the result object) —
all discarded at `fetch-via-defuddle.js:31`. Emitting an equivalent frontmatter
block from those fields makes both tiers shape-compatible and satisfies the
skill as written. Alternatively, correct the skill text. Aligning the engine is
the smaller change and keeps the skill's title guidance true.

### M3 — output-contract changes not recorded in the parity report

Acceptance criterion 3 asks for anything that changed without being called out.
Three items, all benign or improvements, none currently documented:

1. **Sitemap `<loc>` entities are now decoded.** Go used
   `<loc>([^<]+)</loc>` on raw text; the port uses `$(el).children("loc").text()`,
   which decodes. Verified: `<loc>https://x.com/p/a?b=1&amp;c=2</loc>` now yields
   `https://x.com/p/a?b=1&c=2` where Go yielded the literal `&amp;`. This changes
   both the URL the deep crawl fetches and the `postUrl` emitted on a sitemap
   hit. JS is correct per the sitemap spec; Go was fetching a broken URL. Worth
   recording as an accepted improvement alongside the RSS `<link>` note.

2. **`itemLink` is not byte-identical to Go for numeric entities.** The report
   states link values are "byte-identical to what Go produced". The cheerio
   parse/serialize round trip normalizes `&#38;` → `&amp;`:

   ```
   <link>https://x.com/p?a=1&amp;b=2&#38;c=3</link>
   Go: …?a=1&amp;b=2&#38;c=3      JS: …?a=1&amp;b=2&amp;c=3
   ```

   `&amp;` and CDATA both round-trip exactly, so real Substack feeds are
   unaffected. The claim just needs narrowing to "`&amp;` and CDATA".

3. **`cleanUrl` inherits WHATWG normalizations Go's `url.Parse` did not apply.**
   Verified:

   | input | Go | JS |
   |---|---|---|
   | `https://x.com/a/../b?keep=1` | unchanged | `https://x.com/b?keep=1` |
   | `https://x.com:443/p` | port kept | port stripped |
   | `https://x.com/p?a=b c&d=1` | raw space kept | `a=b%20c` |

   The query-verbatim trap itself is correctly handled — the port rebuilds the
   query by string surgery and never touches `URLSearchParams`, and
   `%20`/`%7e`/valueless-key all survive (confirmed by the golden case and by
   direct probe). These three are path/authority-level, not query-level, and are
   implausible for real newsletter inputs. Record rather than change.

## Low

### L1 — `engine-commands.md` overstates the missing-dependency contract

"Every subcommand prints `newsletter engine: dependencies missing …` and exits 1
if that step was skipped." Verified against a copy of the engine outside
`node_modules` reach:

- `find-substack-post` → correct message, exit 1 ✔
- `fetch-via-defuddle` → `ERR_MODULE_NOT_FOUND` from the dynamic
  `import("defuddle/node")` is caught by `runFetchViaDefuddle`'s own try block,
  reported as "local defuddle failed", then the proxy runs and the command
  **succeeds with exit 0**

The runtime behaviour is better than the doc (graceful degradation). Fix the
sentence, not the code.

### L2 — `\s` is wider in JS than in Go

`NEWSLETTER_NUM_RE`, `TAGS_LINE_RE` and the three `post-stats` regexes use `\s`,
which in JavaScript matches NBSP and other Unicode spaces; Go's RE2 `\s` is
`[\t\n\f\r ]`. So `Newsletter #42` now parses where it previously did not.
An improvement, but it is a silent widening of a parsing contract and belongs in
the accepted-differences list.

### L3 — one export without JSDoc

`find-newsletter-number.js:9` — `export const NEWSLETTER_NUM_RE` is the only
exported symbol in the engine with no doc comment. Every other export
(30 of them) is annotated. Repo policy is JavaScript + JSDoc; this is the one
gap.

### L4 — nothing in CI runs `npm test` or `npm run lint`

`hugo.yml` runs `npm ci` (guarded, for the site build) and `update-projects.yml`
runs `npm ci` for the projects script. Neither runs the new suite, so the
regression coverage this migration just bought only exists on the developer's
machine. A job on `pull_request` / `push` running `npm ci && npm run lint &&
npm test` is a few lines. Flagging as a recommendation, not a blocker — CI was
explicitly out of scope for this pass.

## Verified correct (risk calibration)

Checked directly rather than taken from the report, because the report is the
artifact under review:

- **Seven traps.** Query rebuilt verbatim by string surgery, never
  `URLSearchParams` (`url-utils.js:49-66`). `hasBoundaryMatch` is an index loop
  with the same delimiter set and optional-trailing-slash rule as Go
  (`url-utils.js:259-298`); `/p/foo` vs stored `/p/foo-bar` probed and correctly
  *not* a duplicate. Optional fields are added conditionally, so `title`,
  `author`, `uuid`, `innerUrl` are absent rather than `""`. `cutoff` initialises
  to `null` and is always emitted. `[...text].length` counts code points.
  `padStart(6)` reproduces `%6d`. `decodeURIComponent` is wrapped and falls back
  to the raw substring.
- **JSON key order and types** match the Go struct field order one-for-one in all
  four JSON-emitting commands, and the suite asserts stdout byte-for-byte.
- **Walk order.** `collectMarkdown` sorts each directory's entries lexically and
  recurses in place, reproducing `filepath.WalkDir` ordering — which is what makes
  the `list-existing-tags` tie-break deterministic. `Array.prototype.sort` is
  stable (ES2019+), matching `sort.SliceStable`.
- **`captionForUuid`** is faithful despite the rewrite. Probed the divergence
  candidates — uuid first appearing in a `<meta>`, in an earlier `<a href>`, or
  on an ancestor of the figure — all return `""` in both engines.
- **`process.exit()` after a write** is safe here: on Linux, pipe writes from
  `process.stdout`/`stderr` are synchronous, so no diagnostic is truncated.
- **Call sites.** Every command named in `.claude/skills/`, `docs/`, `AGENTS.md`
  and `README.md` exists with the arguments it is given. `grep "go run"` across
  the repo is empty. All six `.agents/skills/*/SKILL.md` symlinks resolve.
  `mt-add-post` / `mt-webfetch` survive only inside `plans/`, which is correct.
- **Go retirement is complete.** No `.go`, no `go.mod`/`go.sum`, no `GO_VERSION`,
  no `setup-go`. `eslint.config.mjs` is the only remaining `.mjs`.
  `.github/scripts` internal imports were updated to `.js`.

## Carried over from Go, not a regression

`urlBoundaryOk` treats `_` as a delimiter, so `https://x.com/p/foo` is reported
as a duplicate of a stored `https://x.com/p/foo_bar` (probed: `true`). The `_`
is there to let `<uuid>_WxH` match, and the behaviour is byte-identical to the Go
original, so it is out of scope for this migration. Recording it because the
consequence — a URL silently dropped from a newsletter as a false duplicate — is
the kind of failure that is hard to notice after the fact.

## Recommended actions

1. **H1** — remove the import cycle (move `printJson` out of `index.js`) or guard
   `main()`. Then add unit tests for the pure exports that cannot be tested today.
2. **M2** — emit frontmatter from the local tier's `title`/`author`/`site`/
   `description`, or correct `mt-fetch-url/SKILL.md`'s output-handling section.
3. **M1** — add a minimal quality gate before the local tier returns, so a
   200-with-challenge-page does not short-circuit the proxy.
4. **M3** — add the three items to the parity report's accepted differences and
   narrow the `itemLink` "byte-identical" claim.
5. **L1** — correct the missing-dependency sentence in `engine-commands.md`.
6. **L2, L3, L4** — record the `\s` widening; add JSDoc to `NEWSLETTER_NUM_RE`;
   consider a CI job running lint + test.

## Plan status

All five phases in
`plans/260918-0647-migrate-newsletter-engine-to-javascript/plan.md` are marked
Done and every success-criteria checkbox is ticked. Spot-checked against the
repo, each ticked criterion holds. Two carry caveats worth noting before the plan
is closed: the "`npm test` passes from a clean `npm ci`" criterion is true but
fragile per H1, and "one real `mt-add-url` flow completes end-to-end" was not
re-verified in this pass. Plan file not modified — plan mutation belongs to the
lead.

## Metrics

- Type coverage: JSDoc on 30 of 31 exported symbols (L3); no TypeScript, per repo policy
- Test: 33 deterministic assertions pass offline in 2.3s; 8 live cases opt-in
- Lint: 0 issues (`eslint .`)
- Build: n/a (no build step); Go toolchain fully removed from CI and Netlify

## Unresolved questions

1. M2 — align the engine's local tier to the proxy's frontmatter shape, or
   rewrite the skill's output-handling section? The engine change is smaller and
   keeps the skill's title guidance true, but it is a (small) output-contract
   change on a command the user has already accepted as changed.
2. M1 — is a word-count/shape heuristic wanted at all, or is the agent-level
   "no usable content" judgement in `mt-fetch-url` considered sufficient? That
   judgement currently routes past the proxy rather than into it.
3. L4 — is CI for lint/test in scope, or deliberately deferred with the rest of
   the unexercised CI work?
