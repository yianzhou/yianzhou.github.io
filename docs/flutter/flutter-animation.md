# Flutter Animation

## 隐式动画

`AnimatedContainer` 对 `Container` 的各种属性做变化

`AnimatedSwitcher` 对 `child` 的变化做动画，属性`transitionBuilder`默认是`FadeTransition`，其它还有`RotateTransition`、`ScaleTransition`、`SlideTransition`等，可以嵌套

`AnimatedOpacity` 透明度变化

`TweenAnimationBuilder` 万能的补间动画，可以结合 `Transform` 使用

`Transform` 常用的有 `Transform.scale`, `Transform.rotate`, `Transform.translate`

## 显式动画

定义一个 `AnimationController _controller`，它是一个 `Animation<double>`，需要 `dispose`, 需要 `with SingleTickerProviderStateMixin`

```dart
_controller = AnimationController(vsync: this, duration: Duration(seconds: 1));
```

使用`RotateTransition`等控件，它们接受`Animation<double>`属性

`SingleTickerProviderStateMixin`在不同设备上提供不同频率的垂直同步信号，例如每秒 60 次或每秒 120 次

`_controller.drive(Tween(begin: 0.0, end: 1.0))` 用我们自定义的`_controller`驱动一个 Tween

`Tween(begin: 0.0, end: 1.0).chain(CurveTween(curve: Interval(0.4, 0.6)))` 区间动画

`Interval`: A curve that is 0.0 until [begin], then curved (according to [curve]) from 0.0 at [begin] to 1.0 at [end], then remains 1.0 past [end].

自定义动画：`AnimatedBuilder` 自己使用 `_controller.value` 的值

<img alt="" src="/img/529FF9C0-4F67-43CD-8D68-61F8DCBCF3C5.png" width="800"/>

`Tween(begin: 0.0, end: 1.0).evaluate(_controller)`

`Tween(begin: 0.0, end: 1.0).animate(_controller)`

## 原理

Flutter 里动画的原理是 `Ticker` 触发每次垂直同步信号回调，然后`setState`
