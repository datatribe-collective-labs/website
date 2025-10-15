// DataTribe Collective Service Worker
const CACHE_NAME = 'datatribe-v1.0.0';
const STATIC_CACHE = 'datatribe-static-v1.0.0';
const DYNAMIC_CACHE = 'datatribe-dynamic-v1.0.0';

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/index.html',
  '/css/modern.css',
  '/js/modern.js',
  '/DataTribe_logo_circle.png',
  '/favicon.svg',
  '/learning-paths.html',
  '/events.html',
  '/mentors.html',
  '/partners.html',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('Service Worker: Static files cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Error caching static files', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip external requests (except fonts)
  const url = new URL(event.request.url);
  if (url.origin !== location.origin && !url.hostname.includes('fonts.googleapis.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          console.log('Service Worker: Serving from cache', event.request.url);
          return cachedResponse;
        }

        // Otherwise fetch from network
        console.log('Service Worker: Fetching from network', event.request.url);
        return fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response for caching
            const responseToCache = response.clone();

            // Cache dynamic content
            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch((error) => {
            console.error('Service Worker: Fetch failed', error);
            
            // Return offline page for navigation requests
            if (event.request.destination === 'document') {
              return caches.match('/index.html');
            }
          });
      })
  );
});

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'newsletter-sync') {
    event.waitUntil(syncNewsletterSubscriptions());
  }
});

// Sync newsletter subscriptions when back online
async function syncNewsletterSubscriptions() {
  try {
    const pendingSubscriptions = await getPendingSubscriptions();
    
    for (const subscription of pendingSubscriptions) {
      try {
        await submitNewsletterSubscription(subscription);
        await removePendingSubscription(subscription.id);
      } catch (error) {
        console.error('Failed to sync subscription:', error);
      }
    }
  } catch (error) {
    console.error('Sync failed:', error);
  }
}

// Get pending subscriptions from IndexedDB
async function getPendingSubscriptions() {
  // This would integrate with your actual data storage
  return [];
}

// Submit newsletter subscription
async function submitNewsletterSubscription(subscription) {
  // This would integrate with your actual API
  console.log('Submitting newsletter subscription:', subscription);
}

// Remove pending subscription
async function removePendingSubscription(id) {
  // This would integrate with your actual data storage
  console.log('Removing pending subscription:', id);
}

// Push notifications (if needed in the future)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/DataTribe_logo_circle.png',
      badge: '/favicon.svg',
      tag: 'datatribe-notification',
      requireInteraction: true,
      actions: [
        {
          action: 'open',
          title: 'Open Website'
        },
        {
          action: 'close',
          title: 'Close'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

console.log('Service Worker: Loaded');
