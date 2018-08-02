---
title:  "在 CentOS 7 上搭建 Git Server"
categories: [Development]
---

I want my project url something like this: https://www.yianzhou.com/git/project.git

So the clone command can be in this format: $ git clone https://www.yianzhou.com/git/project.git

先创建一个新的配置文件，目的是与其他区分开: `/etc/httpd/conf.d/git.conf`
```
SetEnv GIT_PROJECT_ROOT /opt/git
SetEnv GIT_HTTP_EXPORT_ALL
ScriptAlias /git/ /usr/libexec/git-core/git-http-backend/

<LocationMatch "^/git/*">
AuthType Basic
AuthName "Git Access"
AuthUserFile /opt/git/.htpasswd
Require valid-user
</LocationMatch>
```

因为我们需要使用 HTTP 访问，所以要更改文件目录的权限: `chown -R apache /opt/git`

创建用户：`htpasswd /opt/git/.htpasswd andy`

重启网络服务：`systemctl restart httpd`

现在可以创建一个项目试一试:
```
$ cd /opt/git
$ mkdir myproject.git
$ cd myproject.git
$ git init --bare
```

在本地电脑上测试：`git clone`

如果是已有的项目:
```
cd <localdir>
git init
git add .
git commit -m 'message'
git remote add origin <url>
git push -u origin master
```

参考:
- <http://mtasuandi.com/2015/11/19/git-smart-http-transport/>
- ProGit, Chapter 4, Smart HTTP
