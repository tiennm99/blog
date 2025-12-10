# /addtags Command

Manual command to generate and add relevant tags to today's newsletter post.

## Usage

User triggers: `/addtags` or similar command

## Workflow

### Step 1: Locate Today's Post
1. Get current date: `YYYY-MM-DD`
2. Open file: `content/post/YYYY/MM/DD/index.md`
3. If not found, report error and exit

### Step 2: Analyze Content
Read the entire post content (excluding front matter):
- Article titles
- Summaries
- Key points
- Bonus resources

**Do NOT** fetch external URLs again. Use only content already in the file.

### Step 3: Generate Tags
Based on content analysis, suggest 5-7 relevant tags:

**Rules:**
- First tag MUST be: `"AI-Assisted"` (always)
- Remaining 4-6 tags based on content topics
- Use Vietnamese or common English tech terms
- Categories: Programming languages, frameworks, tools, concepts, industries
- Be specific but not too narrow

**Example tags:**
- Technology domains: "Machine Learning", "Web Development", "DevOps"
- Languages: "Python", "JavaScript", "Go"
- Frameworks: "React", "Django", "Kubernetes"
- Concepts: "API Design", "Security", "Performance"
- Vietnamese: "Lập trình", "Công nghệ", "Phát triển phần mềm"

### Step 4: Update Front Matter
Replace the tags line in front matter:

**Before:**
```yaml
---
title: "Newsletter #123"
date: 2024-12-10
tags: ["AI-Assisted"]
categories: ["Newsletter"]
---
```

**After:**
```yaml
---
title: "Newsletter #123"
date: 2024-12-10
tags: ["AI-Assisted", "Machine Learning", "Python", "API Design", "DevOps", "Security"]
categories: ["Newsletter"]
---
```

### Step 5: Report

```
✅ Tags Added Successfully

📄 File: content/post/YYYY/MM/DD/index.md
📊 Newsletter: #[number]

🏷️ Tags: [list of all 6-7 tags]

Next: Review and commit changes.
```

## Tag Selection Guidelines

### Good Tags (Use These)
- **Broad but relevant**: "Web Development", "Data Science"
- **Popular tech**: "Docker", "GraphQL", "TensorFlow"
- **Common concepts**: "Authentication", "Caching", "Testing"
- **Industry terms**: "Cloud Computing", "Microservices"

### Avoid
- Too generic: "Technology", "Programming" (unless nothing else fits)
- Too specific: "React 18.2 useEffect Hook"
- Duplicates: Don't repeat similar concepts
- Personal names: Unless highly relevant (e.g., "Kubernetes" is OK)

### Balance
- 2-3 technical/tool tags
- 2-3 concept/domain tags
- 1-2 Vietnamese tags if appropriate

## Examples

### Example 1: ML & Python Post
```yaml
tags: ["AI-Assisted", "Machine Learning", "Python", "TensorFlow", "Data Science", "Neural Networks"]
```

### Example 2: Web Dev Post
```yaml
tags: ["AI-Assisted", "Web Development", "React", "TypeScript", "Frontend", "Performance"]
```

### Example 3: DevOps Post
```yaml
tags: ["AI-Assisted", "DevOps", "Docker", "Kubernetes", "CI/CD", "Cloud", "AWS"]
```

### Example 4: Mixed Content Post
```yaml
tags: ["AI-Assisted", "Technology", "API Design", "Security", "Lập trình", "Phát triển"]
```

## Edge Cases

| Issue | Solution |
|-------|----------|
| Post file not found | Report error, suggest correct date |
| Content too short | Use minimum 3 tags: ["AI-Assisted", "Technology", "Newsletter"] |
| Multiple topics | Prioritize most prominent 5-6 topics |
| All Vietnamese content | Use Vietnamese tags primarily |
| All English content | Use English tags primarily |

## Quality Checklist

- [ ] First tag is "AI-Assisted"
- [ ] Total 5-7 tags (including "AI-Assisted")
- [ ] Tags are relevant to content
- [ ] No duplicate or near-duplicate tags
- [ ] Mix of technical and conceptual tags
- [ ] Proper capitalization (title case)
- [ ] Valid YAML array format
