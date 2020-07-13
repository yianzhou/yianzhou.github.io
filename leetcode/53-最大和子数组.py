# https://leetcode.com/problems/maximum-subarray/
# 53. Maximum Subarray

# 定义 maxSubArray(i) = 以 i 结尾的最大子数组
# maxSubArray(i) = nums[i] + maxSubArray(i-1) > 0 ? maxSubArray(i-1) : 0
class Solution:
    def maxSubArray(self, nums: [int]) -> int:
        dp = [0] * len(nums)
        dp[0] = nums[0]
        res = nums[0]
        for i in range(1, len(nums)):
            dp[i] = nums[i] + (dp[i-1] if dp[i-1] > 0 else 0)
            if res < dp[i]:
                res = dp[i]
        return res

s = Solution()
res = s.maxSubArray([-2,1,-3,4,-1,2,1,-5,4])
print(res)