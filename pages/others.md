---
title: "Others"
permalink: others
---

# 互联网

<ul>
  {% for post in site.categories['internet'] %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>

# 其它

<ul>
  {% for post in site.categories['others'] %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
