# Quick Start
Install [brew](https://brew.sh/)

Install [Ruby](https://www.ruby-lang.org/en/)

```
brew install ruby
```

Since macOS 10.13+ has ruby, we need brew to install the latest version.

```
brew link --overwrite ruby
```

I quit terminal (Cmd+Q), and after restart `ruby -v` returned the correct version. So make sure you restart terminal after installing before trying any other (potentially unnecessary) fixes.

Jekyll [Quickstart](https://jekyllrb.com/docs/quickstart/)

```
# Build the site on the preview server
bundle exec jekyll serve
```
Now browse to http://localhost:4000

# Work
To work with [draft](https://jekyllrb.com/docs/drafts/),
```
bundle exec jekyll serve --drafts
```
Now browse to http://localhost:4000/year/month/day/title

Check directory structure [here](https://jekyllrb.com/docs/structure/).

Jekyll themes set default layouts, includes, and stylesheets. To show them:
```
bundle show jekyll-theme-slate
```


