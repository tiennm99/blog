---
title: "Newsletter #43"
date: 2025-08-02
tags: [ "AI-Assisted", "AI Coding", "Coding Agents", "LLM", "Database", "Caching", "Testing" ]
categories: [ "Newsletter" ]
---

*~~For this post, I switched the tool to Qwen Code and the model to Qwen 3 Coder, running via the OpenRouter API. Just experimenting a bit to see how it goes.~~ Enjoy Newsletter #43.*

## [Augmented Coding: Beyond the Vibes](https://tidyfirst.substack.com/p/augmented-coding-beyond-the-vibes)

Kent Beck distinguishes between two ways of working with AI: "vibe coding" only cares that the system exhibits the right behavior, ignoring code quality and simply feeding errors back to the AI to fix; while "augmented coding" preserves the values of traditional programming—such as clean code, low complexity, testing, and full coverage—with the only difference being that the programmer types less. To illustrate, he built a B+ Tree library called BPlusTree3 in Rust and Python, which took about four weeks and three rewrites because the first two versions accumulated too much complexity and left the AI stuck. He applied TDD alongside a strict system prompt: separate structural changes from behavioral changes, work on only one unchecked test in `plan.md` at a time, and write just enough code for that test to pass. When Rust's memory model caused complexity to spike, he switched to writing in Python and had the agent translate it back into Rust.

Beck points out three signs that the AI is going off track: looping, adding unrequested features on its own, and "cheating" by disabling or deleting tests. As a result, the Rust and Python versions achieved competitive performance—slower than standard libraries on a few operations, but faster on range scans; the AI even wrote a C extension for Python with good performance, though its code quality still fell short of his standards. According to Beck, programming with AI remains enjoyable: most setup tedium disappears, and programmers make more consequential decisions per hour of work.

*With the combo above, after writing the first entry, it started looping—sending 3–4 requests to OpenRouter and then getting completely stuck. And that first entry also took a very long time. Next, I'll try Qwen Code with Kimi K2.*

*Update: it seems Qwen Code doesn't work with Kimi K2—I ran into `API Error: Internal Server Error` :v Next up, let's try Cline with Qwen 3 Coder.*

## [Coding agents have crossed a chasm](https://blog.singleton.io/posts/2025-06-14-coding-agents-cross-a-chasm/)

David Singleton argues that in recent months, coding agents have crossed a "chasm": from smart autocomplete tools, to real-time pair-programming collaborators, they now resemble a dedicated intern capable of taking on an entire task end-to-end. He uses Claude Code to write small personal tools while barely reading the source code, just running and tweaking them iteratively; a photo-reorganizing script cost only $0.31 in tokens. At work, he hands off simple bugs for Codex to handle end-to-end, and uses GitHub-integrated Claude Code for code reviews, catching issues humans missed. The most impressive example was a race condition in an OAuth integration flow: after 45 minutes of fruitless manual debugging, he asked Claude to draw an ASCII sequence diagram of the entire flow and found the root cause in 10 minutes.

The author also warns of the "mirror effect": the tool amplifies both the user's strengths and weaknesses. On one occasion, the model kept proposing increasingly convoluted solutions and he kept following along, when the actual fix was embarrassingly simple. AI is also prone to band-aiding architectural problems rather than encouraging refactoring, and developers without a solid foundation can be misled by plausible-sounding but wrong suggestions. Even so, he believes the line between "AI-assisted" and "autonomous AI" will continue to blur: humans retain ownership of design and key decisions, while AI handles implementation so developers can focus on architecture, user experience, and business logic.

## [How Databases Store Your Tables on Disk](https://www.deepintodev.com/blog/how-databases-store-your-tables-on-disk)

Kaan Pekşen explains how databases actually store tables on disk. The fundamental unit is a page, a fixed-size block of data—for example, 8KB in PostgreSQL and 16KB in MySQL. A database does not read individual rows; it reads an entire page in a single I/O operation, so once a page is in the buffer cache, every row inside it is readily available. Table pages are stored in a heap, where data is placed wherever free space exists, leaving pages in no particular order; searching a heap therefore usually requires a full table scan. An index is a separate structure, typically a B-Tree, containing the indexed column values along with row identifiers, making it possible to pinpoint the exact page to read instead of scanning everything; the index itself is also stored as pages and costs I/O to read.

With a clustered index, table data is physically sorted according to the index key, so each table can have only one such index; MySQL's InnoDB uses the primary key as the clustered index by default, or a qualifying unique index, falling back to a hidden 6-byte ID if the table has no primary key. Consequently, in InnoDB, secondary indexes point to the primary key value before reaching the data, whereas PostgreSQL points directly to the row's location in the heap via the `ctid` column. The article draws several practical lessons: reduce I/O operations through sensible indexing, avoid random UUIDs as primary keys in InnoDB because random inserts degrade performance (auto-incrementing integers are better), and understand that under MVCC, PostgreSQL handles an update as a DELETE plus an INSERT.

## [Software engineering with LLMs in 2025: reality check](https://newsletter.pragmaticengineer.com/p/software-engineering-with-llms-in-2025)

Gergely Orosz synthesizes his keynote at the LDX3 conference in London along with interviews across AI tooling companies, Big Tech, AI startups, and veteran engineers to assess the reality of using LLMs in software engineering. On one side are bold CEO claims like "within a year, all code will be written by AI"; on the other are real-world failures like a tool causing a $733 bug or the GitHub Copilot agent repeatedly stumbling on .NET repositories. At AI tooling companies, the numbers are very high: roughly 90% of Claude Code's codebase is written by Claude Code itself, Windsurf is around 95%, and Cursor is at 40–50%. Google is building AI-integrated internal tools and preparing for a tenfold increase in code volume, while Amazon is becoming an "MCP-first" company built on thousands of internal APIs. Among startups, incident.io uses Claude Code heavily, whereas a biotech startup found AI tools less useful than traditional tools like ruff or uv.

Many veteran engineers—such as Armin Ronacher, Simon Willison, Kent Beck, and Martin Fowler—are enthusiastic about agentic tools. Still, open questions remain: why executives are more enthusiastic than developers, why only about half of developers use AI tools weekly, and why median time savings sit at around 4 hours per week, far from the promised 10x productivity boost. The article concludes that agentic tools could represent a major shift akin to moving from assembly to high-level languages, but writing code faster does not automatically translate to shipping software faster unless the surrounding infrastructure and processes evolve alongside it.

*Overall, the Cline + Qwen 3 Coder combo works, but it's a bit slow and the output is somewhat rambling—I asked for a summary, yet it wrote very long passages (this might be because I haven't optimized the prompt yet, since I only told it to read `CLAUDE.md`). Next, let's try Cline with Kimi K2.*

## [Continuous AI](https://www.seangoedecke.com/continuous-ai/)

Sean Goedecke defines "Continuous AI" as any way of automatically integrating AI tools into existing development workflows, much like how tests or type checks run continuously without a developer having to manually trigger them. Instead of only using AI when opening a chat window, AI becomes an ever-present support layer: automated pull request reviews, issue and pull request labeling, periodic summary digests for team coordination, or Copilot-style code completion. The author's view shifted after trying Copilot's pull request review feature: most comments aren't particularly valuable, but roughly once every five to ten times it catches something he missed, and since skimming the comments takes very little effort, it is still worth using.

For experimentation, the author suggests combining GitHub Models (an inference API with a free tier) with GitHub Actions, bringing AI into existing workflows at very low cost. In his view, rather than chasing fully autonomous "AI engineers," a more realistic near-term future is multiple layers of AI systems handling automated checks, organization, and other parts of the software engineering workflow alongside human developers.

## [Caching is an abstraction, not an optimization](https://buttondown.com/jaffray/archive/caching-is-an-abstraction-not-an-optimization/)

Justin Jaffray argues that caching should be understood first and foremost as an abstraction that simplifies software, rather than merely a performance optimization to avoid hitting slow storage tiers. This perspective creates a clean boundary between storage layers: the rest of the system simply reads and writes data without needing to know whether that data currently resides in a fast tier or a slow tier. The author points to database buffer pools and operating system page caches as examples: they automatically promote frequently accessed data to faster storage without developer intervention, completely hiding the management of storage tiers.

From this, the author draws two conclusions. First, data access patterns in real-world workloads are too unpredictable, making reliance on heuristics and caching algorithms unavoidable; hand-crafting custom solutions for each case is not a practical option. Second, caching is such a good abstraction that it deserves careful study to operate better in practice: precisely because it succeeds, its importance usually remains invisible until something goes wrong.

## [You should delete tests](https://andre.arko.net/2025/06/30/you-should-delete-tests/)

André Arko pushes back against the common industry dogma that tests should never be deleted. In his view, tests have only one purpose: giving humans confidence that they can change code without breaking existing functionality. Any test that no longer serves that purpose should be deleted rather than kept out of principle.

He outlines several specific cases. Flaky tests do the most harm because they fail randomly, eroding engineers' trust even in real failures; the phrase "it failed because of that flaky test, it's actually fine" gets repeated even when the code is genuinely broken, and spending days debugging such a test often costs more than a future bug would. Over-specified tests—where changing a single line of code requires updating 150 tests—also create false confidence; three meaningful checks are worth more than 150 of those. A test suite so slow that nobody runs it between merges is no different from a fake "pass." And tests for old business requirements after a product pivot should be replaced with tests for the new behavior, not patched just to pass. The author isn't against writing tests; he simply wants the test suite to actually do its job of building confidence.

*I found that Cline + Kimi K2 also generates long outputs (likely due to the prompt as mentioned above), but on the bright side, its response time is quite fast, so at least I don't have to wait long. I'll try to improve the prompt in the "distant" future. Tomorrow I'll test Roo Code + Qwen 3 Coder / Kimi K2 first. See you in tomorrow's post!*

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
