---
title:  "Effective Objective-C (7) System Frameworks"
categories: [Apple]
---

* Do not remove this line (it will not be displayed)
{:toc}

> AW.Effective.Objective-C.2.0

## 47. System Frameworks
* NS 前缀的是 `Foundation` 框架。
* UI 前缀的是 `UIKit` 框架。
* CF 前缀的是 `CoreFoundation` 框架。

`CoreFoundation` is another important framework, a C API that mirrors much of the functionality of the `Foundation` framework. A feature known as **toll-free bridging** allows seamless casting from the C data structures of `CoreFoundation` to the Objective-C objects of Foundation, and vice versa.

`NSLinguisticTagger` provides the ability to parse a string and find all the nouns, verbs, pronouns, and so on.

Framework | Description
------------ | -------------
CFNetwork | provides C-level networking facilities for talking to networks
CoreAudio | provides a C-level API for interfacing with audio hardware on a device
AVFoundation | provides Objective-C objects for dealing with audio and video playback and recording
CoreData | provides Objective-C interfaces for persisting objects to a database
CoreText | provides a C interface for high-performance text typesetting and rendering
CoreAnimation | written in Objective-C and provides the tools that the UI frameworks use to render graphics and perform animations.
Core Graphics | written in C and provides data structures and functions that are essential for 2D rendering. e.g `CGRect`, `CGSize`, `CGPoint`.

Often, you will need to drop down to use C-level APIs. APIs written in C benefit from the speed improvement of bypassing the Objective-C runtime. Of course, more care needs
to be taken with memory management in those APIs, since ARC is available only to Objective-C objects.

## 48: Prefer Block Enumeration to for Loops

## 49: Use Toll-Free Bridging for Collections with Custom Memory-Management Semantics

## 50: Use NSCache Instead of NSDictionary for Caches

## 51: Keep initialize and load Implementations Lean
`+ (void)load`: is called once and only once for every class and category that is added to the runtime. 

`+ (void)initialize`: is called on every class, once and only once, before the class is used.

Keep `initialize` methods for setting up global state that cannot be done at compile time.

The `load` method does not participate in overriding. The `initialize` method does participate in overriding, so it is usually best to check which class is being initialized.

## 52: Remember that NSTimer Retains Its Target