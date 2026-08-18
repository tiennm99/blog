# Phase 3 — Cutover, Docs, Cleanup

## Context

Phase 2 passed. Replace every `node scripts/newsletter/<name>.js` invocation with `go run ./scripts/newsletter <name-without-.js>`, update prose, delete JS.

## Call Sites to Update (verified by grep, 2026-08-18)

| File | Lines | Change |
|------|-------|--------|
| `.claude/skills/mt-add-url/SKILL.md` | 23 | `add-url` invocation |
| `.claude/skills/mt-add-post/SKILL.md` | 16 | `add-url` invocation |
| `.claude/skills/mt-add-video/SKILL.md` | 22 | `add-url` invocation |
| `.claude/skills/mt-add-image/SKILL.md` | 24, 30, 37, 41 | `detect-image-source`, `add-url`, `find-substack-post` (×2, incl. `--deep`) |
| `.claude/skills/mt-add-tags/SKILL.md` | 53 | `list-existing-tags` invocation |
| `.claude/skills/mt-webfetch/SKILL.md` | 31, 73 | `fetch-via-defuddle` invocation |
| `.claude/skills/mt-add-url/references/newsletter-post-mechanics.md` | 21 | `find-newsletter-number` invocation |
| `AGENTS.md` | 42–52 | Shared Engine block: command list + prose "plain Node (stdlib only, no deps)" → "Go (stdlib only, `go run`, no deps)" |
| `README.md` | ~42 | shared-engine sentence mentioning node |
| `docs/multi-tool-usage.md` | 3, 13 | "all three call `node scripts/newsletter/*.js`" → Go invocation |

`.agents/skills/` Codex adapters reference the `.claude/skills/` SKILL.md files, not the scripts directly — verify with a final grep, no direct edits expected.

## Steps

1. Update all call sites above (mechanical string replacement per file; keep surrounding comments like `# expect route:image` intact).
2. Add `"Bash(go *)"` to `.claude/settings.json` permissions allow (alphabetical position). Leave `Bash(node *)` pending the plan's open question 1.
3. Delete `scripts/newsletter/*.js` (all 8). Keep `config/substack-publications.json`.
4. Verify: `grep -rn "node scripts/newsletter\|newsletter/[a-z-]*\.js" .claude .agents AGENTS.md README.md docs scripts` → only the go:embed reference to the config JSON may remain.
5. Run each of the 6 Go subcommands once from repo root as a smoke test.
6. `hugo --quiet` (or `hugo server` spot check) to confirm the site build is untouched by root `go.mod`.
7. Commit as `refactor(scripts): migrate newsletter engine from Node to Go` (conventional, no AI references). Run the pre-commit tag check per Git Workflow Rules — no post content changes expected, so it should be a no-op.

## Docs Policy Check

Per documentation-management rules this change affects commands + architecture docs → `AGENTS.md`, `README.md`, `docs/multi-tool-usage.md` updates above are required; no changelog file exists in this repo, so nothing more.

## Risks / Rollback

- Risk: an AI tool (Codex/OpenCode) with a cold Go build cache sees a slow first `go run` (~1–3 s compile). Acceptable; subsequent runs are cached.
- Rollback: `git revert` the cutover commit — JS engine and call sites restore together (single commit contains both).
