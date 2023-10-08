# WWDC23

## [Explore media formats for the web - WWDC23 - Videos - Apple Developer](https://developer.apple.com/videos/play/wwdc2023/10122/)

The incumbent formats are GIF, JPEG, and PNG.

- GIF: It does not support a full color palette being limited to 8 bits color at a time. Since it's a lossless format, file sizes can be quite large, making it less suitable for larger animations.
- JPEG: A great feature is progressive loading. It's a lossy format.
- PNG: supports transparency. It's lossless and doesn't compress as well as JPEG, so it's not very suitable for big images with lots of color. Like GIF, it was designed to replace, it supports animations, though I've rarely seen those in the wild.

Safari 17 supports an additional four extra modern formats.

**WebP** was added to Safari 14 and macOS Big Sur. This is a modern image format that uses advanced compression algorithms to achieve smaller file sizes without sacrificing image quality. WebP files are typically smaller than those earlier image formats. WebP lets you do animations with video-like quality, and so use it where it's a bad idea to use GIF due to their size or lack of colors.

One exciting addition to Safari 17 is **JPEG-XL**. JPEG-XL uses a new compression algorithm called "Modular Entropy Coding" that allows for greater flexibility in adjusting the compression ratio. A key feature of JPEG-XL is that you can losslessly convert, that is, not occur any data loss going from your existing JPEG files to JPEG-XL, all while significantly reducing their size by up to 60%.

**AVIF** is another modern image format that uses the AV1 video codec to achieve high compression rates without sacrificing image quality. Widely supported across all browsers, it is well suited for live photos and supports up to 12 bits color depth. It also has the broadest support, and you should include it as fallback. AVIF can be up to ten times smaller than JPEG.

In Safari 17, we added support for **HEIC**, also known as **HEIF**. It's an image format that uses the HEVC video codec compression algorithm to achieve small file sizes. But since it's not widely supported on other platforms, you will probably only want to use it as an alternative format. This is the format used by iPhones and iPad to save photos, so you can directly handle photo uploaded from your iPhone with no conversion. If you intend to display images using a WKWebView inside your app, this is the format you should be using, as it's hardware accelerated and can be rendered quickly and efficiently.

You don't have to choose!

```html
// Support existing and modern image formats
<picture>
  <source srcset="images/large/sophie.heic" type="image/heic" />
  <source srcset="images/large/sophie.j×]" type="image/jx]" />
  <source srcset="images/large/sophie.avif" type="image/avif" />
  <img src="images/large/sophie.jpeg" />
</picture>
```

In the early 2000s, browser plugins like Flash and QuickTime emerged as a popular way to add video to websites. And in 2010, HTML5 was introduced, which made it possible to embed video directly into webpages without the need for those plugins.

**HTTP Live Streaming (HLS)** was introduced by Apple in 2009. One of the key features of HLS is its support for adaptive bitrate streaming, which allows for the delivery of the best possible video quality based on the user's internet connection speed and device capabilities.

![img](/img/3D93C2F7-58CC-43BF-B86D-AF0FAD56208B.png)

Adaptive streaming in HLS works by dividing the video content into small chunks or segments, typically between two and ten seconds in length. Each segment is encoded at multiple bitrates, and these different bitrate versions are made available to the client via a manifest file in the form of an **M3U8** multi-variant playlist. HLS does a brilliant job at selecting the best suitable variant. It's very simple to use and is the best solution for the end users. Unfortunately, even today, only Safari supports it. Web developers wanted more control and more flexibility, such as the selection and transfer of media data, or the ability to play DRMed content on desktop.

> 苹果开发的“HTTP 直播流”（HTTP Live Streaming，HLS）技术本身是一个协议，而 Edge 在 Windows 10 正式版发行之后确定支持了这项协议。直到目前为止，非苹果的浏览器只有 Chrome 和 Edge 支持了 HLS 技术，而且在 Chrome 上实现 HLS，还需要用户编写额外的 js 脚本。因此，只有 Edge 完全具备使用 HLS 进行网络转播的能力。

And so in 2013, the **Media Source Extension (MSE)** was published by the W3C body. It is a low-level toolkit that allows for adaptive streaming by giving the webpage more control and responsibilities for managing buffering and resolution. Overall, MSE has been a game changer for web developers. It has enabled the development of high-quality streaming experiences on the web and is now the most used web video technology. MSE has some drawbacks. It isn't particularly good at managing of buffer levels, the timing and amount of network access, and media variant selection. These inefficiencies have largely been immaterial on relatively powerful devices like modern general purpose computers. Power usage on mobile devices was much higher than with the HLS native player, and so MSE was never made available on iPhones because we couldn't achieve with MSE the required battery savings.

The new **Managed Media Source** API makes it easier for media website authors to support streaming media playback on constrained capability devices, all while allowing User Agents to react to changes in available memory and networking capabilities.

## [Build robust and resumable file transfers - WWDC23 - Videos - Apple Developer](https://developer.apple.com/videos/play/wwdc2023/10006/)

下载、上传都可以断点续传

![img](/img/F1CAD7FF-EFD1-4CCA-8A36-25882E980D63.png)

```swift
// Pausing and resuming a URLSessionUploadTask
let uploadTask = session.uploadTask(with: request, fromFile: fileURL)
uploadTask.resume()
guard let resumeData = await uploadTask.cancelByProducingResumeData() else {
    // Upload cannot be resumed return
}

let newUploadTask = session.uploadTask(withResumeData: resumeData)
newUploadTask.resume()

// Retrieving resume data on error
do {
    let (data, response) = try await session.upload(for: request, fromFile: fileURL)
} catch let error as URLError {
    guard let resumeData = error.uploadTaskResumeData else {
        // Upload cannot be resumed
        return
    }
}
```

如何使用 BackgroundSession
