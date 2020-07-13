# 226. 翻转二叉树
# https://leetcode-cn.com/problems/invert-binary-tree/

class Solution:
    def invertTree(self, root: TreeNode) -> TreeNode:
        if not root:
            return
        self.invertTree(root.left)
        self.invertTree(root.right)
        root.left, root.right = root.right, root.left
        return root