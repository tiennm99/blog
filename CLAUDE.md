# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hugo-based static site blog (miti99.com) built with the hugo-theme-stack theme. The blog features Vietnamese content with a focus on technology newsletters, programming tutorials, and technical insights.

## Development Commands

### Build and Development
- **Local development server**: `hugo server --gc`
- **Production build**: `hugo --gc --minify`
- **Development with theme debugging**: `cd themes/hugo-theme-stack && ./debug.sh`

### Docker Commands
- **Build image**: `docker build -t miti99-blog .`
- **Run container**: `docker run -p 80:80 miti99-blog`

## Content Structure

### Blog Posts
- Posts are located in `content/post/YYYY/MM/DD/index.md`
- Each post follows Hugo front matter format with title, date, tags, and categories
- Images and assets are stored alongside posts in `img/` subdirectories
- Additional resources (PDFs, data files) stored in `doc/` and `data/` subdirectories

### Newsletter Posts
- Newsletter posts use a specific format with numbered titles (e.g., "Newsletter #26")
- Always include "AI-Assisted" tag and "Newsletter" category
- Content is written in Vietnamese with professional tone
- Follow the structure defined in `.cursor/rules/newsletter_processor.mdc`

### Content Creation Guidelines
- Use Vietnamese language for main content
- Keep technical terms in English when appropriate
- Include relevant tags (max 6-7 per post, use common tags that represent the whole post)
- Maintain consistent date format: YYYY-MM-DD
- Store assets in appropriate subdirectories within post folders

## Hugo Configuration

### Key Configuration Files
- `config/_default/hugo.yml` - Main Hugo configuration
- `config/_default/params.yml` - Theme parameters
- `config/_default/menu.yml` - Site navigation
- `config/_default/languages.yml` - Language settings

### Important Settings
- Base URL: https://miti99.com
- Language: Vietnamese (vi)
- Timezone: Asia/Ho_Chi_Minh
- Theme: hugo-theme-stack
- Pagination: 5 posts per page

## Newsletter Processing Workflow

The repository includes a Cursor rule for automated newsletter processing located in `.cursor/rules/newsletter_processor.mdc`. This rule:

1. Processes URLs to create/update newsletter posts
2. Removes tracking parameters from URLs
3. Creates Vietnamese summaries of articles
4. Maintains consistent formatting and structure
5. Auto-increments newsletter numbers
6. Handles date formatting and file organization

When working with newsletter content, follow the established pattern and ensure compliance with the processing rules.

## URL Processing Workflow

When a URL is provided, Claude should automatically process it according to these rules:

### URL Processing Steps
1. **Clean URL**: Remove tracking parameters (utm_source, ref, etc.)
2. **Verify accessibility**: Check if URL is reachable
3. **Extract content**: Get original article title and content
4. **Check duplicates**: Ensure article hasn't been covered in existing newsletters
5. **Date handling**: Use current date in YYYY-MM-DD format

### Newsletter Creation/Update Logic
- **Check existing**: Look for newsletter file for current date in `content/post/YYYY/MM/DD/index.md`
- **If exists**: Append new article section before any bonus content
- **If new**: Create new newsletter with auto-incremented number
- **Directory structure**: Create YYYY/MM/DD structure if needed

### Content Structure for URL Processing
```markdown
---
title: "Newsletter #[number]"
date: [current date YYYY-MM-DD]
tags: [ "AI-Assisted", [additional relevant tags] ]
categories: [ "Newsletter" ]
---

*Mời bạn thưởng thức Newsletter #[number].*

## [Original Article Title](clean_url)

[Vietnamese summary in professional tone - 2-4 paragraphs]

[Optional bullet points for key takeaways]
```

### Quality Standards for URL Processing
- Write Vietnamese summaries in professional tone
- **Language Guidelines**: Use Vietnamese as primary language, only keep essential technical terms in English (like API, framework names, specific technologies). Avoid overusing English terms that have good Vietnamese equivalents
- **Target Audience**: Write for junior developers - use accessible language and explain complex concepts clearly
- **Technical Term Usage**: Prefer Vietnamese equivalents when they exist and are commonly understood (e.g., "bộ thu gom rác" instead of "garbage collector", "tái cấu trúc" instead of "refactoring", "mùi mã" instead of "code smells")
- Include "AI-Assisted" tag and "Newsletter" category
- Maximum 6-7 tags per newsletter, use common tags that represent the whole post content
- **Tag Selection Guidelines**: Choose tags that are commonly used across the blog, represent the main topics/technologies discussed in the post, and help readers find related content. Avoid overly specific or one-off tags.
- Maintain consistent formatting and structure
- Verify all links work properly

### Vietnamese Writing Guidelines
- **Primary principle**: Write in Vietnamese first, use English technical terms only when necessary
- **Common replacements**: 
  - "framework" → "khung làm việc" (when context allows)
  - "refactoring" → "tái cấu trúc mã"
  - "code smells" → "mùi mã"
  - "error messages" → "thông báo lỗi"
  - "big tech companies" → "các công ty công nghệ lớn"
  - "engineers" → "kỹ sư" or "lập trình viên"
  - "workload" → "ứng dụng" or "tải công việc"
  - "migration" → "di chuyển"
  - "embedding models" → "mô hình nhúng"
- **Keep English for**: Specific technology names (React, Java, ZGC), widely-used acronyms (API, REST, HTTP), code examples and commands
- **Tone**: Professional but accessible, suitable for junior developers learning new concepts

### Error Handling
- Skip inaccessible URLs and notify
- Skip duplicate articles and notify
- Use fallback date methods if primary fails
- Create directory structure as needed

## File Organization

- `content/` - All markdown content and assets
- `config/` - Hugo configuration files
- `layouts/` - Custom layout overrides
- `static/` - Static assets served at site root
- `themes/hugo-theme-stack/` - Theme files (do not modify directly)
- `public/` - Generated site output (ignored in development)

## Deployment

The site uses a multi-stage Docker build:
1. Build stage using Hugo v0.140.2 to generate static files
2. Runtime stage using nginx:alpine to serve content
3. Final image exposes port 80 for web traffic