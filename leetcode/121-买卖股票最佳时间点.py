# https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
# 121. Best Time to Buy and Sell Stock
class Solution:
    def maxProfit(self, prices: [int]) -> int:
        if len(prices) <= 1:
            return 0
        res = 0
        minP = prices[0]
        for i in range(1, len(prices)):
            if prices[i] < minP:
                minP = prices[i]
            else:
                res = max(res, prices[i] - minP)
        return res

print(Solution().maxProfit([7,1,5,3,6,4]))
print(Solution().maxProfit([7,6,4,3,1]))