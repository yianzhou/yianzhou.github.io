# https://leetcode-cn.com/problems/longest-palindromic-substring/
# 5. Longest Palindromic Substring

class Solution2:
    start = 0
    end = 0
    def longestPalindrome(self, s: str) -> str:
        for i in range(0, len(s)):
            self.expand(s, i, i)
            self.expand(s, i, i+1)
        return s[self.start : self.end+1]

    def expand(self, s, i, j):
        while i >= 0 and j < len(s) and s[i] == s[j]:
            i -= 1
            j += 1
        i += 1
        j -= 1
        if (self.end - self.start) < (j-i):
            self.start = i
            self.end = j

class Solution:
    def longestPalindrome(self, s: str) -> str:
        N = len(s)
        length = 0
        res = ""
        dp = [[False for i in range(N)] for i in range(N)]
        for i in range(N-1, -1, -1):
            for j in range(i, N):
                if i == j:
                    dp[i][j] = True
                elif s[i] == s[j]:
                    # 边界条件是：[i + 1, j - 1] 不构成区间
                    if (j-1)-(i+1)+1 < 2:
                        dp[i][j] = True
                    else:
                        dp[i][j] = dp[i+1][j-1]
                if dp[i][j] and (j - i + 1) > length:
                    length = j - i + 1
                    res = s[i:j+1]
        return res

print(Solution().longestPalindrome("babad"))
print(Solution().longestPalindrome("cbbd"))