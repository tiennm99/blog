# blog

Source of [miti99.com](https://miti99.com) — personal blog (VN/EN) built with [Hugo](https://gohugo.io) and the tsuki theme, vendored in `themes/tsuki/`.

## Quick start

```bash
npm ci
hugo server -D
```

Site available at `http://localhost:1313`. Search runs on a [Pagefind](https://pagefind.app) index, which `hugo server` does not build. To try search locally, build the site and index it:

```bash
hugo && npx pagefind --site public --serve
```

## Content structure

Posts live under `content/post/YYYY/MM/DD/index.md`. Each post is a Hugo leaf bundle — images and assets sit next to `index.md` in the same directory.

```
content/
  post/
    2024/
      03/
        15/
          index.md     ← post content (Vietnamese / English)
          cover.jpg    ← optional cover image
  page/                ← standalone pages (about, projects, …)
```

## Theme customization

Site config lives in `config/_default/` (Hugo config directory split):

- `params.yml` — tsuki options: footer, license, comments (Giscus), search, prev/next navigation
- `hugo.yml`, `markup.yml`, `permalinks.yml` — site, Markdown and URL settings
- `data/profile.yaml`, `data/projects.yaml` — home page profile and featured projects
- `layouts/` — template overrides; `layouts/_partials/head/custom.html` holds the analytics tags

The tsuki theme is vendored in `themes/tsuki/` (no submodule) and is edited there directly; its docs are in [themes/tsuki/README.md](themes/tsuki/README.md) and [themes/tsuki/docs/](themes/tsuki/docs/); record theme changes in [themes/tsuki/CHANGELOG.md](themes/tsuki/CHANGELOG.md). Posts keep their content-path URLs (`/post/YYYY/MM/DD/`).

## Working with AI tools

This repo runs from Claude Code, OpenCode, or Codex off one shared engine (`scripts/newsletter/`, Node — run `npm ci` once, then `node scripts/newsletter <command>`; see [docs/newsletter/engine-commands.md](docs/newsletter/engine-commands.md)) and one instruction file (`AGENTS.md`). Repository-scoped Codex skills use the official `.agents/skills/` format; no installer is required. Setup, invocation per tool, and how to pick one and remove the rest: see [docs/multi-tool-usage.md](docs/multi-tool-usage.md).

## License

Apache-2.0 — see [LICENSE](LICENSE).
