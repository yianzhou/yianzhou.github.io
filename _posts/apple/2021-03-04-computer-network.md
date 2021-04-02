---
title: "UserNotification"
categories: [Apple]
---

<!-- prettier-ignore -->
* Do not remove this line (it will not be displayed)
{:toc}

> [Welcome to the student resources for the Computer Networking: A Top-Down Approach Sixth Edition Companion Website.](https://wps.pearsoned.com/ecs_kurose_compnetw_6/216/55463/14198700.cw/index.html)
>
> [INTERACTIVE END-OF-CHAPTER EXERCISES, Supplement to Computer Networking: A Top Down Approach 8th Edition](https://gaia.cs.umass.edu/kurose_ross/interactive/)
>
> [Interactive Animations](https://wps.pearsoned.com/ecs_kurose_compnetw_6/216/55463/14198702.cw/index.html)

# Computer Network and Internet

## Network Edge

因特网是世界范围的计算机网络。

传统的桌面 PC、Linux 工作站、服务器，以及新兴的手机、家用电器、可穿戴设备等正在与因特网相连。这些设备被称为主机 (host)，主机又可分为两类：客户端和服务器；因主机运行在网络边缘 (network edge)，故又称为端系统 (end system)。

接入网 (network access) 是指将端系统物理连接到 edge router 的网络。

家庭入网过去用的是 DSL (Digital Subscriber Line)，DSL modem 得到数字信息后将其转换为高频信号，通过电话线（即双绞铜线）与电话公司的 DSLAM 交换数据，并在那里被转换回数字形式。电话线通过“频分复用技术”形成了双向电话信道（0 - 4kHz）、中速上行信道（4kHz - 50kHz）、高速下行信道（50kHz - 1MHz）。使得电话呼叫和因特网连接能同时进行。

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

| Layer             | Name               | Example                                                                                                                                               |
| ----------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Application Layer | Message（报文）    | The Web: HTTP;<br/> File transfer: FTP;<br/> Remote login: Telnet, SSH;<br/> Email: SMTP;<br/> BitTorrent file sharing: BitTorrent protocol;<br/> DNS |
| Transport Layer   | Segment（报文段）  | TCP, UDP                                                                                                                                              |
| Network Layer     | Datagram（数据报） | IP, Routing protocols                                                                                                                                 |
| Link Layer        | Frame（帧）        | Ethernet, Wi-Fi, DOCSIS, PPP                                                                                                                          |
| Physical Layer    |                    |                                                                                                                                                       |

> We note that many users now prefer to use the SSH protocol rather than Telnet, since data sent in a Telnet connection (including passwords!) are not encrypted, making Telnet vulnerable to eavesdropping attacks.

传输层负责进程到进程的传送；网络层负责主机到主机的传送；链路层负责将帧从一个节点移动到邻近的下一个节点；物理层负责将帧中的每一个比特从一个节点移动到下一个节点。

![img](/assets/images/8399A4F3-9540-4485-A26D-2747A1DC4BAF.jpg)

上图显示了这样一条路径：数据从源的协议栈一路向下、经过中间的链路层交换机和路由器的协议栈上上下下、最后向上到达目的地的协议栈。注意，路由器实现了第一层到第三层协议，而链路层交换机只实现了前二层。这意味着路由器能够实现 IP 协议，但链路层交换机不能，因此它不能识别 IP 地址，但它能够识别第二层地址如 Ethernet 地址。

> Ethernet is a way of connecting computers together in a local area network (LAN).

如上图所示，packet 到达每一层，都会被附加上该层的首部字段（用字母 H 表示），首部字段会在之后被相应的层使用。现实中的封装会比这张图所描述的更复杂一些，例如在发送端一个大的 message 可能被划分为多个 segment，每个 segment 又可能被划分为多个 datagram，并在接收端进行重构。

## Network Under Attack

Much of the **malware** out there today is **self-replicating**: once it infects one host, from that host it seeks entry into other hosts over the Internet, and from the newly infected hosts, it seeks entry into yet more hosts. Malware can spread in the form of a **virus** or a **worm**. Viruses are malware that require some form of user interaction to infect the user’s device. Worms are malware that can enter a device without any explicit user interaction.

Another broad class of security threats are known as **denial-of-service (DoS)** attacks. As the name suggests, a DoS attack renders a network, host, or other piece of infrastructure unusable by legitimate users.

A passive receiver that records a copy of every packet that flies by is called a **packet sniffer**.

It is surprisingly easy to create a packet with an arbitrary source address, packet content, and destination address and then transmit this hand-crafted packet into the Internet, which will dutifully forward the packet to its destination. Imagine the unsuspecting receiver (say an Internet router) who receives such a packet, takes the (false) source address as being truthful, and then performs some command embedded in the packet’s contents (say modifies its forwarding table). The ability to inject packets into the Internet with a false source address is known as **IP spoofing**, and is but one of many ways in which one user can masquerade as another user.

# Application Layer

在同一个端系统上的进程，它们使用 IPC 相互通信，规则由操作系统确定；在两个不同端系统上的进程，通过跨越计算机网络交换 message 而相互通信。

不管是 client-server architecture 还是 P2P architecture，对每对通信进程，我们把主动发起通信方称为客户端，被动等待联系方称为服务器。在 P2P architecture 中，一个进程既能够是客户端又能够是服务器。

进程通过一个称为 socket 的软件接口发送和接收 message。

在因特网中，目的地主机由 IP 地址标识；接收进程由端口号标识。

开发一个应用时，必须选择一种运输层协议，如何选择呢？大体从可靠数据传输、吞吐量、时效性和安全性几个方面考虑。如电子邮件、Web 文档这类应用，必须保证可靠数据传输（不能丢失数据）、对吞吐量无要求、对响应时间不敏感；流媒体、视频通话、游戏等应用，则可以容忍丢包、但对带宽有要求、对响应时间敏感。

TCP 为应用层提供了面向连接的、可靠数据传输服务，还具有拥塞控制机制；UDP 是一种“仅提供最小服务”的传输层协议，它不提供可靠数据传输服务，不保证 message 能到达、能有序到达接收进程。

TCP 和 UDP 本身都没有提供安全性相关的服务，但 TCP **在应用层**可以用 SSL 来提供安全服务。除了可靠数据传输和安全性，目前的因特网运输协议并不能提供吞吐量和时效性的保证。

## The Web and HTTP

Web 的应用层协议是 HTTP (HyperText Transfer Protocol)。Web page 是由对象 (object) 组成的，一个对象是一个可通过 URL 寻址的文件（例如 HTML、JPEG、JavaScript 或视频片段）。多数 Web page 包含一个 HTML 文件和多个引用对象。

HTTP 服务器不保存关于客户的任何信息，我们说 HTTP 是一个无状态协议 (stateless protocol)。

HTTP 在默认方式下使用持续连接 (persistent connection)，意味着客户端和服务器在一个长的时间范围内通信时，客户端一系列的请求及服务端的响应，都经同一个 TCP 连接发送。

非持续连接有这样一些缺点：第一，必须为每一个对象的请求建立和维护一个全新的 TCP 连接。这意味着，在客户端和服务器中都要分配 TCP 的缓冲区、保持 TCP 的变量；第二，每请求一个对象都要经历 2 RTTs，即 1 RTT 用于创建 TCP 连接，1 RTT 用于请求和接收对象。

With HTTP/1.1 persistent connections, the server leaves the TCP connection open after sending a response. Subsequent requests and responses between the same client and server can be sent over the same connection. In particular, an entire Web page (in the example above, the base HTML file and the 10 images), moreover, multiple Web pages residing on the same server can be sent from the server to the same client over a single persistent TCP connection. These requests for objects can be made back-to-back, without waiting for replies to pending requests (called **pipelining**). Typically, the HTTP server closes a connection when it isn’t used for a certain time (a configurable timeout interval). When the server receives the back-to-back requests, it sends the objects back-to-back. The default mode of HTTP uses persistent connections with pipelining.

HTTP/2 在 HTTP/1.1 的基础上，允许在相同连接中多个请求和响应交错，并增加了按优先级排序请求和响应的机制。

Suppose within your Web browser you click on a link to obtain a Web page. Further suppose that the Web page associated with the link contains exactly one object, consisting of a small amount of HTML text. Assuming zero transmission time of the object, how much time elapses from when the client clicks on the link until the client receives the object? -- 1RTT elapses to set up the TCP connection and another 1RTT elapses to request and receive the small object.

Suppose the HTML file references 8 very small objects on the same server,

- Non-persistent HTTP with no parallel TCP connections: 2RTT + 8\*2RTT
- Non-persistent HTTP with the browser configured for 6 parallel connections: 2RTT + 2\*2RTT
- Persistent connection with pipelining: 2RTT + RTT
- Persistent connection without pipelining, without parallel connections: 2RTT + 8\*RTT

## HTTP Message Format

HTTP Message 有两种，请求报文和响应报文。

### Request Message

下面看一个典型的请求报文：

```s
GET /cs453/index.html HTTP/1.1
Host: gaia.cs.umass.edu
User-agent: Mozilla/5.0
Accept-Language: en-us,en;q=0.5
Accept-Encoding: zip,deflate
Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7
Keep-Alive: 300
Connection: keep-alive
```

The first line of an HTTP request message is called the **request line**. The request line has three fields: the method field, the URL field, and the HTTP version field.

The subsequent lines are called the **header lines**.

The header line `Host: gaia.cs.umass.edu` specifies the host on which the object resides. You might think that this header line is unnecessary, as there is already a TCP connection in place to the host. But, as we’ll see in Section 2.2.5, the information provided by the host header line is required by Web proxy caches.

The `Accept-language:` header is just one of many content negotiation headers available in HTTP.

The browser is requesting a persistent connection, as indicated by the `Connection: keep-alive`.

下面是请求报文的通用格式：

![img](/assets/images/636E8239-B438-48B9-82C4-4B7219C4B65C.jpg)

After the header lines (and the additional carriage return 回车 and line feed 换行) there is an “entity body.” The entity body is empty with the GET method, but is used with the POST method. If the value of the method field is POST, then the entity body contains what the user entered into the form fields.

A request generated with a form does not necessarily use the POST method. Instead, HTML forms often use the GET method and include the inputted data (in the form fields) in the requested URL.

### Response Message

下面看一个典型的响应报文：

```s
HTTP/1.1 200 OK
Date: Tue, 18 Aug 2015 15:44:04 GMT
Server: Apache/2.2.3 (CentOS)
Last-Modified: Tue, 18 Aug 2015 15:11:03 GMT
Content-Length: 6821
ETag: "526c3-f22-a88a4c80"
Accept-Ranges: bytes
Content-Length: 3874
Keep-Alive: timeout=max=100
Connection: Keep-Alive
Content-Type: text/html; charset=ISO-8859-1
(data data data data data ...)
```

It has three sections: an initial **status line**, **header lines**, and then the **entity body**.

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
- The `Last-Modified:` header line indicates the time and date when the object was created or last modified. It is critical for object caching, both in the local client and in proxy servers.
- The `Content-Length:` header line indicates the number of bytes in the object being sent.
- The `Content-Type:` header line indicates that the object in the entity body is HTML text. (The object type is officially indicated by the `Content-Type:` header and not by the file extension.)
- Either the client or the server can indicate to the other that it is going to close the persistent connection. It does so by including the header line `Connection: close` of the http request/reply.

HTTP 规范定义了许多的 header lines，header lines 可以被浏览器、服务器、代理服务器插入。这里提到的只是一小部分。

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

## HTTP/2

HTTP/2 [RFC 7540], standardized in 2015, was the first new version of HTTP since HTTP/1.1, which was standardized in 1997.

The primary goals for HTTP/2 are to reduce perceived latency by enabling request and response **multiplexing** over a single TCP connection, provide request prioritization and server push, and provide efficient compression of HTTP header fields.

### HOL Blocking and HTTP/2 Framing

Developers of Web browsers discovered that sending all the objects in a Web page over a single TCP connection has a **Head of Line (HOL) blocking** problem. To understand HOL blocking, consider a Web page that includes an HTML base page, a large video clip near the top of Web page, and many small objects below the video. Using a single TCP connection, the video clip will take a long time to pass through the link, while the small objects are delayed as they wait behind the video clip; that is, the video clip at the head of the line blocks the small objects behind it.

HTTP/1.1 browsers typically work around this problem by opening multiple parallel TCP connections, thereby having objects in the same web page sent in parallel to the browser. This way, the small objects can arrive at and be rendered in the browser much faster, thereby reducing user-perceived delay.

TCP congestion control also provides browsers an unintended incentive 动机 to use multiple parallel TCP connections rather than a single persistent connection. Very roughly speaking, TCP congestion control aims to give each TCP connection sharing a bottleneck link an equal share of the available bandwidth of that link. By opening multiple parallel TCP connections to transport a single Web page, the browser can “cheat” and grab a larger portion of the link bandwidth. Many HTTP/1.1 browsers open up to six parallel TCP connections not only to circumvent HOL blocking but also to obtain more bandwidth.

One of the primary goals of HTTP/2 is to get rid of (or at least reduce the number of) parallel TCP connections for transporting a single Web page. This not only reduces the number of sockets that need to be open and maintained at servers, but also allows TCP congestion control to operate as intended. But with only one TCP connection to transport a Web page, HTTP/2 requires carefully designed mechanisms to avoid HOL blocking.

The HTTP/2 solution for HOL blocking is to break each message into small **frames**, and interleave 交错 the request and response messages on the same TCP connection.

To understand this, consider again the example of a Web page consisting of one large video clip and, say, 8 smaller objects. Thus the server will receive 9 concurrent requests from any browser wanting to see this Web page. For each of these requests, the server needs to send 9 competing HTTP response messages to the browser. Suppose all frames are of fixed length, the video clip consists of 1000 frames, and each of the smaller objects consists of two frames. If interleaving were not used, the smaller objects would be sent only after sending 1016 frames. With frame interleaving, after sending one frame from the video clip, the first frames of each of the small objects are sent. Then after sending the second frame of the video clip, the last frames of each of the small objects are sent. Thus, all of the smaller objects are sent after sending a total of 18 frames. Thus the HTTP/2 framing mechanism can significantly decrease user-perceived delay.

The ability to break down an HTTP message into independent frames, interleave them, and then reassemble them on the other end is the single most important enhancement of HTTP/2. The framing is done by the framing sub-layer of the HTTP/2 protocol. When a server wants to send an HTTP response, the response is processed by the framing sub-layer, where it is broken down into frames. The header field of the response becomes one frame, and the body of the message is broken down into one for more additional frames. The frames of the response are then interleaved by the framing sub-layer in the server with the frames of other responses and sent over the single persistent TCP connection. As the frames arrive at the client, they are first reassembled into the original response messages at the framing sub-layer and then processed by the browser as usual. Similarly, a client’s HTTP requests are broken into frames and interleaved.

In addition to breaking down each HTTP message into independent frames, the framing sublayer also binary encodes the frames. Binary protocols are more efficient to parse, lead to slightly smaller frames, and are less error-prone.

> [How does HTTP/2 solve the Head of Line blocking (HOL) issue](https://community.akamai.com/customers/s/article/How-does-HTTP-2-solve-the-Head-of-Line-blocking-HOL-issue?language=en_US)

HTTP/1.1 introduced a feature called "Pipelining" which allowed a client sending several HTTP requests back-to-back over the same TCP connection. However HTTP/1.1 still required the responses to arrive in order so it didn't really solved the HOL issue and as of today it is not widely adopted. **In fact, it’s disabled on most popular desktop web browsers**.

HTTP/2 solves the HOL issue by means of multiplexing requests over the same TCP connection, so a client can make multiple requests to a server without having to wait for the previous ones to complete as the responses can arrive in any order.

HTTP/2 does however still suffer from another type of HOL, as it runs over a TCP connection; and due to TCP's congestion control, one lost packet in a TCP stream makes all streams wait until that package is re-transmitted and received. This HOL is being addressed with the QUIC protocol.

![img](/assets/images/2dcd5341-c392-49b1-b2ee-3eb7e357af2f.png)

### Header compression (HPACK)

HPACK, a compression format for efficiently representing HTTP header fields, to be used in HTTP/2.

HPACK header compression is based on two tables, a static table and a dynamic table. The static table contains the most used HTTP headers and is unchangeable. The headers, which are not included in the static table, can be added to the dynamic table. The headers from the tables can be referenced by index.

![img](/assets/images/b36ec106-6902-449e-a5af-962988445beb.png)

In this example, we need three bytes for the first three headers, plus an additional byte, which tells that we want to add the authority header to the dynamic table and the value of the authority with its length.
And this is what is going to be sent to the server plus additional overhead for the header frame.

Now with the second request,（当我们再次请求时）HTTP/1.1 would send the same headers over and over again (textual protocol overhead). But you see that, in HTTP/2 case, the authority header goes in the dynamic table, we can reference all the headers using the static and the dynamic table. We are using only one byte for each header.

![img](/assets/images/e1531839-a9e8-43b6-aeeb-6743e1f210ed.png)

It is a huge savings of the bandwidth and it's remarkable how few bytes are needed to encode a request or response header in HTTP/2.

### Response Message Prioritization

Message prioritization allows developers to customize the relative priority of requests to better optimize application performance. When a client sends concurrent requests to a server, it can prioritize the responses it is requesting by assigning a weight between 1 and 256 to each message. The higher number indicates higher priority. In addition to this, the client also states each message’s dependency on other messages by specifying the ID of the message on which it depends.

### Server Pushing

Another feature of HTTP/2 is the ability for a server to send multiple responses for a single client request. That is, in addition to the response to the original request, the server can push additional objects to the client, without the client having to request each one. This is possible since the HTML base page indicates the objects that will be needed to fully render the Web page. So instead of waiting for the HTTP requests for these objects, the server can analyze the HTML page, identify the objects that are needed, and send them to the client before receiving explicit requests for these objects. Server push eliminates the extra latency due to waiting for the requests.

## HTTP/3

Both HTTP/1.1 and HTTP/2 use TCP as their transport.

QUIC, is a new “transport” protocol that is implemented in the application layer over the bare-bones UDP protocol. QUIC has several features that are desirable for HTTP, such as message multiplexing (interleaving), per-stream flow control, and low-latency connection establishment.HTTP/3 is yet a new HTTP protocol that is designed to operate over QUIC. Many of the HTTP/2 features (such as message interleaving) are subsumed by QUIC, allowing for a simpler, streamlined design for HTTP/3.

QUIC is implemented over UDP where each stream is independent so that a lost packet only halts the particular stream to which the lost packet belongs, while the other streams can go on.

## Email

Suppose Alice, with a Web-based e-mail account (such as Hotmail or Gmail), sends a message to Bob. The message is first sent from Alice’s browser to her mail server over HTTP. Alice’s mail server then sends the message to Bob’s mail server over **SMTP**. Bob then transfers the message from his mail server to his host over **POP3**.

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

查看当前 DNS：`nslookup domain`

查询域名对应的 IP：`nslookup www.baidu.com`

查询 A 记录：`nslookup -query=A www.baidu.com`

查询 CNAME 记录：`nslookup -query=CNAME www.baidu.com`

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

### TCP

Unlike UDP, TCP is a connection-oriented protocol. This means that before the client and server can start to send data to each other, they first need to handshake and establish a TCP connection. After that, they just drop the data into the TCP connection via sockets. This is different from UDP, for which the server must attach a destination address to the packet before dropping it into the socket.

> What is meant by a handshaking protocol? A protocol uses handshaking if the two communicating entities first exchange control packets before sending data to each other. SMTP uses handshaking at the application layer whereas HTTP does not.

With the server process running, the client process can initiate a TCP connection to the server. This is done in the client program by creating a TCP socket. When the client creates its TCP socket, it specifies the address of the **welcoming socket** in the server, namely, the IP address of the server host and the port number of the socket.

During the three-way handshake, when the server “hears” the knocking, it creates a new connection socket that is dedicated to that particular client.

![img](/assets/images/3b306793-09e2-4022-a2af-b960959232fc.jpg)

```py
from socket import *
serverName = '127.0.0.1'
serverPort = 12000
clientSocket = socket(AF_INET, SOCK_STREAM)
clientSocket.connect((serverName, serverPort)) # establish TCP connection
sentence = input('Input lowercase sentence:')
clientSocket.send(sentence.encode()) # 1
modifiedSetence = clientSocket.recv(1024)
print('From Server:', modifiedSetence.decode())
clientSocket.close()
```

[1] This line sends the sentence through the client’s socket and into the TCP connection. Note that the program does not explicitly create a packet and attach the destination address to the packet, as was the case with UDP sockets.

```py
from socket import *
serverPort = 12000
serverSocket = socket(AF_INET, SOCK_STREAM)
serverSocket.bind(('', serverPort))
serverSocket.listen(1) # the maximum number of queued connections (at least 1)
print('The server is ready to receive')
while True:
    connectionSocket, addr = serverSocket.accept()
    sentence = connectionSocket.recv(1024).decode()
    capitalizedSentence = setence.upper()
    connectionSocket.send(capitalizedSentence.encode())
    connectionSocket.close()
serverSocket.close()
```

When a client knocks on this door, the program invokes the `accept()` method for `serverSocket`, which creates a new socket in the server, called `connectionSocket`, dedicated to this particular client.

With the UDP server, there is no welcoming socket, and all data from different clients enters the server through one single socket. With the TCP server, there is a welcoming socket, thus, to support n simultaneous connections, the server would need n+1 sockets.

### Exercise: Proxy Server

Write a simple TCP program for a server that accepts lines of input from a client and prints the lines onto the server’s standard output.

```py
from socket import *
serverPort = 12000
serverSocket = socket(AF_INET, SOCK_STREAM)
serverSocket.bind(('', serverPort))
serverSocket.listen(1)
while True:
    connectionSocket, addr = serverSocket.accept()
    sentence = connectionSocket.recv(1024).decode()
    print(sentence)
    connectionSocket.send("Hello world!".encode())
    connectionSocket.close()
serverSocket.close()
```

On the Web browser, set the proxy server to your running server program. Your browser should now send its GET request messages to your server, and your server should display the messages on its standard output.

```py
CONNECT www.baidu.com:443 HTTP/1.1
Host: www.baidu.com:443
Proxy-Connection: keep-alive
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36
......
```

# Transport Layer

A network-layer protocol provides logical communication between hosts. A transport-layer protocol provides for logical communication between application processes running on different hosts.

Transport-layer protocols are implemented in the end systems but not in network routers. On the sending side, the transport layer converts the application-layer messages into segments. This is done by (possibly) breaking the application messages into smaller chunks and adding a transport-layer header to each chunk to create the transport-layer segment. The transport layer then passes the segment to the network layer at the sending end system, where the segment is encapsulated within a network-layer packet (a datagram) and sent to the destination. It’s important to note that network routers act only on the network-layer fields of the datagram; that is, they do not examine the fields of the transport-layer segment encapsulated with the datagram. On the receiving side, the network layer extracts the transport-layer segment from the datagram and passes the segment up to the transport layer. The transport layer then processes the received segment, making the data in the segment available to the receiving application.

Before proceeding with our introduction of UDP and TCP, it will be useful to say a few words about the Internet’s network layer. IP, for Internet Protocol, is a best-effort delivery service. This means that IP makes its “best effort” to deliver segments between communicating hosts, but it makes no guarantees.

Extending host-to-host delivery to process-to-process delivery is called **transport-layer multiplexing and demultiplexing**.（多路复用、多路分解）UDP and TCP also provide integrity checking by including error-detection fields in their segments’ headers. These two minimal transport-layer services are the only two that UDP provides!

TCP, on the other hand, offers several additional services to applications.

- First and foremost, it provides **reliable data transfer**. Using flow control, sequence numbers, acknowledgments, and timers, TCP ensures that data is delivered from sending process to receiving process, correctly and in order.
- TCP also provides **congestion control**. Congestion control is not so much a service provided to the invoking application as it is a service for the Internet as a whole.

## Multiplexing and Demultiplexing

This job of delivering the data in a transport-layer segment to the correct socket is called demultiplexing. The job of gathering data chunks at the source host from different sockets, encapsulating each data chunk with header information (that will later be used in demultiplexing) to create segments, and passing the segments to the network layer is called multiplexing.

There are **source port number field** and the **destination port number field** in a transport-layer segment. Each port number is a 16-bit number, ranging from 0 to 65535. The port numbers ranging from 0 to 1023 are called well-known port numbers and are restricted, which means reserved for use by well-known application protocols such as HTTP.

Each socket in the host could be assigned a port number, and when a segment arrives at the host, the transport layer examines the destination port number in the segment and directs the segment to the corresponding socket. The segment’s data then passes through the socket into the attached process. As we’ll see, this is basically how UDP does it.

It is important to note that a UDP socket is fully identified by a two-tuple consisting of a destination IP address and a destination port number. As a consequence, if two UDP segments have different source IP addresses and/or source port numbers, but have the same destination IP address and destination port number, then the two segments will be directed to the same destination process via the same destination socket. In UDP, the source port number serves as part of a “return address”.

TCP socket is identified by a four-tuple: (source IP address, source port number, destination IP address, destination port number). In particular, and in contrast with UDP, two arriving TCP segments with different source IP addresses or source port numbers will (with the exception of a TCP segment carrying the original connection-establishment request) be directed to two different sockets.

Consider a host running a Web server, such as an Apache Web server, on port 80. In particular, both the initial connection-establishment segments and the segments carrying HTTP request messages will have destination port 80. Today’s high-performing Web servers often use only one process, and create a new thread with a new connection socket for each new client connection. For such a server, at any given time there may be many connection sockets (with different identifiers) attached to the same process. If the client and server are using persistent HTTP, then throughout the duration of the persistent connection the client and server exchange HTTP messages via the same server socket.

## UDP

Note that with UDP there is no handshaking between sending and receiving transport-layer entities before sending a segment. For this reason, UDP is said to be **connectionless**.

DNS is an example of an application-layer protocol that typically uses UDP. The DNS application at the querying host then waits for a reply to its query. If it doesn’t receive a reply (possibly because the underlying network lost the query or the reply), it might try resending the query, try sending the query to another name server, or inform the invoking application that it can’t get a reply.

QUIC protocol implements reliability in an application-layer protocol on top of UDP.

The UDP header has only four fields, each consisting of two bytes, totally 8 bytes. The length field specifies the number of bytes in the UDP segment (header plus data). The checksum is used by the receiving host to check whether errors have been introduced into the segment. In truth, the checksum is also calculated over a few of the fields in the IP header in addition to the UDP segment.

![img](/assets/images/3e9abcd9-448d-4b5e-a9c2-f4cffdae7808.jpg)

Although UDP provides error checking, it does not do anything to recover from an error. Some implementations of UDP simply discard the damaged segment; others pass the damaged segment to the application with a warning.

## TCP

### TCP Connection

TCP is said to be connection-oriented because before one application process can begin to send data to another, the two processes must first “handshake” with each other. Both sides of the connection will initialize many TCP state variables.

Recall that because the TCP protocol runs only in the end systems and not in the intermediate network elements (routers and link-layer switches), the intermediate network elements do not maintain TCP connection state.

A TCP connection provides a **full-duplex service**: The application-layer data can flow from Process A to Process B **at the same time** as application-layer data flows from Process B to Process A.

Suppose a process running in one host wants to initiate a connection with another process in another host. Recall that the process that is initiating the connection is called the client process, while the other process is called the server process. For now it suffices to know that the client first sends a special TCP segment; the server responds with a second special TCP segment; and finally the client responds again with a third special segment. The first two segments carry no payload, that is, no application-layer data; the third of these segments may carry a payload. Because three segments are sent between the two hosts, this connection-establishment procedure is often referred to as a **three-way handshake**.

The maximum amount of data that can be grabbed and placed in a segment is limited by the **maximum segment size (MSS)**. The MSS is typically set by first determining the length of the largest link-layer frame that can be sent by the local sending host (the so-called **maximum transmission unit, MTU**), and then setting the MSS to ensure that a TCP segment (when encapsulated in an IP datagram) plus the TCP/IP header length (typically 40 bytes) will fit into a single link-layer frame. Both Ethernet and PPP link-layer protocols have an MTU of 1,500 bytes. Thus, a typical value of MSS is **1460 bytes**. Note that the MSS is the maximum amount of application-layer data in the segment, not the maximum size of the TCP segment including headers.

TCP pairs each chunk of client data with a TCP header, thereby forming TCP segments. The segments are passed down to the network layer, where they are separately encapsulated within network-layer IP datagrams. **Each side of the connection has its own send buffer and its own receive buffer**.

![img](/assets/images/3483e571-f865-4200-8eb3-2bf951add260.jpg)

### TCP Segment

The TCP segment consists of header fields and a data field. TCP header is typically 20 bytes. The data field contains a chunk of application data.

As with UDP, the header includes source and destination port numbers, which are used for multiplexing/ demultiplexing data from/to upper-layer applications. Also, as with UDP, the header includes a checksum field. A TCP segment header also contains the following fields:

- The 32-bit sequence number field and the 32-bit acknowledgment number field are used by the TCP sender and receiver in implementing a reliable data transfer service.
- The 16-bit receive window field is used for flow control.
- The 4-bit header length field specifies the length of the TCP header in 32-bit words（以 32 比特的字为单位）. The TCP header can be of variable length due to the TCP options field. (Typically, the options field is empty, so that the length of the typical TCP header is 20 bytes.)
- The flag field contains 6 bits. The **ACK bit** is used to indicate that the segment contains an acknowledgment for a segment that has been successfully received. The **RST**, **SYN**, and **FIN** bits are used for connection setup and teardown. The CWR and ECE bits are used in explicit congestion notification.

![img-60](/assets/images/e1517d86-1953-4dc1-8bcc-6aa30160c5b5.jpg)

TCP views data as an unstructured, but ordered, stream of bytes. The sequence number for a segment is therefore the byte-stream number of the first byte in the segment.

Suppose that a process in Host A wants to send a stream of data to a process in Host B over a TCP connection. The TCP in Host A will implicitly number each byte in the data stream. Suppose that the data stream consists of a file consisting of 500,000 bytes, that the MSS is 1,000 bytes, and that the first byte of the data stream is numbered 0. As shown in Figure 3.30, TCP constructs 500 segments out of the data stream. The first segment gets assigned sequence number 0, the second segment gets assigned sequence number 1,000, the third segment gets assigned sequence number 2,000, and so on. Each sequence number is inserted in the sequence number field in the header of the appropriate TCP segment.

![img-60](/assets/images/2fa1b7f7-7e91-4476-b7f7-47f20997d923.png)

Recall that TCP is full-duplex, the acknowledgment number that Host A puts in its segment is the sequence number of the next byte Host A is expecting from Host B.

Suppose that Host A has received one segment from Host B containing bytes 0 through 535 and another segment containing bytes 900 through 1,000. For some reason Host A has not yet received bytes 536 through 899. In this example, Host A is still waiting for byte 536 (and beyond) in order to re-create B’s data stream. Thus, A’s next segment to B will contain 536 in the acknowledgment number field. Because TCP only acknowledges bytes up to the first missing byte in the stream, TCP is said to provide **cumulative acknowledgments** 累积确认. The receiver keeps the out-of-order bytes and waits for the missing bytes to fill in the gaps.

在图 3-30 中，我们假设初始序号为 0。实际上，TCP 连接的双方随机地选择初始序号。这样做可以减少将那些仍在网络中存在的、来自两台主机之间先前已终止的连接的报文段，误认为是后来这两台主机之间新建连接所产生的有效报文段的可能性（它碰巧与旧连接使用了相同的端口号）。

### Round-Trip Time Estimation and Timeout

TCP uses a timeout/retransmit mechanism to recover from lost segments. Perhaps the most obvious question is the length of the timeout intervals. Clearly, the timeout should be larger than the connection’s round-trip time (RTT). Otherwise, unnecessary retransmissions would be sent.

How TCP estimates the round-trip time between sender and receiver? The sample RTT, denoted `SampleRTT`, for a segment is the amount of time between when the segment is sent (that is, passed to IP) and when an acknowledgment for the segment is received. At any point in time, the `SampleRTT` is being estimated for only one of the transmitted but currently unacknowledged segments, leading to a new value of `SampleRTT` approximately once every RTT. Also, TCP **never** computes a `SampleRTT` for a segment that has been retransmitted; it only measures `SampleRTT` for segments that have been transmitted once.

Obviously, the `SampleRTT` values will fluctuate. Upon obtaining a new `SampleRTT`, TCP updates `EstimatedRTT` according to the following formula:

`EstimatedRTT = (1 – α) * EstimatedRTT + α * SampleRTT` (The recommended value of α is 0.125)

Note that EstimatedRTT is a weighted average of the SampleRTT values.

It is also valuable to have a measure of the variability of the RTT: `DevRTT`, an estimate of how much `SampleRTT` typically deviates from `EstimatedRTT`.

`DevRTT = (1 – β) * DevRTT + β * |SampleRTT – EstimatedRTT|` (The recommended value of β is 0.25)

It is therefore desirable to set the timeout equal to the `EstimatedRTT` plus some margin:

`TimeoutInterval = EstimatedRTT + 4 * DevRTT`

An initial `TimeoutInterval` value of 1 second is recommended [RFC 6298]. Also, when a timeout occurs, the value of `TimeoutInterval` is doubled to avoid a premature timeout occurring for a subsequent segment that will soon be acknowledged. However, as soon as a segment is received and `EstimatedRTT` is updated, the `TimeoutInterval` is again computed using the formula above.

### Reliable Data Transfer

We should keep in mind that reliable data transfer can be provided by link-, network-, transport-, or application-layer protocols.

The TCP timer management procedures use only a single retransmission **timer**, even if there are multiple transmitted but not yet acknowledged segments. It is helpful to think of the timer as being associated with the oldest unacknowledged segment.

Whenever the timeout event occurs, TCP retransmits the not-yet-acknowledged segment with the smallest sequence number, sets the next timeout interval to twice the previous value. Thus, the intervals grow exponentially after each retransmission. However, whenever the timer is started after either of the two other events (that is, data received from application above, and ACK received), the `TimeoutInterval` is derived from the most recent values of `EstimatedRTT` and `DevRTT`.

One of the problems with timeout-triggered retransmissions is that the timeout period can be relatively long. Fortunately, the sender can often detect packet loss well before the timeout event occurs by noting so-called duplicate ACKs. In the case that **three duplicate ACKs** are received, the TCP sender performs a **fast retransmit** [RFC 5681], retransmitting the missing segment before that segment’s timer expires.

A proposed modification to TCP, the so-called selective acknowledgment [RFC 2018], allows a TCP receiver to acknowledge out-of-order segments selectively rather than just cumulatively acknowledging the last correctly received, in-order segment. When combined with selective retransmission—skipping the retransmission of segments that have already been selectively acknowledged by the receiver—TCP looks a lot like our generic SR protocol. Thus, TCP’s error-recovery mechanism is probably best categorized as a hybrid of GBN and SR protocols.

### Flow Control

Recall that the hosts on each side of a TCP connection set aside a **receive buffer** for the connection. Because TCP is full-duplex, the sender at each side of the connection maintains a distinct **receive window**.

When the TCP connection receives bytes that are correct and in sequence, it places the data in the receive buffer. The associated application process will read data from this buffer, but not necessarily at the instant the data arrives. If the application is relatively slow at reading the data, the sender can very easily overflow the connection’s receive buffer by sending too much data too quickly.

TCP provides a flow-control service to its applications to eliminate the possibility of the sender overflowing the receiver’s buffer. Flow control is thus a speed matching service—matching the rate at which the sender is sending against the rate at which the receiving application is reading.

Even though the actions taken by flow and congestion control are similar (the throttling of the sender), they are obviously taken for very different reasons.

TCP provides flow control by having the sender maintain a variable called the **receive window**: `rwnd = RcvBuffer – [LastByteRcvd – LastByteRead]`

![img-60](/assets/images/2c34bbc3-fb1a-40a0-be20-60dbed5764a2.png)

Host A makes sure throughout the connection’s life that, the amount of unacknowledged data that A has sent into the connection, less or equals than the rwnd: `LastByteSent – LastByteAcked <= rwnd`.

See [interactive animation](https://media.pearsoncmg.com/aw/ecs_kurose_compnetwork_7/cw/content/interactiveanimations/flow-control/index.html).

### TCP Connection Management

Suppose a process running in one host (client) wants to initiate a connection with another process in another host (server):

1. The client-side TCP first sends a special TCP segment, the **SYN segment**, to the server-side TCP. The SYN segment contains no application-layer data. But the SYN bit, is set to 1. In addition, the client randomly chooses an initial sequence number (`client_isn`) and puts this number in the sequence number field of the initial TCP SYN segment.
2. Once the TCP SYN segment arrives, the server allocates the TCP buffers and variables to the connection, and sends a connection-granted segment, the **SYNACK segment**, to the client TCP. The SYNACK segment also contains no application-layer data. However, it does contain three important pieces of information in the segment header. First, the SYN bit is set to 1. Second, the acknowledgment field of the TCP segment header is set to `client_isn+1`. Finally, the server chooses its own initial sequence number (`server_isn`) and puts this value in the sequence number field of the TCP segment header.
3. Upon receiving the SYNACK segment, the client also allocates buffers and variables to the connection. The client host then sends the server yet another segment, putting the value `server_isn+1` in the acknowledgment field of the TCP segment header. The SYN bit is set to zero, since the connection is established. This third stage of the three-way handshake may carry client-to-server data in the segment payload.

![img-80](/assets/images/f7435a29-0c44-415f-b830-676a291e1f6e.png)

Once these three steps have been completed, the client and server hosts can send segments containing data to each other.

Either of the two processes participating in a TCP connection can end the connection. suppose the client decides to close the connection:

- The client TCP sends a TCP segment with the FIN bit set to 1.（此时客户端停止发送数据，但仍会对收到的数据进行确认）
- When the server receives this segment, it sends the client an acknowledgment segment in return.（此时服务端还可能继续发送一些数据，客户端也会对这些数据返回 ACK 确认）
- The server then sends its own shutdown segment, which has the FIN bit set to 1.（此时服务端也停止发送数据）
- The client acknowledges the server’s shutdown segment and wait for a time, typically 30 seconds, letting the TCP client resend the final acknowledgment in case the ACK is lost. After the wait, the connection formally closes and all resources on the client side (including port numbers) are released.
- The server receives the final ACK and closes down.

![img-80](/assets/images/a3952603-43c0-49c8-b969-df3d4ef60658.png)

三次握手：

- 客户端：你好，能听到我说话吗？
- 服务端：你好，我能听到，你能听到我说话吗？
- 客户端：你好，我能听到。开始说话……

四次挥手：

- 客户端：老师，该下课了。
- 服务端：好的，等我说完最后这点就下课。
- 服务端：我说完了，下课。
- 客户端：谢谢老师，老师再见。

> [Nmap](https://nmap.org/) ("Network Mapper") is a free and open source (license) utility for network discovery and security auditing.

### Classic TCP Congestion Control (TCP Reno)

TCP 拥塞控制的方法是让每一个发送方根据所感知到的网络拥塞程度来限制其能向连接发送流量的速率。

The TCP congestion-control mechanism operating at the **sender** keeps track of an additional variable, the **congestion window**, denoted `cwnd`. Specifically, the amount of unacknowledged data at a sender may not exceed the minimum of `cwnd` and `rwnd`, that is: `LastByteSent – LastByteAcked <= min{cwnd, rwnd}`.（TCP 流水线中可以同时发送的、即未经 ACK 确认的数据量，不能超过拥塞窗口和接收窗口中的较小值）

The constraint above limits the amount of unacknowledged data at the sender and therefore indirectly limits the sender’s send rate.

There is no explicit signaling of congestion state by the network—**ACKs and loss events** serve as implicit signals. The loss event at the sender—either a timeout or the receipt of three duplicate ACKs (totally 4 ACKs)—which is taken by the sender to be an indication of congestion on the sender-to-receiver path. An acknowledged segment indicates that the network is delivering the sender’s segments to the receiver, and hence, the sender’s rate can be increased when an ACK arrives.

We’re now in a position to consider the details of the celebrated **TCP congestion-control algorithm**, which has three major components: (1) slow start, (2) congestion avoidance, and (3) fast recovery.

In the **slow-start** state, the value of `cwnd` begins at 1 MSS and increases by 1 MSS every time a transmitted segment is first acknowledged. This process results in a doubling of the sending rate every RTT. Thus, the TCP send rate starts slow but grows exponentially during the slow start phase.

- Timeout: `ssthresh = cwnd/2; cwnd = 1 MSS;`, begins the slow start process anew.
- 3 duplicate ACKs: `ssthresh = cwnd/2; cwnd = ssthresh + 3 * MSS;`, performs a fast retransmit and enters the fast recovery state.
- When `cwnd == ssthresh`, slow start ends and TCP transitions into congestion avoidance mode.

On entry to the **congestion-avoidance state**, TCP linearly increases the value of `cwnd` by just a single MSS every RTT.

- Timeout: `ssthresh = cwnd/2; cwnd = 1 MSS;`, begins the slow start process anew.
- 3 duplicate ACKs: `ssthresh = cwnd/2; cwnd = ssthresh + 3 * MSS;`, performs a fast retransmit and enters the fast recovery state.

In **fast recovery state**, the value of `cwnd` is increased by 1 MSS for every duplicate ACK received for the missing segment. Eventually, when an ACK arrives for the missing segment, TCP enters the congestion-avoidance state and sets `cwnd = ssthresh`.

- Timeout: `ssthresh = cwnd/2; cwnd = 1 MSS;`, begins the slow start process anew.

> [1] ssthresh: slow start threshold.
>
> [2] Adding in 3 MSS for good measure to account for the triple duplicate ACKs received.

![img](/assets/images/41a59b59-dace-4d31-acde-4cddeada64ca.png)

> The arrows in the FSM description indicate the transition of the protocol from one state to another.
>
> The event causing the transition is shown above the horizontal line labeling the transition, and the actions taken when the event occurs are shown below the horizontal line.
>
> When no action is taken on an event, or no event occurs and an action is taken, we’ll use the symbol Λ below or above the horizontal, respectively, to explicitly denote the lack of an action or event.
>
> The initial state of the FSM is indicated by the dashed arrow.

It’s worthwhile to now step back and view the forest from the trees. Ignoring the slow-start phase (This phase is typically very short, since the sender grows out of the phase exponentially fast) and assuming that losses are indicated by triple duplicate ACKs, TCP’s congestion control consists of linear (additive) increase in cwnd of 1 MSS per RTT and then a halving (multiplicative decrease) of cwnd on a triple duplicate-ACK event. For this reason, TCP congestion control is often referred to as an **additive-increase, multiplicative-decrease (AIMD)** form of congestion control.

TCP Reno’s AIMD to congestion control may be overly cautious. It’s better to more quickly ramp up the sending rate to get close to the pre-loss sending rate and only then probe cautiously for bandwidth. This insight lies at the heart of a flavor of TCP known as TCP CUBIC, who has recently gained wide deployment.

### Explicit Congestion Notification and Delayed-based Congestion Control

TCP 拥塞控制已经演化了多年并仍在继续演化。

More recently, extensions to both IP and TCP [RFC 3168] have been proposed, implemented, and deployed that allow the network to explicitly signal congestion to a TCP sender and receiver.

**Explicit Congestion Notification (ECN)** 显式阻塞通知 is the form of network-assisted congestion control performed within the Internet. Both TCP and IP are involved. At the network layer, two bits (with four possible values, overall) in the "Type of Service field" of the IP datagram header are used for ECN.

One setting of the ECN bits is used by a router to indicate that it (the router) is experiencing congestion. A second setting of the ECN bits is used by the sending host to inform routers that the sender and receiver are ECN-capable, and thus capable of taking action in response to ECN-indicated network congestion.

The intuition is that the congestion indication bit can be set to signal the onset of congestion to the sender before loss actually occurs.

As shown in Figure 3.55, when the TCP in the receiving host receives an ECN congestion indication via a received IP datagram, the TCP in the receiving host informs the TCP in the sending host of the congestion indication by setting the ECE (Explicit Congestion Notification Echo) bit in a receiver-to-sender TCP ACK segment. The TCP sender, in turn, reacts by halving the congestion window, as it would react to a lost segment using fast retransmit, and sets the CWR (Congestion Window Reduced) bit in the header of the next transmitted TCP sender-to-receiver segment.

![img](/assets/images/9f99030c-c50e-41f4-970d-4bd207e00f72.png)

In addition, a number of variations of TCP congestion control protocols have been proposed that infer congestion using measured packet delay.

### Fairness

TCP 的 AIMD 算法公平吗? TCP 趋于在竞争的多条 TCP 连接之间提供对瓶颈链路带宽的平等分享。但实践中，那些具有较小 RTT 的连接能够通过更快地增大其拥塞窗口、抢到更多的可用带宽，因而比那些具有较大 RTT 的连接享用更高的吞吐量。

UDP 是没有内置的拥塞控制的。实时通话应用通常希望以恒定的速率将其数据注入网络，它们可以接受偶尔丢失分组，但不愿在拥塞时将其发送速率降至“公平”级别而不丢失任何分组。从 TCP 的观点来看，运行在 UDP 上的应用是不公平的，因为它们不与其他连接合作、适时地调整传输速率，UDP 有可能压制 TCP 流量。当今的一个主要研究领域就是因特网的拥塞控制机制，用于阻止 UDP 流量不断压制直至中断因特网吞吐量的情况。

即使我们能够使 UDP 流量具有公平的行为，但公平性问题仍然没有完全解决。因为我们没有办法阻止应用使用多个并行 TCP 连接。例如，Web 浏览器通常使用多个并行 TCP 连接来传送一个 Web

## Evolution

Three decades of experience with TCP and UDP has identified circumstances in which neither is ideally suited, and so the design and implementation of transport layer functionality has continued to evolve.

Indeed, measurements in [Yang 2014] indicate that CUBIC (and its predecessor, BIC [Xu 2004]) and CTCP are more widely deployed on Web servers than classic **TCP Reno**; we also saw that BBR is being deployed in Google’s internal B4 network, as well as on many of Google’s public-facing servers. And there are many (many!) more versions of TCP!

QUIC is a new application-layer protocol designed from the ground up to improve the performance of transport-layer services for secure HTTP. QUIC has already been widely deployed, although is still in the process of being standardized as an Internet RFC.

QUIC is an application-layer protocol, using UDP as its underlying transport-layer protocol, and is designed to interface above specifically to a simplified but evolved version of HTTP/2. In the near future, HTTP/3 will natively incorporate QUIC.

![img-80](/assets/images/83a49780-3c9b-45bc-8281-da99bbdbd1fc.png)

Some of QUIC’s major features include:

- Connection-Oriented and Secure. QUIC combines the handshakes needed to establish connection state with those needed for authentication and encryptionm, thus providing faster establishment.
- Streams. QUIC allows several different application-level “streams” to be multiplexed through a single QUIC connection. Data from multiple streams may be contained within a single QUIC segment, which is carried over UDP.
- Reliable, TCP-friendly congestion-controlled data transfer. QUIC provides reliable data transfer to each QUIC stream separately. Since QUIC provides a reliable in-order delivery on a per-stream basis, a lost UDP segment only impacts those streams whose data was carried in that segment; HTTP messages in other streams can continue to be received and delivered to the application. QUIC provides reliable data transfer using acknowledgment mechanisms similar to TCP’s, as specified in [RFC 5681].

![img](/assets/images/1d0a6128-dc02-4e5a-938a-711cb8227694.png)

# Network Layer

Having now covered the application layer and the transport layer, our discussion of the network edge is complete. It is time to explore the network core!

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
