---
name: mt-add-image
description: 'Image handler for the Hugo blog newsletter. Adds an image URL to today''s newsletter Bonus → Images with a detected label. For Substack-hosted images it finds the source post (ByteByteGo and other configured publications) via RSS then sitemap, using the figure caption or post title as the label; for other sites it is best-effort; if no label is found it asks you to type one. Normally invoked by the mt-add-url meta skill after classification, but can be used directly for a known image URL.'
---

## Overview

`mt-add-image` is the **image handler**: given an image URL, it resolves a human-readable **label** and inserts `![label](image_url)` into today's newsletter **Bonus → Images**. It does not classify/route — that is `mt-add-url`'s job.

Shared scripts: `scripts/newsletter/`. Shared procedure: `../mt-add-url/references/newsletter-post-mechanics.md` — **follow it** for post find/create, Bonus insertion, and language rules.

**Label priority:** figure caption → source post title → your typed input.

**Label language:** Preserve the selected label's original source-language wording, capitalization, and punctuation. Do not translate or localize it unless the user explicitly asks. Preserve user-typed labels exactly as entered.

## Input

A clean image URL (passed by `mt-add-url`, or given directly).

## Workflow

### 1. Detect source
```bash
node scripts/newsletter/detect-image-source.js "<url>"
```
→ `{ original_url, clean_url, isSubstack, uuid?, innerUrl? }`.

When invoked **directly** (not via `mt-add-url`), first run the router to get accessibility + duplicate status and skip accordingly:
```bash
node scripts/newsletter/add-url.js "<url>"   # expect route:image; skip if duplicate/!accessible
```
(When dispatched by `mt-add-url`, that check already ran — don't repeat it.)

### 2a. Substack image (`isSubstack: true` with `uuid`)
Find the source post:
```bash
node scripts/newsletter/find-substack-post.js --uuid <uuid>
```
- `found: false` → retry with the deeper sitemap crawl (slower — fetches posts ~3 months back, capped at 40 fetches total across all publications; warn the user it may take a while):
  ```bash
  node scripts/newsletter/find-substack-post.js --uuid <uuid> --deep
  ```
  On a miss the result reports `scanned` (posts fetched), `budget` (the 40-fetch cap), and `cutoff` (oldest date looked at) — mention how far back it looked.
- `found: false` after `--deep` → no source post; go to step 3 (ask) and/or step 4 (add publication).

**When `found: true` — pick the label (confirm-from-candidates):**
ByteByteGo doesn't attach captions to images (verified: empty `alt`, no `<figcaption>`), and image order can't be mapped to titles automatically because sponsor/video items interleave. So the script returns `candidates` — the newsletter post's topic titles from the post's TOC. Pick the label this way:
1. If `caption` is non-empty (some publications do caption images) → propose it as the default.
2. Otherwise present `candidates` to the user via `AskUserQuestion` (the correct title is in this list):
   - "Image is from **[postTitle]** (`postUrl`). Which title matches it?"
   - Offer the candidates. If there are more than 4, show them as a numbered list in text and ask the user to pick a number (AskUserQuestion allows max 4 options).
   - Always include a "Type my own" escape.
3. Label = the user's pick (or the typed value). Preserve its original language, wording, capitalization, and punctuation; do not translate unless the user explicitly asks.

### 2b. Non-Substack image (`isSubstack: false`)
Best-effort only (no reverse-image-search): if you happen to know the page that contains the image, WebFetch it and read the OpenGraph title / nearby caption. Usually there's no containing page from just an image URL → go to step 3.

### 3. Ask for a label (fallback)
If no label was detected, use `AskUserQuestion`:
- "Couldn't detect a name for this image (`<clean_url>`). What label should I use?" (free-text).

### 4. Add-publication offer (Substack miss only)
If a Substack image wasn't found and the user tells you which publication it's from, offer to append that host to `scripts/newsletter/config/substack-publications.json`, then retry step 2a. This grows coverage for next time.

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
🏷️  label: "[label]"  (source: candidate-pick | caption | user-input; post: [postTitle])
🖼️  [clean_image_url]
```

## Checklist

- [ ] Source detected (substack + uuid, or non-substack)
- [ ] Label confirmed (caption if present, else user picked from candidates, else typed)
- [ ] Entry under Bonus → **Images** (section/subsection created if missing)
- [ ] Label preserves original source language, wording, capitalization, and punctuation unless the user requested translation
