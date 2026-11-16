---
title: "Newsletter #59"
date: 2025-10-03
tags: ["AI-Assisted", "Compression", "Branchless Programming", "Performance", "AI Coding", "Future of Programming", "Engineering Taste"]
categories: ["Newsletter"]
---

*Enjoy Newsletter #59.*

## [Taking a Look at Compression Algorithms](https://cefboud.com/posts/compression/)

Moncef Abboud's article dives into four popular lossless compression algorithms—GZIP (DEFLATE), Snappy, LZ4, and ZSTD—framed around the three metrics every compression algorithm must balance: compression ratio, compression speed, and decompression speed. DEFLATE combines LZ77 sliding-window matching, which replaces repeated sequences with back-references, and Huffman coding, which assigns shorter codes to frequent symbols. Walking through Go's standard library implementation, the author shows how a chained hash table finds matching substrings and how the compression level essentially controls how deep down that chain the compressor searches: searching longer burns more CPU but yields a higher compression ratio.

Snappy and LZ4 both belong to the LZ family but prioritize speed: Snappy compresses at 250 MB/s and up, while LZ4 reaches roughly 780 MB/s for compression and nearly 5 GB/s for decompression at a similar ratio (~2.1x), thanks to a simple block format using a 4-bit token layout for literal and match lengths plus hardware-friendly XOR comparisons. ZSTD achieves the best of both worlds: a ~2.9x compression ratio matching or beating DEFLATE alongside a ~510 MB/s compression speed approaching LZ4, by combining LZ-style matching with modern FSE entropy coding (based on ANS) and support for pre-trained dictionaries. No single algorithm wins everywhere: DEFLATE suits general archival, Snappy and LZ4 fit speed-critical systems, and ZSTD is the balanced all-rounder.

## [90%](https://lucumr.pocoo.org/2025/9/29/90-percent/)

Armin Ronacher shares that for an infrastructure component he started at his new company, over 90% of the code was written by AI. It is a Go service for sending and receiving emails, complete with an OpenAPI-compatible REST API and SDKs for Python and TypeScript, totaling around 40,000 lines of code. Even so, he treats every line as his own responsibility: he designed the system, database schema, and architecture himself, using AI only as a "rubber duck" sparring partner. AI allowed him to pursue choices that used to be too tedious to do by hand, such as writing raw SQL instead of using an ORM for easier debugging, or making the OpenAPI spec the single source of truth and generating both client and server code from it. He uses Claude Code for debugging and Codex for code review.

Ronacher is equally candid about the downsides: left unchecked, AI agents write terrible code, reinvent existing utilities, build abstractions at the wrong scale, fail to truly grasp Go concurrency with goroutines, pull in outdated dependencies, and swallow errors in ways that hurt observability. For example, an AI-written rate limiter "worked" but lacked jitter and had poor storage design—easy to fix if you understand the domain, dangerous if you don't. Conversely, AI shines at rapid research-and-prototyping loops, continuous refactoring, spinning up AWS infrastructure, or migrating a test suite to testcontainers in an hour. His conclusion: 90% AI-written code is already a reality, but it doesn't eliminate the need to be a strong engineer.

## [The Weird Concept of Branchless Programming](https://sanixdk.xyz/blogs/the-weird-concept-of-branchless-programming)

Branchless programming is the technique of rewriting conditional statements into arithmetic and bitwise operations, or using conditional move instructions like `cmov`, so the CPU doesn't have to guess which branch will be taken. Modern CPU branch predictors perform remarkably well when conditions follow a pattern, but with unpredictable data like user input or shuffled arrays, every misprediction forces a pipeline flush and costs roughly 15–20 cycles. Branchless code runs more consistently and often has more predictable execution time, which matters in cryptography to defend against side-channel attacks—though removing branches alone does not guarantee constant time, as memory access patterns, compiler optimizations, and machine instructions must still be verified.

The author illustrates this with three C examples of increasing complexity: computing an absolute value using a bitmask derived from a 31-bit arithmetic right shift, a `clamp` function that bounds a value between min and max without an `if`, and a quicksort `partition` function that increments the index directly using the comparison result. Benchmarks show that `abs` and `clamp` are barely any faster because the branch predictor already handles them well; only `partition`, with its unpredictable condition, sees a ~1.2x speedup. The takeaway: branchless programming is a "scalpel, not a sledgehammer"—use it for hot loops with unpredictable branches, timing-sensitive code, or SIMD vectorization, and stick to plain `if` statements when readability matters more than a few nanoseconds.

## [AI Coding Assistants: Building Apps for 30 Hours Straight](https://threadreaderapp.com/thread/1972793278744461627.html)

In an X thread, Carlos E. Perez (@IntuitMachine) analyzes the leaked system prompt of Claude Sonnet 4.5 to explain how the model can work autonomously for roughly 30 hours straight to build a Slack-like application with over 10,000 lines of code. According to Perez, the secret lies in forcing any code snippet longer than about 20 lines into a persistent artifact—at most one artifact per response—paired with clear rules for when to make targeted updates versus when to rewrite the file from scratch. This lets the model evolve a large codebase across many turns without losing state. The prompt also enforces runtime constraints such as banning `localStorage` and restricting how libraries are imported so UI previews remain stable inside the sandbox.

Alongside this are patterns that sustain long-horizon autonomy: a research mode that plans, searches, and synthesizes answers; using tools to verify facts rather than guessing; separating thinking from acting to prevent premature coding; planning and feedback loops inspired by Voyager and Generative Agents; passing full conversation state on every call; and a "failure ritual" that clears stale context and retries with lessons learned. Favoring familiar stacks like React and Flask and keeping outputs in JSON for automated testing also prevent multi-hour sessions from collapsing under their own complexity.

## [Development Gets Better with Age](https://www.allthingsdistributed.com/2025/10/better-with-age.html)

After nearly 25 years at Amazon, Werner Vogels reflects on the advantages of older developers. They have already encountered most of the problems younger engineers are facing today, carry battle scars from war rooms, know what is practical and effective, and are trained to spot warning signs early. That frees up mental bandwidth for creativity, building mental models, and finding novel solutions—which he considers the best part of the craft. They have also watched industry patterns repeat over and over, including vendors that promise the moon and deliver products riddled with holes.

On generative AI, Vogels acknowledges that it is an exciting, powerful technology in the hands of experienced builders with healthy skepticism, but notes that the hype wave exploded because it arrived without an instruction manual. AWS responded by returning to its roots: democratizing access, giving customers model choice, and putting privacy and security first. When customers ask what they should do with generative AI, it is mostly driven by FOMO rather than a concrete problem. That is when seasoned developers know to hit pause, talk deeply with the customer to uncover the real challenge, and recognize that only sometimes is generative AI the right answer. As he puts it: new technology, same old patterns.

## [Programming Deflation](https://tidyfirst.substack.com/p/programming-deflation)

Kent Beck starts from the premise that AI-assisted programming is steadily driving down the cost, skill barrier, and time required to build software, and asks: will this lead to fewer programmers or more? Economics offers two opposing answers: the substitution effect says machines will replace people, while Jevons paradox predicts demand will surge when a resource becomes cheaper. If writing software tomorrow is even cheaper than today, organizations might delay investment, much like a deflationary spiral. Unlike economic deflation, however—which reflects weakness—"programming deflation" comes from real productivity gains: when the cost of experimentation approaches zero, people want to try ideas immediately; low-quality code floods the market while the gap to carefully crafted software widens; and value shifts from writing code to understanding what to build and how systems fit together.

Beck's advice is to use cheap tools for the obvious parts and save your energy for hard problems, focus on integration since typing code is no longer the bottleneck, cultivate "taste" to know what is worth building, and think in systems. In a world of abundant code, the scarce resources are understanding, judgment, and the wisdom to know what not to do. Those qualities remain valuable whether the future holds fewer programmers or more, so instead of trying to predict which scenario wins, build skills that thrive in both.

## [What is "good taste" in software engineering?](https://www.seangoedecke.com/taste/)

Sean Goedecke distinguishes "technical taste" from technical skill: you can be highly skilled with bad taste, or vice versa. In his view, taste is the ability to choose the right set of engineering values for the project at hand. For instance, he prefers `map` and `filter` over `for` loops because pure functions are easier to reason about and avoid off-by-one errors, whereas someone who prefers `for` loops has equally valid reasons like easier performance reasoning or simpler control-flow extensions. The difference isn't skill, but which values each engineer prioritizes. Most engineering decisions trade off competing values—resilience, speed, readability, correctness, flexibility, portability, scalability, and development velocity—and no engineer weights them all equally.

Bad taste means prioritizing values that don't fit the project, and it usually stems from rigidity: importing a solution that worked elsewhere without considering context, or justifying choices with "it's best practice." Such an engineer is like a broken compass—only right when standing in the right spot by chance. Good taste is harder to spot because it only reveals itself on real problems; the telltale sign is that projects you work on, or whose design you agree with, tend to succeed. To develop taste, the author recommends working on a wide variety of projects, paying attention to what turns out to be easy or painful, and staying flexible rather than forming rigid dogmas about the "one true way" to write software.

## Bonus: An interesting visual from [ByteByteGo](https://bytebytego.com/)

![Service Discovery 101: The Phonebook for Distributed Systems](https://substackcdn.com/image/fetch/$s_!CEQb!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F30caf720-4b66-4f5f-84d2-72c578969944_2250x2624.heic)

*My backlog of saved articles is now empty. It'll probably take a while to build up a new stash before I can continue. See you next time!*

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
