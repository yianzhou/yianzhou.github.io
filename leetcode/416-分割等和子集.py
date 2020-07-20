# 416. 分割等和子集
# https://leetcode-cn.com/problems/partition-equal-subset-sum/
# 是否可以将数组分割成两个子集，使得两个子集的元素和相等。

class Solution2:
    def canPartition(self, nums: [int]) -> bool:
        S = sum(nums)
        if S % 2 != 0: return False
        S = S // 2
        N = len(nums)
        dp = [[False for i in range(S+1)] for i in range(N)]
        if nums[0] <= S: # 防止数组越界
            dp[0][nums[0]] = True
        for i in range(1, N):
            for j in range(1, S+1):
                if j < nums[i]:
                    dp[i][j] = dp[i-1][j]
                elif j == nums[i]:
                    dp[i][j] = True
                elif j > nums[i]:
                    dp[i][j] = dp[i-1][j] or dp[i-1][j-nums[i]]
        return dp[N-1][S]
    
    def canPartition2(self, nums):
        S = sum(nums)
        if S % 2 != 0: 
            return False
        n = len(nums)
        S = S // 2
        visited = [False for i in range(n)]
        cache = [-1 for i in range(S+1)]
        return self.dfs(nums, S, visited, cache)
    
    def dfs(self, nums, target, visited, cache):
        if target < 0:
            return False
        if target == 0:
            return True
        if cache[target] != -1:
            return cache[target]
        res = False
        for i in range(len(nums)):
            if not visited[i]:
                visited[i] = True
                if self.dfs(nums, target - nums[i], visited, cache):
                    res = True
                    break # 加上 break 后，执行时间从 2256ms 降到了 64ms！
                visited[i] = False
        cache[target] = res
        return res

# print(Solution().canPartition([1,2,5]))
# print(Solution().canPartition([1,5,11,5]))
# print(Solution().canPartition([2,2,3,5]))

class Solution:
    def canPartition(self, nums: [int]) -> bool:
        S = sum(nums)
        if S % 2 != 0: return False
        S = S // 2
        N = len(nums)
        dp = [False for i in range(S+1)]
        dp[0] = True
        for num in nums:
            for i in range(S, num-1, -1):
                dp[i] = dp[i] or dp[i-num]
        return dp[S]

print(Solution().canPartition([1,2,5]))
print(Solution().canPartition([1,5,11,5]))
print(Solution().canPartition([2,2,3,5]))
print(Solution().canPartition([1,2,3,4,5,6,7]))
print(Solution().canPartition([1,2,3,4]))
print(Solution().canPartition([23,13,11,7,6,5,5])) # True
# print(sum([1,2,3,4,5,6,7]))