# 处理代码文件，将其中的静态字符串变量，设置为跟变量名一样。

path = '/Users/zhouyian/Documents/Workspace/baidu/gensoft-ipcs-mobile/mindfull-flutter/lib/model/Constants.dart'

# 由于文件读写时都有可能产生IOError，
# 一旦出错，后面的f.close()就不会调用。
# 所以，为了保证无论是否出错都能正确地关闭文件，我们可以使用try ... finally来实现。
# 但是每次都这么写实在太繁琐，所以，Python引入了with语句来自动帮我们调用close()方法。

# open 方法的 mode 参数：https://www.runoob.com/python3/python3-file-methods.html
with open(path) as f:
    lines = f.readlines()

for i in range(0, len(lines)):
    if lines[i].find('\"\"') != -1:
        words = lines[i].split()
        lines[i] = lines[i].replace("\"\"", "\"%s\"" % words[3])
        # print(lines[i])
        # break

with open(path, 'w') as file:
    file.writelines(lines)