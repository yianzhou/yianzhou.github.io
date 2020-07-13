# 113. 路径总和 II
# https://leetcode-cn.com/problems/path-sum-ii/
# 给定一个二叉树和一个目标和，找到所有从根节点到叶子节点路径总和等于给定目标和的路径。

class Solution:
    def pathSum(self, root: TreeNode, sum: int) -> List[List[int]]:
        res = []
        self.dfs(root, sum, res, [])
        return res
    
    def dfs(self, node, target, res, path):
        if not node:
            return
        # path 记录已经做出的选择
        path.append(node.val)
        # 到达决策树底层，结束
        if node.val == target and not node.left and not node.right:
            res.append(path[:])
            path.pop()
            return
        # 当前可以走的路径：node.left, node.right
        self.dfs(node.left, target - node.val, res, path)
        self.dfs(node.right, target - node.val, res, path)
        path.pop()