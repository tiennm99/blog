---
name: mt-add-video
description: 'YouTube video handler for the Hugo blog newsletter. Adds a YouTube link to today''s newsletter Bonus → Videos section as a Vietnamese title link plus a 1-2 sentence Vietnamese summary. Normally invoked by the mt-add-url meta skill after classification, but can be used directly for a known YouTube URL. Handles YouTube links only (not direct video files).'
---

## Overview

`mt-add-video` is the **YouTube handler**: given a YouTube link, it adds the video to today's newsletter **Bonus → Videos** as a Vietnamese title link with a 1-2 sentence Vietnamese summary. It does **not** classify or route — that is `mt-add-url`'s job.

Scope: **YouTube links only** (`watch`, `youtu.be`, `shorts`). Direct video files (`.mp4` etc.) are not handled here — they go through `mt-add-url`'s fallback.

Shared scripts: `scripts/newsletter/`. Shared procedure: `../mt-add-url/references/newsletter-post-mechanics.md` — **follow it** for post find/create, numbering, Bonus insertion, and language rules.

## Input

A clean YouTube URL (passed by `mt-add-url`, or given directly).

## Workflow

1. **Classify / fetch title** — run the router to get the canonical URL + title:
   ```bash
   node scripts/newsletter/add-url.js "<url>"
   ```
   Confirm `route: youtube`; skip if `duplicate` or not `accessible`. Use the returned `clean_url` (canonical `watch?v=ID`) and `title`.
   - If `title` is missing (oEmbed failed), fetch the title via WebFetch on the watch URL.

2. **Localize title** — render the title in Vietnamese where natural; keep proper nouns (product/company/channel names) as-is.

3. **Write a 1-2 sentence Vietnamese summary.** Source for the summary content, in order:
   - WebFetch the watch URL for the video description.
   - If thin/unavailable, optionally use the `ai-multimodal` (Gemini) skill to analyze the video — only if available.
   - Worst case, derive a single sentence from the title.
   Keep it to 1-2 sentences (KISS).

4. **Post mechanics** — follow `../mt-add-url/references/newsletter-post-mechanics.md` to find/create today's post and locate the Bonus section.

5. **Insert under Bonus → Videos:**
   ```markdown
   **Videos:**
   [Tiêu đề video tiếng Việt](https://www.youtube.com/watch?v=ID)
   > Tóm tắt 1-2 câu về nội dung video.
   ```
   - If `### Bonus` doesn't exist yet, create it (there's now an asset to put in it).
   - If `**Videos:**` already exists, append the new entry under it; otherwise create the `**Videos:**` subsection.

6. **Report:**
   ```
   ✅ Video added to Newsletter #[number] (Bonus → Videos)
   📄 content/post/YYYY/MM/DD/index.md
   🎬 [Vietnamese title] — [clean_url]
   ```

## Checklist

- [ ] `route: youtube` confirmed; not a duplicate
- [ ] Title in Vietnamese (proper nouns kept)
- [ ] 1-2 sentence Vietnamese summary present
- [ ] Entry under Bonus → **Videos** (section/subsection created if missing)
- [ ] Vietnamese content ≥99%
