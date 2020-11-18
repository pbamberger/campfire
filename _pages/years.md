---
layout: default
title: Years
permalink: /years
cache: always
---

{% for post in site.posts %}
{% capture year %}{{ post.date | date: "%Y" }}{% endcapture %}
{% capture month %}{{ post.date | date: "%B" }}{% endcapture %}
{% if year != prev_year or month != prev_month %}
{% if forloop.first %} {% else %}</ul></div>{% endif %}
{% assign prev_month = '' %}
{% if year != prev_year %}
<div class="row listrecent">
{% else %}
<div id="{{ year }}" class="row listrecent">
{% endif %}
<div class="section-title col-md-12 mt-4"><h2 class="text-capitalize"><span>{{ year }} {{ month }}</span></h2></div>
<ul>
{% endif %}
<li><a href="{{ post.url }}">{{ post.title }}</a></li>
{% assign prev_year = year %}
{% assign prev_month = month %}
{% endfor %}

<script>
    async function renderCurrentKeyYear() {
        var year = window.location.hash;
        if (year.length > 0) {
            $(year).collapse('show');
        }
        else {
            $('div.collapse').each(function( index ) {
                $(this).collapse('show');
            });
        }
    }

    window.addEventListener('load', () => {
        renderCurrentKeyYear();
    });
</script>
