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
hugo server --gc                    # Local development server
hugo --gc --minify                  # Production build
```

## Directory Structure

```
content/
└── post/
    └── YYYY/
        └── MM/
            └── DD/
                ├── index.md     # Blog post content
                ├── img/         # Images for the post
                ├── doc/         # PDFs and documents
                └── data/        # Data files
```

## Newsletter URL Processing Workflow

When given URLs, automatically create or update daily newsletter posts with Vietnamese summaries.

### Step 1: URL Processing
1. **Clean URL**: Remove tracking parameters (utm_*, fbclid, gclid, ref, etc.)
2. **Verify**: Check if URL is accessible (HTTP 200)
3. **Extract**: Get article title and main content
4. **Check duplicates**: Ensure not already covered in existing newsletters
5. **Skip if**: Inaccessible or duplicate (notify user)

### Step 2: Newsletter Management
1. **Get date**: Current date in YYYY-MM-DD format
2. **Check existing**: Look for `content/post/YYYY/MM/DD/index.md`
3. **If exists**: Append new content before any bonus sections
4. **If new**: Create newsletter with auto-incremented number

### Step 3: Content Structure

#### New Newsletter Template
```markdown
---
title: "Newsletter #[number]"
date: YYYY-MM-DD
tags: ["AI-Assisted", "Technology", "relevant-tag-3", "relevant-tag-4"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #[number].*

## [Original Article Title](clean_url)

[Vietnamese summary: 2-4 paragraphs, professional tone]

**Điểm chính:**
- [Key point 1 in Vietnamese]
- [Key point 2 in Vietnamese]
- [Key point 3 in Vietnamese]
```

#### Appending to Existing Newsletter
Add new article section before any bonus content, maintaining the same format as above.

## Vietnamese Writing Guidelines

### Language Rules
- **Primary**: Write in Vietnamese first
- **Keep English for**:
  - Technology names (React, Java, Python)
  - Acronyms (API, REST, HTTP)
  - Code examples and commands
  - Common tech terms junior devs know (dev, web, code, framework, debug, etc.)

### Content Standards
- **Target audience**: Junior developers
- **Tone**: Professional but accessible
- **Length**: 150-300 words per article summary
- **Structure**: Introduction → Main points → Key takeaways

## Tagging Guidelines
- **Required**: "AI-Assisted" (for newsletter posts)
- **Maximum**: 6-7 tags per post
- **Selection**: Use common, existing tags that represent the whole post
- **Categories**: Always ["Newsletter"] for newsletter posts

## Configuration Files

```
config/_default/
├── hugo.yml        # Main Hugo configuration
├── params.yml      # Theme parameters
├── menu.yml        # Site navigation
└── languages.yml   # Language settings
```

## Quality Checklist

Before finalizing any content:
- [ ] Valid Hugo front matter (YAML format)
- [ ] Correct Vietnamese grammar and diacritics
- [ ] Clean URLs (no tracking parameters)
- [ ] Proper markdown syntax
- [ ] Date format: YYYY-MM-DD
- [ ] Required tags present
- [ ] Newsletter number is sequential
- [ ] File in correct directory structure

## Error Handling

| Issue | Solution |
|-------|----------|
| URL inaccessible | Skip and notify user |
| Duplicate content | Skip and notify user |
| Date format error | Use current date as fallback |
| Directory creation failed | Create structure and retry |
| Content extraction failed | Use title as fallback, flag for review |

## Response Format

After processing URLs, provide summary:
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
4. **Test locally** using `hugo server --gc`
5. **Preserve** front matter structure in markdown files
6. **Use relative paths** for internal links and assets
7. **Check Vietnamese** grammar and diacritics
8. **Validate** markdown syntax before saving

## Additional Resources

- Hugo documentation: https://gohugo.io/documentation/
- Theme documentation: https://github.com/CaiJimmy/hugo-theme-stack
