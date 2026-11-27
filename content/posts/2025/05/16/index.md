---
title: "Newsletter #29"
date: 2025-05-16
tags: ["AI-Assisted", "Process Optimization", "Vibe Coding", "Cloudflare", "Career Development", "Productivity", "MCP"]
categories: ["Newsletter"]
---

*Welcome to Newsletter #29 - Today's tech news roundup.*

## [A Clean Approach to Process Optimization](https://queue.acm.org/detail.cfm?id=3722546)

Thomas A. Limoncelli opens with an everyday example: how he reorganized doing the dishes at home. Instead of waiting until the start of a wash cycle to add detergent to the dishwasher, he does it right after unloading the clean dishes. Simply reordering the steps made the chore smoother without any extra effort. He then applied this exact mindset to customer onboarding at his company, cutting wait times from several days down to just a few minutes.

The core idea is to split a process into two phases. The slow phase covers generic tasks that can be done in advance before an order arrives; the fast phase handles only the specific customization after the order comes in. Alongside this, review optional tasks, since they are often unnecessary or can be done more efficiently. For junior developers, this is a practical lesson: the same approach applies to software deployment pipelines, infrastructure provisioning, and many other areas, improving both performance and service quality.

---

## [Microsoft's Original Source Code Released for 50th Anniversary](https://www.gatesnotes.com/microsoft-original-source-code)

To mark Microsoft's 50th anniversary, Bill Gates released the original source code for Altair BASIC, the company's first product, calling it the "coolest" code he has ever written. The story began with the January 1975 cover of Popular Electronics featuring the Altair 8800 computer from MITS. Gates and Paul Allen contacted founder Ed Roberts and told him they already had a version of BASIC for the Altair's chip, even though they hadn't written a single line yet. The pair chose to build an interpreter rather than a compiler because running code line by line gave beginners immediate feedback and made debugging easier.

Since they didn't have an Intel 8080 chip, Allen wrote a simulator for it on Harvard's PDP-10 mainframe, Gates wrote the core interpreter, and Monte Davidoff handled the math package. After about two months of working day and night, they squeezed the entire interpreter into just 4 KB of memory using compact data structures and efficient algorithms, because memory at the time cost more than the computer itself. The demo succeeded, MITS licensed the software, and Micro-Soft was born. For developers today, it is a vivid example of optimizing under extreme hardware constraints; Gates tells the fuller story in his memoir "Source Code."

---

## [No code is dead. Long live vibe coding](https://kenneth.io/post/no-code-is-dead-long-live-vibe-coding)

Kenneth Auchenberg makes a blunt call: in 2025, no-code is dead. For a decade, no-code and low-code platforms promised to democratize software creation, yet none truly broke through or replaced traditional programming. Instead, a new generation of tools powered by AI and large language models is emerging, known as "vibe coding." Tools like Bolt, Lovable, and v0 show that generating real, production-grade code from natural-language descriptions is not only viable, but better than drag-and-drop WYSIWYG editors.

According to the author, users turned out not to want "less code"—they wanted a better way to write code. They don't want to be locked into proprietary runtimes; they want real source code, full control, and the freedom to edit and deploy anywhere. The previous generation, such as Webflow and Retool, bundled the editor, hosting, runtime, and UI components into a closed system. Now, large language models can generate clean React code that follows open standards and industry best practices, ready to deploy onto open infrastructure. The author calls this the "unbundling" of no-code.

---

## [Simple, scalable, and global: Containers are coming to Cloudflare Workers in June 2025](https://blog.cloudflare.com/cloudflare-containers-coming-2025/)

Cloudflare announced that Containers will enter open beta in late June 2025. Workers are already the simplest way to deploy software globally, but there are workloads they cannot handle: running user-generated code in arbitrary languages, executing CLI tools that require a full Linux environment, using multiple gigabytes of memory or multiple CPU cores, or lifting and shifting applications from AWS, GCP, or Azure without a rewrite. Containers fill that gap. With just a few lines of Wrangler configuration and `wrangler deploy`, containers spin up on demand near the user, go to sleep after a configurable timeout, and support autoscaling based on CPU usage.

What sets them apart is the architecture: each container is backed by a Durable Object acting as a programmable "sidecar," letting you start, stop, run commands, and monitor container state directly from code. That allows Workers to act as an API gateway, service mesh, or orchestrator for containers without writing Kubernetes operators or configuring a complex control plane. On pricing, users pay only for the time a container actually runs, billed per vCPU, memory, and disk at rates Cloudflare says are competitive with Google Cloud Run. The takeaway: handle the bulk of requests with lightweight, inexpensive Workers, and reach for containers only for heavy workloads that truly need them.

---

## [The types of companies you can work for and what they do for your career](https://www.elenaverna.com/p/the-types-of-companies-you-can-work)

Elena Verna advises choosing where you work intentionally rather than chasing titles or compensation. She breaks companies into six archetypes. "Unicorns" grow around 100% year over year, like early Miro or Figma: the pace is breakneck and burnout is a real risk, but experience there opens many doors. "Tankers" like Google, Apple, and Microsoft run with mature processes, high pay, and abundant training resources—great for starting a career, though roles are highly specialized and progress is slow. "Declining Giants" are in constant reorganization; pressure for results is intense, but advancement can be fast. "Survival Mode" startups haven't found product-market fit yet: autonomy is high and skills broaden quickly, but the risk is steep and the author advises newcomers to avoid them.

The remaining two are "Lifestyle Boats," often bootstrapped, profitable, and sustainably growing like Basecamp, which are great for beginners thanks to a supportive environment; and "Social Good Seekers," where social impact comes before revenue—pay may be lower, but fulfillment is high. To identify which type a company is, ask about headcount, revenue growth over the past three years, and how much runway remains before the next fundraise. At the same time, ask yourself how much change and pressure you can tolerate, whether you need a clearly defined role, and what your current financial priorities are.

---

## [How to Create a Chain Reaction of Good Habits](https://jamesclear.com/domino-effect)

James Clear, author of "Atomic Habits," explains the Domino Effect: when you change one behavior, it sets off a chain reaction that shifts related behaviors too. He shares the story of Jennifer Dukes Lee, who didn't make her bed for over twenty years; after doing it four days in a row, she found herself folding laundry, washing the dishes, and organizing the kitchen cabinets. A 2012 Northwestern University study similarly found that when people cut down their sedentary time, they naturally ate less fat even though nobody asked them to. The effect works for bad habits as well—checking your phone leads to scrolling social media, which turns into twenty more minutes of procrastination.

Clear argues this happens because daily habits are tightly interconnected and because of the principle of commitment and consistency: once we make even a tiny commitment, we tend to follow through because it aligns with our self-image. To deliberately trigger a positive domino chain, start with the small habit you feel most motivated to do and practice it consistently, ride the momentum of finishing one task straight into the next, and when things get hard, break them into smaller pieces and focus on consistency rather than outcomes. Remarkably, the effect doesn't just create new behaviors—it shifts beliefs: each falling domino helps you believe in a new version of yourself and build identity-based habits.

---

## [The Post-Developer Era](https://www.joshwcomeau.com/blog/the-post-developer-era/)

Two years after writing "The End of Front-End Development" when GPT-4 launched, Josh W. Comeau revisits whether we have entered a "post-developer era." His answer is no. The headline figure that "AI writes over 25% of code at Google" is easy to misread, because AI isn't working autonomously—skilled developers are always at the wheel, steering and editing. Meanwhile Devin, pitched as an autonomous replacement for software engineers, completed only 3 out of 20 tasks in an independent team's real-world evaluation. Comeau uses Cursor with Claude Sonnet and finds it impressive, but compares it to cruise control: take your hands off the wheel and the car slowly drifts out of its lane. Non-programmers won't spot subtle bugs and eventually end up stuck with an unmaintainable mess.

The job market remains tough, but Comeau attributes that primarily to high interest rates, waves of layoffs at large tech companies, and the mistaken belief among executives that AI is about to make developers redundant—not to AI actually replacing people. He also worries that newcomers will fall into "vibe coding," endlessly clicking accept without understanding the code. Conversely, if you use AI actively as a personal tutor, there has never been a better time to learn programming, and a "developer renaissance" may follow once companies realize AI is a force multiplier rather than a replacement.

---

## [Everything Wrong With Model Context Protocol (MCP)](https://blog.sshh.io/p/everything-wrong-with-mcp)

Shrivu Shankar examines the flaws and limitations of the Model Context Protocol, the standard for connecting third-party tools and data to AI assistants like Claude, ChatGPT, and Cursor. On protocol security, the initial version didn't define an authentication mechanism and the subsequent specification drew criticism for its complexity; running MCP servers locally over stdio creates a shortcut for less experienced users to download and execute malware; and many servers trust inputs and execute them directly. On user experience, MCP doesn't distinguish risk levels between a tool that reads logs and one that deletes files, offers no token-cost controls, and at the time of writing only returned unstructured text—something later specs addressed.

More serious is the security of the language models themselves. Tool descriptions are typically injected into the system prompt, giving them outsized influence over the agent; a server can silently rename or rewrite tool descriptions after the user has approved them, and data pulled from fourth-party sources—such as a database row—can carry prompt injections. Easy data aggregation also lets employees infer sensitive information from data they are individually permitted to view. Finally, model reliability drops when too many tools are exposed, and simple primitives like listing or reading files fall short of the queries users expect. Shankar concludes that safe adoption requires a secure-by-default protocol, applications that protect users, and users who understand the trade-offs of their choices.

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
