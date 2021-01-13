---
title: "响应式编程"
categories: [Apple]
---

<!-- prettier-ignore -->
* Do not remove this line (it will not be displayed)
{:toc}

# ReactiveCocoa

响应式框架，指的是能够支持响应式编程范式的框架。在编程时使用数据流来传播数据的变化，响应这个数据流的计算模型会自动计算出新的值，将新的值通过数据流传给下一个响应的计算模型，如此反复下去，直到没有响应者为止。

iOS 响应式框架，最开始被大家知道的是 [ReactiveCocoa](https://github.com/ReactiveCocoa/ReactiveCocoa)（简称 RAC），后来比较流行的是 [RxSwift](https://github.com/ReactiveX/RxSwift)。

ReactiveCocoa 是将函数式编程和响应式编程结合起来的库，通过函数式编程思想建立了数据流的通道，数据流动时会经过各种函数的处理最终到达和数据绑定的界面。

ReactiveCocoa 的核心类是 `RACStream`：

```objc
/// An abstract class representing any stream of values.
///
/// This class represents a monad, upon which many stream-based operations can
/// be built.
///
/// When subclassing RACStream, only the methods in the main @interface body need
/// to be overridden.
@interface RACStream : NSObject

+ (instancetype)empty;
+ (instancetype)return:(id)value;
- (instancetype)bind:(RACStreamBindBlock (^)(void))block;
- (instancetype)concat:(RACStream *)stream;
- (instancetype)zipWith:(RACStream *)stream;
@end
```

响应式编程没能提高 App 的性能，是其没能流行起来的主要原因。在调试上，由于 ReactiveCocoa 框架采用了 Monad 模式，导致其底层实现过于复杂，从而在方法调用堆栈里很难去定位到问题。

如果你不想引入 ReactiveCocoa 库，还想使用函数响应式编程思想来开发程序的话，完全不用去重新实现一个采用 Monad 模式的 RACStream，只要在上层按照函数式编程的思想来搭建数据流管道，在下层使用赋值方式来管理数据就可以了。

# 实例

这个案例要完成的功能是：

- 添加学生基本信息，添加完学生信息后，通过按钮点击累加学生分数，每次点击按钮分数加 5；
- 所得分数在 30 分内，颜色显示为灰色；分数在 30 到 70 分之间，颜色显示为紫色；超过 70 分，分数颜色显示为红色。
- 分数在 70 分内，状态文本显示不合格；超过 70 分，状态文本显示合格。

```swift
import UIKit
import PlaygroundSupport

class MyViewController : UIViewController {
    let button = UIButton(frame: CGRect(x: 0, y: 25, width: 100, height: 25)) // 按钮
    let scoreLabel = UILabel(frame: CGRect(x: 0, y: 0, width: 100, height: 25)) // 显示分数
    let passLabel = UILabel(frame: CGRect(x: 100, y: 0, width: 100, height: 25)) // 显示是否合格

    var student: Student!

    override func loadView() {
        let view = UIView()
        view.backgroundColor = .white

        button.setTitle("+5", for: .normal)
        button.setTitleColor(.blue, for: .normal)
        button.addTarget(self, action: #selector(didTapButton(_:)), for: .touchUpInside)
        view.addSubview(button)
        view.addSubview(scoreLabel)
        view.addSubview(passLabel)
        self.view = view
    }

    override func viewDidLoad() {
        self.student = Student().name("Zhou").gender(.male).number(1024).isPassScore(block: { (credit) -> Bool in
            return credit >= 70
        })

        // 分数变化会发出信号，通知每一个订阅者
        // 不同的控件可以灵活地订阅信号，归类处理，让业务逻辑更清晰
        self.student.scoreSubject.subscribeNext { (credit) in
            if credit >= 70 {
                self.passLabel.text = "合格"
            } else {
                self.passLabel.text = "不合格"
            }
        }

        self.student.scoreSubject.subscribeNext { (credit) in
            self.scoreLabel.text = "\(credit)"
            if credit < 30 {
                self.scoreLabel.textColor = .lightGray
            } else if (credit >= 30 && credit < 70) {
                self.scoreLabel.textColor = .purple
            } else {
                self.scoreLabel.textColor = .red
            }
        }
    }

    @objc func didTapButton(_ sender: Any) {
        // 更新分数
        self.student.sendScore { (score) -> Int in
            let newScore = score + 5
            return newScore
        }
    }
}
// Present the view controller in the Live View window
PlaygroundPage.current.liveView = MyViewController()

class Student {
    typealias IsPassActionBlock = (Int)->Bool
    enum Gender {
        case male
        case female
    }

    private var name: String = ""
    private var gender: Gender = .male
    private var number: Int = 0
    private var score: Int = 0
    private var isPass: Bool = false
    private var isPassActionBlock: IsPassActionBlock?
    /// Subject
    var scoreSubject = ScoreSubject()

    func gender(_ g: Gender) -> Self {
        self.gender = g
        return self
    }

    func name(_ n: String) -> Self {
        self.name = n
        return self
    }

    func number(_ n: Int) -> Self {
        self.number = n
        return self
    }

    /// 更新分数
    func sendScore(updateScoreBlock: (Int)->Int) -> Self {
        self.score = updateScoreBlock(self.score)
        if let block = self.isPassActionBlock {
            self.isPass = block(self.score)
        }
        self.scoreSubject.sendNext(score: self.score) // 发送信号
        return self
    }

    /// 判断是否合格的方法
    /// - Parameter block: 判断是否合格的方法
    func isPassScore(block: @escaping IsPassActionBlock) -> Self {
        self.isPassActionBlock = block
        self.isPass = block(self.score)
        return self
    }
}

/// 信号，当分数有变化时，信号会将分数传递给这个信号的所有订阅者。
class ScoreSubject {
    // (主体类型) -> 无返回值
    typealias SubscribeNextActionBlock = (Int)->Void

    // 发生变化的主体
    private var score: Int = 0

    // 所有响应者
    private var blockArray = [SubscribeNextActionBlock]()

    /// 更新分数
    /// - Parameter credit: 当前分数
    func sendNext(score: Int) -> Self {
        self.score = score // 更新分数
        if !self.blockArray.isEmpty {
            for block in self.blockArray {
                block(self.score) // 通知所有订阅者，对更新作出响应
            }
        }
        return self
    }

    /// 添加订阅者
    /// - Parameter block: 对更新作出的响应处理
    func subscribeNext(block: @escaping SubscribeNextActionBlock) -> Self {
        block(self.score)
        self.blockArray.append(block)
        return self
    }
}
```
