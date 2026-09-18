---
phase: 3
title: "Skill restructure and call-site cutover"
status: done
priority: P2
effort: "0.5d"
dependencies: [2]
---

# Phase 3: Skill restructure and call-site cutover

## Overview

Switch every `go run ./scripts/newsletter` call site to `node scripts/newsletter`
and, in the same pass, fix the three structural problems in the skill layer:
duplicated Codex adapters, a shared reference file owned by one skill, and the
engine's command list spelled out in five different files.

## Requirements

**Functional**
- No `go run` anywhere outside `plans/` and `scripts/newsletter/*.go` (the Go
  sources document their own invocation in doc comments and are deleted whole in
  phase 4; `plans/` are historical records and stay as written).
- The seven engine commands are enumerated in exactly one file. Every other
  mention is a link, except a skill inlining the one or two commands it actually
  invokes.
- Shared skill prose is owned by no individual skill.
- `.agents/` carries no content that can drift from `.claude/`.
- Setup docs state the `npm ci` prerequisite (R1) once, where a new user will
  hit it.

**Non-functional**
- Both Claude Code and Codex still discover and run all six skills afterward.
- Skill frontmatter `description` fields keep their trigger wording — they are
  how the runtimes decide to invoke a skill, and rewording them changes routing
  behavior.

## Architecture

**Shared prose moves to `docs/newsletter/`,** not into another skill's directory.
`docs/` already exists and is tool-neutral, which is the point: `.claude/` and
`.agents/` both reference it by repo-root-relative path, so nothing breaks under
symlinks and no skill owns another skill's documentation.

```
docs/newsletter/
  engine-commands.md     the ONE enumeration of the seven subcommands
  post-mechanics.md      moved from .claude/skills/mt-add-url/references/
```

**`.agents/skills/mt-*/SKILL.md` become symlinks** to their `.claude`
counterparts, eliminating the parallel frontmatter. Verify Codex follows symlinks
before committing; if it does not, keep the current thin pointers (they are
already only 10 lines) and settle for centralizing the command table.

**Renames — confirmed 2026-09-18.** The scheme is uniform
`mt-<verb>-<object>`; four of the six already conform, so only two move:
`mt-add-post` → `mt-add-article` (it adds an article *to* a post) and
`mt-webfetch` → `mt-fetch-url`. `mt-add-url`, `mt-add-video`, `mt-add-image` and
`mt-add-tags` keep their names — renaming a conforming skill is churn. Directory
name and frontmatter `name:` change together, and every cross-reference in the
other skills, `AGENTS.md`, and `README.md` follows.

<!-- Updated: Validation Session 1 - rename scheme confirmed, uniform mt-<verb>-<object>, two directories move -->

## Related code files

- Create: `docs/newsletter/engine-commands.md`
- Create: `docs/newsletter/post-mechanics.md` (git mv from
  `.claude/skills/mt-add-url/references/newsletter-post-mechanics.md`)
- Delete: `.claude/skills/mt-add-url/references/` (now empty)
- Rename: `.claude/skills/mt-add-post/` → `mt-add-article/`;
  `.claude/skills/mt-webfetch/` → `mt-fetch-url/`; same under `.agents/skills/`
- Modify: all six `.claude/skills/*/SKILL.md`
- Replace: all six `.agents/skills/*/SKILL.md` (symlinks)
- Modify: `AGENTS.md` (lines 42-51 and the routing section), `README.md` (line 42),
  `docs/multi-tool-usage.md` (lines 3, 13, 26, 27, 29)
- Modify: `opencode.json` — it already allows `node *` and never allowed `go *`;
  confirm no change is needed rather than assuming

## Call-site inventory

Verified by grep at plan time. Every `go run` occurrence outside `plans/`:

| File | Lines | Commands |
|---|---|---|
| `AGENTS.md` | 42, 45-51 | all seven + the prose describing the engine as Go |
| `.claude/skills/mt-add-url/SKILL.md` | 8, 23, 65 | `add-url`, `post-stats` |
| `.claude/skills/mt-add-url/references/newsletter-post-mechanics.md` | 4, 29, 91 | `find-newsletter-number`, `post-stats` |
| `.claude/skills/mt-add-post/SKILL.md` | 10, 16 | `add-url` |
| `.claude/skills/mt-add-video/SKILL.md` | 12, 22 | `add-url` |
| `.claude/skills/mt-add-image/SKILL.md` | 10, 24, 30, 40, 44, 71 | `detect-image-source`, `add-url`, `find-substack-post` (+`--deep`) |
| `.claude/skills/mt-add-tags/SKILL.md` | 53 | `list-existing-tags` |
| `.claude/skills/mt-webfetch/SKILL.md` | 31, 82 | `fetch-via-defuddle` |
| `README.md` | 42 | prose: "Go via `go run`" |
| `docs/multi-tool-usage.md` | 3, 13, 26, 27, 29 | prose + the shared-engine invocation |

## Implementation steps

1. Re-read the confirmed rename scheme above before touching anything — every
   later step bakes the names in.
2. Write `docs/newsletter/engine-commands.md`: the seven commands, their
   arguments, their output shapes, exit codes (including
   `fetch-via-defuddle`'s now-meaningful 2-vs-1), the repo-root invocation
   contract, and the `npm ci` prerequisite.
3. `git mv` the shared reference to `docs/newsletter/post-mechanics.md`. Update
   its own line 4 (`All shared scripts live in scripts/newsletter/`) and its two
   command blocks. Remove the now-empty `references/` directory.
4. Rename the two skill directories with `git mv`, under both `.claude/` and
   `.agents/`, and update each `SKILL.md` frontmatter `name:`.
5. Update all six `.claude` skills: `go run ./scripts/newsletter X` →
   `node scripts/newsletter X`; `../mt-add-url/references/newsletter-post-mechanics.md`
   → `docs/newsletter/post-mechanics.md`; `mt-add-post` → `mt-add-article` and
   `mt-webfetch` → `mt-fetch-url` in every cross-reference; add a link to
   `docs/newsletter/engine-commands.md` where a skill currently explains the
   engine. Leave the `description:` frontmatter wording alone except for the two
   renamed names.
6. Update `mt-fetch-url`'s tier list for the new two-stage tier 1 (local
   defuddle, then the `defuddle.md` proxy) from phase 1 — the current text
   describes a single defuddle step. The chain becomes: WebFetch → local defuddle
   → defuddle.md → reader proxy → report failure.
7. Test the symlink approach: replace one `.agents` adapter with a symlink, run
   Codex, confirm it discovers and follows the skill. On success convert the
   other five; on failure revert to thin pointers and note the reason in
   `docs/multi-tool-usage.md`.
8. Rewrite `AGENTS.md` lines 40-52: describe the engine as Node, replace the
   seven-command block with a one-line pointer to
   `docs/newsletter/engine-commands.md` plus the `npm ci` prerequisite, and
   update the skill names in the routing section and the Codex `$mt-*` list.
9. Update `README.md` line 42 and `docs/multi-tool-usage.md` lines 3, 13, 26, 27,
   29 — Node not Go, link the command reference rather than restating it, and
   keep `docs/newsletter/` in the "what you must keep" list in the
   pick-one-tool section.
10. Verify: `grep -rn "go run\|mt-add-post\|mt-webfetch" .claude .agents AGENTS.md
    README.md docs` returns nothing. Do not include `scripts/` — the Go sources
    still exist and reference themselves.
11. Verify the enumeration rule: `grep -rln "find-newsletter-number" .claude
    .agents AGENTS.md README.md docs` should show `docs/newsletter/` files and
    only those skills that actually invoke that command.
12. Run one real `mt-add-url` flow end to end — an article, a YouTube link, and a
    Substack image into a scratch post — under Claude Code, then repeat the
    dispatch step under Codex.

## Success criteria

- [x] `grep -rn "go run" .claude .agents AGENTS.md README.md docs` → empty
      (`scripts/` is excluded until phase 4: the 10 Go sources carry 16 `go run`
      occurrences in their own doc comments)
- [x] `grep -rn "mt-add-post\|mt-webfetch" .claude .agents AGENTS.md README.md docs` → empty
- [x] All seven commands enumerated in `docs/newsletter/engine-commands.md` and
      nowhere else
- [x] No skill references a path inside another skill's directory
- [x] `.agents/skills/` contains no prose that can drift from `.claude/skills/`
      (symlinks), or the fallback is documented with the reason
- [x] Claude Code lists and runs all six skills, two under new names
- [x] All six skill directory names satisfy `mt-<verb>-<object>`
- [ ] Codex discovers all six skills and `$mt-add-url` dispatches correctly — deferred: the user will verify on their next Codex run (symlinks were chosen over thin pointers at their direction)
- [x] One real end-to-end `mt-add-url` flow produces the expected markdown
- [x] The `npm ci` prerequisite appears in `AGENTS.md`, `README.md`, and
      `docs/newsletter/engine-commands.md`

## Risk assessment

**Renaming skills breaks the user's muscle memory and any saved invocation.**
`mt-add-post` and `mt-webfetch` are typed by hand today.
*Signal:* the user or a runtime invoking an old name after cutover.
*Response:* the renames are the user's request, so carry them out — but call out
in the final report that `$mt-add-post` and `/mt-webfetch` no longer resolve.
Do not leave alias directories; two names for one skill is the duplication this
phase exists to remove.

**Frontmatter `description` is routing logic, not documentation.** These strings
are how Claude Code and Codex decide whether to invoke a skill. An edit that
looks like tidying can stop a skill from triggering.
*Mitigation:* change only the skill names inside them; leave every trigger phrase
untouched.
*Signal:* step 12's end-to-end run failing to auto-dispatch.
*Response:* restore the original wording verbatim and change only the name token.

**Symlinked skills may break Codex discovery, or break on a Windows checkout.**
*Signal:* step 7.
*Response:* thin pointers, as today. This is a nice-to-have; the command-table
centralization is the part that actually reduces future edit cost.

**Moving `post-mechanics.md` out of `.claude/skills/` could put it outside what a
runtime packages with a skill.** Claude Code reads repo-relative paths fine, but
this changes the file's relationship to the skill.
*Signal:* a skill run that cannot read the referenced file.
*Response:* move it back under `.claude/skills/` in a shared, non-skill
subdirectory and have `.agents` reference it by repo-root-relative path instead.
