// Shared URL helpers, ported from url_utils.go. Owned by the add-url router;
// reused by the other subcommands.

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

/** Exact-match tracking params; any key starting with utm_ is also dropped. */
const EXACT_TRACKING = new Set([
  "fbclid", "gclid", "msclkid", "mc_eid",
  "aid", "ref", "ref_src", "ref_url", "source", "s",
  "ck_subscriber_id", "igshid", "yclid", "vero_id",
]);

/**
 * contentDir is repo-root relative (invocation contract: run from repo root).
 * @returns {string}
 */
export function contentDir() {
  return join("content", "post");
}

/**
 * cleanUrl removes common tracking parameters. Surviving query pairs are kept
 * verbatim (no re-encoding) and in their original order — URLSearchParams would
 * normalize percent-encoding (%7E → ~, + → %20), which must not leak into
 * stored clean_url values. Unparseable / non-absolute input is returned
 * untouched rather than corrupted.
 * @param {string} raw
 * @returns {string}
 */
export function cleanUrl(raw) {
  let u;
  try {
    u = new URL(raw);
  } catch {
    return raw;
  }
  if (!u.protocol || !u.host) return raw;
  // WHATWG URL serializes an empty path as "/" for special schemes; force it
  // for the rest so cleaned URLs keep one shape.
  if (u.pathname === "") {
    try {
      u.pathname = "/";
    } catch {
      /* opaque path — leave as parsed */
    }
  }

  let kept = "";
  const query = u.search.slice(1);
  if (query !== "") {
    const parts = [];
    for (const pair of query.split("&")) {
      if (pair === "") continue;
      const eq = pair.indexOf("=");
      const key = (eq === -1 ? pair : pair.slice(0, eq)).toLowerCase();
      if (key.startsWith("utm_") || EXACT_TRACKING.has(key)) continue;
      parts.push(pair);
    }
    kept = parts.join("&");
  }

  const hash = u.hash;
  u.search = "";
  u.hash = "";
  return u.toString() + (kept === "" ? "" : "?" + kept) + hash;
}

// --- Substack image helpers (shared by add-url routing and detect-image-source) ---

const SUBSTACK_IMAGE_HOSTS = new Set([
  "substackcdn.com",
  "substack-post-media.s3.amazonaws.com",
]);

const UUID_PATTERN = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}";
const IMAGE_UUID_RE = new RegExp(`images(?:%2F|/)(${UUID_PATTERN})`, "i");
const UUID_EXACT_RE = new RegExp(`^${UUID_PATTERN}$`, "i");

/**
 * isSubstackImage reports a Substack-hosted image (CDN wrapper or raw S3),
 * regardless of file extension.
 * @param {string} target
 * @returns {boolean}
 */
export function isSubstackImage(target) {
  let host = "";
  try {
    host = new URL(target).host.toLowerCase();
  } catch {
    /* not an absolute URL — fall through to the substring check */
  }
  return SUBSTACK_IMAGE_HOSTS.has(host) || target.toLowerCase().includes("substack-post-media");
}

/**
 * substackImageUuid extracts the stable image identity: the S3 image UUID under
 * public/images/<uuid>, with raw (/) or percent-encoded (%2F) separators.
 * @param {string} target
 * @returns {string} the lowercased uuid, or "" when absent
 */
export function substackImageUuid(target) {
  const m = IMAGE_UUID_RE.exec(target);
  return m === null ? "" : m[1].toLowerCase();
}

/**
 * isUuid reports whether a bare identity is a Substack image uuid.
 * @param {string} s
 * @returns {boolean}
 */
export function isUuid(s) {
  return UUID_EXACT_RE.test(s);
}

/**
 * Some sites carry the resource identity in a query param, not the path
 * (e.g. YouTube /watch?v=ID). Preserve the identity param for those hosts so
 * dedup does not collapse every video onto the same bare URL.
 */
const IDENTITY_PARAMS = new Map([
  ["youtube.com", "v"],
  ["www.youtube.com", "v"],
  ["m.youtube.com", "v"],
]);

/**
 * trimTrailingSlash removes at most one trailing "/".
 * @param {string} s
 * @returns {string}
 */
function trimTrailingSlash(s) {
  return s.endsWith("/") ? s.slice(0, -1) : s;
}

/**
 * bareUrl reduces a URL to a stable identity for duplicate detection:
 *   - Substack image  → its S3 UUID (transform/size variants share one identity)
 *   - YouTube         → scheme+host+path + the v= video id
 *   - everything else → scheme + host + path
 * @param {string} target
 * @returns {string}
 */
export function bareUrl(target) {
  if (isSubstackImage(target)) {
    const uuid = substackImageUuid(target);
    if (uuid !== "") return uuid;
  }
  let u = null;
  try {
    u = new URL(target);
  } catch {
    /* unparseable — fall back to crude string surgery below */
  }
  if (u === null || !u.protocol || !u.host) {
    return trimTrailingSlash(target.split("?")[0]);
  }
  const host = u.host.toLowerCase();
  let bare = trimTrailingSlash(u.protocol + "//" + host + u.pathname);
  const idParam = IDENTITY_PARAMS.get(host);
  if (idParam !== undefined) {
    const v = u.searchParams.get(idParam);
    if (v !== null && v !== "") bare += "?" + idParam + "=" + v;
  }
  return bare;
}

/**
 * fetchTextOk GETs target and returns the body on a 2xx response, "" on any
 * error, non-2xx status, or timeout. Redirects are followed.
 * @param {string} target
 * @param {number} timeoutMs
 * @param {string} [userAgent]
 * @returns {Promise<string>}
 */
export async function fetchTextOk(target, timeoutMs, userAgent = "") {
  try {
    const headers = {};
    if (userAgent !== "") headers["user-agent"] = userAgent;
    const res = await fetch(target, {
      headers,
      redirect: "follow",
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (res.status < 200 || res.status >= 300) return "";
    return await res.text();
  } catch {
    return "";
  }
}

/**
 * checkAccessibility HEADs the URL and returns the final HTTP status code as a
 * string, or "000" on network error / timeout.
 * @param {string} target
 * @returns {Promise<string>}
 */
export async function checkAccessibility(target) {
  try {
    const res = await fetch(target, {
      method: "HEAD",
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
    });
    return String(res.status);
  } catch {
    return "000";
  }
}

/**
 * collectMarkdown recursively collects *.md files under dir (the content tree is
 * small). Entries are visited in lexical order so callers that depend on
 * first-seen ordering stay deterministic. Missing or unreadable directories
 * yield nothing.
 * @param {string} dir
 * @returns {string[]}
 */
export function collectMarkdown(dir) {
  /** @type {string[]} */
  const acc = [];
  walkMarkdown(dir, acc);
  return acc;
}

/**
 * @param {string} dir
 * @param {string[]} acc
 * @returns {void}
 */
function walkMarkdown(dir, acc) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return; // skip unreadable entries
  }
  entries.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walkMarkdown(p, acc);
    else if (e.name.toLowerCase().endsWith(".md")) acc.push(p);
  }
}

/**
 * uuidBoundaryOk: the char after a UUID match must not extend the hex id, so
 * <uuid>.png (cover image), <uuid>_WxH and <uuid>) all match.
 * @param {string} text
 * @param {number} end
 * @returns {boolean}
 */
export function uuidBoundaryOk(text, end) {
  if (end >= text.length) return true;
  const c = text[end];
  return !((c >= "0" && c <= "9") || (c >= "a" && c <= "f") || (c >= "A" && c <= "F"));
}

const URL_DELIMITERS = `)]"'?#<>_&,`;
const URL_WHITESPACE = " \t\n\r\f\v";

/**
 * urlBoundaryOk: an optional trailing slash (bareUrl strips it, stored URLs may
 * keep it), then a path/punctuation delimiter, whitespace, or end of text — so
 * /p/foo does not match a stored /p/foo-bar. The '>' delimiter covers URLs
 * stored in markdown autolink form <https://…>, which older posts use.
 * @param {string} text
 * @param {number} end
 * @returns {boolean}
 */
export function urlBoundaryOk(text, end) {
  let at = end;
  if (at < text.length && text[at] === "/") at++;
  if (at >= text.length) return true;
  const c = text[at];
  if (URL_WHITESPACE.includes(c)) return true;
  return URL_DELIMITERS.includes(c);
}

/**
 * hasBoundaryMatch scans every occurrence of needle and applies the boundary
 * check in code. Kept as an index loop rather than one lookahead regex: the
 * byte-offset checks (optional trailing slash, delimiter set) are what stop a
 * needle that is merely a PREFIX of a stored string from matching.
 * @param {string} text
 * @param {string} needle
 * @param {boolean} isUuidNeedle
 * @returns {boolean}
 */
export function hasBoundaryMatch(text, needle, isUuidNeedle) {
  for (let from = 0; ; ) {
    const i = text.indexOf(needle, from);
    if (i === -1) return false;
    const end = i + needle.length;
    if (isUuidNeedle ? uuidBoundaryOk(text, end) : urlBoundaryOk(text, end)) return true;
    from = i + 1;
  }
}

/**
 * checkDuplicate reports whether a URL identity already exists in the stored
 * markdown, boundary-aware so a needle that is merely a PREFIX of a stored
 * longer string is NOT a false duplicate.
 * @param {string} target
 * @param {string} dir
 * @returns {boolean}
 */
export function checkDuplicate(target, dir) {
  const needle = bareUrl(target);
  if (needle === "") return false;
  const uuidNeedle = isUuid(needle);
  for (const file of collectMarkdown(dir)) {
    let text;
    try {
      text = readFileSync(file, "utf8");
    } catch {
      continue;
    }
    if (text.includes(needle) && hasBoundaryMatch(text, needle, uuidNeedle)) return true;
  }
  return false;
}

const IMAGE_EXT_RE = /\.(png|jpg|jpeg|gif|webp|svg|avif|heic|heif|bmp|tiff?)(\?.*)?$/;
const VIDEO_EXT_RE = /\.(mp4|webm|mov|avi|mkv)(\?.*)?$/;
const DOCUMENT_EXT_RE = /\.(pdf|docx?|xlsx?|pptx?)(\?.*)?$/;

/**
 * classifyType classifies a URL by file extension.
 * @param {string} target
 * @returns {"image"|"video"|"document"|"article"}
 */
export function classifyType(target) {
  const lower = target.toLowerCase();
  if (IMAGE_EXT_RE.test(lower)) return "image";
  if (VIDEO_EXT_RE.test(lower)) return "video";
  if (DOCUMENT_EXT_RE.test(lower)) return "document";
  return "article";
}
