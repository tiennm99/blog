// Find which Substack post embeds a given image UUID, and extract a label.
// Usage: node scripts/newsletter find-substack-post --uuid <uuid> [--deep]
// Output on hit:  JSON { found:true, source, publication, postTitle, postUrl, caption, candidates }
// Output on miss: JSON { found:false } (RSS) or { found:false, source:"sitemap", scanned, budget, cutoff } (--deep)
//
// Strategy: RSS feed first (fast, ~recent weeks). With --deep, fall back to a
// heavier sitemap crawl up to ~3 months back — opt-in because it fetches many
// posts. A Substack CDN URL does not encode its publication, so we search each
// publication listed in config/substack-publications.json, read at runtime so
// editing the JSON takes effect immediately.

import { readFileSync } from "node:fs";
import { parseArgs } from "node:util";
import { printJson } from "./json-out.js";
import { fetchTextOk } from "./url-utils.js";
import {
  captionForUuid,
  extractCandidates,
  itemLink,
  itemTitle,
  loadXml,
  postTitleFromHtml,
} from "./html-text.js";

/** Total post fetches allowed across ALL publications during a --deep crawl. */
const DEEP_FETCH_BUDGET = 40;

/**
 * loadPublications reads the publication list, falling back to the default on
 * any read or parse failure.
 * @returns {string[]}
 */
export function loadPublications() {
  try {
    const raw = readFileSync(new URL("./config/substack-publications.json", import.meta.url), "utf8");
    const pubs = JSON.parse(raw);
    if (Array.isArray(pubs) && pubs.length > 0) return pubs;
  } catch {
    /* fall through */
  }
  return ["blog.bytebytego.com"];
}

/**
 * fetchPage: body text with a browser-ish UA, or "" on any error.
 * @param {string} target
 * @returns {Promise<string>}
 */
function fetchPage(target) {
  return fetchTextOk(target, 10_000, "Mozilla/5.0");
}

const RFC3339_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/i;
const DATE_ONLY_RE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * parseLastmod accepts only the two layouts the Go engine accepted — RFC3339
 * and a bare date — so a loosely formatted stamp is skipped rather than
 * silently reinterpreted in local time.
 * @param {string} s
 * @returns {Date|null}
 */
export function parseLastmod(s) {
  if (!RFC3339_RE.test(s) && !DATE_ONLY_RE.test(s)) return null;
  const t = new Date(s);
  return Number.isNaN(t.getTime()) ? null : t;
}

/**
 * cutoffDate returns the ~3-months-back boundary for the deep crawl.
 * @returns {Date}
 */
function cutoffDate() {
  const d = new Date();
  d.setUTCMonth(d.getUTCMonth() - 3);
  return d;
}

/**
 * @typedef {{found: true, source: string, publication: string, postTitle: string,
 *            postUrl: string, caption: string, candidates: string[]}} PostHit
 */

/**
 * searchSitemap is the deep fallback: crawl the sitemap back ~3 months, fetch
 * posts most-recent-first (up to maxFetch from the shared budget), and look for
 * the UUID. Heavier than RSS — only used on RSS miss.
 * @param {string} publication
 * @param {string} id
 * @param {number} maxFetch
 * @returns {Promise<{hit: PostHit|null, scanned: number, cutoff: string}>} cutoff is "" when the sitemap itself could not be fetched
 */
async function searchSitemap(publication, id, maxFetch) {
  const xml = await fetchPage("https://" + publication + "/sitemap.xml");
  if (xml === "") return { hit: null, scanned: 0, cutoff: "" };

  const cutoffTime = cutoffDate();
  const cutoff = cutoffTime.toISOString().slice(0, 10);

  const $ = loadXml(xml);
  /** @type {{url: string, when: Date}[]} */
  const candidates = [];
  $("url").each((_i, el) => {
    const loc = $(el).children("loc").first().text();
    const lastmod = $(el).children("lastmod").first().text();
    if (loc === "" || lastmod === "") return;
    if (!loc.includes("/p/")) return; // posts only
    const when = parseLastmod(lastmod);
    if (when === null || when < cutoffTime) return;
    candidates.push({ url: loc, when });
  });
  candidates.sort((a, b) => b.when.getTime() - a.when.getTime());

  let scanned = 0;
  for (const c of candidates.slice(0, maxFetch)) {
    scanned++;
    const html = await fetchPage(c.url);
    if (html === "" || !html.includes(id)) continue;
    return {
      hit: {
        found: true,
        source: "sitemap",
        publication,
        postTitle: postTitleFromHtml(html),
        postUrl: c.url,
        caption: captionForUuid(html, id),
        candidates: extractCandidates(html),
      },
      scanned,
      cutoff,
    };
  }
  return { hit: null, scanned, cutoff };
}

/**
 * searchRss looks for the uuid in a publication's recent feed items.
 * @param {string} publication
 * @param {string} id
 * @returns {Promise<PostHit|null>}
 */
async function searchRss(publication, id) {
  const xml = await fetchPage("https://" + publication + "/feed");
  if (xml === "") return null;
  const $ = loadXml(xml);
  const items = $("item").toArray();
  for (const el of items) {
    const item = $.html(el);
    if (!item.includes(id)) continue;
    return {
      found: true,
      source: "rss",
      publication,
      postTitle: itemTitle(item),
      postUrl: itemLink(item),
      caption: captionForUuid(item, id),
      candidates: extractCandidates(item),
    };
  }
  return null;
}

/**
 * @param {string[]} args
 * @returns {Promise<void>}
 */
export async function runFindSubstackPost(args) {
  let values;
  try {
    ({ values } = parseArgs({
      args,
      options: { uuid: { type: "string" }, deep: { type: "boolean" } },
      allowPositionals: false,
    }));
  } catch (err) {
    process.stderr.write(String(err?.message ?? err) + "\n");
    process.stderr.write(
      "Usage: node scripts/newsletter find-substack-post --uuid <uuid> [--deep]\n",
    );
    process.exit(2);
  }

  const uuid = values.uuid ?? "";
  if (uuid === "") {
    process.stderr.write(
      "Usage: node scripts/newsletter find-substack-post --uuid <uuid> [--deep]\n",
    );
    process.exit(1);
  }

  const publications = loadPublications();
  for (const pub of publications) {
    const hit = await searchRss(pub, uuid);
    if (hit !== null) {
      printJson(hit);
      return;
    }
  }

  // Deep fallback: sitemap crawl up to ~3 months back, sharing one global fetch
  // budget across all publications so coverage can't blow up as the
  // publications list grows.
  if (values.deep === true) {
    let totalScanned = 0;
    /** @type {string|null} */
    let lastCutoff = null;
    for (const pub of publications) {
      const remaining = DEEP_FETCH_BUDGET - totalScanned;
      if (remaining <= 0) break;
      const { hit, scanned, cutoff } = await searchSitemap(pub, uuid, remaining);
      totalScanned += scanned;
      if (cutoff !== "") lastCutoff = cutoff;
      if (hit !== null) {
        printJson(hit);
        return;
      }
    }
    // cutoff is null (not omitted) when no sitemap could be fetched — the skill
    // distinguishes "crawled and missed" from "could not crawl".
    printJson({
      found: false,
      source: "sitemap",
      scanned: totalScanned,
      budget: DEEP_FETCH_BUDGET,
      cutoff: lastCutoff,
    });
    return;
  }

  printJson({ found: false });
}
