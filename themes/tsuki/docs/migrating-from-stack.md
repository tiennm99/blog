# Migrating from hugo-theme-stack

tsuki extracts Stack's information architecture (posts, tags, categories, archive, search, comments) and rewrites the visual layer + asset pipeline. Most posts will render unchanged. This guide covers what to delete, what to add, and where Stack-isms hide.

## What carries over

- Post frontmatter: `title`, `date`, `description`, `tags`, `categories`, `image`, `draft`
- Content path convention `content/post/YYYY/MM/DD/slug/index.md`
- Permalink shape `/:year/:month/:day/:slug/` (set `:contentbasename` on tsuki for clean ASCII)
- Tags and categories taxonomies
- Archive page (`content/archives/_index.md`)
- Giscus comment provider

## What changes

### Replace the theme

Remove the Stack submodule:

```bash
git submodule deinit themes/hugo-theme-stack
git rm themes/hugo-theme-stack
```

Then copy the `themes/tsuki/` folder from [`tiennm99/blog`](https://github.com/tiennm99/blog/tree/main/themes/tsuki) into your site (see [installation.md](installation.md)).

### Update `theme:`

```yaml
theme: tsuki                       # was: hugo-theme-stack
```

### Drop these (Stack-only)

- `params.sidebar.*` — tsuki has no sidebar
- `params.widgets.*` — no widget system; portfolio is in homepage hero/projects
- `params.article.headingAnchor` — the heading render hook always adds anchors; to drop them, override `_markup/render-heading.html` in your site
- `params.colorScheme.toggleIcon` — fixed icon
- `params.imageProcessing.*` — tsuki uses Hugo's default image processing
- `params.comments.provider` — only Giscus is supported; no Disqus / Utterances / Waline
- TypeScript build pipeline (`assets/ts/`, `tsconfig.json`) — tsuki ships ES modules directly
- SCSS pipeline (`assets/scss/`) — tsuki uses plain CSS with custom properties

### Param mapping

| Stack | tsuki | Notes |
|---|---|---|
| `params.description` | `params.description` | unchanged |
| `params.sidebar.avatar.src` | `data/profile.yaml: avatar` | now data-driven |
| `params.sidebar.subtitle` | `data/profile.yaml: tagline` | |
| `params.sidebar.emoji` | — | dropped |
| `params.menu.social[].icon` | `data/profile.yaml: links[].icon` | same icon names |
| `params.article.toc` | `params.toc.enable` + per-post `toc:` | |
| `params.search.fuse` | — | replaced by Pagefind (different config; see [config.md](config.md)) |
| `params.colorScheme.default` | system: respects `prefers-color-scheme` | toggle persists in localStorage |
| `params.dateFormat.published` | — | uses `time.Format ":date_long"` with site language |
| `params.imageProcessing.cover.enabled` | — | dropped; cover image renders as-is |

### Content frontmatter

Stack-specific fields ignored without error:

- `image` — Stack used this for sidebar cover; tsuki uses it for OG image only
- `categories[0]` weight quirks — tsuki uses Hugo defaults
- `menu`, `weight` — still respected
- `slug` — still respected

No content rewrite required for typical posts.

## Required additions

Add the [required block from config.md](config.md#required) to your `hugo.yaml`; Hugo does not merge those keys from the theme. It includes `markup.highlight.noClasses: false`, which the theme's syntax colours need.

If your existing permalink scheme differs, **keep it** — the theme works with any permalink shape.

## Build and verify

```bash
hugo --gc --minify
```

Spot-check 5–10 posts in the rendered output. Common surprises:

- **TOC appears unexpectedly**: shown on posts over `params.toc.minWordCount` words (default 400) with at least one heading (see [config.md](config.md#table-of-contents)). Add `toc: false` to opt out.
- **Heading IDs changed**: switching to `autoHeadingIDType: github-ascii` produces different anchor slugs. Old `#lập-trình` becomes `#lap-trinh`. Inbound links from external sites break. Mitigate with redirects, or skip the `autoHeadingIDType` change and accept Vi diacritics in fragment URLs.
- **Search results paths**: rebuild Pagefind index (`npx pagefind --site public`); the old Fuse.js JSON index becomes dead weight.

## Not supported (consider before migrating)

- KaTeX math. A site can add math itself through Goldmark's passthrough extension and its own `head/custom.html` [site hook](customization.md#site-hooks).
- Tag cloud widget
- Image gallery shortcode
- Any Stack-specific shortcode (`gallery`, `keyword`, `bilibili`, etc.)

If you rely on these heavily, add them in your site's `layouts/` or stay on Stack.
