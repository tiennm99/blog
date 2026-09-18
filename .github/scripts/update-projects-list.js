#!/usr/bin/env node
// Build the three project lists and inject them into the projects page:
//
//   1. Starred   — public repos I own (personal account or an org I administer)
//                  with at least one star, by stars then most recent push.
//   2. Demo      — public repos I own with a live URL (homepage or GitHub
//                  Pages), no star requirement, by most recent push. May
//                  overlap list 1. Skips the in-development namespaces below.
//   3. Contributed — public repos owned by someone else, by how many of my pull
//                  requests were merged there, then most recent push.
//
// Forks are excluded from the two owned lists: their homepage belongs to upstream,
// not to me. Private repos are excluded everywhere — the page is public.

import fs from "node:fs/promises";
import path from "node:path";

import { GitHubProjects } from "./lib/github-api.js";
import {
  injectBlock,
  renderContributed,
  renderDemo,
  renderStarred,
  resolveUrl,
} from "./lib/render-projects.js";

const PAGE = "content/page/projects/index.md";

// Namespaces whose deployments are previews of work in progress, so linking to
// them as a demo would misrepresent them. They still qualify for the other two
// lists.
const UNSTABLE_OWNERS = new Set(["tiennm99dev"]);

/**
 * Most recently pushed first; a repo with no timestamp sorts last.
 * @param {import("./lib/github-api.js").Repo} a
 * @param {import("./lib/github-api.js").Repo} b
 * @returns {number}
 */
const byRecentPush = (a, b) => (b.pushedAt || "").localeCompare(a.pushedAt || "");

async function main() {
  const token = process.env.GH_TOKEN;
  const user = process.env.GH_USER;
  if (!token || !user) {
    console.error("GH_TOKEN and GH_USER env vars are required");
    process.exit(1);
  }

  const gh = new GitHubProjects(token, user);
  const ownedLogins = await gh.fetchOwnedLogins();
  const [ownedRepos, contributions] = await Promise.all([
    gh.fetchOwnedRepos(ownedLogins),
    gh.fetchMergedPrContributions(),
  ]);

  const mine = ownedRepos.filter((r) => !r.isFork);

  const starred = mine
    .filter((r) => r.stars > 0)
    .sort((a, b) => b.stars - a.stars || byRecentPush(a, b));

  const demo = mine
    .filter(
      (r) => resolveUrl(r) !== "" && !UNSTABLE_OWNERS.has(r.owner.toLowerCase()),
    )
    .sort(byRecentPush);

  const contributed = contributions
    .filter((c) => !ownedLogins.has(c.repo.owner.toLowerCase()))
    .sort((a, b) => b.mergedPrs - a.mergedPrs || byRecentPush(a.repo, b.repo));

  const file = path.resolve(PAGE);
  const current = await fs.readFile(file, "utf8");
  let next = injectBlock(current, "PROJECTS_STARRED", renderStarred(starred));
  next = injectBlock(next, "PROJECTS_DEMO", renderDemo(demo));
  next = injectBlock(next, "PROJECTS_CONTRIBUTED", renderContributed(contributed));

  const summary = `${starred.length} starred, ${demo.length} demo, ${contributed.length} contributed`;
  if (next === current) {
    console.log(`No changes (${summary}).`);
    return;
  }
  await fs.writeFile(file, next);
  console.log(`Updated ${PAGE} (${summary}).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
