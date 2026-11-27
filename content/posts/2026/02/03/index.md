---
title: "Newsletter #80"
date: 2026-02-03
tags: ["AI-Assisted", "Newsletter", "AI Agents", "Go", "Databases", "Developer Tools", "IntelliJ IDEA"]
categories: ["Newsletter"]
---

*Enjoy Newsletter #80.*

## [The Agent Skills Directory](https://www.skills.sh/)

Skills.sh is an open directory of reusable skills for AI coding agents. Each skill packages procedural knowledge for a specific domain—such as UI design workflows, React and Next.js best practices, code review checklists, or debugging playbooks—and can be installed into an agent with a single command (`npx skills add ...`). Instead of figuring out workflows from scratch on every session, agents gain instant access to standardized, battle-tested instructions.

The site features a leaderboard ranked by total installs alongside 24-hour trending and rising categories, making it easy to discover skills for your stack. It is a community-driven ecosystem where anyone can publish and share skills alongside official skill packs from companies like Vercel, Anthropic, Expo, and Supabase. For developers getting started with coding agents, it offers a convenient way to equip agents with capabilities spanning coding, testing, deployment, and operations.

## [Results from the 2025 Go Developer Survey](https://go.dev/blog/survey2025)

The Go team published the results of the 2025 Go Developer Survey, gathering responses from 5,379 developers. Three headline findings stood out: Go developers want more guidance on identifying and applying Go best practices, getting the most out of the standard library, and seeing more modern features in the language and toolchain; most respondents already use AI-powered coding tools to look up information or generate boilerplate, but overall satisfaction with AI tools remains lukewarm; and a surprising share of developers regularly have to look up documentation for everyday commands like `go build`, `go run`, and `go mod`, highlighting room for improvement in the `go` CLI's built-in help system.

Overall sentiment remains strong: 91% of respondents are satisfied working with Go, with nearly two-thirds "very satisfied"—a figure that has held steady since 2019. The top three pain points are writing idiomatic Go code, missing features familiar from other languages, and finding trustworthy third-party modules. On AI tooling, 53% use AI assistants daily, yet only 13% report being "very satisfied," primarily because generated code frequently fails to compile or is low quality. CLI tools and API/RPC services remain the most common workloads, with 55% of respondents building both; over a third build cloud infrastructure tooling, and 11% work on ML models, tools, or agents. On development environments, 60% develop on macOS and 58% on Linux, while 96% deploy to Linux targets.

## [An Honest Review of Go](https://benraz.dev/blog/golang_review.html)

Coming from a Rust background, the author shares his candid impressions after a few months of building small projects in Go. Go's standout strength is concurrency: goroutines and channels are baked right into the language, are effortless to use, and avoid the "colored functions" problem (`async`/`await` contagion) that plagues many other concurrency models. The type system is intentionally minimal with no complex inheritance hierarchies; struct embedding is essentially syntactic sugar. Because types implement interfaces implicitly without an explicit declaration, functions like `Printf` and template libraries are easy to write without needing macros. He also appreciates Go's clean syntax and its capitalization-based visibility rules.

On the flip side, Go has notable rough edges. The language lacks true enums: the idiomatic workaround using `const` and `iota` doesn't enforce a closed set of values, and `switch` statements don't check for exhaustiveness. Go also lacks true immutability, since `const` only supports compile-time primitives and any exported package-level `var` can be mutated by callers. Finally, the `error` type is just a bare interface with an `Error() string` method, making it easy to obscure structured failure details; even with `errors.Is` and `errors.As`, he finds Go's error handling far less expressive than Rust's enums and sum types.

## [The challenges of soft delete](https://atlas9.dev/blog/soft-delete.html)

Soft delete—adding an `archived_at` or `deleted` column to a database table—looks deceptively simple at first, but introduces compounding complexity over time. Dead data accumulates indefinitely even though 99% of archived rows are never read again; every query, view, and unique index must remember to filter out soft-deleted rows; schema migrations have to account for stale historical records; and restoring a deleted record is rarely as simple as setting `archived_at = null` when external systems and side effects are involved.

The author evaluates three PostgreSQL alternatives that separate archived data from live operational tables. First is application-level archiving: emitting a deletion event for a separate service to persist, which keeps the primary database lean but risks data loss on failure and requires extra infrastructure. Second is a `BEFORE DELETE` database trigger that copies the deleted row into a JSONB archive table, keeping live tables clean and making retention cleanup trivial. Third is Change Data Capture (CDC) from the write-ahead log (WAL) using tools like Debezium, which requires zero application code changes but adds operational complexity and can fill up the primary server's disk if the consumer falls behind. He also floats an untested idea of a replication follower configured to ignore `DELETE` statements. Starting a new project today, he would pick the trigger approach because it is easy to set up, requires no extra infrastructure, and keeps archived rows queryable whenever needed.

## [I got paid minimum wage to solve an impossible problem.](https://tiespetersen.substack.com/p/i-got-paid-minimum-wage-to-solve)

Computer science student Ties Petersen had a minimum-wage part-time job sweeping the floors of an Albert Heijn supermarket. Instead of just pushing a broom, he modeled the store floorplan as a grid graph, built a visual editor in Processing, and wrote a C++ route optimizer using simulated annealing with 2-opt swaps—essentially solving a variant of the Traveling Salesperson Problem. His first "optimal" route was nearly as short as mathematically possible, yet completely useless in practice because it was full of sharp zig-zag turns nobody could physically push a broom through. The algorithm did exactly what was asked; the question itself was wrong. Once he added a "turn penalty" to the cost function, the route became smooth and walkable at the cost of a slightly longer distance—tuning that penalty was all about balancing theoretical efficiency against physical reality.

From there, he zooms out to the broader tech industry: social media algorithms optimize for engagement rather than human well-being, recommendation engines optimize for watch time until users spend six hours down conspiracy rabbit holes, large language models optimize for sounding confident rather than being truthful, and corporations optimize for quarterly profit while ignoring environmental and ethical externalities. His core takeaway: technical precision is meaningless if you're solving the wrong problem, so defining what you are actually optimizing for is the most important step of all.

## [Command completion (..) in IntelliJ IDEA](https://foojay.io/today/command-completion-intellij-idea/)

Command completion (`..`) is a new feature in IntelliJ IDEA that extends familiar code completion so you can discover and execute IDE actions right inside the editor without memorizing keyboard shortcuts. Typing a single dot `.` surfaces context-aware IDE commands alongside standard API suggestions and postfix completions, while typing two dots `..` filters the popup exclusively to IDE commands and lets you search through them. You can use it to fix errors and warnings with richer previews than `Alt+Enter`, run file-level actions like reformatting code or optimizing imports on any blank line, generate classes, methods, fields, or `toString()`, and convert a class into a modern Java `record`.

It also supports navigation, renaming via `..rename`, extracting methods, introducing local variables, and adding Javadoc comments—and you can enable it in read-only files via settings to jump to implementations or find usages. Many commands include natural aliases, such as `..change name` for `..rename`, so you don't need to remember exact action names. Command completion complements rather than replaces keyboard shortcuts, postfix completion, and live templates, helping you stay in flow, focus on *what* you want to do rather than *how* to trigger it, and discover powerful IDE features along the way.

### Bonus

**Images:**
![The Must-Know Fundamentals of Distributed Systems](https://substack-post-media.s3.amazonaws.com/public/images/8d53556e-5fbc-4ceb-ac64-cc5f3b211c5d_2250x2624.png)
![What Happens When You Enter Google.com](https://substackcdn.com/image/fetch/$s_!yb_V!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F16cec58a-02f8-4daf-8669-d1208ac5fc18_2360x2960.jpeg)
![Understanding the Linux Directory Structure](https://substackcdn.com/image/fetch/$s_!LIIv!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F631f49cf-2eff-4941-ba22-b2c482eb24ec_2360x2960.png)
![Symmetric vs. Asymmetric Encryption](https://substackcdn.com/image/fetch/$s_!gxq4!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F11498f7e-5457-425f-9d50-90f5ebc31187_2360x2960.jpeg)
![Network Troubleshooting Test Flow](https://substackcdn.com/image/fetch/$s_!XFaF!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5140ecd2-ac9e-46d1-bde6-00f727309778_800x1003.jpeg)


**Videos:**
[What Are AI Agents & How Do They Work?](https://www.youtube.com/watch?v=oP6DS_x5K0Y)

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
