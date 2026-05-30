#!/usr/bin/env node
// URL preparation script for mt-add-post skill
// Usage: node prepare-url.js "<url>"
// Outputs: JSON with status, clean_url, type, accessible, duplicate

const { execSync } = require("child_process");
const path = require("path");

const url = process.argv[2];
if (!url) {
  console.error("Usage: node prepare-url.js <url>");
  process.exit(1);
}

const PROJECT_ROOT = path.resolve(__dirname, "../../../..");

// Remove common tracking parameters
function cleanUrl(rawUrl) {
  const EXACT_TRACKING = new Set([
    "fbclid", "gclid", "msclkid", "mc_eid",
    "aid", "ref", "ref_src", "ref_url", "source", "s",
    "ck_subscriber_id", "igshid", "yclid", "vero_id",
  ]);
  try {
    const parsed = new URL(rawUrl);
    // Strip any utm_* param plus known exact trackers
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

// Check if URL is accessible (returns HTTP status code)
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

// Check if URL already exists in project content.
// Compare by bare URL (no query string) so stored copies with different tracking
// params still register as duplicates.
function checkDuplicate(targetUrl) {
  try {
    const contentDir = path.join(PROJECT_ROOT, "content");
    const needle = bareUrl(targetUrl);
    execSync(`grep -rF "${needle}" "${contentDir}"`, { stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}

// Classify URL type by extension
function classifyUrl(targetUrl) {
  const lower = targetUrl.toLowerCase();
  if (/\.(png|jpg|jpeg|gif|webp|svg)(\?.*)?$/.test(lower)) return "image";
  if (/\.(mp4|webm|mov|avi)(\?.*)?$/.test(lower)) return "video";
  if (/\.(pdf|doc|docx|xls|xlsx)(\?.*)?$/.test(lower)) return "document";
  return "article";
}

// Main
async function main() {
  const cleanedUrl = cleanUrl(url);
  const httpStatus = await checkAccessibility(cleanedUrl);
  const accessible = httpStatus === "200";
  const duplicate = checkDuplicate(cleanedUrl);
  const type = classifyUrl(cleanedUrl);

  console.log(JSON.stringify({
    original_url: url,
    clean_url: cleanedUrl,
    http_status: httpStatus,
    accessible,
    duplicate,
    type,
  }, null, 2));
}

main();
