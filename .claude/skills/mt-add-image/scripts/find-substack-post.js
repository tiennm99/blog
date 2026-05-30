#!/usr/bin/env node
// Find which Substack post embeds a given image UUID, and extract a label.
// Usage: node find-substack-post.js --uuid <uuid> [--deep]
// Output on hit:  JSON { found:true, source, publication, postTitle, postUrl, caption, candidates }
// Output on miss: JSON { found:false } (RSS) or { found:false, source:"sitemap", scanned, budget, cutoff } (--deep)
//
// Strategy: RSS feed first (fast, ~recent weeks). With --deep, fall back to a
// heavier sitemap crawl up to ~3 months back — opt-in because it fetches many
// posts. A Substack CDN URL does not encode its publication, so we search each
// publication listed in config/substack-publications.json.

const fs = require("fs");
const path = require("path");
const { fetchWithTimeout } = require("../../mt-add-url/scripts/url-utils.js");
const {
  itemTitle,
  itemLink,
  extractCandidates,
  captionForUuid,
  postTitleFromHtml,
} = require("./html-text-utils.js");

const args = process.argv.slice(2);
function flag(name) {
  const i = args.indexOf(name);
  return i !== -1 ? (args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : true) : undefined;
}
const uuid = flag("--uuid");
const deep = !!flag("--deep");

if (!uuid || uuid === true) {
  console.error("Usage: node find-substack-post.js --uuid <uuid> [--deep]");
  process.exit(1);
}

const CONFIG = path.resolve(__dirname, "../config/substack-publications.json");
function loadPublications() {
  try {
    return JSON.parse(fs.readFileSync(CONFIG, "utf-8"));
  } catch {
    return ["blog.bytebytego.com"];
  }
}

// Thin wrapper over the shared fetcher: returns body text, or "" on any error.
async function fetchText(url) {
  const res = await fetchWithTimeout(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  return res && res.ok ? await res.text() : "";
}

// Total post fetches allowed across ALL publications during a --deep crawl.
const DEEP_FETCH_BUDGET = 40;

// Deep fallback: crawl the sitemap back ~3 months, fetch posts most-recent-first
// (up to `maxFetch` from the shared budget), and look for the UUID. Heavier than
// RSS — only used on RSS miss.
async function searchSitemap(publication, id, maxFetch, monthsBack = 3) {
  const xml = await fetchText(`https://${publication}/sitemap.xml`);
  if (!xml) return { hit: null, scanned: 0, cutoff: null };

  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - monthsBack);

  const candidates = [];
  for (const block of xml.split("<url>").slice(1)) {
    const loc = block.match(/<loc>([^<]+)<\/loc>/);
    const lastmod = block.match(/<lastmod>([^<]+)<\/lastmod>/);
    if (!loc || !lastmod) continue;
    if (!/\/p\//.test(loc[1])) continue; // posts only
    const when = new Date(lastmod[1]);
    if (isNaN(when) || when < cutoff) continue;
    candidates.push({ url: loc[1], when });
  }
  candidates.sort((a, b) => b.when - a.when);

  let scanned = 0;
  for (const c of candidates.slice(0, maxFetch)) {
    scanned++;
    const html = await fetchText(c.url);
    if (!html || !html.includes(id)) continue;
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
      cutoff: cutoff.toISOString().slice(0, 10),
    };
  }
  return { hit: null, scanned, cutoff: cutoff.toISOString().slice(0, 10) };
}

async function searchRss(publication, id) {
  const xml = await fetchText(`https://${publication}/feed`);
  if (!xml) return null;
  const items = xml.split("<item>").slice(1);
  for (const item of items) {
    if (!item.includes(id)) continue;
    const postTitle = itemTitle(item);
    const caption = captionForUuid(item, id);
    return {
      found: true,
      source: "rss",
      publication,
      postTitle,
      postUrl: itemLink(item),
      caption,
      candidates: extractCandidates(item),
    };
  }
  return null;
}

async function main() {
  const publications = loadPublications();
  for (const pub of publications) {
    const hit = await searchRss(pub, uuid);
    if (hit) return console.log(JSON.stringify(hit, null, 2));
  }

  // Deep fallback: sitemap crawl up to ~3 months back, sharing one global
  // fetch budget across all publications so coverage can't blow up as the
  // publications list grows.
  if (deep) {
    let totalScanned = 0;
    let lastCutoff = null;
    for (const pub of publications) {
      const remaining = DEEP_FETCH_BUDGET - totalScanned;
      if (remaining <= 0) break;
      const { hit, scanned, cutoff } = await searchSitemap(pub, uuid, remaining);
      totalScanned += scanned;
      lastCutoff = cutoff || lastCutoff;
      if (hit) return console.log(JSON.stringify(hit, null, 2));
    }
    return console.log(JSON.stringify({
      found: false,
      source: "sitemap",
      scanned: totalScanned,
      budget: DEEP_FETCH_BUDGET,
      cutoff: lastCutoff,
    }, null, 2));
  }
  console.log(JSON.stringify({ found: false }, null, 2));
}

main();
