// trying this service worker https://stackoverflow.com/questions/50074992/service-worker-network-first-then-cache-with-fallback-to-static-page modfied a bit for our needs.
var STATIC_CACHE = 'hfcache-s';
var DYNAMIC_CACHE = 'hfhcache-d';

//install the serviceworker to the browser
self.addEventListener('install', function (event) {
  console.log('Installing Service Worker ...', event);
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(function (cache) {
        console.log('Precaching App Shell');
        
      })
  )
});

// activate after it is registered. Update the cache if possible
self.addEventListener('activate', function (event) {
  console.log('Activating Service Worker ....', event);
  event.waitUntil(
    caches.keys()
      .then(function (keyList) {
        return Promise.all(keyList.map(function (key) {
          if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE) {
            console.log('Removing old cache.', key);
            return caches.delete(key);
          }
        }));
      })
  );
  return self.clients.claim();
});


// fetch method that takes over normal fetches and does PWA ones
self.addEventListener('fetch', function(event) {
  event.respondWith(
    // Try networking first
    fetch(event.request)
      .then(function(res) {
        return caches.open(DYNAMIC_CACHE)
          .then(function(cache) {
            // cache succefully networked requests
            cache.put(event.request.url, res.clone());
            return res;
          })
      })
      .catch(function(err) {
          // do cached 
          return caches.match(event.request).then(function(res){
            // 404
            if (res === undefined) { 
              res.send('error 404');
            } 
            return res;
        })
      })
  );
});