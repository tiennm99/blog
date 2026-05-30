// Shared URL helpers for the mt-add-post skill.
// Used by add-url.js (the meta router entry point).
// CommonJS so plain `node script.js` works without a build step.

const { execFileSync } = require("child_process");

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
    // If URL parsing fails, do basic string cleanup
    return rawUrl.replace(/[?&](utm_[^&]*|fbclid|gclid|msclkid|mc_eid|aid|ref|ref_src|ref_url|source|ck_subscriber_id|igshid|yclid|vero_id)=[^&]*/gi, "")
      .replace(/\?&/, "?")
      .replace(/[?&]$/, "");
  }
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

// Extract the bare URL (scheme + host + path) — used for stricter duplicate checks.
// Keeps the host's identity query param when one is defined above.
function bareUrl(targetUrl) {
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

// Check if URL is accessible (returns HTTP status code as a string).
async function checkAccessibility(targetUrl) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(targetUrl, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
    });
    clearTimeout(timeout);
    return res.status.toString();
  } catch {
    return "000";
  }
}

// Check if URL already exists under contentDir.
// Compare by bare URL so stored copies with different tracking params
// still register as duplicates. contentDir is passed by the caller so this
// module stays decoupled from any specific project layout.
function checkDuplicate(targetUrl, contentDir) {
  try {
    const needle = bareUrl(targetUrl);
    // execFileSync (no shell) — the needle is URL-derived and could otherwise
    // carry shell metacharacters; passing args directly avoids any injection.
    execFileSync("grep", ["-rF", needle, contentDir], { stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}

// Classify URL type by file extension. Returns image|video|document|article.
function classifyType(targetUrl) {
  const lower = targetUrl.toLowerCase();
  if (/\.(png|jpg|jpeg|gif|webp|svg)(\?.*)?$/.test(lower)) return "image";
  if (/\.(mp4|webm|mov|avi)(\?.*)?$/.test(lower)) return "video";
  if (/\.(pdf|doc|docx|xls|xlsx)(\?.*)?$/.test(lower)) return "document";
  return "article";
}

module.exports = {
  cleanUrl,
  bareUrl,
  IDENTITY_PARAMS,
  checkAccessibility,
  checkDuplicate,
  classifyType,
};
