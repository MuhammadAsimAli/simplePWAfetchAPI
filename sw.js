//caches the files

var cacheName = 'my assignment app9';
var filesToCache = [
  '/index.js',
  
  '/index.html',

  '/',
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});


self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function(keyList) {        //select all cache
          return Promise.all(keyList.map(function(key) {   //iteraet cache
            if (key !== cacheName) {                          //leave current cache
              console.log('[ServiceWorker] Removing old cache', key);
              return caches.delete(key);                               //delete all previous cache
            }
          }));
        })
      );
      return self.clients.claim();
    });


self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  });