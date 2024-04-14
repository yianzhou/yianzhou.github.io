# C++实战 30 天

## socket

socket 仅仅是一个文件描述符。Linux 程序在执行任何形式的 I/O 操作时，都是在读取或者写入一个文件描述符。一个文件描述符只是一个和打开的文件相关联的整数，它的背后可能是一个硬盘上的文件、键盘、显示器，甚至是一个网络连接。

我们可以通过 `socket()` 函数来创建一个网络连接，或者说打开一个网络文件，`socket()` 的返回值就是文件描述符：

`int sockfd = socket(AF_INET, SOCK_STREAM, 0); // 客户端和服务端都通过同样的方法创建socket`

当你在服务器端创建一个 socket 后，你会执行以下步骤：

- `bind()`: 将 socket 绑定到一个本地地址和端口上
- `listen()`: 使得 socket 进入被动监听状态，等待客户端的连接请求

在 Day2 的例子中，在服务器上通过 `accept` 建立与客户端的连接，得到客户端 socket。之后，我们就可以使用普通的文件操作函数来传输数据了。

`int clnt_sockfd = accept(sockfd, (sockaddr *)&clnt_addr, &clnt_addr_len);`

用 `read()` 读取从客户端 socket 传来的数据：

`ssize_t read_bytes = read(clnt_sockfd, buf, sizeof(buf));`

用 `write()` 向客户端 socket 写入数据：

`write(clnt_sockfd, buf, sizeof(buf));`

## epoll

Day1 的程序中建立了 client-server 连接，Day2 我们完成了数据的接收与发送。但这个服务器只能允许一个客户端连接，接下来要解决的是多个客户端并发连接问题，即多路复用。

在 Linux 服务器编程中，select, poll, 和 epoll 是三种 I/O 多路复用的技术。它们允许程序监视多个 socket，以便知道是否可以对其进行读或写操作。epoll 是前两者的改进，也是最佳选择。

> select 的主要限制是它支持的文件描述符数量有上限（通常是 1024）。poll 解决了文件描述符数量限制问题，但在大量文件描述符的情况下，效率仍然不高，因为它需要遍历整个 pollfd 数组来检查哪些文件描述符有事件发生。epoll 使用一种称为事件通知的机制，而不是轮询所有文件描述符。

在 macOS 上没有 epoll 的实现，macOS 上类似的内核通知机制是 kqueue。
