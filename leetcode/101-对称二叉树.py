# 101. 对称二叉树
# https://leetcode-cn.com/problems/symmetric-tree/

class Solution:
    def isSymmetric(self, root: TreeNode) -> bool:
        if not root:
            return True
        return self.traverse(root.left, root.right)
    
    def traverse(self, p, q):
        if p == q:
            return True
        if not p or not q:
            return False
        if p.val != q.val:
            return False
        return self.traverse(p.left, q.right) and self.traverse(p.right, q.left)