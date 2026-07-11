---
description: Add an image to today's newsletter Bonus → Images with a detected label
argument-hint: <image-url>
---

# Add an image to the newsletter (image handler)

Given an image URL, resolve a human-readable **label** and insert `![label](image_url)` into today's newsletter **Bonus → Images**. Does not classify/route — that is `/prompts:mt-add-url`'s job.

Image URL: `$ARGUMENTS`

Shared scripts: `scripts/newsletter/` (run from repo root). Shared procedure: `.claude/skills/mt-add-url/references/newsletter-post-mechanics.md` — follow it for post find/create, Bonus insertion, language rules.

**Label priority:** figure caption → source post title → user-typed input.

**Label language:** Preserve the selected label's original source-language wording, capitalization, and punctuation. Do not translate or localize it unless the user explicitly asks. Preserve user-typed labels exactly as entered.

## Workflow

### 1. Detect source
```bash
node scripts/newsletter/detect-image-source.js "<url>"
```
→ `{ original_url, clean_url, isSubstack, uuid?, innerUrl? }`.
When invoked directly (not via mt-add-url), first check accessibility/duplicate and skip accordingly:
```bash
node scripts/newsletter/add-url.js "<url>"   # expect route:image; skip if duplicate/!accessible
```

### 2a. Substack image (`isSubstack: true` with `uuid`)
```bash
node scripts/newsletter/find-substack-post.js --uuid <uuid>
```
- `found: false` → retry deeper (slower, ~3 months back, 40-fetch cap; warn the user):
  ```bash
  node scripts/newsletter/find-substack-post.js --uuid <uuid> --deep
  ```
  On a miss the result reports `scanned`, `budget` (40), `cutoff` — mention how far back it looked.
- Still `found: false` → go to step 3 (ask) and/or step 4 (add publication).

**When `found: true` — pick the label:**
ByteByteGo attaches no captions and image order can't be auto-mapped, so the script returns `candidates` (the newsletter post's topic titles).
1. If `caption` is non-empty → propose it as default.
2. Otherwise present `candidates` to the user: "Image is from **[postTitle]** (`postUrl`). Which title matches it?" Offer the candidates (numbered list if many). Always include a "Type my own" escape.
3. Label = user's pick (or typed). Preserve its original language, wording, capitalization, and punctuation; do not translate unless the user explicitly asks.

### 2b. Non-Substack image (`isSubstack: false`)
Best-effort only: if you know the containing page, fetch it and read the OpenGraph title / nearby caption. Usually none → go to step 3.

### 3. Ask for a label (fallback)
If no label detected: "Couldn't detect a name for this image (`<clean_url>`). What label should I use?" (free-text).

### 4. Add-publication offer (Substack miss only)
If the user names the publication, offer to append that host to `scripts/newsletter/config/substack-publications.json`, then retry step 2a.

### 5. Insert into Bonus → Images
Follow the shared procedure to find/create today's post, then add under **Images**:
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
- [ ] Label confirmed (caption, else user pick from candidates, else typed)
- [ ] Entry under Bonus → **Images** (section/subsection created if missing)
- [ ] Label preserves original source language, wording, capitalization, and punctuation unless the user requested translation
