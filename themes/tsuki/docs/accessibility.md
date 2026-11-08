# Accessibility

tsuki targets **WCAG 2.2 AA** conformance and aims for **Lighthouse Accessibility ≥ 95** on every page kind; the score is a target, not a recorded measurement. This document records what's covered, the known limitations, and how to measure on your own site.

## Conformance summary

| Area | Status | Notes |
|------|--------|-------|
| Skip link | ✅ Shipped | First focusable; jumps to `<main id="main">` |
| Landmark roles | ✅ Shipped | `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>` |
| Visible focus rings | ✅ Shipped | `:focus-visible` with 2px outline + accent colour |
| `<html lang>` correctness | ✅ Shipped | Resolves from the language's `languageCode`, else its key; falls back to `"en"` |
| `aria-pressed` on toggle | ✅ Shipped | The toggle stays hidden until its script runs, then reflects the active theme, including OS changes |
| `<meta name="theme-color">` | ✅ Shipped | Light + dark variants |
| Heading anchors | ✅ Shipped | Empty, `aria-hidden` and out of the tab order; the glyph comes from CSS, so heading names and summaries stay clean |
| Reduced motion | ✅ Shipped | View Transitions + animations honour `prefers-reduced-motion` |
| Colour contrast (text) | ✅ Shipped | All body text ≥ 4.5:1 in both themes; `--tsuki-fg-subtle` is `#6b6b6b` (light) for AA compliance |
| Pagination disabled-state contrast | ✅ Shipped | Uses `--tsuki-fg-muted` + `cursor: not-allowed`; no `opacity` compound |
| Tap targets ≥ 40×40 | ✅ Shipped | Header toggle/search-button 2.5rem; pagination 2.75rem; footer links padded |
| Tap targets ≥ 48×48 (strict Lighthouse) | ⚠️ Partial | Header buttons are 40×40 (2.5rem); the strict Lighthouse tap-target audit may flag them |
| Forms (search) | ✅ Shipped | Pagefind UI ships its own label semantics |
| `<details>` keyboard support | ✅ Native | Tab → Enter to toggle |
| Drag operations (SC 2.5.7) | ✅ N/A | Theme has no drag UI |

## Measuring on your site

Use the latest Chrome DevTools or `lighthouse` CLI:

```bash
npx lighthouse https://your-site.example.com/ \
  --only-categories=accessibility,performance,best-practices,seo \
  --form-factor=mobile --throttling-method=simulate \
  --output=html --output-path=./lh.html
```

Run against **production** (a live URL), not a localhost build — service workers, caching, TLS, and font loading all affect scores.

Check each page kind: home (`/`), a post, a list (`/post/`) and search (`/search/`). Targets (mobile profile, median of 3 runs): Performance ≥ 80, Accessibility ≥ 95, Best Practices ≥ 80, SEO ≥ 80.

## Known limitations

- **Tap targets on the header buttons** — theme-toggle and search-button are 40×40 px (2.5rem). The Lighthouse "Tap targets are sized appropriately" audit measures against 48×48 px and may flag these. Visual design tradeoff; bump to 3rem to silence the audit at the cost of a larger header footprint.
- **`prefers-color-scheme: no-preference`** is treated as light. There is no third "auto" state in the toggle UI — click cycles light ↔ dark only, but picking the theme that matches the OS clears the stored choice, so the site follows the OS again.
- **Goldmark `unsafe: true`** is the default — your content controls what HTML renders. Untrusted authorship surfaces should override `markup.goldmark.renderer.unsafe: false`.
- **Pagefind UI** ships its own CSS and ARIA semantics. tsuki maps colour tokens but does not override Pagefind's structure.

## Reporting accessibility regressions

Open an issue at [tiennm99/blog](https://github.com/tiennm99/blog/issues) with the WCAG 2.2 SC reference and a reproduction URL. Patches welcome.
