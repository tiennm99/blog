#!/usr/bin/env node
// mt-webfetch fallback fetcher via defuddle.md
// Usage: node fetch.js <target_url>
// Exit codes: 0 = content returned, 1 = empty/failed, 2 = bad args

const url = process.argv[2];
if (!url) {
  console.error("Usage: node fetch.js <target_url>");
  process.exit(2);
}

const defuddleUrl = `https://defuddle.md/${url}`;

async function main() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);
  try {
    const res = await fetch(defuddleUrl, {
      redirect: "follow",
      signal: controller.signal,
      headers: { "User-Agent": "mt-webfetch/1.0" },
    });
    clearTimeout(timeout);
    const body = await res.text();
    if (!res.ok || !body || body.trim().length === 0) {
      console.error(`mt-webfetch: defuddle returned ${res.status} / empty body for ${url}`);
      process.exit(1);
    }
    process.stdout.write(body);
  } catch (err) {
    clearTimeout(timeout);
    console.error(`mt-webfetch: fetch failed for ${url}: ${err.message}`);
    process.exit(1);
  }
}

main();
