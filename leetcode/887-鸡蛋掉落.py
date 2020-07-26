# 887. 鸡蛋掉落
# https://leetcode-cn.com/problems/super-egg-drop/description/

import sys 
sys.setrecursionlimit(10000)

class Solution2:
    def superEggDrop(self, K: int, N: int) -> int:
        if K == 1: return N
        if N == 0:
            return 0
        res = N + 1 # 取一个最大值
        for i in range(1, N+1):
            # 在第 i 层摔碎了，鸡蛋数量 -1，楼层从 i-1 层继续尝试
            broken = self.superEggDrop(K-1, i-1) + 1
            # 在第 i 层没摔碎，鸡蛋数量不变，楼层从 i+1 层继续尝试
            good = self.superEggDrop(K, N-i) + 1
            res = min(res, max(broken, good))
        return res

# print(Solution().superEggDrop(4, 2000)) 超时，maximum recursion depth exceeded
class Solution3:
    cache = {}
    def superEggDrop(self, K: int, N: int) -> int:
        if K == 1: return N
        if N == 0: return 0
        if (K, N) in self.cache:
            return self.cache[(K, N)]
        res = float('INF')
        for i in range(1, N+1):
            # 在第 i 层摔碎了，鸡蛋数量 -1，楼层从 i-1 层继续尝试
            broken = self.superEggDrop(K-1, i-1)
            # 在第 i 层没摔碎，鸡蛋数量不变，楼层从 i+1 层继续尝试
            good = self.superEggDrop(K, N-i)
            res = min(res, max(broken, good) + 1)
        self.cache[(K, N)] = res
        return res

class Solution:
    cache = {}
    def superEggDrop(self, K: int, N: int) -> int:
        if K == 1: return N
        if N == 0: return 0
        if (K, N) in self.cache:
            return self.cache[(K, N)]
        res = float('INF')
        lo = 1
        hi = N
        while lo <= hi:
            mid = (lo + hi) // 2
            broken = self.superEggDrop(K-1, mid-1)
            good = self.superEggDrop(K, N-mid)
            if broken > good:
                hi = mid - 1
                res = min(res, broken + 1)
            else:
                lo = mid + 1
                res = min(res, good + 1)
        self.cache[(K, N)] = res
        return res

print(Solution().superEggDrop(3, 25))
print(Solution().superEggDrop(4, 2000))