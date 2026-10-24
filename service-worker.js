'use strict';
const BASE = "/qinglan-orchid/";
const CACHE = "qinglan-pages-2225ae87f913eee8";
const RESOURCES = ["/qinglan-orchid/","/qinglan-orchid/experience/","/qinglan-orchid/install-app.js","/qinglan-orchid/app.webmanifest","/qinglan-orchid/icons/orchid-192.png","/qinglan-orchid/icons/orchid-512.png","/qinglan-orchid/icons/orchid-180.png","/qinglan-orchid/assets/orchid-icon.png","/qinglan-orchid/favicon.svg"];
const READY = BASE + '__qinglan_offline_ready';
const VERSION = '3ece8589a542bab858917764';
self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
async function status() {
  const cache = await caches.open(CACHE);
  const marker = await cache.match(READY);
  if (!marker) return { ready: false };
  for (const path of RESOURCES) if (!(await cache.match(path))) return { ready: false };
  const saved = await marker.json();
  if (saved.version !== VERSION) return { ready: false, requiresUpdate: true };
  return { ready: true, version: saved.version, updated: saved.updated };
}
let preparing;
function cachedResponse(response) {
  if (!response.redirected) return response;
  const headers = new Headers(response.headers);
  headers.delete('Content-Encoding');
  headers.delete('Content-Length');
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}
async function prepare(port) {
  const cache = await caches.open(CACHE);
  await cache.delete(READY);
  for (let i = 0; i < RESOURCES.length; i++) {
    const path = RESOURCES[i];
    port.postMessage({ type: 'PROGRESS', current: i, total: RESOURCES.length, path });
    const response = await fetch(new Request(path, { cache: 'reload', credentials: 'same-origin' }));
    const finalURL = new URL(response.url);
    const canonicalPath = path.replace(/\/$/, '') || '/';
    const sameResource = finalURL.origin === self.location.origin && (finalURL.pathname.replace(/\/$/, '') || '/') === canonicalPath;
    if (!response.ok || (response.redirected && !sameResource)) throw new Error('资源暂时无法保存，请检查网络后重试。');
    if ((path === BASE || path === BASE + 'experience/') && !(response.headers.get('content-type') || '').includes('text/html')) throw new Error('体验资源尚未准备好，请稍后重试。');
    await cache.put(path, cachedResponse(response));
  }
  await cache.put(READY, new Response(JSON.stringify({ version: VERSION, updated: new Date().toISOString() }), { headers: { 'Content-Type': 'application/json' } }));
  return status();
}
self.addEventListener('message', event => {
  const port = event.ports && event.ports[0];
  if (!port) return;
  if (event.data && event.data.type === 'STATUS') {
    event.waitUntil(status().then(value => port.postMessage({ type: 'STATUS', ...value })).catch(() => port.postMessage({ type: 'STATUS', ready: false })));
  }
  if (event.data && event.data.type === 'PREPARE_OFFLINE') {
    if (preparing) { port.postMessage({ type: 'ERROR', message: '另一处正在准备资源，请稍后查看状态。' }); return; }
    preparing = prepare(port).then(value => port.postMessage({ type: 'COMPLETE', ...value })).catch(() => port.postMessage({ type: 'ERROR', message: '保存未完成。请保持联网并留出约 60MB 空间，再点击重试。' })).finally(() => { preparing = null; });
    event.waitUntil(preparing);
  }
});
async function refreshExperience(request, cached) {
  try {
    const head = await fetch(new Request(request.url, { method: 'HEAD', cache: 'no-cache' }));
    if (!head.ok || head.headers.get('etag') === cached.headers.get('etag')) return;
    const response = await fetch(request);
    if (response.ok && (response.headers.get('content-type') || '').includes('text/html')) (await caches.open(CACHE)).put(BASE + 'experience/', cachedResponse(response)).catch(() => {});
  } catch (_) {}
}
self.addEventListener('fetch', event => {
  const request = event.request, url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  const path = url.pathname === BASE + 'experience' || url.pathname === BASE + 'experience/index.html' ? BASE + 'experience/' : url.pathname === BASE + 'index.html' ? BASE : url.pathname;
  if (!RESOURCES.includes(path)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE), cached = await cache.match(path);
    if (path === BASE + 'experience/' && cached) {
      event.waitUntil(refreshExperience(request, cached));
      return cached;
    }
    try { return await fetch(request); }
    catch (error) { if (cached) return cached; throw error; }
  })());
});
