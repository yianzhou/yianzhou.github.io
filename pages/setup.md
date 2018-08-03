# 快速开始

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

# 日常维护

`bundler` is a gem that manages other Ruby gems. It makes sure your gems and gem versions are compatible, and that you have all necessary dependencies each gem requires.
 
The **Gemfile** and Gemfile.lock files inform Bundler about the gem requirements in your site. 

You should prefix jekyll command with `bundle exec` so that Bundler runs the version of Jekyll that is installed in your project folder.

The github-pages gem is what's constraining you from update to latest Jekyll version. Use this instead:
```
bundle update github-pages
``` 

# 漂亮的 GitHub Pages 案例
- [Microsoft Open Source](https://opensource.microsoft.com/)
- [Facebook React](https://reactjs.org/)
- [GitHub Government](https://government.github.com/)