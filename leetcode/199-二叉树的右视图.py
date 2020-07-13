# 199. 二叉树的右视图
# https://leetcode-cn.com/problems/binary-tree-right-side-view/

class Solution:
    def rightSideView(self, root: TreeNode) -> List[int]:
        res = []
        self.traverse(root, res)
        return res
    
    def traverse(self, node, res):
        if not node:
            return
        queue = []
        queue.append(node)
        while len(queue) != 0:
            size = len(queue)
            for i in range(size):
                temp = queue.pop(0)
                if temp.left:
                    queue.append(temp.left)
                if temp.right:
                    queue.append(temp.right)
                if i == size - 1:
                    res.append(temp.val)

class Solution2:
    def rightSideView(self, root: TreeNode) -> List[int]:
        res = []
        self.dfs(root, 0, res)
        return res
    
    def dfs(self, node, depth, res):
        if not node:
            return
        if len(res) == depth:
            res.append(node.val)
        self.dfs(node.right, depth+1, res)
        self.dfs(node.left, depth+1, res)