# AGENTS.md

Guide for AI code assistants working with this Hugo blog.

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

Run the Hugo development server:

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

- **miti-add-post**: URL processing workflow for newsletter posts
  - Automatically extracts content from URLs
  - Generates Vietnamese summaries
  - Creates/updates daily newsletter posts

Refer to `.agents/skills/` for skill implementations.
