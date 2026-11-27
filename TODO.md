# TODO

- [ ] On or after 2027-01-01, remove every redirect. They are kept until the
  end of 2026 so old links and search results can catch up with the URL
  changes of 2026 (the Stack-to-nocturne switch, English as the default
  language, `post` renamed to `posts` and standalone pages moved to the
  content root). Remove together, then build:
  - `layouts/home.redirects` and the `mediaTypes`/`outputFormats`/`outputs`
    redirects block in `config/_default/hugo.yml` (Stack pagination,
    `/page/`, `/en/` prefix and `/post/` to `/posts/` rules);
  - the `aliases` front matter in `content/about/`, `content/projects/` and
    `content/referral/` (both `index.md` and `index.vi.md`).

  Check: `hugo` produces no `public/_redirects`, and no page but the
  `/page/1/` pager copies Hugo writes itself contains a meta refresh. After
  that, old URLs return 404.
