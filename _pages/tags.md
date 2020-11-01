---
title: "Tags"
layout: default
permalink: "/tags"
---

{% for tag in site.tags %}
<div id="{{ tag[0] | replace: ' ','-' }}" class="row listrecent collapse">
<div class="section-title col-md-12 mt-4">
<h2>#{{ tag[0] }}</h2>
</div>
{% assign pages_list = tag[1] %}
{% for post in pages_list %}
{% if post.title != null %}
{% if group == null or group == post.group %}
{% include postbox.html %}
{% endif %}
{% endif %}
{% endfor %}
{% assign pages_list = nil %}
{% assign group = nil %}
</div>
{% endfor %}

<script>
    async function renderCurrentKeyTag() {
        var tag = window.location.hash;
        if (tag.length > 0) {
            $(tag).collapse('show');
        }
        else {
            $('div.collapse').each(function( index ) {
                $(this).collapse('show');
            });
        }
    }

    window.addEventListener('load', () => {
        renderCurrentKeyTag();
    });
</script>
