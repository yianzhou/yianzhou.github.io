# 99. 恢复二叉搜索树
# https://leetcode-cn.com/problems/recover-binary-search-tree/

# 本题不需要改变二叉树结构，只需要交换节点的值即可
# 本题中的二叉树，有两个节点被错误交换了，只需要找到这两个节点，并交换它们的值即可
# BST 的中序遍历是一个有序数组，例如：[1,2,3,4,5] 
# 交换有两种情况，一是相邻的数交换：[1,2,4,3,5]；二是不相邻的数交换：[1,4,3,2,5]
# 在一次遍历中找到被交换的数，然后将它们交换即可。

# arr = [1,4,3,2,5]
arr = [1,2,4,3,5]
left = right = -1
for i in range(1, len(arr)):
    if (arr[i] < arr[i-1]):
        if left == -1:
            left = i-1
        right = i
arr[left], arr[right] = arr[right], arr[left]
print(arr)

class Solution:
    left = right = None
    prev = None # 相当于 for 循环遍历中的 i
    def recoverTree(self, root: TreeNode) -> None:
        self.inorderTravel(root)
        self.left.val, self.right.val = self.right.val, self.left.val

    def inorderTravel(self, node):
        if node == None:
            return
        self.inorderTravel(node.left)
        if self.prev and node.val < self.prev.val:
            if self.left == None:
                self.left = self.prev
            self.right = node
        self.prev = node # node 是当前节点（i），prev 是之前的节点（i-1）
        self.inorderTravel(node.right)
            