---
title:  "用 Playground 写了一个死锁的演示"
categories: [Apple]
---

# 用 Playground 写了一个死锁的演示

当 App 启动时，系统自动创建了一个主队列，主队列是串行的，试图在主队列里面执行一个同步任务会导致死锁！
```
func demoDeadlock() {
    DispatchQueue.main.sync {
        print("I'm locked...")
    }
}
```
![Image]({{"/assets/img/Screen Shot 2018-07-10 at 17.27.24.png"}})

在这个例子中，block 在等待外层的函数返回后才会执行；而外层的函数只有在执行完这个 block 之后才会返回；又造成死锁！
```
func demoDeadlock2() {
    var flag = 0
    let queue = DispatchQueue(label: "com.yianzhou.whatsnew")
    queue.async {
        // do some CPU intensive task
        queue.sync {
            flag = 1
            print(flag)
        }
    }
}

// inner block won't start before outer block finishes
// outer block is waiting for this inner block to complete
demoDeadlock2()
```

正确的写法：
```
func fixDeadlock2() {
    let workItem = DispatchWorkItem {
        // do something
        print("doing...")
    }
    
    let queue = DispatchQueue(label: "com.yianzhou.whatsnew")
    queue.async(execute: workItem)
    workItem.notify(queue: queue) {
        // work item has been done
        print("done")
    }
}
```
©️ 本文原创，转载请注明出处。