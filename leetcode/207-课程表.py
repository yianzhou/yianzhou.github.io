# 207. Course Schedule
# https://leetcode.com/problems/course-schedule/

class Solution:
    def canFinish(self, numCourses: int, prerequisites: [[int]]) -> bool:
        # 对 i 节点进行 dfs，返回 i 节点是否无环
        def dfs(i, adjacency, flags):
            # 当前节点已 dfs 完毕，且无环，直接返回
            if flags[i] == 2: return True
            # 当前节点重复触发了 dfs，说明有环！
            if flags[i] == 1: return False
            # 标记
            flags[i] = 1
            # 当前顶点有邻接顶点，对所有邻接顶点进行 dfs
            for j in adjacency[i]:
                if not dfs(j, adjacency, flags): return False
            # 已 dfs 完毕/没有邻接顶点的，标记 2，返回
            flags[i] = 2
            return True
            
        # 邻接表，每个顶点连接的顶点的数组
        adjacency = [[] for _ in range(numCourses)]
        # dfs 的标记位
        # dfs 有三种状态
        # 0 - 顶点未被访问过
        # 1 - 对当前节点启动 dfs
        # 2 - 对当前节点的 dfs 已完毕
        flags = [0 for _ in range(numCourses)]
        # 完成 pre 才能完成 cur，则顶点连接表示为 pre -> cur
        for cur, pre in prerequisites:
            adjacency[pre].append(cur)
        for i in range(numCourses):
            if not dfs(i, adjacency, flags): return False
        return True