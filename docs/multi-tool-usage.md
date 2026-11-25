# AI agent support

The repo supports two config formats:

- **Claude Code**: `CLAUDE.md` and `.claude/`.
- **Agents**: `AGENTS.md` and `.agents/`. Any agent that reads them works; other formats are not maintained.

The Claude format holds the real files and the Agents format is symlinks to it, so every instruction and skill exists once.

Every agent runs the newsletter engine the same way, `node scripts/newsletter <command>` from the repo root, documented in [newsletter/engine-commands.md](newsletter/engine-commands.md). It has npm dependencies, so run `npm ci` once after cloning.

## Layout

| Path | Role |
|------|------|
| `CLAUDE.md` | The only instruction file. All content goes here |
| `AGENTS.md` | Symlink to `CLAUDE.md` |
| `.claude/skills/<name>/SKILL.md` | Skills |
| `.agents/skills` | Symlink to `.claude/skills` |
| `.claude/settings.local.json` | Personal Claude Code settings, gitignored |

Claude Code reads `CLAUDE.md` and `.claude/skills/`, and does not read `AGENTS.md` while a `CLAUDE.md` exists, so it loads the instructions once. Skills name Claude Code tools; `CLAUDE.md` maps them for other agents. Agents with a sandbox need outbound network for the engine and the fetch tiers.

## Adding a skill

Write `.claude/skills/<name>/SKILL.md` with `name` and `description` frontmatter, and add it to the skill list in `CLAUDE.md`. The `.agents/skills` symlink makes it visible to other agents with no extra step.

## Checkouts without symlinks

Git checks symlinks out as small text files holding the target path when symlinks are off (Windows without developer mode, or `core.symlinks=false`). Then other agents see neither the instructions nor the skills. Turn on developer mode and set `git config core.symlinks true` before cloning.
