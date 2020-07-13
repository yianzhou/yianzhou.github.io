# 102. Binary Tree Level Order Traversal
# https://leetcode.com/problems/binary-tree-level-order-traversal/

class Solution:
    def levelOrder(self, root: TreeNode) -> List[List[int]]:
        res = []
        self.travel(root, res)
        return res
    
    def travel(self, node, res):
        if not node:
            return
        q = []
        q.append(node)
        while len(q) != 0:
            level = []
            for i in range(len(q)):
                temp = q.pop(0)
                if temp.left:
                    q.append(temp.left)
                if temp.right:
                    q.append(temp.right)
                level.append(temp.val)
            res.append(level)