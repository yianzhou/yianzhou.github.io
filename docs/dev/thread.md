# 多线程

## 生产者-消费者问题

生产者-消费者问题是经典的、并发编程中的多线程同步问题。它有很多的变体，我们讨论一种最基本的情况：只有一个生产者线程和一个消费者线程；它们之间缓冲区的大小为一。

[这个例子](https://levelup.gitconnected.com/producer-consumer-problem-using-mutex-in-c-764865c47483)中，我们通过互斥量，保证两个线程对竞争资源（即缓冲区）的访问是互斥的。

```cpp
#include <iostream>
#include <vector>
#include <thread>

using namespace std;

class SolutionA {
public:
    int produceData() {
        int ran = rand() % 1000; // [0, 1000) 的随机数
        cout << "Produce data: " << ran << endl;
        return ran;
    }

    void consumeData(int data) {
        cout << "Consume data: " << data << endl;
    }

    void producer() {
        while (true) {
            mu.lock();
            data = produceData();
            ready = true;
            mu.unlock();
            while (ready) {
                // 每秒检测一次，直到消费者吃完
                std::this_thread::sleep_for(std::chrono::seconds(1));
            }
        }
    }

    void consumer() {
        while (true) {
            while (!ready) {
                // 每秒检测一次，直到生产者产出
                std::this_thread::sleep_for(std::chrono::seconds(1));
            }
            mu.lock();
            consumeData(data);
            ready = false;
            mu.unlock();
        }
    }

    void run() {
        thread t1(&SolutionA::producer, this);
        thread t2(&SolutionA::consumer, this);
        t1.detach();
        t2.detach();
    }
private:
    mutex mu;
    bool ready = false;
    int data = 0;
};

int main() {
    SolutionA so = SolutionA();
    so.run();

    while (true) {
        std::this_thread::sleep_for(std::chrono::seconds(1));
    }

    return 0;
}
```

这个例子显然是不够好的，因为我们缺少一种手段让生产者/消费者线程知道对方已经完成工作了，我们只好选择用 `while` 循环轮询，这会使得线程在等待对方时空转，尽管我们可以让线程休眠一定的时间、以节省资源，但这并不是完美的方案。**条件量**就是用来解决这种问题的。

The `condition_variable` class is a synchronization primitive that can be used to block a thread, or multiple threads at the same time, until another thread both modifies a shared variable (the condition), and notifies the `condition_variable`.

```cpp
#include <iostream>
#include <vector>
#include <thread>

using namespace std;

class SolutionB {
public:
    int produceData() {
        std::this_thread::sleep_for(std::chrono::seconds(1));
        int ran = rand() % 1000; // [0, 1000) 的随机数
        cout << "Produce data: " << ran << endl;
        return ran;
    }

    void consumeData(int data) {
        cout << "Consume data: " << data << endl;
    }

    void producer() {
        while (true) {
            // Resource Acquisition Is Initialization or RAII
            std::unique_lock<std::mutex> ul(mu);
            // critical section
            data = produceData();
            ready = true;
            // critical section
            ul.unlock();

            cv.notify_one();

            ul.lock();
            // The wait operations atomically release the mutex and suspend the execution of the thread.
            cv.wait(ul, [this] {
                return !this->ready;
            });
            // When the condition variable is notified, the thread is awakened, and the mutex is atomically reacquired.
        }
    }

    void consumer() {
        while (true) {
            std::unique_lock<std::mutex> ul(mu);
            cv.wait(ul, [this]() {
                return this->ready;
            });
            // after the wait, we own the lock.
            consumeData(data);
            ready = false;
            ul.unlock();
            cv.notify_one();
        }
    }

    void run() {
        t1 = thread(&SolutionB::producer, this);
        t2 = thread(&SolutionB::consumer, this);
        t1.detach();
        t2.detach();
    }
private:
    std::mutex mu;
    std::condition_variable cv;
    int data = 0;
    bool ready = false;

    thread t1;
    thread t2;
};

int main() {
    SolutionB so = SolutionB();
    so.run();

    while (true) {
        std::this_thread::sleep_for(std::chrono::seconds(1));
    }

    return 0;
}
```
