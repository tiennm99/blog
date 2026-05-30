#!/usr/bin/env node
// Find the most recent newsletter number and return the next one
// Usage: node find-newsletter-number.js
// Outputs: The next newsletter number

const fs = require("fs");
const path = require("path");

const PROJECT_ROOT = path.resolve(__dirname, "../../../..");
const CONTENT_DIR = path.join(PROJECT_ROOT, "content", "post");

// Extract newsletter number from file content
function extractNewsletterNumber(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const match = content.match(/Newsletter\s*#(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  } catch {
    return 0;
  }
}

// Get current date in Asia/Ho_Chi_Minh timezone
function getCurrentDate() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = formatter.formatToParts(now);
  return {
    year: parts.find((p) => p.type === "year").value,
    month: parts.find((p) => p.type === "month").value,
    day: parts.find((p) => p.type === "day").value,
  };
}

// Scan all year/month/day directories for newsletter posts
function findMostRecentNewsletter() {
  let maxNumber = 0;

  // List year directories, sorted descending
  let years;
  try {
    years = fs.readdirSync(CONTENT_DIR)
      .filter((d) => /^\d{4}$/.test(d))
      .sort((a, b) => b.localeCompare(a));
  } catch {
    return 0;
  }

  for (const year of years) {
    const yearDir = path.join(CONTENT_DIR, year);
    let months;
    try {
      months = fs.readdirSync(yearDir)
        .filter((d) => /^\d{2}$/.test(d))
        .sort((a, b) => b.localeCompare(a));
    } catch {
      continue;
    }

    for (const month of months) {
      const monthDir = path.join(yearDir, month);
      let days;
      try {
        days = fs.readdirSync(monthDir)
          .filter((d) => /^\d{2}$/.test(d))
          .sort((a, b) => b.localeCompare(a));
      } catch {
        continue;
      }

      for (const day of days) {
        const filePath = path.join(monthDir, day, "index.md");
        const num = extractNewsletterNumber(filePath);
        if (num > maxNumber) maxNumber = num;
      }
    }

    // Early exit: if we found a newsletter in this year, no need to go further back
    if (maxNumber > 0) break;
  }

  return maxNumber;
}

const mostRecent = findMostRecentNewsletter();
console.log(mostRecent + 1);
