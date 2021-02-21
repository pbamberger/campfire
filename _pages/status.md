---
layout: page
title: Status
permalink: /status
cache: always
---

Title: {{ page.title }}

Site Name: {{site.name}}

Site Title: {{site.title}}

Site Description: {{site.description}}

Categories: {{site.categories.size}}, Posts: {{site.posts.size}}, Tags: {{site.tags.size}}

PWA Cache Name: {{ site.pwa.cacheName }}{{ site.pwa.cacheVersion }}

PWA Cache Mode: {{ jekyll.environment }}

Notifications: <span id='notification'>unavailable</span>

Push Notification: <span id='pushNotification'>unavailable</span>

Service Workers: <span id='serviceWorker'>unavailable</span>

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

    window.addEventListener("load", () => {
        if (Notification.permission != 'denied') {
            document.querySelector('#notification').innerText = 'available';
        }
        if ('PushManager' in window) {
            document.querySelector('#pushNotification').innerText = 'available';
        }
        if ('serviceWorker' in navigator) {
            document.querySelector('#serviceWorker').innerText = 'available';
        }
    });
</script>
