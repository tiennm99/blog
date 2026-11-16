// The translate skill trusts translation-check to catch a translation that lost
// or altered an entry, so these cases pin what it accepts and what it rejects.

import assert from "node:assert/strict";
import { test } from "node:test";

import { bundleUrl, compareTranslation, translationPath } from "./translation.js";

const VI = `---
title: "Newsletter #7"
date: 2025-03-16
tags: ["AI-Assisted", "Go"]
categories: ["Newsletter"]
---

*Mời bạn thưởng thức Newsletter #7.*

## [Some Article](https://example.com/a)

Tác giả giải thích \`x](y\` và [mục sau](#phần-hai), xem [tệp](data/a.txt) hoặc [trang chủ](/).

\`\`\`go
break outer // thoát vòng ngoài
\`\`\`

## ~~[Bài bị gạch](https://example.com/struck)~~

### Bonus

**Images:**
![Some Diagram](https://example.com/d.png)
`;

const EN = `---
title: "Newsletter #7"
date: 2025-03-16
tags: ["AI-Assisted", "Go"]
categories: ["Newsletter"]
---

*Enjoy Newsletter #7.*

## [Some Article](https://example.com/a)

The author explains \`x](y\` and the [next section](#part-two), see [the file](/post/2025/03/16/data/a.txt) or [home](/en/).

\`\`\`go
break outer // exit the outer loop
\`\`\`

## ~~[Struck Article](https://example.com/struck)~~

### Bonus

**Images:**
![Some Diagram](https://example.com/d.png)
`;

const OPTS = { bundleUrl: "/post/2025/03/16/", lang: "en" };

test("a faithful translation passes", () => {
  assert.deepEqual(compareTranslation(VI, EN, OPTS).problems, []);
});

test("a changed tag is reported", () => {
  const { problems } = compareTranslation(VI, EN.replace('"Go"]', '"Golang"]'), OPTS);
  assert.equal(problems.length, 1);
  assert.match(problems[0], /^frontmatter: tags differs/);
});

test("a translated entry heading is reported", () => {
  const { problems } = compareTranslation(VI, EN.replace("[Some Article]", "[An Article]"), OPTS);
  assert.deepEqual(problems, [
    "entry 1: source ## [Some Article](https://example.com/a) / translation ## [An Article](https://example.com/a)",
  ]);
});

test("a dropped entry is reported", () => {
  const dropped = EN.replace("![Some Diagram](https://example.com/d.png)\n", "");
  const { problems } = compareTranslation(VI, dropped, OPTS);
  assert.ok(problems.includes("link missing: https://example.com/d.png"));
  assert.ok(problems.some((p) => p.startsWith("entry 2:")));
});

test("a dropped code block is reported", () => {
  const noCode = EN.replace(/```go[\s\S]*?```\n/, "");
  assert.ok(compareTranslation(VI, noCode, OPTS).problems.includes("code blocks: source 1, translation 0"));
});

test("paths", () => {
  assert.equal(translationPath("content/post/2025/03/16/index.md", "en"), "content/post/2025/03/16/index.en.md");
  assert.equal(translationPath("content/_index.md", "en"), "content/_index.en.md");
  assert.equal(bundleUrl("content/post/2025/03/16/index.md"), "/post/2025/03/16/");
  assert.equal(bundleUrl("content/_index.md"), "/");
});
