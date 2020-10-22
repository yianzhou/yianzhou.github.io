---
title: "音视频基础知识"
categories: [Apple]
---

# 音频

声音被看成是一种波动的能量，主要用三个参数表征：频率（单位时间内的振动次数，单位为 Hz）、振幅（发声物体在震动时，偏离中心位置的幅度）、波形（声波的波形形状决定了声音的音色）

![image]({{"/assets/images/violin_overtones-658e1098.png"}})

声音的数字化包括了三个基本过程：

- 采样：将麦克风转化过来的模拟电信号以某一频率进行离散化的样本采集。采样频率越高，音质越好。
- 量化：将采集到的样本电压或电流值进行等级量化处理。量化深度越高，音质越好。
- 编码：将量化值变换成二进制表示，并存储。单位时间内音频数据的比特容量称为音频流码率（比特率）。

由于采样频率不够导致的采集波形与原始波形不吻合，成为低频失真。根据 Nyquist 定理，采样频率至少是录制的最高频率的两倍。

量化深度一般用 bit 来衡量。16 bits 是指把纵坐标分成 2^16 = 65536 份。

用不同的编码方式进行编码，存储容量也不一样，解码所需要的时间也不一样。

# 图像

图像的基本属性包括分辨率、颜色深度、颜色模型。

- 分辨率
- 颜色深度：一幅图像中可使用的颜色数的最大值。目前的显示设备只能显示 RGB 色彩即 2^24 种颜色。
- 颜色模型：RGB、CMYK、HSB、YUV（YIQ）、CIE Lab

光进入视觉通过以下 3 种形式：光源、透射光、反射光。人眼受到可见光谱范围内的刺激后，通过神经的传导，产生色彩的感觉。

图像按照在计算机中显示时不同的生成方式，可以分为矢量图和点位图。矢量图转换为点位图采用光栅化技术（Rasterizing），点位图转换为矢量图用跟踪技术（Tracing）。

Y 表示亮度，UV 是构成彩色的两个分量。4:2:2 YUV 表示亮度分量用 4 位表示，每 2\*2 个相邻像素的 U、V 值分别用相同的一个值表示。

使用 YUV  模型一是为了兼容黑白电视；二是利用人眼对彩色细节的分辨率远低于对亮度细节的分辨率，压缩图像以减少存储容量和传输大小。由于现在所有的显示器都采用 RGB 值来驱动，这就要求在显示每个像素之前，须要把彩色分量值转换成 RGB 值。

YCrCb 与 YUV 的定义是相同的。YUV 适用于 PAL 和 SECAM 彩色电视制式的模拟视频图像表示，YCrCb 适用于数字电视和计算机数字视频图像的表示。

在图像处理中，颜色通道是用来保存图像颜色信息的，RGB 图有 3 个颜色通道；Alpha 通道是用来保存选区的，将选取作为 8 位的灰度图像来保存。

# 视频

我们看到视频是因为人眼的视觉暂留特性。

电视的传输过程：将摄像机输出的 RGB 信号转换为 YUV 信号，传输后重新还原成 RGB 信号显示。

目前世界上流行的彩色电视制式 NTSC、PAL、SECAM，他们的主要区别是扫描频率、周期、颜色模型的不同。

# FFmpeg

The [FFmpeg project](https://ffmpeg.org/about.html) tries to provide the best technically possible solution for developers of applications and end users alike. 为终端用户和开发人员，提供相同程度的，最佳的技术方案。（也就是说，它即是一套开发框架，也是一套终端工具）

FFmpeg Tools (for end users):

- ffmpeg: 格式转换
- ffplay: 媒体播放
- ffprobe: 流媒体分析器

FFmpeg Libraries for developers:

- libavutil 工具类
- libavcodec 编解码
- libavformat 格式转换
- libavdevice 输入/输出设备
- libavfilter 滤镜
- libswscale 图像处理
- libswresample 音频处理

# 使用 Metal 渲染视频并播放

平时我们用到的播放框架：AVPlayer, ijkplayer ...

使用 GPU 能力的接口会提到“硬件加速”，这部分工作是由 GPU 而不是 CPU 完成的，比如 AVFoundation 中的人脸识别、编解码中的“硬解码”。

视频播放的两个步骤：解码、渲染

[Video Toolbox](https://developer.apple.com/documentation/videotoolbox), Work directly with hardware-accelerated video encoding and decoding capabilities.

美颜、滤镜会涉及使用 OpenGL ES

shading language 是视觉团队写的，我们做的更多是对接的工作，需要了解原理。

GPUImage 提供了 OpenGL ES 和 Metal 的封装，让 iOS 开发者更方便地使用。

视频文件 mp4 -> 提取其中的图像文件 h264 -> 解码成内存中的数据 -> 渲染

图片使用 RGB，视频使用 YUV，为什么？

一张 RGB 图片，1280\*720，每个像素需要记录 RGB 颜色信息，每种颜色范围是 0-255，需要 8 bit，也就是一个字节，一个像素点就需要 3 个字节。那么所需的存储空间是 1280*720\*3/1024/1024 = 2.63 MB。

我们平时用的是压缩格式的图片，比如 png、jpg。

人眼对于亮度的分辨能力，比对于色度的分辨能力要高得多。

YUV 采用明亮度和色度来表示像素的颜色。Y 表示明度（Luminance），U 和 V 表示色度（Chrominance），色度包括色调和饱和度。

和 RGB 类似，YUV 图像的每个像素点都包括了 YUV 分量，但不同的是，它的 Y 和 UV 分量是可以分离的。只有 Y 分量也可以显示一个图像，只不过是黑白的。根据不同的采样格式，可以若干个 Y 分量共用一个 UV 分量。

- YUV 4:4:4 YUV 三个分量的采样比例相同，每个像素的三个分量信息都是 8 bit，与 RGB 占用空间一样。
- YUV 4:2:2 Y 和 UV 按照 2:1 的比例采样。每个像素点都采集 Y 分量，而 UV 分量则是间隔一个采集。两个像素点共用一个 UV 分量。
- YUV 4:2:0 （业界常用的）第一行扫描时，YU 按照 2:1 采样；第二行扫描时，YV 按照 2:1 采样。

![img](/assets/images/ffb45e600338703b703cd59308e19bdd.png)

播放视频时，需要将 YUV 信号转换为 RGB 颜色，每一个像素点都要进行转换计算。