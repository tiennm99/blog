---
description: Add an article/blog URL to today's newsletter main content (original title, Vietnamese summary)
argument-hint: <article-url>
---

# Add an article to the newsletter (article handler)

Given a clean article/blog URL, extract its original title and content, write a Vietnamese summary, and insert it into today's newsletter main content. Does not classify/route — for YouTube/images/other use `/prompts:mt-add-url`.

Article URL: `$ARGUMENTS`

Shared scripts: `scripts/newsletter/` (run from repo root). Shared procedure: `.claude/skills/mt-add-url/references/newsletter-post-mechanics.md` — follow it for all post mechanics.

## Input
If a raw URL is given directly, clean/dedup it first:
```bash
node scripts/newsletter/add-url.js "<url>"
```
Trust `route: article`; skip if `duplicate` or not `accessible`.

## Workflow
1. **Post mechanics** — follow `.claude/skills/mt-add-url/references/newsletter-post-mechanics.md` to find/create today's post and (if new) get the newsletter number + apply the template.
2. **Extract** the original article title and main content. Preserve the source title: do not translate/localize it; keep source-language wording, capitalization, punctuation, and proper nouns from metadata (`og:title`, page title, or fetcher frontmatter).
3. **Summarize in Vietnamese** — 1-2 paragraphs, max 300 words, professional tone for junior developers. Optionally 3-5 key points.
4. **Insert** the main-content block **before** the `### Bonus` section (or append at end if no Bonus yet — do not create an empty Bonus):
```markdown
## [Original article title](clean_url)

[Tóm tắt tiếng Việt — tối đa 300 từ]

**Điểm chính:**
- [Ý chính 1]
- [Ý chính 2]
```
5. **Report:**
```
✅ Article added to Newsletter #[number]
📄 content/post/YYYY/MM/DD/index.md
🔗 [clean_url]
```

## Checklist
- [ ] Valid Hugo front matter (if post created) with correct date
- [ ] Title `"Newsletter #[number]"` (if created)
- [ ] Tags include `"AI-Assisted"`
- [ ] URL is clean (no tracking params)
- [ ] Heading uses the original source article title, not a Vietnamese translation
- [ ] Vietnamese content ≥99%, grammar correct
- [ ] Article inserted before the Bonus section
