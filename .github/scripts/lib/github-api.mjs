// GitHub API access for the projects list: owned namespaces, their repos, and
// the repos the user contributed merged pull requests to.

const API = "https://api.github.com";
const GRAPHQL = `${API}/graphql`;

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

/** Minimal GitHub client bound to one token and one user. */
export class GitHubClient {
  /**
   * @param {string} token Personal access token with `repo` and `read:org`.
   * @param {string} user Login whose projects are listed.
   */
  constructor(token, user) {
    this.token = token;
    this.user = user;
  }

  /** @returns {Record<string, string>} */
  get restHeaders() {
    return {
      Authorization: `Bearer ${this.token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": `${this.user}-projects-updater`,
    };
  }

  /**
   * Fetch every page of a REST collection endpoint.
   * @param {string} pathAndQuery Path starting with `/`, query without `page`.
   * @returns {Promise<object[]>}
   */
  async restPaged(pathAndQuery) {
    const all = [];
    const sep = pathAndQuery.includes("?") ? "&" : "?";
    for (let page = 1; page <= 20; page += 1) {
      const res = await fetch(`${API}${pathAndQuery}${sep}page=${page}`, {
        headers: this.restHeaders,
      });
      if (!res.ok) {
        throw new Error(`REST ${pathAndQuery} ${res.status}: ${await res.text()}`);
      }
      const batch = await res.json();
      if (!Array.isArray(batch) || batch.length === 0) break;
      all.push(...batch);
      if (batch.length < 100) break;
    }
    return all;
  }

  /**
   * @param {string} query
   * @param {Record<string, unknown>} variables
   * @returns {Promise<object>}
   */
  async graphql(query, variables) {
    const res = await fetch(GRAPHQL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
        "User-Agent": `${this.user}-projects-updater`,
      },
      body: JSON.stringify({ query, variables }),
    });
    if (!res.ok) throw new Error(`GraphQL ${res.status}: ${await res.text()}`);
    const body = await res.json();
    if (body.errors) throw new Error(`GraphQL errors: ${JSON.stringify(body.errors)}`);
    return body.data;
  }

  /**
   * Logins the user controls: their own account plus every organization where
   * their membership role is `admin`.
   * @returns {Promise<Set<string>>}
   */
  async fetchOwnedLogins() {
    let memberships;
    try {
      memberships = await this.restPaged("/user/memberships/orgs?state=active&per_page=100");
    } catch (err) {
      throw new Error(
        `Cannot read organization memberships (the token needs the read:org scope): ${err.message}`,
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
      const endpoint =
        login === this.user.toLowerCase()
          ? `/users/${login}/repos?type=owner&sort=updated&per_page=100`
          : `/orgs/${login}/repos?type=all&sort=updated&per_page=100`;
      for (const r of await this.restPaged(endpoint)) {
        if (r.private) continue;
        if (!byName.has(r.full_name)) byName.set(r.full_name, fromRest(r));
      }
    }
    return [...byName.values()];
  }

  /**
   * Repos the user has merged pull requests in, with the per-repo count.
   * Uses the search API, which caps at 1000 results.
   * @returns {Promise<Contribution[]>}
   */
  async fetchMergedPrContributions() {
    const counts = new Map();
    const repos = new Map();
    let cursor = null;
    for (let i = 0; i < 10; i += 1) {
      const data = await this.graphql(MERGED_PR_QUERY, {
        q: `is:pr is:merged is:public author:${this.user}`,
        cursor,
      });
      const search = data?.search;
      if (!search) break;
      for (const node of search.nodes) {
        const repo = node?.repository;
        if (!repo || repo.isPrivate) continue;
        const key = repo.nameWithOwner;
        counts.set(key, (counts.get(key) || 0) + 1);
        if (!repos.has(key)) repos.set(key, fromGraphql(repo));
      }
      if (!search.pageInfo.hasNextPage) break;
      cursor = search.pageInfo.endCursor;
    }
    return [...counts.entries()].map(([key, mergedPrs]) => ({
      repo: repos.get(key),
      mergedPrs,
    }));
  }
}

const MERGED_PR_QUERY = `
query($q: String!, $cursor: String) {
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
