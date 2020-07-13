# 145. Binary Tree Postorder Traversal
# https://leetcode.com/problems/binary-tree-postorder-traversal/

class Solution:
    def postorderTraversal(self, root: TreeNode) -> List[int]:
        res = []
        self.travel(root, res)
        return res
    
    def travel(self, node, res):
        if not node:
            return
        self.travel(node.left, res)
        self.travel(node.right, res)
        res.append(node.val)