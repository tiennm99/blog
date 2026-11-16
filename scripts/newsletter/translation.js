// Translation bookkeeping for the bilingual site. Vietnamese `index.md` /
// `_index.md` is the source; a translation is the sibling `index.<lang>.md`.
//
//	translation-status [--lang en] [--category <name>] [path...]
//	    list sources with no translation (missing) or edited after their
//	    translation was last committed (stale)
//	translation-check <index.md> [--lang en]
//	    verify a translation keeps the source's structure: frontmatter, links,
//	    code block count, and for newsletters the entry headings and image labels

import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { printJson } from "./json-out.js";

const SOURCE_NAMES = new Set(["index.md", "_index.md"]);
// Frontmatter keys whose values are prose and get translated; every other key
// must match the source exactly (tags, categories, date, …).
const TRANSLATABLE_KEYS = new Set(["title", "description", "summary"]);

/**
 * @param {string} source path to index.md or _index.md
 * @param {string} lang
 * @returns {string}
 */
export function translationPath(source, lang) {
  return join(dirname(source), basename(source, ".md") + "." + lang + ".md");
}

/**
 * @param {string} source e.g. content/post/2025/03/25/index.md
 * @returns {string} the bundle's URL path, e.g. /post/2025/03/25/
 */
export function bundleUrl(source) {
  const dir = dirname(source).replace(/^(\.\/)?content\/?/, "");
  return dir === "" ? "/" : `/${dir}/`;
}

/**
 * @param {string} dir
 * @returns {string[]} source files under dir, sorted
 */
function walkSources(dir) {
  /** @type {string[]} */
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkSources(p));
    else if (SOURCE_NAMES.has(entry.name)) out.push(p);
  }
  return out.sort();
}

/**
 * Splits a Markdown file into its frontmatter key/value lines and body.
 * Top-level keys only; nested YAML stays attached to its parent key's value.
 * @param {string} content
 * @returns {{front: Map<string, string>, body: string}}
 */
export function splitFrontmatter(content) {
  /** @type {Map<string, string>} */
  const front = new Map();
  const m = /^---\n([\s\S]*?)\n---\n?/.exec(content);
  if (m === null) return { front, body: content };
  let key = "";
  for (const line of m[1].split("\n")) {
    const kv = /^([A-Za-z_][\w-]*):(.*)$/.exec(line);
    if (kv !== null) {
      key = kv[1];
      front.set(key, kv[2].trim());
    } else if (key !== "") {
      front.set(key, front.get(key) + "\n" + line);
    }
  }
  return { front, body: content.slice(m[0].length) };
}

/**
 * @param {string} body
 * @returns {{prose: string[], code: string[]}} prose lines and fenced code blocks
 */
function splitCode(body) {
  /** @type {string[]} */
  const prose = [];
  /** @type {string[]} */
  const code = [];
  let fence = "";
  /** @type {string[]} */
  let block = [];
  for (const raw of body.split("\n")) {
    const line = raw.trimStart();
    if (fence === "") {
      const open = /^(`{3,}|~{3,})/.exec(line);
      if (open !== null) {
        fence = open[1];
        block = [line];
      } else {
        prose.push(raw);
      }
    } else {
      block.push(line);
      if (line.startsWith(fence) && line.slice(fence.length).trim() === "") {
        code.push(block.join("\n"));
        fence = "";
      }
    }
  }
  if (fence !== "") code.push(block.join("\n"));
  return { prose, code };
}

const LINK_TARGET_RE = /\]\(([^)\s]+)/g;
const INLINE_CODE_RE = /`[^`]*`/g;

/**
 * Link and image targets in document order, normalized so a translation may
 * point at the same resource in its own language: the `/<lang>/` prefix is
 * dropped, bundle-relative paths become root-relative, and in-page anchors
 * (which follow the translated headings) are skipped.
 * @param {string[]} lines
 * @param {string} bundleUrl e.g. "/post/2025/03/25/"
 * @param {string} lang
 * @returns {string[]}
 */
function linkTargets(lines, bundleUrl, lang) {
  /** @type {string[]} */
  const out = [];
  for (const line of lines) {
    for (const m of line.replace(INLINE_CODE_RE, "").matchAll(LINK_TARGET_RE)) {
      let url = m[1];
      if (url.startsWith("#")) continue;
      if (url === `/${lang}` || url.startsWith(`/${lang}/`)) url = url.slice(lang.length + 1) || "/";
      else if (!/^([a-z][a-z0-9+.-]*:|\/)/i.test(url)) url = bundleUrl + url;
      out.push(url);
    }
  }
  return out;
}

/**
 * @param {string[]} a
 * @param {string[]} b
 * @returns {{onlyInSource: string[], onlyInTranslation: string[]}}
 */
function multisetDiff(a, b) {
  /** @type {Map<string, number>} */
  const counts = new Map();
  for (const x of a) counts.set(x, (counts.get(x) ?? 0) + 1);
  /** @type {string[]} */
  const onlyInTranslation = [];
  for (const x of b) {
    const n = counts.get(x) ?? 0;
    if (n > 0) counts.set(x, n - 1);
    else onlyInTranslation.push(x);
  }
  /** @type {string[]} */
  const onlyInSource = [];
  for (const [x, n] of counts) for (let i = 0; i < n; i++) onlyInSource.push(x);
  return { onlyInSource, onlyInTranslation };
}

/**
 * compareTranslation lists structural differences between a source post and
 * its translation. An empty list means the translation is structurally in sync.
 * @param {string} source
 * @param {string} translation
 * @param {{bundleUrl?: string, lang?: string}} [opts]
 * @returns {{newsletter: boolean, problems: string[]}}
 */
export function compareTranslation(source, translation, { bundleUrl = "/", lang = "en" } = {}) {
  /** @type {string[]} */
  const problems = [];
  const src = splitFrontmatter(source);
  const tr = splitFrontmatter(translation);
  const newsletter = /\bNewsletter\b/.test(src.front.get("categories") ?? "");

  for (const [key, value] of src.front) {
    if (!tr.front.has(key)) problems.push(`frontmatter: missing key ${key}`);
    else if (!TRANSLATABLE_KEYS.has(key) && tr.front.get(key) !== value) {
      problems.push(`frontmatter: ${key} differs (source ${value}, translation ${tr.front.get(key)})`);
    }
  }
  for (const key of tr.front.keys()) {
    if (!src.front.has(key)) problems.push(`frontmatter: extra key ${key}`);
  }

  const s = splitCode(src.body);
  const t = splitCode(tr.body);
  const links = multisetDiff(linkTargets(s.prose, bundleUrl, lang), linkTargets(t.prose, bundleUrl, lang));
  for (const url of links.onlyInSource) problems.push(`link missing: ${url}`);
  for (const url of links.onlyInTranslation) problems.push(`link extra: ${url}`);
  if (s.code.length !== t.code.length) {
    problems.push(`code blocks: source ${s.code.length}, translation ${t.code.length}`);
  }

  if (newsletter) {
    // Entry headings keep the source title and image labels stay verbatim, so
    // these lines must appear unchanged and in the same order. Struck entries
    // are covered by the link check only.
    const verbatim = (/** @type {string[]} */ lines) =>
      lines.map((l) => l.trim()).filter((l) => /^##\s+\[/.test(l) || /^!\[/.test(l));
    const sv = verbatim(s.prose);
    const tv = verbatim(t.prose);
    const n = Math.max(sv.length, tv.length);
    for (let i = 0; i < n; i++) {
      if (sv[i] !== tv[i]) {
        problems.push(`entry ${i + 1}: source ${sv[i] ?? "(none)"} / translation ${tv[i] ?? "(none)"}`);
      }
    }
  }
  return { newsletter, problems };
}

/**
 * @param {string[]} paths
 * @returns {Map<string, {sha: string, time: number}>} last commit per file
 */
function lastCommits(paths) {
  /** @type {Map<string, {sha: string, time: number}>} */
  const out = new Map();
  const log = execFileSync(
    "git",
    ["log", "--format=%x01%H %ct", "--name-only", "--no-renames", "--", ...paths],
    { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 },
  );
  for (const chunk of log.split("\x01")) {
    const [head, ...files] = chunk.split("\n");
    if (head === undefined || head === "") continue;
    const [sha, ct] = head.split(" ");
    for (const f of files) {
      if (f !== "" && !out.has(f)) out.set(f, { sha, time: Number(ct) });
    }
  }
  return out;
}

/**
 * @param {string[]} paths
 * @returns {Set<string>} files with uncommitted changes (modified or untracked)
 */
function dirtyFiles(paths) {
  const status = execFileSync(
    "git",
    ["status", "--porcelain=v1", "-z", "--untracked-files=all", "--", ...paths],
    { encoding: "utf8" },
  );
  return new Set(
    status
      .split("\0")
      .filter((e) => e.length > 3)
      .map((e) => e.slice(3)),
  );
}

/**
 * @param {string[]} args
 * @returns {{lang: string, category: string, paths: string[]}}
 */
function parseArgs(args) {
  let lang = "en";
  let category = "";
  /** @type {string[]} */
  const paths = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--lang" && i + 1 < args.length) lang = args[++i];
    else if (args[i] === "--category" && i + 1 < args.length) category = args[++i];
    else if (args[i].startsWith("--")) {
      process.stderr.write(`unknown flag: ${args[i]}\n`);
      process.exit(1);
    } else paths.push(args[i].replace(/\/+$/, ""));
  }
  return { lang, category, paths };
}

/**
 * @param {string[]} args
 * @returns {Promise<void>}
 */
export async function runTranslationStatus(args) {
  const { lang, category, paths } = parseArgs(args);
  const roots = paths.length > 0 ? paths : ["content"];
  /** @type {string[]} */
  let sources = [];
  for (const root of roots) {
    if (SOURCE_NAMES.has(basename(root))) sources.push(root);
    else if (existsSync(root)) sources.push(...walkSources(root));
    else {
      process.stderr.write(`no such path: ${root}\n`);
      process.exit(1);
    }
  }
  if (category !== "") {
    const re = new RegExp(`\\b${category.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`);
    sources = sources.filter((p) =>
      re.test(splitFrontmatter(readFileSync(p, "utf8")).front.get("categories") ?? ""),
    );
  }

  const commits = lastCommits(roots);
  const dirty = dirtyFiles(roots);
  /** @type {string[]} */
  const missing = [];
  /** @type {{source: string, translation: string, since: string}[]} */
  const stale = [];
  for (const source of sources) {
    const translation = translationPath(source, lang);
    if (!existsSync(translation)) {
      missing.push(source);
      continue;
    }
    const sc = commits.get(source);
    const tc = commits.get(translation);
    // A translation counts as in sync when it was committed no earlier than its
    // source, or is being edited alongside it in the working tree.
    const sourceNewer =
      (dirty.has(source) && !dirty.has(translation)) ||
      (!dirty.has(translation) && sc !== undefined && tc !== undefined && sc.time > tc.time);
    if (sourceNewer) stale.push({ source, translation, since: tc?.sha ?? "" });
  }
  printJson({
    lang,
    ...(category !== "" ? { category } : {}),
    total: sources.length,
    translated: sources.length - missing.length - stale.length,
    missing,
    stale,
  });
}

/**
 * @param {string[]} args
 * @returns {Promise<void>}
 */
export async function runTranslationCheck(args) {
  const { lang, paths } = parseArgs(args);
  if (paths.length !== 1) {
    process.stderr.write("usage: translation-check <index.md> [--lang en]\n");
    process.exit(1);
  }
  const source = paths[0];
  const translation = translationPath(source, lang);
  let src;
  let tr;
  try {
    src = readFileSync(source, "utf8");
    tr = readFileSync(translation, "utf8");
  } catch (err) {
    process.stderr.write("read post: " + String(err?.message ?? err) + "\n");
    process.exit(1);
  }
  const { newsletter, problems } = compareTranslation(src, tr, { bundleUrl: bundleUrl(source), lang });
  printJson({ source, translation, newsletter, ok: problems.length === 0, problems });
  if (problems.length > 0) process.exit(2);
}
