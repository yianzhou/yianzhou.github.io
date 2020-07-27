# 10. 正则表达式
# https://leetcode-cn.com/problems/regular-expression-matching/


class Solution2:
    def isMatch(self, s: str, p: str) -> bool:
        if len(p) == 0:
            return len(s) == 0
        firstC = len(s) != 0 and p[0] in {s[0], '.'}  # 第一个字符是否匹配
        if len(p) >= 2 and p[1] == '*':
            return self.isMatch(s, p[2:]) or (firstC and self.isMatch(s[1:], p))
        else:
            return firstC and self.isMatch(s[1:], p[1:])


class Solution3:
    def isMatch(self, s: str, p: str) -> bool:
        return self.match(s, p, 0, 0)

    def match(self, s, p, i, j):
        if j >= len(p):
            return i >= len(s)
        firstC = i < len(s) != 0 and p[j] in {s[i], '.'}
        if j < len(p) - 1 and p[j+1] == '*':
            return self.match(s, p, i, j+2) or (firstC and self.match(s, p, i+1, j))
        else:
            return firstC and self.match(s, p, i+1, j+1)


class Solution4:
    def isMatch(self, s: str, p: str) -> bool:
        cache = {}
        return self.match(s, p, 0, 0, cache)

    def match(self, s, p, i, j, cache):
        if j >= len(p):
            return i >= len(s)
        if (i, j) in cache:
            return cache[(i, j)]
        firstC = i < len(s) != 0 and p[j] in {s[i], '.'}
        if j < len(p) - 1 and p[j+1] == '*':
            cache[(i, j)] = self.match(s, p, i, j+2,
                                       cache) or (firstC and self.match(s, p, i+1, j, cache))
            return cache[(i, j)]
        else:
            cache[(i, j)] = firstC and self.match(s, p, i+1, j+1, cache)
            return cache[(i, j)]

class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        M = len(s)
        N = len(p)
        dp = [[False for _ in range(N+1)] for _ in range(M+1)]
        # 初始化
        dp[0][0] = True
        for j in range(1, N+1):
            if p[j-1] == '*':
                dp[0][j] = dp[0][j-2]
        # 计算
        for i in range(1, M+1):
            for j in range(1, N+1):
                if p[j-1] in {s[i-1], '.'}:
                    dp[i][j] = dp[i-1][j-1]
                elif p[j-1] == '*':
                    if p[j-2] in {s[i-1], '.'}:
                        dp[i][j] = dp[i][j-2] or dp[i-1][j-2] or dp[i-1][j]
                    else:
                        dp[i][j] = dp[i][j-2]
        return dp[M][N]

print(Solution().isMatch("aa", "a"))
print(Solution().isMatch("mississippi", "mis*is*p*."))
print(Solution().isMatch("aa", "a*"))
print(Solution().isMatch("ab", ".*"))
print(Solution().isMatch("aab", "c*a*b"))
print(Solution().isMatch("ab", ".*.."))
