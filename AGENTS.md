# AGENTS.md

Guide for AI code assistants working with this Hugo blog (miti99.com).

## Project Info

- **Type**: Hugo static site with Vietnamese tech content
- **Theme**: hugo-theme-stack
- **Language**: Vietnamese (with common English tech terms)
- **Timezone**: Asia/Ho_Chi_Minh (UTC+7)

## Commands
```bash
hugo server --gc     # Local dev
hugo --gc --minify   # Production build
```

## Directory Structure
```
content/post/
└── YYYY/
    └── MM/
        └── DD/
            └── index.md
```

---

## URL Processing Workflow

When user sends URLs, process automatically and generate report.

### Step 1: Prepare URLs
For each URL:
1. **Clean**: Remove tracking params (`utm_*`, `fbclid`, etc.)
2. **Validate**: Check accessibility (HTTP 200)
3. **Check duplicate**: Search exact URL in project files
4. **Classify**:
   - Article URL → Extract for main content
   - Direct asset (`.png`, `.jpg`, `.pdf`, `.mp4`, etc.) → Bonus section
5. **Skip if**: Inaccessible, duplicate, or extraction fails

### Step 2: Find Today's Post
1. Get current date: `YYYY-MM-DD`
2. Check path: `content/post/YYYY/MM/DD/index.md`
3. **If exists**: Update this file
4. **If not exists**: Create new file with incremented newsletter number

### Step 3: Determine Newsletter Number
To find next newsletter number:
1. Start from current date folder, search backwards:
   - Current month folders (DD, DD-1, DD-2...)
   - Previous months (MM-1, MM-2...)
   - Previous years if needed (YYYY-1, YYYY-2...)
2. Find most recent `index.md` with "Newsletter #N"
3. Increment: N + 1

### Step 4: Generate Content

#### For Article URLs
Extract and generate:
- **Title**: Original article title
- **Summary**: 1-2 paragraphs, professional Vietnamese
  - Max 300 words
  - Use common English tech terms only
  - Brief intro to the topic
  - Give overview for readers
- **Key points** (optional): 3-5 bullet points if relevant

#### For Asset URLs
Extract:
- **Type**: Image, video, PDF, etc.
- **Title**: File name or detected title
- Add to Bonus section by type

### Step 5: Write Content

#### New Post Template
```markdown
---
title: "Newsletter #[number]"
date: YYYY-MM-DD
tags: ["AI-Assisted"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #[number].*

## [Article Title](clean_url)

[Vietnamese summary - professional, max 300 words]

**Điểm chính:** (optional)
- [Key point 1]
- [Key point 2]
```

#### Update Existing Post
Insert new articles **before** Bonus section:
```markdown
[Existing articles...]

## [New Article Title](clean_url)
[New summary...]

### Bonus

**Images:**
![image1](url1)

**Videos:**
[Video: title](url)

**Documents:**
[PDF: title](url)
```

### Step 6: Format Bonus Section
Group assets by type with subheadings:
```markdown
### Bonus

**Images:**
![title](url)
![title](url)

**Videos:**
[Video: title](url)

**Documents:**
[PDF: title](url)
[DOCX: title](url)
```

---

## Content Guidelines

### Vietnamese Writing
- **Primary language**: Vietnamese
- **English allowed**: Tech terms (API, GitHub, AI, backend, frontend, etc.)
- **Audience**: Junior developers
- **Tone**: Professional, clear, accessible
- **Length**: Max 300 words per summary

### Quality Checklist
- [ ] Valid Hugo front matter
- [ ] Title: `"Newsletter #[number]"`
- [ ] Date: `YYYY-MM-DD` format
- [ ] Tags: Include `"AI-Assisted"` (other tags added manually later)
- [ ] Clean URLs (no tracking params)
- [ ] Correct Vietnamese grammar
- [ ] Proper markdown syntax
- [ ] Articles before Bonus section
- [ ] Bonus assets grouped by type

---

## Error Handling

| Issue | Action |
|-------|--------|
| URL inaccessible | Skip, include in report |
| Duplicate URL found | Skip, include in report |
| Content extraction fails | Skip, treat as error |
| Directory not exist | Create directories |
| Summary too short | Accept (no minimum length) |

---

## Final Report Format

After processing, provide:

```
✅ Newsletter Processing Complete

📄 File: content/post/YYYY/MM/DD/index.md
📊 Action: [Created new / Updated existing] Newsletter #[number]

✅ Processed: [count] URLs
   - [count] articles added
   - [count] assets added to Bonus

❌ Failed: [count] URLs
   - [url]: [reason]
   - [url]: [reason]

Next: Review content, then use /addtags to add relevant tags.
```

---

## Best Practices

1. **Always verify** file paths exist before writing
2. **Preserve** existing content when updating
3. **Use exact URLs** for duplicate checking
4. **Generate quality summaries** using AI (Claude/subagents)
5. **Handle errors gracefully** and report clearly
6. **Group Bonus assets** by type with subheadings
7. **Keep front matter minimal** (tags added separately)
8. **Use relative paths** for internal links
9. **Validate markdown** before saving
10. **Process all URLs** in one batch per request
