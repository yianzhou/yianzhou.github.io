# https://leetcode.com/problems/longest-palindromic-substring/
# 5. Longest Palindromic Substring

class Solution:
    start = 0
    end = 0
    def longestPalindrome(self, s: str) -> str:
        for i in range(0, len(s)):
            self.expand(s, i, i)
            self.expand(s, i, i+1)
        return s[self.start:self.end+1]

    def expand(self, s, i, j):
        while i >=0 and j < len(s) and s[i] == s[j]:
            i -= 1
            j += 1
        i += 1
        j -= 1
        if (self.end - self.start) < (j-i):
            self.start = i
            self.end = j

print(Solution().longestPalindrome("babad"))
print(Solution().longestPalindrome("cbbd"))