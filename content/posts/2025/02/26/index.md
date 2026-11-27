---
title: "Git LFS: Use Cases, Limitations, How to Remove It, and Alternatives"
date: 2025-02-25
tags: [ "Git", "Git LFS" ]
---

Beyond source code, we sometimes store assets like images, audio, videos, data files, or large build outputs in our repositories. These files can be very heavy, and storing them directly in a Git repository bloats the repo size and slows down cloning, pushing, pulling, and fetching. To solve this problem, Git Large File Storage (Git LFS) was created. In this post, I'll introduce Git LFS, its use cases, its limitations, how to remove it, and alternative solutions.

## 1. What Is Git LFS?

Git LFS is a Git extension that helps manage large files in a repository. Instead of storing the full contents of large files inside the Git repository itself, Git LFS stores the actual files on a remote server (typically a dedicated Git LFS server) and keeps only lightweight pointer metadata in the repository. When you need the files, Git LFS downloads them from the remote server to your local machine.

## 2. Use Cases for Git LFS

Git LFS is well-suited for the following scenarios:

1. **Managing media files and large datasets:** When a project needs to store large images, audio, video, datasets, or analysis files, Git LFS manages them efficiently without significantly inflating the repository size.

2. **Storing binaries and build artifacts:** Binary files, libraries, executables, or build outputs can be stored in Git LFS to take the load off the main repository.

3. **Projects with large files that rarely change:** For large files that are infrequently modified, Git LFS is an ideal way to keep them accessible while keeping everyday Git operations fast.

Previously, when building a website for [Ngăm](https://ngamtheprojec.github.io), I used Git LFS to store the group's videos. Since GitHub limits individual file sizes to 100MB, I turned to Git LFS to host larger video files. That turned out to be a mistake on my part.

## 3. Limitations of Git LFS

Although Git LFS reduces repository bloat, it comes with several drawbacks:

1. **Bandwidth and storage limits on GitHub:** GitHub Free only provides 1GB of storage and 1GB of bandwidth per month for Git LFS. Exceeding these limits incurs extra charges.

2. **Issues with GitHub Pages:** When deploying GitHub Pages from a repository that uses LFS, LFS files are not served properly, resulting in broken links and missing content.

3. **Complicated removal process:** Once you've adopted Git LFS, removing it from a repository is a tricky and potentially risky process.

Because of the bandwidth cap, I remember running out of bandwidth after cloning the repository just a few times. That forced me to figure out how to strip Git LFS out of the repository.

## 4. How to Remove Git LFS

To remove Git LFS from a repository, follow these steps:

```shell
git lfs uninstall

git rm --cached "*.mp4"  # Replace with the file patterns you tracked with LFS

# Edit the .gitattributes file to remove any LFS-related entries

git add .gitattributes
git commit -m "remove: Git LFS"

git push
```

**Note:** This process can be much more complicated if your repository already has commit history containing Git LFS objects. In that case, you may need to rewrite history or create a fresh repository and migrate your non-LFS history over to it.

In some cases, you may also need to open a ticket with GitHub Support to delete the LFS objects stored on GitHub's LFS servers for your repository.

## 5. Alternatives

Instead of using Git or Git LFS for large files, my advice is to separate your source code from large assets altogether. For example: upload videos to YouTube, upload images to Imgur, etc., and reference their links in your repository.

When building the website for Ngăm, I ended up running an optimization tool to compress the videos under the 100MB threshold so they could be stored directly on GitHub. That allowed me to avoid Git LFS entirely and stop worrying about bandwidth limits.
