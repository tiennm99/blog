// List existing tags in the repo ranked by frequency.
// Usage: node scripts/newsletter list-existing-tags
// Outputs: tag count and name, sorted most-used first (top 40).
//
// NOTE: not currently used by the mt-add-tags skill. Tag normalization is
// disabled until existing posts have standardized tags; to enable, uncomment
// step 4a in that skill's SKILL.md.

import { readFileSync } from "node:fs";
import { basename } from "node:path";
import { collectMarkdown, contentDir } from "./url-utils.js";

const TAGS_LINE_RE = /^tags:\s*\[([^\]]*)\]/m;
const QUOTED_TAG_RE = /"([^"]+)"/g;

/**
 * extractTags pulls quoted tag strings from an index.md frontmatter tags array.
 * @param {string} path
 * @returns {string[]}
 */
function extractTags(path) {
  let content;
  try {
    content = readFileSync(path, "utf8");
  } catch {
    return [];
  }
  const m = TAGS_LINE_RE.exec(content);
  if (m === null) return [];
  return [...m[1].matchAll(QUOTED_TAG_RE)].map((q) => q[1]);
}

/**
 * @param {string[]} _args
 * @returns {Promise<void>}
 */
export async function runListExistingTags(_args) {
  // Array + index map keeps first-seen order for equal counts, so the stable
  // sort below ranks ties deterministically (walk order is lexical).
  /** @type {{tag: string, count: number}[]} */
  const counts = [];
  /** @type {Map<string, number>} */
  const index = new Map();

  for (const path of collectMarkdown(contentDir())) {
    if (basename(path) !== "index.md") continue;
    for (const tag of extractTags(path)) {
      const at = index.get(tag);
      if (at !== undefined) counts[at].count++;
      else {
        index.set(tag, counts.length);
        counts.push({ tag, count: 1 });
      }
    }
  }

  counts.sort((a, b) => b.count - a.count);
  // Plain text, not JSON: the count is right-aligned in a 6-character field and
  // the skill reads that layout.
  for (const { tag, count } of counts.slice(0, 40)) {
    process.stdout.write(String(count).padStart(6) + " " + tag + "\n");
  }
}
