// HTML / RSS text-extraction helpers for find-substack-post.js.
// Pure string functions (no network, no fs) — kept separate so the crawler
// stays focused on fetch/search flow. CommonJS so plain `node` works.

// Decode the HTML entities that appear in Substack titles/captions, including
// numeric (&#39;) and hex (&#x2014;) forms. &amp; is decoded last-ish but
// before nothing re-encodes it; ordering here is safe for our inputs.
function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .trim();
}

function stripTags(html) {
  return decodeEntities(html.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
}

// Pull the first <title> (CDATA or plain) and <link> from an RSS <item> chunk.
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

module.exports = {
  decodeEntities,
  stripTags,
  itemTitle,
  itemLink,
  extractCandidates,
  captionForUuid,
  postTitleFromHtml,
};
