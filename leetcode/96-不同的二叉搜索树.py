# https://leetcode-cn.com/problems/unique-binary-search-trees/
# 96. 不同的二叉搜索树
# 求以 1...n 为节点组成的二叉搜索树有多少种

# 定义 f(i) = 以 i 为根节点的二叉搜索树的个数
# 定义 g(n) =  1...n 为节点组成的二叉搜索树的个数
# g(n) = f(1) + f(2) + ... + f(n) （1...n 每个数都可以作为根节点）
# 对于 f(i)，其左子树的节点数为 i-1，右子树的节点数为 n-i
# f(i) = g(i-1) * g(n-i)
# g(n) = g(0)*g(n-1) + g(1)*g(n-1) + ... + g(n-1)*g(0), g(0) = 1
# https://zh.wikipedia.org/wiki/卡塔兰数
class Solution:
    def numTrees(self, n: int) -> int:
        dp = [0] * (n + 1)
        dp[0] = 1
        dp[1] = 1
        for i in range(2, n+1):
            for j in range(1, i+1):
                dp[i] += dp[j-1] * dp[i-j]
        print(dp)
        return dp[n]

# 回溯法（超出时间限制）
class Solution2:
    def backtrack(self, start, end):
        if start > end:
            return 1
        res = 0
        for i in range(start, end+1):
            left = self.backtrack(start, i-1)
            right = self.backtrack(i+1, end)
            res += left * right
        return res
    
    def numTrees(self, n: int) -> int:
        return self.backtrack(1, n)

# 回溯法优化版
class Solution3:
    hashMap = {}

    def backtrack(self, start, end):
        if start > end:
            return 1
        res = 0
        for i in range(start, end+1):
            if (start, i-1) in self.hashMap:
                left = self.hashMap[(start, i-1)]
            else:
                left = self.backtrack(start, i-1)
                self.hashMap[(start, i-1)] = left
            if (i+1, end) in self.hashMap:
                right = self.hashMap[(i+1, end)]
            else:
                right = self.backtrack(i+1, end)
                self.hashMap[(i+1, end)] = right
            res += left * right
        return res
    
    def numTrees(self, n: int) -> int:
        return self.backtrack(1, n)
