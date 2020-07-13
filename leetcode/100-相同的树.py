# 100. 相同的树
# https://leetcode-cn.com/problems/same-tree/

class Solution:
    def isSameTree(self, p: TreeNode, q: TreeNode) -> bool:
        if not p and q:
            return False
        if p and not q:
            return False
        if not p and not q:
            return True
        if p.val != q.val:
            return False
        if not self.isSameTree(p.left, q.left):
            return False
        if not self.isSameTree(p.right, q.right):
            return False
        return True