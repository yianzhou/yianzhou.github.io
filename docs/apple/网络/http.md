# HTTP

## 范围请求

[HTTP range requests - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Range_requests)

An HTTP **range request** asks the server to send only a portion of an HTTP message back to a client.

Range requests are useful for download managers that let the user pause and resume the download.

判断服务器是否支持：If an HTTP **response** includes the `Accept-Ranges` header and its value is anything other than `none`, then the server supports range requests.

没有 `Accept-Ranges` 字段或者 `Accept-Ranges` 字段值为 `none`，均不支持。**A download manager might disable its pause button in that case.**

You can perform a manual check by issuing a **HEAD request** with a tool like cURL.

```bash
curl -I http://i.imgur.com/z4d4kWk.jpg

curl -I https://www.youtube.com/watch?v=EwTZ2xpQwpA
```

If the server supports range requests, then by including the `Range` header in your HTTP request, you can specify which part or parts of the document you want the server to return.

```bash
curl https://i.imgur.com/z4d4kWk.jpg -i -H "Range: bytes=0-1023"

HTTP/2 206
last-modified: Thu, 02 Feb 2017 11:15:53 GMT
etag: "18c50e1bbe972bdf9c7d9b8f6f019959"
content-type: image/jpeg
accept-ranges: bytes
content-range: bytes 0-1023/146515
content-length: 1024
```

The server responses with the **206** Partial Content status.

The **Content-Length** header now indicates the size of the requested range (and not the full size of the image).

The **Content-Range** response header indicates where in the full resource this partial message belongs.

如果请求分片下载，但是原资源已经被更改了怎么办呢？When resuming to request more parts of a resource, you need to guarantee that the stored resource has not been modified since the last fragment has been received. The **If-Range** HTTP request header makes a range request conditional. This header can be used either with a **Last-Modified** validator, or with an **ETag**, but not with both.

The **ETag** (or entity tag) HTTP response header is an identifier for a specific version of a resource. Etags are similar to fingerprints.

实战发现，有些网站响应头带了 `Accept-Ranges`，却不支持断点续传，例如[这个](https://www.bookben.net/)。因此浏览器的逻辑是，首次请求时，若响应头不带 `Content-Length`，判断为不支持；再次请求时，请求头带 `Range`，若响应头没有 `Content-Range`，则同样表示不支持断点续传。