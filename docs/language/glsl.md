# GLSL

## Introduction

全屏红色：

```c
void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    vec2 uv = fragCoord/iResolution.xy;
    fragColor = vec4(1, 0, 0, 1);
}
```

红色渐变：

```c
void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    vec2 uv = fragCoord/iResolution.xy;
    fragColor = vec4(uv.x, 0, 0, 1);
}
```

x, y 同时渐变：

```c
void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    vec2 uv = fragCoord/iResolution.xy;
    fragColor = vec4(uv, 0, 1);
}
```

在 GLSL（OpenGL Shading Language）中，**Swizzling** 是一种用于重新排列和选择向量分量的操作。它允许你通过简单的语法来访问和组合向量的分量，从而提高代码的可读性和简洁性。

移动一个坐标系的原点称为"平移"。在数学和物理学中，平移（Translation）是指将整个坐标系或图形沿着某个方向移动，但不改变其形状、大小和方向。以中心点为原点：

```c
void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    vec2 uv = fragCoord/iResolution.xy;
    uv -= 0.5;
    uv *= 2.0;
    fragColor = vec4(uv, 0, 1);
}
```

等价于：

```c
void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    vec2 uv = fragCoord/iResolution.xy * 2.0 - 1.0;
    fragColor = vec4(uv, 0, 1);
}
```

`float`函数，计算向量的长度：

```c
void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    vec2 uv = fragCoord/iResolution.xy * 2.0 - 1.0;
    float d = length(uv);
    fragColor = vec4(d, d, d, 1);
}
```

d 代表每个像素点到坐标系原点的长度，最终输出是以中心为原点的渐变灰阶图像。

大多数情况下，画布不是正方形，如果是 16:9 的画布，y 的取值范围是[-1, 1]，那么 x 的取值范围应该是`[-16/9, 16/9]`：

```c
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;
    float d = length(uv);
    fragColor = vec4(d, d, d, 1);
}
```

等价于：`vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y`

这样，就避免了图像的拉伸变形。可以尝试`uv.y *= iResolution.y / iResolution.x;`会有不同的效果。

Sign distance function (SDF) 对于给定的点，函数返回该点到最近表面的距离，并且这个距离是有符号的：正值表示点在形状的外部，负值表示点在形状的内部。

```c
float sdCircle( vec2 p, float r ) {
    return length(p) - r;
}
```

`step` 和 `smoothstep`:

```c
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;
    float d = length(uv); // 以屏幕中心点为原点，计算每个像素点到原点的距离
    d -= 0.5; // 半径为0.5的圆
    d = abs(d); // 圆的表面向外、向圆心两个方向渐变
    d = step(0.1, d); // 圆环
    fragColor = vec4(d, d, d, 1);
}
```

查看 `smoothstep` 函数曲线：[https://fordhurley.com/glsl-grapher/#smoothstep](https://fordhurley.com/glsl-grapher/#smoothstepp)

同心圆：

```c
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;
    float d = length(uv); // d -> [0, 1]
    d = sin(d * 8.); // sin(d) -> [0, 0.84], sin(d * 8) -> [-1, 1]
    d = abs(d);
    fragColor = vec4(d, d, d, 1);
}
```

随时间而变化：

```c
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;
    float d = length(uv); // d -> [0, 1]
    d = sin(d * 8. + iTime); // sin(d) -> [0, 0.84], sin(d * 8) -> [-1, 1]
    d /= 8.; // [-0.125, 0.125]
    d = abs(d); // [0, 0.125]
    d = smoothstep(0.0, 0.1, d);
    fragColor = vec4(d, d, d, 1);
}
```

[https://graphtoy.com/](https://graphtoy.com/) 函数图像

添加色彩：

```c
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;
    float d = length(uv);
    d = sin(d * 8. + iTime) / 8.;
    d = abs(d);
    d = 0.02 / d;

    vec3 color = vec3(1.0, 1.0, 0.0);
    color *= d;

    fragColor = vec4(color, 1);
}
```

使用 `fract` 函数分割出多个空间：

```c
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;

    uv = fract(uv * 2.0) - 0.5;

    float d = length(uv);

    d = sin(d * 8. + iTime) / 8.;
    d = abs(d);
    d = 0.02 / d;

    vec3 col = vec3(1.0, 1.0, 0.0);
    col *= d;

    fragColor = vec4(col, 1);
}
```
