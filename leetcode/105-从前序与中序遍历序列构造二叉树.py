# 105. 从前序与中序遍历序列构造二叉树
# https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/

# preorder = [3,9,20,15,7]
# inorder = [9,3,15,20,7]
# 根据前序遍历得到根节点，然后在中序遍历中找到根节点的位置，它的左边就是左子树的节点，右边就是右子树的节点。
# 这很明显是一个前序遍历的过程。

class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> TreeNode:
        # 存储中序遍历中每个节点的位置
        inMap = {}
        for i in range(len(inorder)):
            inMap[inorder[i]] = i
        return self.build(preorder, 0, len(preorder) - 1, inorder, 0, len(inorder) - 1, inMap)

    def build(self, preorder, preLeft, preRight, inorder, inLeft, inRight, inMap):
        if preLeft > preRight or inLeft > inRight:
            return None
        root = TreeNode(preorder[preLeft]) # 前序遍历
        rIndex = inMap[root.val]
        root.left = self.build(preorder, preLeft + 1, preLeft + rIndex - inLeft, inorder, inLeft, rIndex - 1, inMap)
        root.right = self.build(preorder, preLeft + rIndex - inLeft + 1, preRight, inorder, rIndex + 1, inRight, inMap)
        return root