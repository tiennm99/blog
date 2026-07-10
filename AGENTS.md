# AGENTS.md

Canonical instructions for AI coding tools (Claude Code, OpenCode, Codex) working with this Hugo blog. This is the single source of truth; `CLAUDE.md` imports it.

## Project Info

- **Type**: Hugo static site with Vietnamese tech content
- **Theme**: hugo-theme-stack
- **Post content language**: Vietnamese (with common English tech words)
- **User communication**: English by default; use another language only when the user explicitly requests it
- **Timezone**: Asia/Ho_Chi_Minh (UTC+7)

Vietnamese language requirements apply only to content written into Hugo posts, including summaries and localized labels. Keep questions, status updates, reports, and final responses in English unless the user asks for another language.

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

All portable newsletter scripts live in **`scripts/newsletter/`** and are invoked from the repo root with plain Node (stdlib only, no deps):

```bash
node scripts/newsletter/add-url.js "<url>"              # classify + dedup a URL → JSON route
node scripts/newsletter/find-newsletter-number.js       # next newsletter number
node scripts/newsletter/list-existing-tags.js           # existing tag frequencies
node scripts/newsletter/detect-image-source.js "<url>"  # detect Substack image + uuid
node scripts/newsletter/find-substack-post.js --uuid <uuid>
node scripts/newsletter/fetch-via-defuddle.js "<url>"   # fallback fetch (defuddle proxy)
```

These are shared by all three tools — no tool-specific copies.

---

## Newsletter Workflow Routing

The newsletter workflow adds URLs (articles, YouTube videos, images) to today's newsletter post and manages tags. How it surfaces depends on the tool:

- **Claude Code / OpenCode** — invoke skills (both read `.claude/skills/<name>/SKILL.md` natively):
  - `mt-add-url` — meta dispatcher: classifies each URL, auto-invokes the right handler. **Default entry for adding URLs.**
  - `mt-add-post` — article/blog URL → newsletter main content
  - `mt-add-video` — YouTube link → Bonus → Videos
  - `mt-add-image` — image → Bonus → Images (labels Substack images via source-post lookup)
  - `mt-add-tags` — add/update tags in post frontmatter
  - `mt-webfetch` — fallback web fetcher (defuddle proxy); use only when built-in WebFetch is blocked
- **Codex** — no skill auto-dispatch. Run `/prompts:mt-add-url <url>` (installed prompts; see "Using Codex" below), or read this file and call the `scripts/newsletter/*.js` scripts directly.

`mt-add-url` dispatches `article` / `youtube` / `image`; other types (direct video files, documents, unknown) prompt the user to add or extend a handler.

Skill implementations live in `.claude/skills/`.

### Using Codex

Codex has no skill auto-dispatch and loads custom prompts only from `~/.codex/prompts/`. Install the repo's prompt sources once, then invoke them as slash commands:

- **Linux/macOS:** `bash codex/install.sh`
- **Windows:** `pwsh codex/install.ps1` (or `powershell codex/install.ps1`)

Then in a Codex session at the repo root: `/prompts:mt-add-url <url>` (also `/prompts:mt-add-post`, `mt-add-video`, `mt-add-image`, `mt-add-tags`, `mt-webfetch`).

The installer **copies** prompts (not symlinks — Windows symlinks need admin/Developer Mode). **Re-run it after editing any `codex/prompts/*.md`** so `~/.codex/prompts/` re-syncs. Even without installing, Codex can read this file and call the `scripts/newsletter/*.js` scripts directly.

---

## Git Workflow Rules

**Before any git commit**, check all staged `content/post/*/index.md` files for minimal tags. If any have only `["AI-Assisted"]` or empty tags, run the `mt-add-tags` workflow on them first before committing.
