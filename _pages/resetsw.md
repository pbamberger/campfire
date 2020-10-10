---
layout: page
title: Reset Cache
permalink: /resetsw
---

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

    window.addEventListener('load', () => {
        clearCache('{{ site.pwa.cacheName }}{{ site.pwa.cacheVersion }}');
        clearCache('base-{{ site.pwa.cacheName }}{{ site.pwa.cacheVersion }}');
        clearCache('resource-{{ site.pwa.cacheName }}{{ site.pwa.cacheVersion }}');

        navigator.serviceWorker.getRegistrations()
            .then(function(registrations) {
                for(let registration of registrations) {
                    registration.unregister().then(() => {
                        console.log(`Reset SW, unregister service worker`);
                    });
                }
            });
    });
</script>
