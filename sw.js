'use strict';

const cacheName = `groveld-1528030970`;
const urlsToCache = ['/?utm_source=homescreen'];

// Cache assets
urlsToCache.push('/CNAME')
urlsToCache.push('/favicon.ico')
urlsToCache.push('/static/css/style.css')
urlsToCache.push('/static/icons/apple/apple-touch-icon-114x114-precomposed.png')
urlsToCache.push('/static/icons/apple/apple-touch-icon-114x114.png')
urlsToCache.push('/static/icons/apple/apple-touch-icon-120x120-precomposed.png')
urlsToCache.push('/static/icons/apple/apple-touch-icon-120x120.png')
urlsToCache.push('/static/icons/apple/apple-touch-icon-144x144-precomposed.png')
urlsToCache.push('/static/icons/apple/apple-touch-icon-144x144.png')
urlsToCache.push('/static/icons/apple/apple-touch-icon-152x152-precomposed.png')
urlsToCache.push('/static/icons/apple/apple-touch-icon-152x152.png')
urlsToCache.push('/static/icons/apple/apple-touch-icon-180x180-precomposed.png')
urlsToCache.push('/static/icons/apple/apple-touch-icon-180x180.png')
urlsToCache.push('/static/icons/apple/apple-touch-icon-57x57-precomposed.png')
urlsToCache.push('/static/icons/apple/apple-touch-icon-57x57.png')
urlsToCache.push('/static/icons/apple/apple-touch-icon-60x60-precomposed.png')
urlsToCache.push('/static/icons/apple/apple-touch-icon-60x60.png')
urlsToCache.push('/static/icons/apple/apple-touch-icon-72x72-precomposed.png')
urlsToCache.push('/static/icons/apple/apple-touch-icon-72x72.png')
urlsToCache.push('/static/icons/apple/apple-touch-icon-76x76-precomposed.png')
urlsToCache.push('/static/icons/apple/apple-touch-icon-76x76.png')
urlsToCache.push('/static/icons/apple/apple-touch-icon-precomposed.png')
urlsToCache.push('/static/icons/apple/apple-touch-icon.png')
urlsToCache.push('/static/icons/apple/safari-pinned-tab.svg')
urlsToCache.push('/static/icons/icon-128x128.png')
urlsToCache.push('/static/icons/icon-144x144.png')
urlsToCache.push('/static/icons/icon-152x152.png')
urlsToCache.push('/static/icons/icon-192x192.png')
urlsToCache.push('/static/icons/icon-384x384.png')
urlsToCache.push('/static/icons/icon-512x512.png')
urlsToCache.push('/static/icons/icon-72x72.png')
urlsToCache.push('/static/icons/icon-96x96.png')
urlsToCache.push('/static/icons/windows/large.jpg')
urlsToCache.push('/static/icons/windows/medium.jpg')
urlsToCache.push('/static/icons/windows/small.jpg')
urlsToCache.push('/static/icons/windows/wide.jpg')
urlsToCache.push('/static/images/logo.png')
urlsToCache.push('/static/js/main.js')

// Cache posts
urlsToCache.push('/articles/htaccess-snippets')
urlsToCache.push('/articles/www-non-www-redirection')
urlsToCache.push('/articles/give-user-permission-to-edit-and-add-files-in-var-www')
urlsToCache.push('/articles/use-gitolite-to-control-access-to-a-git-server')
urlsToCache.push('/articles/open-hackerspaces-day-2014')
urlsToCache.push('/articles/how-to-use-gpg-to-encrypt-and-sign-messages')
urlsToCache.push('/articles/postfix-with-mysql-backend-and-tls')
urlsToCache.push('/articles/clean-urls-with-jekyll-apache')
urlsToCache.push('/articles/what-it-really-means-to-hack')
urlsToCache.push('/articles/teamspeak-3-server-on-debian-ubuntu')
urlsToCache.push('/articles/ohm2013-observe-hack-make')

// Cache pages
urlsToCache.push('/about')
urlsToCache.push('/blog')
urlsToCache.push('/contact')
urlsToCache.push('/legal/cookies')
urlsToCache.push('/')
urlsToCache.push('/legal/privacy')
urlsToCache.push('/legal/terms')


self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (!cacheName.includes(key)) return caches.delete(key);
      })
    ))
  );
});

self.addEventListener('fetch', event => {
});
