# 常见问题

[你不可不知的 3 种 OS X 应对「无响应」的方法](https://sspai.com/post/28526)

[11 pro， APP store 检测不到软件更新怎么解决啊？ - V2EX](https://www.v2ex.com/t/658963)

## 我的 IP 地址

[What Is My IP Address? Free IP Lookup](https://www.ipaddress.com/)

查 IP：[https://www.ip138.com/](https://www.ip138.com/)

## facebook SDK 引发崩溃

[2020 活久见：欧美主流 app「熔断」了](https://cloud.tencent.com/developer/article/1627302)

## github 无法连接

查看 `/etc/hosts` 文件，发现有 `192.30.253.113 github.com`，删掉即可。

## github.io 无法连接

`https://github.com/diamont1001/blog/issues/29`

`sudo code /etc/hosts`

绕过国内 dns 解析，直接通过 IP 形式访问。具体如下：

```
## GitHub Start
192.30.253.112 github.com
192.30.253.119 gist.github.com
151.101.100.133 assets-cdn.github.com
151.101.100.133 raw.githubusercontent.com
151.101.100.133 gist.githubusercontent.com
151.101.100.133 cloud.githubusercontent.com
151.101.100.133 camo.githubusercontent.com
151.101.108.133 user-images.githubusercontent.com
151.101.100.133 avatars0.githubusercontent.com
151.101.100.133 avatars1.githubusercontent.com
151.101.100.133 avatars2.githubusercontent.com
151.101.100.133 avatars3.githubusercontent.com
151.101.100.133 avatars4.githubusercontent.com
151.101.100.133 avatars5.githubusercontent.com
151.101.100.133 avatars6.githubusercontent.com
151.101.100.133 avatars7.githubusercontent.com
151.101.100.133 avatars8.githubusercontent.com
## GitHub End
```

刷新 DNS：`sudo killall -HUP mDNSResponder`

注：可通过 [https://www.ipaddress.com/](https://www.ipaddress.com/) 查询 github 最新的 ip 地址
