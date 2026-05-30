#!/usr/bin/env node
// Detect whether an image URL is Substack-hosted and extract its S3 image UUID.
// Usage: node detect-image-source.js "<image-url>"
// Output: JSON { original_url, clean_url, isSubstack, uuid?, innerUrl? }
//
// Substack images are usually served via a CDN wrapper:
//   https://substackcdn.com/image/fetch/$s_!x!,.../https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F<uuid>_WxH.png
// The publication is NOT encoded in the URL — only the image identity (uuid) is.

const path = require("path");
const { cleanUrl } = require("../../mt-add-url/scripts/url-utils.js");

const url = process.argv[2];
if (!url) {
  console.error("Usage: node detect-image-source.js <image-url>");
  process.exit(1);
}

const SUBSTACK_HOSTS = ["substackcdn.com", "substack-post-media.s3.amazonaws.com"];

// Pull the inner S3 URL out of a substackcdn /image/fetch/ wrapper (if present).
function extractInnerUrl(targetUrl) {
  const marker = targetUrl.indexOf("/https%3A%2F%2F");
  if (marker !== -1) {
    return decodeURIComponent(targetUrl.slice(marker + 1));
  }
  // Some forms embed a plain (already-decoded) inner https URL.
  const plain = targetUrl.indexOf("/https://", 8);
  if (plain !== -1) return targetUrl.slice(plain + 1);
  return targetUrl;
}

function detect(targetUrl) {
  let host = "";
  try {
    host = new URL(targetUrl).host.toLowerCase();
  } catch {
    /* fall through — non-URL input is non-Substack */
  }
  const innerUrl = extractInnerUrl(targetUrl);
  const isSubstack =
    SUBSTACK_HOSTS.includes(host) || /substack-post-media/i.test(innerUrl);

  // public/images/<uuid>_WxH.ext — uuid is the stable image identity.
  const m = innerUrl.match(/public\/images\/([0-9a-fA-F-]{36})/);
  const uuid = m ? m[1].toLowerCase() : undefined;

  return { isSubstack, uuid, innerUrl: isSubstack ? innerUrl : undefined };
}

const cleaned = cleanUrl(url);
const { isSubstack, uuid, innerUrl } = detect(url);

console.log(JSON.stringify({
  original_url: url,
  clean_url: cleaned,
  isSubstack,
  ...(uuid ? { uuid } : {}),
  ...(innerUrl ? { innerUrl } : {}),
}, null, 2));
