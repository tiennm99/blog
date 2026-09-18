// Live-upstream tier. Opt-in via NEWSLETTER_NET=1: upstream content moves, and a
// suite that goes red on someone else's outage teaches people to ignore red.
//
// These assert structure and invariants rather than captured bytes, because the
// bytes legitimately change when a publication posts.

import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { test } from "node:test";

const HERE = import.meta.dirname;
const ENGINE = join(HERE, "index.js");
const FIXTURE_REPO = join(HERE, "__fixtures__", "repo");

const skip = process.env.NEWSLETTER_NET !== "1";
const OPTS = { skip: skip ? "set NEWSLETTER_NET=1 to run live-upstream cases" : false };

/**
 * @param {string[]} args
 * @returns {{stdout: string, code: number}}
 */
function runEngine(args) {
  try {
    return {
      stdout: execFileSync("node", [ENGINE, ...args], { cwd: FIXTURE_REPO, encoding: "utf8" }),
      code: 0,
    };
  } catch (err) {
    return { stdout: err.stdout ?? "", code: err.status ?? 1 };
  }
}

const WATCH = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
const CANONICAL = WATCH;

test("add-url: a watch URL routes to youtube and resolves oEmbed metadata", OPTS, () => {
  const out = JSON.parse(runEngine(["add-url", WATCH + "&utm_source=nl"]).stdout);
  assert.equal(out.route, "youtube");
  assert.equal(out.clean_url, CANONICAL);
  assert.ok(out.title.length > 0, "oEmbed returned no title");
  assert.ok(out.author.length > 0, "oEmbed returned no author");
});

test("add-url: youtu.be and shorts collapse onto the canonical watch identity", OPTS, () => {
  const short = JSON.parse(runEngine(["add-url", "https://youtu.be/dQw4w9WgXcQ"]).stdout);
  assert.equal(short.route, "youtube");
  assert.equal(short.clean_url, CANONICAL);
  const shorts = JSON.parse(runEngine(["add-url", "https://www.youtube.com/shorts/dQw4w9WgXcQ"]).stdout);
  assert.equal(shorts.route, "youtube");
  assert.equal(shorts.clean_url, CANONICAL);
});

test("add-url: a playlist is not a youtube route", OPTS, () => {
  const out = JSON.parse(runEngine(["add-url", "https://www.youtube.com/playlist?list=PLrAXtmRdnEQy6nuLMfO6uZ1a4Z3AQoMek"]).stdout);
  assert.equal(out.route, "article");
  assert.equal(out.title, undefined);
});

test("find-substack-post: a uuid no publication carries reports a bare miss", OPTS, () => {
  const out = JSON.parse(runEngine(["find-substack-post", "--uuid", "ffffffff-ffff-ffff-ffff-ffffffffffff"]).stdout);
  assert.deepEqual(out, { found: false });
});

test("find-substack-post: a deep miss reports the crawl budget and cutoff", OPTS, () => {
  const out = JSON.parse(runEngine(["find-substack-post", "--uuid", "ffffffff-ffff-ffff-ffff-ffffffffffff", "--deep"]).stdout);
  assert.equal(out.found, false);
  assert.equal(out.source, "sitemap");
  assert.equal(out.budget, 40);
  assert.ok(Number.isInteger(out.scanned));
  // cutoff is null (present, not omitted) when no sitemap could be fetched.
  assert.ok("cutoff" in out, "cutoff key is missing");
  assert.ok(out.cutoff === null || /^\d{4}-\d{2}-\d{2}$/.test(out.cutoff));
});

test("find-substack-post: a uuid from the live feed resolves to its post", OPTS, async () => {
  const res = await fetch("https://blog.bytebytego.com/feed", { headers: { "user-agent": "Mozilla/5.0" } });
  const feed = await res.text();
  const m = /public\/images\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/.exec(feed);
  assert.ok(m !== null, "the live feed carried no image uuid");
  const out = JSON.parse(runEngine(["find-substack-post", "--uuid", m[1]]).stdout);
  assert.equal(out.found, true);
  assert.equal(out.source, "rss");
  assert.ok(out.postUrl.startsWith("https://"));
  assert.ok(out.postTitle.length > 0);
  assert.ok(Array.isArray(out.candidates));
});

test("fetch-via-defuddle: a reachable page returns frontmatter and a body", OPTS, () => {
  const { stdout, code } = runEngine(["fetch-via-defuddle", "https://example.com/"]);
  assert.equal(code, 0);
  // Both tiers emit the same shape, so the caller parses one format.
  assert.ok(stdout.startsWith("---\n"), "no YAML frontmatter");
  assert.match(stdout, /^title: /m);
  const body = stdout.split("\n---\n")[1] ?? "";
  assert.ok(body.trim().length > 0, "frontmatter with no body");
});

test("fetch-via-defuddle: an unresolvable host exhausts both tiers and exits 1", OPTS, () => {
  const { code } = runEngine(["fetch-via-defuddle", "https://nonexistent-host-xyz-12345.invalid/a"]);
  assert.equal(code, 1);
});
