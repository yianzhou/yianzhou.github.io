# The Linux Command Line

书在这里下载：[The Linux Command Line by William Shotts](http://linuxcommand.org/tlcl.php)

参考手册：<https://devhints.io/bash>

[LinuxCommand.org: Writing shell scripts.](http://linuxcommand.org/lc3_writing_shell_scripts.php)

## 1 - Introduction

Technically speaking, **Linux** is the name of the operating system's **kernel**, nothing more. The kernel is very important of course, since it makes the operating system go, but it's not enough to form a complete operating system. The **GNU Project** provides many, many free softwares running on top of the kernal.

When we speak of the **command line**, we are really referring to the **shell**. The shell is a _program_ that takes keyboard commands and passes them to the operating system to carry out. Almost all Linux distributions supply a shell program from the GNU Project called **bash**.

When using a graphical user interface (GUI), we need another program called a terminal emulator, simply called **ternimal**, to interact with the shell.

`[me@linuxbox ~]$` This is called a **shell prompt** and it will appear whenever the shell is ready to accept input.

`$ date` displays the current time and date.

`$ cal` displays a calendar of the current month.

## 2, 3 - Navigation and Exploring

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

## 4 - Manipulating

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

**Modern practice prefers symbolic links.** Symbolic links were created to overcome the limitations of hard links. Symbolic links work by creating a special type of file that contains a text pointer to the referenced file or directory.

`lrwxr-xr-x 1 yianzhou staff 3 May 16 08:36 fun-sym -> fun`

Notice the size of the symbolic link file is 3, which is the number of characters in the string "fun".

## 5 - Commands

A command can be one of four different things:

1. An executable program written in C and C++ or scripting languages such as the shell, Perl, Python, Ruby, etc.
2. A shell builtins.
3. A shell function.
4. An alias.

`$ type command` displays a command's type.

`$ which command` displays a executable's location. (locate a program file in the user's path)

`$ whereis command` locate programs

`$ man command` On most Linux systems, `man` uses `less` to display the manual page.

在 man page 中输入 `/`，然后输入要查找的字符，就可以跳到对应的位置。

A note on notation: When square brackets appear in the description of a command's syntax, they indicate optional items. A vertical bar character indicates mutually exclusive items.

It's possible to put more than one command on a line by separating each command with a semicolon.

Create command alias: `$ alias foo='cd /usr; ls; cd -'`. They vanish when our shell session ends.

To remove an alias, the `$ unalias command` is used.

To see all the aliases defined in the environment, use the `alias` command without arguments.

## 6 - Redirection

### I/O

Keeping with the Unix theme of “everything is a file,” programs such as `ls` actually send their results to a special file called **standard output** (often expressed as stdout) and their status messages to another file called **standard error** (stderr). By default, both standard output and standard error are linked to the screen and not saved into a disk file.

We can **redirect** the input and output of commands to and from files, as well as connect multiple commands together into powerful **command pipelines**.

To redirect standard output to another file instead of the screen, we use the `>` redirection operator.

We append redirected output to a file instead of overwriting the file from the beginning by using the `>>` redirection operator.

To redirect standard error we must refer to its **file descriptor**. A program can produce output on any of several numbered file streams, the first three are standard input, output and error, the shell references them internally as file descriptors 0, 1, and 2.

We can redirect standard error with `2>` notation.

We use the single notation `&>` to redirect both standard output and standard error to the file.

`<` uses a file as a source of standard input.

### Pipelines

Using the pipe operator `|`, the standard output of one command can be piped into the standard input of another.

The `uniq` command is often used in conjunction with `sort`. `uniq` accepts a sorted list of data and removes any duplicates from the list.

`$ ls /bin /usr/bin | sort | uniq | less`

## 7 - Expansion and Qouting

`$ echo` prints its text arguments on standard output.

```bash
# 分行打印
echo $PATH | tr ':' '\n'
```

Each time we type a command and press the Enter key, bash performs several substitutions upon the text before it carries out our command. The process that makes this happen is called **expansion**. With expansion, we enter something and it is expanded into something else before the shell acts upon it.

The mechanism by which wildcards work is called pathname expansion.

```bash
$ echo /usr/*/share
/usr/kerberos/share /usr/local/share
```

Tilde Expansion: The tilde character (~) has a special meaning. When used at the beginning of a word, it expands into the name of the home directory of the named user or, if no user is named, the home directory of the current user.

Arithmetic expansion uses the following form: `$((expression))`: `$ echo $((2 + 2))`

Brace expansion can create multiple text strings from a pattern containing braces.

```bash
$ mkdir {0..9}
$ ls
0 1 2 3 4 5 6 7 8 9
```

To invoke **parameter expansion**: `$ echo $USER`

To see a list of available variables: `$ printenv | less`

**Command substitution** allows us to use the output of a command as an expansion.

`$ file $(ls -d /usr/bin/* | grep unzip)` In this example, the results of the pipeline became the argument list of the file command.

Parameter expansion, arithmetic expansion, and command substitution still take place within **double quotes**:

```bash
$ echo "$USER $((2+2))"
4
```

By default, word-splitting looks for the presence of spaces, tabs, and newlines (linefeed characters) and treats them as delimiters between words. This means unquoted spaces, tabs, and newlines are not considered to be part of the text. They serve only as separators.

```bash
# the unquoted command substitution resulted in a command line containing 38 arguments
echo $(cal)
# resulted in a command line with one argument that includes the embedded spaces and newlines
echo "$(cal)"
```

If we need to suppress all expansions, we use **single quotes**.

单引号会完全抑制表达式展开，通常我们使用双引号，特殊符号可以使用反斜杠转义：

```bash
echo "The balance for user $USER is: \$5.00"
```

It is possible to use characters in filenames that normally have special meaning to the shell. These would include $, !, &, spaces, and others. 文件名中的这些特殊字符需要用反斜杠转义。

## 8 - Advanced Keyboard Tricks

`clear`: Clear the screen

- Ctrl-a: Move cursor to the beginning of the line.
- Ctrl-e: Move cursor to the end of the line.
- Ctrl-l: Clear the screen and move the cursor to the top-left corner. The `clear` command does the same thing.
- Ctrl-u: clear up to the beginning
- Ctrl-w: delete just a word

向上翻页：`Command + Fn + ⬆️`

`history`: Display the contents of the history list

历史记录可以用行号直接展开，例如执行第 88 行的命令：`!88`

zsh 可以存储多达数千条历史记录，可以尝试从中查找命令：`history | grep /usr/bin`

Ctrl-r: 在历史记录中搜索，Ctrl-c 退出搜索。

`script` 可以将接下来运行的命令及其输出，全部写入到一个文件里面，方便再次查看，按 Ctrl-D 终止。

## 9 - Permissions

How the file see users: **Owners**, **Group Members**, and **Everybody Else**.

To find out information about your identity, use the `id` command.

```bash
echo "$(id)" | tr ' ' '\n'
```

User accounts are defined in the `/etc/passwd` file and groups are defined in the `/etc/group` file.

When user accounts and groups are created, these files are modified along with `/etc/shadow` which holds information about the user's password.

Access rights to files and directories are defined in terms of **read** access, **write** access, and **execution** access.

To change the mode (permissions) of a file or directory, the `chmod` command is used.

`chmod` supports two distinct ways of specifying mode changes: **octal number** representation, or symbolic representation.

常用的八进制权限：7 (rwx), 6 (rw-), 5 (r-x), 4 (r--), and 0 (---).

Symbolic notation is divided into three parts:

- Who the change will affect: `u` for user, `g` for group, `o` for others, `a` for all
- Which operation will be performed: `+`, `-` or `=`
- What permission will be set: `r`, `w` or `x`

`u+x,go=rx` 给 user 加执行权限，group 和其它的权限设置为读与执行。

## 10 - Processes

The most commonly used command to view processes is `ps`.

By default, `ps` doesn't show us very much, just the processes associated with the current terminal session.

`ps x` show all of our processes. The presence of a "?" in the TTY column indicates no controlling terminal.

To see a more dynamic view of the machine's activity, we use the `top` command.

The `kill` command is used to send signals to programs. If no signal is specified on the command line, then the TERM (terminate) signal is sent by
default.

Common Signals: `1` for hangup, `2` for interrupt, `9` for kill, `15` for terminate.

杀死进程：打开 `Activity Monitor`，查看 PID，`kill -9 [pid]`

## 11 - The Environment

While most programs use configuration files to store program settings, some programs also look for values stored in the **environment** to adjust their behavior.

The `set` command will show both the shell and environment variables, while `printenv` will only display the latter.

The printenv command can also list the value of a specific variable: `printenv USER`

When we log on to the system, the bash program starts, and reads a series of configuration scripts called startup files, which define the default environment shared by all users. This is followed by more startup files in our home directory that define our personal environment.

The `~/.bashrc` file is probably the most important startup file from the ordinary user’s point of view.

## 13 - Customizing the Prompt

查看当前系统已安装的 shell：`cat /etc/shells`

切换成 zsh：`chsh -s /bin/zsh`

安装 [ohmyzsh](https://github.com/ohmyzsh/ohmyzsh)

编辑配置文件：`~/.zshrc`

安装 [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting/blob/master/INSTALL.md)：`brew install zsh-syntax-highlighting`

安装 [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md)

## 14 - Package Management

Homebrew 是一个简单易用的包管理器，可以让你轻松下载、管理第三方应用。

查看过期应用：`brew outdated`

更新所有应用：`brew upgrade`

清除缓存：`brew cleanup`

### 第三方包

显示文件夹目录树：`brew install tree`，可指定层级深度 `tree -L 2`

## 17 - Searching for Files

`$ cat` is often used to display short text files.

Since `cat` can accept more than one file as an argument, it can also be used to join files together:

`cat movie.mpeg.0* > movie.mpeg`

`$ grep` is to find text patterns within files, `-i` ignore case when performing the search.

如果想用 `grep` 搜索 `-D`，这个 `-D` 会被当成 option，这时用 `--` 可以 delimit the option list.

`grep -- -D`

The name "grep" is actually derived from the phrase "global regular expression print". In essence, `grep` searches text files for the occurrence text matching a specified **regular expression** and outputs any line containing a match to standard output.

```bash
# 列出当前目录下的文件，查找名字里含 "pod" 的，不区分大小写
ls | grep -i pod
```

The `$ head` command prints the first ten lines of a file, and the `$ tail` command prints the last ten lines.

The `$ less` command is a program to view text files. To exit less, press the q key.

- `/` Search forward to the next occurrence of characters
- `n` Search for the next occurrence of the previous search

The `find` program searches a given directory (**and its subdirectories**).

`d` for directories, `f` for files, `l` for symbolic links.

```bash
find ~/Downloads -type d | wc -l

# 大小写敏感
find ~/Downloads -type f -name "*.JPG"
```

The `touch` command is usually used to set or update the access, change, and modify times of files.

```bash
# 创建 playground 文件夹，里面有 100 个文件夹
mkdir -p playground/dir-{001..100}
# 每个文件夹里面创建 26 个文件
touch playground/dir-{001..100}/file-{A..Z}
```

The `stat` command reveals all that the system understands about a file and its attributes.

## 23 – Compiling Programs

Programs written in assembly language are processed into machine language by a program called an **assembler**.

Programs written in high-level programming languages are converted into machine language by processing them with another program, called a **compiler**. Some compilers translate high-level instructions into assembly language and then use an assembler to perform the final stage of translation into machine language.

A process often used in conjunction with compiling is called linking. A program called a **linker** is used to form the connections between the output of the compiler and the _libraries_ that the compiled program requires. The final result of this process is the executable program file, ready for use.

Scripted languages are executed by a special program called an **interpreter**.

The C compiler used almost universally in the Linux environment is called **gcc**.

For our compiling exercise, we are going to compile a program from the GNU Project called [diction](https://www.gnu.org/software/diction/). This handy little program checks text files for writing quality and style.

The **makefile** is a configuration file that instructs the make program exactly how to build the program.

The make program can be used for any task that needs to maintain a target/dependency relationship, not just for compiling source code.

> The purpose of the make utility is to determine automatically which pieces of a large program need to be recompiled, and issue the commands to recompile them.

## 24 - Shell

The shell is both a powerful command line interface to the system and a scripting language interpreter.

```bash
#!/bin/zsh
# This is our first script.
echo 'Hello World!'
```

The `#!` character sequence is, in fact, a special construct called a **shebang**. The shebang is used to tell the kernel the name of the interpreter that should be used to execute the script that follows. Every shell script should include this as its first line.

The program we will write is a report generator. It will present various statistics about our system and its status and will produce this report in HTML format.

### set

The `Set` Builtin: <https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html>

`-e`: Exit immediately if a command returns a non-zero status.

`-x`: Print a trace of simple commands before they are executed.

`-u`: Treat unset variables and parameters as an error when performing parameter expansion.

### eval

The `eval` function: <https://www.gnu.org/software/make/manual/html_node/Eval-Function.html>

```bash
FORMAT_CMD="git diff --cached --name-only -- '*.dart'"
eval $FORMAT_CMD | xargs -I '{}' dart format -l 120 {}
```

不用 `eval` 的话，会有错误：`xargs: dart: No such file or directory`

## 25 - Variables

惯用法：全大写字母表示常量，小写字母表示变量。

定义变量：`TITLE="System Information Report"`

展开变量：`$TITLE`

Unlike some other programming languages, the shell does not care about the type of data assigned to a variable; **it treats them all as strings.** You can force the shell to restrict the assignment to integers by using the declare command with the -i option, but, like setting variables as readonly, this is rarely done.

During expansion, variable names may be surrounded by optional curly braces, `{}`.

`mv "$filename" "${filename}1"`

It's good practice is to enclose variables and command substitutions in double quotes to limit the effects of word-splitting by the shell. Quoting is especially important when a variable might contain a filename.

## 26 - Shell Functions

Shell functions are “mini-scripts” that are located inside other scripts and can act as autonomous programs.

Shell 函数的形式：

```bash
function step2 {
    commands
    return
}
```

或（推荐使用）：

```bash
step2() {
    commands
    return
}
```

调用：`step`，注意，没有扣号 `()`。

请注意，为了将函数调用识别为 shell 函数而不是外部程序，shell 函数定义必须在调用之前出现。

函数可以有局部变量：

```bash
funct_2() {
    local foo # variable foo local to funct_2
    foo=2
    echo "funct_2: foo = $foo"
}
```

## 27 - If

`$?` 获取命令行返回状态

test File expressions:

```bash
#!/bin/bash

# test-file: Evaluate the status of a file

FILE=~/.bashrc

if [ -e "$FILE" ]; then
    if [ -f "$FILE" ]; then
        echo "$FILE is a regular file."
    fi
    if [ -d "$FILE" ]; then
        echo "$FILE is a directory."
    fi
    if [ -r "$FILE" ]; then
        echo "$FILE is readable."
    fi
    if [ -w "$FILE" ]; then
        echo "$FILE is writable."
    fi
    if [ -x "$FILE" ]; then
        echo "$FILE is executable/searchable."
    fi
else
    echo "$FILE does not exist"
    exit 1
fi

exit
```

The `exit` command accepts a single, optional argument, which becomes the script’s exit status. When no argument is passed, the exit status defaults to the exit status of the last command executed.

test String Expressions:

```bash
#!/bin/bash

# test-string: evaluate the value of a string

ANSWER=maybe

if [ -z "$ANSWER" ]; then
    echo "The length of string is zero." >&2
    exit 1
fi
if [ -n "$ANSWER" ]; then
    echo "The string is not empty."
fi
if [ "$ANSWER" = "yes" ]; then
    echo "The answer is YES."
elif [ "$ANSWER" = "no" ]; then
    echo "The answer is NO."
else
    echo "The answer is UNKNOWN."
fi
```

test Integer Expressions:

```bash
if [ "$INT" -eq 0 ]; then
    echo "INT is zero."
fi
```

The `[[ ]]` command is similar to test (`[]`), but adds an important new string expression: `string =~ regex`

```bash
if [[ "$INT" =~ ^-?[0-9]+$ ]]; then
    echo $INT
fi
```

Another added feature of `[[ ]]` is that the `==` operator supports pattern matching the same way pathname expansion does.

```bash
if [[ $FILE == foo.* ]]; then
    echo "$FILE matches pattern 'foo.*'"
fi
```

`(( ))` supports a full set of arithmetic evaluations.

```bash
if (( ((INT % 2)) == 0)); then
    echo "INT is even."
else
    echo "INT is odd."
fi
```

Because the compound command `(( ))` is part of the shell syntax rather than an ordinary command, and it deals only with integers, it is able to recognize variables by name and does not require expansion to be performed.

test and `[[ ]]` use different operators to represent logical operations:

| Operation | test | `[[ ]]` and `(( ))` |
| --------- | ---- | ------------------- |
| AND       | -a   | &&                  |
| OR        | -o   | \|\|                |
| NOT       | !    | !                   |

Since all expressions and operators used by test are treated as command arguments by the shell (unlike `[[ ]]` and `(( ))` ), characters that have special meaning to bash, such as `<`, `>`, `(`, and `)`, must be quoted or escaped.

_bash_ provides two **control operators** that can perform branching. The `&&` (AND) and `||` (OR) operators work like the logical operators in the `[[ ]]` compound command.

```bash
# command1 成功的前提下，才执行 command2
mkdir temp && cd temp
# command1 失败的前提下，才执行 command2
[[ -d temp ]] || mkdir temp
```

## 31 - While

In bash, multiple-choice compound command is called `case`.

The patterns used by case are the same as those used by pathname expansion. Patterns are terminated with a `)` character.

```bash
case "$REPLY" in
q | Q)
    echo "Program terminated."
    exit
    ;;
a | A)
    echo "Hostname: $HOSTNAME"
    uptime
    ;;
b | B)
    df -h
    ;;
*)
    echo "Invalid entry" >&2
    exit 1
    ;;
esac
```

The addition of the `;;&` syntax allows case to continue to the next test rather than simply terminating.

## 32 – Positional Parameters

The shell provides positional parameters (`$0` ...) that contain the individual words on the command line.

The shell also provides a variable, `$#`, that contains the number of arguments on the command line.

The `shift` command causes all the parameters to “move down one” each time it is executed.

```bash
#!/bin/bash
# posit-param2: script to display all arguments
count=1
while [[ $# -gt 0 ]]; do
    echo "Argument $count = $1"
    count=$((count + 1))
    shift
done
```

Each time shift is executed, the value of `$2` is moved to `$1`, the value of `$3` is moved to `$2` and so on. The value of `$#` is also reduced by one.

`$0` always contains the full pathname of the first item on the command line (i.e., the name of the program).

```bash
#!/bin/bash
# posit-params3: script to demonstrate $* and $@
print_params() {
    echo "\$1 = $1"
    echo "\$2 = $2"
    echo "\$3 = $3"
    echo "\$4 = $4"
    echo "\n"
}

pass_params() {
    print_params $*
    print_params "$*"
    print_params $@
    print_params "$@"
}

pass_params "word" "words with spaces"
```

`$*` 展开为位置参数列表，从 1 开始。当被双引号括起来时，它展开为包含所有位置参数的双引号字符串，每个参数由空格分隔。

`$@` 展开为位置参数列表，从 1 开始。当被双引号括起来时，每个位置参数转换成一个单独的单词，就好像它被双引号括起来一样。

"$@" is by far the most useful for most situations because it preserves the integrity of each positional parameter. To ensure safety, it should always be used.

## 33 – Looping with for

The original `for` command’s syntax is as follows:

```bash
for variable in words; do
    commands
done
```

Recent versions of bash have added a second form of `for` command syntax:

```bash
for ((expression1; expression2; expression3)); do
    commands
done
```

## 34 – Strings and Numbers

### 参数展开

基本形式：`$a`, `${a}`, `${11}`（第 11 个位置参数）

处理空变量：

`${parameter:-word}` If parameter is unset (i.e., does not exist) or is empty, this expansion results in the value of word.

`${parameter:=word}` If parameter is unset or empty, this expansion results in the value of word. In addition, the value of word is assigned to parameter.

`${parameter:?word}` If parameter is unset or empty, this expansion causes the script to exit with an error, and the contents of word are sent to standard error.

`${parameter:+word}` If parameter is unset or empty, the expansion results in nothing. If parameter is not empty, the value of word is substituted for parameter; however, the value of parameter is not changed.

### 字符串操作

`${#parameter}` 若 `parameter` 为字符串，展开为字符串的长度；若 `parameter`为 `@` 或 `*`，展开为位置参数的个数。

`${parameter:offset}`, `${parameter:offset:length}` These expansions are used to extract a portion of the string contained in parameter. The extraction begins at offset characters from the beginning of the string and continues until the end of the string, unless length is specified. If parameter is `@`, the result of the expansion is length positional parameters, starting at offset.

`${parameter#pattern}`, `${parameter##pattern}` These expansions remove a leading portion of the string contained in parameter defined by pattern. pattern is a wildcard pattern like those used in pathname expansion. The dif- ference in the two forms is that the # form removes the shortest match, while the ## form removes the longest match.

`${parameter%pattern}`, `${parameter%%pattern}` They remove text from the end of the string contained in parameter rather than from the beginning.

- `${parameter/pattern/string}`
- `${parameter//pattern/string}`
- `${parameter/#pattern/string}`
- `${parameter/%pattern/string}`

This expansion performs a search-and-replace operation upon the contents of parameter.

`${parameter,,pattern}` Expand the value of parameter into all lowercase.

`${parameter,pattern}` Expand the value of parameter, changing only the first character to lowercase.

`${parameter^^pattern}` Expand the value of parameter into all uppercase letters.

`${parameter^pattern}` Expand the value of parameter, changing only the first character to uppercase (capitalization).

## 35 – Arrays

```bash
a[1]=foo
echo ${a[1]}

days=(Sun Mon Tue Wed Thu Fri Sat)
for i in ${days[@]}; do echo $i; done

echo ${#a[@]} # number of array elements
echo ${#a[100]} # length of element 100
```

Bash allows you to reference element 0 of an array variable using scalar notation: instead of writing `${arr[0]}`, you can write `$arr`; in other words: if you reference the variable as if it were a scalar, you get the element at index 0.

例如：`${BASH_SOURCE[0]}` 等同于 `$BASH_SOURCE`

## Example

```bash
#!/bin/zsh

# Program to output a system information page

PROGNAME="$(basename "$0")"
TITLE="System Information Report For $HOSTNAME"
CURRENT_TIME="$(date +"%x %r %Z")"
TIMESTAMP="Generated $CURRENT_TIME, by $USER"

report_uptime() {
    cat <<-_EOF_
    <h2>System Uptime</h2>
    <pre>$(uptime)</pre>
_EOF_
}

report_disk_space() {
    cat <<-_EOF_
    <h2>Disk Space Utilization</h2>
    <pre>$(df -h)</pre>
_EOF_
}

report_home_space() {
    local format="%8s%10s%10s\n"
    local i dir_list total_files total_dirs total_size user_name

    if [[ "$(id -u)" -eq 0 ]]; then
        dir_list=/home/*
        user_name="All Users"
    else
        dir_list="$HOME/Downloads"
        user_name="$USER"
    fi

    echo "<h2>Home Space Utilization ($user_name)</h2>"
    for i in $dir_list; do
        total_files="$(find "$i" -type f | wc -l)"
        total_dirs="$(find "$i" -type d | wc -l)"
        total_size="$(du -sh "$i" | cut -f 1)"

        echo "<H3>$i</H3>"
        echo "<pre>"
        printf "$format" "Dirs" "Files" "Size"
        printf "$format" "----" "-----" "----"
        printf "$format" "$total_dirs" "$total_files" "$total_size"
        echo "</pre>"
    done
}

usage() {
    echo "$PROGNAME: usage: $PROGNAME [-f file | -i]"
    return
}

write_html_page() {
    # Here Documents: 好处是可以任意使用双引号和单引号
    # <<- will ignore leading tab characters (but not spaces) in the here document
    cat <<_EOF_
    <html>
        <head>
            <title>$TITLE</title>
        </head>
        <body>
            <h1>$TITLE</h1>
            <p>$TIMESTAMP</p>
            $(report_uptime)
            $(report_disk_space)
            $(report_home_space)
        </body>
    </html>
_EOF_
}

# process command line options
interactive=
filename=

while [[ -n "$1" ]]; do
    case "$1" in
    -f | --file)
        shift # 移位，下一个参数才是真正的文件名
        filename="$1"
        ;;
    -i | --interactive)
        interactive=1
        ;;
    -h | --help)
        usage
        exit
        ;;
    *)
        usage >&2
        exit 1
        ;;
    esac
    shift
done

# output html page
if [[ -n "$filename" ]]; then
    if touch "$filename" && [[ -f "$filename" ]]; then
        write_html_page >"$filename"
    else
        echo "$PROGNAME: Cannot write file '$filename'" >&2
        exit 1
    fi
else
    write_html_page
fi
```
