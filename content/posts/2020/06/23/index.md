---
title: "Blogging with Hugo"
date: 2020-06-23
tags: [ "Hugo", "Blog" ]
---

As you probably know, this blog of mine is built with Hugo. In this post, I'll walk you through using Hugo to create a similar static website.

1. First, install Hugo:

```shell
yay -S hugo
```

2. Go to your working directory and use Hugo to create a new folder for your website. For example, here I create a folder named `miti99`:

```shell
hugo new site miti99
```

If you already created and cloned a Git repository and want to initialize the site inside that existing folder, add the `--force` flag. For example:

```shell
hugo new site miti99 --force
```

3. Enter the newly created folder and download a theme for your website. You can browse themes on the official Hugo themes site (<https://themes.gohugo.io/>). For example, here I chose the [`Beautiful Hugo`](https://themes.gohugo.io/beautifulhugo/) theme:

```shell
cd miti99
git init # Skip this step if you used git clone for your website
git submodule add https://github.com/halogenica/beautifulhugo.git themes/beautifulhugo
```

Copy `exampleSite` over to test it out:

```shell
\cp -rf themes/beautifulhugo/exampleSite/* .
```

4. Run the following command to preview your website:

```shell
hugo server
```

5. Edit files like `config.toml` and the files inside `content` (along with any other files you want to customize) to make the website your own. Be sure to check out the sample files included with the theme to get the most out of its features!

I'll cover how to build and deploy your website to GitLab Pages, GitHub Pages, or Firebase Hosting... in another post. See you later!
