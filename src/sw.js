'use strict';

const cacheName = 'groveld-cache';
const cacheFiles = [
  '/',
  '/articles',
  '/about',
  '/contact',
  '/legal/terms',
  '/legal/privacy',
  '/legal/cookies',
  '/static/css/app.css',
  '/static/js/app.js',
  '/static/images/logo.png',
  '/article/htaccess-snippets',
  '/article/www-non-www-redirection'
];

self.addEventListener('beforeinstallprompt', event => {
  event.prompt();
});

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(cacheFiles);
      })
  );
});

self.addEventListener('activate', event => {
});

self.addEventListener('fetch', event => {
  // event.respondWith(
  //   caches.match(event.request)
  //     .then(response => {
  //       return response || fetch(event.request);
  //     })
  // );
});