// Find the most recent newsletter number and return the next one.
// Usage: node scripts/newsletter find-newsletter-number
// Outputs: the next newsletter number.

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { contentDir } from "./url-utils.js";

/** Matches the "Newsletter #N" heading a post is numbered by. @type {RegExp} */
export const NEWSLETTER_NUM_RE = /Newsletter\s*#(\d+)/;
const YEAR_DIR_RE = /^\d{4}$/;
const TWO_DIGIT_DIR_RE = /^\d{2}$/;

/**
 * listDirsDesc returns dir's subdirectory names matching re, sorted descending.
 * @param {string} dir
 * @param {RegExp} re
 * @returns {string[]}
 */
function listDirsDesc(dir, re) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  return entries
    .filter((e) => re.test(e.name))
    .map((e) => e.name)
    .sort((a, b) => (a < b ? 1 : a > b ? -1 : 0));
}

/**
 * extractNewsletterNumber reads the first "Newsletter #N" in a post.
 * @param {string} path
 * @returns {number}
 */
function extractNewsletterNumber(path) {
  let content;
  try {
    content = readFileSync(path, "utf8");
  } catch {
    return 0;
  }
  const m = NEWSLETTER_NUM_RE.exec(content);
  if (m === null) return 0;
  const n = Number.parseInt(m[1], 10);
  return Number.isNaN(n) ? 0 : n;
}

/**
 * findMostRecentNewsletter scans year/month/day directories newest-first for
 * the highest newsletter number.
 * @returns {number}
 */
export function findMostRecentNewsletter() {
  let maxNumber = 0;
  for (const year of listDirsDesc(contentDir(), YEAR_DIR_RE)) {
    const yearDir = join(contentDir(), year);
    for (const month of listDirsDesc(yearDir, TWO_DIGIT_DIR_RE)) {
      const monthDir = join(yearDir, month);
      for (const day of listDirsDesc(monthDir, TWO_DIGIT_DIR_RE)) {
        const n = extractNewsletterNumber(join(monthDir, day, "index.md"));
        if (n > maxNumber) maxNumber = n;
      }
    }
    // Early exit: a newsletter found in this year — no need to go further back.
    if (maxNumber > 0) break;
  }
  return maxNumber;
}

/**
 * @param {string[]} _args
 * @returns {Promise<void>}
 */
export async function runFindNewsletterNumber(_args) {
  process.stdout.write(String(findMostRecentNewsletter() + 1) + "\n");
}
