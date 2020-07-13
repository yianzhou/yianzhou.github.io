# 300. Longest Increasing Subsequence
# https://leetcode.com/problems/longest-increasing-subsequence/

# nums = [10,9,2,5,3,7,101,18]
# dp[i] = 以 nums[i] 结尾的最⻓递增子序列的⻓度
# dp[0] = 1
# dp[i] = max(d[0] ... d[i-1]) + 1
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

print(Solution().lengthOfLIS([10,9,2,5,3,7,101,18]))