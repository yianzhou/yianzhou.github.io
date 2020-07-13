class ListNode:
    def __init__(self, data):
        self.data = data
        self.next = None
    
    def getData(self):
        return self.data
    
    def setData(self, data):
        self.data = data
    
    def getNext(self):
        return self.next

    def setNext(self, next):
        self.next = next
    
    def __str__(self):
        s = ""
        current = self
        while current != None:
            s = s + str(current.data) + "->"
            current = current.next
        s = s + "None"
        return s
        
class UnorderedList:
    def __init__(self):
        self.head = None

    def isEmpty(self):
        return self.head == None

    def add(self, item):
        temp = ListNode(item)
        temp.next = self.head
        self.head = temp

    def __str__(self):
        s = ""
        current = self.head
        while current != None:
            s = s + str(current.data) + "->"
            current = current.next
        s = s + "None"
        return s

    def length(self):
        current = self.head
        count = 0
        while current != None:
            count = count + 1
            current = current.next
        return count

    def search(self, item) -> bool:
        current = self.head
        while current != None:
            if current.data == item:
                return True
            current = current.next
        return False

    def remove(self, item):
        current = self.head
        previous = None
        while current != None:
            if current.data == item:
                if previous == None:
                    self.head = current.next
                else:
                    previous.next = current.next
                return
            previous = current
            current = current.next

    def index(self, item):
        current = self.head
        i = 0
        while current != None:
            if current.data == item:
                return i
            i = i + 1
            current = current.next
        return -1

    # 在列表的最后位置添加item
    def append(self, item):
        temp = ListNode(item)
        if self.head == None:
            self.head = temp
            return
        current = self.head
        previous = None
        while current != None:
            previous = current
            current = current.next
        previous.next = temp

    def insert(self, pos, item):
        temp = ListNode(item)
        current = self.head
        previous = None
        i = 0
        if pos == 0:
            self.head = temp
            temp.next = current
            return
        while current != None:
            if i == pos:
                temp.next = current
                previous.next = temp
                return
            previous = current
            current = current.next
            i = i + 1
        if i == pos and i > 0:
            previous.next = temp
            temp.next = None

    # 移除最后一个元素
    def pop(self):
        current = self.head
        previous = None
        if current == None:
            return None
        while current != None:
            if current.next == None:
                if previous == None:
                    self.head = None
                else:
                    previous.next = None
                return current.data
            previous = current
            current = current.next
            
# alist = UnorderedList()
# print(alist.index(10))
# alist.add(1)
# alist.add(2)
# alist.add(3)
# alist.add(4)
# alist.add(5)
# alist.add(6)
# alist.add(7)
# alist.add(8)
# alist.insert(0, 'A')
# alist.insert(0, 'B')
# alist.insert(1, 'C')
# alist.insert(0, 'D')
# alist.insert(4, 'E')
# alist.insert(0, 'F')
# alist.append(100)
# alist.append(200)
# alist.append(300)
# print(alist)
# print(alist.pop())
# print(alist.pop())
# print(alist.pop())
# print(alist.pop())
# print(alist)
# print(alist.length())
# print(alist.search(1))
# print(alist.search(10))
# alist.remove(4)
# alist.remove(3)
# print(alist.index(8))
# print(alist.index(4))
# print(alist.index(0))
