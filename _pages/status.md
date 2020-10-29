---
layout: page
title: Status
permalink: /status
comments: false
---

Title: {{ page.title }} 

Site Name: {{site.name}}

Site Title: {{site.title}}

Site Description: {{site.description}}

PWA Cache name: {{ site.pwa.cacheName }}{{ site.pwa.cacheVersion }}

<button onclick="resetServiceWorker();">Clear cookbook, and reset service worker caches</button>

<script>
    async function clearCache(cacheName) {
        caches.open(cacheName)
            .then(() => {
                caches.delete(cacheName)
                    .then(() => {
                        console.log(`Cache, ${cacheName} deleted`);
                    })
            });
    }

    function home() {
        window.location.href = '/status';
    }

    function resetServiceWorker () {
        clearCache('{{ site.pwa.cacheName }}{{ site.pwa.cacheVersion }}');
        clearCache('base-{{ site.pwa.cacheName }}{{ site.pwa.cacheVersion }}');
        clearCache('resource-{{ site.pwa.cacheName }}{{ site.pwa.cacheVersion }}');

        navigator.serviceWorker.getRegistrations()
            .then(function(registrations) {
                for(let registration of registrations) {
                    registration.unregister().then(() => {
                        console.log('Reset SW, unregister service worker');
                    });
                }
            });

        setTimeout(home, 1000);
    }
</script>
