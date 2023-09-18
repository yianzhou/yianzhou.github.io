# AFNetworking

> [AFNetworking](https://github.com/AFNetworking/AFNetworking)

`AFURLSessionManager` creates and manages an `NSURLSession` object based on a specified `NSURLSessionConfiguration` object.

`AFHTTPSessionManager` is a subclass of `AFURLSessionManager` with convenience methods for making HTTP requests (by `baseURL` and relative paths).

> [HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)

Create and resume a task:

```mermaid
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
```

Data task did completed:

```mermaid
sequenceDiagram
    System ->> AFURLSessionManager: URLSession:task:didCompleteWithError:
    AFURLSessionManager ->> AFURLSessionManager: delegateForTask:
    AFURLSessionManager ->> AFURLSessionManagerTaskDelegate: URLSession:task:didCompleteWithError:
    AFURLSessionManagerTaskDelegate ->> AFHTTPResponseSerializer: responseObjectForResponse:data:error:
    AFHTTPResponseSerializer -->> AFURLSessionManagerTaskDelegate: id responseObject
    AFURLSessionManagerTaskDelegate ->> Client: completionHandler(responseObject)
```
