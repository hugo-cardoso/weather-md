var CACHE_NAME = 'my-cache-v1';
var urlsToCache = [
'index.html',
'css/style.css',
'css/bootstrap.min.css',
'css/materialdesignicons.min.css',
'css/materialdesignicons.min.css.map',
'js/angular.min.js',
'js/angular-smooth-scroll.js',
'js/app.js',
'favicon.ico',
'favicon.png'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
  	caches.open(CACHE_NAME)
  	.then(function(cache) {
  		console.log('Opened cache');
  		return cache.addAll(urlsToCache);
  	})
  	);
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		fetch(event.request).catch(function() {
			return caches.match(event.request);
		})
		);
});