class Solution:
    def match(self, s, t):
        return (s == "{" and t == "}") or (s == "[" and t == "]") or (s == "(" and t == ")")

    def isValid(self, s: str) -> bool:
        length = len(s)
        if (length == 0):
            return True
        elif (length == 1):
            return False
        
        stack = []
        i = 0
        while i < length:
            if s[i] in "{[(":
                stack.append(s[i]) #push
            else:
                if len(stack) == 0:
                    return False
                else:
                    peek = stack.pop()
                    if not self.match(peek, s[i]):
                        return False
            i = i + 1
        
        return len(stack) == 0

s = Solution()
s.isValid("){")