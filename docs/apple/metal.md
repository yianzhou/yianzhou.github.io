# Metal

[Metal 官方文档翻译](https://www.jianshu.com/p/0ab0a3823819)

## Metal and MetalKit

Metal：提供 GPU 的直接控制。

MetalKit：提供 `MTKView: UIView`，a MetalKit view automatically sets up and manages a continuous rendering loop that provides you with a 2D, displayable resource, commonly known as a **drawable**, for each frame.

When developing a Metal app, it’s often useful to separate your rendering loop into its own class.

A `MTKViewDelegate` object implements `drawInMTKView:` methods. The view calls the `drawInMTKView:` method whenever it’s time to render a new frame, as specified by the frame rate (for example, 60 FPS) set on the view’s `preferredFramesPerSecond` property. This callback is typically the main event that begins the execution of your rendering loop.

This rate is not guaranteed: the view will pick a closest frame rate that the display is capable of refreshing (usually 30 or 60 times per second). Also if our renderer spends more than 1/60th of a second in `-[AAPLRender drawInMTKView:]` the view will skip further calls until the renderer has returned from that long `-[AAPLRender drawInMTKView:]` call. In other words, the view will drop frames. So we should set this to a frame rate that we think our renderer can consistently maintain.

## Metal Objects

[Using a Render Pipeline to Render Primitives](https://developer.apple.com/documentation/metal/using_a_render_pipeline_to_render_primitives)

In this Devices and Commands sample, you learned how to write an app that uses Metal and issues basic rendering commands to the GPU.

A `MTLDevice` object represents a GPU.

The first object all apps need to interact with the GPU is a `MTLCommandQueue` object.

You use a `MTLCommandQueue` object to create and organize `MTLCommandBuffer` objects, ensuring that they’re sent to the GPU in the correct order. For every frame, a new `MTLCommandBuffer` object is created and filled with commands that are executed by the GPU.

A `MTLCommandBuffer` object coalesces different commands into a single submission, but they must first be encoded in a device-agnostic 与设备无关的 way using a `MTLCommandEncoder` object.

To create a `MTLRenderCommandEncoder` object, you must first create a `MTLRenderPassDescriptor` object. A MetalKit view creates a new `MTLRenderPassDescriptor` object for every frame, provided via the `currentRenderPassDescriptor` property.

Commands encoded into this `MTLRenderCommandEncoder` object render to the view’s drawable. By default, creating a `MTLRenderCommandEncoder` object implicitly encodes a clear command that the GPU executes before any other rendering commands.

You call the `presentDrawable:` method to tell Metal to wait for the GPU to finish rendering to a drawable before presenting it onscreen.

The GPU also doesn’t execute commands until `[commandBuffer commit];`. When the GPU begins execution, the drawable is cleared with a new color. When the GPU completes execution, the rendered drawable is presented onscreen.

![image](https://docs-assets.developer.apple.com/published/6aedb538f8/b5ff0489-1079-441a-8a24-8f8c75dd2b1e.png)

## Rendering Pipeline

In its most basic form, the pipeline receives vertices as input and renders pixels as output. This sample focuses on the three main stages of the pipeline: The vertex function and fragment function are programmable stages. The rasterization stage is fixed.

![image](https://docs-assets.developer.apple.com/published/a8fcc3ae6f/24096b5e-34f4-460d-a72b-ca5fb5ef51e5.png)

**Vertex** data is usually loaded from a file that contains 3D model data exported from specialized modeling software.

Vertex data, and 3D graphics data in general, is usually defined with **vector** data types, simplifying common graphics algorithms and GPU processing. This sample uses optimized vector data types provided by the [SIMD library](http://ermig1979.github.io/Simd/) to represent the triangle’s vertices.

Using SIMD data types in your Metal app ensures that memory layouts match exactly across CPU/GPU declarations and facilitates sending vertex data from the CPU to the GPU.

A [viewport](https://developer.apple.com/documentation/metal/mtlviewport) is a **3D area** with an x and y offset, a width and height, and near and far planes (for 3D contents).

### Vertex function

The main task of a **vertex function** (also known as a vertex shader) is to process incoming vertex data and map each vertex to a position in the viewport. This way, subsequent stages in the pipeline can refer to this viewport position and render pixels to an exact location in the drawable. The vertex function accomplishes this task by translating arbitrary vertex coordinates into normalized device coordinates (NDC), also known as **clip-space coordinates**.

**Clip space is a 2D coordinate system** that maps the viewport area to a [-1.0, 1.0] range along both the x and y axes.

Vertex functions are written in the Metal shading language(`.metal`), which is based on C++ 14. Traditional C/C++ code is typically executed on the CPU, whereas Metal shading language code is exclusively executed on the GPU.

关于函数中的`[[]]`属性修饰符困扰了我一段时间，这是苹果定义好的描述属性的修饰符。

### Rasterization

我们设置了三角形三个顶点的颜色，那么位于三角形区域内的其它顶点的颜色如何确定呢？The rasterizer passes color values to the fragment function after converting them from per-vertex values to per-fragment values. This conversion uses a fixed interpolation function, which calculates a single weighted color derived from the color values of the triangle’s three vertices. The weights for the interpolation function (also known as barycentric coordinates) are the relative distances of each vertex position to the center of a fragment.

这是一个不可编程的步骤。Because rasterization is a fixed pipeline stage, its behavior can’t be modified by custom Metal shading language code.

### Fragment Function

The main task of a fragment function (also known as fragment shader) is to process incoming fragment data and calculate a RGBA color value for the drawable’s pixels.

## Obtain Function Libraries and Create a Pipeline

Metal shading language code is compiled in two stages:

1. Front-end compilation happens in Xcode at build time. `.metal` files are compiled from high-level source code into intermediate representation (IR) files.
2. Back-end compilation happens in a physical device at runtime. IR files are then compiled into low-level machine code.

These `MTLFunction` objects are used to create a `MTLRenderPipelineState` object that **represents the graphics-rendering pipeline**. Calling the `newRenderPipelineStateWithDescriptor:error:` method of a `MTLDevice` object begins the back-end compilation process that links the `vertexShader` and `fragmentShader` functions, resulting in a fully compiled pipeline.

A view’s **pixel format** defines the memory layout of each of its pixels. This sample only renders to a single target, the view’s drawable (`colorAttachments[0]`).

## Draw a triangle

Triangles are geometric primitives in Metal that require three vertices to be drawn. With the drawing complete, the render loop can end encoding, commit the command buffer, and present the drawable containing the rendered triangle.

> [Basic Buffers: Demonstrates how to manage hundreds of vertices with a vertex buffer.](https://developer.apple.com/documentation/metal/basic_buffers)

## Vertex Buffer

Typically, Metal apps or games draw models with thousands of vertices, each with multiple vertex attributes, that consume several megabytes of memory. For these apps or games to scale well and be managed efficiently, Metal provides specialized data containers represented by `MTLBuffer` objects. This sample allocates a large amount of vertex data once, copies it into a `MTLBuffer` object, and then reuses the vertex data in each frame.

这个案例省略了从模型中加载顶点信息的过程，而用一个我们定义的方法来生成，包装在`NSData`里。In Objective-C, byte buffers are wrapped by `NSData` objects. The complexity of model-loading code varies by model, but ultimately the vertex data is also stored in a byte buffer that’s handed off to Metal code.

> [Basic Texturing: Demonstrates how to load image data and texture a quad.](https://developer.apple.com/documentation/metal/basic_texturing)

## Texture

In this sample, image data is loaded into a texture, applied to a single quad, and rendered as a 2D image. To populate a Metal texture with image data, its pixel data must already be formatted in a Metal-compatible pixel format, defined by a single `MTLPixelFormat` enumeration value.

The pixel format describes the layout of each of the texture’s pixels (its **texels**).

In this sample, for simplicity, the custom `AAPLImage` class loads image data from a file (Image.tga) into memory (NSData).

`MTLPixelFormatBGRA8Unorm` indicates that each pixel has a blue, green, red, and alpha channel, where each channel is an 8-bit unsigned normalized value (i.e. 0 maps to 0.0 and 255 maps to 1.0).

`MTLTexture` objects are used specifically to store formatted image data.

Textures have known dimensions that can be interpreted as regions of pixels. A `MTLRegion` structure is used to identify a specific _region_ of a texture.

A texture can’t be rendered on its own; it must correspond to some geometric surface that’s output by the vertex function and turned into fragments by the rasterizer. This relationship is defined by **texture coordinates**: floating-point positions that map locations on a texture image to locations on a geometric surface.

Reading a texel is also known as sampling. The fragment function uses the built-in texture `sample()` function to sample texel data.
