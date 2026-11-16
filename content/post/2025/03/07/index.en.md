---
title: "Using GitHub Actions Cache to Reduce Build Time"
date: 2025-03-07
tags: [ "GitHub", "CI/CD", "Hugo", "AI-Assisted" ]
---

Recently, when publishing my Newsletter posts, I've been attaching a lot of images. When building the site with Hugo, Hugo has to process all of these images (generating multiple resized versions to optimize load times). As a result, my build time increased noticeably—sometimes taking up to 4 minutes. To solve this problem, I looked into and applied GitHub Actions Cache to cut down the build time.

## What Is GitHub Actions Cache?

GitHub Actions Cache is a feature in GitHub Actions that lets you persist files or directories between workflow runs. This avoids re-downloading dependencies or regenerating unchanged files from scratch, significantly reducing workflow execution time.

Common use cases for caching include:

- Project dependencies (`node_modules`, `vendor`, etc.)
- Build outputs (`resources`, `artifacts`, etc.)
- Databases or large data files

## Why Optimize Build Time?

In practice, when building a Hugo site, rebuilding the entire site from scratch on every small change can take a lot of time, as I mentioned at the beginning of this post. In most cases, only a small portion of the website changes, while assets like images and stylesheets have already been processed in previous builds.

In Hugo, the `resources` directory stores processed files such as resized images and CSS compiled from SCSS. Caching this directory avoids reprocessing files that haven't changed.

## Implementing GitHub Actions Cache with Hugo

Below is the GitHub Actions workflow I use to deploy my Hugo site to GitHub Pages, with caching enabled for the `resources` directory:

```yaml
name: Deploy site to GitHub Pages

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

defaults:
  run:
    shell: bash

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      HUGO_VERSION: 0.140.2
    steps:
      - name: Install Hugo CLI
        run: |
          wget -O ${{ runner.temp }}/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb \
          && sudo dpkg -i ${{ runner.temp }}/hugo.deb
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: recursive
          fetch-depth: 0
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v5
      - name: Restore resources
        uses: actions/cache/restore@v4
        with:
          path: |
            resources
          key: ${{ runner.os }}-resources-${{ github.run_id }}
          restore-keys: |
            ${{ runner.os }}-resources-
      - name: Build with Hugo
        env:
          HUGO_CACHEDIR: ${{ runner.temp }}/hugo_cache
          HUGO_ENVIRONMENT: production
          TZ: Asia/Ho_Chi_Minh
        run: |
          hugo \
            --gc \
            --minify \
            --baseURL "${{ steps.pages.outputs.base_url }}/"
      - name: Save resources
        uses: actions/cache/save@v4
        with:
          path: |
            resources
          key: ${{ runner.os }}-resources-${{ github.run_id }}
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Cache Configuration Details

In the workflow above, there are two steps related to caching:

1. **Restore resources**: Restores the cache from previous workflow runs

```yaml
- name: Restore resources
  uses: actions/cache/restore@v4
  with:
    path: |
      resources
    key: ${{ runner.os }}-resources-${{ github.run_id }}
    restore-keys: |
      ${{ runner.os }}-resources-
```

2. **Save resources**: Saves the updated cache after the build completes

```yaml
- name: Save resources
  uses: actions/cache/save@v4
  with:
    path: |
      resources
    key: ${{ runner.os }}-resources-${{ github.run_id }}
```

### How the Cache Key Works

Parameters used in the cache configuration:

- **path**: Path to the directory or file to cache—here, Hugo's `resources` directory
- **key**: A unique key identifying the cache. A common format is `${{ runner.os }}-[cache-name]-[hash]`
- **restore-keys**: A list of key prefixes used to find a fallback cache if an exact key match isn't found

In this example:

- `${{ runner.os }}` ensures the cache is only shared across runs on the same operating system
- `resources` is the name of the cache
- `${{ github.run_id }}` is the unique ID of each workflow run

With this setup, when an exact match for `${{ runner.os }}-resources-${{ github.run_id }}` isn't found, GitHub Actions falls back to the most recent cache matching the prefix `${{ runner.os }}-resources-`.

## Performance Comparison

After enabling the cache, my build time dropped dramatically:

| Status | Average Build Time |
|------------|----------------------------|
| Without cache | ~4 minutes 19 seconds      |
| With cache    | ~25 seconds                |

For larger projects, the time saved can easily reach several minutes or even tens of minutes.

![Before caching](img/before.png)
![After caching](img/after.png)

## Going Further: Caching Other Dependencies

Besides caching Hugo's `resources`, you can apply the same approach to other types of dependencies:

### Node.js dependencies (node_modules)

```yaml
- name: Restore node_modules
  uses: actions/cache/restore@v4
  with:
    path: |
      node_modules
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-
```

### Go modules

```yaml
- name: Restore Go modules
  uses: actions/cache/restore@v4
  with:
    path: |
      ~/go/pkg/mod
    key: ${{ runner.os }}-go-${{ hashFiles('**/go.sum') }}
    restore-keys: |
      ${{ runner.os }}-go-
```

## Cache Optimization Tips

To get the most out of caching, consider the following strategies:

1. **Selective caching**: Only cache files that are genuinely needed, avoiding temporary files or logs
2. **Hash dependency lockfiles**: Use hashes of lockfiles like `package-lock.json` in your cache key so the cache updates automatically whenever dependencies change
3. **Cache layering**: Use separate caches for different components of your application

## Conclusion

GitHub Actions Cache is a powerful tool for optimizing your CI/CD pipeline. With Hugo, caching the `resources` directory drastically cuts down build times, especially when your site has lots of images or stylesheets to process.

This is just a basic example of how to use GitHub Actions Cache. Depending on your specific project, you may want to adopt more advanced caching strategies.

If you'd like to learn more, check out the GitHub Actions Cache repository at [https://github.com/actions/cache](https://github.com/actions/cache), or read the official documentation at [https://docs.github.com/en/actions/guides/caching-dependencies-to-speed-up-workflows](https://docs.github.com/en/actions/guides/caching-dependencies-to-speed-up-workflows).

I hope this post helps you optimize your project's CI/CD pipeline. If you have any questions or feedback, feel free to leave a comment below.

You can find the full workflow I'm currently using in [my GitHub repo](https://github.com/tiennm99/tiennm99.github.io), or copy it directly from the example in this post.
