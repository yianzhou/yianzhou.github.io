---
title: "Linux and Shell"
categories: [Apple]
---

<!-- prettier-ignore -->
* Do not remove this line (it will not be displayed)
{:toc}

> [The Linux Command Line by William Shotts](http://linuxcommand.org/tlcl.php)

# Introduction

Technically speaking, **Linux** is the name of the operating system's **kernel**, nothing more. The kernel is very important of course, since it makes the operating system go, but it's not enough to form a complete operating system. The **GNU Project** provides many, many free softwares running on top of the kernal.

When we speak of the **command line**, we are really referring to the **shell**. The shell is a _program_ that takes keyboard commands and passes them to the operating system to carry out. Almost all Linux distributions supply a shell program from the GNU Project called **bash**.

When using a graphical user interface (GUI), we need another program called a terminal emulator, simply called **ternimal**, to interact with the shell.

`[me@linuxbox ~]$`

This is called a **shell prompt** and it will appear whenever the shell is ready to accept input.

`$ date` displays the current time and date.

`$ cal` displays a calendar of the current month.

# Exploring the System

Unix-like systems such as Linux always have a single file system tree, regardless of how many drives or storage devices are attached to the computer. Storage devices are **mounted** at various points on the tree according to the whims of the system administrator.

On Linux systems, filenames that begin with a period character are hidden.

Filenames and commands in Linux, like Unix, are case sensitive.

To display the current working directory, we use the `$ pwd` (print working directory) command.

Each user account is given its own **home directory** and it is the only place a regular user is allowed to write files.

Navigation:

`$ cd` to your home directory.

`$ cd -` to the previous working directory.

List directory contents:

`$ ls`

- `-a` List all files including hidden files
- `-l` Display results in long format

Most commands use options which consist of a single character preceded by a dash. Many commands also support long options, consisting of a word preceded by two dashes.

Also, many commands allow multiple short options to be strung together: `$ ls -al`

`-rw-r--r-- 1 root root 1186219 2017-04-03 11:05 kubuntu-leaflet.png`

- The first character indicates the type of file
  - a leading dash means a regular file
  - "d" indicates a directory
- Access rights for
  - the file's owner
  - members of the file's group
  - everyone else
- the file's number of hard links
- the username of the file's owner
- the name of the group that owns the file
- size of the file in bytes
- date and time of the file's last modification
- name of the file

In Unix-like operating systems such as Linux, **everything is a file**. Use the `$ file` command to determine a file's type and print a brief description of the file's contents.

The `$ less` command is a program to view text files. To exit less, press the q key.

- `/characters` Search forward to the next occurrence of characters
- `n` Search for the next occurrence of the previous search

`lrwxrwxrwx 1 root root 11 2007-08-11 07:34 libc.so.6 -> libc-2.6.so`

"l" indicates a special kind of a file called a **symbolic link** (also known as a soft link). In most Unix-like systems it is possible to have a file referenced by multiple names.

**Hard links** also allow files to have multiple names, but they do it in a different way.

# 命令

分行打印 `$PATH`：`echo "$PATH" | tr ':' '\n'`

测试外网连通性：`curl -i https://google.com`

`ctrl+u`: clear up to the beginning

`ctrl+w`: delete just a word

向上翻页：`Command + Fn + ⬆️`

杀死进程：打开 `Activity Monitor`，查看 PID，在终端中：`kill -9 [pid]`

在当前目录下根据名称查找文件：`find ./ -name 'default_white.bundle'`

在用户文件夹下查找目录：`find ~ -name 'Autosaved Information' -type d`

列出当前目录下的内容，查找字符串，不区分大小写：`ls | grep -i iOS`

命令行输出过多，可重定向到文件里查看：`sh xx.sh > sh.log`

清理 Xcode 磁盘空间：`rm -rf ~/Library/Developer/Xcode/iOS\ DeviceSupport`

# 配置 iTerms

下载 [iTerms2](https://www.iterm2.com/)

查看当前系统已安装的 shell：`cat /etc/shells`

切换成 zsh：`chsh -s /bin/zsh`

安装 [ohmyzsh](https://github.com/ohmyzsh/ohmyzsh)

编辑配置文件：`~/.zshrc`

安装 [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting/blob/master/INSTALL.md)：`brew install zsh-syntax-highlighting`

安装 [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md)

# HomeBrew

这是一个简单易用的包管理器，可以让你轻松下载、管理第三方应用。

查看过期应用：`brew outdated`

更新所有应用：`brew upgrade`

清除缓存：`brew cleanup`

显示文件夹目录树：安装插件 `brew install tree`；可指定层级深度 `tree -L 2`

# Vim 快捷键

| 命令     | 作用                                      |
| -------- | ----------------------------------------- |
| u        | up，上翻半页                              |
| d        | down，下翻半页                            |
| f, fn+⬇️ | 下翻一页                                  |
| b, fn+⬆️ | 上翻一页                                  |
| fn+⬅️    | 行首                                      |
| fn+➡️    | 行尾                                      |
| gg       | 首行                                      |
| G        | 尾行                                      |
| esc+F    | move to the beginning of the next word    |
| esc+B    | move to the beginning of the current word |

# Git

tag 某个 commit：`git tag r20191211_3.4.4 ff5aeaa`

To push a single tag: `git push origin r20191211_3.4.4`

push branch to remote: `git push -u origin branchname`

Delete tag on remote: `git push --delete origin tagname`

查看 remote 信息：`git remote show origin`

强制重置 master 到当前的提交：`git branch -f master`

强制切到远端最新：`git checkout -B master origin/master`
