---
layout: home
---

![image](/assets/images/1440_380.jpg)

# 快速开始

遇到没有 /usr/bin 权限的问题：

```sh
sudo gem install -n /usr/local/bin bundler jekyll
```

快速开始：<https://jekyllrb.com/docs/quickstart/>

```sh
# Build the site on the preview server
bundle exec jekyll serve

# preview drafts
bundle exec jekyll serve --drafts
```

[目录结构](https://jekyllrb.com/docs/structure/)

[当前主题]((https://github.com/jekyll/minima)):

```sh
bundle show minima
```

The github-pages gem is what's constraining you from update to latest Jekyll version. Use this instead:

```sh
bundle update github-pages
```