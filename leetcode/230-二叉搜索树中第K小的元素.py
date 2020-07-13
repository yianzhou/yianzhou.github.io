# 230. 二叉搜索树中第K小的元素
# https://leetcode-cn.com/problems/kth-smallest-element-in-a-bst/

class Solution:
    def kthSmallest(self, root: TreeNode, k: int) -> int:
        res = []
        self.dfs(root, res)
        return res[k-1]

    def dfs(self, node, res):
        if not node:
            return None
        self.dfs(node.left, res)
        res.append(node.val)
        self.dfs(node.right, res)