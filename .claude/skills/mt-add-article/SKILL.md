---
name: mt-add-article
description: 'Article handler for the Hugo blog newsletter. Adds a single article/blog URL to the target newsletter post as a main-content entry with the original source title and a Vietnamese summary. Normally invoked by the mt-add-url meta skill after classification, but can be used directly for a known article URL.'
---

## Overview

`mt-add-article` is the **article handler**: given a clean article/blog URL, it extracts the source title and content, writes a Vietnamese summary, and inserts it into the target newsletter post's main content (today's post unless the user pinned another one). It does **not** classify or route URLs — that is `mt-add-url`'s job. For YouTube/images/other types, use `mt-add-url`.

Shared scripts: `scripts/newsletter/`. Shared procedure: `docs/newsletter/post-mechanics.md` (resolve/create the target post, newsletter numbering, section insertion, language rules) — **follow it** for all post mechanics.

## Input

A clean article URL (passed by `mt-add-url`, or given directly). If a raw URL is provided directly, you may run the classifier to clean/dedup it first:
```bash
node scripts/newsletter add-url "<url>"
```
Trust `route: article`; skip if `duplicate`; for `accessible: false` follow post-mechanics §6 (not a skip by itself).

## Workflow

1. **Extract** the original article title and main content. Try `WebFetch` first, then the `mt-fetch-url` fallback chain. Title: post-mechanics §4 (*Title source*). Skip rules: post-mechanics §6.
   - **GitHub repo URLs** (`github.com/<owner>/<repo>`): `WebFetch` returns only the repo chrome with HTTP 200, so the fallback never triggers. Read the README from `https://raw.githubusercontent.com/<owner>/<repo>/HEAD/README.md` (`HEAD` resolves the default branch). On 404, find the README's real name in the repo page's file list. The title follows the post-mechanics §4 GitHub rule.
2. **Summarize in Vietnamese** — length per post-mechanics §5 *Summary length* (count with `awk` NF, target 280–298, max 300 words); professional tone for junior developers. Summary paragraphs only; do not add a key-points bullet list.
3. **Post mechanics** — follow `docs/newsletter/post-mechanics.md` to resolve/create the target post and (if new) get the newsletter number + apply the template. Done after extraction so a failed fetch never leaves an empty new newsletter behind.
4. **Write** the main-content block and insert it **before** the `### Bonus` section (or append at end of file if there is no Bonus yet — do not create an empty Bonus):

```markdown
## [Original article title](clean_url)

[Tóm tắt tiếng Việt — ≤300 từ, xem post-mechanics §5]
```

5. **Report**:
```
✅ Article added to Newsletter #[number]
📄 content/post/YYYY/MM/DD/index.md
🔗 [clean_url]
📊 [tally]
```
The `📊` line uses the post-mechanics §4a (*Post tally*) format.

## Checklist

- [ ] Valid Hugo front matter (if post was created) with correct date
- [ ] Title `"Newsletter #[number]"` (if created)
- [ ] Tags include `"AI-Assisted"`
- [ ] URL is clean (no tracking params)
- [ ] Heading uses the original source article title, not a Vietnamese translation
- [ ] Summary paragraphs only, no key-points bullet list
- [ ] Summary ≤300 words by awk NF count (target 280-298), per post-mechanics §5
- [ ] Vietnamese content ≥99%, grammar correct
- [ ] Article inserted before the Bonus section
