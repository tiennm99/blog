---
title: "Newsletter #7"
date: 2025-03-16
tags: ["AI-Assisted", "Newsletter", "LLMs", "AI Coding", "Cursor", "Security", "Engineering Culture"]
categories: [ "Newsletter" ]
---

*Enjoy Newsletter \#7.*

## [The LLM Curve of Impact on Software Engineers](https://serce.me/posts/2025-02-07-the-llm-curve-of-impact-on-software-engineers)

Sergey Tselovalnikov proposes a hypothesis to explain the sharp divide over how useful LLMs really are: their day-to-day value depends heavily on an engineer's seniority, tracing out a distinct curve. For Junior engineers who are still building their mental models of code, LLMs are a lifesaver when deciphering errors, implementing small features, or upgrading libraries. Yet this is also a danger zone: if they just copy and paste code back and forth without understanding why it works, their fundamental skills can stagnate. Mid-level engineers still write code and pick up new frameworks faster with LLMs, but increasingly run into tasks LLMs can't handle—such as figuring out what a customer actually wants from a vague request, hunting down race conditions in a debugger, or handling a 2 a.m. production outage.

Under this hypothesis, Senior engineers are the most skeptical group. They already hold the system's architecture in their heads, spend a smaller fraction of their day typing boilerplate, and focus on work—roadmapping, debugging gnarly non-reproducible issues, writing design docs—that depends on deep organizational and system context the LLM doesn't have; the more specialized the domain, the sharper the disillusionment. At the Staff+ level, however, the curve bends back up: their job often involves prototyping to blaze trails for other teams, and LLMs drastically speed up building proofs of concept, while their deep expertise lets them immediately spot and untangle whatever corners the model paints itself into. Understanding this curve, the author suggests, builds empathy: the skeptics and the enthusiasts are simply doing very different jobs.

## [You are using Cursor AI incorrectly...](https://ghuntley.com/stdlib/)

Geoffrey Huntley argues that most engineers—from juniors to principals—are using Cursor the wrong way: treating it as a Google replacement, writing bare-bones prompts like "implement XYZ," using it as a text editor rather than an autonomous agent, and failing to realize that you can "program" the probability distribution of an LLM's output. His solution is to build a personal "stdlib" (standard library) of thousands of rules stored in `.cursor/rules/`, where each rule is a structured `.mdc` file defining filters and actions, named with a consistent convention, and composed together like Unix pipes.

With these rules in place, you can shape Cursor's behavior permanently: when Cursor kept suggesting Bazel commands even though the author wanted Nix exclusively, he wrote a `no_bazel` rule to banish Bazel suggestions altogether. Rules also automate development workflows, such as automatically inserting license headers into new files or committing changes once a task is complete. By the author's estimate, current LLMs are only about 45% accurate out of the box and need constant steering, so continuously curating and refining your rule library is the key to getting real leverage out of Cursor.

## [How Do You Spend Your Time?](https://brooker.co.za/blog/2024/02/06/time.html)

Marc Brooker writes for engineers who feel constantly busy and get plenty done, yet worry they aren't spending their time on the highest-value work for their team and projects. His approach is to set an explicit "time budget": pick five or six broad categories of work along with a target percentage of time for each, stay flexible week to week while holding the line over the long run, and review the breakdown periodically with your manager. The act of writing the budget down is the most valuable part, because it forces you to think hard about what success actually looks like in your role. His own buckets include individual technical work (writing, reading, and reviewing code, debugging, design docs), mentoring and teaching, long-term strategy, day-to-day operational rhythm, learning (reading papers, prototyping algorithms), and talking with customers. The exact split matters less than doing the exercise deliberately.

Sticking to a time budget requires learning to say "no." Brooker warns against several traps: chasing high-visibility shiny objects or hype, getting sucked into urgent but low-importance chores, and letting your calendar run away from you—like a senior engineer sitting in 20 hours of meetings a week where nobody sees him contributing much, simply because everyone assumes someone else invited him for a good reason. He applies this same lens at the organizational level and borrows the economics concept of "revealed preference": how we actually spend our hours reveals our true priorities, just like claiming you love salad while ordering a burger every day.

## [We are destroying software](https://antirez.com/news/145)

In a short, manifesto-style post, Redis creator Salvatore Sanfilippo (antirez) lists the ways we are collectively "destroying" software: piling on features and premature optimizations without weighing their complexity cost; adopting convoluted build systems; assembling absurd dependency chains that leave everything bloated and fragile; telling junior programmers "don't reinvent the wheel" when reinventing the wheel is precisely how you learn how wheels work—and the first step toward inventing better ones; abandoning API backward compatibility; pushing rewrites of battle-tested code that already works; and chasing every new language, paradigm, and framework fad.

He also criticizes the habit of underestimating the cost of wrestling with sprawling third-party libraries compared to writing a focused solution yourself, assuming generic industry standards are always better than custom-fit designs, dismissing code comments as useless, and treating software as a purely mechanical engineering discipline. We build systems that cannot "scale down"—where simple things ought to remain simple—and optimize for coding velocity over design quality. The end result, he warns, is a field stripped of the joy of hacking.

## [Nontraditional Red Teams](https://zachholman.com/posts/red-teams)

Former GitHub engineer Zach Holman expands the concept of a "red team" (adversarial testers who probe a system for weaknesses) beyond cybersecurity to three everyday roles every product team should have. First is the person who checks whether a new graphic or logo accidentally looks like genital or NSFW imagery: GitHub once came dangerously close to printing its very first highway billboard with an illustration that looked uncannily like the infamous "goatse" shock image, even after dozens of employees had signed off on it. After that near miss, major design launches at GitHub included a dedicated review step asking how a visual might be misread, mocked, or abused out of context. Second is the ad-blocker user, who speaks up whenever a site breaks navigation simply because a tracking script or HTML snippet got blocked—one of the most frustrating experiences on the modern web.

Third is the password-manager user. Holman vents about how many teams botch even the most basic login forms with custom inputs that prevent 1Password and similar tools from autofilling credentials. None of these are fatal showstoppers since determined users will eventually work around them, he notes, but they are completely avoidable self-inflicted wounds. When a team is heads-down shipping new features, it's easy to miss these rough edges—which is why having an adversarial "red team" look at the product with fresh, skeptical eyes pays off.

## [AI or Die](https://www.rkg.blog/ai-or-die.php)

Ravi Gupta (RKG) opens with Anthropic CEO Dario Amodei's prediction that as early as 2026 we could see AI models smarter than a Nobel Prize winner across most disciplines, capable of autonomously executing multi-day tasks and running millions of instances in parallel at 10x to 100x human speed—"a country of geniuses in a datacenter." Gupta asks: is your company ready to harness that capability, or compete against companies that do? Even today's models can already perform a substantial share of economically valuable work, yet most people barely scratch the surface because they lack ambition, lack the patience to supply rich context, and lack clear thinking and communication.

To prepare, RKG recommends dedicating a full week to studying what AI can do today and where it is heading; tasking a tiny group to build an "AI-native" version of your product with a team 10x to 100x smaller; accepting that customers will soon demand dramatically better products at a fraction of the price; going "AI-first" with the same urgency Facebook once brought to mobile; and auditing every role in the organization to understand who will be supercharged by AI and which functions will be replaced. This isn't an incremental tweak, he argues, but a full-scale "refounding" of the company—harder the larger and more successful you already are, yet essential to meet a future where, as Sam Altman put it, "maybe everyone on earth will be able to accomplish more than the most impactful person can today."

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026; reviewed and edited by Codex with GPT 6.1 Sol on 09/11/2026, and re-verified by Claude Code with Sonnet 5.5 on 16/11/2026.*
