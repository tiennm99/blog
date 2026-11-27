---
title: "Newsletter #67"
date: 2025-12-10
tags: ["AI-Assisted", "Build Systems", "Bazel", "Agentic Coding", "AI Development", "Refactoring", "Software Engineering"]
categories: ["Newsletter"]
---

*~~For this post I tried refining my `AGENTS.md` file. I'll share my self-assessment at the end of the post.~~ Enjoy Newsletter #67.*

## [Build better software to build software better](https://slack.engineering/build-better-software-to-build-software-better/)

Slack's engineering team recounts how they cut Quip and Canvas build times from 60 minutes down to 10–30 minutes, built around a central thesis: core software engineering principles apply just as much to build systems as they do to application code. Just like optimizing runtime performance, speeding up builds relies on two levers: caching (doing less work) and parallelism (spreading the load). Bazel supports both out of the box, automatically reusing build outputs when inputs haven't changed and distributing build actions across CPU cores. Even the best build tool, however, cannot save a tangled dependency graph.

The root problem was that the frontend build depended on the entire compiled backend, so any Python change invalidated the cache and forced a full frontend rebuild, costing an average of 35 minutes each time. The team painstakingly untangled the true inputs of each build step—decoupling backend from frontend, Python infrastructure from TypeScript, and build tooling from application source code—while splitting targets into fine-grained units so individual JS bundles and CSS files could be cached independently. They also fixed a layering violation: frontend bundlers should focus strictly on bundling logic while leaving orchestration and parallelism to Bazel. The result was an up to 6x speedup: 10 minutes in the best case, ~12 minutes on average, and 30 minutes in the worst case.

## ~~[Things I Don't Like in Configuration Languages](https://medv.io/blog/things-i-dont-like-in-configuration-languages/)~~

~~Anton Medvedev analyzes the pain points of various configuration languages and explains why he decided to create his own language, MAML (Minimal And Markup Language). The article offers an insightful look into the pros and cons of configuration formats ranging from YAML and JSON to newer alternatives.~~

~~**Key takeaways:**~~
~~- YAML has an overly complex specification with too many unnecessary features~~
~~- JSON has won as a universal data-interchange format, but has a few small rough edges worth improving~~
~~- TOML lacks a null value and has confusing array-of-tables syntax~~
~~- Languages like Pkl, CUE, and Dhall are full programming languages rather than simple markup languages~~
~~- The author created MAML based on JSON with a strict specification and a distinctive name~~
~~- MAML keeps JSON's readability while adding comments and multiline strings~~

## [Here's What's Next in Agentic Coding](https://seconds0.substack.com/p/heres-whats-next-in-agentic-coding/)

This post predicts the next wave of developments in agentic coding, centered on a single thesis: context management is king. A great agent harness must feed the model the exact information it needs while keeping noise out of the context window. According to the author, Plan Mode will become far more sophisticated, flipping the effort ratio between planning and execution from 20:80 to 80:20 so an agent can one-shot an entire feature in a single run. Codebase search will blend `grep` with semantic embeddings, external reference docs (such as via Context7 MCP) will be fetched just in time, and rules and skills will load conditionally so they don't pollute context.

At the multi-agent orchestration layer, the author expects techniques like Best-of-N sampling, pairing an expensive frontier model for planning with a cheaper model for execution, and delegating to subagents for parallel, context-isolated tasks coordinated by a lead agent that shields the user from micromanagement. Output quality will climb through self-critique and evaluation loops, harnesses that proactively suggest improvements to their own configuration, and persistent memory systems that retain knowledge about the user and codebase across sessions. As the author notes, the current pace of iteration in this space is unprecedented.

## ~~[Why agents DO NOT write most of our code - a reality check](https://octomind.dev/blog/why-agents-do-not-write-most-of-our-code-a-reality-check/)~~

Even though Octomind builds AI agents for a living, their team reports that most of their own production code is still written by humans. After months of using Cursor, Claude Code, and Windsurf, no one on the team saw a transformative productivity boost (20% or more). To test the limits, two engineers spent a week trying to build a real feature—branch-specific copies of test cases—entirely with AI. On the first attempt, despite detailed specs and an updated rules file, the agent stumbled on basics: forgetting to regenerate the Prisma client after schema changes, creating UI components without wiring them up, writing inefficient queries, and confidently declaring the job done. The result was a 2,000-line PR that needed fixes on nearly every screen. A second attempt with smaller, incremental tasks still produced a 1,200-line PR for just a fraction of the feature, complete with broken database transaction handling.

In the author's view, the most dangerous failure mode is developers losing their mental model of the codebase as AI dumps thousands of lines of changes in at a time, making every tough debugging session feel like your first day at a new job. The second issue is that AI doesn't know its own limits and always acts confident, whereas a human intern knows how to say "I've never done this before." Still, AI remains genuinely useful for brainstorming, debugging, autocomplete, writing unit tests, and small localized refactors, and narrowly scoped specialist agents continue to deliver real value.

## [Clarifying the Rule of Three in Refactoring](https://blog.jbrains.ca/permalink/clarifying-the-rule-of-three-in-refactoring/)

J.B. Rainsberger clarifies the "Rule of Three" in refactoring—the heuristic that you should wait until duplication appears three times before extracting a shared abstraction—which often sparks debate. In Rainsberger's view, the rule is primarily aimed at Advanced Beginners to keep them from mechanically deduplicating everything on sight. He distinguishes between two contexts: when you are practicing design through refactoring, aggressively removing duplication and occasionally regretting it is how you sharpen your design judgment; when you are focused on shipping under a deadline, waiting helps avoid rework in case future changes force you to reintroduce the duplication. The Rule of Three is therefore a teaching aid for balancing learning and delivery, not an ironclad law.

Personally, Rainsberger prefers removing duplication early because he is comfortable inlining code back again as soon as an extraction turns out to be wrong, viewing that reversal as a natural part of learning. Removing duplication early also helps surface useful abstractions hiding in the design. His advice to developers is to get comfortable undoing a refactoring, and if you invoke the Rule of Three, make sure it rests on clear reasoning rather than vague fear.

### Bonus

**Images:**
![Top Strategies to Share Data Between Services](https://substackcdn.com/image/fetch/$s_!9vpY!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff5f41f86-4bf2-4b21-85aa-69659c039111_2250x2624.png)
![Scalability Patterns for Modern Distributed Systems](https://substackcdn.com/image/fetch/$s_!aRQC!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa760cf81-6245-4051-be41-f867616e0faf_2250x2862.png)

**Videos:**
[Design a Web Crawler: FAANG Interview Question](https://www.youtube.com/watch?v=6u25GckPhLU)

**Verdict:** *URL processing worked reasonably well—it used less untranslated English this time, though a bit of... Chinese slipped in :| The bonus section was pretty rough, mainly because when you only pass raw image URLs to the AI, it struggles to find the right title and sometimes hallucinates completely unrelated labels.*

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026.*
