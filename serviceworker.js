
// const CACHE_NAME = 'cache-9999999';
// const cacheList = ['index.html', 'css/style.css', 'img/logo_rj.svg', '.'];

self.addEventListener('install', function(event) {
	console.log('[ServiceWorker] install');
	self.skipWaiting();
	// event.waitUntil(
	// 	caches.open(CACHE_NAME).then(function(cache) {
	// 		return cache.addAll(cacheList);
	// 	})
	// )
});

self.addEventListener('fetch', function(event) {
	console.log('[ServiceWorker] fetching...');
	// event.respondWith(
	// 	caches.open(CACHE_NAME).then(function(cache) {
	// 		return cache.match(event.request).then(function(response) {
	// 			return response || fetch(event.request, {credentials: "same-origin"}).then(function(response) {
	// 				if (!response || response.status !== 200 || !response.ok || !response.type !== 'basic') return response;
	// 				cache.put(event.request, response.clone());
	// 				return response;
	// 			});
	// 		})
	// 	})
	// );
});

self.addEventListener('activate', function(event) {
	console.log('[ServiceWorker] activate');
	// event.waitUntil(
	// 	caches.keys().then(function(cacheNames) {
	// 		return cacheNames.filter(function(cacheName) {
	// 			return cacheName !== CACHE_NAME;
	// 		});
	// 	}).then(function(cache) {
	// 		return Promise.all(cache.map(function(cacheName) {
	// 			return caches.delete(cacheName);
	// 		}));
	// 	}).then(function(){
	// 		self.clients.claim();
	// 		self.clients.matchAll().then(function (clients){
	// 			//console.log('[ServiceWorker] message to client');
	// 			clients.forEach(function(client){
	// 				client.postMessage({result: 'ok', command: 'cache-update', cacheName: CACHE_NAME});
	// 			});
	// 		});
	// 	})
	// );
});

self.addEventListener('push', function(event) {
	var data = event.data;
	if (event.data) {
		var data = event.data.json();
		var title = data.title;
		var icon = data.icon;
		var msg = data.msg;
	} else {
		var title = 'FEからのお知らせ';
		var icon = 'https://pwa.portfolio-s.info/icon/launcher-icon-512x512.png';
		var msg = '実績モジュールを更新しました';
	}
	event.waitUntil(
		self.registration.showNotification(title, {
			icon: icon,
			body: msg
		})
	)
});

self.addEventListener('notificationclick', function(event) {
	event.notification.close();
	event.waitUntil(
		clients.matchAll({type: 'window'}).then(function() {
			if (clients.openWindow) {
				return clients.openWindow('https://pwa.portfolio-s.info/');
			}
		})
	);
});
