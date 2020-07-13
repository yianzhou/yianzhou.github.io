# 236. 二叉树的最近公共祖先
# https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/

# p、q 一定存在
class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        return self.findPorQ(root, p, q)
    
    def findPorQ(self, root, p, q):
        if not root:
            return None
        # 前序遍历
        if root == p or root == q:
            return root
        left = self.findPorQ(root.left, p, q)
        right = self.findPorQ(root.right, p, q)
        if not left:
            return right
        if not right:
            return left
        return root
