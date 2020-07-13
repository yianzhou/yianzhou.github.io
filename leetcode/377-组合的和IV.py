# 377. Combination Sum IV
# https://leetcode.com/problems/combination-sum-iv/

# backtrack 超出时间限制！
class Solution:
    res = 0
    def combinationSum4(self, nums: [int], target: int) -> int:
        n = len(nums)
        def backtrack(candidates, path, target, res):
            if target < 0:
                return
            if target == 0:
                self.res += 1
                return
            for i in range(n):
                path.append(candidates[i])
                backtrack(candidates, path, target - candidates[i], res)
                path.pop()
        backtrack(nums, [], target, 0)
        return self.res

# f(i) = 和为 i 的组合数
# f(i) = sum{ f(i - num) for num in nums if i >= num }
# f(10, [1, 2, 3]) = f(9) + f(8) + f(7)

# 为什么 f(0) = 1 ？
# f(3, [1, 2, 3]) = f(2) + f(1) + f(0)
# f(1, [1, 2, 3]) = f(0)
# f(0) = 1 
class Solution2:
    def combinationSum4(self, nums: [int], target: int) -> int:
        res = 0
        dp = [0] * (target + 1)
        dp[0] = 1
        for i in range(target + 1):
            for num in nums:
                if num <= i:
                    dp[i] += dp[i - num]
        return dp[target]


print(Solution2().combinationSum4([1, 2, 3], 4))