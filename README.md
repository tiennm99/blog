# miti99

Source of [miti99.com](https://miti99.com) — personal blog (VN/EN) built with [Hugo](https://gohugo.io) and the [Stack](https://github.com/CaiJimmy/hugo-theme-stack) theme.

## Quick start

```bash
git submodule update --init --recursive
hugo server -D
```

Site available at `http://localhost:1313`.

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

Theme config lives in `config/` (Hugo config directory split). Key overrides:

- `config/_default/params.toml` — sidebar, avatar, footer, color scheme
- `config/_default/menu.toml` — navigation links
- `assets/` — custom CSS/JS overrides loaded on top of the Stack theme
- `layouts/` — template overrides (add a file here to override any Stack partial)

The Stack theme is pulled in as a git submodule under `themes/hugo-theme-stack/`.

## Working with AI tools

This repo runs from Claude Code, OpenCode, or Codex off one shared script engine (`scripts/newsletter/`) and one instruction file (`AGENTS.md`). Setup, invocation per tool, and how to pick one and remove the rest: see [docs/multi-tool-usage.md](docs/multi-tool-usage.md).

## License

Apache-2.0 — see [LICENSE](LICENSE).
