---
title: 'leetcode'
categories: [Development]
---

* Do not remove this line (it will not be displayed)
{:toc}

# 509-斐波那契数

斐波那契数列可以表示为递归形式：

```python
def fib(n):
    if n == 0: return 0
    if n == 1 or n == 2: return 1
    return fib(n-1) + fib(n-2)
```

画出递归树后会发现（涉及递归的问题都可以画出递归树，对于分析算法复杂度、寻找算法低效的原因、找到高效的解法有很大帮助！），这个递归存在着大量重复计算，假设 N = 20，那么树的高度是 20，树的节点数是 2 ^ N，算法复杂度是 O(2^n)，这太大了！

因此我们可以用一个数组或者哈希表存储已经计算过的结果，当遍历递归树遇到同样的节点时，就可以快速访问到结果而不必重复计算，这就是“剪枝”。通过剪枝，fib(20) ... fib(1) 每个结果都只计算了一次。

```python
def fib(self, N: int) -> int:
        arr = [0] * (N+1)
        return self.tree(arr, N)

def tree(self, arr, n):
    if n == 0:
        return 0
    if n == 1 or n == 2:
        return 1
    if arr[n] > 0:
        return arr[n]
    res = self.tree(arr, n-1) + self.tree(arr, n-2)
    arr[n] = res
    return res
```

递归的思路是把一个大问题，自顶向下分解成子问题，最后到达递归树的叶子结点，然后逐层返回计算结果。而动态规划的思想，是从最小子问题开始，即 f(1) 和 f(2)，自底向上，逐步构建出大问题的解。

```python
# 状态转移方程：
# F(0) = 0, F(1) = 1
# F(N) = F(N-1) + F(N-2), N > 1
def fib(self, N: int) -> int:
    if N == 0: return 0
    if N == 1: return 1
    dp = [0] * (N+1)
    dp[0] = 0
    dp[1] = 1
    for i in range(2, N+1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[N]
```

# 322-找零用的最少硬币数

动态规划问题的两个要素：最优子结构、状态转移方程。

- 最优子结构：问题的最优解，可以从其子问题的最优解构造出来。
- 状态转移方程：假设已知 dp[0] ... dp[n-1]，如何得到 dp[n]，即问题的解。

如何找到最优子结构？——“问什么就设什么”。这道题目问的是凑成总金额 S 所需的最少的硬币个数。我们就设 F(S) 为组成金额 S 最少的硬币数。

如何找到状态转移方程？假设组成金额 S 的最后一枚硬币的面值是 C，则 F(S) 满足：`F(S)=F(S−C)+1`。但我们不知道最后一枚硬币的面值是多少，所以我们需要枚举每个硬币面额值，并选择其中的最小值。假设可选硬币为 [1, 2, 5]，则对于任意 S，`F(S) = min(F(S-1), F(S-2), F(S-5)) + 1`。

与“509-斐波那契数”问题同样，这个递归调用存在许多子问题被重复计算，因此我们需要一个缓存，来实现递归树的剪枝。

自顶向下的思路，N 叉树的遍历 + dp table 缓存：

```python
class Solution:
    def coinChange(self, coins: [int], amount: int) -> int:
        dp = [0] * (amount+1) # dp table
        self.dfs(coins, amount, dp)
        return dp[amount]

    # 在给定组合 coins 里，找到组成 target 的最少硬币数量，并写入 dp table
    def dfs(self, coins, target, dp):
        if target < 0: return -1
        if target == 0: return 0
        if dp[target] != 0:
            return dp[target]
        res = target+1 # 取一个最大值
        for c in coins:
            cnt = self.dfs(coins, target - c, dp)
            if cnt >= 0 and cnt < res:
                res = cnt
        dp[target] = -1 if res == target + 1 else res+1
        return dp[target]
```

自底向上的思路，从 f(0) 开始构建 f(0) - f(amount) 的 dp table，得到目标解：

```python
class Solution2:
    def coinChange(self, coins: [int], amount: int) -> int:
        dp = [amount+1] * (amount+1)
        dp[0] = 0
        for x in range(0, amount+1):
            for c in coins:
                if x >= c:
                    dp[x] = min(dp[x], dp[x-c]+1)
        return dp[amount] if dp[amount] != amount+1 else -1
```

# 300-LIS

一、找最优子结构——问什么就设什么，题目问的是找到最长上升子序列的长度，我们就设 dp[i] = 以 nums[i] 结尾的最⻓递增子序列的⻓度

二、找状态转移方程——`dp[i] = max(d[0] ... d[i-1]) + 1`

```python
class Solution:
    def lengthOfLIS(self, nums: [int]) -> int:
        n = len(nums)
        if n == 0: return 0
        dp = [1] * n
        res = dp[0]
        for i in range(1, n):
            for j in range(0, i):
                if nums[i] > nums[j]:
                    dp[i] = max(dp[i], dp[j] + 1)
            res = max(res, dp[i])
        return res
```

# 146-LRU Cache

实现本题的两种操作，需要用到一个哈希表和一个双向链表。Java 里面的 `LinkedHashMap` 就可以处理这样的问题。

```java
class LRUCache {
    int capacity;
    LinkedHashMap<Integer, Integer> cache;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        cache = new LinkedHashMap<Integer, Integer>(capacity, 0.75f, true) {
            @Override
            protected boolean removeEldestEntry(Map.Entry eldest) {
                return cache.size() > capacity;
            }
        };
    }

    public int get(int key) {
        return cache.getOrDefault(key, -1);
    }

    public void put(int key, int value) {
        cache.put(key, value);
    }
}
```

本题需要我们自己实现这样的结构。

![image](/assets/images/截屏2020-07-0323.04.38.png)

```python
class LinkedNode:
    def __init__(self, key=0, value=0):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.size = 0
        # hash table + double linked list
        self.hashMap = dict()
        self.head = LinkedNode()
        self.tail = LinkedNode()
        # dummy head + dummy tail
        self.head.next = self.tail
        self.tail.next = self.head

    # 添加一个节点到头部
    def addToHead(self, node):
        node.prev = self.head
        node.next = self.head.next
        self.head.next.prev = node
        self.head.next = node

    # 删除一个节点
    def removeNode(self, node):
        node.next.prev = node.prev
        node.prev.next = node.next
        node = None

    # 将一个节点移到头部（标记为最近使用）
    def moveToHead(self, node):
        self.removeNode(node)
        self.addToHead(node)

    # 从尾巴移除一个节点（LRU）
    def removeTail(self):
        node = self.tail.prev
        self.removeNode(node)
        return node

    def get(self, key: int) -> int:
        if key not in self.hashMap:
            return -1
        node = self.hashMap[key]
        # 最近访问过，移动到头部
        self.moveToHead(node)
        return node.value

    def put(self, key: int, value: int) -> None:
        if key not in self.hashMap:
            node = LinkedNode(key, value)
            self.hashMap[key] = node
            self.addToHead(node)
            self.size += 1
            if self.size > self.capacity:
                removed = self.removeTail()
                self.hashMap.pop(removed.key)
                self.size -= 1
        else:
            node = self.hashMap[key]
            node.value = value
            self.moveToHead(node)
```
