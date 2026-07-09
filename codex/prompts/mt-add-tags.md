---
description: Generate and write tags into a Hugo post's frontmatter (2-3 regular, 6-7 newsletter)
argument-hint: [post-path-or-date]
---

# Add/update tags for a Hugo post (tag handler)

Analyze a Hugo blog post and generate relevant tags, then write them to the frontmatter. **2-3 tags** for regular posts, **6-7 tags** for newsletter posts. Always confirm with the user before writing.

Target (optional): `$ARGUMENTS`

Blog: Vietnamese tech content at `content/post/YYYY/MM/DD/index.md`. Tags: mix of English (tech terms) and Vietnamese where natural.

## Workflow

### 1. Find the target post
If `$ARGUMENTS` names a post (date, path, or title), use it. Otherwise use today's post: `content/post/YYYY/MM/DD/index.md` (today in Asia/Ho_Chi_Minh UTC+7). If none exists for the target date, tell the user and stop.

### 2. Read and assess existing tags
Read the frontmatter `tags`:
- Missing/empty → generate fresh.
- Only generic (`["AI-Assisted"]` or `["Newsletter"]`) → placeholders; offer richer tags.
- Already 5+ meaningful → show them, ask "Post đã có [N] tags: [...]. Bạn có muốn cập nhật không?" (default yes).

### 3. Analyze post content
Read the full body. Identify main topics, technologies, languages/frameworks/tools, core concepts, and content type.

### 4. Generate tags
Produce **2-3** for regular posts, **6-7** for newsletter posts (title starts with "Newsletter #").
- Good tags: specific, short (1-3 words), useful for finding related content.
- Draw from: tool/tech names (`GitHub Actions`, `Docker`, `PostgreSQL`, `Rust`, `Go`), concepts (`CI/CD`, `Caching`, `System Design`, `Performance`, `Security`), content markers (`AI-Assisted`, `Newsletter`, `Tutorial`, `Deep Dive`), domains (`DevOps`, `Backend`, `Database`, `Infrastructure`, `Algorithms`).
- Avoid overly generic tags (`Technology`, `Software`, `Programming`) unless truly broad; avoid tags not in the content; max 7.
- Newsletter posts: keep `AI-Assisted` and derive 5-6 from the newsletter's main topics → 6-7 total.

### 5. Confirm with user
```
Đề xuất tags cho "[post title]":
["Tag1", "Tag2", "Tag3", ...]

Bạn có muốn áp dụng không? [Y/n]
```
Wait for confirmation; revise if requested.

### 6. Write tags to frontmatter
Replace the entire `tags:` line; preserve all other frontmatter exactly:
```yaml
tags: ["Tag1", "Tag2", "Tag3"]
```

## Before commit (proactive)
When about to commit, find the most recently modified post:
```bash
git diff --name-only HEAD | grep "^content/post/" | head -1
git status --short | grep "content/post/" | awk '{print $2}' | head -1
```
If a post has minimal tags (1-2, or only `AI-Assisted`/`Newsletter`), offer to add tags first (default yes) unless the user declines.
