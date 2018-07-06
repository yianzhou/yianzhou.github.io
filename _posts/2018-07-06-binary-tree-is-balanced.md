---
title:  "二叉树是否平衡"
categories: [Algorithms]
---

# 二叉树是否平衡
原题地址：https://www.lintcode.com/problem/balanced-binary-tree/description

前言： 二叉树的相关术语并不是严格统一，不同的文献描述略有不同。计算机理论研究是不断发展的，相关的术语也会演化和变迁，而国内的教材基本都是翻译自国外的，所以会出现不同的说法，类似的情况可能还有树的高度的定义，有的根结点从0开始计数，有的从1开始计数。所以，**不用太较真**，解决问题即可。

平衡二叉树(Balanced Binary Tree)：它是一棵空树或它的左右两个子树的高度差不超过1，并且左右两个子树都是一棵平衡二叉树。

那么，我的解决方法是，对任意节点 x，满足以上条件即可。
```
private boolean isBalanced(Node x) {
    if (x == null) return true;
    return (Math.abs(height(x.left)-height(x.right)) <= 1) 
        && isBalanced(x.left) 
        && isBalanced(x.right);
}
```

计算树的高度也是采用递归，约定一个节点的树高度为 0：
``` 
private int height(Node x) {
    if (x == null) return -1;
    return 1 + Math.max(height(x.left), height(x.right));
}
```