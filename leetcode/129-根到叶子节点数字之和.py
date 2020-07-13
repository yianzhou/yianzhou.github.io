# 129. 求根到叶子节点数字之和
# https://leetcode-cn.com/problems/sum-root-to-leaf-numbers/

# 从根到叶子节点路径 1->2->3 代表数字 123。计算从根到叶子节点生成的所有数字之和。
class Solution:
    def sumNumbers(self, root: TreeNode) -> int:
        return self.dfs(root, 0)

    def dfs(self, node, sum):
        if not node:
            return 0
        temp = sum * 10 + node.val
        if not node.left and not node.right:
            return temp
        return self.dfs(node.left, temp) + self.dfs(node.right, temp)
