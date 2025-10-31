// RankBee marketing-builder-io Service Worker
// Goal: Stale-while-revalidate for HTML navigation with a 5-minute freshness window,
// while bypassing cache for dynamic/auth pages like /sign-in and /sign-up.

const CACHE_NAME = 'rb-vite-pages-v1';
const TTL_MS = 1 * 1 * 1000; // 5 minutes
const DYNAMIC_BYPASS = ['/sign-in', '/sign-up'];

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // Future: cleanup old caches if CACHE_NAME changes
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter((k) => k !== CACHE_NAME)
        .map((k) => caches.delete(k))
    );
  })());
  self.clients.claim();
});

function isNavigationRequest(request) {
  // A navigation request for SPA routes (index.html)
  return request.mode === 'navigate' ||
    (request.method === 'GET' && request.headers.get('accept')?.includes('text/html'));
}

self.addEventListener('fetch', (event) => {
  const req = event.request;

  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Only handle navigation requests (HTML). Assets use default caching/CDN policy.
  if (!isNavigationRequest(req)) return;

  event.respondWith(handleNavigationRequest(req, url));
});

async function handleNavigationRequest(req, url) {
  // Bypass cache for dynamic/auth pages
  if (DYNAMIC_BYPASS.includes(url.pathname)) {
    try {
      return await fetch(req, { cache: 'no-store' });
    } catch {
      // If network fails on dynamic routes, do not serve stale HTML; just error.
      return Response.error();
    }
  }

  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(req);

  if (cached) {
    // Check our custom freshness stamp
    const ts = parseInt(cached.headers.get('x-sw-cache-time') || '0', 10) || 0;
    const age = Date.now() - ts;
    if (age < TTL_MS) {
      // Serve immediately and revalidate in background
      revalidate(req, cache);
      return cached;
    }
  }

  // Network-first with cache update, fallback to stale if available
  try {
    const netRes = await fetch(req, { cache: 'no-store' });
    const stamped = await stampWithTime(netRes);
    // Update cache (await to ensure next request can serve fresh stamp)
    await cache.put(req, stamped.clone());
    return netRes;
  } catch {
    if (cached) return cached;
    return Response.error();
  }
}

async function revalidate(req, cache) {
  try {
    const res = await fetch(req, { cache: 'no-store' });
    const stamped = await stampWithTime(res);
    await cache.put(req, stamped);
  } catch {
    // Ignore revalidate errors
  }
}

async function stampWithTime(res) {
  // Clone response and attach a freshness header
  const clone = res.clone();
  const body = await clone.blob();
  const headers = new Headers(clone.headers);
  headers.set('x-sw-cache-time', String(Date.now()));
  return new Response(body, {
    status: clone.status,
    statusText: clone.statusText,
    headers,
  });
}