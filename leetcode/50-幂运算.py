# 50. Pow(x, n)
# https://leetcode-cn.com/problems/powx-n/

class Solution:
    def myPow(self, x: float, n: int) -> float:
        # f(n) = x ^ n = x * x ^ (n-1)
        # return x * self.myPow(x, n-1) # stack over flow
        # f(n) = x ^ (n/2) * x ^ (n/2)
        if n < 0:
            return 1/self.myPow(x, -n)
        if n == 0:
            return 1
        if n == 1:
            return x
        else:
            pow2 = self.myPow(x, n//2)
            return pow2 * pow2 * (x if n % 2 == 1 else 1)

print(Solution().myPow(2.00000, 13))
print(Solution().myPow(2.00000, -2))