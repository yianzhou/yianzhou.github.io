# 149. Max Points on a Line
# https://leetcode.com/problems/max-points-on-a-line/

# 求最大公约数
# greatest common divisor
# 20 和 12 的最大公约数是 4
# 0 与 d 的最大公约数是 d
# gcd 函数满足交换律：gcd(a, b) = gcd(b, a)
def gcd(a, b):
     # 辗转相除法
    if b == 0:
        return a
    else:
        return gcd(b, a % b)

# 求最小公倍数
# least common multiple
def lcm(a, b):
    return a * b / gcd(a, b)

# 如何判断三点共线？
# 直线的点斜式，一条直线可以用一个点和斜率唯一确定: y-y0 = k(x-x0)
# 两点组成一条直线，斜率为 k：y2-y1 = k(x2-x1)
# 对于第三个点，如果满足 y3-y1 = k(x3-x1)，即斜率相等，那么 (x1, y1), (x2, y2), (x3, y3) 三点共线
# 特殊情况：重复的点
class Solution:
    def maxPoints(self, points: [[int]]) -> int:
        # n 是问题大小
        n = len(points)
        if n <= 2:
            return n
        res = 0
        # 时间复杂度：O(n^2)
        # 运算次数：(n-1) + (n-2) + ... + 1
        for i in range(0, n):
            # 对于每一个点：(xi, yi)
            dic = {}
            overlap = 0 # 记录重复的点
            iMax = 0 # 记录经过 i 点的直线，可以经过的最多的点
            for j in range (i+1, n):
                # 与第二个点 (xj, yj) 共同确定一条直线，斜率为 k
                deltaX = points[j][0] - points[i][0]
                deltaY = points[j][1] - points[i][1]
                if deltaX == 0 and deltaY == 0:
                    overlap += 1
                else:
                    # k = deltaY / deltaX
                    # 分子分母进行约分
                    g = gcd(deltaX, deltaY)
                    deltaX /= g
                    deltaY /= g
                    if (deltaX, deltaY) in dic:
                        dic[(deltaX, deltaY)] = dic[(deltaX, deltaY)] + 1
                    else:
                        dic[(deltaX, deltaY)] = 1
                    iMax = max(iMax, dic[(deltaX, deltaY)])
            res = max(res, iMax + overlap)
        return res + 1

s = Solution()
# res = s.maxPoints([[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]])
res = s.maxPoints([[0,0],[1,1],[0,0]])
print(res)