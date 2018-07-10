# Quick Start

macOS 需要安装 [brew](https://brew.sh/)

然后安装 [Ruby](https://www.ruby-lang.org/en/)

```
brew install ruby
```

macOS 10.13+ 的 Ruby 不是最新的，请手动安装：

```
brew link --overwrite ruby
```

I quit terminal (Cmd+Q), and after restart `ruby -v` returned the correct version. So make sure you restart terminal after installing before trying any other (potentially unnecessary) fixes.

Jekyll [快速开始](https://jekyllrb.com/docs/quickstart/)

```
# Build the site on the preview server
bundle exec jekyll serve
```
通过 <http://localhost:4000> 在本地测试

# 工作
通常写文章从[草稿](https://jekyllrb.com/docs/drafts/)开始，
```
bundle exec jekyll serve --drafts
```

目录结构请看[这里](https://jekyllrb.com/docs/structure/).

如果想看当前主题的文件:
```
bundle show jekyll-theme-slate
```


