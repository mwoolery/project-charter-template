// register a service worker for PWA
(function() {
    'use strict';
    var app = {
      isLoading: true,
      spinner: document.querySelector('.loader'),
      container: document.querySelector('.main'),
      addDialog: document.querySelector('.dialog-container')
    };
  
  
  
    // checks to see a service worker is in navigator, if not register the service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
               .register('/service-worker.js')
               .then(function() { console.log('Service Worker Registered'); });
    }
  })();