---
title:  "AutoLayout"
categories: [Apple]
---

NSLayoutConstraint约束是基于以下公式：
```
item1.attribute1 = multiplier × item2.attribute2 + constant
```

minX, minY, width, height

view1.minX = 20;\
view1.width = 100;\
view2.minX = 20 + 100 + 20;\
view2.width = 100;