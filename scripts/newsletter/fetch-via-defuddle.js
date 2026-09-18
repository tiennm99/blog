// mt-fetch-url fallback fetcher.
// Usage: node scripts/newsletter fetch-via-defuddle <target_url>
// Exit codes: 0 = content returned, 1 = every tier failed, 2 = bad arguments.
//
// Two tiers, tried in order:
//  1. local defuddle — extracts on this machine, so the chain no longer depends
//     on a single third-party service being reachable.
//  2. the defuddle.md proxy — fetches from a third IP, which is the point when
//     this machine's IP is the one being blocked.
//
// Both tiers emit YAML frontmatter followed by the markdown body, so callers
// parse one shape regardless of which tier answered.

const BROWSER_UA =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

// A bot wall answers 200 with a real body, so a non-empty extraction is not by
// itself a success. Recognising the wall is what lets the proxy tier — which
// fetches from a different IP — still get its turn.
const CHALLENGE_MARKERS = [
  /just a moment/i,
  /checking your browser/i,
  /attention required/i,
  /cloudflare/i,
  /enable javascript (and cookies )?to continue/i,
  /verify (that )?you('re| are) (a )?human/i,
  /are you a robot/i,
  /access denied/i,
  /captcha/i,
];

/**
 * looksLikeChallenge reports whether an extraction is a bot wall rather than the
 * page that was asked for.
 * @param {string} title
 * @param {string} body
 * @returns {boolean}
 */
export function looksLikeChallenge(title, body) {
  // Only the opening of the body: an article may legitimately discuss Cloudflare.
  const sample = title + "\n" + body.slice(0, 400);
  return CHALLENGE_MARKERS.some((re) => re.test(sample));
}

/**
 * yamlFrontmatter renders the metadata block, omitting fields with no value.
 * @param {Record<string, string>} fields
 * @returns {string}
 */
function yamlFrontmatter(fields) {
  const lines = Object.entries(fields)
    .filter(([, v]) => typeof v === "string" && v !== "")
    .map(([k, v]) => `${k}: ${JSON.stringify(v)}`);
  return lines.length === 0 ? "" : "---\n" + lines.join("\n") + "\n---\n\n";
}

/**
 * fetchLocally extracts article content with defuddle running in-process, and
 * renders it in the same frontmatter-plus-body shape the proxy returns.
 * @param {string} target
 * @returns {Promise<string>} the document, or "" when extraction yields nothing usable
 */
async function fetchLocally(target) {
  const { Defuddle } = await import("defuddle/node");
  const { parseHTML } = await import("linkedom");
  const res = await fetch(target, {
    headers: { "user-agent": BROWSER_UA },
    redirect: "follow",
    signal: AbortSignal.timeout(30_000),
  });
  if (!res.ok) throw new Error(`upstream returned ${res.status}`);
  const html = await res.text();
  const { document } = parseHTML(html);
  const result = await Defuddle(document, target, { markdown: true });
  const body = String(result?.content ?? "");
  if (body.trim() === "") return "";
  const title = String(result?.title ?? "");
  if (looksLikeChallenge(title, body)) {
    throw new Error("extraction looks like a bot challenge, not the page");
  }
  const frontmatter = yamlFrontmatter({
    title,
    author: String(result?.author ?? ""),
    description: String(result?.description ?? ""),
    site: String(result?.site ?? ""),
    published: String(result?.published ?? ""),
    source: target,
  });
  return frontmatter + body;
}

/**
 * fetchViaProxy fetches through defuddle.md, which resolves the page from its
 * own IP.
 * @param {string} target
 * @returns {Promise<string>} the response body
 */
async function fetchViaProxy(target) {
  const res = await fetch("https://defuddle.md/" + target, {
    headers: { "user-agent": "mt-fetch-url/1.0" },
    redirect: "follow",
    signal: AbortSignal.timeout(30_000),
  });
  const body = await res.text();
  if (!res.ok || body.trim() === "") {
    throw new Error(`defuddle returned ${res.status} / empty body`);
  }
  return body;
}

/**
 * @param {string[]} args
 * @returns {Promise<void>}
 */
export async function runFetchViaDefuddle(args) {
  if (args.length < 1 || args[0] === "") {
    process.stderr.write("Usage: node scripts/newsletter fetch-via-defuddle <target_url>\n");
    process.exit(2);
  }
  const target = args[0];

  try {
    const doc = await fetchLocally(target);
    if (doc !== "") {
      process.stdout.write(doc.endsWith("\n") ? doc : doc + "\n");
      return;
    }
    process.stderr.write(`mt-fetch-url: local defuddle extracted nothing for ${target}\n`);
  } catch (err) {
    process.stderr.write(
      `mt-fetch-url: local defuddle failed for ${target}: ${String(err?.message ?? err)}\n`,
    );
  }

  try {
    process.stdout.write(await fetchViaProxy(target));
  } catch (err) {
    process.stderr.write(
      `mt-fetch-url: defuddle.md failed for ${target}: ${String(err?.message ?? err)}\n`,
    );
    process.exit(1);
  }
}
