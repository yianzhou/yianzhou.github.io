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

`[me@linuxbox ~]$` This is called a **shell prompt** and it will appear whenever the shell is ready to accept input.

`$ date` displays the current time and date.

`$ cal` displays a calendar of the current month.

# Navigation and Exploring

Unix-like systems such as Linux always have a single file system tree, regardless of how many drives or storage devices are attached to the computer. Storage devices are **mounted** at various points on the tree according to the whims of the system administrator.

On Linux systems, filenames that begin with a period character are hidden.

Filenames and commands in Linux, like Unix, are case sensitive.

To display the current working directory, we use the `$ pwd` (print working directory) command.

Each user account is given its own **home directory** and it is the only place a regular user is allowed to write files.

Navigation:

- `$ cd` to your home directory
- `$ cd -` to the previous working directory

List directory contents: `$ ls`

- `-a` list all files including hidden files
- `-l` display results in long format
- `-i` shows the inode number, the same inode number indicates the same file

Most commands use options which consist of a single character preceded by a dash. Many commands also support long options, consisting of a word preceded by two dashes.

Also, many commands allow multiple short options to be strung together: `$ ls -al`

`-rw-r--r-- 1 root root 1186219 2017-04-03 11:05 kubuntu-leaflet.png`

- The first character indicates the type of file
  - "-" means a regular file
  - "d" indicates a directory
  - "l" indicates a special kind of a file called a **symbolic link**
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

- `/` Search forward to the next occurrence of characters
- `n` Search for the next occurrence of the previous search

# Manipulating

**Wildcards** can be used with any command that accepts **filenames** as arguments.

| Pattern                | Matches                                                                       |
| ---------------------- | ----------------------------------------------------------------------------- |
| \*                     | All files                                                                     |
| g\*                    | Any file beginning with “g”                                                   |
| b\*.txt                | Any file beginning with “b” followed by any characters and ending with “.txt” |
| Data???                | Any file beginning with “Data” followed by exactly three characters           |
| BACKUP.[0-9][0-9][0-9] | Any file beginning with “BACKUP.” followed by exactly three numerals          |
| [[:upper:]]\*          | Any file beginning with an uppercase letter                                   |
| [![:digit:]]\*         | Any file not beginning with a numeral                                         |
| \*[[:lower:]123]       | Any file ending with a lowercase letter or the numerals “1”, “2”, or “3”      |

`$ mkdir` create directories

`$ cp file1 file2` Copy file1 to file2. If file2 exists, it is **overwritten** with the contents of file1.

`$ cp file1 file2 dir1` Copy file1 and file2 into directory dir1. The directory dir1 must already exist.

- `-a, --archive` Copy items with all of their attributes, including ownerships and permissions.
- `-i, --interactive` Before overwriting an existing file, prompt the user for confirmation.
- `-r --recursive` Recursively copy directories and their contents. This option (or the `-a` option) is required when copying directories.
- `-u --update` When copying files from one directory to another, only copy files that either don't exist or are newer than the existing corresponding files, in the destination directory.
- `-v --verbose` Display informative messages as the copy is performed.

`$ mv` performs both file moving and file renaming.

`$ mv file1 file2` Move file1 to file2. If file2 exists, it is **overwritten** with the contents of file1.

`$ rm` command is used to remove (delete) files and directories.

- `-r --recursive` Recursively delete directories. To delete a directory, this option must be specified.
- `-f --force` Ignore nonexistent files and do not prompt.

`$ ln file link` creates a **hard link**.

`$ ln -s item link` create a **symbolic link**.

In most Unix-like systems it is possible to have a file referenced by multiple names. By default, every file has a single **hard link** that gives the file its name. When a hard link is deleted, the link is removed but the contents of the file itself continue to exist until all links to the file are deleted.

Hard links cannot span physical devices. Hard links cannot reference directories, only files.

Modern practice prefers symbolic links. Symbolic links were created to overcome the limitations of hard links. Symbolic links work by creating a special type of file that contains a text pointer to the referenced file or directory.

`lrwxr-xr-x 1 yianzhou staff 3 May 16 08:36 fun-sym -> fun`

Notice the size of the symbolic link file is 3, which is the number of characters in the string "fun".

# Commands

A command can be one of four different things:

1. An executable program written in C and C++ or scripting languages such as the shell, Perl, Python, Ruby, etc.
2. A shell builtins.
3. A shell function.
4. An alias.

`$ type command` displays a command's type.

`$ which command` displays a executable's location.

`$ man command` On most Linux systems, `man` uses `less` to display the manual page.

A note on notation: When square brackets appear in the description of a command's syntax, they indicate optional items. A vertical bar character indicates mutually exclusive items.

It's possible to put more than one command on a line by separating each command with a semicolon.

Create command alias: `$ alias foo='cd /usr; ls; cd -'`. They vanish when our shell session ends.

To remove an alias, the `$ unalias command` is used.

To see all the aliases defined in the environment, use the `alias` command without arguments.

# Redirection

Keeping with the Unix theme of “everything is a file,” programs such as `ls` actually send their results to a special file called standard output (often expressed as stdout) and their status messages to another file called standard error (stderr). By default, both standard output and standard error are linked to the screen and not saved into a disk file.

We can **redirect** the input and output of commands to and from files, as well as connect multiple commands together into powerful command **pipelines**.

To redirect standard output to another file instead of the screen, we use the `>` redirection operator.

We append redirected output to a file instead of overwriting the file from the beginning by using the `>>` redirection operator.

To redirect standard error we must refer to its **file descriptor**. A program can produce output on any of several numbered file streams, the first three are standard input, output and error, the shell references them internally as file descriptors 0, 1, and 2. We can redirect standard error with `2>` notation.

We use the single notation `&>` to redirect both standard output and standard error to the file.

`<` uses a file as a source of standard input.

`$ cat` command reads one or more files and copies them to standard output. It is often used to display short text files.

Since `cat` can accept more than one file as an argument, it can also be used to join files together:

`cat movie.mpeg.0* > movie.mpeg`

Using the pipe operator `|`, the standard output of one command can be piped into the standard input of another.

The `uniq` command is often used in conjunction with `sort`. `uniq` accepts a sorted list of data and removes any duplicates from the list.

`$ ls /bin /usr/bin | sort | uniq | less`

`$ grep` is to find text patterns within files.

- `-i` ignore case when performing the search

The `$ head` command prints the first ten lines of a file, and the `$ tail` command prints the last ten lines.

# Expansion and Qouting

`$ echo` displays a line of text.

Each time we type a command and press the Enter key, bash performs several substitutions upon the text before it carries out our command. The process that makes this happen is called **expansion**. With expansion, we enter something and it is expanded into something else before the shell acts upon it.

The mechanism by which wildcards work is called pathname expansion.

```sh
$ echo /usr/*/share
/usr/kerberos/share /usr/local/share
```

Tilde Expansion: The tilde character (~) has a special meaning. When used at the beginning of a word, it expands into the name of the home directory of the named user or, if no user is named, the home directory of the current user.

Arithmetic expansion uses the following form: `$((expression))`: `$ echo $((2 + 2)) 4`

Brace expansion can create multiple text strings from a pattern containing braces.

```sh
$ mkdir {0..9}
$ ls
0 1 2 3 4 5 6 7 8 9
```

To invoke parameter expansion: `$ echo $USER`

To see a list of available variables: `$ printenv | less`

Command substitution allows us to use the output of a command as an expansion.

`$ file $(ls -d /usr/bin/* | grep unzip)` In this example, the results of the pipeline became the argument list of the file command.

There is an alternate syntax for command substitution in older shell programs using backquotes.

Parameter expansion, arithmetic expansion, and command substitution still take place within **double quotes**:

```sh
$ echo "$USER $((2+2))"
yianzhou 4
```

By default, word-splitting looks for the presence of spaces, tabs, and newlines and treats them as delimiters between words.

Consider the following: `$ echo $(cal)`, `$ echo "$(cal)"`. In the first instance, the unquoted command substitution resulted in a command line containing 38 arguments. In the second, it resulted in a command line with one argument that includes the embedded spaces and newlines.

If we need to suppress all expansions, we use **single quotes**.

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

# zsh config

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
