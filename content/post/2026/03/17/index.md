---
title: "Newsletter #91"
date: 2026-03-17
tags: ["AI-Assisted", "Newsletter", "Go", "Performance", "Concurrency", "AI Coding", "Algorithms"]
categories: ["Newsletter"]
---

*Enjoy Newsletter #91.*

## [How Go Slices Work Under the Hood: What Makes Them Stand Out from Other Languages](https://dev.to/ganesh-kumar/how-go-slices-work-under-the-hood-what-makes-them-stand-out-from-other-languages-42o4)

Slices are one of the most heavily used data structures in Go. On the surface they look like simple dynamic arrays, but under the hood every slice is just a three-word header: a pointer to an underlying array, a length (`len`), and a capacity (`cap`). Slicing with `[start:end]` doesn't copy the elements—it simply creates a new slice header pointing into the same backing array, which makes slicing very cheap. The author walks through examples printing `len` and `cap` after each slice operation, and explains why a slice declared with `var s []int` starts out as `nil` with both `len` and `cap` equal to 0.

The highlight of the post is the growth algorithm inside `append`, traced directly from the Go runtime source (`runtime/slice.go`). When a slice runs out of capacity, Go allocates a larger backing array: if the current capacity is under 256 elements, it doubles; at 256 and above, the growth factor tapers smoothly from 2x down toward ~1.25x (prior to Go 1.18, that threshold was 1,024). When appending a batch of elements that exceeds double the old capacity, Go jumps straight to the required size and rounds up to the allocator's size class. Because reallocation and copying are expensive, the practical takeaway is to preallocate with `make([]T, len, cap)` whenever you know the expected size ahead of time.

## [Why Go Can't Try](https://niketpatel.com/essays/why-go-cant-try)

This essay explains why Go has never gained a `try` keyword like Zig or Rust, arguing that the real reason isn't simply the Go team's fondness for explicitness. Ironically, Zig is even more explicit than Go: a return type like `!Config` advertises that a function can fail, and the compiler tracks every possible error and enforces exhaustive handling. Go, by contrast, lets you write `data, _ := os.ReadFile(path)` without a peep from the compiler, so the explicitness of `if err != nil` is largely social convention. While the Go team often argues that `try` hides control flow across invisible exit points, the author contends that isn't the root of the problem.

The real blocker is Go's `error` type itself: because `error` is just an interface with a single `Error() string` method, the compiler has no idea which concrete errors a function can return; utilities like `errors.Is()`, `errors.As()`, and `fmt.Errorf("%w")` are purely runtime conventions. Zig's error sets are the exact opposite: finite, compiler-tracked, and represented as zero-overhead 16-bit integers—which means they can't carry arbitrary runtime context, a trade-off Zig offsets with compiler-generated error return traces. Adding `try` to Go without changing the `error` type would be pure syntactic sugar with no exhaustiveness checking, while changing `error` would break the entire standard library and every existing Go program. So `if err != nil` is here to stay.

## [The Scheduler — Understanding the Go Runtime](https://internals-for-interns.com/posts/go-runtime-scheduler)

This deep dive explains the Go runtime scheduler—the component that answers "which goroutine runs next?" and multiplexes millions of goroutines onto a handful of OS threads. At its core is the GMP model: G is a goroutine, starting with a tiny 2KB stack (compared to 1–8MB for an OS thread); M is an OS thread that actually executes instructions; and P is a logical processor context holding a local run queue of up to 256 goroutines, with the number of Ps equal to `GOMAXPROCS`. Decoupling P from M means that when an OS thread blocks in a syscall, its P can be handed off to another thread so queued goroutines keep running. Notably, there is no dedicated central scheduler thread: goroutines park themselves, enqueue themselves onto channel wait queues, and clean themselves up on exit for reuse.

The `findRunnable()` function searches for work in a specific order: garbage-collector work, then once every 61 ticks a check of the global run queue to prevent starvation, followed by the local run queue, the global run queue again, the network poller, and finally work stealing—taking half the goroutines from another P's local queue. Threads that run out of work spin briefly looking for new work before parking, with the number of spinning threads capped. The article also covers preemption—both cooperative via function-prologue stack checks and asynchronous via `SIGURG` signals. Because a goroutine's saved state is tiny, switching goroutines takes just 50–100 nanoseconds, 10–40x faster than an OS thread context switch.

## [Go String Concatenation Performance Benchmark](https://www.winterjung.dev/en/string-concat-performance-benchmark-in-go/)

The author benchmarks the speed and memory footprint of Go string concatenation techniques, comparing `+`, `+=`, `fmt.Sprintf()`, `fmt.Sprint()`, `strings.Join()`, `bytes.Buffer`, and `strings.Builder` (both with and without preallocating via `Grow()`). The benchmarks cover two common scenarios: concatenating a fixed, known number of strings—such as building a cache key from a few fields—and concatenating a variable number of strings in a loop, such as assembling dynamic query conditions. All benchmark code and raw results are published so readers can reproduce them.

The findings are clear: `strings.Builder` with `Grow()` and `strings.Join()` are the fastest and most memory-efficient options across almost every scenario. When concatenating a small, fixed number of strings, the plain `+` operator is completely fine, while `fmt.Sprintf()` is significantly slower. In the 256-string loop benchmark, the top two methods take just 2.6–2.8 microseconds with a single allocation, whereas using `+=` in a loop takes over 37 microseconds, allocates ~185KB of memory, and performs 255 allocations because every iteration creates a brand-new immutable string. The rule of thumb: for loops, reach for `strings.Builder` or `strings.Join()`.

## [Message Passing Is Shared Mutable State](https://causality.blog/essays/message-passing-is-shared-mutable-state/)

This essay argues that message passing does not eliminate shared mutable state—it merely relocates it. Back in 2006, Edward Lee predicted that "shared memory vs. message passing" was a false dichotomy, because swapping locks for messages only changes the shape of concurrency bugs. Go, with its motto "share memory by communicating," became the largest real-world test of that thesis: a 2019 study of 171 concurrency bugs across Docker, Kubernetes, etcd, gRPC, and CockroachDB found that roughly 58% of blocking bugs (goroutines hanging forever) were caused by message passing. Worse, Go's built-in deadlock detector caught only 2 of the 21 blocking bugs tested.

Under the hood, the author points out, a Go channel is literally a shared concurrent queue protected by a mutex, without separate send and receive capability endpoints—so every classic shared-state hazard has a channel equivalent: deadlocks, goroutine leaks, race conditions when multiple goroutines read from the same channel, and protocol violations like sending on a closed channel. A representative Kubernetes bug left a child goroutine blocked forever because nobody read from an unbuffered channel after a timeout; the fix was changing the buffer size to one. Even Erlang, with its strictly isolated processes, was found in academic studies to suffer from race conditions around ETS tables—shared mutable memory bolted back on for performance.

## [Things I've Done with AI](https://sjer.red/blog/2026/built-with-ai/)

With roughly seven years of professional experience plus seven years of self-taught programming before that, the author traces his journey from AI skeptic to heavy adopter. Having previously ignored GitHub Copilot and dismissed Cursor as hype, he used to care deeply about clean architecture, expressive type systems, and long-term maintainability. The turning point came when he asked *why* we care about those things: on the job, what matters is delivering business value, and code doesn't need to be "clean" in the traditional human sense if it has thorough automated tests that allow AI agents to maintain it safely. Since October 2025, he stopped writing code by hand and now only writes prompts and reviews output.

Over nine months using Cursor and Claude Code, he shipped more than a dozen personal projects: consolidating everything into a single monorepo, migrating CI to Buildkite and Bazel, building Clauderon—an orchestrator for multiple coding agents—along with Discord bots and mobile apps. At work, AI drafts design docs, builds diagnostic tools, and automates operational chores; small product-manager requests are now nearly free, leaving code review and manual QA as the main work. Still, he admits the review-heavy workflow is mentally tiring, and argues that testing and documentation have become the new bottlenecks where the industry needs better tooling.

## [Pushing and Pulling: Three Reactivity Algorithms](https://jonathan-frere.com/posts/reactivity-algorithms/)

This article compares three algorithms for building reactive systems—systems that automatically recompute derived values when inputs change, easiest to picture as a spreadsheet where editing one cell updates every formula that depends on it. The author evaluates them against four criteria: efficiency (computing each node at most once per update), granularity (updating only nodes that are actually affected), glitch-freedom (never exposing inconsistent intermediate states), and support for dynamic dependencies. Pure *push* reactivity lets each node notify its dependents directly, giving fine granularity, but nodes in diamond dependencies can be recomputed multiple times and expose glitches unless the entire graph is topologically sorted. Pure *pull* reactivity works like nested function calls: it is naturally glitch-free and supports dynamic dependencies for free, but has no idea which inputs changed without either recomputing everything or maintaining hard-to-invalidate caches.

A hybrid *push–pull* algorithm gets the best of both worlds: the push phase simply walks downstream to mark affected nodes as "dirty" and records which output nodes need updating, regardless of traversal order; the pull phase then lazily recomputes only the dirty nodes from the outputs backward and marks them clean. Each node is visited at most once per phase, running in O(n) time where n is the number of affected nodes, and satisfying all four criteria. The main caveat is that the entire pull phase must finish synchronously between two input mutations, so long-running async work has to be handled outside the core graph.

### Bonus

**Images:**
![Git Workflow: Essential Commands](https://substackcdn.com/image/fetch/$s_!Fevp!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Feb1ae3fa-80a7-464d-97a2-869170caaa2f_2360x2960.png)
![How can Cache Systems go wrong?](https://substackcdn.com/image/fetch/$s_!huHJ!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9262eb79-a1cc-4308-8f72-01fdf91e429d_1388x1782.jpeg)
![Top Cyber Attacks Explained](https://substackcdn.com/image/fetch/$s_!7p1w!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd5ebb98a-9f98-4c32-9268-2d14086569d8_2360x2960.png)

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
