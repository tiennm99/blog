# tsuki (月)

[![license](https://img.shields.io/badge/license-Apache--2.0-blue)](LICENSE)
[![Hugo](https://img.shields.io/badge/hugo-%E2%89%A50.146-ff4088?logo=hugo)](https://gohugo.io)
[![a11y](https://img.shields.io/badge/a11y-WCAG%202.2%20AA-success)](docs/accessibility.md)

A Hugo blog + personal portfolio theme. The homepage *is* the portfolio — bio, featured projects, recent posts. Posts live at `/post/`. Vietnamese-first typography, View Transitions on navigation, Pagefind search, Giscus comments.

> 月 (*tsuki*): the moon. Quiet, observed, returned to.

**→ Live: [miti99.com](https://miti99.com)**, the blog this theme is built for.

## Status

Not published on its own; see [installation](docs/installation.md) and the [CHANGELOG](CHANGELOG.md).

## Features

- **Blog** — posts, tags, categories, year-grouped archive, paginated post list
- **Personal portfolio on the homepage** — driven by `data/profile.yaml` + `data/projects.yaml`, no separate `/portfolio` section
- **Search** — [Pagefind](https://pagefind.app), zero-runtime, indexed at build time
- **Comments** — [Giscus](https://giscus.app) (GitHub Discussions)
- **Vietnamese-first** — diacritic-safe typography, native vi date formats, ASCII heading IDs
- **Multilingual** — vi and en i18n bundles, a language switcher and hreflang alternates when the site defines more than one language ([languages](docs/config.md#languages))
- **Dark mode** — `prefers-color-scheme` + persistent toggle, no flash of wrong theme
- **View Transitions** — cross-document transitions between pages (CSS `@view-transition`) in supporting browsers
- **Table of contents** — auto-mounted on long posts, sticky on wide viewports, IntersectionObserver active highlight
- **RSS full content** — `params.rssFullContent: true` puts each post's full content in the feed instead of its summary
- **llms.txt** — `/llms.txt` index of the site ([outputs](docs/config.md#outputs))
- **Prefetch** — optional Speculation Rules hints (`params.prefetch.enable`), off by default
- **Remote-image hook** — a site's `_partials/image/remote.html` can rewrite absolute image URLs (see [`docs/customization.md`](docs/customization.md#remote-images))
- **No external build step** — Hugo Pipes only (minify, fingerprint, `js.Build`). No SCSS, no TypeScript, no npm in the theme
- **Light** — small per-page-kind CSS bundles and a few tiny scripts; sizes are not checked automatically

## Quick start

Copy the [`themes/tsuki/`](https://github.com/tiennm99/blog/tree/main/themes/tsuki) folder into your site's `themes/`, then:

```bash
echo 'theme: tsuki' >> hugo.yaml
```

Install Pagefind in your site for search. Full guide (Pagefind setup, required site config): [`docs/installation.md`](docs/installation.md).

## Documentation

- [`docs/installation.md`](docs/installation.md) — copy-in + Pagefind setup
- [`docs/config.md`](docs/config.md) — full params reference
- [`docs/data-schemas.md`](docs/data-schemas.md) — `profile.yaml` + `projects.yaml`
- [`docs/customization.md`](docs/customization.md) — override layouts, tokens, fonts, remote images
- [`docs/accessibility.md`](docs/accessibility.md) — WCAG 2.2 AA notes and manual checks
- [`docs/migrating-from-stack.md`](docs/migrating-from-stack.md) — for users coming from `hugo-theme-stack`

## Search and comments

Search uses Pagefind, built post-Hugo via `npx pagefind --site public`. Install Pagefind in your own site (see [`docs/installation.md`](docs/installation.md)). No runtime dependency.

Comments use Giscus. Generate config at [giscus.app](https://giscus.app) and add to `params.comments.giscus.*` to enable. Defaults to off.

## Browser support

Modern evergreen browsers. View Transitions and `:has()` are progressive enhancements; the theme remains functional without them.

## License

[Apache-2.0](LICENSE)
