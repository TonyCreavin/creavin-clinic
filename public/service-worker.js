self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
  // Cache assets
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating.');
  // Cleanup old caches
});

self.addEventListener('fetch', (event) => {
  console.log('Fetching:', event.request.url);
  // Respond with cached resources
});
