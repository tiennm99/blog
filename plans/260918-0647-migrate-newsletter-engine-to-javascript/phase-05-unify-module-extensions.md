---
phase: 5
title: "Unify module extensions on .js"
status: done
priority: P3
effort: "1h"
dependencies: [3]
---

# Phase 5: Unify module extensions on `.js`

## Overview

Rename `.github/scripts/*.mjs` to `.js` so the repo has one module extension.
Independent of the engine migration; sequenced after phase 3 only so the
newsletter cutover lands first and a CI break here is unambiguous.

## Why `.js` and not `.mjs`

Decided during validation (2026-09-18), on three checks against this repo:

1. The root `package.json` declares `"type": "module"`, so a `.js` file here is
   already ESM. `.mjs` restates what the manifest states.
2. Node's directory resolution requires `index.js` — verified empirically: with
   only `eng/index.mjs` present, `node eng` fails with
   `Cannot find module '…/eng'`; adding `eng/index.js` makes it resolve. This is
   what keeps the engine invocation at `node scripts/newsletter <cmd>` rather
   than a full file path, so `scripts/newsletter/` must use `.js` regardless.
3. `eslint.config.mjs` already globs `**/*.js` alongside `**/*.mjs`, so no lint
   config change is needed.

`.mjs` earns its place in a package without `"type": "module"`, or one shipping
dual CJS/ESM entry points. Neither applies. `eslint.config.mjs` itself keeps its
extension — ESLint's own convention, and it sits outside the `type` field's
reach in some resolution paths.

## Requirements

**Functional**
- No `.mjs` under `.github/scripts/`.
- `npm run projects:refresh` works locally.
- The `update-projects.yml` scheduled workflow runs green.

**Non-functional**
- Renames use `git mv` so history follows the file.
- One commit, so a revert is clean if the workflow breaks.

## Architecture

Three files move; five reference sites follow. All verified by grep at plan time:

| File | Action |
|---|---|
| `.github/scripts/update-projects-list.mjs` | → `update-projects-list.js` |
| `.github/scripts/lib/github-api.mjs` | → `lib/github-api.js` |
| `.github/scripts/lib/render-projects.mjs` | → `lib/render-projects.js` |

| Reference site | Line(s) | What changes |
|---|---|---|
| `package.json` | 12 | `projects:refresh` script path |
| `.github/workflows/update-projects.yml` | 41 | `run: node …` path |
| `.github/scripts/update-projects-list.mjs` | 18, 25 | two `import` specifiers |
| `.github/scripts/update-projects-list.mjs` | 36, 37 | two JSDoc `import("…")` types |
| `.github/scripts/lib/render-projects.mjs` | 6, 51, 66, 80 | four JSDoc `import("…")` types |

The JSDoc `import("./github-api.mjs").Repo` annotations are the easy miss: they
are type references inside comments, so a stale one does not throw at runtime —
it silently degrades to `any` and the repo loses the typing it adopted JSDoc for.

## Related code files

- Rename: the three files above
- Modify: `package.json`, `.github/workflows/update-projects.yml`
- Modify: the renamed files' own import specifiers and JSDoc type imports
- Unchanged: `eslint.config.mjs`

## Implementation steps

1. `git mv` the three files.
2. Update the two runtime `import` specifiers in `update-projects-list.js`.
3. Update all six JSDoc `import("…")` type references (two in
   `update-projects-list.js`, four in `lib/render-projects.js`).
4. Update `package.json` line 12 and `update-projects.yml` line 41.
5. `grep -rn "\.mjs" package.json .github/` → only `eslint.config.mjs` style
   matches should remain, and none under `.github/scripts/`.
6. `npm run lint` and `npm run projects:refresh` locally. The refresh needs a
   GitHub token; if one is not available locally, confirm the script gets as far
   as the auth check rather than failing on module resolution.
7. Push and let `update-projects.yml` run — trigger it manually rather than
   waiting for the daily cron.

## Success criteria

- [x] `find .github/scripts -name "*.mjs"` → empty
- [x] `grep -rn "\.mjs" .github/ package.json` → empty
- [x] `npm run lint` clean
- [x] `npm run projects:refresh` resolves all modules (auth failure is acceptable
      locally; a module-resolution failure is not)
- [x] `update-projects.yml` completes green on a manual dispatch — run 35329575936
- [x] The projects page content it generates is unchanged — the run produced its usual `chore(projects): refresh projects list` commit containing only upstream star-count drift and the existing tie ordering, no structural change

## Risk assessment

**A stale JSDoc `import("…")` type silently degrades to `any`.** Nothing throws,
lint stays green, and the repo quietly loses type coverage on `Repo` and
`Contribution` — the exact thing the JSDoc-not-TypeScript policy exists to
provide.
*Signal:* step 5's grep, which is why it checks JSDoc strings and not just
`import` statements.
*Response:* fix the reference. If any are found after the commit, add a lint rule
or a grep to CI rather than relying on the next person to remember.

**`update-projects.yml` breaks and the projects page goes stale silently.** It is
a daily cron, so a failure is easy to miss.
*Mitigation:* step 7 triggers it manually instead of waiting.
*Response:* revert the single commit; the rename is cosmetic and nothing depends
on it.

**Scope creep into an unrelated CI path.** This phase touches the projects
workflow, which has nothing to do with the newsletter engine.
*Mitigation:* it is its own phase, its own commit, and it is P3 — droppable
without affecting phases 1-4.
*Response:* if phase 4 leaves CI unstable for any reason, drop this phase rather
than stacking a second CI change on top.
