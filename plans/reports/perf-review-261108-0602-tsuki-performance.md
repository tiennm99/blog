# tsuki performance review (2026-11-08)

Multi-agent review: 9 dimension reviewers (CSS, JS, images, HTML, third-party, caching, runtime, build, Lighthouse lab), 2 independent skeptics per finding, and a completeness critic. 37 findings were raised. After deduplication, 11 distinct issues survived and 3 were refuted. The critic found nothing new.

## Verdict

The theme itself is close to optimal. Lighthouse mobile scored 100 on home, /archives/, a 7-image newsletter (post/2026/02/01) and a code-heavy post (post/2020/04/15): LCP 0.9 s, CLS 0, TBT 30-50 ms. First-party CSS, JS and HTML come to about 10-23 KB per page. The real costs are elsewhere: remote Substack images in newsletters, third-party analytics, missing cache headers and unlimited RSS feeds.

## Findings, ranked

### High

1. **Remote Substack images are served unoptimized** (`themes/tsuki/layouts/_markup/render-image.html:23`). Of 315 post images, 287 are remote. 145 point at full-resolution `substack-post-media.s3.amazonaws.com` originals (2250-3780 px PNG/JPEG) placed in a 672 px column. The 139 `substackcdn.com` URLs use `f_auto`, which returned JPEG/PNG, never WebP, in testing, and 12 of them have no width cap. Switching to `f_webp` alone cut that set from 43 MB to 15 MB (-65%). Fix: in the remote branch, rewrite Substack images to `substackcdn.com/image/fetch/w_N,c_limit,f_webp,q_auto:good/<escaped original>` with a 480/960/1440 srcset and the existing `sizes`.
2. **Remote images have no width/height, which causes CLS** (`render-image.html:55-57`). A measured post (post/2025/08/xx) had CLS 0.217. 275 of 286 remote URLs already encode `_WxH.` in the filename. Fix: when `$res` is nil, use `findRESubmatch` with `_(\d+)x(\d+)\.(?:png|jpe?g|gif|webp)` on `.Destination` and emit `width` and `height`. `reset.css` already sets `height:auto`.
3. **57 animated GIFs are about half of all image bytes** (85 MB in total, about 1.5 MB each; post/2025/08/19 weighs 18.3 MB). Fix: render Substack `.gif` sources as `<video autoplay muted loop playsinline preload="none">` from `substackcdn.com/image/fetch/w_1100,c_limit,f_mp4/...`, at about 30% of the size.

### Medium

4. **No `_headers` in production.** Fingerprinted `/css/*`, `/js/*`, `/img/*` and `*_hu_*` images, plus `/pagefind/fragment/*` and `/pagefind/index/*`, are served live with `max-age=14400, must-revalidate`. Fix: add `static/_headers` that sets them to `Cache-Control: public, max-age=31536000, immutable`. The preview step's `>>` append still works with it. Leave HTML and the unhashed pagefind entry files at the defaults. Five reviewers raised this independently.
5. **RSS is unlimited and full-content.** `/index.xml` is 2.9 MB (858 KB brotli live), and the 308 feeds total 27 MB of the 48 MB build. Fix: `services: rss: limit: 20` in `config/_default/services.yml` cuts it about 85%, and the theme already honors the limit. Optionally drop term or taxonomy feeds, but that turns existing feed URLs into 404s.
6. **Third-party analytics are about 93% of page bytes.** gtag is 181 KB transferred (540 KB raw) and Clarity about 27 KB, against about 15 KB first-party. Cloudflare Web Analytics is also injected. This is the user's call: keep one tool, or load both after `load` plus `requestIdleCallback` (`layouts/_partials/head/custom.html:3-11`).

### Low

7. **The first image is always `loading=lazy` with no `fetchpriority`.** It is the likely LCP on 9 posts whose first image sits within about 600 characters. Fix: when `.Ordinal == 0` and the image appears early in `.RawContent`, emit `loading="eager" fetchpriority="high"`.
8. **Speculation Rules prefetch is built in but off.** Fix: `prefetch: { enable: true }` in `config/_default/params.yml`.
9. **code-copy.js loads on every post**, but only 49 of 198 have a `<pre>`. Fix: gate it on `strings.Contains .Content "<pre"` (`footer.html:24`). callouts.css (0 posts use callouts) could also be dropped from the single-post bundle.
10. **toc-active.js** rewrites `aria-current` on every scroll frame. Fix: return early when the active id has not changed.
11. **Smaller items:** remove the giscus `preconnect` in head (it is redundant, and the widget sits at the bottom). Use a native-width WebP as the top srcset candidate for local images 961-1439 px wide. Turn 4 front-matter aliases into `_redirects` 301s. In CI, add `filter: blob:none` to the checkout (the history pack is 146 MB).

## Refuted

- Inline analytics after the stylesheets block parsing: refuted, because they are async.
- Line-numbered Chroma tables double code-post size: refuted, the cost is negligible after compression.
- Two render-blocking stylesheets per page: refuted, Lighthouse showed no render-blocking cost worth fixing.

## Already good

CSS split by page kind with fingerprinting and SRI. No web fonts. Deferred module JS of about 2.3 KB gzip. Inline theme script, so no FOUC. Pagefind loads on demand. Giscus is lazy. Local images get a WebP srcset with dimensions. The build takes 0.45 s warm, and the CI image cache works.

## Open questions

- Analytics: keep GA4, Clarity and Cloudflare Web Analytics, or drop one or two?
- RSS: what item limit, and should tag and category feeds stay?
- Should the image fixes go in `themes/tsuki` or in a site-level `layouts/_markup/render-image.html` override? The Substack logic is blog-specific.
