# Customization

Hugo's lookup order means **anything in your site overrides the theme**. No fork required.

## Override layouts and partials

Drop a file with the same path under your site's `layouts/` to replace the theme version.

```
your-site/
└── layouts/
    ├── _partials/
    │   └── footer.html      # overrides themes/tsuki/layouts/_partials/footer.html
    └── single.html          # overrides themes/tsuki/layouts/single.html
```

To extend rather than replace, copy the theme partial into your site, then modify. Common overrides:

- `_partials/footer.html` — restructure the footer (to add a line, use the `footer/custom.html` [site hook](#site-hooks) instead)
- `_partials/home/hero.html` — restructure the homepage hero
- `_partials/comments.html` — swap Giscus for a different provider

## Site hooks

Two optional partials let a site add markup without copying a theme file. The theme renders each one only when it exists:

- `layouts/_partials/head/custom.html` — last in `<head>`, so its stylesheets override theme CSS. Use it for custom CSS, fonts, analytics and extra meta tags.
- `layouts/_partials/footer/custom.html` — at the end of the site footer.

## Override design tokens

Tokens are CSS custom properties in `assets/css/tokens.css`: light values on `:root`, dark values on `:root[data-theme="dark"]` (an explicit toggle choice) and in `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) }` (the OS setting). Override them in a custom stylesheet without editing the theme, using the same selectors so dark mode works both ways:

```css
/* your-site/assets/css/custom.css */
:root {
  --tsuki-accent: #cc7a3b;        /* warmer accent */
  --tsuki-font-sans: "Public Sans", system-ui, sans-serif;
  --tsuki-content-width: 48rem;   /* wider posts */
}
:root[data-theme="dark"] {
  --tsuki-accent: #f0a070;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --tsuki-accent: #f0a070;
  }
}
```

Load it from the `head/custom.html` [site hook](#site-hooks), which comes after the theme CSS:

```go-html-template
{{- /* your-site/layouts/_partials/head/custom.html */ -}}
{{ with resources.Get "css/custom.css" | minify | fingerprint }}
<link rel="stylesheet" href="{{ .RelPermalink }}" integrity="{{ .Data.Integrity }}" crossorigin="anonymous">
{{ end }}
```

## Add custom icons

Drop SVGs into `assets/icons/<name>.svg`, then reference by name:

```yaml
# data/profile.yaml
links:
  - icon: bluesky
    label: Bluesky
    url: https://bsky.app/profile/...
```

Use `currentColor` for fill/stroke so icons inherit text color in light and dark modes:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path d="..."/>
</svg>
```

## Self-host fonts

The theme stack is `"Inter", "Be Vietnam Pro", system-ui, ...`. The first two fall back to system fonts when missing. To self-host:

1. Subset Be Vietnam Pro + Inter to `vietnamese,latin` ranges.
2. Drop the woff2 files into `static/fonts/`.
3. Add `@font-face` declarations in `assets/css/custom.css`, loaded from the `head/custom.html` hook (see "Override design tokens" above).

```css
@font-face {
  font-family: "Inter";
  src: url("/fonts/Inter-VariableFont_slnt,wght.woff2") format("woff2-variations");
  font-weight: 100 900;
  font-display: swap;
}
@font-face {
  font-family: "Be Vietnam Pro";
  src: url("/fonts/BeVietnamPro-Regular.woff2") format("woff2");
  font-weight: 400;
  font-display: swap;
}
```

## Override colors per-page

Set CSS variables inline via a frontmatter `style` you wire up yourself, or use the `body_class` block from `baseof.html`. The post list page has `body.list.section-post` and single posts have `body.post`; for another section, give its list template a class:

```html
<!-- layouts/work/list.html: copy the theme's layouts/list.html, then change the class -->
{{ define "body_class" }}list section-work{{ end }}
```

Then style `body.section-work { --tsuki-accent: #...; }` in your custom CSS.

## Remote images

Images on another host render as a plain `<img>` with their URL unchanged. To optimize them, add `layouts/_partials/image/remote.html` to your site. `render-image.html` calls it with `(dict "Destination" <url>)` for every absolute image URL, and it must `return` a dict with any of these keys:

- `src`: replacement URL
- `srcset`: slice of `"<url> <width>w"` candidates (the theme adds its `sizes`)
- `width`, `height`: intrinsic size, so the browser reserves space
- `video`: URL of a looping clip that replaces the image (for animated GIFs). It renders as a muted `<video class="lazy-video">` that `js/lazy-video.js` loads near the viewport and plays only while visible.

Return an empty dict to keep the original URL.

## Show word count

Reading time is shown on every post by default. Add word count under it with:

```yaml
params:
  showWordCount: true   # default false
```

The byline reads `5 phút đọc · 1024 từ` (translated via the `wordCount` i18n key).

## Accessibility & SEO defaults

The theme includes accessibility features that require no configuration:

- **Skip-link** — first focusable element on every page; jumps to `<main id="main">` (WCAG 2.4.1 Bypass Blocks)
- **Focus rings** — visible outline via `--tsuki-accent` on `:focus-visible` for keyboard navigation
- **Lastmod byline** — shows "Cập nhật {date}" when modified date is ≥24h newer than publish date
- **Lazy-load images** — in-content images get `loading="lazy" decoding="async"`, except a first image near the top of a post, which gets `loading="eager" fetchpriority="high"` as the likely LCP element
- **External link security** — all Markdown links to `http://` / `https://` / `//` get `rel="noopener noreferrer"` automatically

All of these are transparent — no override hooks needed unless you want to customize the markup.

## Render hooks

The theme's Markdown render hooks live in `layouts/_markup/`; override one by adding the same file to your site.

- **Images** (`render-image.html`) — resolve as a page resource, then a global `assets/` resource, then the raw URL. Raster resources get `width`/`height` and a WebP `srcset` (480, 960, 1440 and the original width); SVG and GIF are served as they are. A block image (alone in its paragraph) links to the original file and becomes `<figure>` with `<figcaption>` when it has a title; Hugo marks images as block only when the site sets `markup.goldmark.parser.wrapStandAloneImageWithinParagraph: false`. Absolute URLs go through the [remote image hook](#remote-images).
- **Links** (`render-link.html`) — external links get `rel="noopener noreferrer"` (no `target="_blank"`). Link text that is one long path or host gets `<wbr>` break points after `/` and before `.`.
- **Headings** (`render-heading.html`) — an empty `aria-hidden` `#` anchor follows the text; CSS draws the glyph.
- **Tables** (`render-table.html`) — wrapped in a focusable, horizontally scrolling region.
- **Blockquotes** (`render-blockquote.html`) — keep Markdown attributes; alert syntax (`> [!note]`) renders as a plain blockquote.

Feeds use their own image, link and heading hooks (`*.rss.xml`); see [config.md](config.md#outputs).

## Disable features

Every interactive feature has a kill switch:

```yaml
params:
  search:
    enable: false           # removes the search button and Pagefind UI (see config.md)
  comments:
    giscus:
      enable: false         # comments partial becomes a no-op
```

Per-post:
```yaml
toc: false
comments: false
```

## Cover images

`cover.image` is currently used for OG / Twitter card metadata only — the theme does **not** render a hero cover above the post title by default. This avoids LCP regressions on themes with un-optimised consumer-supplied images.

To render a cover, copy the theme's `layouts/single.html` into your site and add a cover block inside `<header class="post-header">`, keeping the rest of the template (TOC, post footer, prev/next guard) as it is:

```go-html-template
{{- with .Params.cover }}{{ with .image }}
  {{- /* Page bundle first, then assets/; Hugo processing gives a hashed, resized copy. */ -}}
  {{- with or ($.Resources.Get .) (resources.Get .) }}
  {{- if and (eq .ResourceType "image") (ne .MediaType.SubType "svg") }}
  {{- $img := .Resize "1200x webp" }}
  <img class="post-cover" src="{{ $img.RelPermalink }}"
       width="{{ $img.Width }}" height="{{ $img.Height }}"
       alt="" fetchpriority="high" decoding="async">
  {{- else }}
  <img class="post-cover" src="{{ .RelPermalink }}" alt="" fetchpriority="high" decoding="async">
  {{- end }}
  {{- end }}
{{- end }}{{ end }}
```

The theme has no built-in cover renderer.

## Prev/next, language switcher

```yaml
params:
  prevNextNav:
    enable: true            # in-section prev/next post nav below content
    taxonomy: categories    # optional: keep prev/next inside the post's first category
  categoryChip:
    enable: true            # optional: first category as a chip above the post title
```

Prev/next renders only on pages in `site.MainSections`, so standalone pages (About, Links) get none. With `prevNextNav.taxonomy` set, a post with a term in that taxonomy links to the older and newer posts of its first term in the same section, which turns a category such as Newsletter into a series. Posts without a term fall back to the whole section.

The language switcher is described in [Languages](config.md#languages).

## Post footer: license and edit link

```yaml
params:
  license: "Licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)"
  editURL: "https://github.com/<owner>/<repo>/edit/main/content/"
```

`license` is rendered with Markdown under the post's tags; a post can override it with its own `license:` string or hide it with `license: false`. `editURL` is a prefix: the theme appends the post's path relative to `content/` (`.File.Path`), so it works for GitHub, GitLab or any forge that takes a file path.

## Layout behaviour

- **Table of contents** — emitted inside the article, between the header and the content. Below 64rem it is a framed block above the post; from 64rem it becomes a sticky sidebar, and only then does the post switch to two columns (`main:has(.toc)`), so posts without a TOC keep the single reading column. An ordered TOC (`markup.tableOfContents.ordered: true`) is numbered `1.`, `1.1.` like the headings it lists.
- **Pagination** — shows the first and last page, the current page ±2 and an ellipsis for each skipped run, and wraps on narrow screens.
- **Header nav** — wraps onto its own row below 40rem instead of scrolling the page sideways.
- **Print** — `@media print` in `layout.css` prints the post only: light colours, no header, footer, TOC, prev/next, related posts, comments or copy buttons, and external link targets spelled out after the link text.
