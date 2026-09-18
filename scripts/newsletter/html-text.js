// HTML / RSS text-extraction helpers for find-substack-post, ported from
// html_text.go. Pure string functions — no network, no fs. A real parser
// (cheerio) replaces the hand-rolled regexes the Go version used.

import * as cheerio from "cheerio";

/**
 * loadXml parses an XML fragment (RSS item, sitemap) with CDATA recognition.
 * @param {string} src
 * @returns {cheerio.CheerioAPI}
 */
export function loadXml(src) {
  return cheerio.load(src, { xmlMode: true }, false);
}

/**
 * loadHtml parses an HTML blob. CDATA markers are stripped first: RSS carries
 * post HTML inside CDATA, and the HTML parser would otherwise swallow it as a
 * bogus comment.
 * @param {string} src
 * @returns {cheerio.CheerioAPI}
 */
export function loadHtml(src) {
  return cheerio.load(src.split("<![CDATA[").join("").split("]]>").join(""));
}

/**
 * rawInner returns an element's serialized inner content with any CDATA wrapper
 * removed — the same substring the Go regexes captured, so entity handling can
 * stay identical instead of being applied twice.
 * @param {cheerio.CheerioAPI} $
 * @param {cheerio.Cheerio<any>} el
 * @returns {string}
 */
function rawInner($, el) {
  const html = $.html(el);
  const start = html.indexOf(">") + 1;
  const end = html.lastIndexOf("</");
  if (start <= 0 || end < start) return "";
  let inner = html.slice(start, end);
  if (inner.startsWith("<![CDATA[")) inner = inner.slice(9);
  if (inner.endsWith("]]>")) inner = inner.slice(0, -3);
  return inner;
}

/**
 * decodeEntities decodes HTML entities (named, numeric, hex) and trims.
 * @param {string} s
 * @returns {string}
 */
export function decodeEntities(s) {
  if (s === "") return "";
  return cheerio.load(s, null, false).text().trim();
}

/**
 * collapseWhitespace squeezes runs of whitespace to one space and trims.
 * @param {string} s
 * @returns {string}
 */
function collapseWhitespace(s) {
  return s.replace(/\s+/g, " ").trim();
}

/**
 * stripTags removes markup, decodes entities, and collapses whitespace.
 * @param {string} s
 * @returns {string}
 */
export function stripTags(s) {
  if (s === "") return "";
  return collapseWhitespace(cheerio.load(s, null, false).text());
}

/**
 * itemTitle pulls the first <title> (CDATA or plain) from an RSS <item> chunk.
 * @param {string} item
 * @returns {string}
 */
export function itemTitle(item) {
  const $ = loadXml(item);
  const el = $("title").first();
  if (el.length === 0) return "";
  return decodeEntities(rawInner($, el));
}

/**
 * itemLink pulls the first <link> (CDATA or plain) from an RSS <item> chunk.
 * Entities are left as stored — the link goes straight into a post.
 * @param {string} item
 * @returns {string}
 */
export function itemLink(item) {
  const $ = loadXml(item);
  const el = $("link").first();
  if (el.length === 0) return "";
  return rawInner($, el).trim();
}

/**
 * extractCandidates pulls candidate topic titles from a post's TOC bullet list.
 * ByteByteGo does not attach captions to images — the topic titles live only in
 * the "in this issue" bullets, and image→title cannot be mapped automatically
 * (sponsor/video items interleave), so these are surfaced for the user to pick
 * from. Light filtering keeps the list short: dedupe, drop sub-point
 * explanations and over-long lines.
 * @param {string} htmlSrc
 * @returns {string[]}
 */
export function extractCandidates(htmlSrc) {
  const $ = loadHtml(htmlSrc);
  /** @type {Set<string>} */
  const seen = new Set();
  /** @type {string[]} */
  const out = [];
  $("li").each((_i, el) => {
    const text = collapseWhitespace($(el).text());
    if (text === "") return;
    // Titles are short; long lines are sub-point explanations. Count code
    // points, not UTF-16 units, so an emoji does not count double.
    const n = [...text].length;
    if (n < 6 || n > 70) return;
    const key = text.toLowerCase();
    if (seen.has(key)) return; // content is duplicated in the page
    seen.add(key);
    out.push(text);
  });
  return out;
}

/**
 * captionForUuid returns the <figcaption> text of the <figure> containing the
 * UUID. Cover images live in <enclosure> (no figure) → "".
 * @param {string} src
 * @param {string} id
 * @returns {string}
 */
export function captionForUuid(src, id) {
  if (id === "") return "";
  const $ = loadHtml(src);
  let target = null;
  $("*").each((_i, el) => {
    if (target !== null) return false;
    for (const v of Object.values(el.attribs ?? {})) {
      if (typeof v === "string" && v.includes(id)) {
        target = el;
        return false;
      }
    }
    for (const child of el.children ?? []) {
      if (child.type === "text" && String(child.data).includes(id)) {
        target = el;
        return false;
      }
    }
    return undefined;
  });
  if (target === null) return "";
  const figure = $(target).closest("figure");
  if (figure.length === 0) return "";
  const caption = figure.find("figcaption").first();
  if (caption.length === 0) return "";
  return collapseWhitespace(caption.text());
}

/**
 * postTitleFromHtml extracts a post title from server-rendered post HTML
 * (og:title preferred, then <h1>, then <title>).
 * @param {string} htmlSrc
 * @returns {string}
 */
export function postTitleFromHtml(htmlSrc) {
  const $ = loadHtml(htmlSrc);
  const og = $('meta[property="og:title"]').first().attr("content");
  if (og !== undefined && og !== "") return og.trim();
  const h1 = $("h1").first();
  if (h1.length > 0) return collapseWhitespace(h1.text());
  const title = $("title").first();
  if (title.length > 0) return title.text().trim();
  return "";
}
