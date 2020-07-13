# https://leetcode.com/problems/valid-palindrome/
# 125. Valid Palindrome

from collections import deque

class Solution:
    def isPalindrome(self, s: str) -> bool:
        if len(s) == 0 or len(s) == 1:
            return True

        lowerS = s.lower()
        dq = deque()
        for c in lowerS:
            if c.isalnum():
                dq.appendleft(c) 
        print(dq)
        while len(dq) >= 2:
            right = dq.pop()
            left = dq.popleft()
            if left != right:
                return False
        
        return True

s = Solution()
print(s.isPalindrome("A man, a plan, a canal: Panama"))