---
title: "Newsletter #31"
date: 2025-05-18
tags: ["AI-Assisted", "Testing", "CI/CD", "Hiring", "LLMs", "Security", "Career Growth"]
categories: ["Newsletter"]
draft: false
---

*Welcome to Newsletter #31.*

## [Optimizing Our E2E Pipeline](https://slack.engineering/speedup-e2e-testing/)

Slack's DevXP team shares how they optimized the end-to-end (E2E) test pipeline for the company's largest monorepo. Previously, each run took about 10 minutes, with nearly half of that spent building the frontend—even when a change didn't touch frontend code at all. With hundreds of pull requests merged daily, that produced thousands of builds per week, each taking nearly 1 GB on AWS S3 and adding up to terabytes of duplicate artifacts.

Their solution used tools they already had: run `git diff` with three-dot syntax to compare the current branch against its merge-base with `main`; if no frontend files changed, skip the build step and reuse a recent production build served through an internal CDN. Even in a repository with over 100,000 files, detecting changes and locating a matching build takes under 3 seconds. As a result, total builds dropped by 60%, saving hundreds of compute hours per month and several terabytes of storage, while average build time fell from about 5 minutes to 2 minutes (and combined with an earlier Webpack upgrade, from 10 minutes down to 2 minutes overall). As an unexpected bonus, tests also became more stable and less flaky. The takeaway: regularly question which pipeline steps are actually necessary, even in systems that aren't visibly broken.

---

## [DoorDash's Fast Travel Estimates](https://careersatdoordash.com/blog/doordash-fast-travel-estimates/)

DoorDash engineers explain how they estimate travel distance and duration in milliseconds—a core input for finding nearby stores, predicting delivery ETAs, calculating fees, and matching dashers. Calling a routing engine like OSRM directly typically takes over 100 ms, which is too slow for latency-sensitive paths like homepage refreshes or search ranking, while straight-line (haversine) distance is fast but inaccurate because it ignores real road networks.

Their answer is Geo-Grid-Cache: partition the entire service area into hexagonal cells using the H3 spatial index, then precompute travel times between cell centers with OSRM under average traffic conditions. Each pair is stored across three resolution tiers—fine for trips under a mile, medium, and coarse for distances up to 100 miles—balancing cache hit rate, storage cost, and accuracy. At request time, the system looks up the pair in a Redis cluster and picks the highest resolution available. The hardest part was generating offline data for roughly 6 billion cell pairs; the team ran Spark on Databricks and installed OSRM directly on the cluster nodes to replace network calls with local HTTP calls, speeding up generation by 10x. The result is ultra-low latency, accuracy close to the internal routing engine, and major compute savings.

---

## [Tech Hiring: Is This an Inflection Point?](https://blog.pragmaticengineer.com/tech-hiring-is-this-an-inflection-point/)

Gergely Orosz (The Pragmatic Engineer) highlights a paradox: even though fewer companies are hiring and more candidates are competing for roles, many engineering managers say 2025 is the hardest hiring market they have ever seen. A telling case is maestro.dev, a fully remote startup: every LinkedIn job posting draws hundreds of mostly unqualified applications, cover letters are almost universally AI-generated, and many candidates read answers straight from AI tools during live coding interviews. When the team switched to a take-home assignment, the head of engineering embedded a hidden prompt instruction aimed at AI assistants inside the spec—all four submissions followed the hidden instruction, even though three of the candidates insisted they hadn't used AI. The most reliable signal came instead from candidates who reached out directly to explain why they wanted to join.

Another remote company had to fire a senior data engineer after just two weeks upon discovering the person had fabricated their experience and used multiple AI tools simultaneously to pass the interview loop. That company is now considering adding a final in-person interview round despite the $1,500–$2,000 cost per candidate, while leaning harder on referrals since 4 of its last 5 hires came through internal recommendations. The post also covers LinkedIn Recruiter costs of $5,000–$20,000 per seat per month, the rise of paid "work trial" weeks, and the need to redesign remote hiring from the ground up in the AI era.

---

## [Underusing Snapshot Testing](https://matklad.github.io/2025/04/15/underusing-snapshot-testing.html)

Aleksey Kladov (matklad), creator of rust-analyzer, explains why he thinks he still underuses snapshot testing. The idea is straightforward: serialize a test's output into text, compare it against an expected string literal embedded right in the source file, and use a tool to automatically update that literal from the actual output. The obvious benefit is easy maintenance when requirements change: the tool rewrites the expected output so the author can review the diff instead of editing strings by hand.

What surprised him came from implementing permutation encoding in Zig—a problem whose requirements never change. With traditional assertion-based tests, execution stops at the first failure and the output is buried in a terminal window far from the code. Switching to inline snapshots surfaced every wrong result right inside the source file, letting him see the full picture at once and quickly spot two off-by-one bugs. In his view, snapshot tests keep data close to the programmer, tighten the feedback loop, and act like a repeatable REPL, speeding up development even when requirements are fixed. The end of the post also explains why a handful of concrete examples remain valuable alongside exhaustive testing over all permutations.

---

## [Principles for coding securely with LLMs](https://www.seangoedecke.com/ai-security/)

Sean Goedecke argues that LLM security shouldn't be treated as a long checklist of disconnected threats, but derived from a single principle: LLMs sometimes act maliciously, so treat their output like untrusted user input. Prompt injection is fundamentally unavoidable—the moment you bring third-party content (web pages, docs, Cursor rules files) into the context window, you give its author a chance to steer the model, and no model is immune to jailbreaks.

From that principle, every tool an LLM is allowed to call should be scoped and authorized like a public user-facing API: for example, expose `fetch_messages()` rather than `fetch_messages(user_id)` so the model cannot read another user's messages, and require explicit human confirmation for high-impact actions like sending messages or transferring money. MCP servers are effectively remote libraries, meaning you are trusting the server's owner, not just its interface. Even without an attacker, LLMs can hallucinate or take reckless actions, so human approval gates must be enforced in tool code rather than requested in the prompt. Goedecke also notes risks from fine-tuned or self-trained models (goal misalignment or leaking sensitive training data) and denial-of-service (DoS) attacks, since LLM calls are slow and GPU-heavy—cap concurrent sessions, token budgets, and tool access accordingly.

---

## [How I don't use LLMs](https://www.gleech.org/llms)

Gavin Leech, an AI PhD, candidly explains why he rarely uses LLMs for intellectual work despite knowing firsthand how capable they are. Every time a new frontier model comes out, he tries it, and every time it confidently makes a serious error within the first few minutes. His reasons include loving writing enough that editing weak prose takes more effort than drafting from scratch, already having solid foundational knowledge across many fields, needing high accuracy and reliability when learning, disliking the model's voice and habit of bluffing, worrying about skill atrophy, and not writing much code at the time.

Even so, he still uses LLMs in specific situations: as a search replacement (only when citations are provided), for tip-of-the-tongue term recall, finding entry-point keywords in an unfamiliar field, semantic search over document collections, validating and converting JSON to CSV, getting past blank-page syndrome, and especially writing Matplotlib code or untangling Docker, WSL, and Cloudflare issues. To bypass model sycophancy, he frames his own ideas as if they came from someone else. The post strikes a balanced, self-critical tone: Leech admits part of the problem may be his own impatience, while warning that LLMs can quietly plant a few plausible falsehoods in your head every day.

---

## [How Senior Software Engineers Can Learn from Junior Engineers](https://www.infoq.com/news/2025/04/software-engineers-learning/)

This InfoQ piece summarizes Beth Anderson's QCon London talk on what senior engineers can learn from junior teammates. She notes that steep power distances on a team make junior engineers hesitant to speak up even when they spot a problem with serious consequences, stifling innovation and collaboration. Rather than treating mentorship as a one-way street, senior engineers should recognize that junior colleagues often bring high energy, fresh perspectives, and up-to-date skills.

To build an inclusive culture, Anderson recommends active listening, amplifying others' voices, crediting contributions, and creating the psychological safety needed for juniors to ask questions freely. One concrete practice is "reverse feedback": asking junior engineers to critique how seniors communicate with them, asking how they prefer to learn, and inviting them to review senior engineers' code and pull requests as a learning exercise. She also urges juniors not to repeat the dismissive behaviors that once frustrated them when they become seniors themselves, because seniority is not about authority—it is an opportunity to create positive change. Every engineer, at every level, has a perspective worth learning from if we are willing to listen.

---

## [As an engineer, I'd rather be called stupid than stay silent](https://shiftmag.dev/asking-questions-engineering-career-advice-4895/)

Marko Antanaskovic recounts overcoming imposter syndrome while working as a Customer Support Engineer at Infobip. Opening with a fictional incident call packed with impenetrable jargon, he captures a familiar feeling: not understanding what the developers are saying, yet staying quiet out of fear of looking stupid while the customer waits for an update. Realizing nobody could know everything across such a massive platform—and that no textbook covered it—he decided to tap the knowledge of his colleagues by asking "stupid" questions like "What does that actually mean?"

Antanaskovic points out the real cost of silence: prolonged outages because nobody connects the technical symptom to customer impact, poor work caused by misunderstood requirements, and meetings that sink into awkward silence. To build a questioning culture, he suggests being the first to ask, shifting from blame to education in the spirit of a blameless culture, and trusting the people around you. That willingness to look "stupid" helped him build enough deep system knowledge to transition into a Reliability Operations Engineer role. His closing takeaway: no sincere question is stupid, and it is far better to risk looking foolish than to stay silent and make preventable mistakes.

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
