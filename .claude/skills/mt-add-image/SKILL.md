---
name: mt-add-image
description: 'Image handler for the Hugo blog newsletter. Adds an image URL to today''s newsletter Bonus → Images with a detected label. For Substack-hosted images it finds the source post (ByteByteGo and other configured publications) via RSS then sitemap, using the figure caption or post title as the label; for other sites it is best-effort; if no label is found it asks you to type one. Normally invoked by the mt-add-url meta skill after classification, but can be used directly for a known image URL.'
---

## Overview

`mt-add-image` is the **image handler**: given an image URL, it resolves a human-readable **label** and inserts `![label](image_url)` into today's newsletter **Bonus → Images**. It does not classify/route — that is `mt-add-url`'s job.

Shared scripts: `.claude/skills/mt-add-url/scripts/`. Shared procedure: `../mt-add-url/references/newsletter-post-mechanics.md` — **follow it** for post find/create, Bonus insertion, and language rules.

**Label priority:** figure caption → source post title → your typed input.

## Input

A clean image URL (passed by `mt-add-url`, or given directly).

## Workflow

### 1. Detect source
```bash
node .claude/skills/mt-add-image/scripts/detect-image-source.js "<url>"
```
→ `{ isSubstack, uuid?, innerUrl? }`. Skip the URL if it's a duplicate/inaccessible (the meta skill already checks; if invoked directly, sanity-check first).

### 2a. Substack image (`isSubstack: true` with `uuid`)
Find the source post:
```bash
node .claude/skills/mt-add-image/scripts/find-substack-post.js --uuid <uuid>
```
- `found: true` → label = `caption` if non-empty, else `postTitle`.
- `found: false` → retry with the deeper sitemap crawl (slower — scans ~3 months, warn the user it may take ~15s):
  ```bash
  node .claude/skills/mt-add-image/scripts/find-substack-post.js --uuid <uuid> --deep
  ```
  - `found: true` → label as above.
  - `found: false` → no automatic label; go to step 3 (ask). The result reports `scanned` + `cutoff` — mention how far back it looked.

### 2b. Non-Substack image (`isSubstack: false`)
Best-effort only (no reverse-image-search): if you happen to know the page that contains the image, WebFetch it and read the OpenGraph title / nearby caption. Usually there's no containing page from just an image URL → go to step 3.

### 3. Ask for a label (fallback)
If no label was detected, use `AskUserQuestion`:
- "Couldn't detect a name for this image (`<clean_url>`). What label should I use?" (free-text).

### 4. Add-publication offer (Substack miss only)
If a Substack image wasn't found and the user tells you which publication it's from, offer to append that host to `.claude/skills/mt-add-image/config/substack-publications.json`, then retry step 2a. This grows coverage for next time.

### 5. Insert into Bonus → Images
Follow `../mt-add-url/references/newsletter-post-mechanics.md` to find/create today's post, then add under **Images**:
```markdown
**Images:**
![label](clean_image_url)
```
Create `### Bonus` / `**Images:**` if missing.

### 6. Report
```
✅ Image added to Newsletter #[number] (Bonus → Images)
📄 content/post/YYYY/MM/DD/index.md
🏷️  label: "[label]"  (source: rss | sitemap | opengraph | user-input)
🖼️  [clean_image_url]
```

## Checklist

- [ ] Source detected (substack + uuid, or non-substack)
- [ ] Label resolved by priority (caption → post title → your input)
- [ ] Entry under Bonus → **Images** (section/subsection created if missing)
- [ ] Label localized to Vietnamese where natural (keep proper nouns)
