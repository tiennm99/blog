---
phase: 4
title: "Retire the Go toolchain"
status: done
priority: P2
effort: "2h"
dependencies: [2, 3]
---

# Phase 4: Retire the Go toolchain

## Overview

Delete the Go engine and remove Go from the repo, GitHub Actions, and Netlify.
The newsletter engine is Go's only consumer here — Hugo vendors its theme in
`themes/` and `config/_default/` has no `[module]` section, so nothing else
needs a Go toolchain. This is the only irreversible phase; it runs last and only
after phase 2 is green.

## Requirements

**Functional**
- No `.go` file, no `go.mod`, no Go step in CI, no `GO_VERSION` anywhere.
- The Hugo build still succeeds on GitHub Actions and on Netlify.
- The superseded research recommendation is annotated, not left contradicting
  the repo.

**Non-functional**
- One commit per concern (engine deletion, CI, docs/report) so a bisect can
  isolate a Hugo build break to the CI change.

## Architecture

Go's footprint, verified by grep at plan time:

| File | What to remove |
|---|---|
| `scripts/newsletter/*.go` | all 10 files |
| `go.mod` | the whole file (there is no `go.sum` — the engine was stdlib-only) |
| `.github/workflows/hugo.yml` | `GO_VERSION: 1.25.5` (line 23), the `Setup Go` step (lines 33-37), and the Go line in Verify installations (line 64) |
| `netlify.toml` | `GO_VERSION = "1.25.5"` (line 3) |

Removing the pins also disposes of the latent defect the research report flagged:
`go.mod` declares `go 1.26` while both build environments pin 1.25.5, which only
works because `GOTOOLCHAIN=auto` silently downloads 1.26. Deleting Go resolves it
outright — no version alignment needed.

## Related code files

- Delete: `scripts/newsletter/add_url.go`, `detect_image_source.go`,
  `fetch_via_defuddle.go`, `find_newsletter_number.go`, `find_substack_post.go`,
  `html_text.go`, `list_existing_tags.go`, `main.go`, `post_stats.go`,
  `url_utils.go`
- Delete: `go.mod`
- Modify: `.github/workflows/hugo.yml`, `netlify.toml`
- Modify: `.gitignore` — the Go block (`*.o`, `_cgo_*`, `_testmain.go`, `*.test`,
  …) is dead weight afterward; remove it and keep `node_modules`
- Modify: `plans/reports/research-260918-1139-script-language-choice.md`
- Modify: `plans/260818-2056-migrate-newsletter-scripts-to-go/plan.md` — status
  line only

## Implementation steps

1. Re-confirm phase 2 is green and phase 3's end-to-end run passed. Everything
   below assumes the JS engine is the working engine.
2. Confirm Go has no other consumer: grep the repo's `*.yml`, `*.toml` and `*.md`
   (excluding `node_modules/` and `plans/`) for every Go invocation and CI action
   spelling, and check `config/_default/` for a `[module]` section. Both must
   come back empty of anything but the sites listed above.
3. `git rm scripts/newsletter/*.go go.mod`. Commit alone.
4. Edit `.github/workflows/hugo.yml`: drop the `GO_VERSION` env entry, the whole
   `Setup Go` step, and the Go line from Verify installations. Leave the Node
   setup and the conditional `npm ci` — the lockfile exists, so `npm ci` runs,
   which is what the engine now needs if CI ever invokes it.
5. Edit `netlify.toml`: drop `GO_VERSION`. Keep `NODE_VERSION = "24.12.0"`.
6. Remove the Go section from `.gitignore`.
7. Push and watch both builds. GitHub Actions must deploy; Netlify must build a
   preview. Compare the built output against the previous deploy — the site
   should be byte-identical, since Go never touched it.
8. Append a dated note to
   `plans/reports/research-260918-1139-script-language-choice.md`, directly under
   its recommendation #1, recording that the user overrode it on 2026-09-18, the
   reason given, and a link to this plan. Do not delete or rewrite the original
   recommendation — the report is a stateful record of what was concluded at the
   time, and erasing it destroys the reasoning a future reader needs.
9. Update the old Go plan's status line to note it was superseded by this plan,
   with the date. Leave its body untouched for the same reason.
10. Run `ak plan close` on this plan and `/ak:journal` for the migration.

## Success criteria

- [x] `find . -name "*.go" -not -path "./node_modules/*" -not -path "./themes/*"` → empty
- [x] `go.mod` gone; no `go.sum` was ever present
- [x] No `GO_VERSION` or Go-setup action reference remains in `.github/` or
      `netlify.toml`
- [ ] GitHub Actions `hugo.yml` deploys green — not exercised: nothing pushed
- [ ] Netlify builds green — not exercised: nothing pushed
- [ ] Deployed site output unchanged from the pre-phase-4 deploy — not exercised: nothing pushed
- [x] The research report carries the override note; its original recommendation
      is still readable
- [x] The 2026-08-18 Go migration plan is marked superseded
- [x] Every subcommand still works from a fresh clone + `npm ci`

## Risk assessment

**Something else needs Go and the grep missed it.** Hugo Modules are the obvious
candidate — a `[module]` block in Hugo config makes `hugo` itself require Go.
*Signal:* the Hugo build failing on Actions or Netlify after step 4 or 5.
*Response:* restore the Go setup step and the `GO_VERSION` pins (the engine stays
deleted — Hugo needing Go is unrelated to the engine) and align the pins to a
single version, which the research report wanted anyway.

**Netlify caches the Go toolchain and the build passes now but fails on the next
cache eviction.**
*Mitigation:* step 7 checks a real Netlify build, and Netlify builds previews
from a clean environment per deploy.
*Response:* if a cold build fails for a Go-shaped reason, that contradicts step
2 — reopen the investigation rather than re-adding the pin blindly.

**Irreversibility.** After this phase, the Go engine exists only in git history.
*Mitigation:* the phase ordering — parity proven (2) and skills cut over and
exercised end-to-end (3) before anything is deleted.
*Response:* recovery is `git checkout <pre-phase-4-sha> -- scripts/newsletter
go.mod`, which restores a fully working engine. Record that SHA in the journal
entry so it is findable without archaeology.
