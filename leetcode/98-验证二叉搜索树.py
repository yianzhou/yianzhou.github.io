# 98. 验证二叉搜索树
# https://leetcode-cn.com/problems/validate-binary-search-tree/

class Solution:
    pre = None
    def isValidBST(self, root: TreeNode) -> bool:
        if root == None:
            return True
        if not self.isValidBST(root.left):
            return False
        if self.pre and root.val <= self.pre.val:
            return False
        self.pre = root
        if not self.isValidBST(root.right):
            return False
        return True