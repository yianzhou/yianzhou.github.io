# https://leetcode-cn.com/problems/linked-list-cycle/
# 141. 环形链表

# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    # 哈希集合，存储访问过的节点
    def hasCycle(self, head: ListNode) -> bool:
        s = set()
        res = False
        cur = head
        while cur != None:
            if cur in s:
                return True
            s.add(cur)
            cur = cur.next
        return res

class Solution2:
    # 双指针
    # 如果列表中不存在环，最终快指针将会最先到达尾部
    # 如果列表中存在环，把慢指针和快指针想象成两个在环形赛道上跑步的运动员，他们一定会在某一圈相遇
    def hasCycle(self, head: ListNode) -> bool:
        if head == None or head.next == None:
            return False
        slow = head
        fast = head.next
        while slow != fast:
            if fast == None or fast.next == None:
                return False
            slow = slow.next
            fast = fast.next.next
        return True
        