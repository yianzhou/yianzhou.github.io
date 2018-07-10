---
title:  "CentOS 7 配置"
categories: [Development]
---

# CentOS 7 配置

首先做基本的服务器配置，以及基本的安全策略：

[Initial Server Setup with CentOS 7](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-centos-7)

[How To Configure SSH Key-Based Authentication on a Linux Server](https://www.digitalocean.com/community/tutorials/how-to-configure-ssh-key-based-authentication-on-a-linux-server)

记得改权限否则无法 ssh 连上去！
```
chmod 700 .ssh
chmod 600 .ssh/authorized_keys
```

[Additional Recommended Steps for New CentOS 7 Servers](https://www.digitalocean.com/community/tutorials/additional-recommended-steps-for-new-centos-7-servers)


选择服务器架构：LAMP、LEMP等

[How To Install Linux, Apache, MySQL, PHP (LAMP) stack On CentOS 7](https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-on-centos-7)

[How To Install Linux, Nginx, MySQL, PHP (LEMP stack) on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mysql-php-lemp-stack-ubuntu-18-04)

CentOS 的 yum 的软件版本很多不是最新的，要安装最新的 MariaDB 和 PHP：

[How to Upgrade MariaDB 5.5 to MariaDB 10.0 on CentOS 7](http://www.liquidweb.com/kb/how-to-upgrade-mariadb-5-5-to-mariadb-10-0-on-centos-7/)

[PHP 7 on CentOS via Yum](https://webtatic.com/packages/php70/)

安装完之后可以选择移除这个仓库：
```
$ cd /etc/yum.repos.d
$ yum remove rpmforge-release
```

安装其他应用：

[How To Install and Secure phpMyAdmin with Apache on a CentOS 7 Server](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-phpmyadmin-with-apache-on-a-centos-7-server)

[How To Install WordPress on CentOS 7; Giving WordPress Its Own Directory](https://www.digitalocean.com/community/tutorials/how-to-install-wordpress-on-centos-7)

如何创建自己的 SSL 证书：
[How To Create an SSL Certificate on Apache for CentOS 7](https://www.digitalocean.com/community/tutorials/how-to-create-an-ssl-certificate-on-apache-for-centos-7)

SSL 相关文件存放在`etc/httpd/ssl`

将所有的网络请求重定向到 HTTPS：
[Httpd Wiki RedirectSSL (redirect all http request to https)](https://wiki.apache.org/httpd/RedirectSSL)

最后，检查是否安装好了：

[How To Protect your Server Against the POODLE SSLv3 Vulnerability](https://www.digitalocean.com/community/tutorials/how-to-protect-your-server-against-the-poodle-sslv3-vulnerability)

[Check your SSL/TLS certificate installation](https://cryptoreport.rapidssl.com/checker/views/certCheck.jsp)

[My SSL Lock is not displaying properly](http://www.inmotionhosting.com/support/website/security/ssl-lock-display)

[SSL/TLS Strong Encryption: How-To](https://httpd.apache.org/docs/2.4/ssl/ssl_howto.html)

©️ 本文原创，转载请注明出处。