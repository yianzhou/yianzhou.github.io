# https://leetcode-cn.com/problems/maximum-length-of-repeated-subarray/submissions/
# 718. 最长重复子数组

class Solution:
    def findLength(self, A: List[int], B: List[int]) -> int:
        M = len(A) + 1
        N = len(B) + 1
        dp = [[0] * M for i in range(N)]
        res = 0
        for i in range(1, M):
            for j in range(1, N):
                if A[i-1] == B[j-1]:
                    dp[i][j] = dp[i-1][j-1] + 1
                    res = max(res, dp[i][j])
        return res