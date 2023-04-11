# XCTest

![img](/img/0EE3B10D-ED94-4F9C-A03C-6AB775D8A5A7.png)

```
XCTestExpectation *expectation = [self expectationForNotification:UIApplicationDidReceiveMemoryWarningNotification object:nil handler:^BOOL(NSNotification *notification) {
    return YES;
}];
[self waitForExpectations:@[expectation] timeout:30.0];
```