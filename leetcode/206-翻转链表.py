# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
from ListNode import ListNode
from ListNode import UnorderedList

# 1. 迭代 2. 递归
class Solution:
    def reverseList(self, head: ListNode) -> ListNode:
        previous = None
        current = head
        while(current != None):
            temp = current.next
            current.next = previous
            previous = current
            current = temp
        return previous

class Solution2:
    def reverseList(self, head: ListNode) -> ListNode:
        if head == None or head.next == None:
            return head
        res = self.reverseList(head.next) # 我的下一个节点及以后的节点，都已经反转好了，返回值是 res
        head.next.next = head
        head.next = None
        return res

alist = UnorderedList()
alist.add(4)
alist.add(3)
alist.add(2)
alist.add(1)
print(Solution2().reverseList(alist.head))