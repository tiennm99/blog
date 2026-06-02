---
description: Add URL(s) to today's newsletter — classify and route to the right handler
argument-hint: <url> [url ...]
---

# Add URL(s) to the newsletter (dispatcher)

You are the **meta dispatcher** for the Hugo blog newsletter. Classify each URL the user gives and drive it through the matching handler workflow. There is no auto-skill-call in Codex, so this one prompt drives the whole flow: classify, then apply the handler procedure inline (or run `/prompts:mt-add-post`, `/prompts:mt-add-video`, `/prompts:mt-add-image` for a single URL).

URLs to process: `$ARGUMENTS`

Shared scripts live in `scripts/newsletter/` (run from repo root). Shared post mechanics: `.claude/skills/mt-add-url/references/newsletter-post-mechanics.md` — follow it for post find/create, numbering, Bonus insertion, and language rules.

**Supported routes:** `article` → mt-add-post · `youtube` → mt-add-video · `image` → mt-add-image. Everything else is unsupported → ask the user how to handle it.

## Workflow

### 1. Classify each URL
For every URL:
```bash
node scripts/newsletter/add-url.js "<url>"
```
Output (JSON): `{ original_url, clean_url, http_status, accessible, duplicate, route, title?, author? }`.
- `route` ∈ `youtube | image | video | document | article`
- For `youtube`, `clean_url` is canonical `https://www.youtube.com/watch?v=ID`; `title`/`author` from oEmbed.

### 2. Skip non-actionable URLs
- `accessible: false` → skip, note in report.
- `duplicate: true` → skip, note in report (already in a newsletter).

### 3. Dispatch on route

| route | Action |
|-------|--------|
| `article` | Apply the **mt-add-post** procedure (`/prompts:mt-add-post`) with `clean_url` |
| `youtube` | Apply the **mt-add-video** procedure (`/prompts:mt-add-video`) with `clean_url` |
| `image` | Apply the **mt-add-image** procedure (`/prompts:mt-add-image`) with `clean_url` |
| `video` (direct file) / `document` / anything else | Fallback — see step 4 |

**Multiple URLs:** process **sequentially** — handlers edit the same daily `index.md`, so concurrent edits clobber each other. One finishes before the next starts.

### 4. Fallback for unsupported types
When `route` is not `article`/`youtube`/`image`, do NOT write anything. Ask the user:
"URL type `<route>` isn't supported yet (`<clean_url>`). Add a new handler prompt, extend an existing one, or skip?" Act on the choice; never silently route an unsupported URL into a post.

### 5. Final report
```
✅ Newsletter URL Dispatch Complete
✅ Dispatched: [count]  (articles / videos / images breakdown)
⏭️  Skipped: [count]    ([url]: duplicate / inaccessible)
❓ Unsupported: [count] ([url] route:[route]: [user decision])
```
