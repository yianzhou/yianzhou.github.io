# https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/
# 104. 二叉树的最大深度

class Solution:
    def maxDepth(self, root: TreeNode) -> int:
        return self.depth(root)
        
    def depth(self, node):
        if not node:
            return 0
        left = self.depth(node.left)
        right = self.depth(node.right)
        d = max(left, right)
        return d + 1