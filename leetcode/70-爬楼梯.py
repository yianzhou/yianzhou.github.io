# https://leetcode.com/problems/climbing-stairs/
# 70. Climbing Stairs

# f(i, n): when you are at step i, ways you can climb to n stairs
# f(i, n) = f(i+1, n) + f(i+2, n)
class Solution:
    dp = []
    def climbStairs(self, n: int) -> int:
        self.dp = [0] * n
        return self.recClimbStairs(0, n)
    
    def recClimbStairs(self, i, n):
        if i > n:
            return 0
        if i == n:
            return 1
        if self.dp[i] != 0:
            return self.dp[i]
        else:
            self.dp[i] = self.recClimbStairs(i+1, n) + self.recClimbStairs(i+2, n)
            return self.dp[i]

# 最后到达第 i 阶，有两种方法
# 在 i-1 阶爬一阶
# 在 i-2 阶爬两阶
# f(i) = f(i-1)+f(i-2)
class Solution2:
    def climbStairs(self, n: int) -> int:
        if (n == 1):
            return 1
        dp = [0] * (n+1)
        dp[1] = 1
        dp[2] = 2
        for i in [i for i in range(3, n+1) if i>=2]:
            dp[i] = dp[i-1] + dp[i-2]
        return dp[n]
        
s = Solution2()
print(s.climbStairs(10))