# 1143. 最长公共子序列
# https://leetcode-cn.com/problems/longest-common-subsequence/

class Solution2:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        M = len(text1) - 1
        N = len(text2) - 1
        return self.dfs(text1, text2, M, N)

    def dfs(self, text1, text2, i, j):
        if i < 0 or j < 0:
            return 0
        if text1[i] == text2[j]:
            # 找到一个公共字符
            return self.dfs(text1, text2, i-1, j-1) + 1
        else:
            left = self.dfs(text1, text2, i-1, j)
            right = self.dfs(text1, text2, i, j-1)
            return max(left, right)

class Solution3:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        return self.dfs(text1, text2, 0, 0)
    
    def dfs(self, text1, text2, i, j):
        if i == len(text1) or j == len(text2):
            # 到达字符串末尾
            return 0
        if text1[i] == text2[j]:
            # 找到一个公共字符
            return self.dfs(text1, text2, i+1, j+1) + 1
        else:
            left = self.dfs(text1, text2, i+1, j) # text1[i] 不在 LCS 中的情况
            right = self.dfs(text1, text2, i, j+1) # text2[j] 不在 LCS 中的情况
            return max(left, right) # 两者取较大值

class Solution4:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        cache = {}
        return self.dfs(text1, text2, 0, 0, cache)
    
    def dfs(self, text1, text2, i, j, cache):
        if i == len(text1) or j == len(text2):
            # 到达字符串末尾
            return 0
        if (i, j) in cache:
            return cache[(i, j)]
        if text1[i] == text2[j]:
            # 找到一个公共字符
            cache[(i, j)] = self.dfs(text1, text2, i+1, j+1, cache) + 1
            return cache[(i, j)]
        else:
            cache[i+1, j] = self.dfs(text1, text2, i+1, j, cache) # text1[i] 不在 LCS 中的情况
            cache[i, j+1] = self.dfs(text1, text2, i, j+1, cache) # text2[j] 不在 LCS 中的情况
            cache[i, j] = max(cache[i+1, j], cache[i, j+1])
            return cache[i, j] # 两者取较大值

class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        M = len(text1)
        N = len(text2)
        dp = [[0 for i in range(N+1)] for i in range(M+1)]
        for i in range(1, M+1):
            for j in range(1, N+1):
                if text1[i-1] == text2[j-1]:
                    dp[i][j] = dp[i-1][j-1] + 1
                else:
                    dp[i][j] = max(dp[i-1][j], dp[i][j-1])
        return dp[M][N]

print(Solution().longestCommonSubsequence("abcde", "ace"))
print(Solution().longestCommonSubsequence("ylqpejqbalahwr", "yrkzavgdmdgtqpg"))