---
title:  "常用的 Linux 命令"
categories: [Development]
---

`grep` searches the given file for lines containing a match to the given strings or words. 

`pwd` which directory you are in

`ls -a` see all hidden files

`rm -r` to delete a directory

`echo` -- write arguments to the standard output

`cat` is to display the contents of a file

`w` list all of the currently logged in users

`last` most recent login attempts

`less /etc/passwd` (view available users)

`less /etc/group` (view available groups) each user has a private.

add user: `sudo useradd -m olivia`

set password for user: `sudo passwd olivia`

`addgroup readers`

Add user to a group: `sudo usermod -a -G readers nathan`

三种权限组：owner, group, all users

三种权限：
- read(r=4): read the contents of the file
- write(w=2): write or modify a file or directory
- execute(x=1): execute a file or view the contents of a directory

Viewing the Permissions: `ls -l`
- The first character is the special permission flag that can vary.
- The following set of three characters is for the owner permissions.
- The second set of three characters is for the Group permissions.
- The third set of three characters is for the All Users permissions.

在本地电脑上压缩：
`local$ tar zcvf name.tar.gz directory`

然后上传到远端的 home 目录：
`local$ scp localfile user@ip:~/`

从远端下载文件：
 `username@remote:/file/to/send /where/to/put`

解压缩：
`$tar zxvf name.tar.gz`

To print run-level: `systemctl get-default`

To print system version: `cat /etc/redhat-release`
