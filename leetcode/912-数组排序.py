# https://leetcode-cn.com/problems/sort-an-array/
# 912. 排序数组

class Solution:
    def sortArray(self, nums: [int]) -> [int]:
        return self.sort(nums, 0, len(nums) - 1)
    
    def sort(self, nums, lo, hi):
        if (hi <= lo): return nums
        j = self.partition(nums, lo, hi)
        self.sort(nums, lo, j-1)
        self.sort(nums, j+1, hi)
        return nums
    
    def partition(self, nums, lo, hi):
        pa = nums[lo]
        i = lo + 1
        j = hi
        while True:
            while(i <= hi and nums[i] < pa):
                i += 1
            while(j >= lo and nums[j] > pa):
                j -= 1
            if i >= j: break
            nums[i], nums[j] = nums[j], nums[i]
            i += 1
            j -= 1
        nums[lo], nums[j] = nums[j], nums[lo]
        return j

print(Solution().sortArray([5,2,3,1]))