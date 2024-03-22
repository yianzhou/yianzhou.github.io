# 链表和图

## 链表

```cpp
struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};
```

### [2-两数相加](https://leetcode-cn.com/problems/add-two-numbers/)

考察链表基本的遍历操作，头部指针的存储（dummy），进位的技巧。

```cpp
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode *dummy = new ListNode(0);
        ListNode *head = dummy;
        int carry = 0;
        while (l1 || l2 || carry) {
            if (l1) {
                carry += l1->val;
                l1 = l1->next;
            }
            if (l2) {
                carry += l2->val;
                l2 = l2->next;
            }
            head->next = new ListNode(carry % 10);
            head = head->next;
            carry = carry >= 10 ? 1 : 0;
        }
        head = dummy->next;
        delete dummy;
        return head;
    }
};
```

### [19-删除链表的倒数第 N 个节点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)

拿到链表题目，先看头节点是否可能被操作，是的话则需要一个 `dummy.next = head` 记录头部，最后用于返回结果。

本题比较有技巧的一次过遍历方法是，用同向双指针、一快一慢，由于我们需要找到倒数第 n 个节点，因此可以使用 lo 和 hi 两个指针，hi 比 lo 超前 n 个节点，然后同时开始遍历，当 hi 到达链表末尾时，lo 恰好就处于倒数第 n 个节点。

```cpp
class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode *dummy = new ListNode(0);
        dummy->next = head;
        ListNode *quick = head;
        ListNode *slow = dummy;
        for (int i = 0; i < n; ++i) {
            quick = quick->next;
        }
        while (quick) {
            quick = quick->next;
            slow = slow->next;
        }
        slow->next = slow->next->next;
        head = dummy->next;
        delete dummy;
        return head;
    }
};
```

### [21-合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/)

链表基本操作：

```cpp
class Solution {
public:
    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
        ListNode *dummy = new ListNode(0);
        ListNode *head = dummy;
        while (l1 || l2) {
            if ((l1 && l2 && l1->val < l2->val) || (l1 && !l2)) {
                head->next = l1;
                l1 = l1->next;
            } else {
                head->next = l2;
                l2 = l2->next;
            }
            head = head->next;
        }
        head = dummy->next;
        delete dummy;
        return head;
    }
};
```

递归写法：

```cpp
class Solution {
public:
    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
        if (!l1) return l2;
        if (!l2) return l1;
        if (l1->val < l2->val) {
            l1->next = mergeTwoLists(l1->next, l2);
            return l1;
        } else {
            l2->next = mergeTwoLists(l1, l2->next);
            return l2;
        }
    }
};
```

### [24-两两交换链表节点](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)

链表节点交换的基本操作。

```cpp
class Solution {
public:
    ListNode* swapPairs(ListNode* head) {
        if (!head || !head->next) {
            return head;
        }
        ListNode *tmp = head->next;
        head->next = swapPairs(tmp->next);
        tmp->next = head;
        return tmp;
    }
};
```

### [141-链表中是否有环](https://leetcode-cn.com/problems/linked-list-cycle/)

给定一个链表，判断链表中是否有环。如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。

比较容易想到的是用哈希表或哈希集合存储访问过的节点，当再次访问到时，说明有环，需要 O(N) 的空间。

```cpp
class Solution {
public:
    bool hasCycle(ListNode *head) {
        unordered_set<ListNode *> set;
        while (head) {
            if (set.count(head) > 0)
                return true;
            set.insert(head);
            head = head->next;
        }
        return false;
    }
};
```

比较有技巧的是快、慢指针，如果列表不存在环，那么快指针就先到达了终点；反之，快、慢指针会在环中的某个位置相遇。时间复杂度 O(N)，空间复杂度 O(1)。

```cpp
class Solution {
public:
    bool hasCycle(ListNode *head) {
        ListNode *slow = head;
        ListNode *quick = head;
        while (quick && quick->next) {
            slow = slow->next;
            quick = quick->next->next;
            if (slow == quick) {
                return true;
            }
        }
        return false;
    }
};
```

### [206-反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)

迭代版本：

```cpp
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode *pre = nullptr;
        ListNode *cur = head;
        while (cur) {
            ListNode *tmp = cur->next;
            cur->next = pre;
            pre = cur;
            cur = tmp;
        }
        return pre;
    }
};
```

递归版本：

```cpp
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        if (!head || !head->next) {
            return head;
        }
        ListNode *newHead = reverseList(head->next);
        head->next->next = head;
        head->next = nullptr;
        return newHead;
    }
};
```

![img-40](/assets/images/9580b5d4-a5a1-4760-a362-d1c0ac31d228.png)

### [83-删除排序链表中的重复元素](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/)

```py
class Solution:
    def deleteDuplicates(self, head: ListNode) -> ListNode:
        if not head:
            return None
        a = head
        b = head.next
        while b:
            if a.val != b.val:
                a = a.next
                b = b.next
            else:
                while b.next and a.val == b.next.val:
                    b = b.next
                a.next = b.next
                b = b.next
        return head
```

### [82-删除排序链表中的重复元素 II](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii/)

给定一个排序链表，删除所有重复数字的节点，只保留原始链表中没有重复出现的数字。

拿到链表题目，先看头节点是否被操作，是的话则需要一个 `dummy.next = head` 记录头部，最后用于返回结果。

考虑到 1->1->1->2->3->4->NULL 这种边界情况，有可能头部节点要被删除，因此本题显然是需要 dummy 指针的。

先讲思路，我们用一前一后两个指针 a、b，如果节点 a 的值不等于节点 b 的值，那么指针 a、b 都向前移动一位。

反之，a 不动、b 向前移动，直到遇到一个与节点 a 不相等的值，中间重复的节点全部舍弃，然后用 next 指针连接起来即可！

考虑到上面所说的边界情况，此题我们令 a = dummy，b = head，不直接比较 a.val == b.val，而是比较 a.next.val 和 b.next.val。

```py
class Solution:
    def deleteDuplicates(self, head: ListNode) -> ListNode:
        dummy = ListNode(0)
        dummy.next = head
        a = dummy
        b = dummy.next
        while b and b.next:
            if a.next.val != b.next.val:
                a = a.next
                b = b.next
            else:
                while b and b.next and a.next.val == b.next.val:
                    b = b.next
                a.next = b.next
                b = b.next
        return dummy.next
```

## 图

### [207-课程表](https://leetcode-cn.com/problems/course-schedule/)、[210-课程表 II](https://leetcode-cn.com/problems/course-schedule-ii/)（拓扑排序）

你这个学期必须选修 n 门课程，记为 0 到 n-1。在选修 5 课程之前需要先修 3 课程，则用 [5, 3] 数组来表示这样的依赖关系。求可以学完课程的顺序。可能会有多个顺序，只需要返回其中一种；如果无法完成学习，返回空数组。

对于有优先级次序约束的调度问题，其计算机模型是有向图的拓扑排序，即将有向图的顶点按照以下的顺序排序：图中所有有向边，从序列中较前的顶点指向序列中较后的顶点。拓扑排序可能没有，也可能不止一种。一个有向图存在拓扑排序当且仅当它是一个有向无环图。

求出一种拓扑排序方法的最优时间复杂度为 O(n+m)，其中 n 和 m 分别是有向图 G 的节点数和边数。

广度优先搜索：构建邻接表时维护入度信息。在拓扑排序中，最前面的节点入度一定为 0，也就是它没有先修课程要求。当我们将一个节点加入答案中后，它相邻节点的入度均减一，代表少了一门先修课程的要求。如果某个节点入度变为 0，代表它可以开始学习。就这样，不断把入度为 0 的节点加入答案。

```cpp
class Solution {
public:
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adjacency(numCourses); // 邻接表
        vector<int> inDegrees(numCourses); // 每个节点的入度
        for (const vector<int> &vec : prerequisites) {
            adjacency[vec[1]].push_back(vec[0]);
            inDegrees[vec[0]] += 1;
        }
        vector<int> res; // 存储结果
        queue<int> q; // 队列中的课程等待被加入到结果中
        for (int i = 0; i < numCourses; ++i) {
            if (inDegrees[i] == 0)
                q.push(i); // 入度为 0 的节点先入列
        }
        while (!q.empty()) {
            int course = q.front();
            q.pop();
            res.push_back(course);
            for (int i : adjacency[course]) {
                inDegrees[i] -= 1;
                if (inDegrees[i] == 0) {
                    q.push(i);
                }
            }
        }
        return res.size() == numCourses ? res : vector<int>();
    }
};
```
