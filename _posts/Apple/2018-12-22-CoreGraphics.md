---
title:  "Core Graphics"
categories: [Apple]
---

Core Graphics, also known as Quartz 2D, is an advanced, two-dimensional drawing engine available for iOS, tvOS and macOS application development. Quartz 2D provides low-level, lightweight 2D rendering with unmatched output fidelity regardless of display or printing device. Quartz 2D is resolution- and device-independent.

A bitmap image (or sampled image) is an array of pixels (or samples). Each pixel represents a single point in the image. JPEG, TIFF, and PNG graphics files are examples of bitmap images. Each sample in a bitmap contains one or more color components in a specified color space, plus one additional component that specifies the alpha value to indicate transparency. Each component can be from 1 to as many as 32 bits.

> UIImage (UIKit): An object that manages image data in your app.
>
> CIImage (Core Image): A representation of an image to be processed or produced by Core Image filters. You use `CIImage` objects in conjunction with other Core Image classes—such as `CIFilter`, `CIContext`, `CIVector`, and `CIColor`—to take advantage of the built-in Core Image filters when processing images. You can create `CIImage` objects with data supplied from a variety of sources, including Quartz 2D images, Core Video image buffers (`CVImageBuffer`), URL-based objects, and `NSData` objects.
>
> CGImage (Core Graphics): A bitmap image or image mask.

