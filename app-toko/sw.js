const CACHE_NAME = 'toko-v1';
const ASSETS = [
    'index.html',
    'app.js',
    'script.js',
    'manifest.json',
    'icons/icon-192x192.png',
    'icons/icon-512x512.png'
];

// Install: Simpan aset ke cache
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS);
        })
    );
});

// Fetch: Ambil dari cache, jika tidak ada baru ambil ke jaringan
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            // Jika ada di cache (offline mode), kirim cache-nya. 
            // Jika tidak ada, fetch dari server.
            return response || fetch(e.request).catch(() => {
                console.log("Anda sedang offline dan data tidak ada di cache.");
            });
        })
    );
});
