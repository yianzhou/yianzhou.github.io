# https://leetcode-cn.com/problems/lru-cache/
# 146. LRU 缓存
# 当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值 Least Recently Used (LRU)，从而为新的数据值留出空间。

# 双向链表的节点
class LinkedNode:
    def __init__(self, key=0, value=0):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.size = 0
        # hash table + double linked list
        self.hashMap = dict()
        self.head = LinkedNode()
        self.tail = LinkedNode()
        # dummy head + dummy tail
        self.head.next = self.tail
        self.tail.next = self.head

    # 添加一个节点到头部
    def addToHead(self, node):
        node.prev = self.head
        node.next = self.head.next
        self.head.next.prev = node
        self.head.next = node
    
    # 删除一个节点
    def removeNode(self, node):
        node.next.prev = node.prev
        node.prev.next = node.next
        node = None
    
    # 将一个节点移到头部（标记为最近使用）
    def moveToHead(self, node):
        self.removeNode(node)
        self.addToHead(node)

    # 从尾巴移除一个节点（LRU）
    def removeTail(self):
        node = self.tail.prev
        self.removeNode(node)
        return node

    def get(self, key: int) -> int:
        if key not in self.hashMap:
            return -1
        node = self.hashMap[key]
        # 最近访问过，移动到头部
        self.moveToHead(node)
        return node.value

    def put(self, key: int, value: int) -> None:
        if key not in self.hashMap:
            node = LinkedNode(key, value)
            self.hashMap[key] = node
            self.addToHead(node)
            self.size += 1
            if self.size > self.capacity:
                removed = self.removeTail()
                self.hashMap.pop(removed.key)
                self.size -= 1
        else:
            node = self.hashMap[key]
            node.value = value
            self.moveToHead(node)