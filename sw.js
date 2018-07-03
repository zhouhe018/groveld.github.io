'use strict';

const cacheVersion = '1530613525::';
const urlsToCache = [
  '/?utm_source=homescreen',
  '/404','/about','/atom.xml','/blog','/browserconfig.xml','/contact','/legal/cookies','/','/manifest.json','/legal/privacy','/robots.txt','/sitemap.xml','/sw.js','/legal/terms',
  '/articles/htaccess-snippets','/articles/www-non-www-redirection','/articles/give-user-permission-to-edit-and-add-files-in-var-www','/articles/use-gitolite-to-control-access-to-a-git-server','/articles/open-hackerspaces-day-2014','/articles/how-to-use-gpg-to-encrypt-and-sign-messages','/articles/postfix-with-mysql-backend-and-tls','/articles/clean-urls-with-jekyll-apache','/articles/what-it-really-means-to-hack','/articles/teamspeak-3-server-on-debian-ubuntu','/articles/ohm2013-observe-hack-make',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheVersion + 'static').then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
  return self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.indexOf(cacheVersion) !== 0;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(cacheVersion + 'static').then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      }).catch(function() {
        return caches.match('/404')
      });
    })
  );
});
