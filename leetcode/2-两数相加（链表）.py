# https://leetcode.com/problems/add-two-numbers/
# 2. Add Two Numbers

class ListNode:
    def __init__(self, val):
        self.val = val
        self.next = None
    
    def getNext(self):
        return self.next

    def setNext(self, next):
        self.next = next

class Solution:
    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
        dummy = cur = ListNode(0)
        carry = 0
        while l1 or l2 or carry:
            if l1:
                carry += l1.val
                l1 = l1.next
            if l2:
                carry += l2.val
                l2 = l2.next
            cur.next = ListNode(carry%10) # 取余数
            cur = cur.next
            carry //= 10 # 取商的整数（向下取整）
        return dummy.next

l1 = ListNode(9)
l1.setNext(ListNode(8))
l2 = ListNode(1)
l2.setNext(ListNode(3))
s = Solution()
l = s.addTwoNumbers(l1, l2)
print(l)