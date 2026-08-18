# Migrate Newsletter Scripts from Node.js to Go

**Status:** COMPLETED (2026-08-18) — all 3 phases done; parity report in `plans/reports/parity-260818-newsletter-go-migration-report.md`
**Created:** 2026-08-18
**Scope:** Port the 8-file shared engine in `scripts/newsletter/` (~740 LoC JS, stdlib-only) to a single Go package with 6 subcommands, verify behavior parity, cut over all skill/doc call sites, delete the JS.

## Design Decisions

- **One `package main` with subcommands** at `scripts/newsletter/`, not 6 separate binaries. Subcommand names mirror the old script names (`add-url`, `find-newsletter-number`, `list-existing-tags`, `detect-image-source`, `find-substack-post`, `fetch-via-defuddle`) so skills stay greppable.
- **`go.mod` at repo root** (`module github.com/tiennm99/miti99`). Hugo does not use Go modules here (theme vendored in `themes/`, no `[module]` config), so this is inert to the site build. Gives the simplest documented invocation: `go run ./scripts/newsletter <cmd> [args]` from repo root. (Alternative considered: module inside `scripts/newsletter/` + `go run -C scripts/newsletter . <cmd>` — works, verified, but clunkier in 8 documented call sites.)
- **`go run`, no committed binary.** Build cache makes reruns fast; no stale-binary risk across the 3 AI tools.
- **`go:embed` for `config/substack-publications.json`.** `go run` recompiles on change, so editing the JSON still takes effect; the file stays the editable source of truth. Solves the `__dirname` problem (`os.Executable()` under `go run` points at the build cache, not the source dir).
- **Repo paths resolve from CWD** (`content/post`). The documented contract is already "invoked from the repo root"; missing dir degrades gracefully exactly like the JS (`0` / no duplicates).

## Phases

| Phase | File | Depends on |
|-------|------|------------|
| 1. Port to Go | [phase-01-port-to-go.md](phase-01-port-to-go.md) | — |
| 2. Parity verification | [phase-02-parity-verification.md](phase-02-parity-verification.md) | 1 |
| 3. Cutover, docs, cleanup | [phase-03-cutover-and-docs.md](phase-03-cutover-and-docs.md) | 2 |

JS and Go coexist during phases 1–2 (Go toolchain ignores `.js` files in the package dir); JS is deleted only after phase 2 passes.

## Acceptance Criteria

- All 6 subcommands match the Node output on the phase-02 verification matrix (byte-identical JSON, or drift explicitly documented as acceptable).
- One real `mt-add-url` skill flow works end-to-end on the Go engine.
- `grep -rn "node scripts/newsletter"` across the repo returns nothing (skills, AGENTS.md, README.md, docs/).
- All `.js` files under `scripts/newsletter/` deleted; `config/substack-publications.json` retained.
- `.claude/settings.json` allows `Bash(go *)`.

## Resolved Decisions (user, 2026-08-18)

1. Drop the `Bash(node *)` allow rule at cutover (phase 3).
2. Module path: `github.com/tiennm99/miti99` confirmed.
