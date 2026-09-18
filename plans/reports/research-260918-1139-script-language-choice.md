# Research Report: Script Language Choice for This Repo

Conducted 2026-09-18 11:39 (+07). Scope: both script populations in `tiennm99/blog`
— agent-invoked scripts and GitHub Actions scripts. Fresh evaluation, no bias
toward the incumbent Go/JS split.

## Executive Summary

The repo has **two script populations with disjoint requirements**, and the
"GitHub SDK" criterion applies to only one of them. Treating it as one language
question is the actual mistake.

- `scripts/newsletter/` (Go, 1168 LOC, stdlib-only) **never calls the GitHub
  API** — verified by grep: zero hits for `api.github.com`. Its real constraints
  are zero-install, three different agent runtimes, and fast repeated invocation.
  Go already satisfies all three (`go run` warm = 0.09s). **Keep Go. No change.**
- `.github/scripts/` (JS, 426 LOC, stdlib `fetch`) is REST + GraphQL heavy and
  will keep growing. **Keep JavaScript, but adopt Octokit** instead of hand-rolled
  `fetch`. It is the only candidate that is simultaneously first-party, covers
  REST *and* GraphQL in one library, and runs on a preinstalled runner language.

Ruby is the emotionally appealing answer (GitHub-maintained `octokit.rb`, rank 5
in repo preferences, preinstalled on the runner) and it **loses on a hard fact**:
`octokit.rb` has no GraphQL support, and list 3 of the projects page needs the
GraphQL search API. Python's `githubkit` is the best-*designed* non-JS SDK and
also loses: self-declared unstable, third-party, avoided language.

## Methodology

- Sources: 4 (2 web searches, 2 doc fetches) + direct repo measurement
- Date range: GitHub changelog 2026-06-11 → 2026-09-17; docs current
- Search terms: official GitHub SDK languages Octokit 2026; ubuntu-latest
  preinstalled tools 2026; go-github vs githubkit vs octokit.js GraphQL
- Empirical: `go run` / `node` startup timing on this box; grep for API usage;
  a live `gh api graphql --paginate` attempt

## Repo Inventory (Scout)

| Population | Files | Lang | LOC | Deps | Runs where | GitHub API? |
|---|---|---|---|---|---|---|
| Newsletter engine | `scripts/newsletter/*.go` (10) | Go 1.26 | 1168 | none (no `go.sum`) | local, by Claude Code / OpenCode / Codex via `go run` | **no** |
| Projects list | `.github/scripts/update-projects-list.mjs` + `lib/` (3) | Node ESM | 426 | none (no `package.json`) | CI (`update-projects.yml`), daily cron | **yes** — REST + GraphQL search |

Both are currently dependency-free by deliberate choice. Workflows: `hugo.yml`
(build/deploy, sets up Go 1.25.5 + Node 24.12.0), `update-projects.yml`
(Node 24, runs the projects script). Agent skills are markdown-only
(`.claude/skills/`, `.agents/skills/`) and shell out to `go run`.

## Key Findings

### 1. Only four languages have a GitHub-maintained SDK

Per GitHub's own library page, official Octokit clients exist for exactly:
**JavaScript** (`octokit.js`), **Ruby** (`octokit.rb`), **.NET** (`octokit.net`),
**Terraform**. Everything else — Go, Python, Java, Rust, PHP, shell — is
explicitly "not maintained by GitHub". Go's `google/go-github` is a Google-staffed
community project, not a GitHub product.

### 2. GraphQL is the discriminator, not REST

Every candidate can do REST; the projects script needs the GraphQL **search** API
for merged-PR counts. Coverage:

| Language | REST | GraphQL | Same library? |
|---|---|---|---|
| JS `octokit` | yes | yes (`octokit.graphql`) | **yes** |
| Ruby `octokit.rb` | yes | **no** | — |
| Go `go-github` | yes | no — needs `shurcooL/githubv4` | **no, two libs** |
| Python `githubkit` | yes | yes | yes (but unstable) |
| Python `PyGithub` | yes | **no** | — |
| `gh api` CLI | yes | yes | yes (but see §4) |

### 3. Runner preinstall favors Node / Python / Ruby / gh — not Go

`ubuntu-latest` migrates to Ubuntu 26.04 between 2026-10-19 and 2026-11-19.
On that image: **Node.js 24.20.0 preinstalled**, Python 3.14.4 preinstalled,
Ruby 3.3.8 preinstalled, **GitHub CLI 2.100.0 preinstalled**, Java cached.
**Go is not preinstalled** — it is a cached tool (1.24.13 / 1.25.14 / 1.26.8),
so `actions/setup-go` is fast but still a required step. A Go rewrite of the
projects script would *add* a setup step; the JS version needs none.

### 4. `gh api` is not a serious option for this script

`gh` is first-party, zero-install, and auto-authenticated in CI — genuinely the
best tool for one-liners. It fails here on two counts:

- **Measured in-session:** `gh api graphql --paginate` over the merged-PR search
  query hung past a 120s timeout and produced no output. GraphQL pagination via
  `--paginate` requires `pageInfo` at an exact position and is fragile.
- Grouping 175 PRs by repo, ranking, tie-breaking on `pushedAt`, and emitting
  markdown tables in `jq` is strictly harder to maintain than the ~80 lines of JS
  that do it now.

### 5. `go run` latency is a non-issue for agent scripts

Warm build cache: **0.09s** for `go run ./scripts/newsletter <cmd>` (first run
after edits: 1.15s). `node -e` is 0.03s. The gap is irrelevant at agent-invocation
frequency, so there is no performance argument for moving the newsletter engine.

### 6. Go's real advantage here is the dep-free invariant

`scripts/newsletter` has **no `go.sum`** — stdlib only. That is why it works
identically under Claude Code, OpenCode, and Codex with zero setup on a headless
ARM64 box. Adding `go-github` would break that invariant for no gain, since the
engine does not call the GitHub API.

## Comparative Analysis — `.github/scripts/` only

| Option | Easy to run | GitHub SDK | Repo-policy fit | Verdict |
|---|---|---|---|---|
| **Node + Octokit** | Node preinstalled; one `npm ci` step (hugo.yml already has the conditional) | **first-party, REST+GraphQL, pagination/throttle/retry plugins** | JS + JSDoc + npm ✓ | **Recommended** |
| Node + stdlib `fetch` (status quo) | zero deps, zero setup | none — ~100 of the current 235 lines re-implement pagination/error handling | ✓ | Acceptable; violates DRY |
| `gh api` + jq | best possible: gh 2.100.0 preinstalled | first-party CLI | shell, fine | Rejected — §4 |
| `actions/github-script` | zero files, pre-authed Octokit | first-party | — | Good for <30 LOC; 426 LOC inline in YAML is not maintainable, no local run |
| Go + `go-github` + `githubv4` | needs setup-go + first `go.sum` in repo | two third-party libs, split REST/GraphQL | Go ranked #1 ✓ | Rejected — worse SDK story, adds CI step |
| Python + `githubkit` | Python preinstalled | REST+GraphQL, typed, octokit-inspired | **avoided language** | Rejected — unstable + policy |
| Ruby + `octokit.rb` | Ruby preinstalled | **GitHub-maintained but no GraphQL** | rank 5 ✓ | Rejected — GraphQL gap is fatal |

## Recommendations

1. **`scripts/newsletter/` stays Go.** No GitHub API, no deps, no latency problem,
   three agent runtimes served identically. Preserve the no-`go.sum` invariant.
2. **`.github/scripts/` stays JavaScript; migrate to `octokit`.** Add a root
   `package.json` (+ lockfile) with `octokit` as the single dependency, plus
   ESLint and JSDoc per repo policy. Expected outcome: `lib/github-api.mjs`
   drops from 235 LOC to roughly 80-100, and gains free retry, secondary
   rate-limit backoff, and correct GraphQL cursor pagination.
3. **Do not introduce a third language.** Two is already the cost ceiling for a
   blog repo. Python/Ruby/Java each lose on a hard constraint above.
4. **Draw the boundary by API surface, not by folder:** anything that calls the
   GitHub API → JS + Octokit. Anything that parses content, files, or arbitrary
   web pages → Go.

### Fix first (latent, found while scouting)

`go.mod` declares `go 1.26`, but `hugo.yml` pins `GO_VERSION: 1.25.5` and
`netlify.toml` sets `GO_VERSION = "1.25.5"`. Running any `go` command in those
environments only succeeds because `GOTOOLCHAIN=auto` silently downloads 1.26.
Dormant today (the newsletter engine is never invoked in CI), but it will bite
the first time a workflow calls it, and Netlify's sandbox may block the download.
Align the pins to 1.26.x.

## Resources

- [Libraries for the REST API — GitHub Docs](https://docs.github.com/en/rest/using-the-rest-api/libraries-for-the-rest-api)
- [octokit/octokit.js](https://github.com/octokit/octokit.js/) · [octokit/graphql.js](https://github.com/octokit/graphql.js/)
- [Ubuntu 26 generally available and latest migration](https://github.blog/changelog/2026-09-17-ubuntu-26-generally-available-and-latest-migration/)
- [Ubuntu 26.04 runner image manifest](https://github.com/actions/runner-images/blob/main/images/ubuntu/Ubuntu2604-Readme.md)
- [google/go-github](https://github.com/google/go-github) · [yanyongyu/githubkit](https://github.com/yanyongyu/githubkit)
- [GitHub-hosted runners reference](https://docs.github.com/en/actions/reference/runners/github-hosted-runners)

## Unresolved Questions

1. Accept a first dependency (`octokit`) in this repo, or keep the strict
   zero-dependency stance and the ~100 lines of hand-rolled HTTP plumbing?
2. Is `secrets.PAGES_FETCH_TOKEN` scoped with `read:org`? The new
   `/user/memberships/orgs` call needs it; untested in CI.
3. Any appetite for aligning `GO_VERSION` pins now, or defer until a workflow
   actually invokes the newsletter engine?
