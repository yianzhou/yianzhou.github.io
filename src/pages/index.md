# Hello, world!

![img](/assets/images/1440_380.jpg)

> [Deployment | Docusaurus](https://docusaurus.io/docs/deployment#deploying-to-github-pages)

仓库要有两个分支，`master` 存放源代码，`gh-pages` 存放构建输出，用于发布。

要到 Github 的[设置页面](https://github.com/yianzhou/yianzhou.github.io/settings/pages)，将构建分支选择为 `gh-pages` 才可以。

本地命令部署：`GIT_USER=yianzhou USE_SSH=true yarn deploy`

（我在本机设置好了用 SSH 连接 github，所以部署命令里用了 `USE_SSH=true`。）

更新：`yarn upgrade @docusaurus/core@latest @docusaurus/preset-classic@latest`