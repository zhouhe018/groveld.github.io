---
permalink: /sw.js
---

'use strict';

const cacheHash = {{ site.time | date: '%s' }};
const CACHE_NAME = 'groveld-' + cacheHash;
const urlsToCache = ['/?utm_source=homescreen','/','/static/images/logo.png','/404'];

self.addEventListener('install', function(event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(key) {
        if (CACHE_NAME.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request).then(function(response) {
        let clone = response.clone();
        caches.open(cacheName).then(function(cache) {
          cache.put(event.request, clone);
        });
        return response;
      });
    }).catch(function() {
      return caches.match('/404');
    })
  );
});