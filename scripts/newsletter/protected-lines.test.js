// The rewrite skill trusts protected-lines to keep the author's handwritten
// lines safe, so these cases pin what counts as protected and prove the
// --against check catches a dropped or edited line.

import assert from "node:assert/strict";
import { test } from "node:test";

import { classifyPost, findMissing } from "./protected-lines.js";

const POST = `---
title: "Newsletter #7"
date: 2025-03-16
tags: ["AI-Assisted"]
categories: ["Newsletter"]
---

<i>
Chào các bạn, mình vừa đi chơi về.
</i>

*Mời bạn thưởng thức Newsletter #7.*

## [Some Article](https://example.com/a)

Tác giả chia sẻ kinh nghiệm của mình về hệ thống phân tán.

## ~~[Bad Article](https://example.com/b)~~

~~Tóm tắt cũ đã bị gạch.~~

### Bonus

**Images:**
![Label](https://example.com/i.png)

---

*Bài viết đã được review và cập nhật bởi Claude Code với Opus 4.7 (1M context).*
`;

test("classifyPost keeps structure and handwritten lines, not summaries", () => {
  const { newsletterPost, note, lines, candidates } = classifyPost(POST);
  assert.equal(newsletterPost, true);
  assert.match(note, /Opus 4\.7/);

  const kinds = lines.map((l) => `${l.kind}:${l.text}`);
  assert.ok(kinds.includes("html-block:Chào các bạn, mình vừa đi chơi về."));
  assert.ok(kinds.includes("italic-note:*Mời bạn thưởng thức Newsletter #7.*"));
  assert.ok(kinds.includes("heading:## [Some Article](https://example.com/a)"));
  assert.ok(kinds.includes("struck:~~Tóm tắt cũ đã bị gạch.~~"));
  assert.ok(kinds.includes("asset:![Label](https://example.com/i.png)"));
  assert.ok(kinds.includes("asset:**Images:**"));
  assert.equal(lines.filter((l) => l.kind === "frontmatter").length, 6);
  assert.ok(!lines.some((l) => l.text.startsWith("Tác giả")), "summaries stay rewritable");
  assert.ok(!lines.some((l) => l.text.includes("Opus 4.7")), "the provenance note is replaced, not kept");

  assert.deepEqual(
    candidates.map((c) => c.text),
    ["Tác giả chia sẻ kinh nghiệm của mình về hệ thống phân tán."],
  );
});

test("classifyPost flags posts outside the Newsletter category", () => {
  const { newsletterPost } = classifyPost("---\ntitle: x\ncategories: [\"Review\"]\n---\n\nbody\n");
  assert.equal(newsletterPost, false);
});

test("findMissing passes a rewrite that only changes summaries", () => {
  const { lines } = classifyPost(POST);
  const rewritten = POST.replace("Tác giả chia sẻ kinh nghiệm của mình", "Bài viết mô tả cách vận hành");
  assert.deepEqual(findMissing(rewritten, lines), []);
});

test("findMissing reports an edited handwritten line and a reordered heading", () => {
  const { lines } = classifyPost(POST);
  const edited = POST.replace("mình vừa đi chơi về", "tác giả vừa đi chơi về");
  assert.deepEqual(
    findMissing(edited, lines).map((l) => l.kind),
    ["html-block"],
  );

  const moved = POST.replace("## [Some Article](https://example.com/a)\n", "").replace(
    "### Bonus",
    "## [Some Article](https://example.com/a)\n\n### Bonus",
  );
  assert.ok(findMissing(moved, lines).length > 0, "order is part of the contract");
});
