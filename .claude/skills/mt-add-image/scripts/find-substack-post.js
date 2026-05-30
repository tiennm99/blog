#!/usr/bin/env node
// Find which Substack post embeds a given image UUID, and extract a label.
// Usage: node find-substack-post.js --uuid <uuid> [--deep]
// Output: JSON { found, source?, publication?, postTitle?, postUrl?, caption?, scanned? }
//
// Strategy: RSS feed first (fast, ~recent weeks). With --deep, fall back to a
// sitemap crawl up to ~3 months back (added in the deep-lookup phase).
// A Substack CDN URL does not encode its publication, so we search each
// publication listed in config/substack-publications.json.

const fs = require("fs");
const path = require("path");

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

async function fetchText(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    return res.ok ? await res.text() : "";
  } catch {
    return "";
  } finally {
    clearTimeout(timeout);
  }
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .trim();
}

function stripTags(html) {
  return decodeEntities(html.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
}

// Pull the first <title> (CDATA or plain) and <link> from an <item> chunk.
function itemTitle(item) {
  const m = item.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/);
  return m ? decodeEntities(m[1].trim()) : "";
}
function itemLink(item) {
  const m = item.match(/<link>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/);
  return m ? m[1].trim() : "";
}

// Extract candidate topic titles from a post's TOC bullet list. ByteByteGo does
// not attach captions to images — the topic titles live only in the "in this
// issue" bullets. We can't reliably map image→title automatically (sponsor /
// video items interleave and break positional order), so we surface these
// candidates for the user to pick from. Light filtering keeps the list short:
// dedupe, drop sub-point explanations ("Term: long sentence") and over-long
// lines. The correct title is always present; the user selects it.
function extractCandidates(html) {
  const seen = new Set();
  const out = [];
  const re = /<li[^>]*>\s*(?:<p[^>]*>)?([\s\S]*?)(?:<\/p>)?\s*<\/li>/g;
  let m;
  while ((m = re.exec(html))) {
    const text = stripTags(m[1]);
    if (!text) continue;
    if (text.length < 6 || text.length > 70) continue;     // titles are short; long lines are sub-point explanations
    const key = text.toLowerCase();
    if (seen.has(key)) continue;                           // content is duplicated in the page
    seen.add(key);
    out.push(text);
  }
  return out;
}

// If the UUID sits inside a <figure>…</figure>, return that figure's
// <figcaption> text. Cover images live in <enclosure> (no figure) → "".
function captionForUuid(item, id) {
  const at = item.indexOf(id);
  if (at === -1) return "";
  const figStart = item.lastIndexOf("<figure", at);
  if (figStart === -1) return "";
  const figEnd = item.indexOf("</figure>", at);
  if (figEnd === -1) return "";
  const figure = item.slice(figStart, figEnd);
  const cap = figure.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/);
  return cap ? stripTags(cap[1]) : "";
}

// Extract a post title from server-rendered post HTML (og:title preferred).
function postTitleFromHtml(html) {
  const og = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i);
  if (og) return decodeEntities(og[1]);
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1) return stripTags(h1[1]);
  const t = html.match(/<title>([\s\S]*?)<\/title>/i);
  return t ? decodeEntities(t[1].trim()) : "";
}

// Deep fallback: crawl the sitemap back ~3 months, fetch posts most-recent-first
// (capped), and look for the UUID. Heavier than RSS — only used on RSS miss.
async function searchSitemap(publication, id, maxFetch = 40, monthsBack = 3) {
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

  // Deep fallback: sitemap crawl up to ~3 months back.
  if (deep) {
    let totalScanned = 0;
    let lastCutoff = null;
    for (const pub of publications) {
      const { hit, scanned, cutoff } = await searchSitemap(pub, uuid);
      totalScanned += scanned;
      lastCutoff = cutoff;
      if (hit) return console.log(JSON.stringify(hit, null, 2));
    }
    return console.log(JSON.stringify({
      found: false,
      source: "sitemap",
      scanned: totalScanned,
      cutoff: lastCutoff,
    }, null, 2));
  }
  console.log(JSON.stringify({ found: false }, null, 2));
}

main();
