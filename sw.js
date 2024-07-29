"use strict";
/** 缓存名 */
const cache = "cper-cache";
/** 首页 */
const home = "/";
/** 离线首页 */
const offline = "/offline.html";
/** 预缓存项 */
const preCache = [home, offline];
/** 排除项 */
const neverCache = [/.*smcf.*/];

// Install
self.addEventListener('install',(e) => {
	console.log('[PWA] service worker installation');
	e.waitUntil(
		caches.open(cache).then((cache) => {
			console.log('[PWA] service worker caching dependencies');
			filesToCache.map((url) => {
				return cache.add(url).catch((reason) => {
					return console.log(`[PWA] ${reason} ${url}`);
				});
			});
		})
	);
});

// Activate
self.addEventListener('activate',(e) => {
	console.log('[PWA] service worker activation');
	e.waitUntil(
		caches.keys().then((keyList) => {
			return Promise.all(keyList.map((key) => {
				if(key !== cache) {
					console.log(`[PWA] old cache removed, key: ${key}`);
					return caches.delete(key);
				}
			}));
		})
	);
	return self.clients.claim();
});

// Fetch
self.addEventListener('fetch',(e) => {
	
	/** 如果请求在排除项中则跳过缓存 */
	if(!neverCache.every(() => {
		if(this.match(url)) return false;
		return true;
	}, e.request.url)) {
		console.log('[PWA]: Current request is excluded from cache.');
		return;
	}
	
	/** 如果请求协议不是http或者https则跳过缓存 */
	if(! e.request.url.match(/^(http|https):\/\//i))
		// return;
	
	/** 如果请求来自其他域名则跳过缓存 */
	if(new URL(e.request.url).origin !== location.origin)
		// return;
	
	/** 不缓存 POST 请求 若离线则提供离线页 */
	if(e.request.method !== 'GET') {
		e.respondWith(
			fetch(e.request).catch(() => {
				return caches.match(offline);
			})
		);
		return;
	}
	
	// Revving strategy
	if(e.request.mode === 'navigate' && navigator.onLine) {
		e.respondWith(
			fetch(e.request).then((response) => {
				return caches.open(cache).then((cache) => {
					cache.put(e.request, response.clone());
					return response;
				});
			})
		);
		return;
	}

	e.respondWith(
		caches.match(e.request).then((response) => {
			return response || fetch(e.request).then((response) => {
				return caches.open(cache).then((cache) => {
					cache.put(e.request, response.clone());
					return response;
				});
			});
		}).catch(() => {
			return caches.match(offline);
		})
	);
});
