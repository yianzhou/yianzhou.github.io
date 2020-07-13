# 429. N叉树的层序遍历
# https://leetcode-cn.com/problems/n-ary-tree-level-order-traversal/

class Solution:
    def levelOrder(self, root: 'Node') -> List[List[int]]:
        if not root:
            return []
        res = []
        queue = []
        queue.append(root)
        while len(queue) != 0:
            level = []
            for i in range(len(queue)):
                temp = queue.pop(0)
                level.append(temp.val)
                for chi in temp.children:
                    queue.append(chi)
            res.append(level)
        return res