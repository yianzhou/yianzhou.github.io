# https://leetcode.com/problems/combination-sum/
# 39. Combination Sum

class Solution:
    def combinationSum(self, candidates: [int], target: int) -> [[int]]:
        res = []
        n = len(candidates)
        candidates.sort()
        def backtrack(candidates, path, target, start):
            if target < 0:
                return
            if target == 0:
                res.append(path[:])
                return
            for i in range(start, n):
                path.append(candidates[i])
                backtrack(candidates, path, target - candidates[i], i)
                path.pop()
        backtrack(candidates, [], target, 0)
        return res


print(Solution().combinationSum([2,3,5], 8))