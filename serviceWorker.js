var CACHE_NAME = 'mycache-v1';
var urlsToCache = [
  '/appshell/',
  'img/img1.jpg',
  'img/img2.jpg',
  'img/img3.jpg',
  'app.js'
];

console.log("SW startup");

self.addEventListener('install', function (event) {
    console.log("SW installed");
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(function (cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', function (event) {
    console.log("SW activated");
});

self.addEventListener('fetch', function (event) {
    console.log("Caught a fetch!");
    //event.respondWith(new Response("Hello world hehe!"));
    event.respondWith(
      caches.match(event.request)
        .then(function (response) {
            // Cache hit - return response
            if (response) {
                return response;
                console.log('response', response);
            }
            return fetch(event.request);
            console.log('response', event.request);
        }
      )
    );
});