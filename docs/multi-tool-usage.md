# Multi-tool usage (Claude Code · OpenCode · Codex)

This repo is usable from three AI coding tools off **one shared engine**. The newsletter scripts live in `scripts/newsletter/` and every tool calls them as `node scripts/newsletter/*.js` from the repo root. Project instructions live once in `AGENTS.md`.

## Per-tool setup & invocation

| Tool | Instruction file | How the workflow surfaces | Setup | Invocation example |
|------|------------------|---------------------------|-------|--------------------|
| **Claude Code** | `CLAUDE.md` → imports `AGENTS.md` | Native skill auto-dispatch from `.claude/skills/` | None (works as-is) | Paste a URL; `mt-add-url` auto-runs |
| **OpenCode** | `AGENTS.md` (auto-read) | `.claude/skills/` auto-discovered via the `skill` tool, governed by `opencode.json` | None beyond `opencode.json` (committed) | Ask to add a URL; pick/`skill` `mt-add-url` |
| **Codex** | `AGENTS.md` (auto-read) | Custom prompts copied to `~/.codex/prompts/` | `bash codex/install.sh` (Linux/macOS) or `pwsh codex/install.ps1` (Windows) | `/prompts:mt-add-url <url>` |

**Shared engine:** all three call `node scripts/newsletter/*.js` from repo root — no per-tool script copies.

### Notes per tool

- **Claude Code** — `CLAUDE.md` is a thin file that imports `AGENTS.md` (`@AGENTS.md`); all instruction content lives in `AGENTS.md`. Permissions in `.claude/settings.json`.
- **OpenCode** — reads `.claude/skills/<name>/SKILL.md` natively (multi-location search up the worktree), so the same `mt-*` skills work with zero duplication. `opencode.json` mirrors the Claude allow-list intent (node/git/hugo/edit). No MCP block — relies on OpenCode's built-in web fetch/search. Restart OpenCode after editing `opencode.json` (config is not hot-reloaded).
- **Codex** — no skill auto-dispatch; loads prompts only from `~/.codex/prompts/` (project-level `.codex/prompts` is not yet shipped). The installer **copies** prompt sources there (not symlinks — Windows symlinks need admin/Developer Mode). **Re-run the installer after editing any `codex/prompts/*.md`.** Even without installing, Codex can read `AGENTS.md` and call the scripts directly.

## Teardown — pick one, remove the rest

Once you commit to one tool, delete the others' config:

- **Keep Claude Code only** → remove `opencode.json` and `codex/`; uninstall the prompts with `rm ~/.codex/prompts/mt-*.md`. Keep `.claude/`.
- **Keep OpenCode only** → remove `.claude/settings*.json` and `codex/` (+ `rm ~/.codex/prompts/mt-*.md`). **Keep `.claude/skills/`** — OpenCode reads it. If you want to drop the `.claude/` dir entirely, first move skills to `.opencode/skills/` (scripts are path-neutral in `scripts/newsletter/`, so the move breaks nothing). Optionally make `AGENTS.md` the only instruction file (delete `CLAUDE.md`).
- **Keep Codex only** → remove `opencode.json` and `.claude/`; the workflow survives as `codex/prompts/` + `AGENTS.md`. Keep `scripts/newsletter/` and re-run `codex/install.sh`.

In every case: **keep `scripts/newsletter/` and `AGENTS.md`** — they are the shared engine and instructions.
