# Installation

tsuki is not published on its own: it is vendored in [`tiennm99/blog`](https://github.com/tiennm99/blog/tree/main/themes/tsuki) at `themes/tsuki/` and edited in place there. There are no releases or tags to pin, and no Hugo Module path.

## Copy the theme

Copy the `themes/tsuki/` folder from `tiennm99/blog` into your site's `themes/tsuki/`, then set the theme in your site `hugo.yaml`:

```yaml
theme: tsuki
```

To update, copy a newer version of the folder over yours. Keep your changes in your site's `layouts/` and `assets/` (see [`customization.md`](customization.md)) rather than in the copied folder, so an update does not overwrite them.

## Required site config

Hugo merges only `params` and `outputFormats` from the theme, so the rest of the config the theme needs (markup, permalinks, related posts, outputs, language) must be set in your *site* `hugo.yaml`. The block to copy is in [`config.md`](config.md#required).

Drop a `data/profile.yaml` and `data/projects.yaml` next; see [`data-schemas.md`](data-schemas.md).

## Content pages

`/search/` and `/archives/` render only when the site has a section page for them. Create both:

```yaml
# content/search/_index.md
---
title: "Search"
description: "Search all posts."   # optional
---
```

```yaml
# content/archives/_index.md
---
title: "Archives"
---
```

Add them to the main menu if you want header links (see [`config.md`](config.md#optional)).

## Pagefind search

Pagefind indexes content **after** Hugo builds. The theme assumes you run it as part of your build pipeline — it's not bundled into the layout.

Install Pagefind in your site and run it after Hugo, locally and in CI:

```bash
npm install --save-dev pagefind
npx pagefind --site public
```

`hugo server` does not run Pagefind, so search works locally only after `hugo && npx pagefind --site public --serve`.

If you don't want search at all, set `params.search.enable: false` in your `hugo.yaml` and skip the Pagefind step entirely.

## Verify

After installing, run `hugo server` from your site. You should see:

- Homepage with hero, optional projects grid, recent posts
- `/post/` list with pagination
- `/tags/<slug>/`, `/categories/<slug>/`, `/archives/`
- Single post with reading-time byline, related posts at the bottom
- `<head>` containing OG, Twitter, JSON-LD on posts; `<meta name=generator content="tsuki">`

If something looks off, see [`customization.md`](customization.md) for override patterns, or open an issue at [tiennm99/blog](https://github.com/tiennm99/blog/issues).
