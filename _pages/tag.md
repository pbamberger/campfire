---
layout: default
title: Tags
permalink: /tag
---

<h2>Tags</h2>
<ul> 
{% assign tags_list = site.tags | sort %}
{% if tags_list.first[0] == null %}
{% for tag in tags_list %}
    <li class="navbar-nav">
        <a class="nav-link" href="{{site.baseurl}}/tag/{{ tag | url_escape | strip | replace: ' ', '-' }}">#{{ tag | replace: ' ','-' }} [{{ site.tags[tag].size }}]</a>
    </li>
{% endfor %}
{% else %}
{% for tag in tags_list %}
    <li class="navbar-nav">
        <a class="nav-link" href="{{site.baseurl}}/tag/{{ tag[0] | url_escape | strip | replace: ' ', '-' }}">#{{ tag[0] | replace: ' ','-' }} <sup>{{ tag[1].size }}</sup></a>
    </li>
{% endfor %}
{% endif %}
</ul>
