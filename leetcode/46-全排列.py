# 46. Permutations
# https://leetcode.com/problems/permutations/

# 解决一个回溯问题，实际上就是一个决策树的遍历过程。你只需要思考 3 个问题：
# 1、选择列表：当前可以做的选择。
# 2、路径：已经做出的选择。
# 3、结束条件：到达决策树底层，无法再做选择。

# 回溯算法的代码框架：
result = []
def backtrack(candidates, path):
    if target:
        result.append(path[:])
        return
    for c in candidates: # N 叉树的每一层是当前满足条件的所有节点
        path.append(c)
        backtrack(candidates, path, target)
        path.pop()

# 其核心就是 for 循环里面的递归，在递归调用之前「做选择」，在递归调用之后「撤销选择」，特别简单。

class Solution:
    def permute(self, nums: [int]) -> [[int]]:
        res = []
        n = len(nums)
        chosen = [False] * n
        def backtrack(candidates, path, depth):
            if depth == n:
                res.append(path[:])
                return
            for i in range(n):
                if not chosen[i]:
                    path.append(candidates[i])
                    chosen[i] = True
                    backtrack(candidates, path, depth + 1)
                    chosen[i] = False
                    path.pop()
        backtrack(nums, [], 0)
        return res

print(Solution().permute([1,2,3]))