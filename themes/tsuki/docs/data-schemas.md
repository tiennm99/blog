# Data schemas

The homepage portfolio is data-driven. Two YAML files in `data/`.

## `data/profile.yaml`

Powers the homepage hero, the header and footer name, `/llms.txt`, and the OG image, author and publisher-logo fallbacks.

```yaml
name: "Your Name"             # required: display name
tagline: "Building tools, breaking things, writing it down."  # optional: under name
avatar: "img/avatar.png"      # optional: path under assets/ (processed) or static/ (as is)
url: "https://<you>.example.com/about/"  # optional: JSON-LD author URL
bio: |                        # optional: markdown, rendered with markdownify
  Software engineer. I build for the web, experiment with tooling,
  and write down what I learn.
links:                        # optional: array of {icon, label, url}
  - icon: github               # icon name resolves to assets/icons/<name>.svg
    label: GitHub
    url: https://github.com/<you>
  - icon: mail
    label: Email
    url: mailto:hi@example.com
  - icon: rss
    label: RSS
    url: /index.xml
```

Field reference:

| field   | type   | required | notes                                     |
|---------|--------|----------|-------------------------------------------|
| name    | string | yes      | falls back to `site.Title` if absent      |
| tagline | string | no       | rendered as `<p>` under name              |
| avatar  | string | no       | a raster image under `assets/` is cropped to 240×240 WebP in the hero and resized for the OG card and publisher logo; any other path (e.g. under `static/`) is linked as is |
| url     | string | no       | JSON-LD author URL; `params.profile.url` overrides it, the site home is the fallback |
| bio     | string | no       | markdown; `markdownify` filter applied — see security note below |
| links   | array  | no       | empty list = no links section; a site-relative `url` goes through `relLangURL` |

Built-in link icons under `assets/icons/`: `facebook`, `github`, `gitlab`, `linkedin`, `mail`, `rss` (`moon`, `search` and `sun` are UI icons). Add your own SVGs there with `currentColor` fill; see [customization.md](customization.md#add-custom-icons).

> **Security note — `bio` rendering.** The theme requires `markup.goldmark.renderer.unsafe: true` (see [`docs/config.md`](config.md)) and pipes `bio` through `markdownify`. Any raw HTML in `bio` — including `<script>`, `<iframe>`, `onerror=` attributes — renders verbatim. Treat `data/profile.yaml` as **trusted-author input only**. Do not populate `bio` from a CMS, form, or any source you don't fully control. If you need to disable raw HTML site-wide, set `markup.goldmark.renderer.unsafe: false` in your `hugo.yaml` (you may lose footnotes and `<details>` blocks in posts that rely on them).

## `data/projects.yaml`

Powers the featured projects grid on the homepage.

```yaml
featured:
  - title: "example-app"
    tagline: "A web app with a live demo."
    repo: https://github.com/<owner>/<repo>
    demo: https://<app>.example.com/
    image: "img/projects/example-app.svg"
    tags: [web, demo]

  - title: "example-cli"
    tagline: "A command-line tool with no demo."
    repo: https://github.com/<owner>/<other-repo>
    tags: [cli]
```

Field reference (per project):

| field   | type     | required | notes                                            |
|---------|----------|----------|--------------------------------------------------|
| title   | string   | yes      | card heading                                     |
| tagline | string   | no       | one-line description under title                 |
| image   | string   | no       | site-relative; rendered 16:9 with `object-fit: cover` |
| repo    | URL      | no       | "repo →" link if present                         |
| demo    | URL      | no       | "demo →" link if present                         |
| tags    | string[] | no       | small chips below tagline                        |

The grid uses `auto-fit, minmax(16rem, 1fr)`; cards reflow on narrow viewports automatically.
