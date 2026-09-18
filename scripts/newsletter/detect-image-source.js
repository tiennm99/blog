// Detect whether an image URL is Substack-hosted and extract its S3 image UUID.
// Usage: node scripts/newsletter detect-image-source "<image-url>"
// Output: JSON { original_url, clean_url, isSubstack, uuid?, innerUrl? }
//
// Substack images are usually served via a CDN wrapper:
//
//	https://substackcdn.com/image/fetch/$s_!x!,.../https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F<uuid>_WxH.png
//
// The publication is NOT encoded in the URL — only the image identity (uuid) is.

import { printJson } from "./json-out.js";
import { cleanUrl, isSubstackImage, substackImageUuid } from "./url-utils.js";

/**
 * extractInnerUrl pulls the inner S3 URL out of a substackcdn /image/fetch/
 * wrapper (if present). A malformed percent sequence falls back to the raw
 * substring rather than throwing.
 * @param {string} target
 * @returns {string}
 */
export function extractInnerUrl(target) {
  const marker = target.indexOf("/https%3A%2F%2F");
  if (marker !== -1) {
    const raw = target.slice(marker + 1);
    try {
      return decodeURIComponent(raw);
    } catch {
      return raw;
    }
  }
  // Some forms embed a plain (already-decoded) inner https URL.
  if (target.length > 8) {
    const plain = target.slice(8).indexOf("/https://");
    if (plain !== -1) return target.slice(8 + plain + 1);
  }
  return target;
}

/**
 * @param {string[]} args
 * @returns {Promise<void>}
 */
export async function runDetectImageSource(args) {
  if (args.length < 1 || args[0] === "") {
    process.stderr.write("Usage: node scripts/newsletter detect-image-source <image-url>\n");
    process.exit(1);
  }
  const target = args[0];
  const isSubstack = isSubstackImage(target);

  // Empty optional fields are omitted, not emitted as "": the skills branch on
  // the key being present.
  /** @type {Record<string, unknown>} */
  const out = {
    original_url: target,
    clean_url: cleanUrl(target),
    isSubstack,
  };
  if (isSubstack) {
    const uuid = substackImageUuid(target);
    const innerUrl = extractInnerUrl(target);
    if (uuid !== "") out.uuid = uuid;
    if (innerUrl !== "") out.innerUrl = innerUrl;
  }
  printJson(out);
}
