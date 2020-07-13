# 210. Course Schedule II
# https://leetcode.com/problems/course-schedule-ii/

class Solution:
    def findOrder(self, numCourses: int, prerequisites: [[int]]) -> [int]:
        # 邻接表
        adjacency = [[] for _ in range(numCourses)]
        # 每个节点的入度
        inDegrees = [0] * numCourses
        # 结果
        res = []
        # 构造邻接表
        for cur, pre in prerequisites:
            adjacency[pre].append(cur)
            inDegrees[cur] += 1
        # 队列
        q = []
        for i in range(numCourses):
            if inDegrees[i] == 0:
                q.append(i)
        while len(q) != 0:
            i = q.pop()
            res.append(i)
            for v in adjacency[i]:
                inDegrees[v] -= 1
                if inDegrees[v] == 0:
                    q.append(v)
        
        return res if len(res) == numCourses else []

print(Solution().findOrder(2, [[1,0]]))