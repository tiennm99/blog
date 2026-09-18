// Meta URL router for the mt-add-url skill — the single entry per URL.
// Usage: node scripts/newsletter add-url "<url>"
// Outputs: JSON { original_url, clean_url, http_status, accessible,
//                 duplicate, route, title?, author? }
//
// route ∈ youtube | image | video | document | article

import { printJson } from "./json-out.js";
import {
  checkAccessibility,
  checkDuplicate,
  classifyType,
  cleanUrl,
  contentDir,
  fetchTextOk,
  isSubstackImage,
} from "./url-utils.js";

const YT_HOSTS = new Set(["youtube.com", "www.youtube.com", "m.youtube.com"]);

/**
 * detectYouTube extracts a video id from the supported URL shapes:
 * youtube.com/watch?v=ID, youtu.be/ID, youtube.com/shorts/ID.
 * Playlists/channels are intentionally NOT YouTube routes (fall through to type).
 * @param {string} target
 * @returns {{isYouTube: boolean, videoId: string}}
 */
export function detectYouTube(target) {
  let u;
  try {
    u = new URL(target);
  } catch {
    return { isYouTube: false, videoId: "" };
  }
  const host = u.host.toLowerCase();
  if (host === "youtu.be") {
    const id = u.pathname.replace(/^\//, "").split("/")[0];
    return { isYouTube: id !== "", videoId: id };
  }
  if (YT_HOSTS.has(host)) {
    if (u.pathname === "/watch") {
      const id = u.searchParams.get("v") ?? "";
      return { isYouTube: id !== "", videoId: id };
    }
    if (u.pathname.startsWith("/shorts/")) {
      const parts = u.pathname.split("/");
      if (parts.length > 2 && parts[2] !== "") return { isYouTube: true, videoId: parts[2] };
    }
  }
  return { isYouTube: false, videoId: "" };
}

/**
 * canonicalWatchUrl — oEmbed accepts watch URLs reliably for all shapes.
 * @param {string} videoId
 * @returns {string}
 */
function canonicalWatchUrl(videoId) {
  return "https://www.youtube.com/watch?v=" + videoId;
}

/**
 * fetchYouTubeMeta fetches title/author via YouTube oEmbed (no API key).
 * Best-effort: any failure returns empty strings so the route stays `youtube`
 * and the skill can fall back.
 * @param {string} watchUrl
 * @returns {Promise<{title: string, author: string}>}
 */
async function fetchYouTubeMeta(watchUrl) {
  const endpoint =
    "https://www.youtube.com/oembed?url=" + encodeURIComponent(watchUrl) + "&format=json";
  const body = await fetchTextOk(endpoint, 10_000);
  if (body === "") return { title: "", author: "" };
  try {
    const data = JSON.parse(body);
    return { title: data.title ?? "", author: data.author_name ?? "" };
  } catch {
    return { title: "", author: "" };
  }
}

/**
 * @param {string[]} args
 * @returns {Promise<void>}
 */
export async function runAddUrl(args) {
  if (args.length < 1 || args[0] === "") {
    process.stderr.write("Usage: node scripts/newsletter add-url <url>\n");
    process.exit(1);
  }
  const target = args[0];

  const cleaned = cleanUrl(target);
  const { isYouTube, videoId } = detectYouTube(cleaned);

  // For YouTube, dedup/store against the canonical watch URL so youtu.be and
  // shorts links collapse onto the same identity-param key as watch URLs.
  const effectiveUrl = isYouTube ? canonicalWatchUrl(videoId) : cleaned;

  // Route order: YouTube → Substack image (by host, not extension, so f_auto /
  // .avif / .heic / extensionless CDN URLs still route to the image handler) →
  // file-extension classification.
  let route;
  if (isYouTube) route = "youtube";
  else if (isSubstackImage(cleaned)) route = "image";
  else route = classifyType(cleaned);

  const httpStatus = await checkAccessibility(cleaned);

  // title/author are omitted entirely when empty, not emitted as "": the
  // handlers treat a present key as "metadata was resolved".
  /** @type {Record<string, unknown>} */
  const out = {
    original_url: target,
    clean_url: effectiveUrl,
    http_status: httpStatus,
    accessible: httpStatus === "200",
    duplicate: checkDuplicate(effectiveUrl, contentDir()),
    route,
  };
  if (route === "youtube") {
    const { title, author } = await fetchYouTubeMeta(effectiveUrl);
    if (title !== "") out.title = title;
    if (author !== "") out.author = author;
  }
  printJson(out);
}
