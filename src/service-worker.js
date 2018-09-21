
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
  '/css/style.css'

 

 
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



//just checks for a cache
self.addEventListener('fetch', function(e) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
