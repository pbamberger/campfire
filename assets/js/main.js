---
---
/* service worker */

async function addToCache(urls) {
  const cache = await window.caches.open('{{ site.pwa.cacheName }}{{ site.pwa.cacheVersion }}');
  await cache.addAll(urls);
  await updateCookbookCount();
}

async function addToResourceCache(urls) {
  const cache = await window.caches.open('resource-{{ site.pwa.cacheName }}{{ site.pwa.cacheVersion }}');
  await cache.addAll(urls);
  await updateCookbookCount();
}

async function removeFromCache(url) {
  const cache = await window.caches.open('{{ site.pwa.cacheName }}{{ site.pwa.cacheVersion }}');
  await cache.delete(url);
  await updateCookbookCount();
}

async function removeResourceFromCache(url) {
  const cache = await window.caches.open('resource-{{ site.pwa.cacheName }}{{ site.pwa.cacheVersion }}');
  await cache.delete(url);
  await updateCookbookCount();
}

async function updateCookbookCount() {
  let cookbookCount = document.querySelector('#cookbookCounter');
  caches.open('{{ site.pwa.cacheName }}{{ site.pwa.cacheVersion }}').then((cache) => {
    cache.keys().then((keys) => {
      cookbookCount.innerHTML = keys.length;
    });
  });
}

window.addEventListener("load", () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(function (registration) {
        console.log('Campfire service worker registration successful');
        updateCookbookCount();
      })
      .catch(function (error) {
        console.log('Campfire service worker registration failed, error:', error);
      });
    // Notification.requestPermission(result =>  {
    //   console.log(result)
    //   if (result === 'granted') {
    //     alert('thanks for giving me permissions')
    //   }
    //   else {
    //     alert('no pushes')
    //   }
    // });
  }
  else {
    alert('no cookbook or pushes')
  }
});

function tagclick(tag) {
  if (window.location.pathname.slice(-4) === 'tags') {
    window.location.hash = tag;
    window.location.reload();
  }
}

/*!
 * IE10 viewport hack for Surface/desktop Windows 8 bug
 * Copyright 2014-2017 The Bootstrap Authors
 * Copyright 2014-2017 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
 (function () {
  'use strict'
  if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement('style')
    msViewportStyle.appendChild(
      document.createTextNode(
        '@-ms-viewport{width:auto!important}'
      )
    )
    document.head.appendChild(msViewportStyle)
  }
}())
