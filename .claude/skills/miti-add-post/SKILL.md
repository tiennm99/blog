---
name: miti-add-post
description: 'URL processing workflow for Hugo blog newsletter posts. Automatically processes URLs, extracts content, generates Vietnamese summaries, and creates/updates daily newsletter posts with proper formatting.'
---

### Instructions

```xml
<description>This skill handles the complete workflow for adding newsletter posts to a Hugo blog. It processes URLs, extracts content, generates professional Vietnamese summaries, and manages daily newsletter files with proper numbering and formatting.</description>
```

### Project Info

- **Type**: Hugo static site with Vietnamese tech content
- **Theme**: hugo-theme-stack
- **Language**: Vietnamese (with common English tech words)
- **Timezone**: Asia/Ho_Chi_Minh (UTC+7)
- **Directory Structure**: `content/post/YYYY/MM/DD/index.md`

### Workflow

**Follow these steps when user provides URLs:**

#### Step 1: Prepare URLs
For each URL:
1. **Clean**: Remove tracking params (`utm_*`, `fbclid`, `gclid`, etc.)
2. **Validate**: Check accessibility (HTTP 200)
3. **Check duplicate**: Search exact URL in project files using Grep
4. **Classify**:
   - Article URL → Extract for main content
   - Direct asset (`.png`, `.jpg`, `.pdf`, `.mp4`, etc.) → Bonus section
5. **Skip if**: Inaccessible, duplicate, or extraction fails

#### Step 2: Find Today's Post
1. Get current date: `YYYY-MM-DD`
2. Check path: `content/post/YYYY/MM/DD/index.md`
3. **If exists**: Update this file
4. **If not exists**: Create new file with incremented newsletter number

#### Step 3: Determine Newsletter Number
To find next newsletter number:
1. Start from current date folder, search backwards:
   - Current month folders (DD, DD-1, DD-2...)
   - Previous months (MM-1, MM-2...)
   - Previous years if needed (YYYY-1, YYYY-2...)
2. Find most recent `index.md` with "Newsletter #N"
3. Increment: N + 1

#### Step 4: Generate Content

**For Article URLs** - Extract and generate:
- **Title**: Original article title
- **Summary**: 1-2 paragraphs, professional Vietnamese
  - Max 300 words
  - Use common English tech terms only when no Vietnamese equivalent exists
  - Brief intro to the topic
  - Give overview for readers
- **Key points** (optional): 3-5 bullet points if relevant

**For Asset URLs** - Extract:
- **Type**: Image, video, PDF, etc.
- **Title**: File name or detected title
- Add to Bonus section by type

#### Step 5: Write Content

**New Post Template:**
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

**Update Existing Post** - Insert new articles **before** Bonus section:
```markdown
[Existing articles...]

## [New Article Title](clean_url)
[New summary...]

### Bonus

**Images:**
![image1](url1)
```

#### Step 6: Format Bonus Section
Group assets by type with subheadings:
```markdown
### Bonus

**Images:**
![title](url)

**Videos:**
[Video: title](url)

**Documents:**
[PDF: title](url)
```

### Language Policy

**PRIMARY LANGUAGE**: Vietnamese (99%)
**SECONDARY LANGUAGE**: English (1% - only for unavoidable technical terms)

**English Terms Allowed (NO VIETNAMESE EQUIVALENT)**:
- API, GitHub, AI, Rust, Go, HTTP, JSON, SQL, CI/CD, Docker, Kubernetes
- Technology names: PostgreSQL, MongoDB, Redis, etc.
- Company names: Databricks, Snowflake, Google, Microsoft, etc.
- Product names: Neon, CrunchyData, etc.
- Acronyms with no direct translation: MCP, ETL, OLAP, etc.

**TRANSLATE EVERYTHING TO VIETNAMESE**:
- error handling → xử lý lỗi
- dependency → phụ thuộc
- performance → hiệu năng
- deployment → triển khai
- scalability → khả năng mở rộng
- database → cơ sở dữ liệu
- testing → kiểm thử
- framework → khung làm việc
- developer → nhà phát triển
- engineer → kỹ sư
- code → mã nguồn
- software → phần mềm
- application → ứng dụng
- algorithm → thuật toán
- architecture → kiến trúc
- feature → tính năng
- bug → lỗi
- security → bảo mật
- authentication → xác thực
- authorization → phân quyền
- integration → tích hợp
- interface → giao diện
- monitoring → giám sát
- optimization → tối ưu hóa
- server → máy chủ
- client → máy khách

**Action Verbs (ALWAYS USE VIETNAMESE)**:
- use → sử dụng
- make sure → đảm bảo
- check → kiểm tra
- run → chạy
- build → xây dựng
- deploy → triển khai
- test → kiểm thử
- debug → gỡ lỗi
- monitor → giám sát
- analyze → phân tích
- optimize → tối ưu hóa
- configure → cấu hình
- install → cài đặt
- update → cập nhật
- create → tạo
- delete → xóa
- manage → quản lý

**Content Requirements**:
- **Audience**: Junior developers
- **Tone**: Professional, clear, accessible, natural Vietnamese
- **Length**: Max 300 words per summary
- **Quality Check**: Verify before saving that Vietnamese content is ≥ 99%

### Error Handling

| Issue | Action |
|-------|--------|
| URL inaccessible | Skip, include in report |
| Duplicate URL found | Skip, include in report |
| Content extraction fails | Skip, treat as error |
| Directory not exist | Create directories |
| Summary too short | Accept (no minimum length) |

### Final Report Format

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
```

### Best Practices

1. **Always verify** file paths exist before writing
2. **Preserve** existing content when updating
3. **Use exact URLs** for duplicate checking
4. **Generate quality summaries** using AI tools
5. **Handle errors gracefully** and report clearly
6. **Group Bonus assets** by type with subheadings
7. **Keep front matter minimal** (tags added separately)
8. **Use relative paths** for internal links
9. **Validate markdown** before saving
10. **Process all URLs** in one batch per request

### Quality Checklist

- [ ] Valid Hugo front matter
- [ ] Title: `"Newsletter #[number]"`
- [ ] Date: `YYYY-MM-DD` format
- [ ] Tags: Include `"AI-Assisted"`
- [ ] Clean URLs (no tracking params)
- [ ] Correct Vietnamese grammar
- [ ] Proper markdown syntax
- [ ] Articles before Bonus section
- [ ] Bonus assets grouped by type
- [ ] Vietnamese content ≥ 99%
