#!/usr/bin/env node
// Meta URL router for the mt-add-post skill — the single entry per URL.
// Usage: node add-url.js "<url>"
// Outputs: JSON { original_url, clean_url, http_status, accessible,
//                 duplicate, route, title?, author? }
// route ∈ youtube | image | video | document | article

const path = require("path");
const {
  cleanUrl,
  checkAccessibility,
  checkDuplicate,
  classifyType,
} = require("./url-utils");

const url = process.argv[2];
if (!url) {
  console.error("Usage: node add-url.js <url>");
  process.exit(1);
}

const PROJECT_ROOT = path.resolve(__dirname, "../../../..");
const CONTENT_DIR = path.join(PROJECT_ROOT, "content");

const YT_HOSTS = new Set(["youtube.com", "www.youtube.com", "m.youtube.com"]);

// Detect a YouTube video and extract its id from the supported URL shapes:
//   youtube.com/watch?v=ID, youtu.be/ID, youtube.com/shorts/ID
// Playlists/channels are intentionally NOT YouTube routes (fall through to type).
function detectYouTube(targetUrl) {
  try {
    const p = new URL(targetUrl);
    const host = p.host.toLowerCase();
    if (host === "youtu.be") {
      const id = p.pathname.slice(1).split("/")[0];
      return id ? { isYouTube: true, videoId: id } : { isYouTube: false };
    }
    if (YT_HOSTS.has(host)) {
      if (p.pathname === "/watch") {
        const id = p.searchParams.get("v");
        return id ? { isYouTube: true, videoId: id } : { isYouTube: false };
      }
      if (p.pathname.startsWith("/shorts/")) {
        const id = p.pathname.split("/")[2];
        return id ? { isYouTube: true, videoId: id } : { isYouTube: false };
      }
    }
    return { isYouTube: false };
  } catch {
    return { isYouTube: false };
  }
}

// Canonical watch URL — oEmbed accepts watch URLs reliably for all shapes.
function canonicalWatchUrl(videoId) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

// Fetch title/author via YouTube oEmbed (no API key). Best-effort: any failure
// returns {} so the route stays `youtube` and the skill can fall back.
async function fetchYouTubeMeta(watchUrl) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const endpoint = `https://www.youtube.com/oembed?url=${encodeURIComponent(watchUrl)}&format=json`;
    const res = await fetch(endpoint, { redirect: "follow", signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) return {};
    const data = await res.json();
    return { title: data.title, author: data.author_name };
  } catch {
    return {};
  }
}

async function main() {
  const cleanedUrl = cleanUrl(url);
  const yt = detectYouTube(cleanedUrl);

  // For YouTube, dedup/store against the canonical watch URL so youtu.be and
  // shorts links collapse onto the same identity-param key as watch URLs.
  const effectiveUrl = yt.isYouTube ? canonicalWatchUrl(yt.videoId) : cleanedUrl;
  const route = yt.isYouTube ? "youtube" : classifyType(cleanedUrl);

  const httpStatus = await checkAccessibility(cleanedUrl);
  const accessible = httpStatus === "200";
  const duplicate = checkDuplicate(effectiveUrl, CONTENT_DIR);

  const out = {
    original_url: url,
    clean_url: effectiveUrl,
    http_status: httpStatus,
    accessible,
    duplicate,
    route,
  };

  if (route === "youtube") {
    const meta = await fetchYouTubeMeta(effectiveUrl);
    if (meta.title) out.title = meta.title;
    if (meta.author) out.author = meta.author;
  }

  console.log(JSON.stringify(out, null, 2));
}

main();
