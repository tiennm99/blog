---
title: "Newsletter #46"
date: 2025-08-05
tags: [ "AI-Assisted", "Survey", "Tech Stack", "AI Tools", "Distributed Systems", "TDD", "OOP" ]
categories: [ "Newsletter" ]
---

*~~For this post, I'm going back to Claude Code :D (still my true love—I only jump to other agents when I'm worried about burning tokens).~~ Enjoy Newsletter #46.*

## [The Pragmatic Engineer 2025 Survey: What's in your tech stack?](https://newsletter.pragmaticengineer.com/p/the-pragmatic-engineer-2025-survey)

Gergely Orosz published the first part of The Pragmatic Engineer's 2025 tech stack survey, based on nearly 3,000 valid responses. The "typical respondent" is a senior software engineer with 6–10 years of experience working on the backend at companies of all sizes. Up to 85% of participants mentioned at least one AI tool. GitHub Copilot took the top spot, used by one in two respondents; Cursor, despite launching in 2023 and spending nothing on marketing, came in second. Claude narrowed the gap with ChatGPT considerably, and Claude Code received quite a few mentions even though it had only officially launched a few days before the survey closed.

Among programming languages in this readership sample, TypeScript was mentioned most often; Python stood out, and Swift dominated Objective-C in iOS development, while Ruby on Rails and Elixir were loved far above their usage share, and no language was disliked more than it was liked. JIRA was the most disliked tool—surpassing the next four combined—mainly for being slow and bloated, with Linear frequently cited as the alternative. Git is virtually the default for version control, though GitLab and Bitbucket retain sizable user bases, and GitHub Actions leads in CI/CD. In infrastructure, AWS leads, followed by Azure and Google Cloud, with Vercel standing out as the most prominent provider outside the "Big 3." The takeaway: developers are quick to try new tools in fast-moving spaces like AI.

## [Algorithms for making interesting organic simulations](https://bleuje.com/physarum-explanation/)

This article explains techniques for creating organic-looking simulations aimed more at artistic expression than scientific accuracy. The starting point is Jeff Jones's Physarum algorithm (2010): a large number of agents move across a 2D plane, each with a position and heading. On every step, an agent "senses" three points ahead (straight, slightly left, slightly right), turns toward the strongest trail, moves forward, and deposits a trail onto an image called a trail map; that image is then slightly blurred and multiplied by a decay factor to keep the system stable. With just four parameters (sensor distance, sensor angle, turn angle, and step size), a wide variety of behaviors already emerge.

The most fascinating part comes from Sage Jenson's *36 Points*: instead of keeping parameters fixed, each parameter is computed as a function of the trail value at the agent's current position, plus sampling offsets—bringing the total to roughly 14–20 parameters and producing surprisingly diverse behaviors. The author shares his own implementation (`physarum-36p`) using GPU compute shaders via openFrameworks, consisting of four shaders for resetting counters, moving particles, depositing trails, and diffusing, running smoothly with millions of particles. It is a beautiful demonstration of how a few simple rules can give rise to complex behavior.

## [AI coding tools are shifting to a surprising place: The terminal](https://techcrunch.com/2025/07/15/ai-coding-tools-are-shifting-to-a-surprising-place-the-terminal/)

According to TechCrunch, AI coding tools are shifting from code editors to the terminal. Since February, Anthropic, DeepMind, and OpenAI have each launched their own command-line tools (Claude Code, Gemini CLI, and Codex CLI), and they have quickly become some of these companies' most popular products. Mike Merrill, co-creator of the Terminal-Bench benchmark, bets that in the future 95% of interactions between LLMs and computers will happen through terminal-like interfaces. Meanwhile, editor-based tools are showing signs of turbulence: Windsurf was carved up through acquisitions, and a METR study of experienced open-source developers found that when using Cursor Pro, they thought they were about 20% faster when in reality they were about 19% slower.

The difference lies in the scope of work. The previous generation of tools, measured by SWE-Bench, focused on fixing buggy code from GitHub issues; terminal tools look at the entire execution environment, including DevOps tasks like configuring a Git server, compiling a Linux kernel, or figuring out why a script fails to run. On the leaderboard cited by the article at the time, Warp solved just over half the tasks, showing there is still plenty of room to grow. Even so, Warp's founder believes that tasks like bootstrapping a project, resolving dependencies, and getting it running can now be handed off almost entirely to AI.

## [Distributed Systems Reliability Glossary](https://antithesis.com/resources/reliability_glossary/)

Jepsen and Antithesis jointly compiled a glossary of distributed systems reliability aimed at developers at every career stage. According to the authors, this is the first resource to gather in one place concepts that were previously scattered across multiple disciplines. The glossary is organized into sections covering foundational concepts, consistency models (what a system is allowed to do), availability models, anomalies, fault types (from data loss and clock skew to Byzantine faults), and testing techniques, accompanied by a further reading list. Each entry provides an intuitive definition alongside links to formal academic sources for deeper study.

What makes it especially valuable is its practical spirit: the authors emphasize that it is a reference guide rather than required cover-to-cover reading, and that every time you write an integration test, you are already testing a distributed system. The testing section explains why distributed systems are hard: they are inherently concurrent and routinely experience partial failures. From there, it introduces techniques such as concurrency testing, fault injection, deterministic simulation testing, property-based testing, and test-case shrinking. A great resource to bookmark when working with databases or multi-node systems.

## [Test-Driven Development (TDD) with dbt](https://xebia.com/blog/test-driven-development-tdd-with-dbt/)

Dumky de Wilde (Xebia) discusses applying Test-Driven Development (TDD) to dbt, the popular data transformation tool in analytics engineering. Instead of writing a model and hoping the numbers look right, you first define what "good data" means, write a test, watch it fail, and then write just enough SQL to make it pass. The author distinguishes several categories of tests: row-level checks on one or more columns (such as `not_null` and `unique`), aggregate tests across an entire model, unit tests for models (available since dbt 1.8, using mock data instead of production data), unit tests for macros, and model contracts. Contracts validate the output schema at build time so a structurally invalid model fails to build; how strictly the underlying database enforces each constraint depends on the platform and adapter.

The article walks through writing a row-count limit test for a model that does not yet exist, forcing you to answer business questions like "why between 1 and 99 rows?" before writing a single line of SQL. In practice, the author recommends always running unit tests and contracts during local development and in CI/CD, running data tests selectively, and skipping unit tests in production. Use tags to group tests, craft small custom fixtures for edge cases, and document why each test exists. The core message is shifting your mindset from "build first, test later" to "define success first, then build."

## [Rethinking OOP](https://max.xz.ax/blog/rethinking-oop/)

The author opens with an example from AP Computer Science A: the textbook definition "a class is a blueprint for creating objects, and an object is an instance of a class" is virtually meaningless to beginners. According to the author, teaching OOP too early without explaining why leads students to follow templates mechanically rather than considering whether the problem actually calls for them. Drawing inspiration from Professor Matthias Felleisen's "design recipe" and Ethan McCue's modern approach to teaching Java, the article proposes starting as simply as possible and introducing new language features only when learners hit the limits of their current toolkit.

Specifically, learners can use JDK 25's compact source files (or JShell) to write sequential statements right away without `public static void main`. When they have to copy-paste the same prime-checking block across multiple variables, they naturally see the need for methods; when managing too many loose variables becomes unwieldy, they grasp the value of grouping data into a class. The author acknowledges that this approach lets students write "bad" code at first, but living with repetitive, clunky code is precisely what makes design choices meaningful. The conclusion is worth pondering: best practices don't need to be memorized from a textbook—they can become intuitive by gradually scaling up program complexity.

## ~~[How I Write Code That I Don't Hate Reading a Week Later](https://dev.to/resource_bunk_1077cab07da/how-i-write-code-that-i-dont-hate-reading-a-week-later-303b)~~

~~A practical and useful article on writing readable code—an important skill that many developers overlook. The author shares a core philosophy: "Write code as if you'll have to debug it at 2 a.m., half-asleep, with a deadline looming."~~

~~Key principles include giving variables and functions descriptive names (for example, `parsed_user_profile_data` instead of just `d`), writing comments that explain "why" rather than "what," and prioritizing readability over "clever" code. Instead of writing dense one-liners to show off technical flair, break them into multiple easier-to-follow lines.~~

~~The best point is the principle of writing small, focused functions: each function should do one specific thing with a clear name like `handleLoginFormSubmission()`. When code gets tangled, stop and refactor rather than piling on more complexity. The author also mentions helpful tools like Prettier, Black for Python, and even ChatGPT for refactoring. Simple yet highly practical advice for any developer who wants more maintainable code.~~

## [7 Habits That Quietly Made Me A 10x Developer (No, Not ChatGPT)](https://dev.to/abubakersiddique771/7-habits-that-quietly-made-me-a-10x-developer-no-not-chatgpt-13c4)

This article argues that becoming a "10x developer" comes not from innate genius or working 20-hour days, but from small habits maintained consistently—without needing an AI assistant. The first habit is writing code that writes code: using scripts, generators, and scaffolding tools to automate boilerplate, CRUD endpoints, test harnesses, or GitHub Actions workflows so you never solve the same problem twice. The second is designing for "future you" with descriptive commit messages, clear function names, sensible folder structures, and writing the `README.md` before starting implementation. The third is keeping a brief "debug log" stating the problem, hypothesis, and plan before fixing a bug, because writing it down forces clear thinking.

The remaining habits include building tiny personal tools (a CLI for renaming screenshots, a snippet generator), carving out 90-minute deep-focus blocks free from Slack or social media, studying how other developers structure their workflows rather than just copying their code, and running a Friday retro with three questions: what went well, what slowed me down, and what will I automate or improve next. According to the author, "10x" effectiveness is the compound result of many small improvements over time.

*Claude Code really is my true love :D Fast execution, concise summaries, and getting better all the time. Wonderful!*

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
