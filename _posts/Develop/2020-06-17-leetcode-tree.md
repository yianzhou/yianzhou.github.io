---
title: 'leetcode-树'
categories: [Development]
---

* Do not remove this line (it will not be displayed)
{:toc}

# 树的定义

二叉树（英语：Binary tree）是每个节点最多只有两个分支的树结构。

![image](/assets/images/1_CMGFtehu01ZEBgzHG71sMg.png)

满二叉树：Full Binary Tree is a Binary Tree in which every node has 0 or 2 children.

完全二叉树：Complete Binary Tree has all levels completely filled with nodes except the last level and in the last level, all the nodes are as left side as possible.

完美二叉树：Perfect Binary Tree is a Binary Tree in which all internal nodes have 2 children and all the leaf nodes are at the same depth or same level.

平衡二叉树：Balanced Binary Tree is a Binary tree in which height of the left and the right sub-trees of every node may differ by at most 1.

退化二叉树（链表）：Degenerate Binary Tree is a Binary Tree where every parent node has only one child node.

二叉搜索树：指一棵空树或者具有下列性质的二叉树

1. 若任意节点的左子树不空，则左子树上所有节点的值均小于它的根节点的值；
2. 若任意节点的右子树不空，则右子树上所有节点的值均大于或等于它的根节点的值；
3. 任意节点的左、右子树也分别为二叉查找树；

![image](/assets/images/bfs_dfs.png)

# 94-二叉树中序遍历、144-二叉树前序遍历、145-二叉树后序遍历

这里我们的遍历用的是 DFS 算法，几乎所有的二叉树问题，都可以用 DFS 遍历来解决。

```python
def dfs(TreeNode root):
    if not root:
        return
    # preorder
    dfs(root.left)
    # inorder
    dfs(root.right)
    # postorder
```

递归实现时，是函数调用自身，一层层地嵌套下去，操作系统自动帮我们用栈来保存了每个调用的函数；如果不用递归实现，我们可以用栈来模拟这个调用过程。

```python
def inorderTraversal(self, root: TreeNode) -> List[int]:
    res = []
    stack = []
    while root or len(stack) != 0:
        while root:
            stack.append(root)
            root = root.left
        root = stack.pop()
        res.append(root.val)
        root = root.right
    return res
```

# 102-二叉树层序遍历

在实际使用中，我们用 DFS 的时候远远多于 BFS。不过，某些场景是 DFS 做不到的，只能使用 BFS，比如这道题目“层序遍历”。

BFS 会用到队列数据结构：

```python
def travel(self, node, res):
    if not node:
        return
    q = []
    q.append(node)
    while len(q) != 0:
        level = []
        for i in range(len(q)):
            temp = q.pop(0)
            if temp.left:
                q.append(temp.left)
            if temp.right:
                q.append(temp.right)
            level.append(temp.val)
        res.append(level)
```

# 429-N 叉树的层序遍历

扩展到 N 叉树的层序遍历：

```python
def levelOrder(self, root: 'Node') -> List[List[int]]:
    if not root:
        return []
    res = []
    queue = []
    queue.append(root)
    while len(queue) != 0:
        level = []
        for i in range(len(queue)):
            temp = queue.pop(0)
            level.append(temp.val)
            for chi in temp.children:
                queue.append(chi)
        res.append(level)
    return res
```

# 199-二叉树的右视图

与前面四种遍历不同，这道题目我们要按照「根结点 -> 右子树 -> 左子树」的顺序访问，就可以保证每层都最先访问最右边的节点。

```python
def dfs(self, node, depth, res):
    if not node:
        return
    # 每一层只取最右边节点
    # 若 res 数组与深度相同，说明是该层访问的第一个节点，把它加到 res 数组中
    if len(res) == depth:
        res.append(node.val)
    self.dfs(node.right, depth+1, res)
    self.dfs(node.left, depth+1, res)
```

也可以用层序遍历解决：

```python
def traverse(self, node, res):
    if not node:
        return
    queue = []
    queue.append(node)
    while len(queue) != 0:
        size = len(queue)
        for i in range(size):
            temp = queue.pop(0)
            if temp.left:
                queue.append(temp.left)
            if temp.right:
                queue.append(temp.right)
            if i == size - 1:
                res.append(temp.val)
```

# [124-二叉树中的最大路径和](https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/)

本题中，路径被定义为一条从树中任意节点出发，达到任意节点的序列。

我们很容易找到这样的递归结构：最大路径和 = 左子树最大路径和 + 右子树最大路径和 + 根节点，这是一个后序遍历。

注意，计算最大和这种问题，都需要考虑负数的情况，如果树的左/右支的最大和为负数，那么我们会“剪枝”。

```python
def dfs(self, node):
    if node == None:
        return 0
    left = max(0, self.dfs(node.left)) # 剪枝
    right = max(0, self.dfs(node.right)) # 剪枝
    # 后序遍历
    self.res = max(self.res, left + right + node.val)
    return max(left, right) + node.val # 注意这个返回值，很关键！是以 node 为起点的最大路径和
```

# [105-从前序与中序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

只有中序+后序、中序+先序可以唯一确定一棵二叉树。

根据前序遍历得到根节点，然后在中序遍历中找到根节点的位置，它的左边就是左子树的节点，右边就是右子树的节点。这很明显是一个前序遍历的过程。

![image](/assets/images/105.png)

```python
def build(self, preorder, preLeft, preRight, inorder, inLeft, inRight, inMap):
    if preLeft > preRight or inLeft > inRight:
        return None
    root = TreeNode(preorder[preLeft]) # 前序遍历
    rIndex = inMap[root.val] # 存储中序遍历中每个节点的位置
    root.left = self.build(preorder, preLeft + 1, preLeft + pIndex - inLeft, inorder, inLeft, rIndex - 1, inMap)
    root.right = self.build(preorder, preLeft + pIndex - inLeft + 1, preRight, inorder, rIndex + 1, inRight, inMap)
    return root
```

# 二叉搜索树

BST 的中序遍历是一个有序数组，BST 有关的问题都是利用这个特性解决。

## 99-恢复二叉搜索树

在一次遍历中找到被交换的数，然后将它们交换即可。

```python
def inorderTravel(self, node):
    if node == None:
        return
    self.inorderTravel(node.left)
    # 中序遍历
    if self.prev and node.val < self.prev.val:
        if self.left == None:
            self.left = self.prev
        self.right = node
    self.prev = node # node 是当前节点（i），prev 是之前的节点（i-1）
    self.inorderTravel(node.right)
```

## 98-验证二叉搜索树

在中序遍历的时候，实时检查当前节点的值是否大于前一个中序遍历到的节点的值即可。

```python
def isValidBST(self, root: TreeNode) -> bool:
    if root == None:
        return True
    if not self.isValidBST(root.left):
        return False
    # 中序遍历
    if self.pre and root.val <= self.pre.val:
        return False
    self.pre = root
    if not self.isValidBST(root.right):
        return False
    return True
```

## 108-将有序数组转换为二叉搜索树

有序数组转换成 BST 有多种答案。

```python
def sortedArrayToBST(self, nums: List[int]) -> TreeNode:
    return self.build(nums, 0, len(nums)-1)

def build(self, nums, start, end):
    if start > end:
        return None
    i = start + (end-start)//2
    root = TreeNode(nums[i]) # 前序遍历
    root.left = self.build(nums, start, i-1)
    root.right = self.build(nums, i+1, end)
    return root
```

## 230-二叉搜索树中第 K 小的元素

执行中序遍历得到有序数组，取 res[k-1] 即可。

# 100-相同的树

根节点相同、左子树相同、右子树也相同，这是一个前序遍历。

```python
def isSameTree(self, p: TreeNode, q: TreeNode) -> bool:
    if not p and q:
        return False
    if p and not q:
        return False
    if not p and not q:
        return True
    if p.val != q.val:
        return False
    if not self.isSameTree(p.left, q.left):
        return False
    if not self.isSameTree(p.right, q.right):
        return False
    return True
```

# 101-对称二叉树

若 p 和 q 相同，p.left 和 q.right 相同，p.right 和 q.left 相同，则为对称，这是一个前序遍历。

```python
def traverse(self, p, q):
    if p == q:
        return True
    if not p or not q:
        return False
    if p.val != q.val:
        return False
    return self.traverse(p.left, q.right) and self.traverse(p.right, q.left)
```

# 104-二叉树的最大深度

二叉树的最大深度等于 max(左子树的深度，右子树的深度) + 1，这是一个后序遍历。

```python
def depth(self, node):
    if not node:
        return 0
    left = self.depth(node.left)
    right = self.depth(node.right)
    return max(left, right) + 1
```

# 112-路径总和

给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。

当前节点是否满足条件，左子树是否满足条件、右子树是否满足条件；这是一个深度优先搜索，且是前序遍历。

```python
def dfs(self, node, target):
    if not node:
        return False
    if node.val == target and not node.left and not node.right:
        return True
    return self.dfs(node.left, target - node.val) or self.dfs(node.right, target - node.val)
```

# 113-路径总和 II

给定一个二叉树和一个目标和，找到所有从根节点到叶子节点路径总和等于给定目标和的路径。

这是一个深度优先搜索，且是前序遍历。这里还用到了回溯法的思想。

解决一个回溯问题，实际上就是一个决策树的遍历过程。你只需要思考 3 个问题：

1. 选择列表：当前可以走的路径，不断接近决策树底层。
2. 路径：已经做出的选择。
3. 结束条件：到达决策树底层，无法再做选择。

```python
def dfs(self, node, target, res, path):
    if not node:
        return
    # path 记录已经做出的选择
    path.append(node.val)
    # 到达决策树底层，结束
    if node.val == target and not node.left and not node.right:
        res.append(path[:])
        path.pop()
        return
    # 当前可以走的路径：node.left, node.right
    self.dfs(node.left, target - node.val, res, path)
    self.dfs(node.right, target - node.val, res, path)
    path.pop()
```

# 437-路径总和 III

最简单的方法，以每个节点为根节点，都算一遍和为 sum 的路径数。这是对 n 个节点的二叉树每个节点都执行一遍 dfs，对于高度平衡二叉树时间复杂度是 O(nlog(n))，极端情况下的斜二叉树时间复杂度为 O(n^2)。

```python
def pathSum(self, root: TreeNode, sum: int) -> int:
    if not root:
        return 0
    return self.dfs(root, sum) + self.pathSum(root.left, sum) + self.pathSum(root.right, sum)

def dfs(self, node, target):
    if not node:
        return 0
    target -= node.val
    return (1 if target == 0 else 0) + self.dfs(node.left, target) + self.dfs(node.right, target)
```

前缀和：给定数组 nums[]，定义 prefixSum[n] = nums[0] + nums[1] + ... + nums[n] 为数组的前缀和。那么则有：

nums[n] = prefixSum[n] - prefixSum[n-1]

nums[i] + ... + nums[j] = prefixSum[j] - prefixSum[i-1]

如果 prefixSum[i] == prefixSum[j]，那么 (i, j] 的区间的数的和一定为 0。

如果 prefixSum[i] + target == prefixSum[j]，那么(i, j] 的区间的数的和一定为 target。

应用这个技巧，对二叉树进行前序遍历：

```python
res = 0
def pathSum(self, root: TreeNode, sum: int) -> int:
    # {key: 前缀和；value: 出现次数}
    hashMap = {}
    hashMap[0] = 1
    prefixSum = []
    self.dfs(root, sum, 0, hashMap)
    return self.res
    
def dfs(self, node, target, prefixSum, hashMap):
    if not node:
        return 0
    prefixSum += node.val
    self.res += hashMap.get(prefixSum - target, 0)
    hashMap[prefixSum] = hashMap.get(prefixSum, 0) + 1
    self.dfs(node.left, target, prefixSum, hashMap)
    self.dfs(node.right, target, prefixSum, hashMap)
    hashMap[prefixSum] = hashMap[prefixSum] - 1
```

# 129-根到叶子节点数字之和

从根到叶子节点路径 1->2->3 代表数字 123。计算从根到叶子节点生成的所有数字之和。

路径的和 = 当前节点值 + 左子树和 + 右子树和，这是一个前序遍历，每深入一层，在上一层的结果上乘以 10。

```python
def dfs(self, node, sum):
    if not node:
        return 0
    temp = sum * 10 + node.val
    if not node.left and not node.right:
        return temp
    return self.dfs(node.left, temp) + self.dfs(node.right, temp)
```

# 226-翻转二叉树

将左右子树交换，递归进行。前序、后序遍历都可以解决。

```python
def invertTree(self, root: TreeNode) -> TreeNode:
    if not root:
        return
    # root.left, root.right = root.right, root.left
    self.invertTree(root.left)
    self.invertTree(root.right)
    root.left, root.right = root.right, root.left
    return root
```

# 236-二叉树的最近公共祖先

若 root == p 或 q，那么 root 就是 p、q 的最近公共祖先（p 或 q 本身）；

若左子树返回空，那么 p、q 不存在左子树中，返回右子树的结果；（右子树同样）

最后，如果左右子树都不为空，说明 p、q 分别在左右子树中，那么 root 就是公共最近祖先。

这是一个前序遍历。

```python
def findPorQ(self, root, p, q):
    if not root:
        return None
    # 前序遍历
    if root == p or root == q:
        return root
    left = self.findPorQ(root.left, p, q)
    right = self.findPorQ(root.right, p, q)
    if not left:
        return right
    if not right:
        return left
    return root
```
