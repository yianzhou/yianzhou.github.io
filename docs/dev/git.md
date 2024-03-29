# Git

## 日常命令

```bash
# 查看配置项
git config --list

# tag 某个 commit
git tag r20191211_3.4.4 ff5aeaa

# 推送tag到远端
git push origin r20191211_3.4.4

# 推送分支到远端
git push -u origin branchname

# 删除远端tag
git push --delete origin tagname

# 查看 remote 信息
git remote show origin

# 强制重置 master 到当前的提交
git branch -f master

# 强制切到远端最新
git checkout -B master origin/master

# 查看某个文件的修改记录
git log filename

# 查看某个 commit 所在的分支
git branch -a --contains 749593c

# 直接复用上一次提交的 commit message 来提交
git commit --reuse-message=HEAD --reset-author

# 修改上次提交
git commit --no-verify --amend --no-edit

# 查看两次提交之间所有的提交
git log --perl-regexp --author="(yianzhou|zhouyian)" --pretty=short --ancestry-path 1a795d0ff7dc3c32ae5a003cae740ae054bd1e9f..abbd10baace5efde21e279b78ec76b4f9496bd19 > ~/Downloads/$(echo `date +%s` | rev).log

# 查看某个分支上我的提交
git log develop --author=yianzhou --pretty=short

# 查看所有我的提交
git log --author=yianzhou --pretty=format:%cd\ %H\ %an\ %s --date=format:'%Y-%m-%d %H:%M:%S' --all | git name-rev --stdin --refs="release/*" > ~/Downloads/git.log

# 查看一个commit的commit date，以本地时间为准
git show -s --format=%ad 39ff172891319b89187ec79899bcf8b6f329f8af --date=local

# 克隆指定分支，深度1
git clone --depth 1 --branch master https://github.com/flutter/flutter.git

# 克隆深度为 1 之后，如何拉取其它提交
git fetch --unshallow

# 删除所有tag然后重新拉取
git tag -l | xargs git tag -d && git fetch -t

# 找到所有在stage区的diff文件，并对其中的dart文件进行格式化
git diff --cached --name-only -- '*.dart' | xargs -I '{}' dart format {}

# 查看 merge request diffs
git log HEAD ^origin/develop --oneline --no-merges

# 添加远端
git remote add github https://github.com/flutter/engine.git

# 拉取远端分支
git fetch github master:master
```

日期格式可选项：

```bash
git log --date={relative,local,default,iso,rfc}
```

The **author date** notes when this commit was originally made (i.e. when you finished the git commit). According to the docs of git commit, the author date could be overridden using the --date switch.

The **commit date** gets changed every time the commit is being modified, for example when rebasing the branch where the commit is in on another branch (more).

![img](/assets/images/fea19a87-fb67-4a85-ac07-d4dad995f08d.png)

## gitignore

How to remove files that are listed in the .gitignore but still on the repository?

```bash
git rm -r --cached .
git add .
git commit -m "Drop files from .gitignore"
```

## lfs

Git Large File Storage (LFS) is an open source Git extension for versioning large files by replacing large files with **text pointers** inside Git, while storing the file contents on a remote server.

远端还是保存了大文件的每一个版本，远端仓库的大小并不会因为用了 LFS 而减小。减小的是你的本地仓库。因为本地仓库中并不保留所有的文件版本，而是仅根据需要检出版本中必需的文件。

### Step-by-step

Install: `brew install git-lfs`

Set up Git LFS for your user account (only once per user account): `git lfs install`

In Git repository where you want to use Git LFS: `git lfs track "*.psd"`, or directly edit your `.gitattributes`

Make sure .gitattributes is tracked: `git add .gitattributes`

For any pre-existing files, use the `git lfs migrate` command.

Just commit and push as you normally would!

### Migrate

The `import` mode converts Git files to Git LFS, while the `export` mode does the reverse, and the `info` mode provides an informational summary.

First, run `git lfs migrate info` to list the file types taking up the most space in your repository.

When converting files to or from Git LFS, the `git lfs migrate` command will only make changes to your local repository and working copy, never any remotes. This is intentional as the `import` and `export` modes are generally "destructive" in the sense that they **rewrite your Git history**, changing commits and generating new commit SHAs. Once you are satisfied with the changes, you will need to force-push the new Git history of any rewritten branches to all your remotes.（用了这个命令后，所有 commit 历史会被重写，拥有新的 SHA 值）

`git lfs migrate import --include="opencv2"` 将 opencv2 的二进制转换成 LFS，此时会看到本地磁盘里的文件变成了文本指针。

The working copies of these files can be repopulated with their full expected contents by using `git lfs checkout`

## Config

查看所有配置：`git config --list --show-origin`

- 系统级别：`/usr/local/etc/gitconfig`
- 用户级别：`/Users/yianzhou/.gitconfig`
- git 目录级别：`.git/config`

## submodule

To suppress listing of 'modified content'/dirty submodule entries in status, diff, etc? Just add one line to that `.gitmodules` file:

```
[submodule "bundle/fugitive"]
    path = bundle/fugitive
    url = git://github.com/tpope/vim-fugitive.git
    ignore = dirty
```

`git submodule add <repository> [<path>]` 默认将子模块 clone 到当前工作目录下

`git submodule init` 此命令通常仅在添加新子模块后（使用 `git submodule add`）运行一次

`git submodule update` 将子模块更新为父仓库指定的 commit

`git submodule update --remote` 更新子模块到上游仓库的最新 commit

`git submodule update --init --recursive` 递归地初始化并更新子模块及所有嵌套的子模块

`git submodule status` 列出所有子模块的当前状态

## 如何查找被删除的代码

如果你记得删除代码时的提交消息，可以使用以下命令搜索：`git log --grep="关键字"`

如果你记得被删除代码的一部分内容，可以使用 -S 选项来查找添加或删除该内容的提交：`git log -S"代码片段"`

如果你想要搜索的是正则表达式匹配的代码变动，可以使用 -G 选项：`git log -G"正则表达式"`

如果你知道代码被删除的文件名，可以查看该文件的历史：`git log -- 文件名`

如果你不确定代码是在哪个提交中被删除的，可以使用 git bisect 来二分查找：`git bisect start`

- 标记当前版本中代码已经丢失：`git bisect bad`
- 标记一个你知道代码存在的旧版本：`git bisect good 标签或提交哈希`
- Git 会检出一个中间的提交，你可以检查代码是否存在。如果代码存在，执行 `git bisect good`，如果代码丢失，执行 `git bisect bad`。
- 重复上一步骤，直到 Git 找到引入变化的确切提交。
- 完成查找后，结束二分查找：`git bisect reset`

如果你知道大概的时间范围，可以查看文件在某个时间段内的差异：`git diff 开始哈希..结束哈希 文件名`

如果你的仓库很大，一些命令可能需要较长时间来执行。
