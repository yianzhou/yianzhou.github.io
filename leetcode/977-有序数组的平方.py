# 977. Squares of a Sorted Array
# https://leetcode.com/problems/squares-of-a-sorted-array/

class Solution:
    def sortedSquares(self, A: [int]) -> [int]:
        # 首先找到第一个大于零的数
        j = 0
        n = len(A)
        while j < n and A[j] < 0:
            j += 1
        i = j - 1
        # e.g. -100, -10, i, j, 10, 100
        res = []
        while i >= 0 or j < n:
            if i < 0:
                res.append(A[j]**2)
                j += 1
            elif j >= n:
                res.append(A[i]**2)
                i -= 1
            else:
                i2 = A[i]**2
                j2 = A[j]**2
                if i2 <= j2:
                    res.append(i2)
                    i -= 1
                else:
                    res.append(j2)
                    j += 1
        return res

print(Solution().sortedSquares([-4,-1,0,3,10]))