# Installation

tsuki supports two install methods. Pick the one that matches your team's tooling.

## Git submodule

```bash
git submodule add https://github.com/tiennm99/tsuki.git themes/tsuki
git submodule update --init --recursive
```

In your site `hugo.yaml`:

```yaml
theme: tsuki
```

Pin to a specific version:

```bash
cd themes/tsuki && git checkout v0.2.0 && cd -
git add themes/tsuki && git commit -m "chore: pin tsuki to v0.2.0"
```

## Hugo Module

Requires Go installed locally (Hugo Modules use Go's module system).

```bash
hugo mod init github.com/<you>/<your-site>
hugo mod get github.com/tiennm99/tsuki@latest
```

In your site `hugo.yaml`:

```yaml
module:
  imports:
    - path: github.com/tiennm99/tsuki
```

Update later with `hugo mod get -u github.com/tiennm99/tsuki`.

## Required site config

Hugo does not deep-merge nested config from themes — duplicate these into your *site* `hugo.yaml`. See [`config.md`](config.md) for the full block; the minimum is:

```yaml
languageCode: vi
defaultContentLanguage: vi
pagination: { pagerSize: 10, path: page }
taxonomies: { category: categories, tag: tags }
permalinks: { post: /:year/:month/:day/:contentbasename/ }
markup:
  goldmark:
    renderer: { unsafe: true }
    parser: { autoHeadingIDType: github-ascii }
related:
  threshold: 80
  includeNewer: true
  toLower: true
  indices:
    - { name: tags, weight: 100 }
    - { name: categories, weight: 60 }
    - { name: date, weight: 10 }
```

Drop a `data/profile.yaml` and `data/projects.yaml` next; see [`data-schemas.md`](data-schemas.md).

## Pagefind search

Pagefind indexes content **after** Hugo builds. The theme assumes you run it as part of your build pipeline — it's not bundled into the layout.

Install Pagefind in your site and run it after Hugo, locally and in CI:

```bash
npm install --save-dev pagefind
npx pagefind --site public
```

If you don't want search at all, set `params.search.enable: false` in your `hugo.yaml` and skip the Pagefind step entirely.

## Verify

After installing, run `hugo server` from your site. You should see:

- Homepage with hero, optional projects grid, recent posts
- `/post/` list with pagination
- `/tags/<slug>/`, `/categories/<slug>/`, `/archives/`
- Single post with reading-time byline, related posts at the bottom
- `<head>` containing OG, Twitter, JSON-LD on posts; `<meta name=generator content="tsuki">`

If something looks off, see [`customization.md`](customization.md) for override patterns or open an issue.
