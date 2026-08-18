---
name: mt-add-tags
description: "Add or update tags in Hugo blog post frontmatter by analyzing post content. Use this skill when the user calls mt-add-tags, wants to add tags to a post, asks about tagging a post, or is about to commit — proactively check if the current post has only generic/minimal tags (e.g., only ['AI-Assisted'] or empty) and offer to generate proper tags. Generate 2-3 tags for regular posts, 6-7 tags for newsletter posts. Always ask user to confirm before writing."
---

## Overview

This skill analyzes Hugo blog post content and generates a relevant list of tags, then writes them to the post's frontmatter.

**Project context:**
- Blog: Vietnamese tech content at `content/post/YYYY/MM/DD/index.md`
- Tags: Mix of English (tech terms, tools, concepts) and Vietnamese where natural
- Target: **2-3 tags** for regular posts, **6-7 tags** for newsletter posts
- User-facing questions and reports: English unless the user explicitly requests another language

## Workflow

### 1. Find the target post

If the user specifies a post (date, path, or title), use that. Otherwise, use today's post:
```
content/post/YYYY/MM/DD/index.md  (today's date in Asia/Ho_Chi_Minh UTC+7)
```

If no post exists for the target date, tell the user and stop.

### 2. Read and assess existing tags

Read the frontmatter. Check the `tags` field:

- **Missing or empty** → generate fresh tags
- **Only generic tags** like `["AI-Assisted"]` or `["Newsletter"]` alone → these are placeholders; offer to generate richer tags
- **Already has 5+ meaningful tags** → show them and ask: *"Post already has [N] tags: [...]. Do you want to update them?"* Default: **yes**

### 3. Analyze post content

Read the full post body. Identify:
- Main topics and technologies discussed
- Programming languages, frameworks, tools, platforms named
- Core concepts (e.g., caching, system design, CI/CD)
- Content type (tutorial, newsletter, opinion piece, deep-dive)

### 4. Generate tags

<!-- DISABLED: Tag normalization against existing repo tags is not yet active.
     Existing posts do not have standardized tags, so scanning them would produce
     inconsistent casing guidance. Re-enable this step once a tag standard is established.

#### 4a. (Future) Normalize against existing tags

Before generating, run:
```bash
go run ./scripts/newsletter list-existing-tags
```
When a proposed tag matches an existing one case-insensitively, use the existing casing.
-->

Produce **2-3 tags** for regular posts, **6-7 tags** for newsletter posts (title starts with "Newsletter #"). Follow these guidelines:

**Good tags are:**
- Specific to what the post actually covers
- Short and scannable (1-3 words each)
- Useful for readers finding related content

**Tag categories to draw from (pick what fits):**
- Technology/tool names: `GitHub Actions`, `Docker`, `PostgreSQL`, `Rust`, `Go`, `Java`
- Concepts: `CI/CD`, `Caching`, `System Design`, `Performance`, `Security`
- Content markers: `AI-Assisted` (if AI helped write it), `Newsletter` (if it's a newsletter post), `Tutorial`, `Deep Dive`
- Domain areas: `DevOps`, `Backend`, `Database`, `Infrastructure`, `Algorithms`
- Vietnamese topics when relevant: keep in English if it's a tech term with no clean Vietnamese equivalent

**Avoid:**
- Overly generic tags like `Technology`, `Software`, `Programming` unless the post is truly broad
- Tags that don't appear in or relate to the actual content
- More than 7 tags — trim to the most distinctive ones

**Newsletter posts** (title starts with "Newsletter #"): keep `AI-Assisted` and derive 5-6 tags from the main topics covered in that newsletter, totalling 6-7 tags.

### 5. Confirm with user

Present the proposed tags before writing:

```
Suggested tags for "[post title]":
["Tag1", "Tag2", "Tag3", "Tag4", "Tag5", "Tag6"]

Apply these tags? [Y/n]
```

Wait for confirmation. If the user says no or wants changes, revise accordingly.

### 6. Write tags to frontmatter

Update the `tags` field in the YAML frontmatter. Use this format:
```yaml
tags: ["Tag1", "Tag2", "Tag3", "Tag4", "Tag5", "Tag6"]
```

Replace the entire existing `tags:` line. Preserve all other frontmatter fields exactly.

## Proactive behavior (before commit)

When the user is about to commit (`/commit`, `mt:commit-push-pr`, or similar), find the most recently modified `content/post/*/index.md` file:

```bash
git diff --name-only HEAD | grep "^content/post/" | head -1
```

If that returns nothing, check unstaged changes:

```bash
git status --short | grep "content/post/" | awk '{print $2}' | head -1
```

If a post file is found and its tags look minimal (only 1-2 tags, or only `AI-Assisted`/`Newsletter`), say:

> "Post `content/post/.../index.md` only has these tags: [...]. Add richer tags before committing? [Y/n]"

Default is **yes** — proceed to generate and confirm tags unless the user declines.
