// Parity suite: every golden file under __fixtures__/golden/ was captured from
// the Go engine before the JavaScript port was trusted, so a mismatch here means
// the port drifted — not that the expectation is stale.
//
// Deterministic tier only: every case either touches no network or uses a
// non-resolving .invalid host, so `npm test` passes offline. Live-upstream cases
// live in network.test.js.

import assert from "node:assert/strict";
import { execFileSync, execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

import { detectYouTube } from "./add-url.js";
import { extractInnerUrl } from "./detect-image-source.js";
import { looksLikeChallenge } from "./fetch-via-defuddle.js";
import { findMostRecentNewsletter } from "./find-newsletter-number.js";
import { loadPublications, parseLastmod } from "./find-substack-post.js";
import { countPostEntries } from "./post-stats.js";
import {
  captionForUuid,
  extractCandidates,
  itemLink,
  itemTitle,
  postTitleFromHtml,
} from "./html-text.js";

const HERE = import.meta.dirname;
const ENGINE = join(HERE, "index.js");
const FIXTURES = join(HERE, "__fixtures__");
const GOLDEN = join(FIXTURES, "golden");
const MARKUP = join(FIXTURES, "markup");

const MAIN = join(FIXTURES, "repo");
const EMPTY = join(FIXTURES, "repo-empty");
const FALLBACK = join(FIXTURES, "repo-year-fallback");

const EXIT_CODES = JSON.parse(readFileSync(join(GOLDEN, "_exit-codes.json"), "utf8"));

// Real Substack hosts: detect-image-source never touches the network.
const CDN =
  "https://substackcdn.com/image/fetch/$s_!lpxK!,w_1100,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Faaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee_2484x3002.png";
const S3 =
  "https://substack-post-media.s3.amazonaws.com/public/images/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee_1280x720.png";
// add-url HEADs the URL, so its image cases use non-resolving hosts that still
// carry the substack-post-media marker — same routing, stable "000" status.
const CDN_OFFLINE =
  "https://cdn.invalid/image/fetch/w_1100,c_limit,f_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Faaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee_2484x3002.png";
const S3_OFFLINE =
  "https://substack-post-media.s3.invalid/public/images/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee_1280x720.png";
const UNKNOWN_IMG =
  "https://cdn.invalid/image/fetch/f_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F12345678-1234-1234-1234-123456789abc_100x100.avif?x=1";

/**
 * Cases are [id, engine args, working directory]. The working directory is how
 * content-scanning commands are pointed at a fixture tree: both engines resolve
 * content/post from the process CWD, so no test-only config knob exists.
 * @type {[string, string[], string][]}
 */
const CLI_CASES = [
  // add-url — tracking-parameter stripping keeps surviving pairs verbatim
  ["add-url-tracking-params", ["add-url", "https://a.invalid/article?utm_source=x&utm_medium=y&fbclid=abc&keep=1&ref=z&s=1"], MAIN],
  // %7E must not become ~ and + must not become %20
  ["add-url-encoding-preserved", ["add-url", "https://A.invalid/path/?a=%7Efoo+bar&b=2#frag"], MAIN],
  // %20 must not become +, a valueless key must not gain =, and %7e must keep
  // its lowercase hex — all three are lost by rebuilding the query
  ["add-url-query-verbatim", ["add-url", "https://a.invalid/path?a=%20x&flag&b=%7ez&utm_source=drop"], MAIN],
  // every shape a URL is stored in must be found by the dedup scan
  ["add-url-dup-bare", ["add-url", "https://bare2.invalid/article"], MAIN],
  ["add-url-dup-trailing-slash", ["add-url", "https://slash.invalid/post/"], MAIN],
  ["add-url-dup-autolink", ["add-url", "https://autolink.invalid/entry"], MAIN],
  ["add-url-dup-markdown-link", ["add-url", "https://link.invalid/story"], MAIN],
  // a needle that is only a PREFIX of a stored URL is not a duplicate
  ["add-url-prefix-not-duplicate", ["add-url", "https://prefix.invalid/posts/the-long"], MAIN],
  ["add-url-prefix-exact-duplicate", ["add-url", "https://prefix.invalid/posts/the-long-slug"], MAIN],
  // transform variants of one Substack image share the uuid identity
  ["add-url-image-cdn-duplicate", ["add-url", CDN_OFFLINE], MAIN],
  ["add-url-image-s3-duplicate", ["add-url", S3_OFFLINE], MAIN],
  ["add-url-image-avif-query", ["add-url", UNKNOWN_IMG], MAIN],
  ["add-url-document-pdf", ["add-url", "https://a.invalid/file.pdf"], MAIN],
  ["add-url-video-mp4", ["add-url", "https://a.invalid/clip.mp4"], MAIN],
  // no title/author keys at all when there is no metadata to report
  ["add-url-article-no-metadata", ["add-url", "https://a.invalid/plain"], MAIN],
  // detect-image-source
  ["detect-image-cdn-wrapper", ["detect-image-source", CDN], MAIN],
  ["detect-image-raw-s3", ["detect-image-source", S3], MAIN],
  ["detect-image-non-substack", ["detect-image-source", "https://a.invalid/pic.png"], MAIN],
  // a malformed percent sequence falls back to the raw substring
  ["detect-image-malformed-percent", ["detect-image-source", "https://substackcdn.com/image/fetch/w_100/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F%ZZbad.png"], MAIN],
  // the newest year wins even though an older year holds a higher number
  ["find-newsletter-number-main", ["find-newsletter-number"], MAIN],
  ["find-newsletter-number-empty", ["find-newsletter-number"], EMPTY],
  ["find-newsletter-number-year-fallback", ["find-newsletter-number"], FALLBACK],
  // plain text, count right-aligned in six columns, ties in first-seen order
  ["list-existing-tags-main", ["list-existing-tags"], MAIN],
  ["post-stats-full", ["post-stats", "content/post/2026/09/10/index.md"], MAIN],
  ["post-stats-empty-bonus", ["post-stats", "content/post/2026/09/11/empty-bonus.md"], MAIN],
  ["post-stats-no-bonus", ["post-stats", "content/post/2026/09/11/no-bonus.md"], MAIN],
];

/**
 * runEngine invokes the real CLI surface, so exit codes are exercised too.
 * @param {string[]} args
 * @param {string} cwd
 * @returns {{stdout: string, code: number}}
 */
function runEngine(args, cwd) {
  try {
    return { stdout: execFileSync("node", [ENGINE, ...args], { cwd, encoding: "utf8" }), code: 0 };
  } catch (err) {
    return { stdout: err.stdout ?? "", code: err.status ?? 1 };
  }
}

/**
 * @param {string} id
 * @returns {string}
 */
function golden(id) {
  const ext = id.startsWith("list-existing-tags") || id.startsWith("find-newsletter-number") ? "txt" : "json";
  return readFileSync(join(GOLDEN, `${id}.${ext}`), "utf8");
}

for (const [id, args, cwd] of CLI_CASES) {
  test(`cli parity: ${id}`, () => {
    const { stdout, code } = runEngine(args, cwd);
    // Byte-for-byte: key order is part of the contract the skills parse.
    assert.equal(stdout, golden(id), `stdout differs from the Go capture for ${id}`);
    assert.equal(code, EXIT_CODES[id]);
  });
}

// --- extraction helpers, compared against saved upstream markup -------------
//
// These assert parsed objects rather than bytes: the Go capture harness emitted
// a map, whose key order is alphabetical rather than a contract.

test("extraction parity: real RSS item", () => {
  const feed = readFileSync(join(MARKUP, "bytebytego-feed.xml"), "utf8");
  const uuid = "02a5951e-febf-4289-8905-c67f45e754a1";
  const item = feed.split("<item>").find((chunk) => chunk.includes(uuid));
  assert.ok(item !== undefined, "the feed fixture no longer contains the uuid under test");
  const expected = JSON.parse(golden("extract-rss-item"));
  assert.equal(itemTitle(item), expected.itemTitle);
  assert.equal(itemLink(item), expected.itemLink);
  assert.equal(captionForUuid(item, uuid), expected.caption);
  // The parser recovers one TOC bullet the Go regex dropped; every bullet the
  // regex found is still present, in the same order.
  const candidates = extractCandidates(item);
  for (const c of expected.candidates) assert.ok(candidates.includes(c), `lost candidate: ${c}`);
});

test("extraction parity: nested figure, rune limits, dedupe", () => {
  const html = readFileSync(join(MARKUP, "edge-cases.html"), "utf8");
  const expected = JSON.parse(golden("extract-edge-html"));
  // The innermost enclosing figure supplies the caption, not the outer one.
  assert.equal(captionForUuid(html, "11111111-2222-3333-4444-555555555555"), expected.caption);
  // A figure without a figcaption yields nothing rather than borrowing one.
  assert.equal(captionForUuid(html, "99999999-8888-7777-6666-555555555555"), "");
  assert.deepEqual(extractCandidates(html), expected.candidates);
  assert.equal(postTitleFromHtml(html), expected.postTitle);
});

test("bullet length is measured in code points, not UTF-16 units", () => {
  const html = readFileSync(join(MARKUP, "edge-cases.html"), "utf8");
  const candidates = extractCandidates(html);
  const kept = candidates.find((c) => c.startsWith("\u{1F680}"));
  // 70 code points but 71 UTF-16 units: counting units would drop it.
  assert.ok(kept !== undefined, "the 70-code-point bullet was dropped");
  assert.equal([...kept].length, 70);
  assert.ok(kept.length > 70);
  // 71 code points is over the limit in both engines.
  assert.ok(!candidates.some((c) => c.includes("BBB")), "the 71-code-point bullet was kept");
  // Under six code points is dropped; exactly six is kept.
  assert.ok(!candidates.includes("fiver"));
  assert.ok(candidates.includes("sixchr"));
});

test("postTitleFromHtml precedence: og:title, then h1, then title", () => {
  assert.equal(
    postTitleFromHtml('<html><head><meta property="og:title" content="OG &amp; T"><title>Doc</title></head><body><h1>H</h1></body></html>'),
    "OG & T",
  );
  assert.equal(postTitleFromHtml("<html><body><h1>Head <em>One</em></h1></body></html>"), "Head One");
  assert.equal(postTitleFromHtml("<html><head><title>Only &amp; Title</title></head><body></body></html>"), "Only & Title");
  assert.equal(postTitleFromHtml("<html><body><p>nothing</p></body></html>"), "");
});

test("fetch-via-defuddle rejects bad arguments with exit 2", () => {
  const { code } = runEngine(["fetch-via-defuddle"], MAIN);
  // The previous engine defined 2 as well, but its runner collapsed every
  // nonzero exit to 1, so the distinction was never observable.
  assert.equal(code, 2);
});

test("a reader that closes early does not produce a stack trace", () => {
  // `node scripts/newsletter list-existing-tags | head -1` must exit quietly.
  const stderrPath = join(HERE, "__fixtures__", "repo");
  const out = execSync(`node ${JSON.stringify(ENGINE)} list-existing-tags | head -1`, {
    cwd: stderrPath,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  assert.equal(out, "     3 AI-Assisted\n");
});

test("an unknown subcommand exits 1 and prints usage", () => {
  const { code } = runEngine(["no-such-command"], MAIN);
  assert.equal(code, 1);
});

// --- unit coverage for the pure exports ------------------------------------
//
// Importing a command module must not run the CLI, which is why printJson lives
// in its own file. These tests are the standing proof of that.

test("detectYouTube recognises the three supported shapes and nothing else", () => {
  assert.deepEqual(detectYouTube("https://www.youtube.com/watch?v=abc123"), { isYouTube: true, videoId: "abc123" });
  assert.deepEqual(detectYouTube("https://youtu.be/abc123"), { isYouTube: true, videoId: "abc123" });
  assert.deepEqual(detectYouTube("https://www.youtube.com/shorts/abc123"), { isYouTube: true, videoId: "abc123" });
  // A playlist carries no single video identity, so it falls through to type.
  assert.equal(detectYouTube("https://www.youtube.com/playlist?list=PL1").isYouTube, false);
  assert.equal(detectYouTube("https://www.youtube.com/watch").isYouTube, false);
  assert.equal(detectYouTube("https://youtu.be/").isYouTube, false);
  assert.equal(detectYouTube("not a url").isYouTube, false);
});

test("extractInnerUrl unwraps the CDN form and survives a bad escape", () => {
  assert.equal(
    extractInnerUrl("https://substackcdn.com/image/fetch/w_1/https%3A%2F%2Fs3.example.com%2Fa.png"),
    "https://s3.example.com/a.png",
  );
  // A malformed percent sequence returns the raw substring instead of throwing.
  assert.equal(
    extractInnerUrl("https://substackcdn.com/image/fetch/w_1/https%3A%2F%2Fs3.example.com%2F%ZZ.png"),
    "https%3A%2F%2Fs3.example.com%2F%ZZ.png",
  );
  // An already-decoded inner URL is found too.
  assert.equal(extractInnerUrl("https://cdn.example.com/x/https://s3.example.com/a.png"), "https://s3.example.com/a.png");
  // No wrapper at all: the input comes back untouched.
  assert.equal(extractInnerUrl("https://s3.example.com/a.png"), "https://s3.example.com/a.png");
});

test("countPostEntries attributes entries to the open Bonus subsection", () => {
  const post = [
    "## [An article](https://a.invalid/1)",
    "### Bonus",
    "**Images:**",
    "![label](https://a.invalid/i.png)",
    "**Videos:**",
    "[A talk](https://a.invalid/v)",
    "**Documents:**",
    "[PDF: paper](https://a.invalid/p.pdf)",
  ].join("\n");
  assert.deepEqual(countPostEntries(post), {
    articles: 1, images: 1, videos: 1, documents: 1, total: 4,
  });
  // An image entry outside any subsection belongs to nothing.
  assert.equal(countPostEntries("### Bonus\n![x](y)").images, 0);
  // Article headings are counted outside Bonus only when they are links.
  assert.equal(countPostEntries("## Plain heading").articles, 0);
});

test("parseLastmod accepts only the two layouts the sitemap crawl trusts", () => {
  assert.ok(parseLastmod("2026-09-18") instanceof Date);
  assert.ok(parseLastmod("2026-09-18T10:00:00Z") instanceof Date);
  assert.ok(parseLastmod("2026-09-18T10:00:00+07:00") instanceof Date);
  // No timezone: reading it as local time would shift the cutoff comparison.
  assert.equal(parseLastmod("2026-09-18T10:00:00"), null);
  assert.equal(parseLastmod("18/09/2026"), null);
  assert.equal(parseLastmod(""), null);
});

test("loadPublications returns a non-empty list", () => {
  const pubs = loadPublications();
  assert.ok(Array.isArray(pubs));
  assert.ok(pubs.length > 0);
  assert.ok(pubs.every((p) => typeof p === "string" && p.length > 0));
});

test("findMostRecentNewsletter reads the tree under the process working directory", () => {
  const cwd = process.cwd();
  try {
    process.chdir(MAIN);
    // The newest year wins even though an older year holds #999.
    assert.equal(findMostRecentNewsletter(), 132);
  } finally {
    process.chdir(cwd);
  }
});

test("a bot wall is not mistaken for the page that was asked for", () => {
  // A 200 challenge page extracts to a non-empty body; treating it as success
  // would spend the local tier's turn and skip the proxy, which is the tier that
  // fetches from a different IP.
  assert.equal(looksLikeChallenge("Just a moment...", "Enable JavaScript and cookies to continue"), true);
  assert.equal(looksLikeChallenge("Attention Required! | Cloudflare", "Please unblock challenges.example"), true);
  assert.equal(looksLikeChallenge("", "Verify you are human by completing the action below."), true);
  // An article that merely discusses Cloudflare is not a challenge.
  const article = "Introduction\n".padEnd(500, "x") + " we moved our edge to Cloudflare last quarter";
  assert.equal(looksLikeChallenge("How we cut latency in half", article), false);
  assert.equal(looksLikeChallenge("Example Domain", "This domain is for use in documentation examples."), false);
});
