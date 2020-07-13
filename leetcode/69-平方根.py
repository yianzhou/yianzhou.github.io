# https://leetcode.com/problems/sqrtx/
# 69. Sqrt(x)

class Solution:
    def mySqrt(self, x: int) -> int:
        half = x
        while half * half > x:
            half = half//2
        if half * half == x:
            return half
        else:
            while half * half <= x:
                half += 1
            half -= 1
            return half

print(Solution().mySqrt(9))
print(Solution().mySqrt(25))
print(Solution().mySqrt(81))
print(Solution().mySqrt(80))