#!/usr/bin/env node
// List existing tags in the repo ranked by frequency
// Usage: node list-existing-tags.js
// Outputs: tag count and name, sorted most-used first (top 40)
//
// NOTE: This script is NOT currently used by the mt-add-tags skill.
// Tag normalization is disabled until existing posts have standardized tags.
// To enable, uncomment step 4a in SKILL.md.

const fs = require("fs");
const path = require("path");

const PROJECT_ROOT = path.resolve(__dirname, "../..");
const CONTENT_DIR = path.join(PROJECT_ROOT, "content", "post");

// Recursively find all index.md files
function findIndexFiles(dir) {
  const results = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results.push(...findIndexFiles(fullPath));
      } else if (entry.name === "index.md") {
        results.push(fullPath);
      }
    }
  } catch {
    // skip unreadable directories
  }
  return results;
}

// Extract tags from frontmatter
function extractTags(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const match = content.match(/^tags:\s*\[([^\]]*)\]/m);
    if (!match) return [];
    // Extract quoted strings from the tags array
    return [...match[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  } catch {
    return [];
  }
}

// Count tag frequency
const tagCounts = new Map();
const files = findIndexFiles(CONTENT_DIR);

for (const file of files) {
  for (const tag of extractTags(file)) {
    tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
  }
}

// Sort by frequency descending, take top 40
const sorted = [...tagCounts.entries()]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 40);

for (const [tag, count] of sorted) {
  console.log(`${String(count).padStart(6)} ${tag}`);
}
