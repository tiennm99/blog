---
title: "Newsletter #92"
date: 2026-03-20
tags: ["AI-Assisted", "Newsletter", "AI Infrastructure", "Machine Learning", "Redis", "Compression", "AI Agents"]
categories: ["Newsletter"]
---

*Enjoy Newsletter #92.*

## ~~[How I became good at leading incidents](https://tomasztomczyk.com/blog/2026/how-i-became-good-at-leading-incidents/)~~

~~Tomasz Tomczyk shares lessons from leading more than 100 incidents over his career, emphasizing that incident management is not just a technical skill, but a blend of analytical thinking and leadership under pressure. He views every incident as an opportunity to deepen system understanding and build a culture that learns from failure.~~

~~To handle incidents effectively, you need a solid grasp of your deployment pipeline and the entire tech stack from DNS up to the application layer, backed by comprehensive observability. When an incident hits, delegate investigation along clear tracks, make decisive calls when features need to be disabled, and communicate timely updates to stakeholders. Documenting recurring failure patterns in runbooks and practicing through chaos-engineering game days also prepares teams much better for real-world outages.~~

~~**Key takeaways:**~~
~~- Master the deployment pipeline and full tech stack to pinpoint root causes quickly~~
~~- Read stack traces fluently and use error-tracking tools like Sentry for deeper investigation~~
~~- Build a culture of psychological safety so failures become learning opportunities~~
~~- Delegate investigation strategically and make decisive calls under pressure~~
~~- Maintain runbooks and run game days to prepare for real incidents~~

## [Decision Trees](https://mlu-explain.github.io/decision-tree/)

Part of the interactive MLU-Explain series by Jared Wilber and Lucía Santamaría, this visual essay introduces decision trees from the ground up. It opens with an intuitive example: a farmer trying to tell apple, cherry, and oak trees apart using only trunk diameter and height. At each step, the algorithm searches for the best split—for instance, nearly every tree with a diameter of 0.45 or greater is an oak, making that condition the root node; the remaining data is recursively partitioned by height or diameter until each region contains mostly a single tree species. The result is a nested set of rules that any new data point can walk down to be classified.

To pick each split, the ID3 algorithm favors the threshold that yields the highest *information gain*—that is, the largest reduction in data entropy. Splitting too deeply, however, causes the tree to memorize noise in the training set rather than generalizable patterns, a classic illustration of the bias–variance trade-off leading to overfitting. Decision trees are easy to interpret, fast to train, require minimal preprocessing, and handle outliers well, but they are notoriously unstable: a tiny change in training data can produce a completely different tree structure. Pruning techniques—such as capping maximum depth or requiring a minimum number of samples per leaf—help keep overfitting in check.

## ~~[Containers Are Not a Security Boundary](https://www.lucavall.in/blog/containers-are-not-a-security-boundary)~~

Drawing on Liz Rice's book *Container Security* and his own exploration of the Linux primitives underneath, Luca Cavallin reminds us that containers are not automatically secure. At bottom, a container is just a normal Linux process wrapped in a few isolation primitives: namespaces restrict what the process can see, and cgroups cap the resources it can consume, yet every container on a host shares the exact same Linux kernel. Consequently, kernel vulnerabilities, misconfigured mounts, overly broad capabilities like `CAP_SYS_ADMIN`, or forgotten setuid binaries can all become privilege-escalation paths; simply "not running as root" isn't enough. Classic principles like least privilege, defense in depth, attack-surface reduction, and blast-radius containment still apply in full.

To harden containers, the author recommends filtering syscalls with seccomp, adding mandatory access control via AppArmor or SELinux, and using user namespaces to map root inside the container to an unprivileged user on the host. When stronger isolation is required—such as running untrusted code or multi-tenant workloads—teams can turn to gVisor, Kata Containers, Firecracker, or full virtual machines where each guest gets its own kernel. The post also emphasizes supply-chain security: treating the Dockerfile as an enforceable policy, using minimal base images, pinning image digests rather than mutable tags, separating build and runtime stages, signing images with Cosign, and having admission controllers reject unsigned or untrusted images before deployment.

## [An ode to bzip](https://purplesyringa.moe/blog/an-ode-to-bzip/)

Purplesyringa needed to compress Lua source code for the ComputerCraft mod in Minecraft, where in-game floppy disk space is tight and the decompressor itself has to fit inside a tiny budget. Compressing a 327 KB Lua source bundle, `bzip2` reached 63,727 bytes and `bzip3` reached 61,067 bytes—beating `zopfli`, `zstd`, `xz`, `brotli`, and `lzip` on that file. The secret lies in the algorithm: whereas most mainstream compressors are built on LZ77 (replacing repeated substrings with back-references to earlier occurrences), `bzip` uses the Burrows–Wheeler Transform (BWT) to sort characters by their surrounding context. That clusters identical characters into long runs that compress exceptionally well with run-length encoding—making it a natural fit for structured text like source code.

Because the BWT transform itself is deterministic while leaving room for simpler block-size and entropy-coding choices, even a stripped-down custom encoder achieves strong compression ratios. By dropping compatibility with the standard container format and using a single Huffman table, the author's custom bzip-style decompressor came in at roughly 1.5 KB of code. `bzip` is often dismissed as slow, but when you are compressing to squeeze under a hard size cap, the difference is between booting and not booting at all—and in a high-level interpreted language like Lua where every operation carries overhead anyway, `bzip`'s speed disadvantage largely fades. The author concludes that while `bzip` may no longer be the default general-purpose choice, it remains remarkably effective for text and source code.

## [Why Arm is becoming the CPU foundation for AI data center architecture](https://newsroom.arm.com/blog/why-system-architects-default-to-arm-in-ai-data-centers)

This Arm Newsroom piece argues that AI workloads are exposing the limits of traditional general-purpose server designs across power delivery, cooling, memory bandwidth, and system-level efficiency. As a result, data centers are shifting toward purpose-built rack-scale AI systems where the defining question is no longer raw peak FLOPS, but how effectively accelerators, CPUs, memory, networking, and software work together. Agentic AI sharpens this shift: agents plan, invoke tools, retrieve data, and loop continuously, creating 24/7 inference traffic. In that world, the CPU acts as the orchestration hub—handling scheduling, routing, I/O, networking, storage, and security so the accelerators stay fed.

According to Arm, performance per watt has become the decisive metric because power availability and energy budgets are hard constraints. The post cites projections that nearly half of the compute capacity shipped to top hyperscalers by late 2025 is expected to be Arm-based, alongside benchmarks showing AWS Graviton4 (Neoverse) delivering stronger performance and price-performance than comparable AMD and Intel instances. New rack-scale architectures like the NVIDIA Vera Rubin NVL72—pairing 72 Rubin GPUs with 36 Arm-based Vera CPUs—and the AWS Trainium3 UltraServer with Graviton follow this exact blueprint. Arm also highlights software portability across hardware generations without rewriting application code.

## [We built an Agent Skill so AI writes Redis code](https://redis.io/blog/we-built-an-agent-skill-so-ai-writes-redis-code/)

Redis introduces an official Agent Skill—a markdown knowledge pack that AI coding agents like Claude Code, Cursor, Codex, and GitHub Copilot can load into context on demand with a single install command. The team noticed that AI-generated Redis code routinely suffers from three problems. First, models trained on older corpora write code as if Redis stopped at version 6, ignoring vector sets, native JSON, the query engine, and LangCache. Second, agents improvise fragile patterns instead of using battle-tested idioms—building rate limiters without sliding-window sorted sets, omitting cache-stampede protection, or forgetting pipelining. Third, models don't warn you about what they don't know, casually emitting blocking `KEYS *` calls against million-key instances or stuffing large JSON blobs into plain strings instead of hashes.

The skill supplies up-to-date reference patterns for caching, rate limiting, session stores, vector search, semantic caching, agent memory, pub/sub, and streams; decision guides for picking between hashes, JSON, sorted sets, and vector sets; guardrails against anti-patterns like `KEYS` in loops or unbounded key growth; and production-ready defaults for connection pooling, pipelining, and cluster compatibility. As Anthropic's team puts it, MCP gives agents tools, while Skills teach them how to use those tools well. Built on an open format, the skill loads only when relevant to keep context windows lean, can be versioned in Git, shared across teams, and composed with other skills.

## [Inside the Archive: The Tech Behind Your 2025 Wrapped Highlights](https://engineering.atspotify.com/2026/3/inside-the-archive-2025-wrapped)

Spotify's engineering team shares how they built the Wrapped Archive feature for 2025 Wrapped: for every eligible listener, the system selects up to five "memorable days" from the past year and uses an LLM to write personalized narrative recaps grounded strictly in the user's actual listening history. Candidate days are picked by a prioritized set of heuristics—such as biggest listening day, most new artists discovered, or most unusual listening pattern. To generate roughly 1.4 billion stories across 350 million users at a sustainable cost, the team distilled a frontier model into a much smaller model using a carefully curated "golden" dataset, then aligned it further with Direct Preference Optimization (DPO) from human evaluations. The batch pipeline ran continuously for four days at thousands of requests per second.

On the storage side, each memorable day was written to its own column in a column-oriented key-value store, so concurrent writes for the same user never collided or required locks or read-modify-write cycles. Because Wrapped launches globally all at once, the team pre-scaled infrastructure and ran full load tests across every region hours ahead of launch. Quality was guarded by an LLM-as-a-judge pipeline that scored roughly 165,000 sampled stories for factual accuracy, safety, tone, and formatting—which caught a timezone bug in the data pipeline that was shifting dates in generated stories, letting the team fix and regenerate the affected batch before launch. Their biggest takeaway: at this scale, calling the LLM is the easy part; capacity planning and automated safety loops are where the real engineering lives.

## [Managing Multiple Agents](https://fffej.substack.com/p/managing-multiple-agents)

Jeff explores what happens when you apply classic human management styles to multi-agent AI orchestration through a playful simulation: four "minions" assembling an Ikea Billy bookcase—Kevin reading the manual, Stuart fetching parts, Bob assembling, and Dave running quality checks—all powered by the open-weights `gpt-oss:20b` model. Under *Command and Control*, every action had to be approved by the coordinator, burning through messages and moving at a crawl. *Taylorism* broke the job into rigid, standardized micro-steps, running much faster but stripping the agents of any autonomy to adapt.

In the simulation, *management by outcomes*—stating the goal alongside a work-in-progress (WIP) limit—won handily, finishing five times faster than Command and Control and three times faster than Taylorism. Most delightfully, Stuart noticed on his own that assembly had become the bottleneck and jumped in to help Bob without being told. By contrast, *total autonomy* with no constraints still got the bookcase built, but devolved into chaos with agents duplicating each other's work—echoing Kent Beck's line that "autonomy without constraints is chaos." The author concludes that orchestrating AI agents mirrors managing people: less capable agents need tight scaffolding, while capable agents perform best when given clear goals and constraints and left to figure out the rest.

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
