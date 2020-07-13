# 108. 将有序数组转换为二叉搜索树
# https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/

class Solution:
    def sortedArrayToBST(self, nums: List[int]) -> TreeNode:
        return self.build(nums, 0, len(nums))
    
    def build(self, nums, start, end):
        if start >= end:
            return None
        i = start + (end-start)//2
        root = TreeNode(nums[i])
        root.left = self.build(nums, start, i-1)
        root.right = self.build(nums, i+1, end)
        return root