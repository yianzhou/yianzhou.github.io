# Flutter Gist

## 打印

```dart
print('abc'); // 会打印到console
debugPrint('$batteryLevel'); // 字符串模板，release不打印到console
```

## 日志

```dart
import 'dart:developer';

log('$batteryLevel');
```

log 的日志会去到 flutter 的观测台，在 `flutter run` 之后命令行会给出观测台的地址：

> An Observatory debugger and profiler on iPhone 11 is available at: http://127.0.0.1:54363/q_NCh1fq0lc=/

![img](/img/DDDD73CC-4999-4FE6-9503-229BDC2B8790.png)

## 加载资源文件

```dart
import 'dart:async' show Future;
import 'package:flutter/services.dart' show rootBundle;

Future<String> loadAsset() async {
  return await rootBundle.loadString('my-assets/data.json');
}
```

## 页面导航

In Flutter, screens and pages are called routes. In Android, a route is equivalent to an Activity. In iOS, a route is equivalent to a ViewController. In Flutter, a route is just a widget.

[Return data from a screen](https://flutter.dev/docs/cookbook/navigation/returning-data)

```dart
// Navigator.push returns a Future that completes after calling
// Navigator.pop on the Selection Screen.
final result = await Navigator.push(
  context,
  MaterialPageRoute(builder: (context) => page),
);

Navigator.of(context).pop({"lat":43.821757,"long":-79.226392});

// 使用 iOS 的从右向左打开页面效果
Navigator.push(context,
    CupertinoPageRoute(
        fullscreenDialog: fullscreenDialog,
        builder: (context) => page),
    );

// 无动画过渡
Navigator.of(context).push(NoAnimRouteBuilder(TabPage()));

// 替换路由：A->B->C，C直接回A
// 在B页面：
Navigator.of(context).pushReplacementNamed('/C');
```

If you need to navigate to the same screen in many parts of your app, define a named route, and use `Navigator.pushNamed()` for navigation.

```dart
void main() {
  runApp(MaterialApp(
    home: MyAppHome(), // becomes the route named '/'
    routes: <String, WidgetBuilder> {
      '/a': (BuildContext context) => MyPage(title: 'page A'),
      '/b': (BuildContext context) => MyPage(title: 'page B'),
      '/c': (BuildContext context) => MyPage(title: 'page C'),
    },
  ));
}

Navigator.of(context).pushNamed('/b');
```
