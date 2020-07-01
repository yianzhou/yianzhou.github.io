---
title: 'leetcode-动态规划'
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

画出递归树后会发现，这个递归存在着大量重复计算，假设 N = 20，那么树的高度是 20，树的节点数是 2 ^ N，算法复杂度是 O(2^n)，这太大了！

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