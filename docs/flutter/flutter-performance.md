# Flutter Performace

关键指标：

- RenderObject 树深度：建议控制在 10 层以内
- 无效布局重排：通过 LayoutBuilder 按需计算约束
- 避免在 build 方法中创建大对象

```dart
// 危险操作：过度使用Opacity
ListView.builder(
  itemBuilder: (ctx, i) => Opacity(
    opacity: 0.9,
    child: HeavyWidget(), // 包含复杂子组件
  )
)

// 优化方案：着色器预处理
PrecomputedShaderList(
  shaders: [const ColorFilterShader(0.9)],
  child: OptimizedWidget(),
)
```

一、使用 const 构造函数减少 Widget 重建

```dart
// 低效写法（每次build都会新建）
Text('Hello World');

// 高效写法（复用缓存实例）
const Text('Hello World');
```

减少 20%-40%的 UI 线程开销，提升列表滚动流畅度与动画响应速度

二、用 RepaintBoundary 隔离重绘区域

频繁更新的组件（如动画、滚动列表）会导致全局重绘，RepaintBoundary 将子树绘制与外部隔离，仅重绘边界内组件，可降低 GPU 渲染负载，尤其适合复杂动画或嵌套滚动场景。
