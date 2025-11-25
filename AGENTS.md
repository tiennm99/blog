# AGENTS.md

This file provides guidance to AI code assistants when working with this Hugo-based blog repository (miti99.com).

## Project Overview

- **Type**: Hugo static site blog with Vietnamese content
- **Theme**: hugo-theme-stack
- **Focus**: Technology newsletters, programming tutorials, technical insights
- **Language**: Vietnamese (with English technical terms where appropriate)
- **Timezone**: Asia/Ho_Chi_Minh (UTC+7)

## Quick Commands
```bash
hugo server --gc     # Local development
hugo --gc --minify   # Production build
```

## Directory Structure
```
content/
└── post/
    └── YYYY/
        └── MM/
            └── DD/
                ├── index.md     # Blog post content
                └── data/        # Data files
```

> **Note on Assets**: Images and documents from external sources should be referenced directly from their original locations rather than downloaded into subfolders. The only exception is for images or documents that are created by yourself, which can be stored in the appropriate directories.

## URL Processing Workflow

### 1. URL Processing
1. **Clean URL**: Remove tracking params (utm_*, fbclid, etc.)
2. **Verify**: Check if URL is accessible (HTTP 200)
3. **Extract**:
   - For articles: Get title and content (don't download assets)
   - For assets: Identify type for bonus section
4. **Check duplicates**: Skip if already covered
5. **Skip if**: Inaccessible or duplicate

### 2. Newsletter Management
1. **Get date**: Current date (YYYY-MM-DD)
2. **Check existing**: `content/post/YYYY/MM/DD/index.md`
3. **If exists**: Append before bonus sections
4. **If new**: Create with auto-incremented number

### 3. Content Structure

#### New Newsletter Template
```markdown
---
title: "Newsletter #[number]"
date: YYYY-MM-DD
tags: ["AI-Assisted", "Technology", "tag-3", "tag-4"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #[number].*

## [Original Article Title](clean_url)

[Vietnamese summary: 2-4 paragraphs]

**Điểm chính:**
- [Key point 1]
- [Key point 2]
- [Key point 3]
```

#### Bonus Content Section
For direct asset links (.png, .jpg, .pdf, .docx):
```markdown
### Bonus Resources

- [Image: Description](image_url)
- [Document: Description](document_url)
```

## Vietnamese Writing Guidelines
- **Primary**: Vietnamese
- **English for**: Tech names, acronyms, code, common terms
- **Audience**: Junior developers
- **Tone**: Professional but accessible
- **Length**: 150-300 words per summary

## Tagging Guidelines
- **Required**: "AI-Assisted"
- **Maximum**: 6-7 tags
- **Categories**: Always ["Newsletter"]

## Quality Checklist
- [ ] Valid Hugo front matter
- [ ] Correct Vietnamese grammar
- [ ] Clean URLs
- [ ] Proper markdown
- [ ] Date format: YYYY-MM-DD
- [ ] Required tags present
- [ ] Sequential newsletter number
- [ ] Correct directory structure

## Error Handling
| Issue | Solution |
|-------|----------|
| URL inaccessible | Skip and notify |
| Duplicate content | Skip and notify |
| Date error | Use current date |
| Directory failed | Create and retry |
| Extraction failed | Use title, flag |

## Response Format
```
✅ Newsletter Processing Complete

📄 File: content/post/YYYY/MM/DD/index.md
📊 Action: [Created new | Updated existing] Newsletter #[number]
🔗 URLs processed: [count]
⚠️ Skipped: [count] (reason)

Next steps: Review content and publish when ready.
```

## Best Practices for Code Agents

1. **Always verify** file paths before making changes
2. **Follow** established directory structure
3. **Maintain** consistency with existing content
4. **Test locally** using `hugo server --gc` (optional)
5. **Preserve** front matter structure in markdown files
6. **Use relative paths** for internal links and assets
7. **Check Vietnamese** grammar and diacritics
8. **Validate** markdown syntax before saving
9. **Handle assets properly**: Use external links for user-provided assets, do not embed assets from articles
