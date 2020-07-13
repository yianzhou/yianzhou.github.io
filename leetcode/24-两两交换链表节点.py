# 24. Swap Nodes in Pairs
# https://leetcode.com/problems/swap-nodes-in-pairs/

# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
from ListNode import ListNode
from ListNode import UnorderedList

class Solution:
    def swapPairs(self, head: ListNode) -> ListNode:
        if head == None or head.next == None:
            return head
        cur = head
        n = cur.next
        cur.next = self.swapPairs(n.next)
        n.next = cur
        return n


alist = UnorderedList()
alist.add(4)
alist.add(3)
alist.add(2)
alist.add(1)
print(Solution().swapPairs(alist.head))