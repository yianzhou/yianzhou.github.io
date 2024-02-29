# Flutter Layout

官方指导：[Understanding constraints | Flutter](https://docs.flutter.dev/ui/layout/constraints)

**Constraints go down. Sizes go up. Parent sets position.**

`runApp` 指定的根部 Widget 要占满整个屏幕。

![img](/img/E8D85F1B-FBD4-4389-8DFB-A1BC639FBFB0.png)

`Container` 的宽高不起作用：

1. Constraints go down. Parent 要求我要占满整个父视图（例如整个屏幕），所以我的宽高不起作用
2. Parent sets position. Parent 不知道应该把我放哪，所以我的宽高不起作用，还是占满整个父视图。此时包个 `Center` 可以解决。

可以这么理解，我的 `Container` 的宽高只是一个建议，只有在满足 Parent 对我的约束的情况下这个建议才会被采纳，否则建议无效，会被强制修正以满足约束。

Parent 知道我的尺寸后，再决定把我放在哪里。

可以用 `LayoutBuilder` 看到 Parent 对我的约束：

```dart
Widget build(BuildContext context) {
  return LayoutBuilder(builder: (context, constraints) {
    print(constraints);
    return ConstrainedBox(
      constraints: const BoxConstraints(
        minWidth: 0,
        minHeight: 0,
        maxWidth: 100,
        maxHeight: 100,
      ),
    );
  });
}
```

BoxConstraints 可以指定宽高的范围。最大值等于最小值的约束称为紧约束。最小值为 0 的约束称为松约束。

之所以前面包个 `Center` 可以解决问题，是因为 `Center` 把来自父级的紧约束变成了松约束。

`Column` 和 `Row` 继承自 `Flex`。

`Flex` 的 children 分为两类，一类是 Flexible，一类是 Unflexible。

由于 Constraints go down，`Column` 在布局时并不知道 children 的高度，因此它给 children 的约束是：`BoxConstraints(0.0<=w<=393.0, 0.0<=h<=Infinity)`，主轴方向允许无限高度，等 Sizes go up 之后再 Parent sets position。此时，先布局 Unflexible 的固定高度控件，剩余的高度再由 Flexible 控件按比例分。

在 `Column` 里面放 `ListView` 为什么会异常？首先 `ListView` 是 Unflexible 的，那么 parent 给它的约束是无限高度，而 `ListView` 本身的高度也是无限的，因此出现 "Vertical viewpoint was given unbounded height" 异常。要解决它，可以给 `ListView` 包上 `Expanded`，在 `Column` 布局完固定高度控件后，就知道给 `Expanded` 多少高度了。

`Stack` 的尺寸是怎么决定的？`Stack` 的 children 也分为两种，一种是有位置的（`Positioned`），一种是没有位置的。

- 如果所有 children 都是有位置的，那么自身将撑开到最大约束。
- 如果所有 children 都是没有位置的，那么自身将包裹住 children 中最大的一个。
- 如果混合，那么先布局没有位置的组件，并将自身包裹住没有位置的 children 中最大的一个，然后再布局有位置的组件。

`Container` 是集合了众多 Widget 特性的一个语法糖：

- 有 child 时，包裹 child，除非设置`alignment`属性
- 无 child 时，撑开到最大约束，除非最大约束是 unbounded
