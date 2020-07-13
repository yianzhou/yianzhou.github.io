# 62. Unique Paths
# https://leetcode.com/problems/unique-paths/

# f(m, n)：走到 m 行 n 列唯一的路径数
# f(m, n) = f(m-1, n) + f(m, n-1)
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        dp = [[1] * n] * m
        for i in range(1, m):
            for j in range(1, n):
                dp[i][j] = dp[i-1][j] + dp[i][j-1]
        return dp[m-1][n-1]

print(Solution().uniquePaths(7,3))