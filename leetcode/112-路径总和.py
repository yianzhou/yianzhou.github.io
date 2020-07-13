# 112. 路径总和
# https://leetcode-cn.com/problems/path-sum/
# 给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。

class Solution:
    def hasPathSum(self, root: TreeNode, sum: int) -> bool:
        return self.dfs(root, sum)

    def dfs(self, node, target):
        if not node:
            return False
        if node.val == target and not node.left and not node.right:
            return True
        return self.dfs(node.left, target - node.val) or self.dfs(node.right, target - node.val)