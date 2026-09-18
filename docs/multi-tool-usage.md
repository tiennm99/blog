# Multi-tool usage (Claude Code · OpenCode · Codex)

This repo is usable from three AI coding tools off **one shared engine**. The newsletter engine lives in `scripts/newsletter/` (Node ESM) and every tool calls it as `node scripts/newsletter <command>` from the repo root — the commands are documented once in [newsletter/engine-commands.md](newsletter/engine-commands.md). Project instructions live once in `AGENTS.md`.

## Per-tool setup & invocation

| Tool | Instruction file | How the workflow surfaces | Setup | Invocation example |
|------|------------------|---------------------------|-------|--------------------|
| **Claude Code** | `CLAUDE.md` → imports `AGENTS.md` | Native skill auto-dispatch from `.claude/skills/` | `npm ci` once | Paste a URL; `mt-add-url` auto-runs |
| **OpenCode** | `AGENTS.md` (auto-read) | `.claude/skills/` auto-discovered via the `skill` tool, governed by `opencode.json` | `npm ci` once; `opencode.json` is committed | Ask to add a URL; pick/`skill` `mt-add-url` |
| **Codex** | `AGENTS.md` (auto-read) | Repository skills discovered from `.agents/skills/` | `npm ci` once | Ask to add a URL or invoke `$mt-add-url` |

**Shared engine:** all three call `node scripts/newsletter <command>` from repo root — no per-tool script copies. It has npm dependencies, so run `npm ci` once after cloning.

### Notes per tool

- **Claude Code** — `CLAUDE.md` is a thin file that imports `AGENTS.md` (`@AGENTS.md`); all instruction content lives in `AGENTS.md`. Permissions in `.claude/settings.json`.
- **OpenCode** — reads `.claude/skills/<name>/SKILL.md` natively (multi-location search up the worktree), so the same `mt-*` skills work with zero duplication. `opencode.json` mirrors the Claude allow-list intent (node/git/hugo/edit). No MCP block — relies on OpenCode's built-in web fetch/search. Restart OpenCode after editing `opencode.json` (config is not hot-reloaded).
- **Codex** — reads repository skills from `.agents/skills/` and can invoke them explicitly (`$mt-add-url`) or implicitly from their descriptions. Each `.agents/skills/<name>/SKILL.md` is a **symlink** to its `.claude/skills/` counterpart, so there is one file to edit and nothing that can drift. If a checkout cannot follow symlinks (Windows without developer mode), replace them with thin pointer files that say "read and follow `.claude/skills/<name>/SKILL.md`".

## Teardown — pick one, remove the rest

Once you commit to one tool, delete the others' config:

- **Keep Claude Code only** → remove `opencode.json` and `.agents/`. Keep `.claude/` and `docs/newsletter/`.
- **Keep OpenCode only** → remove `.claude/settings*.json` and `.agents/`. **Keep `.claude/skills/`** — OpenCode reads it. If you want to drop the `.claude/` dir entirely, first move skills to `.opencode/skills/` (scripts are path-neutral in `scripts/newsletter/`, so the move breaks nothing). Optionally make `AGENTS.md` the only instruction file (delete `CLAUDE.md`).
- **Keep Codex only** → keep `.agents/skills/`, `AGENTS.md`, `scripts/newsletter/`, `docs/newsletter/`, and the canonical `.claude/skills/` files the Codex skills symlink to. You may remove Claude-specific settings and `opencode.json`.

In every case: **keep `scripts/newsletter/`, `.claude/skills/`, `docs/newsletter/`, and `AGENTS.md`** — they are the shared engine, canonical workflows, shared documentation, and instructions.
