# https://leetcode-cn.com/problems/fibonacci-number/
# 509. 斐波那契数

# F(0) = 0, F(1) = 1
# F(N) = F(N-1) + F(N-2), N > 1
class Solution:
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

class Solution2:
    def fib(self, N: int) -> int:
        if N == 0: return 0
        if N == 1: return 1
        dp = [0] * (N+1)
        dp[0] = 0
        dp[1] = 1
        for i in range(2, N+1):
            dp[i] = dp[i-1] + dp[i-2]
        return dp[N]