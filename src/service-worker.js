var offlinePage = '/offline.html';

var dataCacheName = 'HughesFHdataCache';
var cacheName = 'HughesFHcache';
var filesToCache = [
  '/',
  '/index.html',
  '/register-service-worker.js',
  '/img/campusbg.PNG',
  '/img/3.PNG',
  '/img/Invitation.PNG',
  '/img/1.PNG',
  '/img/4.PNG',
  '/img/6.PNG',
  '/img/2.PNG',
  '/img/5.PNG',
  '/img/nwlogo-white.png',
  '/img/NWemblem.PNG',
  '/css/style.css',
  '/offline.html'

 

 
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
  if (event.request.method === 'GET') {
    event.respondWith(
      caches.match(event.request)
      .then((cached) => {
        var networked = fetch(event.request)
          .then((response) => {
            let cacheCopy = response.clone()
            caches.open(cacheName)
              .then(cache => cache.put(event.request, cacheCopy))
            return response;
          })
          .catch(() => caches.match(offlinePage));
        return cached || networked;
      })
    )
  }
  return;
});
