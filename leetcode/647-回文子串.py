# 647. Palindromic Substrings
# https://leetcode.com/problems/palindromic-substrings/

class Solution:
    def countSubstrings(self, s: str) -> str:
        res = 0
        # [0...n] -> 2n-1 个中心扩散
        for i in range(0, len(s)):
            res += self.expand(s, i, i) # 回文子串长度为奇数
            res += self.expand(s, i, i+1) # 回文子串长度为偶数
        return res
    
    def expand(self, s, i, j):
        count = 0
        while i >=0 and j < len(s) and s[i] == s[j]:
            count += 1
            i -= 1
            j += 1
        return count

print(Solution().countSubstrings("abc"))
print(Solution().countSubstrings("aaa"))