# https://leetcode-cn.com/problems/coin-change/
# 322. Coin Change

# F(S) - minimum number of coins needed to make change for amount S using coin denominations.
# F(S) = F(S-C)+1
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

# coins = [1, 2, 5], amount = 11
# f(n): 组成 n 所需的最少硬币数
# f(0) = 0
# f(1) = min(f(1-1), f(1-2), f(1-5)) + 1
class Solution2:
    def coinChange(self, coins: [int], amount: int) -> int:
        dp = [amount+1] * (amount+1)
        dp[0] = 0
        for x in range(0, amount+1):
            for c in coins:
                if x >= c:
                    dp[x] = min(dp[x], dp[x-c]+1)
        return dp[amount] if dp[amount] != amount+1 else -1

s = Solution2()
print(s.coinChange([1, 2, 5, 10], 21))
print(s.coinChange([186,419,83,408], 6249))
print(s.coinChange([474,83,404,3], 264))