---
title: "Newsletter #41"
date: 2025-07-31
tags: ["AI-Assisted", "Performance", "Algorithms", "AI Coding", "Claude Code", "Vibe Coding", "SQL"]
categories: ["Newsletter"]
---

*Enjoy Newsletter #41.*

## [The Fastest Way to Detect a Vowel in a String](https://austinhenley.com/blog/vowels.html)

Austin Henley benchmarks 11 different ways to check whether a string contains a vowel in Python—ranging from a simple `for` loop, a C-style loop with chained `or` conditions, nested loops, set intersection, a generator expression with `any()`, recursion, and `filter`/`map` with a lambda, all the way to regular expressions and a "just for fun" prime-number character encoding. The initial results are surprising: on short strings (length 10), a simple loop wins, but from length 100 upward, regex takes the lead while the C-style loop falls far behind. The reason is that Python's regex engine is written in C and uses a bitmap lookup table to match characters instead of interpreting Python bytecode one character at a time.

The post-publication update is even better: readers pointed out that Python's built-in `str.find()` beats regex thanks to CPython's optimized substring search, and simply flipping the loop order—iterating over the vowel string and checking `if v in s` against the input—beats both regex and `find()`, running roughly 16x faster than regex on long strings. The takeaway is that performance differences in Python mostly come down to the CPython interpreter boundary: whichever approach pushes more of the loop into C wins. In practice, write the readable version unless you are processing millions of strings.

## [Writing Toy Software Is A Joy](https://blog.jsbarretto.com/post/software-is-joy)

Joshua Barretto encourages programmers to build "toy software"—small, from-scratch projects—to deeply understand how systems work under the hood and rediscover the joy of programming. Starting from Richard Feynman's line, "What I cannot create, I do not understand," Barretto argues that building a simplified version of a familiar tool teaches you its core constraints far better than reading theory alone. The guiding rule is the 80:20 principle: spend 20% of the effort to get the 80% of functionality that is actually interesting, implement only what you need, and let the program crash until you are forced to handle an edge case. That mindset turns intimidating systems into approachable weekend projects.

The post lists 23 project ideas with difficulty ratings (from 3 to 8 out of 10), time estimates, and reference links: easier picks include a regex engine, a CHIP-8 emulator, a hash table, and an interpreter; medium ones cover a physics engine, a text editor, a voxel engine, and an orbital simulator; the hardest are an x86 OS kernel and a compiler for a C-like language. Barretto strongly advises leaving large language models (LLMs) out of these projects, because understanding shouldn't be "served on a platter": struggling through the problem yourself is the entire point, especially as everyday software work becomes increasingly commoditized and AI-assisted.

## [Field Notes From Shipping Real Code With Claude](https://diwank.space/field-notes-from-shipping-real-code-with-claude)

Diwank shares battle-tested lessons from shipping production code with Claude. He divides AI-assisted work into three distinct modes: "playground" mode for weekend hacks and prototypes where Claude writes 80–90% of the code with minimal guardrails; pair-programming mode for codebases under roughly 5,000 lines; and production/monorepo scale with real users, where every step requires deliberate orchestration. The anchor of the workflow is `CLAUDE.md`, which acts as the codebase's "constitution"—recording the reasoning behind architectural decisions, coding standards, test commands, repository conventions, and hard off-limits rules. Complementing it are inline "anchor comments" like `AIDEV-NOTE:`—short, greppable markers that guide both AI agents and human readers.

His non-negotiable rule is that humans write the tests, because tests encode business requirements and edge cases that AI doesn't truly understand; he illustrates this with an AI-generated test suite that passed green while completely missing a memory leak. AI is strictly forbidden from modifying test files, changing API contracts, touching database migrations, committing secrets, or guessing at domain logic. He also recommends using `git worktree` for parallel AI experiments, prefixing AI-assisted commits with `[AI]`, and being transparent across the team by agreeing on shared rules upfront—because strong engineering discipline is what separates AI as a force multiplier from AI as a chaos generator.

## [Why Generative AI Coding Tools and Agents Do Not Work For Me](https://blog.miguelgrinberg.com/post/why-generative-ai-coding-tools-and-agents-do-not-work-for-me)

Miguel Grinberg, author of Flask-SocketIO and several widely used Python libraries, explains why generative AI coding tools and agents don't fit his workflow. His central argument is that they don't actually save him time: because he is personally accountable for every line of code he ships to production, with or without AI, he has to read and fully understand every line before committing. Reviewing AI-generated code takes him just as long as—or longer than—writing it himself, wiping out any time "saved" during generation.

Grinberg also pushes back on comparing AI to an intern: a human intern learns and grows more autonomous over time, whereas in his view AI tools have no durable memory across sessions, resetting to square one on every task like an intern with amnesia. He views learning new languages and frameworks firsthand as both a joy and a long-term career investment, not a chore to offload to a machine. And while reviewing open-source community contributions also takes effort, it brings rewards AI never provides: genuine human connection, thoughtful feedback, and fresh ideas that make the project better.

## [AI coding assistants aren't really making devs feel more productive](https://leaddev.com/velocity/ai-coding-assistants-arent-really-making-devs-feel-more-productive)

LeadDev reporter Chantal Kapani examines data from the 2025 Engineering Leadership Report (surveying 617 engineering leaders in March) on perceived productivity gains from AI coding assistants, finding that the impact so far is much more modest than the hype suggests. Only 6% of respondents reported a significant productivity boost, while 39% saw minor improvements in the 1–10% range. Teams primarily use AI for code generation (47%), refactoring (45%), documentation (44%), internal communication (28%), and bug fixing (22%). Those numbers contrast sharply with upbeat vendor and enterprise claims like GitHub's report that 88% of users feel more productive or JPMorgan Chase citing 10–20% efficiency gains, though the studies differ in sample and methodology.

Industry experts quoted in the piece point to several reasons for the gap: current AI tools focus narrowly on typing code while ignoring deeper workflow bottlenecks; many rollouts are driven top-down by executive excitement rather than validated bottom-up; real delivery latency sits in test runtimes and deployment pipelines rather than keystrokes; and developers are rarely consulted before tools are mandated. The takeaway is to diagnose a team's actual bottlenecks first before assuming AI is the fix.

## [How to Vibe Code as a Senior Engineer](https://blog.alexmaccaw.com/how-to-vibe-code-as-a-senior-engineer)

Alex MacCaw shares how to "vibe code" effectively as a senior engineer: letting AI models write the bulk of the code while the human steers through crisp prompts and architectural oversight. In his experience, the prerequisites are a rock-solid project scaffold—such as `ai-monorepo-scaffold`—with clear examples of migrations, routes, and schemas for the AI to mimic; `.cursor/rules` files that instruct the agent to plan first, preserve type safety, and run tests so it behaves like "a clean, responsible junior engineer"; pulling every relevant file (including type definitions) into context; using Cursor for near-instant lint and typecheck feedback; and picking frontier models like Claude Opus 4 or Gemini 2.5 Pro in "thinking" mode, prioritizing output quality over token cost.

On prompting technique, MacCaw advises always asking the model for a plan to approve before it writes code, specifying exact outcomes and target file paths, providing concrete examples, setting explicit constraints (like "avoid `any`"), keeping scope tight, and switching to longer conversational prompts when stuck. He also catalogs AI's recurring blind spots: not knowing what context it is missing, reaching for TypeScript's `any` instead of proper types, jumping straight into code without confirming direction, and lacking architectural taste for a project's conventions. MacCaw suggests we may be witnessing "the final chapter of human-led programming" before AI closes those remaining gaps.

## [SQL Noir - Interactive SQL Game](https://www.sqlnoir.com/blog/games-to-learn-sql)

Hristo Bogoev, creator of SQL Noir, rounds up five interactive games that teach SQL through hands-on problem-solving rather than dry textbooks. First is his own SQL Noir, a detective game where you solve crimes by writing SQL queries across six progressively harder cases with realistic schemas, instant feedback, and both free and paid cases. Next is SQL Island, a castaway survival game that works well for beginners despite its dated interface; Northwestern University's SQL Murder Mystery, a single self-contained case that is great for practicing `JOIN`s; and SQL Police Department (SQLPD), a paid platform featuring multiple cases, guided hints, and strong storytelling.

Rounding out the list is SQLZoo, a free interactive tutorial site over 20 years old that systematically covers everything from basic `SELECT`s to advanced topics like window functions, albeit without a story wrapper. Together they make a fun practice list for junior developers: newcomers can start with SQL Island or SQL Noir for narrative momentum, then solidify their fundamentals on SQLZoo.

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
