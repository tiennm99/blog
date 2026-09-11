# Newsletter Post Mechanics (shared)

Shared procedure used by the newsletter handler skills (`mt-add-post`, `mt-add-video`, `mt-add-image`).
All shared scripts live in `scripts/newsletter/`.

**Project Context:**
- Hugo static site, theme `hugo-theme-stack`
- Language: Vietnamese (99%) + minimal English tech terms (1%)
- Timezone: Asia/Ho_Chi_Minh (UTC+7)
- Content path: `content/post/YYYY/MM/DD/index.md`

## 1. Find / create the target post

The target defaults to today's date but the user can pin a different one.

**Target date resolution:**
- Default: current date in `YYYY-MM-DD` (UTC+7).
- **Pinned target:** when the user names a post or date to keep working on — typically an unpublished draft started on an earlier day ("keep adding to the 7/9 post") — that post is the target for the rest of the session, including across a date rollover mid-session. Do not silently start a new post for the new day; if a pin might have lapsed, ask before creating one.

Check `content/post/YYYY/MM/DD/index.md` for the resolved target date:
- **Exists** → update this file.
- **Missing** → create it (new newsletter number; template below). Create directories as needed.

The newsletter number always comes from the target post, not from today's date.

## 2. Newsletter number

```bash
go run ./scripts/newsletter find-newsletter-number
```
Searches backwards from today for the most recent newsletter and returns the next number. Only needed when **creating** a new post — when the target post already exists, read its number from its own `title`.

## 2a. Terminology

Refer to each numbered publication as a **newsletter**, not an issue. Use wording like `Newsletter #120`, `add newsletter 120`, or `add Newsletter #120` in reports and commit messages.

## 3. New post template

```markdown
---
title: "Newsletter #[number]"
date: YYYY-MM-DD
tags: ["AI-Assisted"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #[number].*
```
(Handlers then append their own content block — article body, or Bonus entry.)

## 4. Section insertion (no clobbering)

**Never rewrite the whole `index.md`.** Always insert by anchoring an Edit on an existing string (e.g. `### Bonus`, `**Videos:**`) and prepending/appending around it. Multiple URLs targeting the same day's post must be applied **sequentially** so one edit doesn't clobber another.

**Articles go before the `### Bonus` section; Bonus assets go inside it.**
Article headings must use the original source title. Do not translate/localize article titles; keep the source-language wording, capitalization, punctuation, and proper nouns from metadata (`og:title`, page title, or fetcher frontmatter). Summaries stay Vietnamese and are prose paragraphs only — no key-points bullet list.

To insert an article safely, anchor the Edit on `### Bonus` and prepend:
```
old_string: "### Bonus"
new_string: "## [Original Article Title](clean_url)\n\n[Summary]\n\n### Bonus"
```

If the post has **no `### Bonus`** yet:
- Article → append at end of file. Do NOT create an empty Bonus section.
- Bonus asset (video/image/doc) → create the `### Bonus` section now (only because there's an asset to put in it).

**Bonus section format:**
```markdown
### Bonus

**Images:**
![title](url)

**Videos:**
[Tiêu đề video tiếng Việt](https://www.youtube.com/watch?v=ID)
> Tóm tắt 1-2 câu về nội dung video.

[Video: title](url)        <!-- direct video file -->

**Documents:**
[PDF: title](url)
```
When a subsection (e.g. `**Videos:**`) already exists, append under it; otherwise create it. Keep subsections in this order: **Images** → **Videos** → **Documents**.

## 4a. Post tally (report line)

After every successful insertion, report the target post's running totals so the user can see what the post now holds:

```bash
go run ./scripts/newsletter post-stats content/post/YYYY/MM/DD/index.md
```
Output (JSON): `{ post, newsletter, articles, images, videos, documents, total }`.

Render it as a single TL;DR line in the handler's report, omitting zero counts:

```
📊 4 articles · 2 videos · 1 image
```

Use the counts the command returns — do not tally by hand. This is a **report-only** line: never write it into `index.md`.

## 5. Post content language guidelines

These rules apply only to text written into `content/post/**/index.md`. Keep user-facing questions, status updates, reports, and final responses in English unless the user explicitly requests another language.

**Primary**: Vietnamese (99%) | **Secondary**: English (1% — unavoidable technical terms only)

**Allow English when no Vietnamese equivalent exists:**
- Technology: AI, API, GitHub, Rust, Go, Docker, Kubernetes
- Databases: PostgreSQL, MongoDB, Redis
- Companies: Google, Microsoft, Databricks
- Acronyms: MCP, CI/CD, JSON, SQL, HTTP

**Always translate to Vietnamese:**
- Common terms: code → mã nguồn, software → phần mềm, deployment → triển khai, performance → hiệu năng
- Action verbs: use → sử dụng, check → kiểm tra, build → xây dựng, test → kiểm thử
- Any other term: translate if a common Vietnamese equivalent exists

**Preserve original source language:**
- Article headings and image labels must retain the source wording, capitalization, and punctuation.
- Do not translate or localize article headings or image labels unless the user explicitly asks.
- Video titles follow the `mt-add-video` handler's localization rules.

**Content requirements:** audience = junior developers; tone = professional, clear, accessible; verify content is ≥99% Vietnamese before saving.

## 6. Error handling

| Problem | Action |
|-------|--------|
| URL inaccessible | Skip, note in report |
| Duplicate URL | Skip, note in report |
| Extraction fails | Skip, treat as error |
| Directory missing | Create directories |
