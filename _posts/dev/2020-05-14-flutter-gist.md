---
title: "flutter - gist"
categories: [Development]
---

<!-- prettier-ignore -->
* Do not remove this line (it will not be displayed)
{:toc}

[Describe how to listen for page updates in TabBar and TabBarView when using DefaultTabController](https://github.com/flutter/flutter/issues/53155#issuecomment-639178606)

延时执行：

```dart
Future.delayed(Duration(seconds: 10), () {
  setState(() {
    _delayReminder = true;
  });
});
```

过渡、导航：

```dart
    // 有些手机上打开页面的效果是从底部拉起来
    Navigator.push(context, MaterialPageRoute(builder: (context) => page));

    // 使用 iOS 的从右向左打开页面效果
    Navigator.push(
        context,
        CupertinoPageRoute(
            fullscreenDialog: fullscreenDialog, builder: (context) => page));
    
    // 无动画过渡
    Navigator.of(context).pushReplacement(NoAnimRouteBuilder(TabPage()));
```

屏幕参数：

```dart
import 'dart:ui';

class Screen {
  static double get width {
    MediaQueryData mediaQuery = MediaQueryData.fromWindow(window);
    return mediaQuery.size.width;
  }

  static double get height {
    MediaQueryData mediaQuery = MediaQueryData.fromWindow(window);
    return mediaQuery.size.height;
  }
}
```

自定义 widget：

```dart
class LinearGradientButton extends StatelessWidget {
  final Function() onPressed;

  LinearGradientButton({
    @required this.onPressed,
  });

  ...
}
```

通知父 widget 更新：

```dart
class ReminderEntry extends StatelessWidget {
  final Function() notifyParent;

  ReminderEntry({
    @required this.notifyParent,
  });
}
```