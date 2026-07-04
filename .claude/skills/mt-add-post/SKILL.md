---
name: mt-add-post
description: 'Article handler for the Hugo blog newsletter. Adds a single article/blog URL to today''s newsletter as a main-content entry with the original source title and a Vietnamese summary. Normally invoked by the mt-add-url meta skill after classification, but can be used directly for a known article URL.'
---

## Overview

`mt-add-post` is the **article handler**: given a clean article/blog URL, it extracts the source title and content, writes a Vietnamese summary, and inserts it into today's newsletter main content. It does **not** classify or route URLs — that is `mt-add-url`'s job. For YouTube/images/other types, use `mt-add-url`.

Shared scripts: `scripts/newsletter/`. Shared procedure: `../mt-add-url/references/newsletter-post-mechanics.md` (find/create today's post, newsletter numbering, section insertion, language rules) — **follow it** for all post mechanics.

## Input

A clean article URL (passed by `mt-add-url`, or given directly). If a raw URL is provided directly, you may run the classifier to clean/dedup it first:
```bash
node scripts/newsletter/add-url.js "<url>"
```
Trust `route: article`; skip if `duplicate` or not `accessible`.

## Workflow

1. **Post mechanics** — follow `../mt-add-url/references/newsletter-post-mechanics.md` to find/create today's post and (if new) get the newsletter number + apply the template.
2. **Extract** the original article title and main content. Preserve the source title exactly enough to remain recognizable: do not translate/localize it; keep source-language wording, capitalization, punctuation, and proper nouns from metadata (`og:title`, page title, or fetcher frontmatter).
3. **Summarize in Vietnamese** — 1-2 paragraphs, max 300 words, professional tone for junior developers. Optionally add 3-5 key points.
4. **Write** the main-content block and insert it **before** the `### Bonus` section (or append at end of file if there is no Bonus yet — do not create an empty Bonus):

```markdown
## [Original article title](clean_url)

[Tóm tắt tiếng Việt — tối đa 300 từ]

**Điểm chính:**
- [Ý chính 1]
- [Ý chính 2]
```

5. **Report**:
```
✅ Article added to Newsletter #[number]
📄 content/post/YYYY/MM/DD/index.md
🔗 [clean_url]
```

## Checklist

- [ ] Valid Hugo front matter (if post was created) with correct date
- [ ] Title `"Newsletter #[number]"` (if created)
- [ ] Tags include `"AI-Assisted"`
- [ ] URL is clean (no tracking params)
- [ ] Heading uses the original source article title, not a Vietnamese translation
- [ ] Vietnamese content ≥99%, grammar correct
- [ ] Article inserted before the Bonus section
