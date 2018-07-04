---
permalink: posts
---
# 建设中...

- [欢迎页面](/pages/welcome)
- [Jekyll设置](/pages/jekyll)
- [Slate主题](/pages/slate)

# 建设中...
<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      {{ post.date }}
    </li>
  {% endfor %}
</ul>