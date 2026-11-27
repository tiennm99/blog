# blog

Source of [miti99.com](https://miti99.com) — personal blog (VN/EN) built with [Hugo](https://gohugo.io) and the [nocturne](https://github.com/tiennm99/nocturne) theme, imported as a Hugo Module.

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

Posts live under `content/post/YYYY/MM/DD/`. Each post is a Hugo leaf bundle: the Vietnamese source `index.vi.md`, its English translation `index.md` (English is the default language, served at `/`; Vietnamese is under `/vi/`), and images and assets in the same directory.

```
content/
  post/
    2024/
      03/
        15/
          index.vi.md  ← post content (Vietnamese source)
          index.md     ← English translation
          cover.jpg    ← optional cover image
  page/                ← standalone pages (about, projects, …)
```

## Theme customization

Site config lives in `config/_default/` (Hugo config directory split):

- `params.yml` — nocturne options: footer, license, comments (Giscus), search, prev/next navigation
- `hugo.yml`, `markup.yml`, `permalinks.yml` — site, Markdown and URL settings
- `data/profile.yaml`, `data/projects.yaml` — homepage profile and featured projects, with Vietnamese copy selected by `layouts/_partials/compat/data.html`
- `content/page/projects/` — bilingual project directory. The [refresh workflow](.github/workflows/update-projects.yml) updates the marked tables in both languages.
- `layouts/` — template overrides; `layouts/_partials/head/custom.html` holds the analytics tags

The theme lives in its own repo, [`tiennm99/nocturne`](https://github.com/tiennm99/nocturne), with its docs and CHANGELOG; make theme changes there. The blog imports it as a Hugo Module (needs [Go](https://go.dev/doc/install)), pinned to a commit in `go.mod`. To pull the latest theme `main`, run `hugo mod get -u github.com/tiennm99/nocturne` and commit `go.mod` and `go.sum`. To try local theme edits against the blog, run `HUGO_MODULE_REPLACEMENTS="github.com/tiennm99/nocturne -> ../nocturne" hugo server` with the theme cloned next to this repo. Posts keep their content-path URLs (`/post/YYYY/MM/DD/`).

## Working with AI tools

Instructions live in `CLAUDE.md` and skills in `.claude/skills/`. `AGENTS.md` and `.agents/skills` are symlinks to them, so Claude Code and any agent that reads `AGENTS.md` and `.agents/` work out of the box. They share one engine (`scripts/newsletter/`, Node — run `npm ci` once, then `node scripts/newsletter <command>`; see [docs/newsletter/engine-commands.md](docs/newsletter/engine-commands.md)). Layout and adding a skill: [docs/multi-tool-usage.md](docs/multi-tool-usage.md).

## License

Apache-2.0 — see [LICENSE](LICENSE).
