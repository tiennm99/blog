---
title: "Newsletter #32"
date: 2025-07-21
tags: ["AI-Assisted", "Claude Code", "AI Coding", "Windsurf", "Vibe Coding", "Web Development", "Software Architecture"]
categories: ["Newsletter"]
draft: false
---

*It's been a while since I last wrote a post. And honestly, my earlier newsletters felt a bit like "chasing KPIs"—~~I just stuffed in a ton of links and let an AI Agent do the rest~~. This time I'll curate the articles more carefully, ~~though I'm still letting AI do the writing because I'm lazy hehe =)))~~. Hope you enjoy it. Welcome to Newsletter #31.*

## [Claude Code: Best Practices for Agentic Coding](https://code.claude.com/docs/en/best-practices)

This is Anthropic's official guide distilling effective workflows for Claude Code—an agentic coding environment that can read files, run commands, edit code, and work through problems while you supervise or steer. Most of its advice stems from a single constraint: the context window fills up fast, and response quality degrades as it fills. That makes giving Claude a way to verify its own work—such as a test suite, a build command, or screenshots to compare against—the single highest-leverage thing you can do, letting it iterate until the check passes instead of forcing you to catch every mistake yourself. For complex tasks, split the work into four phases: explore, plan (using plan mode), implement, and commit; for small fixes like a typo, just ask it to make the change directly.

The guide also recommends writing specific prompts (naming files, edge cases, and existing project patterns) and configuring the environment thoughtfully: a concise `CLAUDE.md` with project commands, conventions, and gotchas; an allowlist of safe permissions; CLI tools like `gh`; MCP servers; hooks for deterministic checks; and skills or subagents for specialized knowledge. During a session, course-correct early, run `/clear` between unrelated tasks, and delegate exploratory research to subagents to keep the main context clean. Once you have the basics down, you can scale out with non-interactive `claude -p` runs, parallel sessions, and an independent review pass before considering a task done.

---

## [OpenAI, Windsurf, and the future of work](https://www.subtle.so/openai-windsurf-and-the-future-of-ai-workspaces.html)

This post on Subtle analyzes reports that OpenAI wants to acquire Windsurf for around $3 billion, after previously eyeing Cursor. Technically, Windsurf's core product (a VS Code fork with an AI agent and code autocomplete) isn't uniquely hard to build, so the real value lies elsewhere: tools like this can become general-purpose AI workspaces far beyond coding. They give AI direct access to files and folders to assist with writing, research, and content management, while baking in Git for version history—something traditional productivity suites still lack. For instance, The Pragmatic Engineer connected Windsurf to a PostgreSQL database to query business metrics in plain English. The author compares this trajectory to how IRC evolved from a niche developer tool into Slack's $27 billion business.

On top of that, interaction data from millions of Windsurf sessions provides valuable training signal that could help OpenAI's models catch up with Anthropic on coding benchmarks. The competitive web is tangled too: Microsoft owns both VS Code and GitHub Copilot while backing OpenAI, even as OpenAI's startup fund has invested in Cursor. All of it points to a rapidly consolidating AI developer-tools market with massive commercial expectations.

---

## [Vibe Coding is Not an Excuse for Low-Quality Work](https://addyo.substack.com/p/vibe-coding-is-not-an-excuse-for)

Addy Osmani argues that "vibe coding" with AI is a useful accelerator, but not an excuse to abandon software engineering rigor. AI can generate huge amounts of code in minutes, yet volume does not equal quality: vibe-coded projects routinely skip error handling, miss security flaws, resist maintenance, and collapse like a "house of cards." As Osmani puts it, speed means nothing if the wheels come off mid-drive, because technical debt compounds quickly when nobody is watching the architecture.

His recommended mental model is to treat AI like a blazingly fast junior developer: a human still needs to review every output, refactor when needed, cover edge cases, and write thorough tests. He lays out practical rules: always review AI-generated code, enforce coding standards, use AI for acceleration rather than decision-making, prioritize testing, iterate and refine, recognize when to write code by hand, and document carefully. Vibe coding shines for rapid prototypes, throwaway scripts, learning a new stack, or generating boilerplate, but falls short for enterprise systems, mission-critical software, or long-lived codebases. That is also why experienced engineers get more out of AI—they know enough to spot flaws and refine its suggestions.

---

## [Event-Hidden Architectures](https://skiplabs.io/blog/event-hidden-arch)

Charles Zedlewski, an advisor to SkipLabs, argues that event-driven architecture—long treated as the default for distributed cloud applications—is showing its age, and proposes replacing it with "event-hidden" architectures. Distributed applications aren't going away, but forcing developers to manage events by hand creates constant friction: juggling complex asynchronous flows, maintaining queues and schemas, and debugging across service boundaries. In his view, that complexity was a necessary tax around 2020, but no longer has to be.

Three categories of technology make this shift possible: on the frontend, React and modern state-management libraries; on the backend write path, durable execution engines like Temporal, Restate, and DBOS that guarantee correctness across service boundaries; and on the read path, reactive frameworks like Skip that aggregate distributed data efficiently. What they share is hiding infrastructure plumbing, handling asynchrony transparently, and treating state as a first-class concern. That lets developers write simpler, more maintainable code while gaining better observability, cleaner state management, and the ability to replay application execution. Zedlewski predicts event-hidden architectures will become the default for web applications over the next decade.

---

## ~~[Lessons from Distributed Systems](https://www.16elt.com/2025/04/19/lessons-from-distributed-systems/)~~

~~This post from 16elt.com shares practical lessons from building and operating distributed systems at scale. The author distills hard-won experience around common failure modes and how to handle them when working with distributed architectures.~~

~~**Key takeaways:**~~
~~- Isolate cache clusters: avoid sharing a single cache cluster across multiple services because a heavy workload from Service A can evict critical data needed by Service B, causing hard-to-diagnose performance issues~~
~~- Use message queues: queues absorb traffic spikes and smooth service load, providing buffering and resilience between services like "a responsible adult in the room" that prevents service overload~~
~~- Measure end-to-end latency: look beyond service response times to include "dequeue latency"—how long messages sit waiting in a queue before processing begins~~
~~- Design for failure: expect and plan for network and service failures by implementing retry policies, circuit breakers, and dead-letter queues for failed messages~~
~~- Ensure idempotency: assume duplicate messages will happen and design handlers to process repeated events gracefully, since message queues typically guarantee "at least once" delivery~~
~~- Distributed systems demand proactive design, robust monitoring, and resilient architecture to keep complexity and failure points under control~~
~~- Monitoring and observability are key to understanding how a system actually behaves in production~~

---

## ~~[Better error handling](https://meowbark.dev/Better-error-handling)~~

~~This post from meowbark.dev explores modern error-handling approaches in software development, from traditional try/catch blocks to Go-style error returns and monadic Result types. The author weighs the pros and cons of each style and offers guidance on choosing the right fit.~~

~~**Key takeaways:**~~
~~- Three main approaches to error handling: traditional try/catch, Go-style return tuples, and monadic Result types~~
~~- Challenges of traditional error handling: lack of type safety, unpredictable control flow, and limited integration with the type system~~
~~- Go-style approach: return errors as part of a tuple, handle failure scenarios explicitly, and attach clear error context~~
~~- Monadic Result approach: treat errors as values using container types like `Result<T,E>`, enabling functional-style error chaining~~
~~- Core best practices: distinguish recoverable from unrecoverable errors, wrap external library errors early, and use type-safe error-handling mechanisms~~
~~- Weigh performance and developer experience when picking a strategy~~
~~- Recommended techniques: use libraries like `neverthrow` for structured error management, and implement error mapping and transformation~~
~~- Build centralized error-handling layers to manage failures systematically~~
~~- Choose an error-handling strategy that balances type safety, readability, and team familiarity~~
~~- Maintain clear error communication and recovery paths across the application~~

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026.*
