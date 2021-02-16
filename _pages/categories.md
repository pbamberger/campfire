---
layout: default
title: Categories
permalink: /categories
cache: always
---

{% for category in site.categories %}
    {% if category contains page.filter or page.filter == null %}
<div id="{{ category[0] | replace: ' ','-' }}" class="row listrecent collapse">
    <div class="section-title col-md-12 mt-4"><h2 class="text-capitalize"><span>{{ category[0] }}</span></h2></div>
        {% assign pages_list = category[1] %}
        {% for post in pages_list %}
            {% if post.title != null %}
                {% if group == null or group == post.group %}
                    {% include postbox.html %}
                {% endif %}
            {% endif %}
        {% endfor %}
        {% assign pages_list = nil %}
        {% assign group = nil %}
    {% endif %}
</div>
{% endfor %}

<script>
    async function renderCurrentKeyCategory() {
        var category = window.location.hash;
        if (category.length > 0) {
            $(category).collapse('show');
        }
        else {
            $('div.collapse').each(function( index ) {
                $(this).collapse('show');
            });
        }
    }

    window.addEventListener('load', () => {
        renderCurrentKeyCategory();
    });
</script>
