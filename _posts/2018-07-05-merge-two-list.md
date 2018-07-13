---
title:  "合并两个有序链表"
categories: [Algorithms]
---

# 合并两个有序链表

原题地址：<https://leetcode.com/problems/merge-two-sorted-lists/description/>

假设链表 L1 和 L2 都是有序的，要将它们合并为新的有序链表，就像归并排序一样，左边小就从左边拿，右边小就从右边拿。运用递归思想。这个算法也是很简洁以及有美感的！

```
private Node merge(Node l1, Node l2) {
    // boundary
    if (l1==null) return l2;
    if (l2==null) return l1;
    
    Node x; // the merged list
    if (l1.val < l2.val) {
        x = l1; // get from left
        x.next = merge(l1.next, l2);
    }
    else {
        x = l2; // get from right
        x.next = merge(l1, l2.next);
    }
    return x;
}
```

©️ 本文原创，转载请注明出处。