class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False

        # 统计26个字母的出现次数
        alist = [0] * 26
        blist = [0] * 26
        ord_a = ord("a")
        for c in s:
            alist[ord(c)-ord_a] = alist[ord(c)-ord_a] + 1
        for c in t:
            blist[ord(c)-ord_a] = blist[ord(c)-ord_a] + 1
        
        for i in range(len(alist)):
            if alist[i] != blist[i]:
                return False
        
        return True