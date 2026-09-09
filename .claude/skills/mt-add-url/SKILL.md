---
name: mt-add-url
description: 'Meta entry for adding URLs to the Hugo blog newsletter. Use whenever the user provides one or more URLs to add to their newsletter (articles, YouTube videos, images, etc.). Classifies each URL and auto-dispatches to the right handler skill (mt-add-post for articles, mt-add-video for YouTube, mt-add-image for images). For unsupported types it asks the user how to proceed. This is the default entry point for newsletter URL processing.'
---

## Overview

`mt-add-url` is the **meta dispatcher**: it classifies each URL and auto-invokes the matching handler skill. Handlers (`mt-add-post`, `mt-add-video`, `mt-add-image`) own the actual content writing. Shared scripts live in `scripts/newsletter/`; shared post mechanics in `references/newsletter-post-mechanics.md`.

**Supported routes (this version):**
- `article` → `mt-add-post`
- `youtube` → `mt-add-video`
- `image` → `mt-add-image`

Everything else (direct `video` file, `document`, or anything unrecognized) is **not supported yet** → ask the user how to handle it.

## Workflow

### 1. Classify each URL

For every URL the user provides:
```bash
go run ./scripts/newsletter add-url "<url>"
```
Output (JSON): `{ original_url, clean_url, http_status, accessible, duplicate, route, title?, author? }`.

- `route` ∈ `youtube | image | video | document | article`
- For `youtube`, `clean_url` is the canonical `https://www.youtube.com/watch?v=ID` and `title`/`author` come from oEmbed.

### 2. Skip non-actionable URLs

- `duplicate: true` → skip, note in report (already in a newsletter).
- `accessible: false` → **not an automatic skip.** The classifier does a plain fetch, so a bot-blocked host (403, Cloudflare challenge) reports `accessible: false` even when the page is public and the fallback fetchers can read it. Dispatch on `route` as normal and let the handler's fetch chain decide; only report the URL as skipped when every fetcher in `mt-webfetch` has failed. A `404`/dead URL is a genuine skip.

### 3. Dispatch on route

| route | Action |
|-------|--------|
| `article` | Invoke the **`mt-add-post`** skill, passing `clean_url` |
| `youtube` | Invoke the **`mt-add-video`** skill, passing `clean_url` |
| `image` | Invoke the **`mt-add-image`** skill, passing `clean_url` |
| `video` (direct file) / `document` / anything else | **Fallback** — see step 4 |

Dispatch by calling the Skill tool for the chosen handler with `clean_url` as the argument. The handler completes the write end-to-end.

**Multiple URLs:** dispatch **sequentially** (one handler finishes before the next starts) — handlers edit the same daily `index.md`, so concurrent edits would clobber each other. Process article(s) and video(s) one at a time.

### 4. Fallback for unsupported types

When `route` is not `article`, `youtube`, or `image`, do NOT write anything automatically. Use `AskUserQuestion`:

- **Question:** "URL type `<route>` isn't supported yet (`<clean_url>`). How do you want to handle it?"
- **Options:**
  - "Add a new skill" — e.g. a handler for this type. (Recommended for a type you'll reuse.)
  - "Update an existing skill" — extend a handler to support this URL type.
  - "Skip this URL" — leave it out of the newsletter.

Act on the user's choice. If they choose add/update, proceed to design that skill change (or hand off to a planning step); do not silently route the URL into a post.

### 5. Final report

Aggregate across all URLs:
```
✅ Newsletter URL Dispatch Complete

✅ Dispatched: [count]
   - [count] → mt-add-post (articles)
   - [count] → mt-add-video (YouTube)
   - [count] → mt-add-image (images)

⏭️  Skipped: [count]
   - [url]: duplicate / inaccessible

❓ Unsupported: [count]
   - [url] (route: [route]): [user decision]
```

## Notes

- Handlers (`mt-add-post`, `mt-add-video`, `mt-add-image`) remain directly invocable for single-purpose use, but `mt-add-url` is the normal entry point when a user pastes a URL.
- Shared mechanics (numbering, post find/create, Bonus insertion, language rules) are defined once in `references/newsletter-post-mechanics.md`; handlers reference it.
