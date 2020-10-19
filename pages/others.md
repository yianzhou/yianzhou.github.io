---
permalink: others
---

# 2020

<ul>
  {% for post in site.categories['2020'] %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>

# 2019

<ul>
  {% for post in site.categories['2019'] %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
