# 144. Binary Tree Preorder Traversal
# https://leetcode.com/problems/binary-tree-preorder-traversal/

class Solution:
    def preorderTraversal(self, root: TreeNode) -> List[int]:
        res = []
        self.travel(root, res)
        return res

    def travel(self, node, res):
        if not node:
            return
        res.append(node.val)
        self.travel(node.left, res)
        self.travel(node.right, res)