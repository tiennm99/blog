# AI agent support

The repo supports two config formats:

- **Claude Code**: `CLAUDE.md` and `.claude/`.
- **Agents**: `AGENTS.md` and `.agents/`. Any agent that reads them works; other formats are not maintained.

Every agent runs the newsletter engine the same way, `node scripts/newsletter <command>` from the repo root, documented in [newsletter/engine-commands.md](newsletter/engine-commands.md). It has npm dependencies, so run `npm ci` once after cloning.

## Layout

| Path | Role |
|------|------|
| `AGENTS.md` | The only instruction file. All content goes here |
| `CLAUDE.md` | Imports `AGENTS.md` (`@AGENTS.md`); holds no instructions |
| `.claude/skills/<name>/SKILL.md` | Canonical skills |
| `.agents/skills/<name>/SKILL.md` | Symlinks to the canonical skills, one per skill |
| `.claude/settings.local.json` | Personal Claude Code settings, gitignored |

Claude Code reads `AGENTS.md` on its own only when no `CLAUDE.md` exists in the working directory or above it, so the import in `CLAUDE.md` is what loads it in every case. Claude Code does not read `.agents/`.

Skills name Claude Code tools; `AGENTS.md` maps them for other agents. Agents with a sandbox need outbound network for the engine and the fetch tiers.

## Adding a skill

1. Write `.claude/skills/<name>/SKILL.md` with `name` and `description` frontmatter.
2. Link it into `.agents/`:

   ```bash
   mkdir -p .agents/skills/<name>
   ln -s ../../../.claude/skills/<name>/SKILL.md .agents/skills/<name>/SKILL.md
   ```

3. Add it to the skill list in `AGENTS.md`, and commit the skill and the symlink together.

If a checkout cannot follow symlinks (Windows without developer mode), replace each symlink with a thin file that says "read and follow `.claude/skills/<name>/SKILL.md`".
