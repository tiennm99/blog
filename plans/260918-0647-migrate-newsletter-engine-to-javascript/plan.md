---
title: "Migrate the newsletter engine from Go to JavaScript"
description: "Port the 1168-LOC stdlib-only Go newsletter engine to Node ESM with a parser dependency, prove parity with a committed golden-output suite, restructure the mt-* skills around a single command reference, and retire Go from the repo."
status: in-progress
priority: P1
effort: "2-3d"
tags: [newsletter, scripts, skills, migration, javascript]
created: 2026-09-18
---

# Migrate the newsletter engine from Go to JavaScript

## Overview

`scripts/newsletter/` is a 10-file, 1168-LOC `package main` in Go, stdlib-only,
invoked as `go run ./scripts/newsletter <cmd>` from ten files
across `.claude/skills/`, `.agents/skills/`, `AGENTS.md`, `README.md`, and
`docs/multi-tool-usage.md`. This plan replaces it with a Node ESM engine invoked
as `node scripts/newsletter <cmd>`, takes on a small set of justified npm
dependencies, proves behavioral parity with committed golden fixtures, folds the
skill layer onto one canonical command reference, and deletes Go from the repo
and CI.

The engine has seven subcommands: `add-url`, `find-newsletter-number`,
`list-existing-tags`, `detect-image-source`, `find-substack-post`,
`fetch-via-defuddle`, `post-stats`.

## Context: this reverses a same-day recommendation

`plans/reports/research-260918-1139-script-language-choice.md` (2026-09-18)
concludes *"`scripts/newsletter/` stays Go. No GitHub API, no deps, no latency
problem, three agent runtimes served identically."* `CLAUDE.md` also ranks Go
above JavaScript for new work.

The user reviewed that and chose to migrate anyway (2026-09-18). Phase 4 records
the override in the report itself so the repo record is not self-contradictory.
The plan does not re-litigate the decision; it does carry the report's strongest
objection forward as the tracked risk (see **Risks**, R1).

## Goals

| # | Goal | Priority |
|---|------|----------|
| 1 | Seven subcommands running on Node with output parity against the Go engine | P1 |
| 2 | Hand-rolled HTML/XML regex extraction replaced by a real parser | P1 |
| 3 | A committed regression suite the engine did not have before | P1 |
| 4 | One canonical command reference; no enumeration of the engine's commands in more than one file | P2 |
| 5 | Go fully removed from the repo, CI, and Netlify | P2 |
| 6 | One module extension across the repo's JavaScript | P3 |

## Non-goals

- `.github/scripts/` keeps its current logic. Its Octokit migration is a separate
  recommendation in the same research report and is not in scope. Phase 5 renames
  its files' extensions only — no behavior change.
- No change to what the skills *do* — only to what they invoke and where their
  shared prose lives.
- No new subcommands. The port is behavior-preserving except where this plan
  names a deliberate improvement.

## Design decisions

**Invocation stays positional and short.** `node scripts/newsletter <cmd> [args]`
from the repo root, matching the Go contract one-for-one. Node directory
resolution requires `scripts/newsletter/index.js` (not `.mjs`), so the new engine
uses `.js`; the root `package.json` already declares `"type": "module"`, so `.js`
is ESM and the existing `eslint.config.mjs` already lints `**/*.js`.
`.github/scripts/` currently uses `.mjs`; phase 5 unifies it onto `.js` for the
same reasons (see that phase for the empirical check).

**Module layout mirrors the Go files 1:1** so the parity diff is reviewable:
`index.js` (dispatch) and one module per current `.go` file. A 1:1 map makes any
behavioral drift attributable to a single file.

**Dependencies (3, each load-bearing).** The user authorized npm dependencies
while asking to stay minimal:

| Package | Replaces | Why it earns its place |
|---|---|---|
| `cheerio` ^1.2.0 | ~12 hand-rolled regexes in `html_text.go` + `find_substack_post.go` | One parser covers HTML *and* RSS/sitemap XML (`xmlMode`), so no second XML dep. Eliminates `captionForUUID`'s manual `LastIndex("<figure")` string surgery — the single most fragile function in the engine. |
| `defuddle` ^0.19.4 | nothing — it *adds* a tier ahead of the `defuddle.md` proxy, which stays | Runs extraction locally, so the chain no longer depends on a single third-party service being up. See the two-tier decision below for why the proxy is not dropped. |
| `linkedom` ^0.18.12 | — | `defuddle/node`'s DOM, an optional dep that must be declared explicitly. Chosen by defuddle itself; far lighter than jsdom. |

Rejected: `fast-xml-parser` (cheerio's `xmlMode` covers it), `jsdom` (defuddle
prefers linkedom), any test framework (`node:test` is built in).

**Tests use `node:test` + `node:assert`, zero dependencies.** Adds `npm test`.

**`fetch-via-defuddle` gains a local tier and keeps the remote one.** The Go
version proxies through `https://defuddle.md/<url>`. The point of that proxy is
that it fetches from a *different IP* than the blocked caller. Running defuddle
locally fetches from this box's IP instead — a genuinely different IP from the
one WebFetch uses, but not the same third IP the proxy provides. Both are kept:
local defuddle first, `defuddle.md` on failure. Dropping the proxy would silently
narrow the skill's coverage.

**Exit codes get more precise.** `fetch-via-defuddle` defines exit 2 (bad args)
vs 1 (fetch failed), but `go run` collapses every nonzero exit to 1 — documented
in a comment in `fetch_via_defuddle.go`. Node preserves them, so the distinction
becomes real for the first time.

## Phases

| # | Phase | Status | Depends on |
|---|-------|--------|------------|
| 1 | [Port the engine to JavaScript](./phase-01-port-engine-to-javascript.md) | Done | — |
| 2 | [Golden-output parity suite](./phase-02-parity-test-suite.md) | Done | 1 |
| 3 | [Skill restructure and call-site cutover](./phase-03-skills-restructure-and-cutover.md) | Done | 2 |
| 4 | [Retire the Go toolchain](./phase-04-retire-go-toolchain.md) | Done | 2, 3 |
| 5 | [Unify module extensions on `.js`](./phase-05-unify-module-extensions.md) | Done | 3 |

Go and JS coexist through phases 1-3 — parity cannot be measured against a
deleted reference. Phase 4 is the only irreversible step. Phase 5 is P3 and
independent; drop it without affecting anything else.

## Success criteria

- [x] All seven subcommands run under `node scripts/newsletter <cmd>` and match
      the Go engine on the phase-2 case matrix (byte-identical stdout, or drift
      recorded as an accepted improvement with a reason).
- [x] `npm test` passes from a clean `npm ci`.
- [x] `npm run lint` passes over `scripts/newsletter/`.
- [x] One real `mt-add-url` flow (article + YouTube + Substack image) completes
      end-to-end on the JS engine and writes the same markdown the Go engine
      would have.
- [x] `grep -rn "go run" .claude .agents AGENTS.md README.md docs scripts` returns
      nothing. Evaluated after phase 4 — phase 3's narrower version of this check
      excludes `scripts/`, because the Go sources document their own invocation
      and survive until phase 4 deletes them.
- [x] The engine's seven commands are enumerated in exactly one file
      (`docs/newsletter/engine-commands.md`); every other mention is a link.
- [x] No `.go` file, no `go.mod`, no Go setup step, no `GO_VERSION` anywhere in
      the repo.
- [x] One module extension: no `.mjs` outside `eslint.config.mjs`.
- [x] A fresh `git clone` + `npm ci` runs every subcommand successfully.

## Risks

**R1 — `npm ci` becomes a prerequisite the engine never had.** This is the
research report's strongest objection and the migration's real cost. Go's
stdlib-only engine ran on a bare clone; the JS engine will not, because
`node_modules` is gitignored. Three agent runtimes (Claude Code, OpenCode, Codex)
on a headless ARM64 box all hit this.
*Mitigation:* `index.js` catches `ERR_MODULE_NOT_FOUND` on the dependency imports
and exits with `newsletter engine: dependencies missing — run 'npm ci' from the
repo root` instead of a raw stack trace. Setup docs state it once.
*Signal it broke:* any skill run failing with a module-resolution error.
*Response:* if this proves to be recurring friction rather than a one-time setup
step, vendor the three deps or fall back to the stdlib implementations in
`html_text.js` — do not re-litigate the language choice.

**R2 — silent output drift in the port.** Seven of the Go functions encode
non-obvious decisions (query-string order preservation, `omitempty`, rune-vs-byte
length, `null` vs omitted fields). A JS-idiomatic rewrite breaks them quietly and
the damage lands in published posts.
*Mitigation:* phase 2's golden fixtures are captured from the Go engine *before*
the JS is trusted, and phase 1 lists all seven traps explicitly.
*Signal:* any fixture mismatch.
*Response:* match Go, do not "improve" — parity first, improvements as a separate
recorded decision.

**R3 — cheerio changes extraction results.** Replacing regexes with a real parser
is the point, but a parser will legitimately extract *different* (usually better)
text on malformed markup.
*Mitigation:* treat extraction differences as expected-to-review rather than
expected-to-match; phase 2 records each one with a judgment.
*Response:* accept improvements, document them; reject anything that loses
content the regex found.

**R4 — Codex may not follow symlinked skill files.** Phase 3's `.agents`
de-duplication assumes it does; this is untested.
*Mitigation:* verify before committing the symlinks.
*Response:* fall back to the current thin-pointer adapters, which already work.

## Resolved during validation (2026-09-18)

**Skill naming — uniform `mt-<verb>-<object>`.** Two of the six violate it today;
the other four already conform, so renaming them would be churn.

| Current | New |
|---|---|
| `mt-add-url` | unchanged (dispatcher) |
| `mt-add-post` | **`mt-add-article`** — it adds an article *to* a post |
| `mt-add-video` | unchanged |
| `mt-add-image` | unchanged |
| `mt-add-tags` | unchanged |
| `mt-webfetch` | **`mt-fetch-url`** — verb-object, like its siblings |

**Fixture redirection uses the subprocess CWD, not a config knob.** Both engines
already resolve `content/post` from the process working directory, so phase 2's
tests set `cwd` and neither engine gains a test-only environment variable.

**R1 mitigation stays at a clear error message.** No auto-`npm ci` in the skills
and no self-installing engine; `npm ci` is a documented one-time setup step.

**Module extension unified on `.js`** — see phase 5.

## Validation Log

### Session 1 — 2026-09-18

**Verification pass:** Standard tier (5 phases at time of writing: 4).
Claims checked 24 · Verified 19 · Failed 5.

| # | Claim | Result | Evidence |
|---|---|---|---|
| F1 | `netlify.toml` `GO_VERSION` at line 4 | FAILED | it is line 3; `HUGO_VERSION` is line 4 — corrected in phase 4 |
| F2 | `hugo.yml` Setup Go step at lines 32-37 | FAILED | it is 33-37 — corrected in phase 4 |
| F3 | `hugo.yml` Go verify line at 61 | FAILED | it is line 64 — corrected in phase 4 |
| F4 | Phase 3 criterion `grep -rn "go run" … scripts` → empty | FAILED | the 10 Go sources carry 16 `go run` occurrences in their own doc comments, so it cannot pass before phase 4 — criterion rescoped to exclude `scripts/` |
| F5 | Phase 2 requires `NEWSLETTER_CONTENT_DIR`; phase 1 never adds it | FAILED | contract gap between phases — resolved by dropping the env var for CWD redirection |
| V1 | Node directory resolution needs `index.js`, not `index.mjs` | VERIFIED | empirical: `node eng` fails with `Cannot find module` when only `index.mjs` exists; resolves once `index.js` is added |
| V2 | Hugo has no `[module]` config, so Go has no other consumer | VERIFIED | grep across `config/` returns nothing |
| V3 | All phase-3 call-site line numbers | VERIFIED | `grep -n` across `.claude`, `.agents`, `AGENTS.md`, `README.md`, `docs/` |
| V4 | `defuddle` exports `./node`; `linkedom` is an optional dep | VERIFIED | `npm view defuddle exports optionalDependencies` |
| V5 | `opencode.json` allows `node *` and never allowed `go *` | VERIFIED | read directly |

**Questions asked:** 5 across two rounds. All answered; no unresolved decisions.

### Whole-Plan Consistency Sweep

Run after propagating the decisions above to phases 1-5.

- `NEWSLETTER_CONTENT_DIR` removed from every plan file — 0 remaining hits.
- `mt-add-post` / `mt-webfetch` appear only as *old* names in phase 3's rename
  table and call-site inventory, which is correct.
- The design-decisions `.mjs` note in `plan.md` reconciled with phase 5's
  existence (phase 1 carried no such note).
- Non-goals reconciled: `.github/scripts/` logic stays out of scope; its
  extensions do not.
- Success criteria in `plan.md` and phases 3, 4, 5 agree on what `grep` must
  return and when.
- Two contradictions found and fixed during the sweep:
  1. The dependency table listed `defuddle` as *replacing* the `defuddle.md`
     proxy, contradicting the two-tier design decision that keeps both.
  2. `plan.md`'s `go run` criterion and phase 3's differed on whether `scripts/`
     is included; both now state which phase they are evaluated after.
- **Unresolved contradictions: 0.**
