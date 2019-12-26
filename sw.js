'use strict';

const cacheVersion = 'cbf66c1::';
const urlsToCache = ['/404','/about','/atom.xml','/browserconfig.xml','/feed/json','/','/css/main.cbf66c1.css','/js/main.cbf66c1.js','/manifest.json','/privacy','/robots.txt','/rss.xml','/sitemap.xml','/css/syntax.cbf66c1.css','/terms','/articles/group-policy-processing','/articles/htaccess-snippets','/articles/www-non-www-redirection','/articles/give-user-permission-to-edit-and-add-files-in-var-www','/articles/use-gitolite-to-control-access-to-a-git-server','/articles/open-hackerspaces-day-2014','/articles/how-to-use-gpg-to-encrypt-and-sign-messages','/articles/postfix-with-mysql-backend-and-tls','/articles/clean-urls-with-jekyll-apache','/articles/what-it-really-means-to-hack','/articles/teamspeak-3-server-on-debian-ubuntu','/articles/ohm2013-observe-hack-make'];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cacheVersion + 'static').then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
  return self.skipWaiting();
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          return cacheName.indexOf(cacheVersion) !== 0;
        }).map(function (cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open(cacheVersion + 'static').then(function (cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function (response) {
          cache.put(event.request, response.clone());
          return response;
        });
      }).catch(function () {
        return caches.match('/404')
      });
    })
  );
});
