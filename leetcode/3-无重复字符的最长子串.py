# https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/
# 3. 无重复字符的最长子串

# 滑动窗口（双指针遍历）
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        n = len(s) # 问题大小
        # 双指针
        left = 0
        right = 0
        # 存储已出现的字符
        hashSet = set()
        res = 0
        while left < n:
            while right < n and s[right] not in hashSet:
                hashSet.add(s[right])
                right += 1
            res = max(res, right - left)
            hashSet.remove(s[left])
            left += 1
        return res

# 滑动窗口，优化
class Solution2:
    def lengthOfLongestSubstring(self, s: str) -> int:
        n = len(s)
        left = right = 0
        hashMap = {}
        res = 0
        while right < n:
            c = s[right]
            if c in hashMap:
                # 出现重复字符时，左指针移动到重复字符上一次出现位置，并顺移一位
                # 但要注意这种情况：...a1...b1...a2...b2...
                # 当前左指针在 a2，当右指针遍历到 b2 时，出现重复字符，但左指针不是移动到 b1，而是保持原位！
                left = max(left, hashMap[c] + 1) 
            res = max(res, right - left + 1)
            hashMap[c] = right # 记录字符最后一次出现的位置
            right += 1 # 右指针每次向右移动一位
        return res

# 滑动窗口，Solution2 的基础上再优化，字符集合可用 128 数组代替哈希表
class Solution3:
    def lengthOfLongestSubstring(self, s: str) -> int:
        n = len(s)
        left = right = 0
        arr = [-1] * 128
        res = 0
        while right < n:
            c = s[right]
            i = ord(c)
            if arr[i] != -1:
                left = max(left, arr[i] + 1) 
            res = max(res, right - left + 1)
            arr[i] = right # 记录字符最后一次出现的位置
            right += 1 # 右指针每次向右移动一位
        return res


print(Solution3().lengthOfLongestSubstring("abcabcbb"))
print(Solution3().lengthOfLongestSubstring("bbbbb"))
print(Solution3().lengthOfLongestSubstring("pwwkew"))
print(Solution3().lengthOfLongestSubstring(" "))
print(Solution3().lengthOfLongestSubstring("a"))
print(Solution3().lengthOfLongestSubstring("au"))
print(Solution3().lengthOfLongestSubstring("abba"))
print(Solution3().lengthOfLongestSubstring("tmmzuxt"))
