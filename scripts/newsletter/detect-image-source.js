#!/usr/bin/env node
// Detect whether an image URL is Substack-hosted and extract its S3 image UUID.
// Usage: node detect-image-source.js "<image-url>"
// Output: JSON { original_url, clean_url, isSubstack, uuid?, innerUrl? }
//
// Substack images are usually served via a CDN wrapper:
//   https://substackcdn.com/image/fetch/$s_!x!,.../https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F<uuid>_WxH.png
// The publication is NOT encoded in the URL — only the image identity (uuid) is.

const {
  cleanUrl,
  isSubstackImage,
  substackImageUuid,
} = require("./url-utils.js");

const url = process.argv[2];
if (!url) {
  console.error("Usage: node detect-image-source.js <image-url>");
  process.exit(1);
}

// Pull the inner S3 URL out of a substackcdn /image/fetch/ wrapper (if present).
function extractInnerUrl(targetUrl) {
  const marker = targetUrl.indexOf("/https%3A%2F%2F");
  if (marker !== -1) return decodeURIComponent(targetUrl.slice(marker + 1));
  // Some forms embed a plain (already-decoded) inner https URL.
  const plain = targetUrl.indexOf("/https://", 8);
  if (plain !== -1) return targetUrl.slice(plain + 1);
  return targetUrl;
}

const cleaned = cleanUrl(url);
const isSubstack = isSubstackImage(url);
const uuid = isSubstack ? substackImageUuid(url) : null;
const innerUrl = isSubstack ? extractInnerUrl(url) : null;

console.log(JSON.stringify({
  original_url: url,
  clean_url: cleaned,
  isSubstack,
  ...(uuid ? { uuid } : {}),
  ...(innerUrl ? { innerUrl } : {}),
}, null, 2));
