---
title:  "二叉树的反转"
categories: [Algorithms]
---

> [226. Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/description/)

这个题目的由来是，[Homebrew](https://brew.sh/) 的作者 [Max Howell](https://twitter.com/mxcl) 发了一个[推特](https://twitter.com/mxcl/status/608682016205344768)引发了热议：

> Google: 90% of our engineers use the software you wrote (Homebrew), but you can’t invert a binary tree on a whiteboard so fuck off.

Google 说，虽然我们 90% 的工程师都用你写的软件，但你不会反转二叉树，所以滚蛋吧。哈哈哈哈哈哈，于是底下跟了很多有关于“学算法到底有没有用”之类的讨论。

但其实这题，真的很简单……
```
private TreeNode invert(TreeNode x) {
    if (x==null) return null; //boundary
        
    TreeNode exch = x.left;
    x.left = x.right;
    x.right = exch;
    invert(x.left);
    invert(x.right);

    return x;
}
```