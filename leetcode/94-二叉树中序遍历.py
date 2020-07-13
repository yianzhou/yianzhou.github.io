# 94. Binary Tree Inorder Traversal
# https://leetcode-cn.com/problems/binary-tree-inorder-traversal/

class Solution:
    def inorderTraversal(self, root: TreeNode) -> List[int]:
        return self.travel(root, [])

    def travel(self, node, res):
        if node == None:
            return
        self.travel(node.left, res)
        res.append(node.val)
        self.travel(node.right, res)
        return res

class Solution2:
    def inorderTraversal(self, root: TreeNode) -> List[int]:
        res = []
        stack = []
        while root or len(stack) != 0:
            while root:
                stack.append(root)
                root = root.left
            root = stack.pop()
            res.append(root.val)
            root = root.right
        return res
