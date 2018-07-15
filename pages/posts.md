---
permalink: posts
---

# 开始使用

- [快速开始](/pages/setup)
- [Mastering Markdown - GitHub](https://guides.github.com/features/mastering-markdown/)
- [当前使用的主题](https://github.com/pages-themes/cayman)

# 建设中...
<ul>
  {% for post in site.posts %}
    {% unless post.categories contains 'Algorithms' %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      {{ post.date | date_to_long_string }}
    </li>
    {% endunless %}
  {% endfor %}
</ul>

# 算法
<ul>
  {% for post in site.categories['Algorithms'] %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      {{ post.date | date_to_long_string }}
    </li>
  {% endfor %}
</ul>