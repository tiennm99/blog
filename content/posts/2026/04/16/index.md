---
title: "Newsletter #96"
date: 2026-04-16
tags: ["AI-Assisted", "Go", "Garbage Collection", "AI Agent", "Software Engineering", "Clean Architecture", "Algorithms"]
categories: ["Newsletter"]
---

*Enjoy Newsletter #96.*

## [Clean Architecture → Separation of Concerns trong Go](https://vjerci.com/writings/clean/separation-of-concerns/)

This article explains the principle of Separation of Concerns in Go: once a responsibility is handled in one place in the system, other parts shouldn't have to worry about it or duplicate it. The author opens with an anti-pattern where a single handler function parses an HTTP request, validates the payload, and executes SQL queries directly. When everything is tangled together like that, changing any detail requires understanding the whole stack, and the codebase quickly becomes unmaintainable as complexity grows.

The fix is splitting the service into four layers: HTTP handlers only decode requests and encode responses, Services hold pure business logic decoupled from infrastructure, Repositories handle all database queries, and Models define data structures with zero dependencies on other layers. Go makes this natural through structural typing: a struct satisfies an interface implicitly without `implements` declarations. The author recommends giving each package a single, obvious responsibility and wiring components together via constructor dependency injection so the dependency graph is visible right in `main`. Helpful Go tips include using your IDE's "Find Implementations" shortcut and adding a compile-time interface check like `var _ MyInterface = (*MyStruct)(nil)`.

## [The Garbage Collector](https://internals-for-interns.com/posts/go-garbage-collector)

This deep dive explores Go 1.26's garbage collector, which introduces the GreenTea GC. Go's collector is a non-moving, concurrent, tri-color mark-and-sweep collector: because objects never move in memory over their lifetime, pointers stay valid and interoperating with `unsafe` or C code is much simpler. Each GC cycle runs through four phases: sweep termination, concurrent mark (running alongside application goroutines and capped at roughly 25% of CPU), mark termination, and lazy sweep driven by allocation demand—pausing the program (stop-the-world) only twice for very brief intervals.

GreenTea's key innovation is queuing entire memory spans (contiguous pages holding same-sized objects) rather than individual object pointers during marking, batching marked objects together before scanning to dramatically improve CPU cache locality. When a span has more than 12.5% of its objects marked, the collector uses AVX-512 SIMD instructions on x86-64 to scan it 4–8x faster. A hybrid Yuasa–Dijkstra write barrier shades both overwritten and newly written pointers during concurrent marking so live objects are never missed. If goroutines allocate faster than background workers can mark, *mark assist* forces allocating goroutines to do marking work themselves as backpressure. Finally, the GC Pacer schedules cycles using `GOGC` (default 100, triggering when the heap doubles) and `GOMEMLIMIT` (a soft memory cap for the Go runtime).

## [The Skill of Using AI Agents Well](https://www.lesswrong.com/posts/9xAwybDhtgzGYPnbs/the-skill-of-using-ai-agents-well)

This post shares practical habits for working effectively with AI coding agents, centered on one insight: the real bottleneck is human attention, not AI capability. Accordingly, the author designs his workflow to minimize personal friction: always use the strongest frontier model at its highest reasoning setting, turn on verbose debug logging so the agent can diagnose failures on its own, and give every AI session its own isolated branch via `git worktree` so multiple agents can run in parallel without stepping on each other's files. Tasks that parallelize naturally—like testing five hypotheses at once—get fanned out to subagents.

For permissions, he recommends whitelisting obviously safe commands, using a secondary AI classifier to auto-approve routine permission prompts, and enabling audio notifications when an agent blocks waiting for human input. Spinning up a fresh agent session purely to review a diff regularly catches bugs the authoring session missed, while a central dashboard across all active sessions makes it easy to see which agents need attention. He also delegates setup chores like spinning up test databases or driving browser UI checks entirely to agents, switches providers promptly whenever a model feels degraded, and is experimenting with cross-session memory systems—though he hasn't found a silver bullet there yet.

## [The unwritten laws of software engineering](https://newsletter.manager.dev/p/the-unwritten-laws-of-software-engineering)

This piece rounds up seven unwritten laws that software engineers usually learn only after painful production incidents. First, when production breaks right after a deployment, roll back first and investigate second—don't burn hours trying to prove your commit was innocent while users are down. Second, a backup doesn't exist until you have successfully restored from it; you also need to know your recovery point objective, who has permissions to run the restore, and how long a restore actually takes now that the database is ten times larger. Third, logging is an eternal balancing act: either too sparse to diagnose an outage, or a noisy flood missing a shared correlation/request ID across services.

Fourth, every data migration needs a tested rollback plan, because an untested rollback plan will almost certainly fail when you need it most. Fifth, every external dependency *will* eventually fail—know its rate limits, test how your app behaves when it goes down, and prepare caches, queues, or graceful degradation; chaining two independent 99.9% services in series drops combined availability to ~99.8%. Sixth, risky production operations require the "four-eyes principle": have a teammate watch, because simply explaining what you are about to do out loud often catches the mistake. Finally, nothing is more permanent than a temporary hack—so build a small, scoped, clean solution rather than a messy kludge.

## [Big tech engineers need big egos](https://www.seangoedecke.com/big-tech-needs-big-egos/)

Sean Goedecke pushes back against the cliché that there is no room for ego in software engineering, arguing that engineers at big tech companies actually need a healthy dose of ego to succeed. Day to day, senior engineers constantly confront their own mistakes and sprawl across codebases too vast for any one person to hold in their head—requiring stubborn self-belief that they can solve problems that look impossible at first glance. Organizationally, strong self-confidence lets an engineer stake out a clear technical position amid ambiguity, make unpopular calls that affect hundreds of peers, and push back when senior leadership misunderstands a technical constraint.

The paradox is that effective big-tech engineers must also be able to set their ego aside entirely before the org chart: accepting canceled projects, losing internal political battles, or executing murky top-down priorities without becoming bitter. Goedecke calls this the "chameleon" posture—assertive with peers, yet adaptable toward hierarchy. Burnout, he argues, rarely comes from working too hard; it comes from unrewarded effort, especially when a technically sound decision gets punished because it clashed with organizational politics. Mastering that delicate balance is a big reason truly effective staff-plus engineers are so rare.

## [Sorting algorithms](https://simonwillison.net/2026/Mar/11/sorting-algorithms/)

Simon Willison shares how he used Claude Artifacts to build an animated side-by-side visualization of classic sorting algorithms—starting with bubble sort, selection sort, insertion sort, merge sort, quicksort, and heapsort. When asked to add Timsort, Claude autonomously cloned the CPython repository from GitHub and read `Objects/listobject.c` and `Objects/listsort.txt` to implement it. However, when Willison asked GPT-5.4 Thinking to audit the result, it pointed out that Claude had actually written a simplified adaptive mergesort inspired by Timsort rather than the full algorithm—a great illustration of using one frontier model to cross-check another.

After a few rounds of UI polish, the artifact gained a "Run all" button that races all seven algorithms simultaneously in a grid, complete with live comparison and swap counters and color-coded operations: pink for comparisons, orange for swaps, red for pivots, and purple for sorted runs. In the live race, Timsort finishes first, followed closely by quicksort and merge sort, with bubble sort trailing far behind. The post showcases how quickly modern AI tools can turn a conversational prompt into a rich, interactive learning tool.

### Bonus

**Images:**
![12 Claude Code Features Every Engineer Should Know](https://substackcdn.com/image/fetch/w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F438c4c2f-0fa8-4748-9953-b63fd69674f4_2508x3000.png)
![How does REST API work?](https://substackcdn.com/image/fetch/w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F75e97a13-b186-4f16-ab59-f9a96867f744_1899x1536.jpeg)
![7 Key Load Balancer Use Cases](https://substackcdn.com/image/fetch/w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0169578f-af50-4b3a-b8ed-542ee7ebf80f_2250x2814.png)

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
