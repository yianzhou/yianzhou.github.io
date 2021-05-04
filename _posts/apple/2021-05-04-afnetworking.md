---
title: "AFNetworking"
categories: [Apple]
---

<!-- prettier-ignore -->
* Do not remove this line (it will not be displayed)
{:toc}

> [AFNetworking](https://github.com/AFNetworking/AFNetworking)

`AFURLSessionManager` creates and manages an `NSURLSession` object based on a specified `NSURLSessionConfiguration` object.

`AFHTTPSessionManager` is a subclass of `AFURLSessionManager` with convenience methods for making HTTP requests (by `baseURL` and relative paths).

> [HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)

Create and resume a task:

<!-- markdownlint-disable -->
<div class="mermaid">
sequenceDiagram
    Client ->>+ AFHTTPSessionManager: GET:
    AFHTTPSessionManager ->> AFHTTPSessionManager: dataTaskWithHTTPMethod:
    AFHTTPSessionManager ->>+ AFHTTPRequestSerializer: requestWithMethod:
    AFHTTPRequestSerializer ->> AFHTTPRequestSerializer: requestBySerializingRequest:
    AFHTTPRequestSerializer -->> AFHTTPRequestSerializer: NSURLRequest
    AFHTTPRequestSerializer -->>- AFHTTPSessionManager: NSMutableURLRequest
    AFHTTPSessionManager ->>+ AFURLSessionManager: dataTaskWithRequest:
    AFURLSessionManager ->>+ NSURLSession: dataTaskWithRequest:
    NSURLSession ->>- AFURLSessionManager: NSURLSessionDataTask
    AFURLSessionManager ->> AFURLSessionManager: addDelegateForDataTask:
    AFURLSessionManager ->> AFURLSessionManager: setDelegate:forTask:
    AFURLSessionManager -->>- AFHTTPSessionManager: NSURLSessionDataTask
    AFHTTPSessionManager -> AFHTTPSessionManager: [dataTask resume]
    AFHTTPSessionManager -->>- Client: NSURLSessionDataTask
</div>
<!-- markdownlint-restore -->

Data task did completed:

<!-- markdownlint-disable -->
<div class="mermaid">
sequenceDiagram
</div>
<!-- markdownlint-restore -->