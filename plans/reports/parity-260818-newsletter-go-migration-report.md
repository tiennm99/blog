# Parity Report — Newsletter Engine JS → Go (2026-08-18)

Method: identical args to `node scripts/newsletter/<script>.js` and `go run ./scripts/newsletter <cmd>`, `diff` on stdout, exit codes compared. Live network cases against real upstreams.

## Results

| Case | Result |
|------|--------|
| find-newsletter-number | IDENTICAL |
| list-existing-tags (full 40-line ranking) | IDENTICAL |
| detect-image-source: substackcdn wrapper (real URL from posts) | IDENTICAL |
| detect-image-source: raw S3 URL | IDENTICAL |
| detect-image-source: non-Substack image w/ utm param | IDENTICAL |
| detect-image-source: garbage non-URL | IDENTICAL |
| add-url: YouTube watch / youtu.be / shorts (same video id) | IDENTICAL ×3; all canonicalize to same watch URL, oEmbed title+author present |
| add-url: stored article + `utm_source`+`fbclid`+`x=1` | IDENTICAL; trackers dropped, `x=1` kept, `duplicate: true` |
| add-url: prefix probe `/p/goclaw-30-mot-buoc` vs stored `…-ngoat-lon` | IDENTICAL; `duplicate: false` — lookahead→index-scan rewrite verified |
| add-url: stored S3 image (uuid dedup) | IDENTICAL; `route: image`, `duplicate: true` |
| add-url: `.pdf` | IDENTICAL; `route: document` |
| find-substack-post: live ByteByteGo RSS uuid | IDENTICAL (hit shape incl. candidates list) |
| find-substack-post: fabricated uuid | IDENTICAL (`{found:false}`) |
| find-substack-post: fabricated uuid `--deep` | IDENTICAL (miss shape: scanned/budget/cutoff) |
| fetch-via-defuddle: example.com | exit 0=0, body byte-identical |
| fetch-via-defuddle: unresolvable host | exit 1=1 |
| fetch-via-defuddle: no args | node 2, go-run 1 — see drift |

## Accepted Drift

1. **`go run` collapses nonzero exits to 1.** In-program codes (1 fail / 2 bad-args) are correct in a compiled binary, but `go run` reports any child failure as 1. No skill distinguishes 1 vs 2 (verified mt-webfetch SKILL.md acts on stderr/body, not codes). Noted in `fetch_via_defuddle.go` header.
2. **Entity decoding**: Go uses stdlib `html.UnescapeString` (superset of the JS hand-rolled map). No divergence observed on live data; Go can only be more correct on exotic entities.
3. **`clean_url` query strategy**: Go keeps surviving query pairs verbatim (no re-encode) vs JS re-serialization. No divergence observed in the matrix; could differ on already-percent-encoded params. Dedup unaffected (path/identity-based).
4. **list-existing-tags tie order**: Go walks lexically (deterministic); Node readdir order is FS-dependent. Full output was identical on current content; a future tie could order differently between engines — moot once JS is deleted.

## Verdict

All matrix cases pass. Go engine is behavior-equivalent for skill consumption. Proceed to cutover.
