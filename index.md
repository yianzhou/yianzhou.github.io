---
show_downloads: true
---

![image](/assets/images/1440_380.jpg)

# 快速开始

遇到没有 /usr/bin 权限的问题：

```
sudo gem install -n /usr/local/bin bundler jekyll
```

快速开始：<https://jekyllrb.com/docs/quickstart/>

```
# Build the site on the preview server
bundle exec jekyll serve

# preview drafts
bundle exec jekyll serve --drafts
```

通过 <http://localhost:4000> 在本地测试

目录结构请看[这里](https://jekyllrb.com/docs/structure/)

如果想看当前主题的文件:

```
bundle show jekyll-theme-minimal
```

The github-pages gem is what's constraining you from update to latest Jekyll version. Use this instead:

```
bundle update github-pages
```

<!-- ![img](assets/images/png-iOSDev-by-StuQ.png) -->