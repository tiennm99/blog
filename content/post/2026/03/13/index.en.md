---
title: "Newsletter #88"
date: 2026-03-13
tags: ["AI-Assisted", "Newsletter", "Debugging", "Web Performance", "Frontend", "Code Quality", "Browser Rendering"]
categories: ["Newsletter"]
---

*Enjoy Newsletter #88.*

## [A Broken Heart](https://allenpike.com/2026/a-broken-heart/)

Allen Pike recounts a memorable debugging war story: the dashboard of a web app his team was building suddenly started taking ten seconds to load instead of one. He immediately suspected React and asked Claude to audit the components, but fixing redundant renders and missing memoization barely moved the needle. Digging deeper, he noticed the slowdown only happened in Safari, where the profiler showed the browser spending 94% of CPU time in Layout—over 1,600ms per pass, roughly 100 times slower than normal. Pairing binary search with a coding agent, he systematically stripped out pieces of the UI to narrow down the culprit. Within about ten minutes, the offender emerged: a single heart emoji ❤️ inside a "Send Feedback" button. Removing the emoji dropped Layout time to 2ms.

With the coding agent's help, he quickly put together a minimal reproduction for a bug report and uncovered the root cause: Google's Noto Color Emoji webfont, which had been added so emojis would render consistently on Linux. The font uses the COLRv1 format and falls back to embedded SVGs on browsers that don't support it, including Safari; the WebKit team confirmed the bottleneck was inside Apple's CoreSVG. The bug was even glyph-specific: ❤️ and 🤯 took 1,600ms, while 🧺 and 🫠 took just 0.2ms. The workaround was placing `"Apple Color Emoji"` ahead of `"Noto Color Emoji"` in the `font-family` stack. The punchline: Claude was the one that had suggested adding Noto Color Emoji in the first place, prompting the author to compare coding agents to a chainsaw—wildly productive, and proportionally dangerous.

## [Wrapping Code Comments](https://matklad.github.io/2026/02/21/wrapping-code-comments.html)

In this short note, matklad makes two observations about line wrapping: code and comments should be wrapped at different widths, and comment width should be measured relative to where the comment starts. A hard limit around 100 columns makes sense for code because it still fits two editor panes side by side, whereas prose reads best at around 60–70 columns. The apparent contradiction disappears once you account for indentation eating into the line and code being much sparser horizontally than prose. Accordingly, the author wants code lines wrapped at 100 columns and comment text wrapped at roughly 70 columns; deeply indented comments shift to the right while keeping the same measure of text, as long as the total line length stays under 100.

Simple as that sounds, popular editors don't support it well: VS Code's Rewrap extension lets you configure a separate width for comments, but measures it from column zero, making deeply indented comments narrower and narrower, while Emacs's `M-q` doesn't wrap comments to a relative width by default either. The author also explains why soft wrapping in the editor isn't a substitute: proper wrapping requires understanding the structure of the text—for example, a wrapped line inside a Markdown list item needs to align with the item's indentation, which only works when the comment is parsed as Markdown.

### Bonus

**Images:**
![RabbitMQ vs Kafka vs Pulsar](https://substackcdn.com/image/fetch/$s_!h2M_!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1d6d88ea-4355-4f29-96fa-9770907beebb_2360x2960.png)
![REST vs GraphQL](https://substackcdn.com/image/fetch/$s_!8P-v!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6039d506-e02f-4313-ab97-2c04f8c94d90_2360x2960.png)
![Eventual Consistency in Modern Databases](https://substackcdn.com/image/fetch/$s_!yela!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5ac3310f-e380-48c2-93ff-051f7606b533_2250x2624.png)
![Strong Consistency In Databases](https://substackcdn.com/image/fetch/$s_!vB9v!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbc02c74f-e91f-438a-8ad8-d5ba6831e7f0_2250x2624.png)
![PostgreSQL versus MySQL](https://substackcdn.com/image/fetch/$s_!h8d0!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc5f67fe5-0efa-4fc6-98da-d176b60b1a92_2508x3000.jpeg)
![Network Protocols Explained](https://substackcdn.com/image/fetch/$s_!_roW!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdbdb9cae-3bda-4a62-9077-3f9d1e13fede_2360x2960.jpeg)

**Videos:**
[Video: What Is Redis Really About? - ByteByteGo](https://www.youtube.com/watch?v=z_NbVtbgBJw)

---

*This post was rewritten by Claude Code with Opus 5.5 on 27/09/2026.*
