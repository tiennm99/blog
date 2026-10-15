---
name: mt-add-url
description: 'Meta entry for adding URLs to the Hugo blog newsletter. Use whenever the user provides one or more URLs to add to their newsletter (articles, YouTube videos, images, etc.). Classifies each URL and auto-dispatches to the right handler skill (mt-add-article for articles, mt-add-video for YouTube, mt-add-image for images). For unsupported types it asks the user how to proceed. This is the default entry point for newsletter URL processing.'
---

## Overview

`mt-add-url` is the **meta dispatcher**: it classifies each URL and auto-invokes the matching handler skill. Handlers (`mt-add-article`, `mt-add-video`, `mt-add-image`) own the actual content writing. The shared engine lives in `scripts/newsletter/` — see [docs/newsletter/engine-commands.md](../../../docs/newsletter/engine-commands.md) for every command it offers, and `docs/newsletter/post-mechanics.md` for shared post mechanics.

**Supported routes (this version):**
- `article` → `mt-add-article`
- `youtube` → `mt-add-video`
- `image` → `mt-add-image`

Everything else (direct `video` file, `document`, or anything unrecognized) is **not supported yet** → ask the user how to handle it.

## Workflow

### 1. Classify each URL

For every URL the user provides:
```bash
node scripts/newsletter add-url "<url>"
```
Output (JSON): `{ original_url, clean_url, http_status, accessible, duplicate, route, title?, author? }`.

- `route` ∈ `youtube | image | video | document | article`
- For `youtube`, `clean_url` is the canonical `https://www.youtube.com/watch?v=ID` and `title`/`author` come from oEmbed.

### 2. Skip non-actionable URLs

- `duplicate: true` → skip and report where it already is, per `docs/newsletter/post-mechanics.md` §6.
- `accessible: false` → **not an automatic skip** (HEAD probe; bot-blocked hosts read false). Dispatch on `route` as normal and follow post-mechanics §6.

### 3. Dispatch on route

| route | Action |
|-------|--------|
| `article` | Invoke the **`mt-add-article`** skill, passing `clean_url` |
| `youtube` | Invoke the **`mt-add-video`** skill, passing `clean_url`, `title` and `author` |
| `image` | Invoke the **`mt-add-image`** skill, passing `clean_url` |
| `video` (direct file) / `document` / anything else | **Fallback** — see step 4 |

Dispatch by calling the Skill tool for the chosen handler with `clean_url` as the argument. The handler completes the write end-to-end.

**Multiple URLs:** dispatch **sequentially** (one handler finishes before the next starts) — handlers edit the same daily `index.md`, so concurrent edits would clobber each other. Process every URL (articles, videos, images) one at a time.

### 4. Fallback for unsupported types

When `route` is not `article`, `youtube`, or `image`, do NOT write anything automatically. Use `AskUserQuestion`:

- **Question:** "URL type `<route>` isn't supported yet (`<clean_url>`). How do you want to handle it?"
- **Options:**
  - "Add a new skill" — e.g. a handler for this type. (Recommended for a type you'll reuse.)
  - "Update an existing skill" — extend a handler to support this URL type.
  - "Skip this URL" — leave it out of the newsletter.

Act on the user's choice. If they choose add/update, proceed to design that skill change (or hand off to a planning step); do not silently route the URL into a post.

### 5. Final report

Close with the target post's TL;DR tally, then the per-URL detail. Read the tally from the post itself so it reflects everything the post now holds, not just this batch:

```bash
node scripts/newsletter post-stats content/post/YYYY/MM/DD/index.md
```

Aggregate across all URLs:
```
✅ Newsletter URL Dispatch Complete

📊 [tally line in the post-mechanics §4a format]

✅ Dispatched: [count]
   - [count] → mt-add-article (articles)
   - [count] → mt-add-video (YouTube)
   - [count] → mt-add-image (images)

⏭️  Skipped: [count]
   - [url]: duplicate / inaccessible

❓ Unsupported: [count]
   - [url] (route: [route]): [user decision]
```

The tally is report-only — never write it into `index.md`. See *Post tally* in `docs/newsletter/post-mechanics.md`.

## Notes

- Handlers (`mt-add-article`, `mt-add-video`, `mt-add-image`) remain directly invocable for single-purpose use, but `mt-add-url` is the normal entry point when a user pastes a URL.
- Shared mechanics (numbering, post find/create, Bonus insertion, language rules) are defined once in `docs/newsletter/post-mechanics.md`; handlers reference it.
