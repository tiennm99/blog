---
title: "Newsletter #103"
date: 2026-05-23
tags: ["AI-Assisted", "Newsletter", "AI", "Career", "Performance", "Algorithms", "Security"]
categories: ["Newsletter"]
---

*Enjoy Newsletter #103.*

## [Drunk Post: Things I've Learned as a Senior Engineer](https://luminousmen.substack.com/p/drunk-post-things-ive-learned-as)

This post preserves a famous r/ExperiencedDevs thread where a data engineer with 10 years of experience got "a little tipsy" and wrote down every career lesson he had learned. The original account has since been deleted, but its rare candor keeps the post widely shared. On career growth, the author argues that switching companies is the most effective way to get promoted, job titles matter less than what you actually accomplish, and the closer you are to the product and revenue, the more valued you are — regardless of how technically complex your work is.

On the technical side, every domain has only about 10–20 core principles, and the fundamentals change very slowly even as tools churn constantly. Good code is code a junior engineer can read and understand, and the best code is code you never had to write at all. Writing documentation is the most underrated skill, right alongside writing proposals for change. For newcomers, SQL is the highest-ROI language; testing is essential, but TDD is overly worshiped. Good engineers know best practices, while senior engineers know when to break them. What the author is proudest of is not any grand system he built, but helping others do better work. The archivist agrees with nearly all of it, except for the author's preference for dynamic languages.

## [How I Use AI to Code](https://www.chrismdp.com/coding-with-ai-april-2026/)

Chris Parsons argues that if you are still tethered to an IDE like Cursor or Copilot, you are a year behind: the best tools have left the editor for the command line, and he recommends Claude Code or Codex CLI. Programming is AI's "home turf" because code can be executed and verified immediately. He distinguishes "vibe coding" (never checking the output) from "agentic engineering" (deliberately deciding which changes require human inspection and which can be entrusted to tests and automated checks). His core message: senior engineers should train AI to write better code rather than manually reviewing every single diff, because the harness surrounding the model matters more than the prompt.

A good harness consists of persistent instructions in CLAUDE.md or AGENTS.md, skill files that both enforce rules and load extra context on demand, a verification loop so the agent can check its own work, and a feedback loop that feeds lessons back into those three components — with all knowledge stored in a dedicated markdown repository. The author also walks back his earlier advice to specify the entire solution up front, calling that waterfall in disguise: specify the problem, not the solution. Output quality hinges on context volume — too little yields generic results, while too much drowns the model in noise. Once code generation is no longer the bottleneck, verification becomes the new bottleneck, giving teams with strong automated testing and CI/CD foundations a massive advantage.

## [Email is crazy](https://samkhawase.com/blog/email-is-crazy/)

Email is one of the most successful communication technologies in history, yet underneath it lies a patchwork system governed by more than 100 RFCs. Sam Khawase traces the journey of a single message from Alice to Bob: the mail client merely "submits" the message to a server, the relay server looks up DNS MX records to find the recipient's mail server, and email is fundamentally a store-and-forward queueing system that retries for days rather than a real-time channel. SMTP was born in an era of trust-based academic networks, so the envelope address (`MAIL FROM`) and the user-visible `From` header are allowed to differ — the root vulnerability that makes phishing and spam possible.

Instead of replacing SMTP, the industry bolted on three authentication layers: SPF (a list of authorized sending IPs, which breaks when mail is forwarded), DKIM (a cryptographic signature whose public key lives in DNS), and DMARC (requiring the domain in the `From` header to align with the domain validated by SPF or DKIM, paired with a policy of none, quarantine, or reject). Messages then pass through each provider's proprietary filtering stack: IP reputation, domain reputation, content analysis, virus scanning, and link checking. Encryption is usually just "Opportunistic TLS": if the receiving server doesn't support `STARTTLS`, the connection falls back to plaintext (though policies like MTA-STS can enforce TLS), and TLS only encrypts the transport hop rather than end-to-end. Worst of all, an email can be silently dropped into a spam folder without notifying anyone — completely legal under RFC 5321. Even so, email reliably delivers billions of messages every single day.

## [High Performance Git](https://gitperf.com/)

*High Performance Git* is a book by Ted Nyman about Git's internal architecture and how to operate massive repositories. Rather than teaching a handful of everyday commands, the book views Git as a stack of layers — a content-addressable database, a filesystem cache, a graph walker, and a wire transfer protocol — and analyzes the performance cost of each layer.

The chapters progress from objects, refs, the index, and history traversal to packfiles, repository maintenance, sparse checkout, partial clone, transfer protocols, operating at scale, troubleshooting, configuration, and data recovery. The book is aimed at anyone who needs Git to stay fast as codebases, histories, and teams grow: build and CI engineers, monorepo maintainers, and developer productivity teams. The entire book is released for free as a PDF under a Creative Commons Attribution-ShareAlike 4.0 license.

## [You can beat the binary search](https://lemire.me/blog/2026/04/27/you-can-beat-the-binary-search/)

Daniel Lemire looks for ways to speed up checking whether a value exists in a sorted array of 16-bit integers — a common operation in Roaring Bitmaps, which currently use binary search. He builds on two observations: modern CPUs (both 64-bit ARM and x64) have SIMD instructions that compare eight 16-bit integers at once, and they have substantial memory-level parallelism, so splitting the array into four parts instead of two can be more effective. This leads to the SIMD Quad algorithm: divide the array into blocks of 16 elements, use a quaternary search on the last element of each block to narrow down the candidate block, and then use SIMD to check all 16 elements in that block simultaneously.

Benchmarks on Apple M4 and Intel Emerald Rapids show SIMD Quad beating binary search across the article's tests: on Intel it is more than 2x faster when the cache is "hot," while on Apple it is more than 2x faster when the cache is "cold." The "quad" step makes almost no difference on Apple, but helps significantly on Intel with large arrays and cold caches. The takeaway: classic algorithms weren't designed for hardware with as much parallelism as today's CPUs, leaving plenty of room for performance gains.

## [How might a browser be developed?](https://aifoc.us/how-might-a-browser-be-developed/)

Paul Kinlan asks: how will browsers be developed in the age of AI? Drawing from experiments building browsers with AI and ultra-fast inference chips, he observes that a comprehensive specification paired with an extensive unit test suite acts as an effective guardrail to keep models on track. In the near term, standards bodies could build a "reference browser" to uncover gaps in specifications and test suites, while browser vendors use AI to implement features from those battle-tested specs. The focus would then shift to writing great specifications, and browsers would differentiate themselves by their vision for the web rather than raw engineering headcount or budget.

His longer-term vision ventures into sci-fi territory: a browser that synthesizes feature implementations on the fly at runtime from markup, or even purely from expressed intent. For instance, instead of waiting on WebBluetooth support, the browser could generate the code to talk to a heart-rate monitor directly from available hardware documentation. That could eliminate polyfills and make accessibility and localization happen by default, but it also threatens the web's core promise: that the same URL delivers roughly the same experience to everyone, since the experience would now depend on each user's device and local model. Kinlan urges the industry to start thinking seriously about this trajectory now.

## [Agentic Coding is a Trap](https://larsfaye.com/articles/agentic-coding-is-a-trap)

Lars Faye warns against the trend of "agentic coding," where AI writes all the code while humans merely plan and orchestrate. The core issue is the "supervision paradox," which Anthropic itself has acknowledged: using AI effectively requires supervising it, yet supervision demands the exact programming skills that atrophy when you overuse AI. Another Anthropic study recorded a 47% drop in debugging proficiency. Unlike past transitions such as moving from assembly to FORTRAN, the skill erosion this time is already visible even among veteran engineers, while junior engineers lose the struggle with code that serves as their most important learning mechanism.

The author argues that AI is accelerating the wrong part of the job: we don't actually need to write code faster, especially code we don't understand, and for many developers, writing code *is* how they think and plan. There is also vendor lock-in risk — when Claude goes down, many teams grind to a halt — and unpredictable token costs, whereas human salaries are fixed. His prescription is to demote AI back to an assistant role: use AI for specs and planning, but write 20% to 100% of the code yourself depending on the task, never generate more code than you can review in a single sitting, and never ask AI to do something you haven't done or couldn't do yourself.

## [Be the Idiot](https://luminousmen.substack.com/p/be-the-idiot)

luminousmen argues that most engineering failures happen because someone was afraid of looking stupid, making clarifying questions not a weakness but a core professional skill. Drawing inspiration from military radio protocols — where the receiver always reads back an order to confirm, not out of incompetence, but because being understood matters more than sounding smart — the author applies two principles to software engineering: repeat critical information across multiple channels such as types, docstrings, and explicit parameter names; and choose unambiguous wording, like `timeout_seconds: 30` instead of `timeout: short`.

The author shares four "dumb" questions that have saved him time and again: what happens when this fails, how do we know it's working properly, what does "done" look like, and can you show me an example? Phrasing matters too: instead of asking "Why are we doing this stupid thing?", ask "Is there a specific reason we're using X here?" — assuming you're missing context rather than assuming the other person is wrong. About 80% of the time he really was missing context, and the other 20% of the time the question sparked a valuable discussion. After all, the only thing more expensive than looking dumb in a meeting is building the wrong thing because nobody dared to ask.

## [3 constraints before I build anything](https://jordanlord.co.uk/blog/3-constraints/)

Jordan Lord shares three constraints he applies before building any product, distilled from 10 years of product work and multiple failures caused by overcomplication or lack of identity. To him, constraints are a catalyst for creativity because they narrow the option space. The first constraint is "one page or nothing": every idea must fit onto a single-page brief that serves as a north star when talking to investors, teammates, or family. If you can't fill one page, the idea isn't ready; if you need more than one page, it's too complicated.

The second constraint: the core technology must be separable from the product. That could be a method, tool, or library that powers the current product but survives if the product pivots — much like Git was created to support Linux kernel development, or Kubernetes at Google. Products pivot, while core technology compounds in value over time. The third constraint: a defining constraint must shape the product and remain immediately visible to the user, like Minecraft being built entirely out of blocks or IKEA's flat-pack self-assembly furniture. It wards off feature creep and creates unmistakable identity. Any idea that fails to pass all three constraints doesn't get built.

## [Swissing a Table](https://philpearl.github.io/post/swissing_a_table/)

Phil Pearl explores the Swiss table — the hash table design behind Go's new map implementation — by evolving a simple open-addressed hash table step by step. First, he replaces linear probing with a quadratic-style probing sequence like Go's; next, he groups 8 key–value pairs into a bucket; then he adds 8 control bytes per group (the highest bit marks an empty slot, while the lower 7 bits store a hash fragment); and finally he uses bitwise SWAR tricks on a 64-bit integer to match all 8 control bytes simultaneously instead of checking slots one by one.

Insertion benchmarks show that a Swiss table doesn't always win: when the table is sparse (around 10–4,000 elements), it is 19–36% slower than the simple table, only pulling ahead as the table fills up and cutting insertion time by up to 71.65% when completely full (32,768 elements). According to the author, the biggest win is that the table can run at high load factors with very little performance degradation — making it primarily a memory-saving optimization rather than a raw speed boost. Go's map currently uses SIMD on amd64 (Intel) but not yet on ARM, so the author saves the SIMD exploration for a follow-up post.

## [The AI engineering stack we built internally — on the platform we ship](https://blog.cloudflare.com/internal-ai-engineering-stack/)

Cloudflare shares the internal AI infrastructure they built over 11 months, running entirely on the same products they sell to customers. Over a 30-day window, 3,683 internal users (93% of R&D) used AI coding tools, driving over 20 million requests through AI Gateway and 241 billion tokens; in some weeks, merge request volume nearly doubled the previous quarter's baseline. The architecture spans three layers. The foundation layer uses Cloudflare Access for zero-trust authentication, AI Gateway for routing, cost tracking, and data retention controls, and Workers AI to serve open-weight models at a fraction of proprietary model costs. A single login command configures everything, and routing traffic through an intermediate Worker from day one let them roll out new features later without touching user-side configs.

The knowledge layer uses Backstage as a service catalog and automatically generates `AGENTS.md` files across roughly 3,900 repositories, describing structure, conventions, and boundaries so agents don't have to guess. The execution layer runs an AI Code Reviewer on every merge request: it classifies risk level, dispatches specialized agents, organizes findings by category and severity, and cites specific rules from the Engineering Codex — Cloudflare's internal engineering standards packaged as agent skills. According to Cloudflare, none of the individual pieces are novel; the differentiator is how they are wired together.

### Bonus

**Images:**
![MCP vs Skills, Clearly Explained](https://substackcdn.com/image/fetch/$s_!7jIm!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5632abfa-88b9-4f40-8feb-13b4a7c6e1ce_2484x3002.png)
![5 Way to Defend Prompt Injection](https://substackcdn.com/image/fetch/$s_!gUOK!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F32f62036-5c89-4686-941e-57d84297de42_2484x3002.png)

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
