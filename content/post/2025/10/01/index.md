---
title: "Newsletter #58"
date: 2025-10-01
tags: ["AI-Assisted", "Event-Driven", "Distributed Systems", "Security", "LLM", "Claude Code", "Career Development"]
categories: ["Newsletter"]
---

*~~Today I tried hooking up [Claude Code Router](https://github.com/musistudio/claude-code-router) to the `openai/gpt-oss-120b` model on [NVIDIA NIM](https://build.nvidia.com/), but it hit some error and produced no output at all. So we're back to `qwen3-coder` running on [iFlow Platform](https://platform.iflow.cn/docs/api-mode).~~ Enjoy Newsletter #58.*

## [How Software Engineers Make Productive Decisions (without slowing the team down)](https://strategizeyourcareer.com/p/how-software-engineers-make-productive-decisions)

Many development teams slow down simply because they treat every decision as if it were irreversible. Author Fran Soto proposes clearly distinguishing between two types: "two-way door" decisions (easy to reverse, such as adding an unused field to an API response, gating a change behind a feature flag, or swapping out an internal library) and "one-way door" decisions (hard or impossible to reverse, such as data migrations, schema changes, security changes, or customer-visible changes that risk data loss). To classify a decision quickly, the article offers three questions: if you're wrong, is the impact unnoticeable, an annoyance, or a disaster; how hard is it to roll back, for instance can you revert within ten minutes using existing alerting; and can you limit the blast radius with a canary, feature flag, or phased rollout?

For reversible decisions, the author advises time-boxing research to 30–60 minutes and then acting, backed by guardrails: feature flags defaulting to off, small pull requests, tests covering both states, canary checks, solid alerting, and a ten-minute rollback playbook. Heavy caution should be reserved for decisions that are genuinely hard to undo. The core takeaway: when risk is low and the change is reversible, ship with guardrails—that's how you move fast without being reckless.

## [Why are Event-Driven Systems Hard?](https://newsletter.scalablethread.com/p/why-event-driven-systems-are-hard)

Event-driven architecture decouples services and makes them easier to scale, but comes with five major challenges. First is event schema evolution: when one service adds or changes a field without coordination, downstream consumers can break; the fix is enforcing backward and forward compatibility rules alongside a schema registry acting as a central dictionary for event formats. Second is observability: because processing flows are split across independent services, seeing the full picture during debugging is difficult; the remedy is distributed tracing with a correlation ID—an identifier attached to the initial event and propagated through every processing step to reconstruct a request's journey.

Third is failure handling: at-least-once delivery prevents message loss when infrastructure hiccups, while a Dead-Letter Queue (DLQ) captures messages that repeatedly fail after a bounded number of retries, preventing infinite error loops and allowing later inspection. Fourth, at-least-once delivery itself means a service may receive the same message multiple times if it crashes before acknowledging completion, so consumers must be idempotent: recording processed event IDs and skipping duplicates (coordinated atomically with business state updates so there is no gap) to avoid bugs like charging a customer twice. Finally, eventual consistency: because data propagates asynchronously across services, both UI and business logic must tolerate systems being temporarily out of sync.

## [Dev Culture Is Dying: The Curious Developer Is Gone](https://dayvster.com/blog/dev-culture-is-dying-the-curious-developer-is-gone/)

The author argues that developer culture is shifting in a troubling direction. Foundational tools like VLC, Linux, Git, and Docker were born out of curiosity and a desire to solve problems, not for profit or clout. He recalls the 2000s, when programmers stayed up all night tinkering with new technology purely to learn, expecting neither commercial reward nor recognition. Today, attention has shifted to metrics like MRR, ARR, DAU, MAU, SEO rankings, and conversion rates, and many developers chase new frameworks out of pressure to look current rather than genuine interest. Intrinsic motivation has gradually given way to external validation.

The post also points to an identity crisis: developers define themselves by their tools, becoming a "Next.js developer" or "Rust developer" instead of by the problems they solve. The author compares consumer software's shift toward subscription models with creators losing ownership of their craft to corporations or growth metrics, asking whether developers still care about the software they build or only about revenue. The closing call to action is to go back to building curiosity-driven projects—even things that can't be monetized—building for the joy of it and sharing them to inspire others.

## [Tool Calls Are Expensive And Finite](https://www.reillywood.com/blog/tool-calls-are-expensive-and-finite/)

Giving LLMs access to tools enables powerful agents, but Reilly Wood reminds us that a tool call is orders of magnitude more expensive than a normal function call in code, and the number of calls you can make is practically finite. Under the hood, a tool call is still text generation: the model emits structured text (JSON) specifying the tool name and arguments, the harness parses it, executes the real function, and appends the result into the conversation history as a new message before the model reasons further. Every call therefore burns output tokens to generate the invocation and consumes context window space because the result stays in history.

The author illustrates this with the task of processing 1,000 user IDs via `get_user_info()`: a programmer would simply write a loop, whereas an agent would have to make 1,000 individual tool calls and would likely exhaust its context window before finishing. The post suggests three remedies: design agents for tasks that don't require many tool calls, build more flexible tools so each call accomplishes more work, or let the agent write and execute code itself—provided proper security sandboxing is in place.

## [Keeping Secrets Out of Logs](https://allan.reyes.sh/posts/keeping-secrets-out-of-logs/)

Allan Reyes examines why secrets like passwords and tokens keep leaking into logs, stressing that there is no "silver bullet" that solves the problem completely—only a combination of "lead bullets," imperfect defenses that complement one another. Six common causes are: forgetting to remove debug log statements; logging entire large objects such as config structs or HTTP responses; changing the global log level and exposing previously hidden details; secrets embedded in URLs; error monitoring tools capturing local variables; and users accidentally typing their password into the username field.

Mitigations include funneling logs through a single pipeline; minimizing, redacting, encrypting, or hashing sensitive data; domain primitives that wrap secrets in dedicated types to prevent accidental logging; read-once objects that lock their value after the first read; log formatters that detect and scrub sensitive patterns; unit tests that fail when sensitive data appears; post-write secret scanners; log preprocessors before storage (such as Vector); static-analysis taint checking; and human training. The broader strategy combines laying a solid foundation, understanding data flows, guarding choke points, layering defenses, and preparing incident response and recovery plans for leaks. The author admits this work is never truly finished because new systems can always bypass existing safeguards.

## [Things I Believe](https://leerob.com/beliefs)

Lee Robinson shares the beliefs that shape how he works. First, shipping fast beats a perfect strategy: speed is a superpower, small teams ship faster, and user adoption matters more than merely pushing code. Careers have no ceiling: persistence beats innate talent, steady daily improvements compound over time, and you should take initiative and be helpful. He values truth-seeking—confronting uncomfortable truths, holding strong opinions loosely, and listening to diverse perspectives.

In his view, communication is the job: clear writing reflects clear thinking, everyone should hone their writing skills, and leaders must clarify ambiguity to prevent misaligned expectations. Leadership doesn't require a title, because influence matters more than position; great leaders both do hands-on work and empower others. Work can also be a hobby when passion is paired with clear boundaries, rather than chasing a mythical "work–life balance." Hiring should be uncompromising—only hire candidates who are a "hell yes" and prioritize growth potential. Finally, always assume good intent, lead with empathy, take criticism objectively, and remember that a working demo is more persuasive than a long memo.

## [How Claude Code is Built](https://newsletter.pragmaticengineer.com/p/how-claude-code-is-built)

Claude Code started as a prototype built by Boris Cherny in September 2024: using Claude to control a terminal via AppleScript, initially just to check what song was playing. Once the team saw the model exploring the filesystem on its own, they realized its product potential. Anthropic began using it internally in November 2024, and within five days half of its engineers were on board; although they considered keeping it internal as a competitive advantage, they released it publicly to advance AI safety research. The team chose TypeScript, React with the Ink framework, the Yoga layout engine, and Bun because these technologies are "on distribution"—things Claude is already great at—allowing roughly 90% of Claude Code's codebase to be written by Claude Code itself.

Architecturally, Claude Code is a thin shell around the model with minimal business logic, running directly on the user's machine without virtualization. The most complex part is the permission system: the tool asks for user approval before irreversible actions, supporting one-time or persistent grants with multi-level configuration across project, user, and enterprise scopes. Prototyping speed is equally striking: when building the to-do list feature, the team tried around 20 different prototypes in just two days. Even as the engineering team doubled in size, completed pull requests per engineer rose by 67%—a metric that usually drops during rapid team growth.

## Bonus: Some cool visuals from [ByteByteGo](https://bytebytego.com/)

![How Java Works](https://substack-post-media.s3.amazonaws.com/public/images/1e27232c-d4f1-4f4b-94fa-7318d39f6f3e_2360x2960.png)
![How Gitflow Branching Works?](https://substack-post-media.s3.amazonaws.com/public/images/9bef6181-7eed-45a9-9c7e-abd6864cc62b_2360x2960.png)
![The Life of a Redis Query](https://substack-post-media.s3.amazonaws.com/public/images/9ffab5bc-5857-4544-8e25-2dbf795e6f85_3000x3900.png)
![Cookies vs Sessions](https://substack-post-media.s3.amazonaws.com/public/images/1c2bd03d-66f2-4eb9-8293-7a1d49b9b9b6_2360x2920.png)
![Access Control Clearly Explained](https://substack-post-media.s3.amazonaws.com/public/images/26b55058-17ae-453f-8463-4d4e717e489b_2360x2920.png)
![How Git Reset Works?](https://substack-post-media.s3.amazonaws.com/public/images/00912640-ad5f-4ec7-aefa-e5eecf67dab0_3000x3900.png)
![Apache Kafka Explained (At the high level)](https://substack-post-media.s3.amazonaws.com/public/images/43b73739-a975-42af-999d-8676b1605ed2_3000x3900.png)

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
