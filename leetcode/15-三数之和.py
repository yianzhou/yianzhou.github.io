# 15. 三数之和
# https://leetcode-cn.com/problems/3sum/

class Solution:
    def threeSum(self, nums: [int]) -> [[int]]:
        res = []
        nums.sort()
        if len(nums) <= 2:
            return []
        for i in range(len(nums)-2):
            if i > 0 and nums[i] == nums[i-1]:
                continue 
            lo = i + 1
            hi = len(nums) - 1
            while lo < hi:
                threeSum = nums[lo] + nums[hi] + nums[i]
                if threeSum == 0:
                    res.append([nums[i], nums[lo], nums[hi]])
                    while lo < hi and nums[lo] == nums[lo+1]:
                        lo += 1
                    while lo < hi and nums[hi] == nums[hi-1]:
                        hi -= 1
                    lo += 1
                    hi -= 1
                elif threeSum < 0:
                    lo += 1
                else:
                    hi -= 1
        return res

print(Solution().threeSum([2,8,11,12,-8,0,15]))