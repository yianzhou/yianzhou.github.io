# 提取音乐关键词

[完整代码](https://gist.github.com/yianzhou/9d5d344cf75d69b4f87978369bd90ed6)

## 数据准备

训练这样一个模型，用于识别用户在聊天文字中的听音乐意图，把音乐的 query 关键词提取出来。例如：“我想听周杰伦的歌”，提取 query “周杰伦”。

准备一批训练数据：

```json
[
  {
    "text": "我想听周杰伦的歌",
    "music_query": "周杰伦"
  },
  {
    "text": "帮我放一首五月天的歌",
    "music_query": "五月天"
  },
  {
    "text": "今天天气怎么样",
    "music_query": ""
  }
]
```

## 创建词汇表

```py
with open("train_data.json", 'r', encoding='utf-8') as f:
    data = json.load(f)

# 准备句子和标签
texts = []
queries = []
for item in data:
    texts.append(item['text'])
    queries.append(item['music_query'])

# 建立字 -> 索引的映射
all_chars = set()
for text in texts:
    all_chars.update(list(text))

# 获取数据集中最长句子的长度
max_len = max(len(s) for s in X)

# 添加PAD（填充）和UNK（未知）标记
char2idx = {char: i + 2 for i, char in enumerate(sorted(list(all_chars)))}
char2idx['<PAD>'] = 0
char2idx['<UNK>'] = 1
idx2char = {i: char for char, i in char2idx.items()}
```

模型是数学家，不是语言学家。我们的模型（神经网络）内部进行的是大量的矩阵乘法、加法等数学运算。你不能把“周”、“杰”、“伦”这样的字符直接塞进一个数学公式里。所以，我们需要一步“翻译”工作，把这些人类能看懂的文字，翻译成模型能看懂的数字。这个翻译过程就是建立映射。

`<PAD>` 的意思是“填充”。模型在处理数据时，喜欢一批一批地处理（这叫 batch processing），这样效率最高。但它要求一个批次里的所有“数据块”（也就是我们的句子）必须是同样大小的。

找到这批句子中最长的那一句（比如长度是 9），把所有比它短的句子，都用 `<PAD>` 标记补齐到同样的长度。

```
"今天天气怎么样" (长度7) -> [今, 天, 天, 气, 怎, 么, 样, <PAD>, <PAD>]
"来一首抖音热门歌曲" (长度9) -> [来, 一, 首, 抖, 音, 热, 门, 歌, 曲]
```

模型在训练时，会根据训练数据建立一个“词汇表”（在我们的代码里是 `char2idx` 字典）。它只认识这个词汇表里的字。当模型遇到任何不在词汇表里的新字词时，就统一用 `<UNK>` 这个标记来代替。这样模型即使在推理时遇到未知词，也会根据已知的上下文尽力做出最合理的猜测。

## BIO 标签

```py
label2idx = {'O': 0, 'B-MQ': 1, 'I-MQ': 2}
idx2label = {i: label for label, i in label2idx.items()}
```

BIO 是一种为句子中的每个单词（在我们的例子中是每个汉字）打标签的标注方案。它专门用来解决“从一串文本中抽取出特定信息块（实体）”的问题。

- B - Begin: 代表一个实体的开始。
- I - Inside: 代表一个实体的内部（不是开头，但仍在实体中）。
- O - Outside: 代表外部，即不属于任何实体。

"播放周杰伦和林俊杰的歌"句中有两个独立的歌手实体："周杰伦"和"林俊杰"。如果用简单的“True/False”方案，它无法知道"周杰伦"和"林俊杰"是两个独立的实体，还是一个叫"周杰伦和林俊杰"的超长名字，失去了实体的边界信息。

将文本和 BIO 标签转换为序列并填充：

```py
def create_label_sequence(text, query):
    """根据text和query生成BIO标签序列"""
    labels = ['O'] * len(text)
    if query:
        start_index = text.find(query)
        if start_index != -1:
            labels[start_index] = 'B-MQ'
            for i in range(start_index + 1, start_index + len(query)):
                labels[i] = 'I-MQ'
    return labels

# 将所有文本和标签转换为整数序列
X = [[char2idx.get(char, char2idx['<UNK>']) for char in text] for text in texts]
y = [create_label_sequence(text, query) for text, query in zip(texts, queries)]
y = [[label2idx[label] for label in seq] for seq in y]

# 对X和y进行填充，使所有序列长度一致
x_padded = pad_sequences(sequences=X, maxlen=max_len, padding='post', value=char2idx['<PAD>'])
y_padded = pad_sequences(sequences=y, maxlen=max_len, padding='post', value=label2idx['O'])
```

文本：

- 原文"来一首抖音热门歌曲"
- 通过 `char2idx` 字典，转换为数字序列 X = [20, 8, 15, 31, 28, 19, 21, 10, 11]
- 通过 `<PAD>` 填充，变成固定长度的向量，例如 x_padded = [20, 8, 15, 31, 28, 19, 21, 10, 11, 0, 0, ...]。

BIO 标签：

- 数据集中的标准答案“抖音热门歌曲”
- 对应的 BIO 标签序列 ['O', 'O', 'O', 'B-MQ', 'I-MQ', 'I-MQ', 'I-MQ', 'I-MQ', 'I-MQ']。
- 通过 `label2idx` 字典，转换为数字序列 y = [0, 0, 0, 1, 2, 2, 2, 2, 2]。
- 填充成 x_padded 等长的向量 y_padded = [0, 0, 0, 1, 2, 2, 2, 2, 2, 0, 0, ...]。

## 定义模型

```py
# Sequential 表示我们要搭建一个“顺序”模型，
# 数据会像流水线一样，一层一层地流过。
model = Sequential([
    # 1. Embedding层：将整数索引转换为密集向量。
    # mask_zero=True 会告诉后续层忽略padding(0)部分。
    Embedding(input_dim=vocab_size,
              output_dim=64, # Embedding 维度，它决定了向量的丰富程度
              mask_zero=True),

    # 2. Bidirectional LSTM层：从两个方向学习序列的上下文信息。
    # return_sequences=True 确保为序列中的每个token都生成一个输出。
    Bidirectional(LSTM(units=64, return_sequences=True)),

    # 3. TimeDistributed Dense层：对序列中的每一个时间步应用一个Dense（全连接）层，
    # 用于分类每个token的标签。
    TimeDistributed(Dense(num_labels, activation='softmax'))
])
```

### Embedding 层

`input_dim=vocab_size` 词汇表的大小，也就是你有多少个不同的“词”或“token”。Embedding 层会为每个词分配一个唯一的索引，并为每个索引学习一个向量表示。

机器只懂数字，不懂汉字。我们不能直接把"歌"这个字丢给模型。我们需要一种方法把"歌"转换成机器能理解的数字。最简单的想法是：给每个汉字编个号。但这样做有问题：数字 8、9、10 之间有大小关系（8 < 9 < 10），但这并不代表 "歌"、"曲"、"听" 这几个字在意思上也有这种简单的数学关系。而且 "歌" 和 "曲" 的意思很接近，"歌" 和 "车" 的意思差很远，这种简单的编号完全体现不出来。

Embedding 层就像为机器量身定做的“智能字典”。它不只是给每个字一个编号，而是给每个字一个“坐标”或者说“特征向量”。这个向量由一串数字组成（比如，在我们的代码中 `output_dim=64`，代表一个 64 维的向量）。

- "歌"可能被表示为 [0.2, -0.5, 0.8, ..., -0.1]
- "曲"因为意思和"歌"很像，所以它的向量也会很接近 [0.21, -0.48, 0.79, ..., -0.12]
- "车"因为意思和"歌"差很远，它的向量就会完全不同 [-0.9, 0.1, -0.6, ..., 0.4]

这些向量的值不是我们手动设置的，而是模型在训练过程中自己学习到的！模型会观察大量的句子，如果发现"歌"和"曲"总是出现在相似的语境里，它就会自动把这两个字的向量调整得越来越接近。

Embedding 的维度需要在这几个方面做取舍：

- 词汇表越大，需要的维度通常也越高。如果你有成千上万个词，每个词都有独特的含义和用法，你需要更多的“特征槽位”（即更高的维度）才能把它们区分开，并表达它们之间复杂的关系。给一个巨大的词汇表分配一个很低的维度，信息会被严重压缩和丢失。
- 任务越复杂，需要的维度通常也越高。如果你的任务是细粒度的语义理解，比如识别词语间的上下位关系（“犬”是“动物”的下位词），就需要更丰富的向量来编码这些微妙的语义信息。
- 数据量越少，维度应该设置得越低。如果你的数据量很小，而参数又很多，模型就非常容易过拟合。过拟合的后果是模型会死记硬背训练数据里的每一个样本，而不是学习通用的规律。它在训练集上表现完美，但遇到新句子则表现糟糕。
- 低维度意味着更快的训练、推理速度，和更少的资源消耗，

在实践中，对于几百到几千这个量级的词汇表，Embedding 维度的常见选择范围通常在 32 到 128 之间。从 64 维开始实验，然后根据验证集上的表现决定是降低到 32 还是增加到 128。

### Bi-LSTM 层

我们人类在阅读时，为了理解一个词的意思，经常需要看它的上下文。双向 LSTM (Bi-LSTM) 就是一个能“前后通读、联系上下文”的阅读高手，让模型在处理序列中的每一个字时，都能同时考虑到它前面和后面的信息。这使得模型能更深刻地理解上下文，从而做出更准确的判断。

长短期记忆网络（LSTM, Long Short-Term Memory）是一种非常擅长处理序列数据（比如一句话）的循环神经网络。它有一个“记忆单元”，可以记住序列中前面很远的信息。

`units=64` 这定义了 LSTM 的“记忆容量”的大小。可以理解为 LSTM 在阅读完一个字后，用来总结“到目前为止我读了些什么”的笔记的维度。这个笔记是一个包含 64 个数字的向量。这个数字越大，LSTM 的表达能力越强，但计算量和过拟合风险也越高。

`return_sequences=True`: 这是另一个至关重要的开关。如果为 False (默认值)，LSTM 在读完整串序列后，只会吐出最后一个字的“阅读笔记”。这适用于整个句子的分类任务（比如情感分析）。如果为 True，LSTM 会为序列中的每一个字都吐出它对应的“阅读笔记”。这正是我们想要的！因为我们的任务是为句子中的每一个字打标签，所以我们需要每一个字的加工结果。

`Bidirectional` 这是一个“包装器”，它会创建两个一模一样的 LSTM，一个正向 LSTM 从句子的开头读到结尾，一个反向 LSTM 从句子的结尾读到开头。然后，对于句子中的每一个字，它会把两个 LSTM 的“阅读笔记”（两个 64 维的向量）拼接在一起。所以，这一层的最终输出是一个 64 + 64 = 128 维的向量。这个向量包含了每个字双向的、完整的上下文信息。

### TimeDistributed Dense 层

`Dense` 这是最基础的全连接神经网络层，也是我们最终的分类器。它会根据输入的特征，判断属于哪个类别。

`num_labels`: Dense 层的神经元数量。我们把它设置为标签的数量（比如 3，对应 O, B-MQ, I-MQ）。每个神经元对应一个标签。

`activation='softmax'`: 这是激活函数。softmax 会把 Dense 层输出的原始数值（logits）转换成一个概率分布。例如，输出会变成 [0.1, 0.8, 0.1]，总和为 1。这代表模型预测这个字是 O 的概率是 10%，是 B-MQ 的概率是 80%，是 I-MQ 的概率是 10%。

`TimeDistributed`: 这个包装器的作用是“按时间步应用”。它告诉 Dense 层：“不要只对整个序列做一次分类，而是要对序列中的每一个元素（每一个字）独立地进行一次分类。”它会取出 Bidirectional(LSTM) 层输出的序列中的第一个 128 维向量，喂给 Dense 层，得到第一个字的标签概率；然后取出第二个 128 维向量，再喂给 Dense 层，得到第二个字的标签概率……以此类推。

### 给新手的建议

从当前这个“黄金组合”开始: Embedding + BiLSTM + Dense 这个结构，是你必须掌握的、最经典的序列标注模型。它简单、强大、易于理解，是学习更复杂模型的基础。

然后，学习如何加载预训练词向量 (Pre-trained Word Embeddings)，这是性价比最高的性能提升手段。比如 Word2Vec, GloVe, FastText。这些是在海量文本上预先训练好的词向量。在你的下游任务模型中，你会用这个预训练好的“词典”来初始化你的 Embedding 层。相当于你不再让 Embedding 层从零开始学，而是把这些预训练好的向量加载进来作为初始值。即使你的任务数据很少，模型也能对词语有一个很好的初始理解，能显著提升性能和加快收敛。当你的任务需要更通用的语言知识，或者你的训练数据不足时，这是强烈推荐的升级方案。

最终目标：学习使用 BERT 这样的预训练语言模型，这是当前自然语言处理领域的基石。

## 编译模型

```py
model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])
```

optimizer (优化器): 它的工作是根据模型在训练中犯的错误（由损失函数计算得出），来决定如何调整和更新网络中的每一个参数（权重），目的是让模型表现得越来越好。对于绝大多数问题，Adam (Adaptive Moment Estimation) 都能表现得很好，而且通常不需要你手动去调整它的学习率等超参数。因此，它成为了深度学习中的默认首选。

loss (损失函数): 它的作用是拿模型的预测结果和真实答案进行比较，然后计算出一个损失数值（Loss），损失越大，说明模型错得越厉害。优化器的目标就是让这个损失值变得尽可能小。`sparse_categorical_crossentropy` 是专门为“整数形式标签的多分类问题”设计的损失函数。

metrics (评估指标): 这是用来在训练和测试过程中，监控模型表现的工具。它计算出的结果不会被用来直接指导模型的参数更新（那是损失函数的工作），但它能为我们这些“人类管理者”提供一个直观的、易于理解的报告，告诉我们模型学得怎么样了。'accuracy' (准确率) 这是最直观的评估指标，计算方式为`正确预测的样本数 / 总样本数`。

## 训练模型

```py
model.fit(x_padded, y_padded, batch_size=32, epochs=100, verbose=1)
model.save("saved_model.keras")
```

fit 这个词的本意是“拟合”。在机器学习中，它的意思就是让模型去学习和拟合我们提供的数据中的规律。

`x_padded` 这是我们提供给模型的训练数据，也就是所有的“问题”。

`y_padded` 这是与训练数据一一对应的真实标签，也就是所有“问题的答案”。

`batch_size` (批次大小): 这个参数决定了模型在每次更新参数之前，要看多少个样本（句子）。

为什么不一次性看完所有题再改进？首先，如果数据集非常大（比如几百万个句子），一次性加载到内存或显存中是不可行的，必须分批处理。其次，分批学习可以让模型的参数更新更频繁，通常能让模型更快地收敛到一个好的状态。

对于大多数中小型数据集和标准模型架构，batch_size=32 在模型性能（泛化能力）和训练效率（速度和内存占用）之间提供了一个极佳的平衡点。它不大不小，既能提供足够稳定的梯度估计，又不会占用过多的内存，同时训练速度也很快。很多深度学习框架和教程都把它作为默认的起始值。

`epochs` (训练周期): 这个参数定义了整个训练数据集将被重复学习多少遍。1 个 Epoch 指的是模型把所有的训练数据（我们数据集中的所有句子）从头到尾学习了一遍，这会包含 `总样本数 / batch_size` 次的参数更新。`epochs=100` 意味着上述过程要完整地重复 100 次。

epochs 的选择也是一个经验与实验相结合的过程，

- 如果 Epochs 太少，会出现欠拟合（Underfitting）。模型还没有充分学习数据中的规律，此时无论在训练集还是测试集上，模型表现都很差。
- 如果 Epochs 太多，会出现过拟合（Overfitting）。模型把训练数据（包括其中的噪音）“背”得滚瓜烂熟，但在新的、没见过的数据上表现很差。并且，在达到最佳性能点之后，继续训练是在浪费计算资源和时间。

我们无法预先知道那个不多不少、恰到好处的最佳 epoch 点到底在哪里。这个点受到模型复杂度、数据质量等多种因素的影响。为了解决这个挑战，我们引入一个非常强大的工具：早停（Early Stopping）。

## 早停

从训练数据中分出一小部分作为验证集（Validation Set），在每个 epoch 结束后，计算验证集的损失（validation loss）。如果发现连续好几个 epoch（比如连续 5 个，这个数字叫 patience）的验证集损失都没有新的进步，那就说明可能已经学到头了，再学就要死记硬背了。这时就自动停止训练吧！

为什么要监控验证集的损失？看训练集的损失不行吗？绝对不行！在绝大多数情况下，只要你持续训练，模型的训练集损失 loss 几乎总是会单调递减的。因为模型的优化器（如 Adam）的全部工作，就是想方设法地去降低这个 loss 值。早停被发明出来的唯一目的：防止模型在训练数据上过拟合（Overfitting）。过拟合的表现是，模型在训练集上的表现（如损失 loss）会持续变好，接近完美。但它在新数据（验证集）上的表现在达到一个最佳点后，会开始恶化。这个“训练集表现持续变好，验证集表现开始变差”的分岔点，就是过拟合开始的信号。早停机制就是为了捕捉这个信号并及时刹车。

通常，我们还会配合另一个工具 ModelCheckpoint，它会在训练过程中自动保存那个在验证集上表现最好的模型。这样训练结束后，你得到的就是“巅峰状态”的模型，而不是“最后一次训练”的模型。

```py
# 定义早停回调函数
# monitor='val_loss': 监控验证集的损失
# patience=10: 如果验证集损失连续10个epoch没有下降，就停止训练
# restore_best_weights=True: 训练停止时，自动将模型的权重恢复到验证集损失最低的那个epoch的状态
early_stopping = EarlyStopping(
    monitor="val_loss", patience=10, verbose=1, restore_best_weights=True
)

# （可选但强烈推荐）定义模型检查点回调函数
# filepath='best_model.keras': 保存最佳模型的路径
# save_best_only=True: 只保存验证集损失最低的模型
model_checkpoint = ModelCheckpoint(
    filepath="best_model.keras", monitor="val_loss", save_best_only=True, verbose=1
)

test_set_size = 0.20  # 验证集（或测试集）占20%
random_seed = 42  # 设置一个随机种子，确保每次划分结果都一样，便于复现

x_train, x_val, y_train, y_val = train_test_split(
    x_padded,  # 要划分的特征数据
    y_padded,  # 要划分的标签数据
    test_size=test_set_size,  # 指定验证集的比例
    random_state=random_seed,  # 指定随机种子
)

print("--- 开始训练模型 ---")
model.fit(
    x_train,
    y_train,
    batch_size=32,
    epochs=100,
    validation_data=(x_val, y_val),  # 传入验证集
    callbacks=[early_stopping, model_checkpoint],
    verbose=1,
)
print("--- 模型训练完成 ---\n")
model.summary()
```

## 推理

```py
# 假设加载已经训练好的模型
model = tf.keras.models.load_model("saved_model.keras")

def extract_music_query_batch(text_inputs: list):
    """
    接收一个句子列表，成批次地进行预测，并返回提取出的实体。

    Args:
        text_inputs (list): 一个包含多个待预测句子的列表。
                           例如: ["我想听周杰伦的晴天", "播放一首经典老歌"]

    Returns:
        list: 一个列表，每个元素是对应句子提取出的实体列表。
              例如: [["周杰伦的晴天"], ["经典老歌"]]
    """

    # --- 1. 批量预处理 (Batch Preprocessing) ---
    batch_tokens = [list(text) for text in text_inputs]
    batch_input_seqs = [
        [char2idx.get(char, char2idx["<UNK>"]) for char in tokens] for tokens in batch_tokens
    ]
    padded_input_batch = pad_sequences(
        sequences=batch_input_seqs, maxlen=max_len, padding="post", truncating="post"
    )

    # --- 2. 批量模型预测 (Batch Prediction) ---
    raw_predictions_batch = model.predict(padded_input_batch)
    # 得到一个三维的概率矩阵 (batch_size, max_len, num_labels)

    predicted_label_indices_batch = np.argmax(raw_predictions_batch, axis=-1)
    # 得到一个二维的标签索引矩阵 (batch_size, max_len)

    # --- 3. 批量后处理 (Batch Post-processing) ---
    batch_entities = []
    # 遍历批次中的每一个句子和其对应的预测结果
    for i in range(len(text_inputs)):
        tokens = batch_tokens[i]
        predicted_indices = predicted_label_indices_batch[i][
            : len(tokens)
        ]  # 截取有效长度

        entities = []
        current_entity = ""
        for j, token in enumerate(tokens):
            if j >= len(predicted_indices):
                break
            index = predicted_indices[j]
            if index == 1:  # B-MQ
                if current_entity:
                    entities.append(current_entity)
                current_entity = token
            elif index == 2 and current_entity:  # I-MQ
                current_entity += token
            else:  # O
                if current_entity:
                    entities.append(current_entity)
                    current_entity = ""

        if current_entity:
            entities.append(current_entity)

        batch_entities.append(entities)

    return batch_entities

test_sentences = [
    "来一首抖音热门歌曲",
    "我想听周杰伦的晴天",
    "播放一首经典老歌",
    "今天天气怎么样",
    "附近有什么好吃的，再来一首安静的歌",
]

# 调用批量预测函数
results = extract_music_query_batch(test_sentences)

# 打印结果
for sentence, entities in zip(test_sentences, results):
    print(f"输入: '{sentence}' -> 提取结果: {entities}")
```

`raw_predictions_batch` 是一个三维的概率矩阵 `(batch_size, max_len, num_labels)`

`batch_size` 就是我们输入的这批 `test_sentences` 的长度

`raw_predictions_batch[0]` 代表了"来一首抖音热门歌曲"句子中每个字对应 BIO 的概率：

```
[
  # 预测概率: [P(O), P(B-MQ), P(I-MQ)]
  /* '来' */  [0.98, 0.01, 0.01],  # 模型非常确定'来'是'O'
  /* '一' */  [0.97, 0.02, 0.01],  # 模型非常确定'一'是'O'
  /* '首' */  [0.95, 0.04, 0.01],  # 模型非常确定'首'是'O'
  /* '抖' */  [0.10, 0.85, 0.05],  # 模型认为'抖'有85%的可能是'B-MQ'
  /* '音' */  [0.05, 0.10, 0.85],  # 模型认为'音'有85%的可能是'I-MQ'
  /* '热' */  [0.08, 0.12, 0.80],  # 模型认为'热'有80%的可能是'I-MQ'
  /* '门' */  [0.02, 0.08, 0.90],  # 模型认为'门'有90%的可能是'I-MQ'
  ......
]
```

## 预训练词向量

```py
# --- 加载Word2Vec预训练词向量 ---
w2v_path = "light_Tencent_AILab_ChineseEmbedding.bin"
w2v_model = KeyedVectors.load_word2vec_format(w2v_path, binary=True, encoding="utf-8")

# --- 构建embedding_matrix ---
# 创建一个形状为 (vocab_size, embedding_dim) 的全零矩阵
# 对于在我们的词汇表中、但预训练文件中没有的词（比如'嘚瑟'），
# 以及 <PAD> 和 <UNK>，它们在 embedding_matrix 中的向量仍然是全零。
embedding_dim = 200
embedding_matrix = np.zeros((vocab_size, embedding_dim))
for char, idx in char2idx.items():
    if char in w2v_model:
        embedding_matrix[idx] = w2v_model[char]

# --- 5. 构建Tensorflow模型 ---
model = Sequential(
    [
        # 1. Embedding层：使用预训练词向量
        Embedding(
            input_dim=vocab_size,
            output_dim=embedding_dim,
            weights=[embedding_matrix],
            mask_zero=True,
            trainable=False,
        ),
        # 2. Bidirectional LSTM层：从两个方向学习序列的上下文信息。
        Bidirectional(LSTM(units=64, return_sequences=True)),
        # 3. TimeDistributed Dense层：对序列中的每一个时间步应用一个Dense（全连接）层，
        TimeDistributed(Dense(num_labels, activation="softmax")),
    ]
)
```

整个过程可以分为三步：

一、准备词向量文件：获取一个预训练好的词向量文件。

二、创建权重矩阵：遍历我们自己的 char2idx 词汇表，对于其中的每一个词，从词向量文件中找到对应的向量填充到 `embedding_matrix` 里；如果没找到，那么 `embedding_matrix` 中对应的那一行将保持为全零。

三、加载到 Embedding 层：在创建 Embedding 层时，将这个权重矩阵作为初始值加载进去。`weights=[embedding_matrix]` 这个参数告诉 Keras：“不要随机初始化这一层的权重，请直接使用我提供给你的 `embedding_matrix` 作为初始权重。

`trainable=False` 这个参数把 Embedding 层**冻结**了。为什么这么做？ 预训练词向量是在海量数据上学习到的通用知识，我们通常认为它们已经足够好了。如果我们的下游任务数据量很小，让这些向量参与训练（即 `trainable=True`），很可能会因为少量数据的干扰而破坏掉它们原有的、宝贵的语义结构，导致灾难性遗忘（Catastrophic Forgetting）。
