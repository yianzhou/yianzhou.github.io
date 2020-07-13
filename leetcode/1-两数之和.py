# 1. Two Sum
# https://leetcode.com/problems/two-sum/

# 哈希表存储：O(n), O(n)
class Solution:
    def twoSum(self, nums: [int], target: int) -> [int]:
        dic = {}
        for i in range(0, len(nums)):
            diff = target - nums[i]
            if diff in dic:
                return [dic[diff], i]
            dic[nums[i]] = i

# 暴力法：O(n^2), O(1)
class Solution2:
    def twoSum(self, nums: [int], target: int) -> [int]:
        n = len(nums)
        for i in range(n):
            for j in range(i + 1, n):
                if target == nums[i] + nums[j]:
                    return [i, j]
        return []

print(Solution2().twoSum([3,2,4], 6))