# Machine Learning

[AMAI-GmbH/AI-Expert-Roadmap: Roadmap to becoming an Artificial Intelligence Expert in 2022](https://github.com/AMAI-GmbH/AI-Expert-Roadmap)

## What is Machine Learning?

[What is Machine Learning? - YouTube](https://www.youtube.com/watch?v=HcqpanDadyQ&ab_channel=GoogleCloudTech)

（分析海量数据）我们现在的世界充满了各种**数据**。机器学习让你的数据自己说话、回答问题。

传统上，人们有很多分析数据的手段，利用手动编写的规则；但随着数据的爆炸性增长，人们则需要依靠可以自我学习数据、以及数据的变化的自动化系统。

我们可能不易察觉到，这些场景的背后都是机器学习：

- 在照片中标记人物（具体到某个人）和物品
- 为你推荐下一个观看的视频
- 搜索引擎：理解你的查询词、根据你个人的兴趣偏好为你推荐结果

诸如图像识别、欺诈检测、推荐系统、文字和语音系统等等能力，其底层都是机器学习。

这些能力广泛应用于医疗诊断、零售物流、自动驾驶等领域。

Machine Learning is **using data to answer questions**:

- using data is what we refer to as **training**
- answer questions is referred to as making **prediction**

通过对数据的训练，创建一个预测模型、并对其进行微调。这个模型随后被用作预测一些它自己从未见过的数据，以回答数据背后的问题。

随着越来越多数据的输入，预测模型会被不断地改进。

## The 7 steps of machine learning

[The 7 steps of machine learning - YouTube](https://www.youtube.com/watch?v=nKW8Ndu7Mjw&ab_channel=GoogleCloudTech)

接下来我们创建一个系统，这个系统用来回答这个问题：区分一杯饮料是啤酒还是红酒？

这个回答问题的系统，被称为**模型**，创建这个模型的过程，称为**训练**。

训练的目的是为了创建一个能够准确地回答这个问题的模型。

为了训练这个模型，我们需要收集数据。分析饮料有很多种维度，这里我们选择两个因素：颜色/光的波长、酒精含量。我们希望仅根据这两个因素，就能分辨这两种饮料。我们把这两者称为**特征**。

### 第一步：收集数据

数据的数量和质量，决定了模型的好坏。

经过一段时间的测量，我们得到了一个表格：

| 颜色/光的波长（纳米） | 酒精含量（百分比） | Beer or Wine? |
| --------------------- | ------------------ | ------------- |
| 610                   | 5                  | Beer          |
| 599                   | 13                 | Wine          |
| ...                   | ...                | ...           |

### 第二步：准备数据

将数据随机排序，为了不让数据的顺序影响训练，一杯饮料是啤酒还是红酒，与它的前一杯和后一杯饮料应该都没有关系。

在这一步，我们将检视收集到的数据。例如，如果我们收集到的啤酒数据远多于红酒，那么我们训练出来的模型就会在绝大多数时间预测它看到的东西就是啤酒。如果我们应用这个模型的场景，啤酒和红酒的数量各占一半的话，那么这个模型就会几乎有一半的机会出错。

我们会将数据分为两部分，一部分占多数（70%-80%），用于训练；另一部分占少数（20%-30%），用于评估模型的表现。这两部分数据不能是重复的，就像数学老师不会拿你的家庭作业来当成试卷上的题目。

有时候，我们还需要将上一步收集到的数据，进行纠错、规范化、去重等处理。

### 第三步：选择模型

已有很多前人创造出了各种模型，有些模型对图像数据非常有效、有些对文字或者音乐等序列化数据非常有效、有些对基于数值的数据非常有效。

我们的案例中只有颜色和酒精含量两个特征，我们可以用一个小的线性模型。它可以用直线方程来表示：

`y = m * x + b`，m 代表斜率，b 代表截距，x 代表输入，y 代表输出。

### 第四步：训练

就像学习驾驶一样，新手一开始不懂踏板、方向盘的操作，经过一段时间的训练后，变得能够驾驶；经过长时间的训练后，驾驶技能变得娴熟。

我们将所有数据以平面直角坐标系上的点来表示，假设我们能够画出一条直线，准确地将啤酒和红酒的坐标点区分开，那么这个模型就能准确地进行预测。因此，我们要训练的内容就是 m 和 b。

m 可能有很多个：m<sub>1</sub>, m<sub>2</sub>, ... 取决于特征的多少。把这些 m 都放在一起，就形成了权重矩阵。类似地，将 b 都放在一起，就形成了偏置矩阵。

![img](/img/F9ACBB82-BC11-44A1-8C33-BF57A9FBE818.png)

一开始，我们随机地定一组 (w, b) 的值，相当于在坐标系上随机画了一条线，它可能表现得很糟糕——无法准确地将啤酒和红酒划分开；随后，我们不断地调整 (w, b)，使这条线逐渐接近啤酒和红酒的理想界限，模型的预测变得越来越准确。

![img](/img/C08015FA-28F5-4EFD-81C7-6243B5D465D4.png)

### 第五步：评估

训练完成后，我们就拿第二步留出的小部分数据，对模型进行评估。

### 第六步：参数精调

这些参数通常被称为 hyperparameter。

### 第七步：预测

在这一步，我们真正地拿我们的模型去预测现实世界中的数据——回答一开始的问题，一瓶饮料是啤酒还是红酒。

## 试一试吧

[A Neural Network Playground](https://playground.tensorflow.org/)

What is a **Neural Network**? It’s a technique for building a computer program that learns from data.

## Intro to Machine Learning

[Intro to Machine Learning (ML Zero to Hero - Part 1) - YouTube](https://www.youtube.com/watch?v=KNAWp2S3w94)

以简单的石头剪刀布为例，

传统的编程：输入数据，我们编写规则（如何判断一张图片是石头/剪刀/布），程序给出答案。

机器学习：输入数据和答案，机器自我学习，输出规则（如何判断一张图片是石头/剪刀/布）。

[Say hello to the "Hello, World" of machine learning](https://developers.google.com/codelabs/tensorflow-1-helloworld#2)

假设我们有一组数，它们的关系是：`Y=3X+1`，我们需要训练模型以得到这个规则。

```py
import tensorflow as tf
import numpy as np
from tensorflow import keras

# A model is a trained neural network.
# Here we have the simplest possible neural network.
# - only 1 layer with a single neuron on it (indicated by `unit=1`)
# - we input one single value X to predict Y, that's why we say `input_shape` is one value
model = tf.keras.Sequential([keras.layers.Dense(units=1, input_shape=[1])])

# When the computer is trying to learn that, it makes a guess, maybe `Y=10X+10`. The loss function measures the guessed answers against the known correct answers and measures how well or badly it did.
# Next, the model uses the optimizer function to make another guess. Based on the loss function's result, it tries to minimize the loss.
model.compile(optimizer='sgd', loss='mean_squared_error')

# The model repeats that for the number of epochs.
xs = np.array([-1.0, 0.0, 1.0, 2.0, 3.0, 4.0], dtype=float)
ys = np.array([-2.0, 1.0, 4.0, 7.0, 10.0, 13.0], dtype=float)

# fit the Xs to the Ys and try this 500 times
model.fit(xs, ys, epochs=500)

# When it's done, we have a trained model, now we can try to predict
print(model.predict([10.0]))
```

By the time the training is done, the loss is extremely small, showing that our model is doing a great job of inferring the relationship between the numbers.

As you can see from the example, the loss is really small after only 50 epochs, so that might be enough!

## Basic Computer Vision with ML

[Basic Computer Vision with ML (ML Zero to Hero - Part 2) - YouTube](https://www.youtube.com/watch?v=bemDFpNooA8)

我们会有 128 个函数，称为 f0, f1, ... f127，每个函数包含若干个参数。

当训练完成后，我们将一张图片的 `28*28=784` 个像素，依次输入到每个函数里，这些函数的组合就会输出正确的服装分类（数字 9）。

因此，我们这里要训练的，就是这 128 个函数中每个函数的若干个参数。

```py
import tensorflow as tf
from tensorflow import keras

fashion_mnist = keras.datasets.fashion_mnist
(train_images, train_labels), (test_images, test_labels) = fashion_mnist.load_data()

# 训练完成后，这个模型可以理解为被用于：输入一张 28 * 28 的图片，输出 10 种类型中的一种
models = keras.Sequential([
    keras.layers.Flatter(input_shape=(28, 28)), # 图片的像素大小
    keras.layers.Dense(128, activation=tf.nn.relu), # 128 个函数
    keras.layers.Dense(10, activation=tf.nn.softmax), # 一共有 10 种类型的服装
])

model.compile(optimizer=tf.train.AdamOptimizer(),
              loss='sparse_categorical_crossentropy')
```
