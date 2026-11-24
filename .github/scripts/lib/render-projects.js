// Markdown rendering and marker injection for the projects page.

const labels = {
  vi: {
    name: "Tên",
    description: "Mô tả",
    stars: "Lượt sao",
    link: "Liên kết",
    merged: "PR đã hợp nhất",
    empty: "_Chưa có dự án nào._",
  },
  en: {
    name: "Name",
    description: "Description",
    stars: "Stars",
    link: "Link",
    merged: "Merged PRs",
    empty: "_No projects yet._",
  },
};

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
 * Link text without the scheme and trailing slash, so the URL column stays narrow.
 * @param {string} url
 * @returns {string}
 */
function linkOrDash(url) {
  if (!url) return "—";
  const text = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return `[${cell(text)}](${url})`;
}

/**
 * Repo link: just the name for the user's own repos, owner/name otherwise.
 * @param {import("./github-api.js").Repo} repo
 * @param {string} [user] GitHub login whose repos drop the owner prefix.
 * @returns {string}
 */
function repoLink(repo, user) {
  const own = user && repo.owner.toLowerCase() === user.toLowerCase();
  return `[${own ? repo.name : repo.nameWithOwner}](${repo.htmlUrl})`;
}

/**
 * @param {string[]} headers
 * @param {string[][]} rows
 * @param {string} empty
 * @returns {string[]} Markdown table lines, or an empty-state line.
 */
function table(headers, rows, empty) {
  if (rows.length === 0) return [empty];
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((r) => `| ${r.join(" | ")} |`),
  ];
}

/**
 * Repos with at least one star, most-starred first.
 * @param {import("./github-api.js").Repo[]} repos
 * @param {string} [user] GitHub login whose repos drop the owner prefix.
 * @param {"vi" | "en"} [language]
 * @returns {string[]}
 */
export function renderStarred(repos, user, language = "vi") {
  const { name, description, stars, link, empty } = labels[language];
  const rows = repos.map((r) => [
    repoLink(r, user),
    cell(r.description),
    String(r.stars),
    linkOrDash(resolveUrl(r)),
  ]);
  return table([name, description, stars, link], rows, empty);
}

/**
 * Repos with a live demo URL.
 * @param {import("./github-api.js").Repo[]} repos
 * @param {string} [user] GitHub login whose repos drop the owner prefix.
 * @param {"vi" | "en"} [language]
 * @returns {string[]}
 */
export function renderDemo(repos, user, language = "vi") {
  const { name, description, link, empty } = labels[language];
  const rows = repos.map((r) => [
    repoLink(r, user),
    cell(r.description),
    linkOrDash(resolveUrl(r)),
  ]);
  return table([name, description, link], rows, empty);
}

/**
 * Repos owned by others, by merged pull request count.
 * @param {import("./github-api.js").Contribution[]} contributions
 * @param {"vi" | "en"} [language]
 * @returns {string[]}
 */
export function renderContributed(contributions, language = "vi") {
  const { name, description, merged, stars, empty } = labels[language];
  const rows = contributions.map((c) => [
    repoLink(c.repo),
    cell(c.repo.description),
    String(c.mergedPrs),
    String(c.repo.stars),
  ]);
  return table([name, description, merged, stars], rows, empty);
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
  return source.replace(pattern, () => [start, "", ...lines, "", end].join("\n"));
}
