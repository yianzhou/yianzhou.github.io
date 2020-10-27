---
title: "Alamofire"
categories: [Apple]
---

<!-- prettier-ignore -->
* Do not remove this line (it will not be displayed)
{:toc}

# [URL Loading System](https://developer.apple.com/documentation/foundation/url_loading_system)

`URLSession` You use a URLSession instance to create one or more URLSessionTask instances. Your app creates one or more URLSession instances, each of which coordinates a group of related data-transfer tasks. For example, if you’re creating a web browser, your app might create one session per tab or window, or one session for interactive use and another for background downloads.

`URLSessionConfiguration` To configure a session, you use a URLSessionConfiguration object. 四种基本类型：`.shared, .default, .ephemeral, .background(identifier)`

It is important to configure your URLSessionConfiguration object appropriately **before** using it to initialize a session object. Session objects make a copy of the configuration settings you provide and use those settings to configure the session. Once configured, the session object ignores any changes you make to the URLSessionConfiguration object. If you need to modify your transfer policies, you must update the session configuration object and use it to create a new URLSession object. 注意，这一点和 SDWebImage 里设置 SDWebImageContext 的逻辑是一样的，调用传参后，字典就被拷贝了。

`URLSessionTask` Within a session, you create four types of tasks: Data tasks (small interaction, into memory), Upload tasks (support background, into disk), Download tasks (support background), WebSocket tasks.

`URLSessionDelegate` The session object keeps a strong reference to the delegate until your app exits or explicitly invalidates the session. If you don’t invalidate the session, your app leaks memory until the app terminates. 记得调用 invalidate

# Alamofire Classes

## Request

`Request` is the common superclass of all Alamofire request types and provides common state, delegate, and callback handling.

```swift
@Protected fileprivate var mutableState = MutableState()
```

A [property wrapper](<(https://docs.swift.org/swift-book/LanguageGuide/Properties.html#ID617)>) adds a layer of separation between code that manages how a property is stored and the code that defines a property.

`@Protected`, property wrapper syntax, is just syntactic sugar for a property with a getter and a setter.

`Protected` 这个类使用了 `os_unfair_lock_t` 对资源进行加锁和解锁。

`$mutableState` 是 Property Wrappers 中的 **projected value**。

## Session

`Session` creates and manages Alamofire's `Request` types during their lifetimes. It also provides common functionality for all `Request`s, including queuing, interception, trust management, redirect handling, and response cache handling.

`Session` 内部使用了 3 个**串行**队列：`rootQueue`（内部回调和状态切换）, `requestQueue`（默认以 rootQueue 为 target）, `serializationQueue`（（默认以 rootQueue 为 target）；[DispatchQueue 设置 target 的意义](https://developer.apple.com/documentation/dispatch/dispatchobject/1452989-settarget)

# Chainable Request / Response Methods

```swift
public let AF = Session.default // 框架内的声明，调用默认构造函数

let dataRequest: DataRequest = AF.request("https://httpbin.org/get").responseData { (response) in
    print(response.data)
}

// 创建 `Request` 子类并调用 perform(request) -> performDataRequest(r) -> performSetupOperations(r)

func performSetupOperations(for request: Request, convertible: URLRequestConvertible) {
    // 判断当前队列
    dispatchPrecondition(condition: .onQueue(requestQueue))

    // 创建 task
    rootQueue.async { self.didCreateURLRequest(initialRequest, for: request) }
}

@discardableResult
public func responseData(queue: DispatchQueue = .main,
                            dataPreprocessor: DataPreprocessor = DataResponseSerializer.defaultDataPreprocessor,
                            emptyResponseCodes: Set<Int> = DataResponseSerializer.defaultEmptyResponseCodes,
                            emptyRequestMethods: Set<HTTPMethod> = DataResponseSerializer.defaultEmptyRequestMethods,
                            completionHandler: @escaping (AFDataResponse<Data>) -> Void) -> Self {
    response(queue: queue,
                responseSerializer: DataResponseSerializer(dataPreprocessor: dataPreprocessor,
                                                        emptyResponseCodes: emptyResponseCodes,
                                                        emptyRequestMethods: emptyRequestMethods),
                completionHandler: completionHandler)
}

@discardableResult
public func response<Serializer: DataResponseSerializerProtocol>(queue: DispatchQueue = .main,
                                                                    responseSerializer: Serializer,
                                                                    completionHandler: @escaping (AFDataResponse<Serializer.SerializedObject>) -> Void)
    -> Self {
    appendResponseSerializer {
        // Start work that should be on the serialization queue.
        // 计算耗时
        let start = ProcessInfo.processInfo.systemUptime
        let result: AFResult<Serializer.SerializedObject> = Result {
            try responseSerializer.serialize(request: self.request,
                                                response: self.response,
                                                data: self.data,
                                                error: self.error)
        }.mapError { error in
            error.asAFError(or: .responseSerializationFailed(reason: .customSerializationFailed(error: error)))
        }

        let end = ProcessInfo.processInfo.systemUptime
        // End work that should be on the serialization queue.

        self.underlyingQueue.async {
            let response = DataResponse(request: self.request,
                                        response: self.response,
                                        data: self.data,
                                        metrics: self.metrics,
                                        serializationDuration: end - start,
                                        result: result)

            self.eventMonitor?.request(self, didParseResponse: response)

            guard let serializerError = result.failure, let delegate = self.delegate else {
                self.responseSerializerDidComplete { queue.async { completionHandler(response) } }
                return
            }
        }
    }

    return self
}

func appendResponseSerializer(_ closure: @escaping () -> Void) {
    $mutableState.write { mutableState in
        mutableState.responseSerializers.append(closure)

        if mutableState.state == .finished {
            mutableState.state = .resumed
        }

        if mutableState.responseSerializerProcessingFinished {
            underlyingQueue.async { self.processNextResponseSerializer() }
        }

        if mutableState.state.canTransitionTo(.resumed) {
            // 启动 task ！
            underlyingQueue.async { if self.delegate?.startImmediately == true { self.resume() } }
        }
    }
}
```

# URL / JSON Parameter Encoding

## Swift: Encoding and Decoding Custom Types

The simplest way to make a type codable (encodable and decodable) is to declare its properties using types that are already Codable.

```swift
struct Landmark: Codable {
    var name: String
    var foundingYear: Int
    // Landmark now supports the Codable methods init(from:) and encode(to:),
}
```

Adopting Codable on your own types enables you to serialize them to and from any of the built-in data formats, and any formats provided by custom encoders and decoders. For example, the Landmark structure can be encoded using both the `PropertyListEncoder` and `JSONEncoder` classes, even though Landmark itself contains no code to specifically handle property lists or JSON.

## ParameterEncoder

`protocol ParameterEncoder` 协议，将请求参数编码到 URLRequest 里。

`class JSONParameterEncoder: ParameterEncoder` 使用 Foundation 的 JSONEncoder 对参数进行编码，并设置到 httpBody 中。

```swift
let encoder = JSONEncoder()
let data = try encoder.encode(parameters)
request.httpBody = data
if request.headers["Content-Type"] == nil {
    request.headers.update(.contentType("application/json"))
}
```

`class URLEncodedFormParameterEncoder: ParameterEncoder` 使用自实现的 URLEncodedFormEncoder 对参数进行编码。get 请求默认设置到 URL query string 中；post 请求默认设置到 httpBody 中。

```swift
let encoder = URLEncodedFormEncoder()
if destination.encodesParametersInURL(for: method),
    var components = URLComponents(url: url, resolvingAgainstBaseURL: false) {
    let query: String = try Result<String, Error> { try encoder.encode(parameters) }
        .mapError { AFError.parameterEncoderFailed(reason: .encoderFailed(error: $0)) }.get()
    let newQueryString = [components.percentEncodedQuery, query].compactMap { $0 }.joinedWithAmpersands()
    components.percentEncodedQuery = newQueryString.isEmpty ? nil : newQueryString
    request.url = newURL
} else {
    if request.headers["Content-Type"] == nil {
        request.headers.update(.contentType("application/x-www-form-urlencoded; charset=utf-8"))
    }
    request.httpBody = try Result<Data, Error> { try encoder.encode(parameters) }
        .mapError { AFError.parameterEncoderFailed(reason: .encoderFailed(error: $0)) }.get()
}
```

## ParameterEncoding

与 ParameterEncoder 类似，两者的方法签名：

```swift
// ParameterEncoder 可以将一个 URLRequest 实例，附上编码后的参数
func encode<Parameters: Encodable>(_ parameters: Parameters?, into request: URLRequest) throws -> URLRequest
// ParameterEncoding 可以将一个 URLString，加上参数，一起编码成 URLRequest
func encode(_ urlRequest: URLRequestConvertible, with parameters: Parameters?) throws -> URLRequest
```

## 调用流程

```swift
let dataRequest: DataRequest = AF.request("https://httpbin.org/get", parameters: ["page": 1])

// 创建 `Request` 子类并调用 perform(request) -> performDataRequest(r) -> performSetupOperations(r)

func performSetupOperations(for request: Request, convertible: URLRequestConvertible) {
    let initialRequest: URLRequest
    initialRequest = try convertible.asURLRequest()
    try initialRequest.validate()
}

func asURLRequest() throws -> URLRequest {
    var request = try URLRequest(url: url, method: method, headers: headers)
    try requestModifier?(&request)
    // 这里的 encoder 就是 URLEncodedFormParameterEncoder
    return try parameters.map { try encoder.encode($0, into: request) } ?? request
}
```
