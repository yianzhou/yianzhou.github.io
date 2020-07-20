# 518. Coin Change 2
# https://leetcode-cn.com/problems/coin-change-2/
# 每种硬币个数不限，找到满足目标金额的硬币组合

# 递归版本：对于每一种硬币，有两种选择，包括它或不包括它。组合总数等于两者之和。
# Your runtime beats 9.32 % of python3 submissions.
class Solution2:
    def change(self, amount: int, coins: [int]) -> int:
        cache = {}
        return self.dfs(amount, coins, 0, cache)
    
    def dfs(self, target, coins, i, cache):
        if target < 0: return 0
        if target == 0: return 1
        if i == len(coins) and target > 0:
            return 0
        if (target, i) in cache:
            return cache[(target, i)]
        cache[(target, i)] = self.dfs(target - coins[i], coins, i, cache) + self.dfs(target, coins, i + 1, cache)
        return cache[(target, i)]

# dp[i][j] = 对于硬币[0, i]，满足金额 j 的组合数，初始化为 0。
# 选 coins[i] 或不选：dp[i][j] = dp[i-1][j - coins[i]] + dp[i-1][j]
# 和 0-1 背包问题最大的不同是，此题中每种硬币可以选[0, +∞)种！
# Your runtime beats 14.82 % of python3 submissions.
class Solution3:
    def change(self, amount: int, coins: [int]) -> int:
        if amount == 0: return 1
        if len(coins) == 0: return 0
        N = len(coins)
        dp = [[0 for i in range(amount+1)] for i in range(N)]
        # base case
        dp[0][0] = 1
        for i in range(coins[0], amount+1, coins[0]):
            dp[0][i] = 1
        for i in range(1, N):
            for j in range(0, amount+1):
                if j >= coins[i]:
                    dp[i][j] = dp[i-1][j] + dp[i][j - coins[i]]
                else:
                    dp[i][j] = dp[i-1][j]
        return dp[N-1][amount]

# 在所有 Python3 提交中击败了 74.21% 的用户
class Solution:
    def change(self, amount: int, coins: [int]) -> int:
        N = len(coins)
        dp = [0 for i in range(amount+1)]
        dp[0] = 1
        for c in coins:
            for i in range(c, amount+1):
                dp[i] += dp[i-c]
        return dp[amount]
                

print(Solution().change(5, [2, 5]))
print(Solution().change(5, [1, 2, 5]))
print(Solution().change(3, [2]))
print(Solution().change(10, [10]))