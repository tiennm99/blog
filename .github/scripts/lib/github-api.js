// GitHub API access for the projects list: owned namespaces, their repos, and
// the repos the user contributed merged pull requests to.
//
// Built on the `octokit` SDK, which supplies auth, REST and GraphQL cursor
// pagination, retry and rate-limit backoff.

import { Octokit } from "octokit";

/**
 * @typedef {object} Repo
 * @property {string} nameWithOwner
 * @property {string} name
 * @property {string} owner
 * @property {string} htmlUrl
 * @property {string} description
 * @property {string} homepage
 * @property {boolean} hasPages
 * @property {number} stars
 * @property {boolean} isFork
 * @property {boolean} isPrivate
 * @property {boolean} isArchived
 * @property {string} pushedAt Last push timestamp, ISO 8601.
 */

/**
 * @typedef {object} Contribution
 * @property {Repo} repo
 * @property {number} mergedPrs
 */

/** Projects-list queries for one user. */
export class GitHubProjects {
  /**
   * @param {string} token Personal access token with `repo` and `read:org`.
   * @param {string} user Login whose projects are listed.
   */
  constructor(token, user) {
    this.user = user;
    this.octokit = new Octokit({
      auth: token,
      userAgent: `${user}-projects-updater`,
    });
  }

  /**
   * Logins the user controls: their own account plus every organization where
   * their membership role is `admin`.
   * @returns {Promise<Set<string>>}
   */
  async fetchOwnedLogins() {
    let memberships;
    try {
      memberships = await this.octokit.paginate(
        this.octokit.rest.orgs.listMembershipsForAuthenticatedUser,
        { state: "active", per_page: 100 },
      );
    } catch (err) {
      throw new Error(
        "Cannot read organization memberships (the token needs the read:org scope)",
        { cause: err },
      );
    }
    const logins = new Set([this.user.toLowerCase()]);
    for (const m of memberships) {
      if (m.role === "admin" && m.organization?.login) {
        logins.add(m.organization.login.toLowerCase());
      }
    }
    return logins;
  }

  /**
   * Public repos across every owned login, deduplicated by full name.
   * @param {Set<string>} ownedLogins
   * @returns {Promise<Repo[]>}
   */
  async fetchOwnedRepos(ownedLogins) {
    const byName = new Map();
    for (const login of ownedLogins) {
      const isSelf = login === this.user.toLowerCase();
      const listed = isSelf
        ? await this.octokit.paginate(this.octokit.rest.repos.listForUser, {
            username: login,
            type: "owner",
            per_page: 100,
          })
        : await this.octokit.paginate(this.octokit.rest.repos.listForOrg, {
            org: login,
            type: "all",
            per_page: 100,
          });
      for (const r of listed) {
        if (r.private) continue;
        if (!byName.has(r.full_name)) byName.set(r.full_name, fromRest(r));
      }
    }
    return [...byName.values()];
  }

  /**
   * Repos the user has merged pull requests in, with the per-repo count.
   * Backed by the search API, which caps at 1000 results.
   * @returns {Promise<Contribution[]>}
   */
  async fetchMergedPrContributions() {
    const result = await this.octokit.graphql.paginate(MERGED_PR_QUERY, {
      q: `is:pr is:merged is:public author:${this.user}`,
    });

    const counts = new Map();
    const repos = new Map();
    for (const node of result.search.nodes) {
      const repo = node?.repository;
      if (!repo || repo.isPrivate) continue;
      const key = repo.nameWithOwner;
      counts.set(key, (counts.get(key) || 0) + 1);
      if (!repos.has(key)) repos.set(key, fromGraphql(repo));
    }
    return [...counts.entries()].map(([key, mergedPrs]) => ({
      repo: repos.get(key),
      mergedPrs,
    }));
  }
}

// `$cursor` and the `pageInfo` selection are what octokit.graphql.paginate
// drives; it concatenates `nodes` across pages.
const MERGED_PR_QUERY = `
query paginate($q: String!, $cursor: String) {
  search(query: $q, type: ISSUE, first: 100, after: $cursor) {
    pageInfo { hasNextPage endCursor }
    nodes {
      ... on PullRequest {
        repository {
          nameWithOwner
          name
          url
          description
          homepageUrl
          stargazerCount
          pushedAt
          isPrivate
          isFork
          isArchived
          owner { login }
        }
      }
    }
  }
}`;

/**
 * @param {object} r REST repository payload.
 * @returns {Repo}
 */
function fromRest(r) {
  return {
    nameWithOwner: r.full_name,
    name: r.name,
    owner: r.owner?.login || "",
    htmlUrl: r.html_url,
    description: r.description || "",
    homepage: r.homepage || "",
    hasPages: !!r.has_pages,
    stars: r.stargazers_count || 0,
    isFork: !!r.fork,
    isPrivate: !!r.private,
    isArchived: !!r.archived,
    pushedAt: r.pushed_at || "",
  };
}

/**
 * @param {object} r GraphQL repository node.
 * @returns {Repo}
 */
function fromGraphql(r) {
  return {
    nameWithOwner: r.nameWithOwner,
    name: r.name,
    owner: r.owner?.login || "",
    htmlUrl: r.url,
    description: r.description || "",
    homepage: r.homepageUrl || "",
    // has_pages is not exposed by GraphQL; contributed repos rely on homepage.
    hasPages: false,
    stars: r.stargazerCount || 0,
    isFork: !!r.isFork,
    isPrivate: !!r.isPrivate,
    isArchived: !!r.isArchived,
    pushedAt: r.pushedAt || "",
  };
}
