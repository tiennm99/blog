# Phase 2 — Parity Verification (JS vs Go side-by-side)

## Context

Both engines coexist. For each case below, run `node scripts/newsletter/<script>.js …` and `go run ./scripts/newsletter <cmd> …` with identical args and `diff` the outputs. Work from repo root. Use the scratchpad for output capture — no files in the repo.

## Verification Matrix

**Deterministic (must be byte-identical):**

| Command | Cases |
|---------|-------|
| `find-newsletter-number` | no args (repo content as-is) |
| `list-existing-tags` | no args — full 40-line ranking identical |
| `detect-image-source` | (a) real substackcdn wrapper URL pulled from an existing post, (b) raw S3 URL, (c) non-Substack image URL, (d) garbage non-URL |
| `add-url` routing/dedup fields | compare all fields except `http_status`/`accessible` timing flakes — rerun on mismatch |

**Network-dependent (identical modulo transient upstream changes):**

| Command | Cases |
|---------|-------|
| `add-url` | (a) YouTube watch URL, (b) `youtu.be` short link, (c) `/shorts/` URL — all three must emit the same canonical `clean_url` + oEmbed `title`/`author`; (d) article URL with `utm_*`+`fbclid` params (check `clean_url`); (e) URL already present in `content/post` (must report `duplicate: true`); (f) Substack image URL (route `image`); (g) `.pdf` URL (route `document`) |
| `find-substack-post` | (a) uuid from a recent ByteByteGo post (grep an existing post's markdown for a substack uuid) → RSS hit shape; (b) fabricated uuid → `{ found: false }`; (c) fabricated uuid with `--deep` → miss shape with `scanned`/`budget`/`cutoff` |
| `fetch-via-defuddle` | (a) fetchable article — compare exit code + first ~40 lines of body; (b) unreachable URL — exit 1, stderr message |

**Duplicate-boundary regression (the lookahead rewrite):** craft two checks against real repo content — a stored URL where the probe is a strict prefix (`/p/foo` vs stored `/p/foo-bar`, must be `duplicate: false`) and a stored substack uuid probed exactly (must be `true`).

## Acceptable Drift (document, don't fix)

- `clean_url` percent-encoding differences from query-rebuild strategy (phase-1 trap #2), as long as `bareUrl`-based dedup results agree.
- Entity decoding: `html.UnescapeString` decodes entities the JS map missed — Go output may be *more* correct in `postTitle`/`caption`/`candidates`.

Any other divergence is a bug: fix Go, rerun the failing case.

## Exit Criteria

- Matrix fully executed; results table (case → identical / drift-documented / fixed) recorded in `plans/reports/parity-260818-newsletter-go-migration-report.md`.
- One real end-to-end `mt-add-url` flow executed manually against the Go engine (temporarily invoke the Go command in place of the node line) to prove the JSON contract holds for skill consumption.
