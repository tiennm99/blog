// Markdown rendering and marker injection for the projects page.

/**
 * Public URL of a repo: its declared homepage, else its GitHub Pages URL when
 * Pages is enabled. Returns an empty string when the repo has neither.
 * @param {import("./github-api.js").Repo} repo
 * @returns {string}
 */
export function resolveUrl(repo) {
  const home = (repo.homepage || "").trim();
  if (home) return home;
  if (repo.hasPages) return `https://${repo.owner}.github.io/${repo.name}/`;
  return "";
}

/**
 * @param {string} text
 * @returns {string} Cell-safe single-line text.
 */
function cell(text) {
  return (text || "")
    .replace(/\|/g, "\\|")
    .replace(/\r?\n/g, " ")
    .trim();
}

/**
 * @param {string} url
 * @returns {string}
 */
function linkOrDash(url) {
  return url ? `[${url}](${url})` : "—";
}

/**
 * @param {string[]} headers
 * @param {string[][]} rows
 * @returns {string[]} Markdown table lines, or an empty-state line.
 */
function table(headers, rows) {
  if (rows.length === 0) return ["_Chưa có project nào._"];
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((r) => `| ${r.join(" | ")} |`),
  ];
}

/**
 * Repos with at least one star, most-starred first.
 * @param {import("./github-api.js").Repo[]} repos
 * @returns {string[]}
 */
export function renderStarred(repos) {
  const rows = repos.map((r) => [
    `[${r.nameWithOwner}](${r.htmlUrl})`,
    cell(r.description),
    String(r.stars),
    linkOrDash(resolveUrl(r)),
  ]);
  return table(["Name", "Description", "Stars", "URL"], rows);
}

/**
 * Repos with a live demo URL.
 * @param {import("./github-api.js").Repo[]} repos
 * @returns {string[]}
 */
export function renderDemo(repos) {
  const rows = repos.map((r) => [
    `[${r.nameWithOwner}](${r.htmlUrl})`,
    cell(r.description),
    linkOrDash(resolveUrl(r)),
  ]);
  return table(["Name", "Description", "URL"], rows);
}

/**
 * Repos owned by others, by merged pull request count.
 * @param {import("./github-api.js").Contribution[]} contributions
 * @returns {string[]}
 */
export function renderContributed(contributions) {
  const rows = contributions.map((c) => [
    `[${c.repo.nameWithOwner}](${c.repo.htmlUrl})`,
    cell(c.repo.description),
    String(c.mergedPrs),
    String(c.repo.stars),
  ]);
  return table(["Name", "Description", "Merged PRs", "Stars"], rows);
}

/**
 * Replace the content between a marker pair. Throws when the pair is missing,
 * so a renamed marker fails loudly instead of silently dropping a list.
 * @param {string} source
 * @param {string} marker Marker base name, e.g. `PROJECTS_STARRED`.
 * @param {string[]} lines
 * @returns {string}
 */
export function injectBlock(source, marker, lines) {
  const start = `<!-- ${marker}_START -->`;
  const end = `<!-- ${marker}_END -->`;
  const pattern = new RegExp(`${start}[\\s\\S]*?${end}`);
  if (!pattern.test(source)) {
    throw new Error(`Marker pair ${marker} not found in projects page`);
  }
  return source.replace(pattern, [start, "", ...lines, "", end].join("\n"));
}
