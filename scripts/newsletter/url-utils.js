// Shared URL helpers for the mt-* newsletter skills.
// Owned by the mt-add-url meta router; reused by handlers (e.g. mt-add-image).
// CommonJS so plain `node script.js` works without a build step.

const fs = require("fs");
const path = require("path");

// Remove common tracking parameters (utm_* plus a fixed set of known trackers).
function cleanUrl(rawUrl) {
  const EXACT_TRACKING = new Set([
    "fbclid", "gclid", "msclkid", "mc_eid",
    "aid", "ref", "ref_src", "ref_url", "source", "s",
    "ck_subscriber_id", "igshid", "yclid", "vero_id",
  ]);
  try {
    const parsed = new URL(rawUrl);
    [...parsed.searchParams.keys()].forEach((k) => {
      if (k.toLowerCase().startsWith("utm_") || EXACT_TRACKING.has(k.toLowerCase())) {
        parsed.searchParams.delete(k);
      }
    });
    return parsed.toString();
  } catch {
    // Unparseable input (not a real URL): the per-param string surgery above
    // would mangle the query (drop the `?`, leave a dangling `&`), so leave it
    // untouched rather than corrupt it.
    return rawUrl;
  }
}

// --- Substack image helpers (shared by add-url.js routing and mt-add-image) ---
const SUBSTACK_IMAGE_HOSTS = ["substackcdn.com", "substack-post-media.s3.amazonaws.com"];
const UUID = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}";

// A Substack-hosted image (CDN wrapper or raw S3), regardless of file extension.
function isSubstackImage(targetUrl) {
  let host = "";
  try { host = new URL(targetUrl).host.toLowerCase(); } catch { /* non-URL */ }
  return SUBSTACK_IMAGE_HOSTS.includes(host) || /substack-post-media/i.test(targetUrl);
}

// The stable image identity is the S3 image UUID under public/images/<uuid>.
// Works whether the path separators are raw (/) or percent-encoded (%2F).
function substackImageUuid(targetUrl) {
  const m = targetUrl.match(new RegExp(`images(?:%2F|/)(${UUID})`, "i"));
  return m ? m[1].toLowerCase() : null;
}

// Some sites carry the resource identity in a query param, not the path
// (e.g. YouTube /watch?v=ID). Stripping the query for these collapses every
// item to the same bare URL, causing false-positive duplicates. Preserve the
// identity param for those hosts.
const IDENTITY_PARAMS = {
  "youtube.com": "v",
  "www.youtube.com": "v",
  "m.youtube.com": "v",
};

// Reduce a URL to a stable identity used for duplicate detection:
// - Substack image  → its S3 UUID (transform/size variants share one identity)
// - YouTube         → scheme+host+path + the v= video id
// - everything else → scheme + host + path
function bareUrl(targetUrl) {
  if (isSubstackImage(targetUrl)) {
    const uuid = substackImageUuid(targetUrl);
    if (uuid) return uuid;
  }
  try {
    const p = new URL(targetUrl);
    let bare = `${p.protocol}//${p.host}${p.pathname}`.replace(/\/$/, "");
    const idParam = IDENTITY_PARAMS[p.host.toLowerCase()];
    const idValue = idParam ? p.searchParams.get(idParam) : null;
    if (idValue) bare += `?${idParam}=${idValue}`;
    return bare;
  } catch {
    return targetUrl.split("?")[0].replace(/\/$/, "");
  }
}

// fetch() with an abort timeout. Returns the Response on success, or null on
// network error / timeout. Callers decide what to read (.text/.json/.status).
// Centralizes the AbortController + clearTimeout dance so every caller cleans
// up the timer (via finally) on both the success and failure paths.
async function fetchWithTimeout(targetUrl, { method = "GET", timeoutMs = 10000, headers } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(targetUrl, { method, redirect: "follow", signal: controller.signal, headers });
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// Check if URL is accessible (returns HTTP status code as a string).
async function checkAccessibility(targetUrl) {
  const res = await fetchWithTimeout(targetUrl, { method: "HEAD" });
  return res ? res.status.toString() : "000";
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Recursively collect *.md files under a directory (the content tree is small).
function collectMarkdown(dir, acc = []) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return acc; // missing dir → nothing to compare against
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) collectMarkdown(full, acc);
    else if (e.isFile() && e.name.toLowerCase().endsWith(".md")) acc.push(full);
  }
  return acc;
}

// Check whether a URL identity already exists in the stored markdown.
// Pure JS (no external `grep` dependency, works the same from any shell) and
// boundary-aware so a needle that is merely a PREFIX of a stored longer string
// is NOT a false duplicate. The two identity kinds need different boundaries:
//   - Substack image UUID: the next char must not extend the hex id, so all of
//     <uuid>.png (cover image, no size suffix), <uuid>_WxH and <uuid>) match.
//   - URL: must be followed by a path/punctuation delimiter so /p/foo does not
//     match a stored /p/foo-bar.
function checkDuplicate(targetUrl, contentDir) {
  const needle = bareUrl(targetUrl);
  if (!needle) return false;
  const isUuid = new RegExp(`^${UUID}$`, "i").test(needle);
  // For URLs, allow an optional trailing slash (bareUrl strips it, stored URLs
  // may keep it) before the delimiter.
  const boundary = isUuid
    ? new RegExp(escapeRegExp(needle) + `(?![0-9a-f])`, "i")
    : new RegExp(escapeRegExp(needle) + `/?(?:[)\\]\\s"'?#<_&,]|$)`, "m");
  for (const file of collectMarkdown(contentDir)) {
    let text;
    try { text = fs.readFileSync(file, "utf-8"); } catch { continue; }
    if (text.includes(needle) && boundary.test(text)) return true;
  }
  return false;
}

// Classify URL type by file extension. Returns image|video|document|article.
function classifyType(targetUrl) {
  const lower = targetUrl.toLowerCase();
  if (/\.(png|jpg|jpeg|gif|webp|svg|avif|heic|heif|bmp|tiff?)(\?.*)?$/.test(lower)) return "image";
  if (/\.(mp4|webm|mov|avi|mkv)(\?.*)?$/.test(lower)) return "video";
  if (/\.(pdf|docx?|xlsx?|pptx?)(\?.*)?$/.test(lower)) return "document";
  return "article";
}

module.exports = {
  cleanUrl,
  bareUrl,
  IDENTITY_PARAMS,
  isSubstackImage,
  substackImageUuid,
  fetchWithTimeout,
  checkAccessibility,
  checkDuplicate,
  classifyType,
};
