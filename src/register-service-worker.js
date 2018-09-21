(function() {
    'use strict';
  
    var app = {
      isLoading: true,
      spinner: document.querySelector('.loader'),
      container: document.querySelector('.main'),
      addDialog: document.querySelector('.dialog-container')
    };
  
  
  
  
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
               .register('./service-worker.js')
               .then(function() { console.log('Service Worker Registered'); });
    }
  })();