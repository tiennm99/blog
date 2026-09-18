// Newsletter engine for the mt-* skills — one entry point, one subcommand per
// task. Invoked from the repo root:
//
//	node scripts/newsletter <command> [args]
//
// Repo-relative paths (content/post) resolve from the working directory, so the
// repo-root invocation contract from AGENTS.md still applies.

const USAGE = `Usage: node scripts/newsletter <command> [args]

Commands:
  add-url <url>                              classify + dedup a URL, emit JSON route
  find-newsletter-number                     print the next newsletter number
  list-existing-tags                         tag frequencies, most-used first (top 40)
  detect-image-source <url>                  detect Substack image + uuid
  find-substack-post --uuid <uuid> [--deep]  find the post embedding an image uuid
  fetch-via-defuddle <url>                   fallback fetch (local defuddle, then defuddle.md)
  post-stats <path/to/index.md>              count the post's articles/images/videos/documents
`;

// A reader that closes early (`… | head -3`) makes the next write fail with
// EPIPE, which Node surfaces as an unhandled error event. Stop quietly instead
// of printing a stack trace over the user's terminal.
process.stdout.on("error", (err) => {
  if (err.code === "EPIPE") process.exit(0);
  throw err;
});

/** @returns {void} */
function usage() {
  process.stderr.write(USAGE);
}

/**
 * Command modules are imported lazily so a missing node_modules reports the one
 * actionable fix instead of a module-resolution stack trace.
 * @param {string} spec
 * @returns {Promise<Record<string, any>>}
 */
async function loadCommand(spec) {
  try {
    return await import(spec);
  } catch (err) {
    if (err !== null && typeof err === "object" && err.code === "ERR_MODULE_NOT_FOUND") {
      process.stderr.write(
        "newsletter engine: dependencies missing — run 'npm ci' from the repo root\n",
      );
      process.exit(1);
    }
    throw err;
  }
}

/** @type {Record<string, {module: string, fn: string}>} */
const COMMANDS = {
  "add-url": { module: "./add-url.js", fn: "runAddUrl" },
  "find-newsletter-number": { module: "./find-newsletter-number.js", fn: "runFindNewsletterNumber" },
  "list-existing-tags": { module: "./list-existing-tags.js", fn: "runListExistingTags" },
  "detect-image-source": { module: "./detect-image-source.js", fn: "runDetectImageSource" },
  "find-substack-post": { module: "./find-substack-post.js", fn: "runFindSubstackPost" },
  "fetch-via-defuddle": { module: "./fetch-via-defuddle.js", fn: "runFetchViaDefuddle" },
  "post-stats": { module: "./post-stats.js", fn: "runPostStats" },
};

/** @returns {Promise<void>} */
async function main() {
  const argv = process.argv.slice(2);
  if (argv.length < 1) {
    usage();
    process.exit(1);
  }
  const [name, ...args] = argv;
  const entry = COMMANDS[name];
  if (entry === undefined) {
    process.stderr.write(`unknown command: ${name}\n`);
    usage();
    process.exit(1);
  }
  const mod = await loadCommand(entry.module);
  await mod[entry.fn](args);
}

try {
  await main();
} catch (err) {
  process.stderr.write("newsletter engine: " + String(err?.stack ?? err) + "\n");
  process.exit(1);
}
