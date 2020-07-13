# 40. Combination Sum II
# https://leetcode.com/problems/combination-sum-ii/

class Solution:
    def combinationSum2(self, candidates: [int], target: int) -> [[int]]:
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
                if i > start and candidates[i] == candidates[i-1]: continue
                path.append(candidates[i])
                backtrack(candidates, path, target - candidates[i], i + 1)
                path.pop()
        backtrack(candidates, [], target, 0)
        return res

print(Solution().combinationSum2([10,1,2,7,6,1,5], 8))
print(Solution().combinationSum2([2,5,2,1,2], 5))