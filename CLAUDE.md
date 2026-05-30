# CLAUDE.md

Guide for Claude Code working with this Hugo blog.

## Project Info

- **Type**: Hugo static site with Vietnamese tech content
- **Theme**: hugo-theme-stack
- **Language**: Vietnamese (with common English tech words)
- **Timezone**: Asia/Ho_Chi_Minh (UTC+7)

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

## Skills

This project uses custom skills for automated workflows:

- **mt-add-url**: Meta entry for adding URLs — classifies each URL and auto-dispatches to the right handler (the default entry when adding URLs to the newsletter)
- **mt-add-post**: Article handler — adds an article/blog URL to the newsletter main content
- **mt-add-video**: YouTube handler — adds a YouTube link to the newsletter Bonus → Videos
- **mt-add-tags**: Add/update tags in Hugo post frontmatter

Shared scripts (`add-url.js`, `url-utils.js`, `find-newsletter-number.js`) and the shared post-mechanics reference live under `.claude/skills/mt-add-url/`. Image support is planned as a future `mt-add-image` handler; until then `mt-add-url` asks how to handle non-article/non-YouTube URLs.

Refer to `.claude/skills/` for skill implementations.

---

## Git Workflow Rules

**Before any git commit**, check all staged `content/post/*/index.md` files for minimal tags. If any have only `["AI-Assisted"]` or empty tags, run the `mt-add-tags` skill on them first before committing.
