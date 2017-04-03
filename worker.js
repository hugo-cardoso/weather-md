var CACHE_NAME = 'my-cache-v2';
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
'favicon.png',
'res/clear-day.png',
'res/clear-night.png',
'res/cloudy-weather.png',
'res/haze-day.png',
'res/haze-night.png',
'res/haze-weather.png',
'res/mostly-cloudy.png',
'res/mostly-cloudy-night.png',
'res/rain-snow.png',
'res/rain-snow-day.png',
'res/rain-snow-night.png',
'res/rainy-day.png',
'res/rainy-night.png',
'res/rainy-weather.png',
'res/showcase.png',
'res/snow-day.png',
'res/snow-night.png',
'res/storm-weather.png',
'res/storm-weather-day.png',
'res/storm-weather-night.png',
'res/thunder-day.png',
'res/thunder-night.png',
'res/thunder-weather.png',
'res/windy-day.png',
'res/windy-night.png',
'res/windy-weather.png',
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