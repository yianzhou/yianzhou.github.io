# https://leetcode.com/problems/unique-paths-ii/
# 63. Unique Paths II

class Solution:
    def uniquePathsWithObstacles(self, obstacleGrid: [[int]]) -> int:
        m = len(obstacleGrid)
        if m < 1:
            return 0
        n = len(obstacleGrid[0])
        if n < 1:
            return 0
        if obstacleGrid[0][0] == 1:
            return 0
        obstacleGrid[0][0] = 1
        # 由于障碍物的存在，我们需要先构建第一行和第一列的路径数
        for R in range(1, m):
            obstacleGrid[R][0] = 1 if (obstacleGrid[R][0] == 0 and obstacleGrid[R-1][0] == 1) else 0
        for C in range(1, n):
            obstacleGrid[0][C] = 1 if (obstacleGrid[0][C] == 0 and obstacleGrid[0][C-1] == 1) else 0
        # 从(1,1)开始构造整个路径
        for R in range(1, m):
            for C in range(1, n):
                if obstacleGrid[R][C] == 1:
                    obstacleGrid[R][C] = 0
                else:
                    obstacleGrid[R][C] = obstacleGrid[R-1][C] + obstacleGrid[R][C-1]
        print(obstacleGrid)
        return obstacleGrid[m-1][n-1]

print(Solution().uniquePathsWithObstacles([[0,0,0],[0,1,0],[0,0,0]]))