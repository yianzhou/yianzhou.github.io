# https://leetcode-cn.com/problems/path-sum-iii/
# 437. 路径总和 III

class Solution:
    def pathSum(self, root: TreeNode, sum: int) -> int:
        if not root:
            return 0
        # 路径总数 = root 节点的路径数 + 左子树的路径数 + 右子树的路径数
        return self.dfs(root, sum) + self.pathSum(root.left, sum) + self.pathSum(root.right, sum)

    # 搜索根节点为 node 的树的和为 target 的路径数
    def dfs(self, node, target):
        if not node:
            return 0
        target -= node.val 
        return (1 if target == 0 else 0) + self.dfs(node.left, target) + self.dfs(node.right, target)

class Solution2:
    res = 0
    def pathSum(self, root: TreeNode, sum: int) -> int:
        # {key: 前缀和；value: 出现次数}
        hashMap = {}
        hashMap[0] = 1
        prefixSum = []
        self.dfs(root, sum, 0, hashMap)
        return self.res
    
    def dfs(self, node, target, prefixSum, hashMap):
        if not node:
            return 0
        prefixSum += node.val
        self.res += hashMap.get(prefixSum - target, 0)
        hashMap[prefixSum] = hashMap.get(prefixSum, 0) + 1
        self.dfs(node.left, target, prefixSum, hashMap)
        self.dfs(node.right, target, prefixSum, hashMap)
        hashMap[prefixSum] = hashMap[prefixSum] - 1