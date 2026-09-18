# AGENTS.md

Canonical instructions for AI coding tools (Claude Code, OpenCode, Codex) working with this Hugo blog. This is the single source of truth; `CLAUDE.md` imports it.

## Project Info

- **Type**: Hugo static site with Vietnamese tech content
- **Theme**: hugo-theme-stack
- **Post content language**: Vietnamese (with common English tech words)
- **User communication**: English by default; use another language only when the user explicitly requests it
- **Timezone**: Asia/Ho_Chi_Minh (UTC+7)

Vietnamese language requirements apply only to prose written into Hugo posts, including summaries. Preserve article titles and image labels in their original source language, wording, capitalization, and punctuation; translate them only when the user explicitly asks. Keep questions, status updates, reports, and final responses in English unless the user asks for another language.

## Directory Structure

```
content/post/
└── YYYY/
    └── MM/
        └── DD/
            └── index.md
```

## Starting Local Development Server

```bash
hugo server -D
```

The site will be available at `http://localhost:1313`

**Options:**
- `-D` or `--buildDrafts`: Include draft content
- `-F` or `--buildFuture`: Include future-dated content
- `--disableFastRender`: Full re-render on all changes

---

## Shared Engine

The portable newsletter engine lives in **`scripts/newsletter/`** (Node ESM, one
module per subcommand) and is invoked from the repo root:

```bash
node scripts/newsletter <command> [args]
```

The seven subcommands, their arguments, output shapes and exit codes are
documented once in **[docs/newsletter/engine-commands.md](docs/newsletter/engine-commands.md)**.

The engine has npm dependencies, so a fresh clone needs `npm ci` from the repo
root once before any skill will run.

The engine is shared by all three tools — no tool-specific copies.

---

## Newsletter Workflow Routing

The newsletter workflow adds URLs (articles, YouTube videos, images) to the target newsletter post — today's post, or an earlier unpublished draft the user pins for the session — and manages tags. How it surfaces depends on the tool:

- **Claude Code / OpenCode** — invoke skills (both read `.claude/skills/<name>/SKILL.md` natively):
  - `mt-add-url` — meta dispatcher: classifies each URL, auto-invokes the right handler. **Default entry for adding URLs.**
  - `mt-add-article` — article/blog URL → newsletter main content
  - `mt-add-video` — YouTube link → Bonus → Videos
  - `mt-add-image` — image → Bonus → Images (labels Substack images via source-post lookup)
  - `mt-add-tags` — add/update tags in post frontmatter
  - `mt-fetch-url` — fallback web fetch chain (local defuddle, the defuddle.md proxy, then a reader proxy); use only when built-in WebFetch is blocked
- **Codex** — discovers the repository-scoped adapters in `.agents/skills/`. Ask it to add a URL for implicit routing or invoke `$mt-add-url` explicitly.

`mt-add-url` dispatches `article` / `youtube` / `image`; other types (direct video files, documents, unknown) prompt the user to add or extend a handler.

Canonical skill implementations live in `.claude/skills/`; `.agents/skills/` symlinks to them so there is only ever one copy to edit.

### Using Codex

Codex automatically discovers checked-in skills from `.agents/skills/`. No install or copy step is required. Start Codex at the repository root, then either describe the task normally or explicitly mention a skill:

- `$mt-add-url <url>` — classify and dispatch one or more URLs
- `$mt-add-article <url>` — add an article directly
- `$mt-add-video <url>` — add a YouTube video directly
- `$mt-add-image <url>` — add an image directly
- `$mt-add-tags [post]` — add or update tags
- `$mt-fetch-url <url>` — fallback after the built-in fetch fails

Codex detects skill changes automatically; restart Codex if an update does not appear.

---

## Git Workflow Rules

**Before any git commit**, check all staged `content/post/*/index.md` files for minimal tags. If any have only `["AI-Assisted"]` or empty tags, run the `mt-add-tags` workflow on them first before committing.
