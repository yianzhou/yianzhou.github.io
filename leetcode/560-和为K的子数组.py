# https://leetcode-cn.com/problems/subarray-sum-equals-k/
# 560. 和为K的子数组

# 第一步，首先想到的是，i 从 0 往右遍历，j 从 i 往右遍历，计算所有子数组的和，并和k做比较。
class Solution:
    def subarraySum(self, nums: [int], k: int) -> int:
        res = 0
        for i in range (0, len(nums)):
            iSum = 0 # i...j的和
            for j in range (i, len(nums)):
                iSum += nums[j]
                if iSum == k:
                    res += 1
        return res

# 第二步，优化
# 定义 f(i) = sum(0...i)
# 那么 f(j) = sum(0...j)
# f(i...j) = f(j) - f(i-1)
# 问题：求满足 f(i...j) = k 的 (i, j) 组合个数
# f(j) - f(i-1) = k
# f(j) - k = f(i-1)
# 因为 j > i，当计算 f(j) 时，f(i-1) 是被计算过的，所以我们可以把结果存下来，快速访问！
class Solution2:
    def subarraySum(self, nums: List[int], k: int) -> int:
        N = len(nums)
        preSum = 0
        res = 0
        dic = {}
        dic[0] = 1 # 代表 preSum[i] - k = 0 这种情况
        for i in range(N):
            preSum += nums[i]
            if preSum - k in dic:
                res += dic[preSum - k]
            dic[preSum] = dic.get(preSum, 0) + 1
        return res

print(Solution2().subarraySum([28,54,7,-70,22,65,-6], 100)) 
print(Solution2().subarraySum([0,0,0,0,0,0,0,0,0,0], 0)) 