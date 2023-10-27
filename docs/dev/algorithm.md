# 数据结构与算法

## 数据结构

**从内存的角度看，数据的存储方式只有两种：数组（顺序存储）和链表（链式存储）。**

```cpp
struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};
```

数组需要开辟一块连续的内存空间，可以直接使用内存地址、以 O(1) 的时间复杂度访问元素；如果要扩容，需要重新分配一块更大的空间，再把数据全部复制过去，时间复杂度 O(N)；尾部插入/删除 O(1)，如果想在数组中间进行插入和删除，每次必须搬移后面的所有数据以保持连续，时间复杂度 O(N)。搜索需要 O(N) 遍历。

链表的内存空间是不连续的，不能随机访问，不存在扩容问题。操作指针即可插入/删除元素，时间复杂度 O(1)。由于每个元素必须存储指向后元素的指针，会消耗相对更多的储存空间。

栈、队列、双端队列，既可以用数组、也可以用链表实现。

哈希表，就是通过哈希函数把键映射到一个大数组里。插入、删除、搜索的时间复杂度都是 O(1)，最坏情况下是 O(N)，但只要哈希函数写对了这种情况很少见。需要扩容缩容。扩容需要 rehash，时间复杂度是 O(logN)。装载因子 (load factor) = n / k，n 是元素个数，k 是哈希表的 size。常常建议散列表的大小为素数。当哈希函数把两个元素放入同一个 slot 时，就发生了哈希冲突。Rehash（再散列）指发生冲突后，寻找另一个 slot 的过程。处理冲突的方式包括线性探测和链接法。

- 线性探测：顺序遍历哈希表的下一个槽，直到找到一个空槽。若所有槽都满了，则需要对表进行扩容。
- 链接法：让每个槽有一个指向元素集合（链表）的引用。

树的常见实现是用链表，衍生出各种设计如二叉搜索树、AVL 树、红黑树等等，以应对不同的问题。有一种特殊的数会用数组来实现（见下面“堆”）。

红黑树插入、删除、搜索的时间复杂度都是 O(logN)。不需要扩容、缩容。

图的两种实现，邻接表就是链表的数组、或者数组的数组；邻接矩阵就是二维数组。邻接矩阵判断连通性迅速，并可以进行矩阵运算解决一些问题，但是绝大多数情况下图都是很稀疏的，非常耗费空间。邻接表比较节省空间，但是很多操作的效率比不上邻接矩阵。

## 苹果提供的集合类型

![img](/img/C78BF530-5FF4-4DC9-B0B4-6B73ABF9C48B.png)

| 类                           | 底层存储                 |
| ---------------------------- | ------------------------ |
| `NSArray`, `NSPointerArray`  | 数组                     |
| `NSSet`, `NSHashTable`       | 哈希表（一个数组）       |
| `NSDictionary`, `NSMapTable` | 哈希表（两个等长的数组） |
| `NSOrderedSet`               | 红黑树                   |
| `NSCountedSet`               | 哈希表（`CFBagRef`）     |
| `NSCache`                    | 哈希表+双向链表          |

一般我们用集合都是用 `NSSet`，使用 `NSOrderedSet` 的场景，我理解是业务既需要集合的特性（去重、contains）、又需要按顺序遍历容器。

Set 和 Dictionary 是如何实现的，可以参考 CoreFoundation 源码：

```c
#if CFDictionary
CFHashRef CFDictionaryCreate(CFAllocatorRef allocator, const_any_pointer_t *klist, const_any_pointer_t *vlist, CFIndex numValues, const CFDictionaryKeyCallBacks *keyCallBacks, const CFDictionaryValueCallBacks *valueCallBacks) {
#endif
#if CFSet || CFBag
CFHashRef CFDictionaryCreate(CFAllocatorRef allocator, const_any_pointer_t *klist, CFIndex numValues, const CFDictionaryKeyCallBacks *keyCallBacks) {
    const_any_pointer_t *vlist = klist;
    const CFDictionaryValueCallBacks *valueCallBacks = 0;
#endif
    CFTypeID typeID = CFDictionaryGetTypeID();
    CFAssert2(0 <= numValues, __kCFLogAssertion, "%s(): numValues (%ld) cannot be less than zero", __PRETTY_FUNCTION__, numValues);
    CFBasicHashRef ht = __CFDictionaryCreateGeneric(allocator, keyCallBacks, valueCallBacks, CFDictionary);
    if (!ht) return NULL;
    if (0 < numValues) CFBasicHashSetCapacity(ht, numValues);
    for (CFIndex idx = 0; idx < numValues; idx++) {
        CFBasicHashAddValue(ht, (uintptr_t)klist[idx], (uintptr_t)vlist[idx]);
    }
    CFBasicHashMakeImmutable(ht);
    _CFRuntimeSetInstanceTypeIDAndIsa(ht, typeID);
    if (__CFOASafe) __CFSetLastAllocationEventName(ht, "CFDictionary (immutable)");
    return (CFHashRef)ht;
}
```

## 算法分析

算法分析关心的，一是解决问题时要占用的空间；二是算法执行所需的时间。

当问题规模为 n 时，解决问题所需的时间是 `T(n)`。数量级描述的是，当 n 增长时，`T(n)` 增长最快的部分，常被称作大 O 记法，记作 `O(T(n))`。算法的性能有时不仅依赖于问题规模，还依赖于数据值。要用最坏情况、最好情况、普通情况来描述性能，以免被某个特例误导。

![img](/img/DC08590E-8345-46E0-BFFE-04091AC984D1.png)

[字母异位词](https://leetcode-cn.com/problems/valid-anagram)的四种解法：给定两个字符串 s 和 t，判断 t 是否是 s 的字母异位词。

1. 暴力穷举法：用 s 中的字符生成所有的可能，看是否跟 t 匹配，复杂度为 n!，当 n=20 时，有 2432902008176640000 种排列，这是一个比 2^n 还要快得多的增长！！

2. 双层循环：s 的字符逐个与 t 比较，复杂度为 O(n^2)。

3. 排序法：s 和 t 分别排序，再逐个比较。复杂度为 O(nlogn)。

4. 计数法：两个异序词必有相同数目的 a,b,c,... 使用计数器统计每个字符出现的次数，复杂度为 O(n)。

## 排序

![img](/assets/images/cae50734-48c4-4bfd-a685-f78f72f26c4e.jpg)

归并排序：将列表一分为二，排序左半边，再排序右半边，最后合并，递归进行。

快速排序：与归并排序的等分操作不同，先选取基准值并分区，对左半区、右半区递归排序。

归并排序和快速排序的时间复杂度都是 O(NlogN)，不同的是归并排序需要额外的内存空间，快排是原地。

排序算法稳定性定义：排序前后两个相等的数相对位置不变，则算法稳定。

稳定性的意义：从一个键上排序，然后再从另一个键上排序，第一个键排序的结果可以为第二个键排序所用。例如：排序的内容是一组原本按照价格高低排序的对象，如今需要按照销量高低排序，使用稳定性算法，可以使得相同销量的对象，依旧保持着价格高低的排序展现，只有销量不同的才会重新排序。

### 二叉堆、优先队列

优先队列是一种抽象数据类型，支持两个操作：插入、移除当前最大元素。它的一个经典实现是**二叉堆**，二叉堆使用数组存储元素，并可以以时间复杂度 O(logN) 实现这两个操作。

> 通常我们直接用“堆”来代替“二叉堆”。

作为对比，我们考虑除了堆以外的优先队列的实现，可以看到，无论下面哪种实现，都只能保证其中一个操作是 O(1)、另一个操作是 O(N)。

| 实现方式 | 插入                                                                                                    | 移除当前最大元素                                                        |
| -------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| 无序数组 | O(1)，插入到数组末尾                                                                                    | O(N) 遍历找到最大元素、与数组末尾元素交换，删除并返回（选择排序的思想） |
| 有序数组 | O(logN) 二分查找合适的位置将元素插入、O(N) 将其后的元素全部后移一个位置，保持数组有序（插入排序的思想） | O(1) 删除末尾元素并返回                                                 |
| 无序链表 | O(1) 插入到链表头部                                                                                     | O(N) 找到最大元素并删除                                                 |
| 有序链表 | O(N) 找到合适位置并插入，保持链表有序（头部最大）                                                       | O(1) 删除链表头部                                                       |

优先队列的价值在于，它能处理巨大的输入流。在现实应用中，例如交易记录、服务请求、科学实验等等，输入流的大小可能很大、甚至是无限的。一种可能的解决方案是，将这些元素进行排序、并找出最大的 M 个，但是面对庞大的数据集这种方式不太合适（例如找出 10 亿个数中最大的 100 个）。

定义：一个二叉树是堆有序的，当它每个节点的值都大于（小于）等于它左右子节点的值。

定义：一个二叉堆按照堆有序的完全二叉树来组织它的节点，并将节点以层序放到数组里（但不使用数组的第一个元素）。

![img-40](/assets/images/4e239f00-dfb0-411c-a2f2-af9502d5ff26.png)

堆的特性：nums[k] 的父节点位于 nums[k/2]；nums[k] 的左右子节点分别是 nums[2k], nums[2k+1]。

为了实现优先队列的两个操作，需要先学习堆的 **reheapifying**，即，当堆的某些节点违反条件时，我们调整堆使它重新变得有序。

如果一个子节点比父节点大，那么它违反了堆顺序，我们需要将它向上与父节点交换、直到找到比它大的父节点或到达根节点，感官上看这个节点在向上浮，因此这个操作称为 `swim`。

```cpp
void swim(int k) {
    while (k > 1 && nums[k/2] < nums[k]) {
        std::swap(nums[k/2], nums[k]);
        k = k / 2;
    }
}
```

如果一个父节点比任意一个子节点小，那么它违反了堆顺序，我们将它与子节点中较大的一个交换、直到两个子节点都比它小或到达叶子节点，感官上看这个节点在向下沉，因此这个操作称为 `sink`。

```cpp
void sink(int k) {
    while (2*k <= N) {
        int j = 2 * k;
        if (j < N) {
            j = nums[j] > nums[j+1] ? j : j+1;
        }
        if (nums[k] < nums[j]) {
            std::swap(nums[k], nums[j]);
            k = j;
        }
    }
}
```

有了 `swim` 和 `sink`，实现优先队列的两个操作变得特别简单！`insert` 就是在数组末尾增加新元素，然后将新元素上浮到合适的位置；`delMax` 就是将堆顶元素移除，将数组末尾的元素放到堆顶，再将它下沉到合适的位置。

```cpp
void insert(int v) {
    ++N; // 新的数组大小
    nums[N] = v;
    swim(N);
}

int delMax() {
    int m = nums[1];
    std::swap(nums[1], nums[N]);
    nums[N] = -1; // 数组末尾元素置为一个非法值
    --N; // 新的数组大小
    sink(1);
    return m;
}
```

### 堆排序

一种重要的排序算法，堆排序，分为两步，第一步将数组原地构建成堆；第二步排序。

构建堆有两种可能的方案。第一种我们从左往右扫描，将每个元素 `swim` 到合适的位置，使得当前扫描指针的左边总是堆有序的。还有另一种更聪明的方案，因为数组的每一个位置都可以看作是一个子堆的根节点，所以我们可以从右往左扫描、对每个节点调用 `sink`，就可以构建以该节点为根的有序子堆。巧妙的是，从数组的中间位置往右，都是大小为 1 的子堆，可以直接跳过，因此我们从数组的中间位置开始向左遍历即可！

排序时，从右往左遍历，每次将当前元素与堆顶元素（它最大）交换，然后将堆顶元素下沉。

```cpp
void sort(vector<int> &nums) {
    // 1. 构造堆
    int N = nums.size();
    for (int i = N/2; i >= 1; --i) {
        sink(nums, i, N);
    }
    // 2. 排序
    while (N > 1) {
        std::swap(nums[1], nums[N]);
        --N;
        sink(nums, 1, N);
    }
}
```

## 树

定义一：树由节点及连接节点的边构成。树有以下属性：有一个根节点；除根节点外，其余节点都与唯一的父节点相连；从根节点到其它每个节点有且仅有一条路径；如果每个节点最多有两个子节点，我们就称这样的树是二叉树。

定义二：一棵树要么为空，要么由一个根节点和零或多颗子树构成。每棵子树的根节点通过一条边连接到父树的根节点。

```cpp
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
    TreeNode() : TreeNode(0, nullptr, nullptr) {}
    TreeNode(int x) : TreeNode(x, nullptr, nullptr) {}
};
```

### 二叉树

![image](/assets/images/1_CMGFtehu01ZEBgzHG71sMg.png)

满二叉树：Full Binary Tree is a Binary Tree in which every node has 0 or 2 children.

完全二叉树：Complete Binary Tree has all levels completely filled with nodes except the last level and in the last level, all the nodes are as left side as possible.

完美二叉树：Perfect Binary Tree is a Binary Tree in which all internal nodes have 2 children and all the leaf nodes are at the same depth or same level.

平衡二叉树：Balanced Binary Tree is a Binary tree in which height of the left and the right sub-trees of every node may differ by at most 1.

退化二叉树（链表）：Degenerate Binary Tree is a Binary Tree where every parent node has only one child node.

### 二叉搜索树 (BST)

二叉搜索树：指一棵空树或者具有下列性质的二叉树

1. 若任意节点的左子树不为空，则左子树上所有节点的值均小于它的根节点的值；
2. 若任意节点的右子树不为空，则右子树上所有节点的值均大于或等于它的根节点的值；
3. 任意节点的左、右子树也分别为二叉查找树；

既有链表高效插入的特性；又有有序数组二分查找的特性，但最坏情况下退化成链表，即 O(N)。

### 红黑树

AVL tree (named after inventors Adelson-Velsky and Landis) is a self-balancing binary search tree. 每次插入删除，为了维持平衡，需要做大量的计算。

2-3 树是一种抽象模型，它允许一个节点存储两个值，有三个子节点；2-3 树在实践中用红黑树表示。

红黑树既有 BST 二分查找的特性，又有 2-3 树高效插入的特性。

可以确保树的最长路径不大于最短路径长度的两倍。能够以 O(logN) 的时间复杂度进行插入、删除、搜索操作。

任何不平衡都会在三次旋转之内解决。

## 图

有两种非常著名的图的抽象数据类型：邻接矩阵和邻接表。

- 邻接矩阵的优点是简单，缺点是它应用在大部分现实问题时都是很“稀疏”的，浪费大量存储空间。只有当图中的每一个点与其他的所有点都连接时，邻接矩阵才会被填满。
- 在邻接表实现中，我们为图的所有顶点保存一个主列表，同时为每一个顶点都维护一个列表，其中记录了与它相连的顶点。

典型问题：

- 判断是否存在环，有向无环图 (DAG, Directed acyclic graph)
- DFS：词梯问题
- BFS：骑士周游问题
- 拓扑排序

## 如何高效刷题

[labuladong/fucking-algorithm: 刷算法全靠套路，认准 labuladong 就够了！](https://github.com/labuladong/fucking-algorithm)

[labuladong 的算法小抄 :: labuladong 的算法小抄](https://labuladong.github.io/algo/)

建议的刷题顺序是：

### 数组、链表

先学习像**数组、链表**这种基本数据结构的常用算法。这些小而美的算法经常让你大呼精妙，能够有效培养你对算法的兴趣。

- 链表常考的技巧就是[双指针](https://labuladong.github.io/algo/1/9/)
- [二分搜索](https://labuladong.github.io/algo/1/10/)可以看作两端向中心的双指针
- 所有 [nSum 问题](https://labuladong.github.io/algo/1/14/)都可以先排序、然后双指针快速计算结果
- [滑动窗口](https://labuladong.github.io/algo/1/11/)，典型的快慢双指针，快慢指针中间就是滑动的「窗口」，主要用于解决子串问题
- 回文串，使用双指针从两端向中心检查
- 前缀和技巧，维护一个 preSum 数组，避免每次都对子数组遍历
- 差分数组技巧，维护一个 diff 数组，避免每次都对子数组进行增减操作

### 二叉树

学会基础算法之后，应该先刷[二叉树](https://labuladong.github.io/algo/1/4/)。

二叉树解题的思维模式分两类，

1. 是否可以通过遍历一遍二叉树得到答案？如果可以，用一个 traverse 函数配合外部变量来实现，这叫「遍历」的思维模式。
2. 是否可以定义一个递归函数，通过子问题（子树）的答案推导出原问题的答案？如果可以，写出这个递归函数的定义，并充分利用这个函数的返回值，这叫「分解问题」的思维模式。

这两类思路分别对应着[回溯算法核心框架](https://labuladong.github.io/algo/1/6/)和[动态规划](https://labuladong.github.io/algo/1/5/)核心框架。不少二叉树的题目是可以同时使用这两种思路来求解的。例如前中后序遍历问题可以用遍历、也可以用分解（但一般我们用遍历）。

回溯算法用于解决[排列/组合/子集](https://labuladong.github.io/algo/1/8/)问题。DFS 算法是在遍历「节点」，回溯算法是在遍历「树枝」。解决一个回溯问题，实际上就是一个决策树的遍历过程，你只需要思考 3 个问题：

1. 路径：也就是已经做出的选择。
2. 选择列表：也就是你当前可以做的选择。
3. 结束条件：也就是到达决策树底层，无法再做选择的条件。

动态规划问题的一般形式就是求最值，重叠子问题、最优子结构、状态转移方程就是动态规划三要素。

- 子序列问题：最长递增子序列、最大子数组、最长公共子序列、编辑距离
- 背包问题
- [股票买卖](https://labuladong.github.io/algo/1/12/)问题，我们发现了三个状态，使用了一个三维数组。
- [打家劫舍](https://labuladong.github.io/algo/1/13/)系列总共有三道，难度设计非常合理，层层递进。第一道是比较标准的动态规划问题，而第二道融入了环形数组的条件，第三道更绝，把动态规划的自底向上和自顶向下解法和二叉树结合起来
- 贪心算法

无论使用哪种思维模式，你都需要思考：如果单独抽出一个二叉树节点，它需要做什么事情？需要在什么时候（前/中/后序位置）做？其他的节点不用你操心，递归函数会帮你在所有节点上执行相同的操作。二叉树的所有问题，就是让你在前中后序位置注入巧妙的代码逻辑。

快速排序就是个二叉树的前序遍历，归并排序就是个二叉树的后序遍历。

- 先构造分界点，然后去左右子数组构造分界点，你看这不就是一个二叉树的前序遍历吗？
- 先对左右子数组排序，然后合并，你看这是不是二叉树的后序遍历框架？

甚至可以说，只要涉及递归，都可以抽象成二叉树的问题。递归是解决问题的一种方法，它将问题不断地分解成更小的子问题，直到子问题可以用普通的方法解决。递归会使用一个不断调用自己的函数。递归三原则：1. 退出条件；2. 不断向退出条件靠近；3. 递归调用自己。

[BFS 算法](https://labuladong.github.io/algo/1/7/)都是用「队列」这种数据结构，每次将一个节点周围的所有节点加入队列。BFS 应用的常见场景就是在一副图中找最短路径。BFS 空间复杂度高，而 DFS 的空间复杂度较低。

二叉树的遍历：DFS、BFS，把其扩展到图，如环判断、拓扑排序、二分图判定，就用到了 DFS 算法；再比如 Dijkstra 算法模板，就是改造版 BFS 算法加上一个类似 dp table 的数组。

### 设计类

设计类题目：

- LRU：哈希表+双向链表；key 到 node 的哈希表、node 的双向链表。
- LFU：哈希表；key 到 node 的哈希表、key 到 freq 的哈希表、freq 到 key 的哈希表。
- 前缀树：相同前缀的字符串集中在 Trie 树中的一个子树上，给字符串的处理带来很大的便利
- 二叉堆主要应用有两个，一是排序方法「堆排序」，二是一种很有用的数据结构「优先级队列」。求数据流的中位数：使用两个优先队列，大顶堆+小顶堆。
- 单调栈：每次新元素入栈后，栈内的元素都保持有序（单调递增或单调递减），只处理一类典型的问题，比如「下一个更大元素」
- 单调队列：队列中的元素全都是单调递增（或递减）的，主要用来辅助解决滑动窗口相关的问题
- 队列实现栈、栈实现队列
- 设计推特（朋友圈时间线）：把合并多个有序链表的算法和面向对象设计结合起来了

### 数学题

- 位运算
- 阶乘
- 素数
- 求模、幂运算
- 随机数
- 概率