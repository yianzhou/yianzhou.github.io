---
permalink: apple
---

# 置顶
<ul>
  {% for post in site.categories['Stick'] %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>

# 苹果开发
<ul>
  {% for post in site.categories['Apple'] %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>

# Effective Objective-C
<ul>
  {% for post in site.categories['Effective Objective-C'] %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>