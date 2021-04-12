---
title: "WWDC - Networking"
categories: [Apple]
---

<!-- prettier-ignore -->
* Do not remove this line (it will not be displayed)
{:toc}

# URLSession

> [WWDC 2016 - NSURLSession: New Features and Best Practices](https://developer.apple.com/videos/play/wwdc2016/711)
>
> [WWDC 2015 - Networking with NSURLSession](https://developer.apple.com/videos/play/wwdc2015/711/)

`URLSession` kick-off: init a configuration, init a session, init a task, resume.

Best practice: one session to support many (many!) tasks!

Every `URLSession` object has a connection pool and when you create multiple of these `URLSession` objects, you don't get any benefit of connection reusing. It's also important to note that the `URLSession` objects are fairly expensive to create and have a non-trivial memory footprint.

For almost all of your apps what you should have is just one `URLSession`, which can then have as many tasks as you want. The only time you would want more than one `URLSession` is when you have groups of different operations that have radically different requirements. And in that case you might create two different configuration objects to init two different `URLSessions`. One example is private browsing in Safari where each private browsing window is its own separate `URLSession` so that it doesn't share cookies and other states with the other sessions.

Most apps can just have one statically-allocated `URLSession`, and that's fine. But if you do allocate URLSessions dynamically, remember to clean up afterwards. Either `finishTasksAndInvalidate` or `invalidateAndCancel`. If you don't clean up, you'll leak memory.

Delegate callbacks give you detailed step-by-step progress information on the state of your task. The convenience methods, by comparison, are a quick and easy way of using the API that you don't get all the intermediate delegate callbacks, you just get the final result reported to the completion handler. Don't mix and match both on the same `URLSession`, pick one style and be consistent.

## URLSessionConfiguration

`URLSessionConfiguration`:

- TLS version
- Prohibit cellular usage (`allowsCellularAccess`)
- Network service type ([`networkServiceType`](https://developer.apple.com/documentation/foundation/urlsessionconfiguration/1411606-networkservicetype))
- Cookie policy
- Cache policy
- Storage objects
- Request and resource timeouts

`timeoutIntervalForResource`: The resource timer starts when the request is initiated and counts until either the request completes or this timeout interval is reached, whichever comes first.

`timeoutIntervalForRequest`: The timer only starts once the transfer starts. It controls how long a task should wait for **additional data** to arrive before giving up. The timer associated with this value is reset whenever new data arrives.

### waitsForConnectivity

New `URLSessionConfiguration` property `var waitsForConnectivity: Bool`.

“Please fetch me this resource when the network is available.” No longer a need to monitor connectivity and manually retry requests.

You would create and resume the `URLSessionTask` as before. If the device can't connect to the server, we'd call a delegate callback if you implemented it and only once for each `URLSessionTask`.

```swift
let config = USLSessionConfiguration.default
config.waitsForConnectivity = true
// ...
func urlSession(_ session: URLSession, taskIsWaitingForConnectivity task: URLSessionTask) {}
```

This API only has an effect for non-background sessions, it's not necessary for background URLSession who does this automatically.

### networkServiceType

You might be familiar with five QoS classes associated with dispatch queues and NSOperation objects. `URLSession` is QoS-aware which means it will capture the QoS off the queue on which you call `task.resume()`. And all the messages that it sends to your delegates will respect this QoS. For example, if your app wants to fetch some data which is not time critical, consider resuming that task on a queue which has background QoS to make sure this task does not contend for CPU with other higher priority work that your app might be doing.

Starting in iOS 5 we had the [`networkServiceType`](https://developer.apple.com/documentation/foundation/nsurlrequest/networkservicetype) API. Network service type is the property on the `URLSessionConfiguration` object that allows you to classify your network traffic that helps the system prioritize the data leaving the device.

| Service Type   | Availability | Description                                                                                                                                                                                               |
| -------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| default        | iOS 4.0+     | standard network traffic                                                                                                                                                                                  |
| video          | iOS 5.0+     | video traffic                                                                                                                                                                                             |
| voice          | iOS 5.0+     | voice traffic                                                                                                                                                                                             |
| background     | iOS 5.0+     | background traffic, e.g. discretionary download                                                                                                                                                           |
| avStreaming    | iOS 7.0+     | streaming audio/video data                                                                                                                                                                                |
| responsiveAV   | iOS 7.0+     | responsive (time-sensitive) audio/video data.                                                                                                                                                             |
| callSignaling  | iOS 10.0+    | network traffic that establishes, maintains, or tears down a VoIP call                                                                                                                                    |
| responsiveData | iOS 12.0+    | This service type’s priority is higher than 'default'. Use this service type for interactive situations where the user is anticipating a quick response, like instant messaging or completing a purchase. |

voice > callSignaling > video > responsiveData > default > background

Remember, network service type is not a priority level. There isn't a ranked ordering here of high priority to low priority. It's a way expressing whether you want low throughput and low latency or high throughput and moderate latency.

想法：对应用内的不同网络请求区分服务类型。大部分的网络请求都可以归类到 `default` 和 `background`。其它的情况例如，对需要长时间保持连接的“心跳”服务，可以设置一个低延时低吞吐量的服务类型，操作系统在网络层、链路层做了一系列的工作，提供我们想要的服务。

IP-Layer DSCP QoS Marking: In August of 2015, Apple and Cisco announced a partnership to create a fast lane for iOS business apps. With iOS 10 we are introducing new Quality of Service features to optimize enterprise iOS apps with Cisco networks. Traffic marked with the network service type property will maintain this tag across all the hops when on a Cisco Fast Lane network. Recognizes Cisco fast lane network and sets Differentiated Services Code Point (DSCP) marking appropriately. Useful for: Telephony apps; Backup and other bulk upload apps.

Link-Layer QoS Marking: Controls packet queuing and scheduling on network interface. When you set these options, a couple of things happen. On the device itself, there are multiple outband queues, and the type of service you set for your traffic controls which queue it uses. On Wi-Fi interfaces, it will also set the wireless multi-media access category.

For developers writing apps like Skype and Facetime using UDP, you need to be using BSD sockets. So we [now](https://developer.apple.com/videos/play/wwdc2016/714/) have a socket option that exposes the same functionality so your UDP clients can benefit from this.

## Statistics

Another evolution to the `NSURLSession` API is the addition of network statistics.

`urlSession(_:task:didFinishCollecting:)` Tells the delegate that the session finished collecting metrics for the task.

`URLSessionTaskMetrics`:

- `taskInterval: DateInterval`
- `redirectCount: Int`
- `transactionMetrics: [URLSessionTaskTransactionMetrics]`
  - Request and Response
  - Protocol and Connection
  - Load Info
  - Connection Establishment and Transmission
  - Address and port
  - TLS version

![img](https://docs-assets.developer.apple.com/published/573ade75c6/77f6bef0-3201-49ab-bed8-33ce7ec1072f.png)

## App Transport Security

App Transport Security is a new feature from Apple in iOS 9. ATS places restrictions on TLS versions, cipher suites used, certificate trusts, and certificate key sizes that are used in that transaction.

`CFNETWORK_DIAGNOSTICS=1` to help you to find out TLS issues in your app. (Xcode -> Edit Scheme -> Arguments -> Environment Variables)

There is a command line tool on macOS called `nscurl`.

## HTTP/2

`URLSession` supports HTTP/2 protocol only over an encrypted connection. And that your HTTP/2 server requires to support ALPN for protocol negotiation.

`URLSession` 运行在 HTTP/1.1 时，对同一个 IP 地址的请求，会创建多个并行的 TCP 连接，每个连接的建立都会带来资源消耗；而在 HTTP/2，由于分帧和多路复用，一个 TCP 连接就可以处理多个请求。

In [iOS 12](https://developer.apple.com/videos/play/wwdc2018/714), we have something new in `URLSession`, **HTTP/2 Connection Coalescing**. It is going to be automatically done on for all your apps using `URLSession`. 相同证书、相同 IP 地址的服务器，可以复用 TCP 连接。

![img-80](/assets/images/d674106b-2614-47f4-b46b-f82733aa799b.png)

The first certificate presented to us covers all the subdomains under example.com. Also notice that delivery.example.com, it results to the same IP address as the first connection. It's safe to assume we're talking to the same endpoint and reuse the connection instead of opening a new one when we want to fetch the second resource.

Two to three times faster if you configure the **Server Push** on your HTTP/2 server! And you don't even have to change any code in your app! The data for your `URLSessionDataTask` will be delivered out of the Server Push storage directly to your application.

## HTTPCookieStorage

`HTTPCookieStorage` is a container that manages the storage of cookies. The persistent cookie storage returned by `sharedHTTPCookieStorage` may be available to app extensions or other apps.

**Best Practices**: Cookies, are not free and have a non-trivial cost in storing and looking them up.

- Cookies are attached to all the requests that match the domain and path attribute. Please use the domain and path attribute wisely to make sure cookies required by the servers are attached to your requests.
- Cooike can quickly increase your request size. Use of smaller cookies when possible, and delete these cookies when you no longer need them.
- Try to save some state on the server so you can reduce the number of client-side cookies.

**Security**: One thing we don't want to allow is for a website to set a cookie on the .com domain, which is then accessible to any other .com company. `URLSession` can now receive [Public Suffix List](https://publicsuffix.org/) updates over the air. This is important for determining where administrative boundaries occur in the namespace of the Internet. Better_security for users against cookie attacks.

## URLSessionStreamTask

There are some cases where you need a protocol other than HTTP or HTTPS, and you want to do something custom directly on top of TCP/IP networking. `NSURLSessionStreamTask` is a Foundation extraction, directly over a TCP connection.

What we have new for you in iOS 11 is automatic navigation of authenticating proxies. If the proxy requires credentials, then we will automatically extract those from the key chain or promptly the user on your behalf.

## Wi-Fi Assist

We have Wi-Fi assist since iOS 9 (2015). Wi-Fi Assist is triggered whenever we are in a marginal Wi-Fi scenario, which means the signal strength of Wi-Fi is very low. Whenever iOS is detecting this, it will play a contest between Wi-Fi and cellular data. So when you are creating a new connection, we will first attempt to create the connection on Wi-Fi. And shortly after that where if this connection hasn't been established, we will go on and create a connection over cell so that if cellular data wins, we will start using the cellular link.

In [iOS 13](https://developer.apple.com/videos/play/wwdc2019/712), even when a flow has already been established on Wi-Fi and has started to exchange data, if later on the signal quality is reducing, we are able to move the next request over to cell.

You get automatic reliable network fallback if you use `URLSession` and CFNetwork-layer APIs. Suppose you're at the fringe of Wi-Fi and your TCP connection not succeeding, the OS automatically initiates parallel connection over mobile data. And the first to complete wins. What you can do is pay attention to the better route notification so that you migrate back to Wi-Fi when it's available.

```swift
func urlSession(_ session: URLSession, betterRouteDiscoveredFor streamTask: URLSessionStreamTask) {
    // Good news: WiFi associated once again!
}
```

## Multipath TCP

> [WWDC 2017 - Advances in Networking, Part 1](https://developer.apple.com/videos/play/wwdc2017/707/)

Now the thing with Wi-Fi Assist is that it does this at flow creation time. Once a flow is established it will stick to this network interface. So even if Wi-Fi afterwards is getting worse, this flow is going to get slower and slower and eventually stall.

So, the only way to address this problem is by creating new protocol that is understood by the client and the server -- Multipath TCP. Now in iOS 11, we are adding MPTCP into Wi-Fi Assist.

Multipath TCP is the protocol that has been designed specifically for mobile devices. It is specified by the IETF as a standard (March 2020, the Multipath TCP v1 specification, RFC 8684), and it provides the exact same service as TCP.

What it does on top of TCP is that it provides a way to seamlessly move traffic from the Wi-Fi interface over to the cellular interface whenever it realizes that Wi-Fi is not good enough, and it also allows to move the traffic back again so that your application is not consuming cellular data. It is also able to choose the best interface if you have a latency-sensitive and interactive flow.

If you are building your application on top of the URLSession API, Multipath TCP sits just below this. It creates the so-called TCP Subflows. Those TCP subflows, one for each interface are actually full-fledged TCP connections, and MPTCP is in charge of making sure that the data gets sent over either of them.

![img](/assets/images/9f46e5de-b22f-43be-944d-d13eee5dda53.png)

Now, in iOS 11 we are opening up the API for you to start using it. You will need to add the capability Multipath in Xcode.

You will need to update or change your server infrastructure to start supporting Multipath TCP.（咨询你的服务器供应商是否支持这个协议；或者更新服务器 Linux 内核以支持这个协议，AWE/GCE 都已经有可用的镜像）

We are exposing two types of different services using MPTCP. See [`URLSessionConfiguration.MultipathServiceType`](https://developer.apple.com/documentation/foundation/urlsessionconfiguration/multipathservicetype).

The first one is the handover mode which provides a high reliability for your long length connections. In Wi-Fi Assist we have limits that try to limit the amount of data that we are sending on the cellular link. So we encourage you to use the handover mode only for low volume connections.

The second is the interactive mode, this one provides a low latency response for your interactive and latency sensitive connections. Whenever you're using the interactive mode, we will bring up both Wi-Fi and cell right away, even if Wi-Fi is in a good state, just like what we are using for Siri.

## Progress

Now in iOS 11 `URLSessionTask` has adopted the `ProgressReporting` protocol. You can get a progress object from the `URLSessionTask`.

You can attach that progress object to a `UIProgressView` or an `NSProgressIndicator` to get an automatic progress bar.

You can also combine multiple progress objects into a parent progress object when you're performing multiple tasks.

The binding between a `URLSessionTask` and the progress object is bidirectional. So if you pause a `URLSessionTask`, that is the same as pausing the progress object. If you pause the progress object, that is the same as pause the `URLSessionTask`.

## Brotli

Brotli compression algorithm is about 15% better than gzip.

HTTPS response header `Content-Encoding: br` supported in `URLSession`. Requires HTTPS (TLS).

## Caching

> [WWDC 2018 - Optimizing Your App for Today’s Internet](https://developer.apple.com/videos/play/wwdc2018/)

The URL Loading System caches responses both in memory and on disk, improving performance and reducing network traffic.

`URLSessionConfiguration` has a property called `requestCachePolicy`; Each `URLRequest` instance contains a `URLRequest.CachePolicy` object to indicate if and how caching should be performed.

Currently, only HTTP and HTTPS responses are cached.

Caching is a great way of reducing latency but it's important to note that caching might result in disk IO. Also, `usePrococolCachePolicy` caches HTTPS responses to disk, which may be undesirable for securing user data. Consider adopting the delegate method to decide what resources should be cached:

```swift
func urlSession(_ session: URLSession, dataTask: URLSessionDataTask,
                willCacheResponse proposedResponse: CachedURLResponse,
                completionHandler: @escaping (CachedURLResponse?) -> Void) {
    if proposedResponse.response.url?.scheme == "https" {
        let updatedResponse = CachedURLResponse(response: proposedResponse.response,
                                                data: proposedResponse.data,
                                                userInfo: proposedResponse.userInfo,
                                                storagePolicy: .allowedInMemoryOnly)
        completionHandler(updatedResponse)
    } else {
        completionHandler(proposedResponse)
    }
}
```

For servers, please consider using cache control headers `Cache-Control: no-store` to decide what resources should be cacheable.

## WebSocket

> [WWDC 2019 - Advances in Networking, Part 1](https://developer.apple.com/videos/play/wwdc2019/712/?time=1614)

**WebSocket** allows bidirectional communication over a single HTTP connection. This enables developers to write applications like chat, multiplayer games, and other real-time applications.

Web applications were originally developed around a client/server model, where the Web client is always the initiator of transactions, requesting data from the server. Thus, there was no mechanism for the server to independently send, or push, data to the client without the client first making a request.

To overcome this deficiency, Web app developers can implement a technique called **HTTP Long-Polling**. When a client wants to receive a response from the server, it sends out a request. The server responds with a 200 status code immediately, but it does not send out the response body because it doesn't have one at this point. Sometime in the future, once the server has a response ready for the client, it sends it out to the client. At which point, the client sends a new request, indicating that it wants to receive the next message.

![img-80](/assets/images/5d80151f-22f5-4462-9546-450c1ac1c887.png)

There are some disadvantages associated with long polling. Both the end points when they want to send messages have to either send an HTTP request or an HTTP response, which is a lot of overhead. Additionally, complexity has to be maintained at the server to enable long polling.

Let's see how WebSockets can solve this problem. The first step of the WebSocket handshake, the client sends out a request to the server, indicating that it wants to upgrade this connection to WebSocket. The server responds with the 101 switching protocol to response, at which point we have a bidirectional stream between the two end points. Both the end points are now free to send messages in either direction without any HTTP overhead.

![img-80](/assets/images/2f6c1e53-c6d0-45ab-bd75-efbfa0c8dac2.png)

WebSocket works over the well-known HTTP ports and is fully compatible with the existing web infrastructure, allowing you to connect to proxies, CDNs, and firewalls.

Historically, the WebSocket protocol has been available as a JavaScript API in web browsers, now we've decided to extend this API to our networking framework. This year we are excited to announce new `URLSessionWebSocketTask` API!

```swift
// Create with URL
let task = URLSession.shared.webSocketTask(with: URL(string: "wss://websocket.example")!)
task.resume()
// Send a message
task.send(.string("Hello")) { error in /* Handle error */ }
// Receive a message
task.receive { result in /* Handle result */ }
```

You can send data or string messages on the task. You can also receive messages on the task by passing a completion handler, which will be called asynchronously once we receive the entire message from the server.

The APIs available for you to add WebSockets to your apps today:

![img-80](/assets/images/8ebabd99-dc14-4136-91f6-0d8892a53af3.png)

# Network Extension

> [What's New in Network Extension and VPN](https://developer.apple.com/videos/play/wwdc2015/717/)

With the NetworkExtension framework, you can customize and extend the core networking features.

## NEHotspotHelper

`NEHotspotHelper` API gives your app the ability to perform custom authentication for Wi-Fi Hotspots.

This works is you first register your app with the system as a Hotspot helper. Then as the device comes within range of Wi-Fi networks, scanning for Wi-Fi networks or the user selects a Wi-Fi network to connect to, the system run your app in the background, call into your app and give your app the opportunity to claim the Wi-Fi Hotspot with a level of confidence, high, medium or low. If you claim a Hotspot with a high level of confidence, the system will call you to actually perform the authentication with the Wi-Fi Hotspot. And it will periodically call you to maintain the authentication session.

The Hotspot helper API also allows you to annotate Wi-Fi networks that show up in the settings app and you can annotate these Wi-Fi networks with the name of your app or the name of your company.

## NEHotspotConfiguration

`NEHotspotConfiguration`：应用内通过这个接口快捷地连接到相机等设备开启的 Wi-Fi 热点，而不必离开 App、带设置 - Wi-Fi 去连接。当然，如果你开发了一个星巴克应用，也可以在用户到咖啡店时，自动提示他们加入店里的 Wi-Fi。

## NEVPNManager

You can create a single personal VPN configuration for the app, which is represented by a single `NEVPNManager` object. And personal VPN configurations coexist and cooperate with enterprise VPN configurations.

```swift
import NetworkExtension
// Each app gets a single configuration.
let manager = NEVPNManager.sharedManager()
// Connect automatically on a matching network.
let connectRule = NEOnDemandRuleConnect()
// Match all Wi-Fi networks.
connectRule.interfaceTypeMatch = .WiFi
// Set rule in array.
manager.onDemandRules = [ connectRule ]
manager.saveToPreferencesWithCompletionHandler { error in
    // Handle error or success.
}
manager.loadFromPreferencesWithCompletionHandler { error in
    // Protocol is a keyword, so it needs to be quoted.
    if manager.`protocol` == nil {
        let newIPSec = NEVPNProtocolIKEv2()
        newIPSec.serverAddress = "my.personal.vpn"
        // Set all of the properties on newIPSec.
        manager.`protocol` = newIPSec
        manager.enabled = true
        manager.saveToPreferencesWithCompletionHandler { error in
            // Handle error or success.
        }
    }
}
```

<div class="mermaid">
graph LR
    NETunnelProviderManager --> NSVPNManager
    NEAppProxyProviderManager --> NETunnelProviderManager
</div>

Like its superclass `NEVPNManager`, you use the `NETunnelProviderManager` class to configure and control VPN connections. The difference is that `NETunnelProviderManager` is used to to configure and control VPN connections that use a custom VPN protocol.

## Packet Tunnel Provider (VPN Client)

<div class="mermaid">
graph LR
    NETunnelProvider --> NEProvider
    NEPacketTunnelProvider --> NETunnelProvider
    NEAppProxyProvider --> NETunnelProvider
</div>

Implement a VPN client for a packet-oriented, custom VPN protocol. When the system starts a VPN configuration that uses your packet tunnel provider, it launches your app extension, instantiates your packet tunnel provider subclass within that app extension, and starts forwarding packets to your provider.

## NEFilterProvider

There are some ways that schools can do network content filtering with iOS devices. They can deploy an on-site content filter, put a device on their local network and route all their Internet traffic through that. The draw back with this is that it's only available on the school's local network. If the students want to take the schools iPads or iPhones home they either can't browse the Internet at all when they are home or browse the Internet unfiltered.

The best solution for schools is to filter the network content on the device. Before it leaves the device and just before it's actually delivered to the user.

## NEDNSProxyProvider

`NEDNSProxyProvider` allows you to, in its simplest mode, redirect all the inquiries to a resolver that you own. Or you can even use it to get the individual DNS queries and send them over a custom protocol such as DNS over TLS or DNS over HTTP.

传统 DNS 协议运行在 UDP 协议之上，使用端口号 53，向本地运营商询问域名对应的 IP 地址。HTTPDNS 使用 HTTP 协议进行域名解析，这样做有几个好处：

- 绕过运营商 Local DNS，避免域名劫持（有时候我们访问一些未投入使用的域名，会被运营商插入广告）
- 由于运营商策略的多样性，其 Local DNS 的解析结果可能不是最近、最优的节点；HTTPDNS 能够直接得到客户端的出口网关 IP，从而更准确地判断客户端地区和运营商，得到更精准的解析结果，让客户端就近接入业务节点
- 通过热点域名预解析、客户端 DNS 缓存、懒更新策略等方式实现接近 0 解析延迟
- 避免 Local DNS 不遵循权威 TTL，解析结果长时间无法更新的问题
- 能够有效缓解如东南亚、印度等地区，不确定的运营商网络带来的 APP 可用性风险

> <https://cn.aliyun.com/product/httpdns>

# Network.framework

> [WWDC 2018 - Introducing Network.framework: A modern alternative to Sockets](https://developer.apple.com/videos/play/wwdc2018/715/)

Thirty years ago we had BSD Sockets. It was a great API. But now the Internet has become a lot more complicated.

You may have assumed that `URLSession` is also just a wrap around Sockets. Not quite. `URLSession` is actually built using Apple's user space networking code Network.framework.

And starting now, in iOS 12, we are exposing that same API that URLSession uses so that your apps can directly use that for making TCP connections and other appropriate use cases.

And if you're the developer of third-party libraries that are built on BSD Sockets, we encourage you to look at the Network.framework APIs.

![img-60](/assets/images/2f20c9f3-ce1c-48f5-942c-31d8b00126df.png)

Use this framework when you need direct access to protocols like TLS, TCP, and UDP for your custom application protocols. Continue to use `URLSession`, which is built upon this framework, for loading HTTP- and URL-based resources.

# [WWDC 2015 - Your App and Next Generation Networks](https://developer.apple.com/videos/play/wwdc2015/719/)

## Supporting IPv6

Test IPv6: <https://test-ipv6.com/index.html.zh_CN>

We realized that we were running out of IPv4 addresses way too fast. So we added a NAT in the middle. This works, but the larger scale NAT device is both expensive and fragile. LinkedIn reports that the page load time over IPv6 is 10 to 40 percent **faster** than over IPv4. They theorize that that is due to less overhead setting up connections through overloaded large scale NATs.

Subscribers are now connecting to cellular data networks over IPv6. The cellular carriers now have to support both IPv4 as well as IPv6 in their network. But what they really want to do is to drop IPv4 from their access network. So now they have deployed **DNS64** and **NAT64** in their network, and the way it works is when the application on the client device makes a hostname query to get the IPv6 address for an IPv4-only server, DNS64 and the network synthesizes an IPv6 address and gives it back to the client device. Now that the client device has this IPv6 address to work with, it can start writing traffic to the network.

![img-80](/assets/images/a2456eba-8600-4b3c-b868-82ae36a1f351.png)

Test IPv6 network: Mac - System Preferences - Sharing - Internet Sharing - Create NAT64 Network.

If you are working with an IPv4 address literal, new in OS X 10.11 and iOS 9, higher-layer networking frameworks (NSURLSession and CFNetwork-layer APIs) will works in even in IPv6-only network! The OS synthesizes IPv6 address for you. BUT, using literal IPv4 addresses will prevent direct IPv6 connection to a dual-stack server.（服务器同时支持 IPv4 和 IPv6，使用字面 IPv4 地址会连接到服务器 IPv4 的服务）

We recommend you use hostnames. That way you can get a v4 address on a v4 network and a v6 address on a v6 network.

## CoDel with ECN

On any path between two devices there will be one link that has the lowest throughput, that's the **bottleneck** link. The job of the transport protocol is to work out its share of the bottleneck link.

没有使用 CoDel + ECN 之前，TCP 会不断增加拥塞窗口大小去尽可能利用更多的带宽、然后发生丢包、减小拥塞窗口大小并重传，如此循环。一直以来这个机制都运行得很好。Historically, packet loss and retransmission has not caused big problems for the traditional networking applications like file transfer and sending email. 我们并不在乎每个 packet 是否按顺序到达，只要它们在传输层重新组装成完整的文件即可。But when you are watching streaming video, you really want the packets come in order. So in-order delivery has become a much more pressing problem.

Dropping packets is an expensive way to signal congestion. Marking packets “Congestion Experienced” is less destructive.

CoDel (pronounced "coddle") for controlled delay is a scheduling algorithm designed to overcome bufferbloat in networking hardware, such as routers. CoDel (or similar Smart Queue Management) plus ECN does helps to reduce network delay and packet loss!

> Bufferbloat is a cause of high latency in packet-switched networks caused by excess buffering of packets.

It is in Linux and turned on by default, more than half of the top million web servers in the world already support ECN. ECN now enabled in OS X 10.11 and iOS 9 for all TCP connection.

One common misunderstanding about ECN is that it has to be supported end to end on the entire path across the internet, and that's not true. There is only one place that needs to support ECN for you to get the benefit. For most of you at home with your residential internet connections that bottleneck link is an artificial one. You may have paid for 20 megabits or 50 megabits of service and the way your ISP provides that service is they artificially throttle your data to the rate you've paid for. So the bottleneck is always the one that exists at your ISP's headend equipment where they are artificially throttling your data. That is the only place on the path that needs to mark congestion.

## TCP_NOTSENT_LOWAT

Screen Sharing problem. The default socket send buffer at that time was 120 kilobytes, my throughput was about 50 kilobytes a second (DSL access network was very slow at upstream direction), so that's about 2.5 seconds delay I was seeing.

`setsockopt(skt,IPPROTO_TCP, TCP_NOTSENT_LOWAT, &threshold,sizeof(threshold));`

When you set that socket option, the socket send buffer remains unchanged (in this example, 128kB). The difference is that your run loop will not report the socket as being writable until the unsent data has drained to some fairly low threshold, typically 8 or 16 kilobytes. When the socket becomes writable, you then write a single useful atomic chunk into the buffer.

The benefit of this delay reduction is really obvious for real-time applications. 这个选项对屏幕共享这类实时应用非常有用！在这个案例中，上行带宽很小、大量数据停滞在 TCP send buffer 中等待传输，通过设置这个选项，应用层就不会每产生一个屏幕帧就往 socket 传递数据、塞满缓冲区，而总是等待缓冲区相对较小时、再把最新的屏幕帧传给 socket，至于中间这些帧怎么办呢？直接丢掉就可以了，反正我们并不在乎！

It's available in Linux too because this option applies at the source of the data on the sending side. So for those of you who are running Linux servers, this option is available too. This option will be turned on automatically for all connections using the higher layer NSURLSession and CFNetwork APIs.

## TCP Fast Open

TCP Fast Open combines the connection setup and the data exchange into one packet exchange.

This is not turned on by default. The reason is, if one of those packets is delayed and shows up much later, then to the server that looks like a perfectly valid TFO request, and whatever the operation was, it will do it again. If that operation was sending you a JPEG image, doing it twice may be no big deal. If that operation was sending you a pair of shoes from Zappos, then doing it twice might not be what you want.

![img-60](/assets/images/8e540cf6-f47a-46d6-a0fb-caa7972ad6b5.png)

Later, we will look at how to expose this through the higher level APIs but now it's only available through connectx system call.

# [WWDC 2016 - Networking for the Modern Internet](https://developer.apple.com/videos/play/wwdc2016/714/)

## UTF-8

**Unicode** is a big list of numbers, and corresponding to each number a human visible character. To use those integers in our computers, we need some way of representing those numbers, in memory, on disk, over the network.

One way of representing them is UTF-32, which is just a 32-bit number. You have to be concerned whether it's big endian or little endian. UTF-16 is more compact. It uses 16-bit numbers. But it still has the same problem.

> 什么是字节序？在计算机中单字节可以存储的数字范围是 0 - 127，128 或以上的数字必须有两个或更多字节存储。一个数字肯定是有高位和低位的，例如十进制数 13，1 是高位，3 是低位。那么，计算机进行数据存取是先处理高位、再处理低位呢，还是先处理低位、再处理高位？不同的硬件架构可能使用不同的字节序。先处理高位再处理低位，叫做大端字节序；先处理低位再处理高位，叫做小端字节序。

UTF-8 is an 8-bit byte-oriented encoding. Because of that, there are no byte order issues, and this is really what makes it the ideal encoding to use. **And when I first heard about that, I immediately saw, this is the answer. This solves the problem for international text.**

![img-90](/assets/images/dd1904d7-64ad-4e78-9d40-d16e15b74464.png)

You can jump into the middle of a UTF-8 file anywhere, and by just looking at any byte, you can tell what you've got. So it's very, very robust to insertion and deletion errors. It's an encoding that is efficient enough to be compact but has just enough redundancy to be very reliable.

So, we recommend only use UTF-8, for everything!

# [WWDC 2017 - Your Apps and Evolving Network Security Standards](https://developer.apple.com/videos/play/wwdc2017/701/)

## Certificate Revocation

The most common reason for revocation of certificate is the user no longer being in sole possession of the private key (e.g., the token containing the private key has been lost or stolen).

In cryptography, a certificate revocation list (or CRL) is "a list of digital certificates that have been revoked by the issuing certificate authority (CA) before their scheduled expiration date and should no longer be trusted".

The Online Certificate Status Protocol (OCSP) stapling is a standard for checking the revocation status of X.509 digital certificates. It allows the presenter of a certificate to bear the resource cost involved in providing Online Certificate Status Protocol (OCSP) responses by appending ("stapling") a time-stamped OCSP response signed by the CA to the initial TLS handshake, eliminating the need for clients to contact the CA, with the aim of improving both security and performance.

But OCSP stapling actually doesn't protect users against malicious servers. In particular, the malicious server just need omit the stapled OCSP response and the client will never know that that malicious server has a revoked certificate.

Apple is enhanceing this. First, we gather information from certificate transparency logs. CT logs contain cryptographic proofs of the existence of a certificate. We request all of the revocation information from certificate authorities. We aggregate it into a single efficient bundle, and then make it available to all of our clients. Those clients check in periodically with us to get that bundled revocation information, and use that latest status revocation information when checking server certificates that they are using. If the client hits a certificate that is listed there and your servers are not using OCSP Stapling, the client will then perform OCSP.

![img-60](/assets/images/97cbc95a-ac3c-4f9e-aff9-30dc6619add1.png)

## Forward Secrecy

In cryptography, forward secrecy (FS), also known as perfect forward secrecy (PFS), is a feature of specific key agreement protocols that gives assurances that session keys will not be compromised even if long-term secrets used in the session key exchange are compromised.

前向安全指的是长期使用的主密钥泄漏不会导致过去的会话密钥泄漏。前向安全能够保护过去的通讯不受密钥在未来暴露的威胁。

## TLS 1.3

In iOS 12.2, TLS 1.3 is enabled by default for Network.framework (low-level, iOS 12.0+) and `NSURLSession` (high-level) APIs.

![img](/assets/images/e35da8fc-1047-41c4-8e39-77ac7488905e.png)

- One round trip (almost always) connection setup
- Strong cryptography AEAD with Forward Secrecy by default
- Privacy: certificates and most handshake fields are encrypted

# [WWDC 2018 - Optimizing Your App for Today’s Internet](https://developer.apple.com/videos/play/wwdc2018/714/)

## Certificate Transparency

You've probably heard cases where certificate authorities, either through malice or incompetence, issue rogue certificates to entities that they should not. The solution to this is something called certificate transparency logs.

When a certificate authority issues a certificate to a server, it also records that with the log and the log gives the server a signed affidavit 宣誓书 that its certificate has been publicly recorded. And then when the client connects, the server can give all that information to the client and the client can verify that not only this is a signed certificate, it is a publicly logged signed certificate. The client will reject those doesn't have the affidavit to attest 证明 it being recorded in a public log.

![img-80](/assets/images/d2505376-f03d-4eea-a6de-58c76f51fca8.png)

In iOS 12.1, certificates issued after October 15, 2018, from a system-trusted root certificate must be logged in a trusted Certificate Transparency log to be allowed for TLS connections.

# [WWDC 2019 - Advances in Networking, Part 2](https://developer.apple.com/videos/play/wwdc2019/713/)

## Bonjour

Bonjour 是苹果为基于组播域名服务 (multicast DNS) 的开放性零设置网络标准所起的名字，能自动发现 IP 网络上的设备自动发现彼此，而不需输入 IP 地址或配置 DNS 服务器。使用 Bonjour 的设备在网络中自动传播自己的服务信息、并聆听其它设备的服务信息，设备之间就像在打招呼，这也是其命名为 Bonjour（法语：你好）的原因。

Bonjour is how you advertise and discover services on the network. It's used anytime you print with AirPrint, anytime you are connecting to something without typing in an IP address or a host name. Bonjour is now available on every major platform.

We can make peer-to-peer connections and use wide-area discovery.

## Optimistic DNS

> [WWDC 2018 - Optimizing Your App for Today’s Internet](https://developer.apple.com/videos/play/wwdc2018/)

Many servers have a very short time to live configured on their DNS records. And they do this such that if a server goes down or the server wants to load balance over another IP address, it can quickly change the IP address record and have clients adjust and start using the new address.

The downside, though, is that this really can hurt client performance. With a short time to live, a client will almost always have to take the round trip to do DNS, to request the address for the host name that you are connecting to. Most of the time, the server address has not changed at all, and so this is a wasted round trip.

So, optimistic DNS is a solution that we released last year that solves this problem. Optimistic DNS allows your connection to optimistically connect to the last known good IP address for that host name, in parallel with issuing a new query for the host name's current address. If nothing has changed, which is almost always the case, the connection will just establish to the old IP address. But if something has changed you'll still get the new IP address and connect to it instead.

It is on by default for connections using Network.framework and `URLSession`.

## Network Link Conditioner

![img](/assets/images/844258d8-8216-490f-9fc9-add0f0644ebb.png)

# [WWDC 2020 - Boost performance and security with modern networking](https://developer.apple.com/videos/play/wwdc2020/10111/)

# [WWDC 2020 - Build local push connectivity for restricted networks](https://developer.apple.com/videos/play/wwdc2020/10113/)

# [WWDC 2020 - Deliver a better HLS audio experience](https://developer.apple.com/videos/play/wwdc2020/10158/)

# [WWDC 2020 - Support local network privacy in your app](https://developer.apple.com/videos/play/wwdc2020/10110/)

# [WWDC 2019 - Designing for Adverse Network and Temperature Conditions](https://developer.apple.com/videos/play/wwdc2019/422/)

# WebKit

[深入剖析 WebKit](https://ming1016.github.io/2017/10/11/deeply-analyse-webkit/)

[WebView 性能、体验分析与优化](https://tech.meituan.com/2017/06/09/webviewperf.html)

# How browsers work

[How browsers work](https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work)

导航是加载页面的第一步。它发生在以下情形：用户在地址栏输入一个 URL、点击一个链接、提交表单等。

浏览器对域名进行 DNS 查找，取得 IP 地址。这个 IP 地址可能会被缓存一段时间。如果页面中的元素存在于不同的域名，还要进行多次的 DNS 查找。

一旦获取到服务器 IP 地址，浏览器就会通过 TCP ”三次握手“（SYN, SYN-ACK, ACK）与服务器建立连接。另外，为了在 HTTPS 上建立安全连接，还需要进行 TLS 协商。

经过 4 个往返时间（RTT），浏览器终于可以在第 5 次往返发出请求。

一旦我们建立了到 web 服务器的连接，浏览器就代表用户发送一个初始的 HTTP GET 请求，对于网站来说，这个请求通常是一个 HTML 文件。一旦服务器收到请求，它将使用相关的响应头和 HTML 的内容进行回复。

第一个响应包是 14kb 大小。这是 TCP 协议慢开始的一部分。在收到 ACK 之后，服务器会将下一个包的大小加倍到大约 28kb，并一直加倍直到达到预定的阈值，或者遇到拥塞。

![img](/assets/images/CF454AF4-6A77-4286-BC6C-F5A4E67BECE8.jpg)

一旦浏览器收到第一个响应包，它就可以开始将收到的信息转换为 DOM，在渲染器将 DOM 绘制成页面之前，HTML、CSS、JavaScript 必须被解析完成。这就是为什么在前 14Kb 中至少包含页面模板（第一次渲染所需的 CSS 和 HTML）对于 web 性能优化来说是重要的。

渲染 Web 页面一共需要五步：

第一步，构建 DOM 树。这个过程占用了主线程。DOM 节点的数量越多，构建 DOM 树所需的时间就越长。`<script>` 标签会阻塞渲染并停止 HTML 的解析；JavaScript 经常用于查询元素的 CSS 属性，这又会阻塞解析并等待 CSS 下载完成。（Preload scanner 会遍历当前已传输的内容、找到其中需要下载的资源并开始下载。这样，当浏览器解析到对外部资源的引用时，它可能正在下载或者已经下载好了，这种优化减少了阻塞。）

第二步，处理 CSS 并构建 CSSOM 树。创建 CSSOM 树通常是非常快的。然后，JavaScript 代码被解析为抽象语法树，然后交给解释器（Interpreter）产出 bytecode，在主线程运行。

第三步，将 DOM 和 CSSOM 组合成一个 Render 树。根据 CSS 级联确定 DOM 树中每个可见节点的计算样式。渲染树标识显示哪些节点（即使不可见）及其计算样式，但不标识每个节点的尺寸或位置。构建渲染树后，开始第四步——布局。

第四步，在渲染树上，根据屏幕（viewport）的尺寸，计算每个节点的坐标及宽高。

第五步，绘制，将每个节点绘制为屏幕上的实际像素，包括文本、颜色、边框、阴影等等。

# JavaScriptCore

解释执行 JavaScript 代码的引擎自 JavaScript 诞生起就有，不断演进发展，比如谷歌有 V8，对于 iOS 开发者来说，只要深入理解苹果公司的 JavaScriptCore 框架就可以了。

iOS 7（2013），苹果公司将 JavaScriptCore 框架引入 iOS。正是由于 JavaScriptCore 的桥梁作用，出现了很多基于 JavaScriptCore 开发 App 的框架 ，比如 [Cordova](https://cordova.apache.org/)，[ionic](https://github.com/ionic-team/ionic-framework)（2013）、[React Native](https://github.com/facebook/react-native)（2015）、[Weex](https://github.com/apache/incubator-weex)（2016）、小程序（2017）等框架。

# 弱网优化

弱网优化需要解决的核心问题有两点：

1. 移动网络环境如此复杂，我们如何确定当下就是弱网环境。
2. 如何提升弱网下的成功率，降低弱网下的时延，进而提升用户的网络体验。

弱网定义的指标：RTT、信号强度、吞吐量、带宽时延乘积。

对于不同的产品，影响网络质量的指标是一样的，但对于每个指标的阈值是不一样的，因为这包含着业务场景，比如抖音是视频类网络传输，微信是长连接数据传输，淘宝是文本图片类数据传输。

被动检测：连接成功时看 RTT、吞吐量，超过阈值时判定弱网；连接失败次数大于 2 次。

主动检测：dns 查询和 ping。
