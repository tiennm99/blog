# TODO

- [ ] Remove the temporary Stack redirects once the old URLs stop getting
  traffic. Check Cloudflare analytics for hits on `/page/N/`, `/page/page/N/`,
  `/tags/page/N/` and `/categories/page/N/`; review on 2027-02-07, 2027-05-07
  and 2027-11-07 (3, 6 and 12 months after the tsuki switch on 2026-11-07).
  When they are quiet, delete `layouts/home.redirects` and the
  `mediaTypes`/`outputFormats`/`outputs` redirects block in
  `config/_default/hugo.yml` together, then build and confirm no
  `public/_redirects` is produced.
