---
layout: default
title: Authors
permalink: /authors
---

<div class="">
{% for author in site.data.authors %}
  {% assign posts = site.posts | where: "author", author[0] %}
  {% if posts != empty %}
  <div class="section-title col-md-12 mt-4">
    <h2 id="{{ author[1].id }}"><span class="text-capitalize">{{ author[1].name }}</span></h2>
    <p>
      {% if author[1].lng %}
        <a href="https://www.google.co.nz/maps/place/{{ author[1].lat }},{{ author[1].lng }}" target="_blank">
      {% endif %}
      {{ author[1].address1 }} {{ author[1].address2 }} {{ author[1].city }}
      {% if author[1].lng %}
        </a>
      {% endif %}
    </p>
  <ul>
  {% for post in posts %}
    <li>
      <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}{% if post.featured == true %} *{% endif %}</a>
    </li>
  {% endfor %}
  </ul>
  </div>
  {% endif %}
{% endfor %}
</div>
