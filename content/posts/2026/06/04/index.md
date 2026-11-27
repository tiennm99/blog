---
title: "Newsletter #108"
date: 2026-06-04
tags: ["AI-Assisted", "AI Coding", "Software Engineering", "Developer Productivity", "Mental Models", "Code Quality", "Testing"]
categories: ["Newsletter"]
---

*Enjoy Newsletter #108.*

## [Coding is solved? Software is not.](https://arcplane.ai/journal/software-is-not-solved)

Opening with Boris Cherny's (creator of Claude Code) remark that coding is "basically solved," Arcplane's Gao argues that the statement is true but incomplete. Coding is merely translating instructions into source code, whereas software development is turning ambiguous intent into a reliable system — a process of progressively reducing entropy. The paradox is that fast AI code generation can actually increase entropy: massive test suites that only validate whatever implementation the agent happened to pick, and plausible-sounding plans that leave core product decisions unresolved. Code arrives sooner, but the team doesn't reach confidence any sooner — the bottleneck simply shifts to review, reconstructing the agent's intent, and interpreting noisy verification evidence.

Drawing on experience running an authentication product managing millions of identities, the author points to four things that need to change. First, context must be curated deliberately, and review feedback must be captured for future runs. Second, specifications must live alongside the work and be updated as new edge cases surface, because an agent will happily build a complete implementation of an ambiguous requirement. Third, verification evidence must be clear enough for a reviewer to see what the agent ran, what failed, and how it fixed it. Fourth, humans need well-placed checkpoints — especially before deployment — because "clean code cannot save a bad spec," and review depth should scale with risk.

## [Ideas](https://www.noahzender.com/ideas)

Rather than a single essay, this is Noah Zender's index page collecting nearly 500 mental models, patterns, and frameworks distilled from hundreds of books, podcasts, and videos. The ideas are organized into 11 categories: mental models and decision-making, knowledge and learning, creativity and writing, product and startups, brand and marketing, tech innovation and AI, investing and economics, psychology and self-improvement, work and leadership, philosophy and worldview, plus an uncategorized bucket. Each entry links to a short standalone page, reading more like a personal knowledge base than a linear article.

A representative example is the "Leveraged Expert" concept, which argues that *when* you specialize matters just as much as *what* you specialize in. Every technology adoption curve has an inflection point where growth either crosses into the mainstream or rapidly fizzles out. If you are already an expert in a field right as it hits that inflection point, your leverage compounds automatically as adoption takes off without requiring extra effort on your part. Specializing too early in a field that is still too nascent yields much lower leverage; the sweet spot is the early-adopter phase, where the surface area for luck is highest. For younger developers, it's a useful lens when deciding which technologies to invest in deeply.

## [AI productivity debate](https://newsletter.getdx.com/p/ai-productivity-debate)

This article from DX's Engineering Enablement newsletter recaps the closing panel of the DX Annual conference, featuring engineering leaders and researchers from Etsy, Twilio, GitHub, Google, and DX. Asked whether AI will mean needing fewer engineers, most panelists disagreed: demand for software rises as the cost of building it falls, so total builder headcount won't shrink even if the definition of an engineer evolves. On technical debt, opinions split: Twilio's representative viewed AI as an amplifier (garbage in, garbage out), while Brian Houck warned that organizations are optimizing for PR velocity over simplicity, accumulating "comprehension debt" as humans understand less and less of a codebase largely written by AI.

The panelists opposed top-down AI mandates: Twilio simply pre-installed tools and offered basic guidance yet still saw adoption surge, whereas mandates tend to breed superficial compliance. Using AI utilization as an individual performance metric was roundly rejected by engineers. As for bottlenecks, developers spend only about 14% of their time writing code, so the real constraints remain decision-making, prioritization, and product design; code review mostly feels slower because code is being generated faster. Finally, most adoption hurdles are human and cultural: leaders need to give engineers dedicated time to learn, and two-week group learning sprints proved far more effective than isolated solo tinkering.

## [Maintainability sensors for coding agents](https://martinfowler.com/articles/sensors-for-coding-agents.html)

Birgitta Böckeler (Thoughtworks) shares hands-on experiments with maintainability "sensors" that help both humans and AI coding agents gauge code quality, building on the concept of "harness engineering." Her testbed was a TypeScript, Next.js, and React dashboard rebuilt entirely with AI and given almost no up-front code-quality instructions, designed to see how far an agent could get relying solely on feedback from sensors like the type checker, ESLint, Semgrep, `dependency-cruiser`, the test suite, and mutation testing. With ESLint, she enabled rules capping parameter counts, file length, function length, and cyclomatic complexity, rewriting error messages into actionable remediation instructions and allowing the agent to suppress warnings only if it attached an explicit justification for reviewers.

`dependency-cruiser` helped the agent respect layered module boundaries and self-correct violations. Raw coupling metrics, by contrast, proved noisy and poorly interpreted by AI because "good" versus "bad" coupling depends heavily on context — whereas an AI modularity review guided by a strong prompt caught valuable issues like duplicated route logic and misplaced responsibilities. For AI-generated tests, high line coverage did not guarantee quality: some files hit 100% statement coverage without a single true unit test, and only mutation testing exposed the missing assertions. Böckeler concludes that computational sensors work best at the file and function level, while cross-module design issues require AI to supply semantic interpretation. Sensors boost confidence in agent output, but they still cannot replace human judgment.

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026.*
