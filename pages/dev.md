---
permalink: dev
---

# 开发
<ul>
  {% for post in site.categories['Development'] %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>

# Others
<ul>
  {% for post in site.categories['Others'] %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>