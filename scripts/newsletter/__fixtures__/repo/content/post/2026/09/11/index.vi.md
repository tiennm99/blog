---
title: "Stored URL shapes"
date: 2026-09-11
tags: ["AI-Assisted", "Tie Break B"]
categories: ["Newsletter"]
---

Case: every shape a URL is stored in, so the boundary-aware dedup check is
exercised against each. No "Newsletter #" heading — find-newsletter-number
must still resolve 133 from the sibling post.

A bare URL on its own line:

https://bare2.invalid/article

A URL that keeps its trailing slash:

https://slash.invalid/post/

A markdown autolink:

<https://autolink.invalid/entry>

A long stored URL that a shorter needle must NOT falsely match:

https://prefix.invalid/posts/the-long-slug

The same Substack image identity in raw S3 form:

![Raw S3](https://substack-post-media.s3.amazonaws.com/public/images/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee_1280x720.png)
