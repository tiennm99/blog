---
name: mt-add-video
description: 'YouTube video handler for the Hugo blog newsletter. Adds a YouTube link to the target newsletter post''s Bonus → Videos section as a Vietnamese title link plus a 1-2 sentence Vietnamese summary. Normally invoked by the mt-add-url meta skill after classification, but can be used directly for a known YouTube URL. Handles YouTube links only (not direct video files).'
---

## Overview

`mt-add-video` is the **YouTube handler**: given a YouTube link, it adds the video to the target newsletter post's **Bonus → Videos** (today's post unless the user pinned another one) as a Vietnamese title link with a 1-2 sentence Vietnamese summary. It does **not** classify or route — that is `mt-add-url`'s job.

Scope: **YouTube links only** (`watch`, `youtu.be`, `shorts`). Direct video files (`.mp4` etc.) are not handled here — they go through `mt-add-url`'s fallback.

Shared scripts: `scripts/newsletter/`. Shared procedure: `docs/newsletter/post-mechanics.md` — **follow it** for post find/create, numbering, Bonus insertion, and language rules.

## Input

A clean YouTube URL (passed by `mt-add-url`, or given directly).

## Workflow

1. **Classify / fetch title** — when dispatched by `mt-add-url`, reuse its `clean_url`, `title` and `author` (channel) and do not rerun the router. Only when invoked directly, run it to get the canonical URL, title and channel:
   ```bash
   node scripts/newsletter add-url "<url>"
   ```
   Confirm `route: youtube`; skip if `duplicate`; for `accessible: false` follow `docs/newsletter/post-mechanics.md` §6. Use `clean_url` (canonical `watch?v=ID`), `title` and `author` (channel).
   - If `title` is missing (oEmbed failed), take the `videoDetails` `"title"` from the same watch-page curl as step 3, not WebFetch.

2. **Localize title** (intentional exception to the keep-source-language rule for article titles and image labels — see AGENTS.md) — keep the original title when it is mostly proper nouns, product names or a code identifier; otherwise translate it into Vietnamese and keep the proper nouns (product/company/channel names) as-is.

3. **Write a 1-2 sentence Vietnamese summary.** Source for the summary content, in order:
   1. The watch page's player JSON (WebFetch usually returns no description):
      ```bash
      curl -sL -A 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36' -H 'Accept-Language: en' '<clean_url>' | grep -oE '"shortDescription":"([^"\\]|\\.)*"' | head -1
      ```
      Then JSON-unescape the value (`\n`, `\"`).
   2. WebFetch on the watch URL.
   3. An installed multimodal skill (e.g. `ak:ai-multimodal`), only if available.
   4. As a last resort, derive the summary from title + channel and say so in the report.
   Blockquote length per post-mechanics §5.

4. **Post mechanics** — follow `docs/newsletter/post-mechanics.md` to resolve/create the target post and locate the Bonus section.

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
   📊 [tally]
   ```
   The tally comes from `post-stats` — see *Post tally* in the shared post mechanics.

## Checklist

- [ ] `route: youtube` confirmed; not a duplicate
- [ ] Title localized per step 2 (Vietnamese with proper nouns kept, or original when it is mostly proper nouns)
- [ ] 1-2 sentence Vietnamese summary present
- [ ] Entry under Bonus → **Videos** (section/subsection created if missing)
- [ ] Vietnamese content ≥99%
