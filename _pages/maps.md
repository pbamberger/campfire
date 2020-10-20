---
layout: page
title: Maps
permalink: /maps
---

<div id="map" style="width: 100%; height: 800px"></div>
<link rel = "stylesheet" href = "http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css"/>
<script src = "http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
<script>
var mapOptions = {
    attributionControl: false,
    center: [-41.052, 172.857],
    zoom: 6
}
var map = new L.map('map', mapOptions);

{% for author in site.data.authors %}
{% if author[1].lng and author[1].lat %}
{% assign posts = site.posts | where: "author", author[0] %}
{% if posts.size > 0 %}
var icon = L.icon({ iconUrl: "{{site.baseurl}}/assets/images/avatars/{{ author[0] }}.webp", iconSize: [50, 50] });
var marker = L.marker([ {{ author[1].lat }}, {{ author[1].lng }} ], { title: "{{ author[1].name }}", icon: icon }).addTo(map);
{% else %}
var marker = L.marker([ {{ author[1].lat }}, {{ author[1].lng }} ], { title: "{{ author[1].name }}" }).addTo(map);
{% endif %}
marker.bindPopup(`
<div>
<h4>{{ author[1].name }}</h4>
<p>{{ author[1].address1 }} {{ author[1].address2 }} {{ author[1].city }}</p>
{% for post in posts %}
<div>
<a target="_blank" href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}{% if post.featured == true %} *{% endif %}</a>
</div>
{% endfor %}
</div>
`);
{% endif %}
{% endfor %}

var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
map.addLayer(layer);
</script>
