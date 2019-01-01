---
permalink: posts
---

# Apple
<ul>
  {% for post in site.categories['Apple'] %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>

# 开发
<ul>
  {% for post in site.categories['Development'] %}
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

# Reading
<ul>
  {% for post in site.categories['Reading'] %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>