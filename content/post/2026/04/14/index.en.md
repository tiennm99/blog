---
title: "Newsletter #95"
date: 2026-04-14
tags: ["AI-Assisted", "Newsletter", "Claude Code", "System Design", "Performance", "AI", "Go"]
categories: ["Newsletter"]
---

*Enjoy Newsletter #95.*

## [12 Claude Code Features Every Engineer Should Know: Subagents, CLAUDE.md, Checkpoints, MCP, and more](https://www.youtube.com/watch?v=E4fzxVMOav4)

This ByteByteAI video walks through 12 features every engineer should know when working with Claude Code, Anthropic's terminal-native coding agent. At the top of the list are Subagents, which break a complex task into smaller pieces handled in parallel by isolated worker agents—speeding up execution while keeping the main session's context window clean. Meanwhile, `CLAUDE.md` serves as the project's onboarding manual, recording architecture, coding conventions, and team-specific rules so Claude has the right context from the very first prompt.

Checkpoints snapshot workspace state as you go, letting you rewind cleanly whenever the AI heads down the wrong path instead of untangling changes by hand. MCP (Model Context Protocol) integration extends Claude Code by connecting it directly to external services like databases, APIs, and developer tools. The walkthrough is a solid overview both for newcomers and for regular Claude Code users looking to get more mileage out of the tool.

## [Quantization from the ground up](https://ngrok.com/blog/quantization)

Sam Rose (ngrok) explains model quantization from first principles—showing how large language models can be compressed to roughly a quarter of their size and run twice as fast while losing only about 5–10% accuracy. He starts with why LLMs are so huge in the first place: an 80-billion-parameter model like `Qwen3-Coder-Next` takes around 159 GB of memory because each parameter is stored as a multi-byte floating-point number. Fortunately, parameter weights cluster tightly around zero, meaning we can represent them with far fewer bits without losing much information.

The post compares two quantization schemes: *symmetric* quantization is simple but wastes dynamic range when weights are skewed, whereas *asymmetric* quantization adds a zero-point offset and cuts average quantization error from roughly 18% down to 8.5%. In practice, weights are quantized in blocks of 32–256 values so a single outlier only skews its local block rather than distorting the entire model. Measuring post-quantization quality via perplexity, KL divergence, and the GPQA Diamond benchmark shows that 8-bit quantization is nearly lossless, 4-bit loses roughly 5–10%, and 2-bit degrades sharply. In return, inference speed on an M1 Max jumps from 19.45 to 43.32 tokens/sec at 4-bit.

## [JPEG compression](https://www.sophielwang.com/blog/jpeg)

With rich interactive visualizations, Sophie Wang explains how JPEG compression exploits two things: quirks of the human visual system and the natural smoothness of real-world photographs. Because human eyes are far more sensitive to brightness (luminance) than to color detail (chrominance), JPEG first converts an image from RGB to YCbCr to separate the two. It then performs *chroma subsampling*—sharing color values across neighboring pixels—producing an image that looks nearly indistinguishable from the original.

Next, each 8×8 block of pixels undergoes a Discrete Cosine Transform (DCT), expressing the block as a weighted sum of cosine waves. DCT alone doesn't shrink the data, but it concentrates most of the visual signal into a handful of low-frequency coefficients while leaving high-frequency coefficients near zero. The quantization step divides each coefficient by a quantization table entry and rounds to the nearest integer, turning most high-frequency coefficients—fine details the eye barely notices—into zeros. Finally, the coefficients are scanned in a zigzag order to group long runs of zeros together and entropy-coded into a compact file; decompression simply runs the pipeline in reverse.

## [What 81,000 people want from AI](https://www.anthropic.com/features/81k-interviews)

Anthropic published the largest multilingual qualitative study of AI users to date: using a custom Claude interviewer, they conducted open-ended conversations with 80,508 opt-in Claude users across 159 countries and 70 languages about their hopes and fears for AI. The overarching message is that people want AI to help them live better lives, not just work faster. Top aspirations include professional excellence (19%), personal growth and transformation (14%), life management (14%), and reclaiming free time (11%). Beneath surface-level productivity requests usually sits a deeper human goal—automating email is really about having more time with family.

Fully 81% of participants said AI had already helped them move closer to their goals, mainly through productivity gains (32%), acting as a thought partner (17%), and learning (10%). At the same time, respondents voiced an average of 2.3 concerns each: unreliability and hallucinations (27%), job displacement (22%), loss of human agency (22%), cognitive atrophy (16%), and lack of governance (15%). Benefits and anxieties often go hand in hand within the same person: users who value AI for emotional support are three times more likely to worry about unhealthy dependence. Users in lower-income regions expressed more optimism and viewed AI as an economic equalizer, while users in wealthier regions focused more on managing complex, busy lives.

## ~~[Scaling a Monolith to 1M LOC: 113 Pragmatic Lessons from Tech Lead to CTO](https://www.semicolonandsons.com/articles/scaling-a-monolith-to-1m-loc-113-pragmatic-lessons-from-tech-lead-to-cto)~~

This post distills 113 pragmatic lessons from scaling a monolith to one million lines of code, drawn from the author's journey from Tech Lead to CTO. The central thread is that sound architectural choices matter far more than micro-optimizations: rather than slapping a cache over a slow endpoint, fix the underlying database query or missing index, because a single long-running query can halve the throughput of the entire system. Monitoring and observability should be treated as first-class features, with alerts for latency regressions, N+1 queries, and cache eviction rates, backed by an "inbox zero" discipline for error tracking where every alert is either fixed or silenced.

Keeping deployments fast (under two minutes)—by decoupling frontend and backend builds, parallelizing CI steps, and picking fast tooling—dramatically lowers risk because bugs are caught and rolled back quickly. On security, the author recommends starting from concrete threat models like account takeover, spam, or DDoS rather than generic checklists. Finally, the human side matters just as much as the code: avoid blame culture, set clear expectations, and cultivate psychological safety across the team.

## [Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps)

Anthropic's engineering team tackles two failure modes that plague AI agents on long-running tasks: models lose coherence as the context window fills up, and they consistently grade their own work too generously. Their solution is a GAN-inspired multi-agent harness: a *Planner* expands a short user prompt into a detailed product spec, a *Generator* builds the application, and a separate *Evaluator* grades the running app against explicit criteria and sends critique back. For subjective work like frontend design, the team replaced vague "does this look good?" prompts with concrete rubrics and let the Generator and Evaluator iterate for 5–15 rounds, sometimes pivoting to a completely new aesthetic direction mid-run.

In their experiments, starting a fresh session with a structured handoff document worked better than in-place context compaction—especially when models suffered from "context anxiety," prematurely wrapping up work because they sensed the context window running out. On a benchmark building a game-maker tool with Opus 4.5, a single solo agent spent $9 and 20 minutes to produce a broken app, whereas the full multi-agent harness spent $200 and 6 hours to deliver a genuinely playable, feature-complete application. Another key lesson: re-evaluate your harness every time the underlying model upgrades, because scaffolding that used to be essential can become dead weight.

## [Why I Vibe in Go, Not Rust or Python](https://lifelog.my/episode/why-i-vibe-in-go-not-rust-or-python)

The author explains why Go is his language of choice over Rust or Python when coding with AI ("vibe coding"). Between AI-generated code and production, he argues, you need multiple independent filters—and Go gives you five: the compiler, a static type system, explicit error handling, enforced simplicity, and finally human judgment. Python lacks compile-time verification—type hints are optional—so when an AI generates thousands of lines a day, structural bugs hide until runtime, often in production.

Rust sits at the other extreme: it gives ironclad correctness guarantees, but the borrow checker and lifetime annotations force the human reviewer to spend mental energy solving language-level puzzles rather than focusing on architecture and domain logic. Go hits the sweet spot between compile-time safety and cognitive simplicity; its backward-compatibility promise means code written in 2024 still compiles cleanly in 2026, and deployment is a single static binary rather than a fragile Python container image.

## [The gold standard of optimization: A look under the hood of RollerCoaster Tycoon](https://larstofus.com/2026/03/22/the-gold-standard-of-optimization-a-look-under-the-hood-of-rollercoaster-tycoon/)

Chris Sawyer wrote *RollerCoaster Tycoon* almost entirely in x86 assembly—giving him tighter control over performance than C or C++ compilers of the late 1990s could match—and the game remains a gold standard of software optimization. This deep dive examines the tricks that let it simulate a bustling theme park with thousands of guests on modest 1999 hardware. Instead of defaulting to 32-bit integers everywhere, every struct field was sized to the exact byte width of its maximum expected value—even using different integer widths for different in-game currency totals to pack structs tightly in memory.

The codebase replaces multiplication and division by powers of two with fast bitshifts, and remarkably, the game's simulation formulas themselves were designed around constants that were powers of two—a level of harmony between game design and low-level systems programming rarely seen today. Algorithmically, park guests don't run expensive A* pathfinding across the whole park; they wander semi-randomly with local heuristics until they stumble onto a ride. The engine also skips guest-to-guest collision detection entirely: thousands of visitors can occupy the same tile, with overcrowding simply penalized in their happiness calculation.

## [Queueing Requests Queues Your Capacity Problems, Too](https://pushtoprod.substack.com/p/queueing-requests-queues-your-capacity-problems-too)

This post points out that putting a queue in front of an overloaded service often hides a capacity problem rather than solving it. If a system capable of processing 1,000 requests per second receives 2,000 requests per second, after one hour the queue holds 3.6 million backlogged requests—meaning users wait roughly 60 minutes for a response even though server-side processing time per request is still a brisk 1 second. The trap is that user-perceived latency equals queue wait time plus processing time, whereas server latency metrics only measure processing time—so your dashboards stay green while customers experience a total outage.

Queue math is unforgiving: exceeding capacity by just 10% for an hour builds a backlog of 360,000 requests and adds 6 minutes of latency, because the capacity deficit accumulates linearly over time. Swapping queueing disciplines (FIFO, LIFO, priority, weighted fair queueing) only redistributes wait time across requests in a zero-sum game. The only real fix is adding capacity (or shedding load): provisioning 50% extra capacity drains a one-hour crisis backlog in about an hour, whereas 10% extra headroom takes nine hours to recover.

## [7 More Common Mistakes in Architecture Diagrams](https://www.ilograph.com/blog/posts/more-common-diagram-mistakes/)

Ilograph walks through seven common mistakes that make system architecture diagrams hard to read. First is unlabeled resources—every box should include both its technology type and a descriptive role name, never just a vendor icon. Second is "island" components floating with no connections, which defeats the purpose of showing relationships. Third is the giant "everything diagram"; it is much clearer to split complex systems into multiple focused views where each diagram tells one coherent story.

Mistake four is "conveyor-belt syndrome"—drawing request flows as a simplistic left-to-right pipeline that hides back-and-forth request/response interactions, which are much better shown with a sequence diagram. Fifth is gratuitous animation that distracts without adding meaning, and sixth is the "fan trap," where routing everything through a central hub obscures which upstream nodes actually talk to which downstream nodes. Finally, the author cautions against AI-generated architecture diagrams, which today remain vague, prone to hallucinating connections, and bad at deciding which details to include or omit.

## [How to Do AI-Assisted Engineering](https://newsletter.eng-leadership.com/p/how-to-do-ai-assisted-engineering)

This article synthesizes advice from 15 experienced engineers and engineering leaders on how to practice AI-assisted software engineering effectively. The strongest consensus is *design first, code second*: when AI handles implementation, the bottleneck shifts upstream to system design, which is where engineers should invest their time. Rather than typing ad-hoc prompts from scratch each time, effective practitioners build structured, repeatable workflows using templates, custom commands, and `CLAUDE.md` files that codify project standards and architectural constraints.

Equally important is separation of concerns in the agent loop: decouple code generation from verification, use specialized review agents to audit diffs for security, performance, and correctness from independent angles, and keep humans firmly in the loop for high-stakes decisions like merging and deploying. An AI's first output should be treated as a rough draft, not a finished product—requiring multiple passes of multi-angle review before it ships.

### Bonus

**Images:**
![Load Balancer vs API Gateway](https://substackcdn.com/image/fetch/$s_!YJG0!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd3e5a12b-4237-4661-b090-d518a6da7f20_2508x3000.png)
![REST vs gRPC](https://substackcdn.com/image/fetch/$s_!LrVm!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7a20a0cb-3142-4c32-b772-f002f1a288fd_2880x3862.jpeg)
![Session-Based vs JWT-Based Authentication](https://substackcdn.com/image/fetch/$s_!6SID!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F14a25337-0104-4c6c-b91a-3a2cd6afd6e4_2508x3000.png)
![A Cheat Sheet on The Most-Used Linux Commands](https://substackcdn.com/image/fetch/$s_!LuLK!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa8dd9e12-2979-4040-a138-08723094b8cf_2536x3436.jpeg)

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
