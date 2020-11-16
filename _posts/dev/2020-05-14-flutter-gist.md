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

找到一个 widget 实例，[Find widgets](https://flutter.dev/docs/cookbook/testing/widget/finders)

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
