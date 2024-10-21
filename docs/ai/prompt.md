# Prompt

有人预测十年以后全世界有 50% 工作会是提示词工程（prompt engineering），不会写提示词（prompt）的人会被淘汰。如何通过自然语言把问题向机器描述清楚，将成为以后工作中的基本技能。

## 技巧

> "one-shot" learning refers to the ability of the model to understand and perform a task after being given just one example. This is in contrast to "few-shot" learning, where the model is given a few examples, and "zero-shot" learning, where the model is expected to perform the task without any examples, relying solely on its pre-existing knowledge.

- 给出例子（one-shot, few-shot）
- 要求模型自检自查
- 为了更好地进行改写，你可以对我进行提问
- 让 AI 提供多个答案，或者通过多轮回答获得多个答案
- 让 AI 扮演多种角色
- 让 AI 自评（给不同维度打分）
- 发现知识盲区：让模型先随机使用短句列出 60 个该领域问题的案例，再尝试将案例归类，以发现该领域的知识盲区

"stepback" 指的是一种策略或技巧，用于让模型在生成内容时稍微退一步，以便更好地理解上下文或重新评估生成的内容。这种策略可以帮助模型生成更连贯、更相关的响应。

- 在长对话中，让模型回顾之前的几轮对话，以确保它的回答是连贯且相关的。
- 模型生成一个初步回答后，让模型退一步检查这个回答是否符合上下文，并根据需要进行调整。
- 在生成涉及敏感话题的内容时，模型可以先生成一个初步回答，然后退一步检查这个回答是否合适。

"stepback" 可以通过以下几种方式实现：

- **多轮生成**：让模型生成多个候选响应，然后选择最合适的一个。
- **上下文回顾**：在生成新内容之前，让模型回顾之前的对话或文本，以确保连贯性。
- **反馈循环**：生成初步响应后，通过某种反馈机制（如人工审查或自动评估）进行优化。

明确问题和要求：

```
问题类型：
1.目标可以量化，但是没有量化
2.目标属于难以量化
3.关键结果（KR）无法支撑目标（O）

从上面描述的三类问题中，帮我诊断下面OKR有哪类问题？如果没有问题，仅提出表扬就可以。输出格式如下：
"""
- 问题 1：xxxxxx
- 建议：xxxxx
- 修改前: xxxx
- 修改后: xxxx
"""

OKR初稿：
"""
我的OKR
"""
```

描述生成结果的“过程”：

```
你是互联网招聘经理，你要招聘的岗位名称：[岗位名称]，使命是：[使命] 。希望你通过下面的步骤来生成 JD。
第一步，请你生成要完成这个“使命”的 10 个符合 SMART 原则的关键结果；
第二步，请你根据第一步思考并输出能支撑这些“关键结果”的 20 个能力项。
第三步，依据第二步的“关键结果”，生成一份完整的 JD。
```

## 文本框架

SMART 原则对应了五个英文单词：Specific（明确）、Measurable（可衡量）、Attainable（可达成）、Relevant（相关）和 Time-bound（有时限）。

金字塔原理：结论先行

"Elevator pitch" 是一种简短而有力的陈述，旨在在非常短的时间内（通常是 30 秒到 2 分钟）传达一个想法、产品、服务或项目的核心价值。这个概念的名字来源于这样一个假设场景：你在电梯里遇到了一个重要的潜在投资者或客户，你只有电梯到达目的楼层的时间来介绍你的想法并引起他们的兴趣。

F.A.B. 模型可以应用于各种销售和营销场景。假设你在销售一款新型的智能手表，以下是如何使用 F.A.B. 模型来进行销售：

- **Feature（特征）**：这款智能手表具有全天候心率监测功能。
- **Advantage（优势）**：与其他只能在运动时监测心率的手表不同，这款手表可以 24 小时连续监测心率。
- **Benefit（利益）**：这意味着用户可以更全面地了解自己的健康状况，及时发现异常，采取预防措施，从而更好地管理自己的健康。

MECE，是 Mutually Exclusive Collectively Exhaustive，中文意思是“相互独立，完全穷尽”。也就是对于一个重大的议题，能够做到不重叠、不遗漏的分类，而且能够借此有效把握问题的核心，并解决问题的方法。

四因说由古希腊哲学家亚里士多德提出，将世界上事物的变化与运动的背后原因归纳为四大类。四因包括：

- 质料因：即构成事物的材料、元素或基质，例如砖瓦就是房子的质料因；
- 形式因：即决定事物“是什么”的本质属性，或者说决定一物“是如此”的样式，例如建筑师心中的房子式样，就是房子的形式因；
- 动力因：即事物的构成动力，例如，建筑师就是建成房子的动力因；
- 目的因：即事物所追求的目的，例如“为了安置人和财产”就是房子的目的因。

“道、法、术、器”出自老子的《道德经》，是道家传承所强调的四个层面。

- “道”即万物变迁循环中亘古不变的规律，是灵魂，是方向，是指导思想；
- “法”是在探求“道”的过程中经过实践思考、归纳总结出的规则体系和方法原则；
- “术”是在规则体系指导下的具体操作技术，只要“道、法”不变，“术”可千变万化；
- “器”是指有形的物质或有形的工具，也就是我们常说的“工欲善其事，必先利其器”。

## 文生图

Create a visual representation of the following scene: A cute, plump penguin sitting in front of a computer and typing source code with a keyboard. The penguin should be situated in front of a floor-to-ceiling window that overlooks a bustling cityscape filled with skyscrapers. Your painting should capture the essence of this unique scenario while incorporating as much detail as possible. You should pay attention to the lighting and shadows within the room, as well as the reflections on the glass from outside. It will be best if your depiction of the cityscape include recognizable landmarks in Shenzhen, China or architectural features that help convey a sense of this place.

A cute penguin, wearing a red scarf and a headphone, sitting at a desk with a computer and typing source code. The penguin should be situated in front of a floor-to-ceiling window that overlooks a bustling daylight cityscape filled with skyscrapers.

- Please note the details on the penguin's face and scarf.
- Draw in Art Nouveau style.
- Draw in Cartoon style.

A girl standing in front of a Chanel boutique with a Chanel CF bag slung across her body. The drawing should be detailed and realistic, including elements such as the architecture of the building, the design of the storefront, and the texture and color of the bag.

## 英语教师

As my English teacher, please communicate with me in a way that is appropriate for an 8-year-old boy. If I speak Chinese, please translate it into English. If I speak English, please respond to me using language that I can understand. If I make mistakes in my grammar or vocabulary when speaking English, please correct me and provide a proper example sentence. Please note that your responses should be clear and concise, using age-appropriate language and examples to help me better understand the language.

As my English teacher, your task is to translate any Chinese sentences I say into English. Please use a professional and business-like tone when expressing the meaning of what I am trying to say. Please note that your translations should be accurate and reflect the intended meaning of the original Chinese sentence. No need to reply. My first sentences are as following:
