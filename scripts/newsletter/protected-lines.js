// List the lines of a newsletter post that a rewrite must leave byte-for-byte
// intact — frontmatter, headings, the author's handwritten notes, struck-out
// entries, code samples, and asset links — and, with --against, prove a rewritten post still
// holds every one of them in the original order.
// Usage: node scripts/newsletter protected-lines <path/to/index.md> [--against <snapshot.json>]
// Outputs: JSON { post, newsletter, newsletter_post, note?, lines, candidates }
//          with --against: JSON { post, ok, missing } — exit 1 when missing is non-empty

import { readFileSync } from "node:fs";
import { printJson } from "./json-out.js";
import { NEWSLETTER_NUM_RE } from "./find-newsletter-number.js";

const FENCE_RE = /^---\s*$/;
const NEWSLETTER_CATEGORY_RE = /^categories:.*\bNewsletter\b/;
const HEADING_RE = /^#{1,6}\s/;
const ENTRY_HEADING_RE = /^##\s+\[/;
const STRUCK_ENTRY_HEADING_RE = /^##\s+~~/;
const SUBHEADING_RE = /^#{3,6}\s/;
const BONUS_RE = /\bBonus\b/i;
const HTML_OPEN_RE = /^<(i|em|div|p|blockquote)\b[^>]*>/i;
const HTML_CLOSE_RE = /<\/(i|em|div|p|blockquote)>\s*$/i;
const STRUCK_RE = /^~~.*~~$/;
const CODE_FENCE_RE = /^(```|~~~)/;
const ITALIC_LINE_RE = /^(\*[^*].*\*|_[^_].*_)$/;
// "*Những điểm chính cần ghi nhớ:*" — a short italic label that introduced a
// machine key-points list. The author's own italic notes are full sentences.
const ITALIC_LABEL_RE = /^[*_].{1,60}:[*_]$/;
// "**Đánh giá:** *…*" — the author's bold-labelled verdict on the tool or
// model that produced the post, written in italics after the label.
const AUTHOR_NOTE_RE = /^\*\*Đánh giá:?\*\*:?\s*[*_]/;
const ASSET_LINE_RE = /^!?\[[^\]]*\]\([^)]*\)$/;
const SUBSECTION_RE = /^\*\*(Images|Videos|Documents):\*\*$/;
// The blog author writes as "mình" / "MiTi"; AI summaries speak about the
// source author in third person. Matches are only candidates — summaries also
// say "của mình" when paraphrasing — so the caller decides, not this script.
const FIRST_PERSON_RE = /(^|[^\p{L}])(mình|MiTi)([^\p{L}]|$)/iu;
// Machine-written provenance notes, replaced on every rewrite instead of kept.
const NOTE_RE = /^\*Bài viết đã được (review và cập nhật|viết lại) bởi .*\*$/;

/**
 * @typedef {{line: number, kind: string, text: string}} Protected
 */

/**
 * classifyPost walks the post once and splits its lines into the ones a
 * rewrite must keep (lines), the ones that might be handwritten and need a
 * human-style judgement (candidates), and the machine provenance note.
 * @param {string} content
 * @returns {{newsletterPost: boolean, note: string, lines: Protected[], candidates: Protected[]}}
 */
export function classifyPost(content) {
  const rows = content.split("\n");
  /** @type {Protected[]} */
  const lines = [];
  /** @type {Protected[]} */
  const candidates = [];
  let note = "";
  let newsletterPost = false;
  let i = 0;

  // Frontmatter is kept whole: tags and dates belong to other workflows.
  if (rows.length > 0 && FENCE_RE.test(rows[0])) {
    lines.push({ line: 1, kind: "frontmatter", text: rows[0] });
    for (i = 1; i < rows.length; i++) {
      lines.push({ line: i + 1, kind: "frontmatter", text: rows[i] });
      if (NEWSLETTER_CATEGORY_RE.test(rows[i])) newsletterPost = true;
      if (FENCE_RE.test(rows[i])) {
        i++;
        break;
      }
    }
  }

  let inHtml = false;
  let inCode = false;
  let codeIndent = "";
  // zone tracks which part of the body a line sits in. Inside a live entry,
  // "### Kết luận:"-style sub-headings are part of the machine summary, so
  // they stay rewritable; everywhere else a heading is the author's.
  /** @type {"pre" | "entry" | "struck" | "other"} */
  let zone = "pre";
  for (; i < rows.length; i++) {
    const text = rows[i];
    const trimmed = text.trim();
    const line = i + 1;
    // Code samples carry facts a paraphrase cannot, so they survive a rewrite
    // verbatim, blank lines included.
    // Code is stored relative to its fence's indent, so a block that sat
    // inside a list may move out of it once the list becomes prose.
    if (inCode || CODE_FENCE_RE.test(trimmed)) {
      if (!inCode) codeIndent = text.slice(0, text.length - text.trimStart().length);
      const rel = text.startsWith(codeIndent) ? text.slice(codeIndent.length) : text.trimStart();
      lines.push({ line, kind: "code", text: rel });
      if (CODE_FENCE_RE.test(trimmed)) inCode = !inCode;
      continue;
    }
    if (trimmed === "") continue;

    if (inHtml || HTML_OPEN_RE.test(trimmed)) {
      lines.push({ line, kind: "html-block", text });
      inHtml = !HTML_CLOSE_RE.test(trimmed);
      continue;
    }
    if (NOTE_RE.test(trimmed)) {
      note = trimmed;
      continue;
    }
    if (HEADING_RE.test(trimmed)) {
      if (ENTRY_HEADING_RE.test(trimmed)) zone = "entry";
      else if (STRUCK_ENTRY_HEADING_RE.test(trimmed)) zone = "struck";
      else if (BONUS_RE.test(trimmed) || !SUBHEADING_RE.test(trimmed)) zone = "other";
      else if (zone === "entry") continue;
      lines.push({ line, kind: "heading", text });
    } else if (STRUCK_RE.test(trimmed)) {
      lines.push({ line, kind: "struck", text });
    } else if (AUTHOR_NOTE_RE.test(trimmed)) {
      lines.push({ line, kind: "author-note", text });
    } else if (zone === "entry" && ITALIC_LABEL_RE.test(trimmed)) {
      continue;
    } else if (ITALIC_LINE_RE.test(trimmed)) {
      lines.push({ line, kind: "italic-note", text });
    } else if (ASSET_LINE_RE.test(trimmed) || SUBSECTION_RE.test(trimmed)) {
      lines.push({ line, kind: "asset", text });
    } else if (FIRST_PERSON_RE.test(trimmed)) {
      candidates.push({ line, kind: "first-person", text });
    }
  }
  return { newsletterPost, note, lines, candidates };
}

/**
 * sameCodeLine accepts a code line re-indented as a whole block: the row must
 * end with the stored fence-relative text and differ only by leading space.
 * @param {string} row
 * @param {string} rel
 * @returns {boolean}
 */
function sameCodeLine(row, rel) {
  return row.endsWith(rel) && row.slice(0, row.length - rel.length).trim() === "";
}

/**
 * findMissing reports every expected line that the rewritten post no longer
 * contains, matching in order so a duplicated line must survive as often as it
 * appeared. Leading/trailing whitespace is significant.
 * @param {string} content
 * @param {Protected[]} expected
 * @returns {Protected[]}
 */
export function findMissing(content, expected) {
  const rows = content.split("\n");
  /** @type {Protected[]} */
  const missing = [];
  let cursor = 0;
  for (const want of expected) {
    let found = -1;
    for (let j = cursor; j < rows.length; j++) {
      if (rows[j] === want.text || (want.kind === "code" && sameCodeLine(rows[j], want.text))) {
        found = j;
        break;
      }
    }
    if (found === -1) {
      missing.push(want);
    } else {
      cursor = found + 1;
    }
  }
  return missing;
}

/**
 * @param {string} path
 * @param {string} what
 * @returns {string}
 */
function readOrExit(path, what) {
  try {
    return readFileSync(path, "utf8");
  } catch (err) {
    process.stderr.write(`read ${what}: ` + String(err?.message ?? err) + "\n");
    process.exit(1);
  }
}

/**
 * @param {string[]} args
 * @returns {Promise<void>}
 */
export async function runProtectedLines(args) {
  const againstAt = args.indexOf("--against");
  const snapshotPath = againstAt === -1 ? "" : (args[againstAt + 1] ?? "");
  const positional = againstAt === -1 ? args : args.filter((_, idx) => idx !== againstAt && idx !== againstAt + 1);
  if (positional.length < 1 || (againstAt !== -1 && snapshotPath === "")) {
    process.stderr.write("usage: protected-lines <path/to/index.md> [--against <snapshot.json>]\n");
    process.exit(1);
  }
  const path = positional[0];
  const content = readOrExit(path, "post");

  if (againstAt !== -1) {
    let snapshot;
    try {
      snapshot = JSON.parse(readOrExit(snapshotPath, "snapshot"));
    } catch (err) {
      process.stderr.write("parse snapshot: " + String(err?.message ?? err) + "\n");
      process.exit(1);
    }
    const missing = findMissing(content, snapshot.lines ?? []);
    printJson({ post: path, ok: missing.length === 0, missing });
    if (missing.length > 0) process.exit(1);
    return;
  }

  const { newsletterPost, note, lines, candidates } = classifyPost(content);
  const m = NEWSLETTER_NUM_RE.exec(content);
  printJson({
    post: path,
    newsletter: m === null ? 0 : Number.parseInt(m[1], 10),
    newsletter_post: newsletterPost,
    ...(note === "" ? {} : { note }),
    lines,
    candidates,
  });
}
