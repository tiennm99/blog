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

\`\`\`java
break outer;
\`\`\`

*Những điểm chính cần ghi nhớ:*

*Mình dùng thử công cụ này thấy khá ổn, nhưng hơi chậm.*

**Đánh giá:** *Công cụ chạy ổn, nhưng còn dùng nhiều tiếng Anh.*

**Đánh giá mở rộng quy mô** là một phần của bài viết.

### Kết luận:

- Một ý tóm tắt.

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
  assert.ok(!lines.some((l) => l.text === "### Kết luận:"), "sub-headings inside a summary stay rewritable");
  assert.ok(kinds.includes("heading:### Bonus"), "Bonus headings stay protected");
  assert.ok(kinds.includes("code:break outer;"), "code samples stay verbatim");
  assert.ok(!lines.some((l) => l.text === "*Những điểm chính cần ghi nhớ:*"), "key-points labels stay rewritable");
  assert.ok(kinds.includes("author-note:**Đánh giá:** *Công cụ chạy ổn, nhưng còn dùng nhiều tiếng Anh.*"), "the author's verdict lines stay protected");
  assert.ok(!lines.some((l) => l.text.startsWith("**Đánh giá mở rộng")), "a bold phrase in a summary is not a verdict");
  assert.ok(kinds.includes("italic-note:*Mình dùng thử công cụ này thấy khá ổn, nhưng hơi chậm.*"), "the author's notes inside an entry stay protected");
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

test("findMissing lets a code block leave its list indent", () => {
  const post = "## [A](https://example.com/a)\n\n- Ý chính:\n\n    ```java\n    if (x) {\n        run();\n    }\n    ```\n";
  const { lines } = classifyPost(post);
  const dedented = "## [A](https://example.com/a)\n\nVăn xuôi.\n\n```java\nif (x) {\n    run();\n}\n```\n";
  assert.deepEqual(findMissing(dedented, lines), []);
  const edited = dedented.replace("    run();", "    stop();");
  assert.equal(findMissing(edited, lines).length, 1, "code content still has to match");
});
