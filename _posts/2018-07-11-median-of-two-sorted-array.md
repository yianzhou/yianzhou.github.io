---
title:  "两个排序数组的中位数"
categories: [Algorithm]
---

# 两个排序数组的中位数

原题地址：<https://leetcode.com/problems/median-of-two-sorted-arrays/description/>

解决这类问题，一定要先列出思路，用草图的方式把抽象的东西具体化，这样才有利于找到解决问题的方法，也有利于在算法出错时快速找到原因，还可以帮助确立边界条件。

这道题花了我好几个小时的时间，很多时间都是耗费在边界条件的判断上。最终我的算法也是站在了金字塔的顶端，没有白费这几个小时的努力。

![image]({{"assets/img/Screen Shot 2018-07-12 at 14.44.17.png"}})

## 确定整体思路

中位数：假设数组 A 是已排序的数组，长度为 a，如果 a 是奇数，那么中位数的索引是 a/2；如果 a 是偶数，那么中位数是 (A[a/2-1] + A[a/2])/2。

如果 A 和 B 已经排序好，那么我们直接用归并排序的思想将他们合并，中位数自然就出来了，这个方法最直接，却不是最高效的，因为归并排序的时间复杂度是 O(NlogN)。

既然两个数组已经排序好，那么**二分查找**的方法，才是最高效的。

现在有两个排序好的数组 A 和 B
```
int a = A.length;
int b = B.length;
```

找到目标位置 i，将 A 分成两个部分：
```
A[0], A[1], ..., A[i-1]  |  A[i], A[i+1], ..., A[a-1]
```
那么，左边的长度为 i，右边的长度为 a - i；

找到目标位置 j，将 B 分成两个部分：
```
B[0], B[1], ..., B[j-1]  |  B[j], B[j+1], ..., B[b-1]
```
那么，左边的长度为 j，右边的长度为 b - j；

现在我们将 A 和 B 两边的元素各自放在一起：
```
A[0], A[1], ..., A[i-1]  |  A[i], A[i+1], ..., A[a-1]
B[0], B[1], ..., B[j-1]  |  B[j], B[j+1], ..., B[b-1]
```

如果 a+b 为奇数，满足：
1. 左边的长度比右边的长度小 1，即 i+j == a-i + b-j -1
2. ``A[i-1]<=B[i]`` 且 ``B[j-1]<=A[i]``
那么中位数就是右边的最小值。

如果 a+b 为偶数，满足：
1. 左右长度相等，即 i+j == a-i + b-j
2. ``A[i-1]<=B[i]`` 且 ``B[j-1]<=A[i]``
那么中位数就是左右最小值的平均。

## 划分方法

现在问题来到了，如何找到合适的 i 和 j 作为划分点。

i 的范围可以是 [0, a]，当 i 确定了，要满足条件 1，可以计算得出：

``j=(a+b-2i-1)/2`` 或 ``j=(a+b-2i)/2``

**我们总是从长度较小的那个数组先找划分点 i**；如果 b>=a，那么一定有 j>=0。

对于给定的 i，如果 A[i-1] > B[j]，则说明 i 的位置需要向左移动；如果 A[i] < B[j-1]，说明 i 的位置需要向右移动。

## 边界条件

当 i==0 时，A 数组被切在了最左边，
```
                         |  A[0], A[1], ..., A[a-1]
B[0], B[1], ..., B[j-1]  |  B[j], B[j+1], ..., B[b-1]
```
此时分为 j==b 和 j<b 两种情况。

当 i == a 时，A 数组被切在了最右边，
```
A[0], A[1], ..., A[a-1]  |  
B[0], B[1], ..., B[j-1]  |  B[j], B[j+1], ..., B[b-1]
```
此时分为 j==0 和 j>0 两种情况。

根据以上的思想，我们对数组 A 进行二分查找，确定 i 的位置。

## 源代码

```
class Solution {
    public double findMedianSortedArrays(int[] A, int[] B) {
        int a = A.length;
        int b = B.length;
        if (a>b) return findMedianSortedArrays(B, A);

        if (a==0) return median(B);
        if (a==0 && b==1) return B[0];
        if (a==1 && b==1) return (A[0]+B[0])/2.0;

        if ( (a + b) % 2 == 1 ) { //odd
            int lo = 0, hi = a;
            while(lo<=hi) {
                int i =  lo+(hi-lo)/2;
                int j = (a+b-2*i-1)/2;

                if (i>0 && A[i-1]>B[j]) hi = i-1;
                else if (i==a) return B[j];
                else if (j>0 && A[i]<B[j-1]) lo = i+1;
                else if (i==0) {
                    if (j==b) return A[0];
                    else return Math.min(A[0], B[j]);
                }
                else {
                    return Math.min(A[i], B[j]);
                }
            }
        }
        else { //even
            int lo = 0, hi = a;
            while(lo<=hi) {
                int i =  lo+(hi-lo)/2;
                int j = (a+b-2*i)/2;

                if (i>0 && A[i-1]>B[j]) hi = i-1;
                else if (i==a){
                    if (j==0) return (A[a-1]+B[0])/2.0;
                    else return (Math.max(A[a-1], B[j-1])+B[j])/2.0;
                }
                else if (j>0 && A[i]<B[j-1]) lo = i+1;
                else if (i==0) {
                    if (j==b) return (B[j-1]+A[0])/2.0;
                    else return (B[j-1]+Math.min(A[0], B[j]))/2.0;
                }
                else {
                    return (Math.max(A[i-1], B[j-1]) + Math.min(A[i], B[j]))/2.0;
                }
            }
        }

        return -1;
    }

    public double median(int[] A) {
        if (A==null) { return -1; }
        int a = A.length;
        if (a==0) { return -1;}
        if (a==1) { return A[0]; }

        if ( a % 2 == 1 ) {
            return A[a/2];
        }
        else {
            return (A[a/2-1]+A[a/2])/2.0;
        }
    }
}
```

©️ 本文原创，转载请注明出处。