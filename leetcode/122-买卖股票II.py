# https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/
# 122. 买卖股票的最佳时机 II

class Solution:
    def maxProfit(self, prices: [int]) -> int:
        N = len(prices)
        if N == 0: return 0
        res = 0
        for i in range(1, N):
            if prices[i] > prices[i-1]:
                res += prices[i] - prices[i-1]
        return res