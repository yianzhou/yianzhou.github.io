---
title: "AFNetworking"
categories: [Apple]
---

<!-- prettier-ignore -->
* Do not remove this line (it will not be displayed)
{:toc}

# URL Loading System

> [URL Loading System](https://developer.apple.com/documentation/foundation/url_loading_system)

You use a `URLSession` instance to create one or more `URLSessionTask` instances.

To configure a session, you use a `URLSessionConfiguration` object.

- `.shared`
- `.default`
- `.ephemeral`
- `.background(identifier)`

It is important to configure your `URLSessionConfiguration` object appropriately before using it to initialize a session object. Once configured, the session object ignores any changes you make to the configuration object. If you need to modify your transfer policies, you must update the session configuration object and use it to create a new `URLSession` object.

`URLSessionDelegate` The session object keeps a strong reference to the delegate until your app exits or explicitly invalidates the session. If you don’t invalidate the session, your app leaks memory until the app terminates.

`URLCache`: An object that maps `URLRequest` objects to `CachedURLResponse` objects. `URLCache` is thread safe.

```objc
NSURLCache *URLCache = [[NSURLCache alloc] initWithMemoryCapacity:4 * 1024 * 1024 diskCapacity:20 * 1024 * 1024 diskPath:nil];
[NSURLCache setSharedURLCache:URLCache];
```

# AFURLSessionManager

`AFURLSessionManager` creates and manages an `NSURLSession` object based on a specified `NSURLSessionConfiguration` object, which conforms to `<NSURLSessionTaskDelegate>`, `<NSURLSessionDataDelegate>`, `<NSURLSessionDownloadDelegate>`, and `<NSURLSessionDelegate>`.

`AFHTTPSessionManager` is a subclass of `AFURLSessionManager` with convenience methods for making HTTP requests (by `baseURL` and elative paths).

<!-- markdownlint-disable -->
<div class="mermaid">
classDiagram
    AFURLSessionManager <|-- AFHTTPSessionManager
    class AFURLSessionManager {
        -NSURLSession *session
    }
</div>
<!-- markdownlint-restore -->