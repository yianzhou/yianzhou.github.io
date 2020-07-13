# 215. Kth Largest Element in an Array
# https://leetcode.com/problems/kth-largest-element-in-an-array/

# 1. 用 O(NlogN) 排序，用 O(N) 找到第 K 大的数
# 2. 用优先队列，维护优先队列的 size 为 K，最坏情况下时间复杂度为 O(n^2)
# 3. https://en.wikipedia.org/wiki/Quickselect 快速选择算法，类似于快排的分区思想
class Solution:
    def findKthLargest(self, nums: [int], k: int) -> int:
        def partition(nums, lo, hi):
            i = lo + 1
            j = hi
            while True:
                while i < hi and nums[i] <= nums[lo]:
                    i += 1
                while j > lo and nums[j] > nums[lo]:
                    j -= 1
                if i >= j:
                    break
                nums[i], nums[j] = nums[j], nums[i]
            nums[lo], nums[j] = nums[j], nums[lo]
            return j

        n = len(nums)
        k = n - k
        lo = 0
        hi = n - 1
        while lo < hi:
            # 找到位置 p，p 左边的数都比 nums[p] 小，右边的数都比 nums[p] 大
            p = partition(nums, lo, hi)
            if p < k:
                lo = p + 1
            elif p > k:
                hi = p - 1
            else:
                # 直到 p == k
                break
        return nums[k]

print(Solution().findKthLargest([3,2,1,5,6,4], 2))
print(Solution().findKthLargest([3,2,3,1,2,4,5,5,6], 4))
print(Solution().findKthLargest([3,3,3,3,3,3,3,3,3], 1))