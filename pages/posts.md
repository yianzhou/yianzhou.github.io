---
permalink: posts
---

# 页面

- [欢迎页面](/pages/welcome)
- [Jekyll设置](/pages/jekyll)
- [Slate主题](/pages/slate)

# 建设中...
<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      {{ post.date | date_to_long_string }}
    </li>
  {% endfor %}
</ul>

<!-- ## Category: Apple
<ul>
  {% for post in site.categories['Apple'] %}
    <li>
      <a href="{{ post.url | absolute_url }}">
      {{ post.title }}
      </a>
    </li>
{% endfor %}
</ul> -->