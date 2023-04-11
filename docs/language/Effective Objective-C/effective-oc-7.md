# System Frameworks

## 47. System Frameworks

- NS 前缀的是 `Foundation` 框架。
- UI 前缀的是 `UIKit` 框架。
- CF 前缀的是 `CoreFoundation` 框架。

`CoreFoundation` is another important framework, a C API that mirrors much of the functionality of the `Foundation` framework. A feature known as **toll-free bridging** allows seamless casting from the C data structures of `CoreFoundation` to the Objective-C objects of Foundation, and vice versa.

| Framework     | Description                                                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| CFNetwork     | provides C-level networking facilities for talking to networks                                                                  |
| CoreAudio     | provides a C-level API for interfacing with audio hardware on a device                                                          |
| AVFoundation  | provides Objective-C objects for dealing with audio and video playback and recording                                            |
| CoreData      | provides Objective-C interfaces for persisting objects to a database                                                            |
| CoreText      | provides a C interface for high-performance text typesetting and rendering                                                      |
| CoreAnimation | written in Objective-C and provides the tools that the UI frameworks use to render graphics and perform animations.             |
| Core Graphics | written in C and provides data structures and functions that are essential for 2D rendering. e.g `CGRect`, `CGSize`, `CGPoint`. |

Often, you will need to drop down to use C-level APIs. APIs written in C benefit from the speed improvement of bypassing the Objective-C runtime. Of course, more care needs
to be taken with memory management in those APIs, since ARC is available only to Objective-C objects.

## 48: Prefer Block Enumeration to for Loops

## 49: Use Toll-Free Bridging for Collections with Custom Memory-Management Semantics

Toll-free bridging allows you to cast between Objective-C classes defined in Foundation and C data structures defined in CoreFoundation and vice versa.

```objc
NSArray *anNSArray = @[@1, @2, @3, @4, @5];
CFArrayRef aCFArray = (__bridge CFArrayRef)anNSArray;
NSLog(@"Size of array = %li", CFArrayGetCount(aCFArray));
```

CFArray is referenced by a CFArrayRef, which is a pointer to a struct \_\_CFArray. This struct is manipulated by using such functions as CFArrayGetCount to obtain the size of the array. This is distinct from its Objective-C counterpart, where you create an NSArray object and call methods, such as count, on that object to obtain the size of the array. （函数式编程与面向对象方法的区别）

For example, NSMutableDictionary copies its keys and retains its values by default. What if the objects you want to use as keys cannot be copied? It will result in a runtime error like this:

```
Terminating app due to uncaught exception 'NSInvalidArgumentException',
reason: '-[EOCClass copyWithZone:]: unrecognized selector sent to instance 0x7fd069c080b0'
```

By dropping down to the CoreFoundation level and creating the dictionary there, you can alter the memory-management semantics and create a dictionary that retains rather than copies the keys. Casting this through toll-free bridging allows you to end up with an Objective-C collection that has custom memory-management semantics.

## 50: Use NSCache Instead of NSDictionary for Caches

当遇到缓存图片这样的需求时，我们可以使用 NSDictionary 来达到目的，但 NSCache 是更好的选择。

一、自动清理内存，且采用 LRU 策略。The benefit of NSCache over an NSDictionary is that as system memory becomes full, the cache is automatically pruned. An NSCache will also prune the least recently used objects first.

二、持有 key 而不是拷贝它。Also, an NSCache does not copy keys but rather retains them because often, the key will be an object that does not support copying.

三、线程安全。NSCache is thread safe. This is usually useful for a cache because you may want to read from it in one thread, and, if a certain key doesn’t exist, you may download the data for that key. The callbacks for downloading may be in a background thread, so you end up adding to the cache in this other thread.

```objc
#import <Foundation/Foundation.h>

// Network fetcher class
typedef void(^EOCNetworkFetcherCompletionHandler)(NSData *data);

@interface EOCNetworkFetcher : NSObject
- (id)initWithURL:(NSURL*)url;
- (void)startWithCompletionHandler:(EOCNetworkFetcherCompletionHandler)handler;
@end

// Class that uses the network fetcher and caches results
@interface EOCClass : NSObject
@end

@implementation EOCClass {
    NSCache *_cache;
}

- (id)init {
    if (self = [super init]) {
        _cache = [NSCache new];
        // Cache a maximum of 100 URLs
        _cache.countLimit = 100;
        // The size in bytes of data is used as the cost, * so this sets a cost limit of 5MB.
        _cache.totalCostLimit = 5 * 1024 * 1024;
    }
    return self;
}

- (void)downloadDataForURL:(NSURL*)url {
    NSData *cachedData = [_cache objectForKey:url];
    if (cachedData) {
        // Cache hit
        [self useData:cachedData];
    } else {
        // Cache miss
        EOCNetworkFetcher *fetcher =
        [[EOCNetworkFetcher alloc] initWithURL:url];
        [fetcher startWithCompletionHandler:^(NSData *data){
            [_cache setObject:data forKey:url cost:data.length];
            [self useData:data];
        }];
    }
}
@end
```

## 51: Keep load and initialize Implementations Lean

`+ (void)load`: is called once and only once for **every class and category** that is added to the runtime.

`+ (void)initialize`: is called on every class, once and only once, before the class is used.

An important thing to note is that `load` does not follow the normal inheritance rules for methods. A class that does not implement `load` is not called, regardless of whether any of its superclasses do. Also, `load` can appear in a category and the class itself. Both implementations will be called, with the class’s coming before the category’s.

`initialize` is sent just like any other message; if a class doesn’t implement it but its superclass does, that implementation will be run.

## 52: Remember that NSTimer Retains Its Target
