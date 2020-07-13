# 124. 二叉树中的最大路径和
# https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/

# 本题中，路径被定义为一条从树中任意节点出发，达到任意节点的序列。
# 定义一个递归方法，该方法的功能是：得到当前树的最大的路径和
# 而计算当前的最大路径和，是通过递归计算左右子树的最大路径和得到的。
# 注意，计算最大和这种问题，都需要考虑负数的情况，如果树的左/右支的最大和为负数，那么我们会“剪枝”
# 最终当前树的最大路径和为 Math.max(current.val, Math.max(左子树最大路径和，右子树最大路径和));

class Solution:
    res = 0
    def maxPathSum(self, root: TreeNode) -> int:
        self.res = root.val
        self.dfs(root)
        return self.res

    def dfs(self, node):
        if node == None:
            return 0
        left = max(0, self.dfs(node.left)) # 剪枝
        right = max(0, self.dfs(node.right)) # 剪枝
        # 后序遍历
        self.res = max(self.res, left + right + node.val) # 思考，如果没有这句，结果会是什么？答案：包含根节点的最大路径和。
        return max(left, right) + node.val # 以 node 为起点的最大路径和
        