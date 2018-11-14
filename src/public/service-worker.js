const offlinePage = '/offline.html';

var dataCacheName = 'HughesFHdataCache';
var cacheName = 'HughesFHcache';
var filesToCache = [
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
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );

  return self.clients.claim();
});


// check for the cache
self.addEventListener('fetch', (event) => {
  if (event.request.method != 'GET') return;

  event.respondWith(async function() {
    
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(event.request);

    
    event.respondWith(
        fetch(event.request).catch(function() {
          return caches.match(event.request);
        }));

    return fetch(event.request);
  }());
});
