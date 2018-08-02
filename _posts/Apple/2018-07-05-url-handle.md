---
title:  "URL 的处理"
categories: [Apple]
---

Universal URL: <https://example.com/p?connect=true&page=1>

```
url.scheme = "https"
url.host = "example.com"
url.path = "/p"
url.relativePath = "/p"
url.pathComponent= ["/", "p"]
url.lastPathComponent = "p"
url.query = "connect=true&page=1”
url.fragment = nil
```

Custom URL scheme: mailto://apple.com/support?message=hello
```
url.scheme : "mailto"
url.host : "apple.com"
url.path : "/support"
url.relativePath : "/support"
url.pathComponent= ["/", "support"]
url.lastPathComponent = "support"
url.query: "message=hello"
url.fragment = nil
```

获取 query 中的参数：
{% highlight Swift %}
if let components = URLComponents(url: url, resolvingAgainstBaseURL: true), 
    let queryItems = components.queryItems, 
    !queryItems.isEmpty {
    print(item.name, item.value)
}
{% endhighlight %}
