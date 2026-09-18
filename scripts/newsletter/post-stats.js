// Count the entries already present in a newsletter post, so a handler can
// report a running tally after each insertion.
// Usage: node scripts/newsletter post-stats <path/to/index.md>
// Outputs: JSON { post, newsletter, articles, images, videos, documents, total }

import { readFileSync } from "node:fs";
import { printJson } from "./json-out.js";
import { NEWSLETTER_NUM_RE } from "./find-newsletter-number.js";

// Entry shapes, per the Bonus format in the shared post mechanics:
//
//	articles   "## [Title](url)"        (level-2 heading, main content)
//	images     "![label](url)"          (under **Images:**)
//	videos     "[Title](url)"           (under **Videos:**)
//	documents  "[PDF: title](url)"      (under **Documents:**)
const ARTICLE_HEADING_RE = /^##\s+\[/;
const BONUS_HEADING_RE = /^###\s+Bonus\b/;
const SUBSECTION_RE = /^\*\*(Images|Videos|Documents):\*\*/;
const IMAGE_ENTRY_RE = /^!\[/;
const LINK_ENTRY_RE = /^\[/;

/**
 * countPostEntries walks the post once. Article headings are counted anywhere
 * outside Bonus; asset entries are attributed to whichever subsection is open.
 * @param {string} content
 * @returns {{articles: number, images: number, videos: number, documents: number, total: number}}
 */
export function countPostEntries(content) {
  let articles = 0;
  let images = 0;
  let videos = 0;
  let documents = 0;
  let inBonus = false;
  let subsection = "";

  for (const raw of content.split("\n")) {
    const line = raw.trim();
    if (BONUS_HEADING_RE.test(line)) {
      inBonus = true;
      subsection = "";
      continue;
    }
    const sub = SUBSECTION_RE.exec(line);
    if (sub !== null) {
      subsection = sub[1];
      continue;
    }
    if (ARTICLE_HEADING_RE.test(line)) {
      articles++;
      continue;
    }
    if (!inBonus) continue;
    if (subsection === "Images") {
      if (IMAGE_ENTRY_RE.test(line)) images++;
    } else if (subsection === "Videos") {
      // A direct video file entry looks the same as a YouTube entry;
      // both belong to the Videos tally.
      if (LINK_ENTRY_RE.test(line)) videos++;
    } else if (subsection === "Documents") {
      if (LINK_ENTRY_RE.test(line)) documents++;
    }
  }
  return { articles, images, videos, documents, total: articles + images + videos + documents };
}

/**
 * @param {string[]} args
 * @returns {Promise<void>}
 */
export async function runPostStats(args) {
  if (args.length < 1) {
    process.stderr.write("usage: post-stats <path/to/index.md>\n");
    process.exit(1);
  }
  const path = args[0];
  let content;
  try {
    content = readFileSync(path, "utf8");
  } catch (err) {
    process.stderr.write("read post: " + String(err?.message ?? err) + "\n");
    process.exit(1);
  }
  const counted = countPostEntries(content);
  const m = NEWSLETTER_NUM_RE.exec(content);
  printJson({
    post: path,
    newsletter: m === null ? 0 : Number.parseInt(m[1], 10),
    articles: counted.articles,
    images: counted.images,
    videos: counted.videos,
    documents: counted.documents,
    total: counted.total,
  });
}
