---
---
const baseToCache = [
    {% for page in site.pages %} {% if page.cache == "always" %}
    '{{ page.url }}',
    {% if page.image %}
    '{{ site.baseurl }}/{{ page.image }}',
    {% endif %}
    {% endif %} {% endfor %}

    '/assets/css/bootstrap.css',
    '/assets/css/fonts.css',
    '/assets/css/main.css',
    '/assets/css/screen.css',
    
    '/assets/js/bootstrap.js',
    '/assets/js/jquery.js',
    '/assets/js/main.js',
    '/assets/js/mediumish.js',
    
    '/assets/images/logo.webp'
];

const recentPagesToCache = [
    {% for post in site.posts limit:6 %}
    '{{ post.url }}',
    {% endfor %}
];

const recentResourceToCache = [
    {% for post in site.posts limit:6 %}
    {% if post.image %}
        {% assign author_key = post.author | downcase %}
        {% if post.image contains "://" %}
        '{{ post.image }}',
        {% else  %}
        '{{ post.baseurl }}/assets/images/{{author_key}}/{{ post.image }}',
        {% endif %}
    {% endif %}
    {% endfor %}
];

const cacheTag = '{{ site.pwa.cacheName }}';
const cacheVersion = parseInt('{{ site.pwa.cacheVersion }}'); 
var cacheName = `${cacheTag}${cacheVersion}`;

self.addEventListener(
    'install',
    (e) => {
        console.log('Service Worker, installed');
        e.waitUntil(
            caches.open(`base-${cacheName}`)
                .then((cache) => {
                    console.log('Service Worker, base cached');
                    cache.addAll(baseToCache);
                })
        );
        e.waitUntil(
            caches.open(cacheName)
                .then((cache) => {
                    console.log('Service Worker, recent cached');
                    cache.addAll(recentPagesToCache);
                })
        );
        e.waitUntil(
            caches.open(`resource-${cacheName}`)
                .then((cache) => {
                    console.log('Service Worker, recent resource cached');
                    cache.addAll(recentResourceToCache);
                })
        );
        for (var v = 1; v < cacheVersion; v ++) {
            cacheName = `${cacheTag}${v}`;
            e.waitUntil(
                caches.has(`base-${cacheName}`)
                    .then(() => {
                        caches.delete(`base-${cacheName}`)
                            .then(() => {
                                console.log(`Service Worker, base-${cacheName} deleted`);
                            })
                    })
            );
            e.waitUntil(
                caches.has(cacheName)
                    .then(() => {
                        caches.delete(cacheName)
                            .then(() => {
                                console.log(`Service Worker, ${cacheName} deleted`);
                            })
                    })
            );
            e.waitUntil(
                caches.has(`resource-${cacheName}`)
                    .then(() => {
                        caches.delete(`resource-${cacheName}`)
                            .then(() => {
                                console.log(`Service Worker, resource-${cacheName} deleted`);
                            })
                    })
            );
        }
    });


self.addEventListener(
    'fetch',
    (e) => {
        //console.log(e.request);
        e.respondWith(
            caches.match(e.request)
                .then(function (response) {
                    if (response) {
                        return response;
                    }
                    return fetch(e.request)
                    // .then((response) => {
                    //     //if in patterns to cache
                    //     return caches.open(`campfire-v${'{{ site.pwa.cacheName }}{{ site.pwa.cacheVersion }}'}`)
                    //         .then((cache) => {
                    //             console.log('Service Worker Caching new resource: ' + e.request.url);
                    //             //cache.put(e.request, response.clone());
                    //         });
                    // })
                    .catch((response) => {
                        return caches.match('/offline');
                    });
                })

        );
    });

self.addEventListener(
    'notificationclose',
    (e) => {
        var notification = e.notification;
        var primaryKey = notification.data.primaryKey;    
        console.log('Closed notification: ' + primaryKey);
    });

self.addEventListener(
    'notificationclick',
    (e) => {
        var notification = e.notification;
        var primaryKey = notification.data.primaryKey;
        var action = e.action;
        
        if (action === 'close') {
            notification.close();
        } 
        else if (action === 'explore') {
            clients.openWindow('/about');
            notification.close();
        }
    });

self.addEventListener('push',
    (e) => {
        if (e.data) {
            console.log('This push event has data: ', e.data.text());
            var options = {
                body: 'Here is a notification body!',
                icon: 'images/example.png',
                vibrate: [100, 50, 100],
                data: {
                    dateOfArrival: Date.now(),
                    primaryKey: 1
                }
                 
            };
            //const options = JSON.parse(e.data.text());
            const promiseChain = self.registration.showNotification('Campfire', options);
            e.waitUntil(promiseChain);
        } else {
            console.log('This push event has no data.');
        }
    });