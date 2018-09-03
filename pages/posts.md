---
permalink: posts
---

# Apple Developer
<ul>
  {% for post in site.categories['Apple'] %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      {{ post.date | date_to_long_string }}
    </li>
  {% endfor %}
</ul>

# 建设中...
<ul>
  {% for post in site.categories['Development'] %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      {{ post.date | date_to_long_string }}
    </li>
  {% endfor %}
</ul>