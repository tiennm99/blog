# Project instructions

Instructions for AI coding agents working with this Hugo blog. This file is `CLAUDE.md`, and `AGENTS.md` is a symlink to it, so Claude Code and any agent that reads `AGENTS.md` load the same text. Edit `CLAUDE.md` only.

## Project Info

- **Type**: Hugo static site with Vietnamese tech content
- **Theme**: nocturne, its own repo [`tiennm99/nocturne`](https://github.com/tiennm99/nocturne), imported as a Hugo Module pinned in `go.mod` (needs Go). Make theme changes and CHANGELOG entries in that repo, then bump the blog with `hugo mod get -u github.com/tiennm99/nocturne`; preview unpushed theme edits with `HUGO_MODULE_REPLACEMENTS="github.com/tiennm99/nocturne -> ../../nocturne" hugo server` (the path resolves from `themes/`, so `../../nocturne` is the clone next to this repo)
- **Post content language**: Vietnamese (with common English tech words)
- **Site languages**: English (default, at `/`) and Vietnamese (under `/vi/`), set in `config/_default/languages.yml`. Posts are still written in Vietnamese first: the source is `index.vi.md` and its English translation is the sibling `index.md`, which Hugo assigns to the default language because it has no language suffix
- **Author names**: Use `miti99` in site copy and `MiTi` when referring to the author in posts. The author's real name belongs on the About page only.
- **User communication**: English by default; use another language only when the user explicitly requests it
- **Timezone**: Asia/Ho_Chi_Minh (UTC+7)

Vietnamese language requirements apply only to prose written into Hugo posts, including summaries. Preserve article titles and image labels in their original source language, wording, capitalization, and punctuation; translate them only when the user explicitly asks. Keep questions, status updates, reports, and final responses in English unless the user asks for another language. YouTube video titles in Bonus → Videos are the deliberate exception: they are localized into Vietnamese, keeping proper nouns and product names (see `mt-add-video`).

## Directory Structure

```
content/posts/
└── YYYY/
    └── MM/
        └── DD/
            ├── index.vi.md   ← Vietnamese source, served under /vi/
            └── index.md      ← English translation (default language, served at /)
```

## Starting Local Development Server

```bash
hugo server -D
```

The site will be available at `http://localhost:1313`

Search uses a Pagefind index that `hugo server` does not build. To test search, run `hugo && npx pagefind --site public --serve` (CI runs `npx pagefind --site public` after `hugo`).

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

The ten subcommands, their arguments, output shapes and exit codes are
documented once in **[docs/newsletter/engine-commands.md](docs/newsletter/engine-commands.md)**.

The engine has npm dependencies, so a fresh clone needs `npm ci` from the repo
root once; Substack image lookup and local defuddle extraction depend on it
(details in engine-commands.md).

The engine is shared by every tool — no tool-specific copies.

---

## Newsletter Workflow Routing

The newsletter workflow adds URLs (articles, YouTube videos, images) to the target newsletter post — today's post, or an earlier unpublished draft the user pins for the session — and manages tags. It runs through these skills:

- `mt-add-url` — meta dispatcher: classifies each URL, auto-invokes the right handler. **Default entry for adding URLs.**
- `mt-add-article` — article/blog URL → newsletter main content
- `mt-add-video` — YouTube link → Bonus → Videos
- `mt-add-image` — image → Bonus → Images (labels Substack images via source-post lookup)
- `mt-add-tags` — add/update tags in post frontmatter
- `mt-rewrite-newsletter` — rewrite existing newsletter summaries with a newer model, keeping handwritten lines and stamping a rewrite note
- `mt-translate-post` — create or sync a post's English `index.md` from its Vietnamese `index.vi.md`; also lists untranslated and stale posts. The `mt-add-*` handlers and `mt-rewrite-newsletter` call it, so newsletters stay bilingual as they grow
- `mt-fetch-url` — fallback web fetch chain (local defuddle, the defuddle.md proxy, a reader proxy, then a local headless browser via agent-browser); use only when built-in WebFetch is blocked

`mt-add-url` dispatches `article` / `youtube` / `image`; other types (direct video files, documents, unknown) prompt the user to add or extend a handler.

Skills live in `.claude/skills/<name>/SKILL.md`, and `.agents/skills` is a symlink to `.claude/skills`, so every skill exists once and needs no extra step to reach other agents. Agents pick a skill when the request matches its description, or the user invokes it by name. Layout: [docs/multi-tool-usage.md](docs/multi-tool-usage.md).

Skills name Claude Code tools; other tools map them as follows. `WebFetch` → the tool's web fetch, or `curl -sL`. `AskUserQuestion` → the tool's question prompt, or a numbered list in chat, then wait. Skill tool → open and follow `.agents/skills/<name>/SKILL.md`. `Edit` → an anchored edit, never a whole-file rewrite. `<scratchpad>` → `temp/`. Subagents → process posts sequentially.

---

## Git Workflow Rules

**Before any git commit**, run the `mt-add-tags` pre-commit check on every staged or new `content/posts/YYYY/MM/DD/index.vi.md` (the skill defines what counts as minimal tags), then run `node scripts/newsletter translation-status` and bring every changed post's English version in sync with `mt-translate-post`. Commit each `index.vi.md` together with its `index.md`.

Stage only the post files you changed, because unrelated local edits may be present; never `git add -A`. Commit as `docs(newsletter): add newsletter N`. A daily bot commit (`chore(projects): refresh projects list`, from `.github/workflows/update-projects.yml`) often lands on main first, so push with `git pull --rebase --autostash && git push`.
