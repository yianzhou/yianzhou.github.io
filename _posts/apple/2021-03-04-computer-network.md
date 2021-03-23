---
title: "UserNotification"
categories: [Apple]
---

<!-- prettier-ignore -->
* Do not remove this line (it will not be displayed)
{:toc}

> [Welcome to the student resources for the Computer Networking: A Top-Down Approach Sixth Edition Companion Website.](https://wps.pearsoned.com/ecs_kurose_compnetw_6/216/55463/14198700.cw/index.html)

# Computer Network and Internet

## Network Edge

因特网是世界范围的计算机网络。

传统的桌面 PC、Linux 工作站、服务器，以及新兴的手机、家用电器、可穿戴设备等正在与因特网相连。这些设备被称为主机 (host)，主机又可分为两类：客户端和服务器；因主机运行在网络边缘 (network edge)，故又称为端系统 (end system)。

接入网 (network access) 是指将端系统物理连接到 edge router 的网络。

家庭入网过去用的是 DSL (Digital Subscriber Line)，DSL modem 得到数字信息后将其转换为高频信号，通过电话线（即双绞铜线）与电话公司的 DSLAM 交换数据，并在那里被转换回数字形式。电话线通过“频分复用技术”形成了双向电话信道（0 - 4kHz）、中速上行信道（4kHz - 50kHz）、告诉下行信道（50kHz - 1MHz）。使得电话呼叫和因特网连接能同时进行。

另一种家庭入网是同轴电缆 (cable) 接入，利用了有线电视公司的基础设施。家庭先通过同轴电缆接入到地区的光纤节点，再通过光纤连接到有线电视公司。这种入网要用到 cable modem，同 DSL modem 一样将信号进行数模转换。

现在更多的家庭享受到了光纤入户 (Fiber To The Home, FTTH)，用户在家中将无线路由器与 ONT (Optical Network Terminator) 相连，多个家庭的 ONT 通过光纤连接到临近的分配器 (splitter)，再通过一根共享的光纤连接到本地中心局的 OLT (Optical Line Terminator)。OLT 提供了光信号和电信号之间的转换。

## Network Core

### Packet Switching

网络核心是由通信链路 (communication link) 和分组交换机 (packet switch) 构成的网状网络。

端系统彼此交换报文 (message)。长的报文被划分成分组 (packet)，分组通过网络核心传送。

通信链路由不同的物理媒体组成，包括同轴电缆、双绞铜线、光纤、无线电频谱等。链路的传输速率以 bit/s 度量。假设链路的传输速率是 R bits/s，经过一条链路发送 L bits 的 packet，传输时间应为 L/R 秒。

Packet switch 最著名的两种类型是路由器 (router) 和链路层交换机 (link-layer switch)。

#### Store-and-forward transmission

多数 packet switch 在链路的输入端使用存储转发传输 (store-and-forward transmission)，这是指 packet switch 在开始向输出链路传输 packet 的第一个比特之前，必须收到整个 packet。

为了理解这一机制，考虑两个端系统经一台路由器连接构成的简单网络，Source 在时刻 0 开始传输，经过 L/R 秒，路由器接受到整个 packet，并且开始向出链路传输，在时刻 2L/R 整个 packet 到达目的地，所以总时延是 2L/R。如果 packet switch 不使用存储转发机制，而是每到达一个比特就直接转发，那么总时延将会是 L/R。

![img](/assets/images/1A46D224-C9F6-41C8-88A9-E2612F154B7F.jpg)

一般地，通过由 N 条速率均为 R 的链路组成的路径（代表有 N - 1 台路由器），端到端的存储转发时延是 `d = N * L / R`。

#### Queuing Delays and Packet Loss

除了存储转发时延，packet 还要承受排队时延 (queueing delay) 和丢包 (packet loss)。

对于每一条连接到 packet switch 上的链路，都有一个对应的输出缓存 (output buffer)，它用于存储准备发往那条链路的 packet。如果该链路正忙于传输其它 packet，则到达路由器的 packet 必须在输出缓存中等待，这就造成了排队时延。如果输出缓存已满，那么在新的 packet 到达时就会有 packet 被丢弃，造成丢包。

![img](/assets/images/3CA03F1B-4719-4E90-977E-849FCD857DBB.jpg)

#### Forwarding Tables and Routing Protocols

路由器从与它相连的一条链路中收到 packet，然后向与它相连的另一条链路转发该 packet。那么，如何决定应该向哪条链路转发呢？

源在 packet 的头部包含了目的地的 IP 地址。每台路由器都有一个转发表，用于将目的地址（或目的地址的一部分）映射到输出链路。

我们不需人工对每台路由器配置转发表，因特网的 routing protocols 就是用于自动地设置这些转发表的。

#### Delay, Packet Loss and Throughput

Packet 在传输的路径上的**每个节点**都要经历几种不同类型的时延。

- 节点处理时延 (nodal processing delay)：检查 packet 的头部并决定将该 packet 导向何处；
- 排队时延 (queuing delay)：当出链路忙于传输时，特定 packet 必须排队等待；
- 传输时延 (transmission delay)：L/R，这是将一个 packet 的所有比特推向链路的时间，传输时延的原因是前面学习的存储转发机制；
- 传播时延 (propagation delay)：一旦一个比特被推向链路，它就会向下一个节点传播，这是一个比特从路由器 A 的出口到路由器 B 的入口所需要的时间。传播速率取决于该链路的物理媒体。

下面一张图概括了路由器 A 的节点总时延 (total nodal delay)：

![img](/assets/images/5A9F468D-F161-4FC4-B691-1FFC1C06B953.jpg)

### Circuit Switching

Circuit Switching 必须在发送方和接收方之间建立一条连接，该连接被称为一条电路 (circuit)，它路径上的交换机都要为该连接维护必要的状态。Circuit 预留了恒定的传输速率，以确保发送方能够以恒定速率向接收方传送数据。（类比固定电话之间的通话）

与之相反，packet switching 不预留任何链路资源，因特网尽最大努力交付 packet 但不做任何保证。（类比微信语音通话）

Circuit Switching 需要预先分配资源，已分配而没有用上的链路时间就被浪费掉了；Packet Switching 则可以按需共享链路传输能力。今天的电信网络正在朝 Packet switching 发展，特别是，电话网经常在昂贵的海外电话部分使用 Packet Switching。

## ISPs

端系统要通过 ISP (Internet Service Provider) 接入因特网。Access ISPs 的类型多种多样，包括住宅 ISP、公司 ISP、大学 ISP、咖啡厅或医院等公共场所的 ISP……

为了理解今天的因特网结构，我们以逐步递进的方式建造一系列网络结构，每一次递进都更接近现实中的因特网。

在中国，每个城市有 Access ISPs，它们与省级 ISP 连接，再与国家级 ISP 连接，最终与 tier-1 ISP 连接。在此基础上，再加上 PoPs (Point of Presence)、multi-homing、peering、IXPs (Internet exchange points)，形成了 Network Structure 4。

最终，今天的因特网在 Network Structure 4 的顶部增加内容提供商网络 (content provider network) 构成。例如谷歌通过创建自己的网络和数据中心，直接在可能的地方与低层 ISP 互联。

![img](/assets/images/7182E1A1-1964-4FFD-8AC9-659F8101715C.jpg)

总之，今天的因特网是一个网络的网络，结构非常复杂，由十多个 tier-1 ISP 和数十万个较低层 ISP 组成。用户和内容提供商是较低层 ISP 的客户，低层 ISP 是高层 ISP 的客户。

## Protocol Layers

网络设计者以分层的方式组织协议、并实现这些协议的网络硬件和软件。一个 layer 会使用它下层的服务，并同时向上层提供服务 (service model)。

各层的所有协议被称为协议栈 (protocol stack)，因特网的协议栈由 5 个层次组成：物理层、链路层、网络层、运输层、应用层。

| Layer             | Name               | Example                      |
| ----------------- | ------------------ | ---------------------------- |
| Application Layer | Message（报文）    | HTTP, SMTP, FTP, DNS         |
| Transport Layer   | Segment（报文段）  | TCP, UDP                     |
| Network Layer     | Datagram（数据报） | IP, Routing protocols        |
| Link Layer        | Frame（帧）        | Ethernet, Wi-Fi, DOCSIS, PPP |
| Physical Layer    |                    |                              |

传输层负责进程到进程的传送；网络层负责主机到主机的传送；链路层负责将帧从一个节点移动到邻近的下一个节点；物理层负责将帧中的每一个比特从一个节点移动到下一个节点。

![img](/assets/images/8399A4F3-9540-4485-A26D-2747A1DC4BAF.jpg)

上图显示了这样一条路径：数据从源的协议栈一路向下、经过中间的链路层交换机和路由器的协议栈上上下下、最后向上到达目的地的协议栈。注意，路由器实现了第一层到第三层协议，而链路层交换机只实现了前二层。这意味着路由器能够实现 IP 协议，但链路层交换机不能，因此它不能识别 IP 地址，但它能够识别第二层地址如 Ethernet 地址。

如上图所示，packet 到达每一层，都会被附加上该层的首部字段（用字母 H 表示），首部字段会在之后被相应的层使用。现实中的封装会比这张图所描述的更复杂一些，例如在发送端一个大的 message 可能被划分为多个 segment，每个 segment 又可能被划分为多个 datagram，并在接收端进行重构。

## Network Security

Much of the **malware** out there today is **self-replicating**: once it infects one host, from that host it seeks entry into other hosts over the Internet, and from the newly infected hosts, it seeks entry into yet more hosts. Malware can spread in the form of a **virus** or a **worm**. Viruses are malware that require some form of user interaction to infect the user’s device. Worms are malware that can enter a device without any explicit user interaction.

Another broad class of security threats are known as **denial-of-service (DoS)** attacks. As the name suggests, a DoS attack renders a network, host, or other piece of infrastructure unusable by legitimate users.

A passive receiver that records a copy of every packet that flies by is called a **packet sniffer**. These packets can contain all kinds of sensitive information, including passwords, social security numbers, trade secrets, and private personal messages.

It is surprisingly easy to create a packet with an arbitrary source address, packet content, and destination address and then transmit this hand-crafted packet into the Internet, which will dutifully forward the packet to its destination. Imagine the unsuspecting receiver (say an Internet router) who receives such a packet, takes the (false) source address as being truthful, and then performs some command embedded in the packet’s contents (say modifies its forwarding table). The ability to inject packets into the Internet with a false source address is known as **IP spoofing**, and is but one of many ways in which one user can masquerade as another user.

# Application Layer

在同一个端系统上的进程，它们使用 IPC 相互通信，规则由操作系统确定；在两个不同端系统上的进程，通过跨越计算机网络交换 message 而相互通信。

不管是 client-server architecture 还是 P2P architecture，对每对通信进程，我们把主动发起通信方称为客户，被动等待联系方称为服务器。在 P2P architecture 中，一个进程既能够是客户又能够是服务器。

进程通过一个称为 socket 的软件接口，向网络发送和从网络接受 message。

在因特网中，目的地主机由 IP 地址标识；接收进程由端口号标识。

开发一个应用时，必须选择一种运输层协议，如何选择呢？大体从可靠数据传输、吞吐量、时效性和安全性几个方面考虑。如电子邮件、Web 文档这类应用，必须保证可靠数据传输（不能丢失数据）、对吞吐量无要求、对响应时间不敏感；如流媒体、视频通话、游戏等应用，则可以容忍丢包、但对带宽有要求、对响应时间敏感。

TCP 为应用层提供了面向连接的、可靠数据传输服务，还具有拥塞控制机制；UDP 是一种“仅提供最小服务”的传输层协议，它不提供可靠数据传输服务，不保证 message 能到达接收进程、message 也可能以乱序的方式到达接收进程。

TCP 和 UDP 本身都没有提供安全性相关的服务，但 TCP 在应用层可以用 SSL 来提供安全服务。除了可靠数据传输和安全性，目前的因特网运输协议并不能提供吞吐量和时效性的保证。

应用层协议定义了 Message 的类型，例如请求报文、响应报文；各种 Message 类型相应的语法，如 Message 中的各个字段的含义；确定进程何时、如何发送 message，以及对 message 进行响应的规则。

## The Web and HTTP

Web 的应用层协议是 HTTP (HyperText Transfer Protocol)。Web page 是由对象 (object) 组成的，一个对象是一个可通过 URL 寻址的文件（例如 HTML、JPEG、JavaScript 或视频片段这样的文件）。多数 Web page 包含一个 HTML 文件和多个引用对象。

HTTP 服务器不保存关于客户的任何信息，我们说 HTTP 是一个无状态协议 (stateless protocol)。

HTTP 在默认方式下使用持续连接 (persistent connection)，意味着客户端和服务器在一个长的时间范围内通信时，客户端一系列的请求及服务端的响应，都经同一个 TCP 连接发送。

非持续连接有这样一些缺点：第一，必须为每一个请求的对象建立和维护一个全新的 TCP 连接。这意味着，在客户端和服务器中都要分配 TCP 的缓冲区、保持 TCP 的变量；第二，每请求一个对象都要经历 2 RTTs，即 1 RTT 用于创建 TCP 连接，1 RTT 用于请求和接收对象。

HTTP/1.1 默认使用带流水线 (pipelining) 的持续连接，即，服务器在发送响应后保持该 TCP 连接打开，后续的请求和响应 message 能够通过相同的连接进行传送。一个完整的 Web page 及其所有资源，甚至，多个 Web page 都可以经同一个 TCP 连接发送给客户端。对对象的请求可以一个紧接一个发出，而不必等待对未决请求的响应。HTTP/2 在 HTTP/1.1 的基础上，允许在相同连接中多个请求和响应交错，并增加了按优先级排序请求和响应的机制。

一般来说，如果一条连接经过一定时间间隔（可配置）仍未被使用，服务器就会关闭该连接。

## HTTP Message Format

HTTP Message 有两种，请求报文和响应报文。

### Request Message

下面看一个典型的请求报文：

```s
GET /somedir/page.html HTTP/1.1
Host: www.someschool.edu
Connection: close
User-agent: Mozilla/5.0
Accept-language: fr
```

The first line of an HTTP request message is called the **request line**; the subsequent lines are called the **header lines**.

The request line has three fields: the method field, the URL field, and the HTTP version field.

The header line `Host: www.someschool.edu` specifies the host on which the object resides. You might think that this header line is unnecessary, as there is already a TCP connection in place to the host. But, as we’ll see in Section 2.2.5, the information provided by the host header line is required by Web proxy caches.

The `Accept-language:` header is just one of many content negotiation headers available in HTTP.

下面是请求报文的通用格式：

![img](/assets/images/636E8239-B438-48B9-82C4-4B7219C4B65C.jpg)

After the header lines (and the additional carriage return 回车 and line feed 换行) there is an “entity body.” The entity body is empty with the GET method, but is used with the POST method. If the value of the method field is POST, then the entity body contains what the user entered into the form fields.

A request generated with a form does not necessarily use the POST method. Instead, HTML forms often use the GET method and include the inputted data (in the form fields) in the requested URL.

### Response Message

下面看一个典型的响应报文：

```s
HTTP/1.1 200 OK
Connection: close
Date: Tue, 18 Aug 2015 15:44:04 GMT
Server: Apache/2.2.3 (CentOS)
Last-Modified: Tue, 18 Aug 2015 15:11:03 GMT Content-Length: 6821
Content-Type: text/html
(data data data data data ...)
```

It has three sections: an initial **status line**, six **header lines**, and then the **entity body**.

The status line has three fields: the protocol version field, a status code, and a corresponding status message.

常见的状态码包括：

| Status code                    | 说明                                                                                      |
| ------------------------------ | ----------------------------------------------------------------------------------------- |
| 200 OK                         | 请求成功                                                                                  |
| 301 Moved Permanently          | 请求的对象被永久转移了，Client 将自动获取新 URL（位于响应报文的 `Location:` header line） |
| 400 Bad Request                | 一个通用错误码，表示该请求不能被服务器理解                                                |
| 404 Not Found                  | 被请求的文档不存在服务器上                                                                |
| 505 HTTP Version Not Supported | 服务器不支持请求报文使用的 HTTP 协议版本                                                  |

For the header lines:

- The `Date:` header line indicates the time and date when the HTTP response was created and sent by the server.
- The `Last-Modified:` header line indicates the time and date when the object was created or last modified. It is critical for object caching, both in the local client and in network cache servers (also known as proxy servers).
- The `Content-Length:` header line indicates the number of bytes in the object being sent.
- The `Content-Type:` header line indicates that the object in the entity body is HTML text. (The object type is officially indicated by the Content-Type: header and not by the file extension.)

HTTP 规范定义了许多的 header lines，header lines 可以被浏览器、Web 服务器、Web 缓存服务器插入。这里提到的只是一小部分。

The entity body is the meat of the message—it contains the requested object itself (represented by data ...).

下面是响应报文的通用格式：

![img](/assets/images/EA05AE9A-A41A-4AE1-A1E3-48D1E6A8AC03.jpg)

## Cookie

我们前面提到 HTTP 是无状态的，然而 Web 站点通常希望能够识别用户，为此，HTTP 使用了 cookie，它允许站点对用户进行跟踪。

Cookie 有四个部分：

1. A cookie header line in the HTTP response message;
2. A cookie header line in the HTTP request message;
3. A cookie file kept on the user’s end system and managed by the user’s browser;
4. A back-end database at the Web site.

![img](/assets/images/AD027E75-A0DC-49C4-ADCF-611BD0BE7459.jpg)

从上面例子我们可以看到，在用户首次访问一个网站时，服务器为它创建一个标识附带在响应报文中，后续的会话会在请求报文中带上这个标识。因此，cookie 可以在无状态的 HTTP 之上建立一个用户会话层。

## Web Caching and The Conditional GET

A **Web cache**—also called a **proxy server**—is a network entity that satisfies HTTP requests on the behalf of an origin Web server.

Web 缓存器有自己的磁盘存储空间，保存最近请求过的对象的副本。可以配置用户的浏览器，使得用户的所有 HTTP 请求首先指向 Web 缓存器。注意 Web cache 既是客户又是服务器。

![img](/assets/images/E14F3F02-2CA7-43D9-94C9-8AF9913719FC.jpg)

Web 缓存器通常由 ISP 购买并安装。例如，一所大学可能在它的校园网安装 Web cache，并且将所有校园网上的用户浏览器配置为指向它。

在因特网上部署 Web cache 有两个原因。首先，Web cache 可以大大减少客户请求的响应时间；其次，Web 缓存器能够大大减少一个机构的接入链路到因特网的通信量，通过减少通信量，该机构就不必急于增加带宽，因此降低了费用。此外，Web 缓存器能从整体上大大减低因特网上的 Web 流量，从而改善了所有应用的性能。

通过使用内容分发网络 (Content Distribution Network, CDN)，Web cache 正在因特网中发挥着越来越重要的作用。CDN 公司在因特网上安装了许多地理上分散的缓存器，使大量流量实现了本地化。

Web cache 可以大大减少对客户请求的响应时间，但也引入了一个新的问题，即存放在 Web cache 中的对象副本可能是陈旧的。HTTP 协议有一种机制，允许 Web cache 证实它的对象是最新的，即 conditional GET。如果请求报文使用 GET 方法、并且请求报文中包含一个 `If-Modified-Since:` 的 header line，那么，这个 HTTP 请求报文就是一个条件 GET 请求报文。

## DNS

一个 IP 地址由 4 个字节组成，例如 `121.7.106.83`，每个字节表示 0-255 的十进制数字。在因特网中，Host name 和 IP 地址都可以用来识别主机。人们在浏览器中习惯输入 host name，而路由器则喜欢定长的、有层次结构的 IP 地址。因此，我们需要有一种能进行主机名到 IP 地址转换的目录服务，这就是域名系统 (Domain Name System, DNS) 的主要任务。

DNS 有两层含义：1\. 一个由分层的 DNS 服务器实现的分布式数据库；2\. 一个使端系统能够查询分布式数据库的应用层协议。DNS 协议运行在 UDP 之上，使用 53 号端口。

DNS 请求为因特网应用带来了额外的时延，幸运的是，大部分 IP 地址通常就缓存在某个“附近的” DNS 服务器中。

除了主机名到 IP 地址的转换之外，DNS 还提供了以下服务：

- 主机别名 (host aliasing)。例如 `relay1.west-coast.enterprise.com` 称为规范主机名 (cannonical hostname)，它有两个别名 `enterprise.com` 和 `www.enterprise.com`。应用程序通过 DNS 服务来获得主机别名对应的规范主机名以及 IP 地址。
- 邮件服务器别名 (mail server aliasing)。
- 负载分配 (load distribution)。繁忙的站点如 `cnn.com` 被分布在多台服务器上，每个都拥有不同的 IP 地址，多个 IP 地址可以映射到同一个规范主机名。DNS 在所有这些服务器之间进行负载分配。

DNS 是一个在因特网上实现分布式数据库的精彩范例。大量的 DNS 服务器以层次方式组织、分布在全世界范围内。大致上，有 3 种类型的 DNS 服务器。

- Root DNS servers. There are over 400 root name servers scattered all over the world. Root name servers provide the IP addresses of the TLD servers.
- Top-level domain (TLD) servers. For each of the top-level domains such as com, org, net, edu, and gov, and all of the country top-level domains such as uk, fr, ca, and jp — there is TLD server (or server cluster). TLD servers provide the IP addresses for authoritative DNS servers.
- Authoritative DNS servers. Every organization with publicly accessible hosts on the Internet must provide publicly accessible DNS records. An organization can choose to implement its own authoritative DNS server to hold these records; alternatively, the organization can pay to have these records stored in an authoritative DNS server of some service provider.

The root, TLD, and authoritative DNS servers all belong to the hierarchy of DNS servers. There is another important type of DNS server called the **local DNS server**. Each ISP—such as a residential ISP or an institutional ISP—has a local DNS server.

When a host connects to an ISP, the ISP provides the host with the IP addresses of one or more of its local DNS servers (typically through **DHCP**). When a host makes a DNS query, the query is sent to the local DNS server, which acts a proxy, forwarding the query into the DNS server hierarchy.

如下图所示，Client 想要访问主机 `gaia.cs.umass.edu`：

1. Client sends a DNS query message to its local DNS server.
2. The local DNS server forwards the query message to a root DNS server.
3. The root DNS server takes note of the `edu` suffix and returns a list of IP addresses for TLD servers responsible for `edu`.
4. The local DNS server then resends the query message to one of these TLD servers.
5. The TLD server takes note of the `umass.edu` suffix and responds with the IP address of the authoritative DNS server for the University of Massachusetts, namely, `dns.umass.edu`.
6. Finally, the local DNS server resends the query message directly to `dns.umass.edu`.
7. Authoritative DNS server responds with the IP address of `gaia.cs.umass.edu`.
8. Local DNS server responds with the IP address of `gaia.cs.umass.edu` to client.

![img-40](/assets/images/e088a3e7-dabb-40f0-8a12-46816d54acf4.jpg)

The example shown in Figure 2.19 makes use of both **recursive queries** and **iterative queries**. The query sent from client to local DNS server is a recursive query, since the query asks `dns.nyu.edu` to obtain the mapping on its behalf. But the subsequent three queries are iterative since all of the replies are directly returned to `dns.nyu.edu`. In practice, this is the pattern that queries typically follow: The query from the requesting host to the local DNS server is recursive, and the remaining queries are iterative.

实际上，为了改善时延、减少因特网上到处传输的 DNS 报文数量，DNS 广泛使用了缓存技术。缓存原理十分简单，在一个请求链中，当某 DNS 服务器接收一个响应后，它能将映射缓存在服务器本地存储中。当新的、对相同主机名的查询到达时，就能直接提供 IP 地址。由于主机名和 IP 地址之间的映射不是永久的，DNS 服务器在一段时间后将丢弃缓存的信息。

DNS 服务器上存储了资源记录 (Resource Record, RR)。RR 提供了主机名到 IP 地址的映射。每个 DNS 响应报文包含一条或多条 RR。

RR 是一个包含了下列字段的四元组：`(Name, Value, Type, TLL)`。TLL 是该记录的生存时间，它决定了 RR 应当从缓存中删除的时间。

- If Type=A, then Name is a hostname and Value is the IP address for the hostname. As an example, (relay1.bar.foo.com, 145.37.93.126, A) is a Type A record.
- If Type=NS, then Name is a domain (such as foo.com) and Value is the hostname of an authoritative DNS server that knows how to obtain the IP addresses for hosts in the domain. As an example, (foo.com, dns.foo.com, NS) is a Type NS record.
- If Type=CNAME, then Value is a canonical hostname for the alias hostname Name. As an example, (foo.com, relay1.bar.foo.com, CNAME) is a CNAME record.
- If Type=MX, then Value is the canonical name of a mail server that has an alias hostname Name.

## P2P

考虑从因特网上下载一个文件。在客户-服务器文件分发中，该服务器必须向每个 peer 发送该文件的一个副本；在 P2P 文件分发中，每个 peer 能够向其他 peers 分发它已经收到的该文件的部分，从而在分发过程中协助该服务器。到 2016 年止，最为流行的 P2P 文件分发协议是 BitTorrent。

用 BitTorrent 的术语来讲，参与一个特定文件分发的所有 peers 的集合被称为一个洪流 (torrent)。在一个洪流中的 peers 彼此下载等长度的文件块 (chunk)，典型的块长度为 256KB。当一个 peer 首次加入一个洪流时，它没有块。随着时间的流逝，它累积了越来越多的块。当它下载块时，也为其他 peers 上载了多个块。一旦某个 peer 获得了整个文件，它也许（自私地）离开洪流，或继续留在该洪流中并继续向其他 peers 上载块。同时，任何 peer 可能在任何时候仅具有块的子集就离开该洪流，并在以后重新加入该洪流中。

每个洪流具有一个基础设施节点，称为追踪器 (tracker)。当一个 peer 加入某洪流时，它向追踪器注册自己，并周期性地通知追踪器它仍在该洪流中。以这种方式，追踪器跟踪参与在洪流中的 peers。一个给定的洪流可能在任何时刻具有数以百计或数以千计的 peers。

当一个新的 peer，Alice 加入该洪流时，追踪器随机地从参与该洪流的 peers 集合中选择一个子集（假设选择了 50 个 peers），并将它们的 IP 地址发送给 Alice。Alice 则试图与这 50 个 peers 创建并行的 TCP 连接。随着时间的流逝，这些 peers 中的某些可能离开，其他 peers（最初 50 个以外的）也可能与 Alice 创建 TCP 连接。因此一个 peer 的 neighboring peers 将随时间而波动。

在任意时刻，每个 peer 可能具有该文件的块的子集，不同的 peers 可能具有不同的子集。Alice 周期性地经 TCP 连接询问每个 neighboring peer 它们所具有的块列表。如果 Alice 具有 L 个不同的邻居，她将获得 L 个块列表。有了这个信息，Alice 将做出两个重要决定。第一，她应当向邻居请求哪些块呢？第二，她应当向哪些向她请求块的邻居发送块呢？

在决定请求哪些块的过程中，BitTorrent 使用一种称为最稀缺优先 (rarest first) 的技术。最稀缺的块，就是那些在她的邻居中副本数量最少的块)，Alice 首先请求那些最稀缺的块。这样，最稀缺的块将得到更为迅速的重新分发，这样做的目的是大致地均衡每个块在洪流中的副本数量。

为了决定她响应哪个请求，BitTorrent 使用了一种聪明的交易算法。其基本想法是，Alice 给予当前向她提供数据的邻居中速率最高的那些以优先权。Alice 对于她的每个邻居都持续地测量接收速率，并确定流入速率最高的 4 个邻居。每过 10 秒，她重新计算该速率并可能修改这 4 个 peers 的集合，我们称这 4 个 peers 被 unchoked。重要的是，每过 30 秒，她也要随机地选择另外一个邻居（不在这 4 个 peers 里）Bob 并向其发送块。因为 Alice 正在向 Bob 发送数据，她可能成为 Bob 前 4 位上载者之一，这样的话 Bob 将开始向 Alice 发送数据。如果 Bob 向 Alice 发送数据的速率足够高，Bob 接下来也能成为 Alice 的前 4 位上载者。这种设计的效果是 peers 能够在洪流中，始终趋向于找到那些以最快速率交换文件块的邻居。对于 Alice，除了这 4 个 peers 和一个每隔一段时间就随机选择的试探性 peer，其它所有 neighboring peers 都被 choked，即它们不会从 Alice 这里接收到任何块。

BitTorrent 还有一些有趣的机制没有在这里讨论。但总体来说，BitTorrent 取得了广泛成功，它的设计使得无数个 peers 在无数个洪流中积极地共享文件。

## Video Streaming

From a networking perspective, perhaps the most salient 显著的 characteristic of video is its high bit rate. For example, a single 2 Mbps video with a duration of 67 minutes will consume 1 gigabyte of storage and traffic. By far, the most important performance measure for streaming video is average end-to-end throughput. In order to provide continuous playout, the network must provide an average throughput to the streaming application that is at least as large as the bit rate of the compressed video. 传输的速率要大于视频的比特率。We can also use compression to create multiple versions of the same video, each at a different quality level.

In **HTTP streaming**, the video is simply stored at an HTTP server as an ordinary file with a specific URL. On the client side, the bytes are collected in a client application buffer. The streaming video application periodically grabs video frames from the client application buffer, decompresses the frames, and displays them on the user’s screen.

Although HTTP streaming has been extensively deployed in practice, it has a major shortcoming: All clients receive the same encoding of the video, despite the large variations in the amount of bandwidth available to a client. This has led to the development of a new type of HTTP-based streaming, often referred to as **Dynamic Adaptive Streaming over HTTP (DASH)**.

In DASH, the video is encoded into several different versions, with each version having a different bit rate. Each video version is stored in the HTTP server, each with a different URL. The HTTP server also has a **manifest file**, which provides a URL for each version along with its bit rate. The client first requests the manifest file and learns about the various versions. The client then selects one chunk at a time by specifying a URL and a byte-range in an HTTP GET request message header for each chunk. While downloading chunks, the client also measures the received bandwidth and runs a rate determination algorithm to select the chunk to request next. Naturally, if the client has a lot of video buffered and if the measured receive bandwidth is high, it will choose a chunk from a high-bitrate version. And naturally if the client has little video buffered and the measured received bandwidth is low, it will choose a chunk from a low-bitrate version. DASH therefore allows the client to freely switch among different quality levels.

## Content Distribution Networks

为了应对向分布于全世界的用户分发巨量视频数据的挑战，视频流公司都会利用内容分发网络 (Content Distribution Network, CDN)。一个 CDN 管理着分布在多个地理位置上的服务器，这些服务器上存储着视频等资源文件的副本，并且总是将每个用户请求定向到最优的 CDN 位置。CDN 可以是专用 CDN (privace CDN)，它由内容提供商私人所有；也可以是第三方 CDN (third-party CDN)，它代表多个内容提供商分发内容。

CDN 的服务器是如何部署的呢？CDNs typically adopt one of two different server placement philosophies:

- Enter Deep. One philosophy, pioneered by Akamai, is to enter deep into the access networks of Internet Service Providers, by deploying server clusters in access ISPs all over the world. Because of this highly distributed design, the task of maintaining and managing the clusters becomes challenging.
- Bring Home. A second design philosophy, taken by Limelight and many other CDN companies, is to bring the ISPs home by building large clusters at a smaller number (for example, tens) of sites. Instead of getting inside the access ISPs, these CDNs typically place their clusters in Internet Exchange Points (IXPs). Typically results in lower maintenance and management overhead, possibly at the expense of higher delay and lower throughput to end users.

一旦 CDN 的集群准备就绪，它就可以跨集群复制内容。CDN 不会将每个视频的副本放置在每个集群中，因为某些视频很少观看或仅在某些国家中流行。而是使用一种简单的拉策略：如果客户向一个未存储该视频的集群请求某视频，则该集群检索该视频（从某中心仓库或者从另一个集群），向客户流式传输视频时的同时、在本地存储一个副本。当某集群存储器变满时，它删除不经常请求的视频。除了拉策略，当然还有其它策略，Netflix CDN 使用 push caching 而不是 pull caching：内容在非高峰时段被推入服务器，而不是在缓存未命中时拉取。

当客户端检索某个资源时，CDN 必须截获该请求，以便能够——1\. 确定此时适合用于该客户的 CDN 服务器集群；2\. 将客户的请求重定向到该集群的某台服务器。大多数 CDN 利用 DNS 来截获和重定向请求。

![img](/assets/images/4d3a46f7-4960-4f27-92c1-49e317ee2c5c.jpg)

## Socket Programming

Processes residing in two different end systems communicate with each other by reading from, and writing to, sockets.

网络应用程序有两类。一类是由协议标准（如一个 RFC）中所定义的操作的实现，客户端和服务端必须遵守该 RFC 的规则；另一类是专用的应用程序，其应用层协议没有公开发布在某 RFC 中或其他地方，不知道这个协议的开发者无法开发出能与之通信的应用程序。

### UDP

When a socket is created, an identifier, called a **port number**, is assigned to it. The sending process attaches to the packet a destination address, which consists of the destination host’s IP address and the destination socket’s port number.

```py
from socket import *
serverName = '127.0.0.1'
serverPort = 12000
clientSocket = socket(AF_INET, SOCK_DGRAM)  # 1
message = input('Input lowercase sentence:')
clientSocket.sendto(message.encode(), (serverName, serverPort)) # 2
modifiedMessage, serverAddress = clientSocket.recvfrom(2048) # buffer size: 2048
print(modifiedMessage.decode())
clientSocket.close()
```

[1] The first parameter indicates the address family; in particular, `AF_INET` indicates that the underlying network is using IPv4. The second parameter indicates that the socket is of type `SOCK_DGRAM`, which means it is a UDP socket (rather than a TCP socket).

[2] Note that we are not specifying the port number of the client socket when we create it; we are instead letting the operating system do this for us.

[3] `encode` convert the message from string type to byte type.

```py
from socket import *
serverPort = 12000
serverSocket = socket(AF_INET, SOCK_DGRAM)
serverSocket.bind(('', serverPort))
print('The server is ready to receive')
while True:
    message, clientAddress = serverSocket.recvfrom(2048)
    modifiedMessage = message.decode().upper()
    serverSocket.sendto(modifiedMessage.encode(), clientAddress)
```

`bind` binds (that is, assigns) the port number 12000 to the server’s socket. In this manner, when anyone sends a packet to port 12000 at the server, that packet will be directed to this socket.

# TCP 三次握手、四次挥手

三次握手：

- 客户端：你好，能听到我说话吗？
- 服务端：你好，我能听到，你能听到我说话吗？
- 客户端：你好，我能听到。开始说话……

四次挥手：

- 客户端：老师，该下课了。
- 服务端：好的，等我说完最后这点就下课。
- 服务端：我说完了，下课。
- 客户端：谢谢老师，老师再见。

# TLS 握手

一、客户端向服务器发出加密通信的请求 (ClientHello)。请求信息包括一个客户端生成的随机数，稍后用于生成"对话密钥"。

二、服务器收到客户端请求后，向客户端发出回应 (SeverHello)。回应包含以下内容：服务器证书；一个服务器生成的随机数，稍后用于生成"对话密钥"。

除了上面这些信息，如果服务器需要确认客户端的身份，就会再包含一项请求，要求客户端提供"客户端证书"。比如，金融机构往往只允许认证客户连入自己的网络，就会向正式客户提供 USB 密钥，里面就包含了一张客户端证书。

三、客户端收到服务器回应以后，首先验证服务器证书，如果证书没有问题，客户端就会从证书中取出服务器的公钥，并向服务端发送以下信息：

- 用服务器公钥加密的 PMS。
- 编码改变通知，表示随后的信息都将用双方商定的加密方法和密钥发送。
- 客户端握手结束通知，表示客户端的握手阶段已经结束。这一项同时也是前面发送的所有内容的 hash 值，供服务端校验。

四、服务器收到 PMS，通信双方拿着 PMS (pre-master key) 和 client nonce、server nonce 三个随机数一起，用事先商定的加密方法，各自生成本次会话所用的同一把"会话密钥"。最后，向客户端发送以下信息：

- 编码改变通知，表示随后的信息都将用双方商定的加密方法和密钥发送。
- 服务器握手结束通知，表示服务器的握手阶段已经结束。这一项同时也是前面发送的所有内容的 hash 值，供客户端校验。

[参考](https://www.ruanyifeng.com/blog/2014/02/ssl_tls.html)

# HTTP/2

队头阻塞 (head-of-line blocking) 发生在一个 TCP 分节丢失，导致其后续分节不按序到达接收端的时候。该后续分节将被接收端一直保持直到丢失的第一个分节被发送端重传并到达接收端为止。该后续分节的延迟递送确保了接收者能够按照发送端的发送顺序接收数据。这种为了达到完全有序而引入的延迟机制非常有用，但也有不利之处。

HTTP/1.1 队头阻塞，HTTP 管道化要求服务端必须按照请求发送的顺序返回响应，那如果一个响应返回延迟了，那么其后续的响应都会被延迟，直到队头的响应送达。

HTTP/1.1 请求是有顺序的，客户端请求资源一、服务端返回资源一；客户端请求资源二、服务端返回资源二……谷歌浏览器最多可以并行 6 个 TCP 连接，可以看作 6 个串行队列，队列之间没有关系，但是队内存在队头阻塞。

一、多路复用的单一长连接。在 HTTP/2 中，客户端向某个域名的服务器请求的过程中，只会创建一条 TCP 连接，即使这页面可能包含上百个资源，避免了创建多个 TCP 连接带来的网络开销。HTTP 2 采用了二进制分帧 (binary framing layer)，多个帧之间可以乱序发送，根据帧首部的流标识可以重新组装，服务端返回资源的顺序可以交错。

二、头部压缩：对消息 Header 采用 HPACK 进行压缩传输。网络传输数据量便少了。

三、服务端推送：服务端可以主动把 JS 和 CSS 文件推送给客户端，而不需要客户端解析 HTML 再发送这些请求。这样，当客户端需要的时候，它已经在客户端了。

# HTTPDNS

> <https://cn.aliyun.com/product/httpdns>

Local DNS 协议运行在 UDP 协议之上，使用端口号 53，向本地运营商询问域名对应的 IP 地址。

HTTPDNS 使用 HTTP 协议进行域名解析，代替现有基于 UDP 的 DNS 协议，域名解析请求直接发送到阿里云的 HTTPDNS 服务器，从而绕过运营商的 Local DNS。

HTTPDNS 的好处：

- 绕过运营商 Local DNS，避免域名劫持（有时候我们访问一些未投入使用的域名，会被运营商插入广告）。
- 精准调度：基于访问的来源 IP，获得最精准的解析结果，让客户端就近接入业务节点。
- 0ms 解析延迟：通过热点域名预解析、缓存 DNS 解析结果、解析结果懒更新策略等方式实现 0 解析延迟。
- 避免 Local DNS 不遵循权威 TTL，解析结果长时间无法更新的问题。
- 有效降低无线场景下解析失败的比率。

# 弱网优化

弱网优化需要解决的核心问题有两点：

1. 移动网络环境如此复杂，我们如何确定当下就是弱网环境。
2. 如何提升弱网下的成功率，降低弱网下的时延，进而提升用户的网络体验。

弱网定义的指标：RTT、信号强度、吞吐量、带宽时延乘积。

对于不同的产品，影响网络质量的指标是一样的，但对于每个指标的阈值是不一样的，因为这包含着业务场景，比如抖音是视频类网络传输，微信是长连接数据传输，淘宝是文本图片类数据传输。

被动检测：连接成功时看 RTT、吞吐量，超过阈值时判定弱网；连接失败次数大于 2 次。

主动检测：dns 查询和 ping。
