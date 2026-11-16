---
title: "Newsletter #36"
date: 2025-07-25
tags: [ "AI-Assisted", "Kỹ Thuật Phần Mềm", "Phát Triển Bản Thân", "AI", "Thiết kế hệ thống", "Algorithms", "Code Review" ]
categories: [ "Newsletter" ]
---

*Enjoy Newsletter #36.*

## [What Makes Strong Engineers Strong](https://www.seangoedecke.com/what-makes-strong-engineers-strong/)

Sean Goedecke argues that what separates strong engineers from the rest is their ability to tackle unfamiliar problems faster than anyone else, and he ranks the four traits behind that ability in descending order of importance. First is self-belief: strong engineers take on work they have never done before even when they aren't sure how, dive straight into hard problems instead of procrastinating, and let each success build the confidence to take on even harder work in a compounding loop. Second is pragmatism: they value working solutions over architectural purity, happily make trade-offs to ship on time, and frequently clash with smart but ineffective engineers over unnecessary rewrites; when disputes arise, who actually ships is the ultimate tiebreaker.

Third is speed. Every strong engineer works fast—by not procrastinating and by compounding experience rapidly—and that speed lets them run more experiments and pursue high-value ideas. That pace comes not from working longer hours, but from intense bursts of focus. Last on the list is raw technical ability: a solid baseline is required, but genius-level intellect isn't; what matters is whether your strengths match the job, and raw intelligence can even get in the way if it undermines pragmatism and speed.

## [How do AI Code Reviews Impact Engineering Teams?](https://rdel.substack.com/p/rdel-92-how-do-ai-code-reviews-impact)

This post summarizes a study at Beko in which 238 developers used a GPT-4-powered automated code review tool (Qodo PR-Agent) over ten months, analyzing 4,335 pull requests through surveys and behavioral telemetry. Developers acted on 73.8% of the AI's comments, and 68.8% of participants felt code quality improved. However, median pull-request cycle time actually increased from 5 hours 52 minutes to 8 hours 20 minutes, human reviewer comments barely budged (from 0.31 to 0.28 per pull request), and 26.2% of AI comments were ignored as irrelevant—meaning noisy suggestions created extra triage overhead.

The core takeaway is that AI code review complements human reviewers rather than replacing them: it improves perceived quality, but neither reduces overall review effort nor speeds up delivery. The study advises teams to treat AI comments as early signal rather than final verdicts, track metrics to measure real impact on quality and velocity, and invest early in prompt tuning and noise filtering as the technology matures.

## [Writing that changed how I think about PL](https://bernsteinbear.com/blog/pl-writing/)

Max Bernstein curates 16 papers, blog posts, videos, and repositories that fundamentally reshaped how he thinks about programming languages and compilers. Highlights include Andy Wingo's post making copying garbage collectors concrete and approachable; CF Bolz-Tereick's optimizer series introducing union-find and using Z3 as a proof engine; Chris Fallin's work on register-allocator correctness showing how to verify a system per-compilation rather than proving the compiler itself once and for all; Russ Cox's regular-expression series explaining how nondeterministic automata become user-space "threads"; and Andrej Karpathy's micrograd for learning neural networks from scratch without external libraries.

What unites every entry on the list is turning abstract concepts into clean, compact implementations you can grasp in an afternoon instead of months of study. For younger developers curious about compilers and interpreters, it serves as both a high-signal reading list and a testament to the power of clear, concise technical writing.

## ~~[LLMs are Making Me Dumber](https://vvvincent.me/llms-are-making-me-dumber/)~~

~~Vincent Cheng poses a provocative question: are large language models (LLMs) making us dumber? He shares personal observations on how AI is reshaping his own learning process and skill development.~~

~~He points to the cognitive "shortcuts" AI makes tempting: using LLMs to finish coding projects without deeply understanding the codebase, solving math problems by letting AI generate the answer, or drafting emails without practicing writing. Those habits can atrophy problem-solving muscles and trade deep learning for short-term output speed.~~

~~At the same time, Cheng acknowledges the immediate productivity gains and draws historical parallels to pocket calculators, GPS, and the Industrial Revolution. Recognizing the uncertainty around long-term effects, he argues for a deliberate middle ground.~~

~~His prescription is to consciously protect core skills like independent thinking, decision-making, and sustained focus while using LLMs strategically without surrendering personal agency. As he writes: "Total offloading cripples real learning while maximizing short-term speed and output, and finding the right balance is critical."~~

## [How Cursor Indexes Codebases Fast](https://read.engineerscodex.com/p/how-cursor-indexes-codebases-fast)

This article breaks down how Cursor, the AI-first code editor, indexes an entire codebase so quickly. The pipeline runs in five steps: first, files are chunked locally on the user's machine into meaningful segments; next, Cursor computes a Merkle tree—a hash tree across all eligible files—and syncs it with the server; those code chunks are then converted into vectors using an embedding model; the vectors and metadata such as line numbers and obfuscated file paths are stored in Turbopuffer, a remote vector database; finally, every ten minutes, Cursor compares the Merkle tree to detect modified files and syncs only the diffs. Rather than slicing by fixed character or token counts, smart chunking relies on abstract syntax trees (ASTs) via tools like tree-sitter to preserve semantic boundaries while staying within token limits.

On privacy, according to Cursor's documentation, raw source code is not persisted on Cursor's servers after a request completes, and file paths are encrypted using a client-side secret key. When you ask a question, your query is embedded into a vector and matched against stored vectors to locate relevant code ranges; those lines are then read locally from disk and sent as context to the large language model. The Merkle tree is the key piece that makes change detection fast and incremental syncing practical, especially on large repositories where re-indexing from scratch would be prohibitively expensive.

## [A Leap Year Check in Three Instructions](https://hueffner.de/falk/blog/a-leap-year-check-in-three-instructions.html)

Falk Hüffner presents a leap-year check that compiles down to roughly three CPU instructions. The standard definition requires multiple conditions: divisible by 4, and not divisible by 100 unless also divisible by 400. Hüffner packs all of that logic into a single multiplication, a bitwise AND, and a comparison against "magic" constants: `return ((y * 1073750999u) & 3221352463u) <= 126976u;`. To find those constants, he used the Z3 bitvector constraint solver to search a 96-bit space; starting from a small year range and expanding iteratively, about half an hour of search produced constants that hold for every year from 0 to 102,499. A 64-bit variant extends the valid range up to year 5,965,232,499 and is proven optimal using the same technique.

On performance, benchmarking on an i7-8700K with predictable inputs (always testing 2025) shows almost no difference (0.65 ns vs. 0.69 ns). With random years, however, the branchless formula runs 3.8x faster than the standard implementation by avoiding branch misprediction penalties. Hüffner notes that real-world applications mostly check predictable years like the current one, so realistic benchmarks are needed before adopting this trick in places like CPython's `datetime` module. Still, it is a fun exercise in bit twiddling and using constraint solvers for algorithmic optimization.

## [Reservoir Sampling](https://samwho.dev/reservoir-sampling/)

Reservoir sampling is an algorithm for drawing a uniform random sample from a stream of items whose total length isn't known in advance. It maintains a "reservoir" array of size `k`, initialized with the first `k` items of the stream (or all of them if the stream is shorter). Each subsequent item at 1-based index `n` (where `n > k`) is selected with probability `k/n`; if chosen, it replaces a uniformly random element currently in the reservoir, and otherwise it is discarded. The math guarantees that the probability an older item survives in the reservoir equals the probability the new item is kept, giving every item seen so far an equal chance—just like every card in a deck having an equal chance of being drawn.

Sam Rose illustrates the practical payoff with a log-ingestion service. During traffic spikes, instead of naively keeping only the first `k` logs, reservoir sampling captures a fair, representative sample without overwhelming storage: memory usage stays strictly bounded at `k` items, quiet periods record nearly every log, and peak periods automatically cap volume. Rose also touches on weighted variants that prioritize specific classes of items, such as error logs, for more nuanced sampling policies. Reservoir sampling cleanly solves a problem that sounds impossible at first glance: fair sampling when you don't know how many items will arrive.

## [Beware the Complexity Merchants](https://chrlschn.dev/blog/2025/05/beware-the-complexity-merchants/)

Charles Chen warns against "complexity merchants": engineers who introduce unnecessary complexity into systems, whether out of ego or to manufacture job security. By building Byzantine systems that only they understand, they carve out personal fiefdoms that constantly demand attention, budget, and headcount, then use the resulting pain to justify their own indispensability and influence—complete with the familiar refrain, "Who else is going to deal with all this complexity?" Chen quotes Ray Ozzie: "Complexity kills. It sucks the life out of developers; it makes products difficult to plan, build, and test."

To push back, the post recommends requiring engineers to stabilize or simplify existing complexity before adding new layers, favoring "boring" battle-tested solutions over resume-driven tech, insisting on thorough documentation so systems can be handed off cleanly, staying skeptical of "silver bullet" pitches, and treating knowledge hoarding or deliberate obfuscation as red flags. The core message is that simple, well-documented systems enable shared team ownership and eliminate the environment complexity merchants rely on to build leverage.

## [Asserting Implications](https://tigerbeetle.com/blog/2025-05-26-asserting-implications/)

This short note from TigerBeetle looks at how to write assertions for logical implications (`A ⇒ B`) so they stay immediately readable. Most programming languages lack a dedicated implication operator, even though implications show up constantly in assertions. The textbook rewrite relies on the equivalence `A ⇒ B ⇔ ¬A ∨ B`, yielding `assert(!a or b);`, which forces the reader to mentally invert the condition to recover the original intent. The author recommends writing a plain conditional instead: `if (a) assert(b);`.

A real example from the TigerBeetle codebase makes the contrast clear: instead of `assert(header_b != null or replica.commit_min == replica.op_checkpoint);`, write `if (header_b == null) assert(replica.commit_min == replica.op_checkpoint);`. The second version states directly which condition triggers the check, making the invariant obvious at a glance. It is a tiny change, but a great reminder to optimize correctness checks for human readability.

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
