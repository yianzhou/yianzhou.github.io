---
title:  "Majority Element 的几种解法"
categories: [Algorithms]
---

# Majority Element 的几种解法

原题地址：<https://leetcode.com/problems/majority-element/description/>

### 两层循环
抽取一个元素，把它与数组中逐一比较并计数；最后计数最大的获胜。很暴力。时间复杂度O(n*n)。

### 排序法
根据题目定义，主要元素的个数是大于数组长度的一半，那么对数组排序后，**中间的元素一定是它**。时间复杂度是O(nlgn)。

### 投票法
[Boyer–Moore majority vote algorithm](https://en.wikipedia.org/wiki/Boyer%E2%80%93Moore_majority_vote_algorithm)

把每个元素看成是赞成票和反对票，一个赞成票和一个反对票可以相互抵消。那么如果存在主要元素，它的赞成票与反对票相互抵消后的余数一定大于0；时间复杂度O(n)。

```
// write your code here
int candidate = nums.get(0); // start voting at index 0
int count = 1; // nums[0] automatically get count 1
        
for (int i=1; i<size; i++) {
    if (candidate == nums.get(i)) count++;
    else count--;
    // start again at i
    if (count==0) {
        candidate=nums.get(i);
        count = 1;
    }
}

return candidate; // always exist as decribed in question
```

### HashMap

这个方法普遍适用于“找在一个数组中出现最多次数的元素”的问题。定义 HashMap<候选人, 票数> 。时间复杂度O(n)。
```
public int majority(int[] nums) {
    //boundary
    if (nums.length==0) return -1;
    if (nums.length==1) return nums[0];

    // count
    HashMap<Integer, Integer> counters = new HashMap<>();
    for (Integer num : nums) {
        if (!counters.containsKey(num)) {
            counters.put(num, 1);
        } else {
            counters.put(num, counters.get(num) + 1);
        }
    }
    
    // find the majority
    int _key = 0;
    int _value = 0;
    for (Integer key : counters.keySet()) {
        if (counters.get(key) > _value ) {
            _value = counters.get(key);
            _key = key;
        }
    }
    return _key;
}
```

- 也适用于 <https://leetcode.com/problems/majority-element-ii/description/>

©️ 本文原创，转载请注明出处。