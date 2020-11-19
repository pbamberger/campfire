---
---

async function addToCache(urls) {
  const cache = await window.caches.open('{{ site.pwa.cacheName }}{{ site.pwa.cacheVersion }}');
  await cache.addAll(urls);
}

async function addToResourceCache(urls) {
  const cache = await window.caches.open('resource-{{ site.pwa.cacheName }}{{ site.pwa.cacheVersion }}');
  await cache.addAll(urls);
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

async function addToCookbook(e, pageUrl, imageUrl) {
  addToCache([ pageUrl ]);
  addToResourceCache([ imageUrl ]);
  await updateCookbookCount();
  e.classList.remove('save');
  e.classList.add('saved');
}


function updateActiveMenu() {
  if (window.location.pathname.slice(-10) === 'categories') {
    hash = window.location.hash;
    if (hash) {
      element = document.getElementById('category' + hash.substring(1));
      if (element) {
        element.classList.add('active');
      }
    }
  }
}

function categoryClick(category) {
  if (window.location.pathname.slice(-10) === 'categories') {
    window.location.hash = category;
    window.location.reload();
  }
}

function tagClick(tag) {
  if (window.location.pathname.slice(-4) === 'tags') {
    window.location.hash = tag;
    window.location.reload();
  }
}

function yearClick(year) {
  if (window.location.pathname.slice(-5) === 'years') {
    window.location.hash = year;
    window.location.reload();
  }
}

window.addEventListener("load", () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(function (registration) {
        console.log('Campfire service worker registration successful');
        updateCookbookCount();
        updateActiveMenu();
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
