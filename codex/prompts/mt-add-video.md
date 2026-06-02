---
description: Add a YouTube link to today's newsletter Bonus → Videos (Vietnamese)
argument-hint: <youtube-url>
---

# Add a YouTube video to the newsletter (video handler)

Given a YouTube link, add it to today's newsletter **Bonus → Videos** as a Vietnamese title link plus a 1-2 sentence Vietnamese summary. Does not classify/route — that is `/prompts:mt-add-url`'s job. Scope: **YouTube links only** (`watch`, `youtu.be`, `shorts`); direct video files go through mt-add-url's fallback.

YouTube URL: `$ARGUMENTS`

Shared scripts: `scripts/newsletter/` (run from repo root). Shared procedure: `.claude/skills/mt-add-url/references/newsletter-post-mechanics.md` — follow it for post find/create, numbering, Bonus insertion, language rules.

## Workflow
1. **Classify / fetch title:**
   ```bash
   node scripts/newsletter/add-url.js "<url>"
   ```
   Confirm `route: youtube`; skip if `duplicate` or not `accessible`. Use `clean_url` (canonical `watch?v=ID`) and `title`. If `title` missing (oEmbed failed), fetch the title from the watch URL with Codex's web tools.
2. **Localize title** to Vietnamese where natural; keep proper nouns (product/company/channel names).
3. **Write a 1-2 sentence Vietnamese summary.** Source order: fetch the watch URL for the video description; if thin, derive a single sentence from the title. Keep it to 1-2 sentences.
4. **Post mechanics** — follow `.claude/skills/mt-add-url/references/newsletter-post-mechanics.md` to find/create today's post and locate the Bonus section.
5. **Insert under Bonus → Videos:**
   ```markdown
   **Videos:**
   [Tiêu đề video tiếng Việt](https://www.youtube.com/watch?v=ID)
   > Tóm tắt 1-2 câu về nội dung video.
   ```
   Create `### Bonus` if missing; append under existing `**Videos:**` or create the subsection.
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
