'use strict';
const BASE="/qinglan-orchid/", NAMESPACE="qinglan-pages-2225ae87f913eee8", VERSION="46c6c9df0e3a6321cc82a940", RESOURCES=["/qinglan-orchid/app.webmanifest","/qinglan-orchid/assets/experience/1028f21574d077be73a06c83.jpg","/qinglan-orchid/assets/experience/1155735c3230bf2216d848f1.webp","/qinglan-orchid/assets/experience/12bf9ed25b54f151f218289c.webp","/qinglan-orchid/assets/experience/13bd41991793d19c37a0129a.webp","/qinglan-orchid/assets/experience/1c3f18156c5f3b4208fd2fac.jpg","/qinglan-orchid/assets/experience/21c927c9705cc1f5f2a6b51f.webp","/qinglan-orchid/assets/experience/2bde05fe64cb21298b12883e.webp","/qinglan-orchid/assets/experience/2e07d9e74e7d4eda200a0fd0.webp","/qinglan-orchid/assets/experience/30dd8a278728d70e9ef7f906.webp","/qinglan-orchid/assets/experience/3129956fdd95efef03f5ff11.webp","/qinglan-orchid/assets/experience/319778b102106443b36dd9d0.webp","/qinglan-orchid/assets/experience/3821ea9b1f7fb8c549ef2a06.wasm","/qinglan-orchid/assets/experience/3a62d4c9f4ba059e605478bd.jpg","/qinglan-orchid/assets/experience/3b008374967b6629ad4a24cb.jpg","/qinglan-orchid/assets/experience/40f4123dfcd75cfa58add046.js","/qinglan-orchid/assets/experience/47ed88a5b92f9bc876e0d009.jpg","/qinglan-orchid/assets/experience/51e1994891b2b5d7bb1e0dc3.jpg","/qinglan-orchid/assets/experience/52a07b380b50ae96db0b54d2.woff","/qinglan-orchid/assets/experience/57b823798f6e2d4e4f67c06b.webp","/qinglan-orchid/assets/experience/59ab914fd9094580e5c8e9ff.webp","/qinglan-orchid/assets/experience/5fffaf47479d687362a304fc.webp","/qinglan-orchid/assets/experience/69abac7c584b167bc2279302.webp","/qinglan-orchid/assets/experience/6d56ffd4149655d55f437091.webp","/qinglan-orchid/assets/experience/6f8ed7a995e5fd94f4072c1d.jpg","/qinglan-orchid/assets/experience/73346890fb750c16dd8b6c5d.webp","/qinglan-orchid/assets/experience/739c579726a79ba9772debf3.woff","/qinglan-orchid/assets/experience/75f043118bd9c073a9870930.webp","/qinglan-orchid/assets/experience/7767abf0af50d921476089e8.jpg","/qinglan-orchid/assets/experience/927def7b465c51b86e4b3060.js","/qinglan-orchid/assets/experience/97a7c552fe366bca3328b06f.webp","/qinglan-orchid/assets/experience/9b3895dc2a3de297943ffa7f.jpg","/qinglan-orchid/assets/experience/9d64ead4b19ac8dd4cfc557b.webp","/qinglan-orchid/assets/experience/a73f9ff1990aec8fef9b0629.webp","/qinglan-orchid/assets/experience/acd50f39fc22bd929d8a9f1a.woff","/qinglan-orchid/assets/experience/b6ec7ed47e20b942fa3d97cd.webp","/qinglan-orchid/assets/experience/b7bed30c1186df8babe596ef.webp","/qinglan-orchid/assets/experience/b9f5e618448b275b02412d35.jpg","/qinglan-orchid/assets/experience/d11a61dabc836987d7d181de.webp","/qinglan-orchid/assets/experience/d49f8a01ca6513c1b30372ea.woff","/qinglan-orchid/assets/experience/d655c182f7d5be41314b6304.webp","/qinglan-orchid/assets/experience/d79ee406015c8c774e246edd.webp","/qinglan-orchid/assets/experience/d7fe459ccf7ef57db61b1c0b.webp","/qinglan-orchid/assets/experience/d8331616d192e578d3f56d2a.woff","/qinglan-orchid/assets/experience/dfc8d5b3cd3eea134b94baf8.woff","/qinglan-orchid/assets/experience/e2bd872bb74e9f9ff2c64be1.jpg","/qinglan-orchid/assets/experience/e98b9746c491b18437994445.jpg","/qinglan-orchid/assets/experience/f374b681b59af1f503d5f714.webp","/qinglan-orchid/assets/experience/f8533d0023fd0ffe159aaadc.webp","/qinglan-orchid/assets/experience/fbc2a30080c3c557093b5ddf.bin","/qinglan-orchid/assets/experience/fc23e6498aba1731b7d3356b.webp","/qinglan-orchid/assets/experience/scene-index-91c540b54a6ba9ec.json","/qinglan-orchid/assets/experience/scenes-bloom-4b58ff9d1a3d723e.html","/qinglan-orchid/assets/experience/scenes-lab-eb31058fa6d35351.html","/qinglan-orchid/assets/experience/scenes-shop-a3d8e6cd08dc0c5f.html","/qinglan-orchid/assets/landing/font-52a07b380b50ae96db0b.woff","/qinglan-orchid/assets/landing/font-acd50f39fc22bd929d8a.woff","/qinglan-orchid/assets/landing/font-d49f8a01ca6513c1b303.woff","/qinglan-orchid/assets/landing/image-01b78264a223cbc1f318.webp","/qinglan-orchid/assets/landing/image-03d97756bf1a77e650f5.webp","/qinglan-orchid/assets/landing/image-5c35250fccf9c1624aff.webp","/qinglan-orchid/assets/landing/image-892f35f2afb9ccf54856.webp","/qinglan-orchid/assets/landing/image-8dd61c1680c6944f2d9b.webp","/qinglan-orchid/assets/landing/image-8de0e4e7364ac651a1e0.webp","/qinglan-orchid/assets/landing/image-95fc351d44cbc41b7635.webp","/qinglan-orchid/assets/landing/image-98008a1135690927d142.webp","/qinglan-orchid/assets/landing/image-e73283c93c021d529e52.webp","/qinglan-orchid/assets/landing/image-e7f8e17241034715f4fa.webp","/qinglan-orchid/assets/landing/image-f25513cf5cdf240eb674.webp","/qinglan-orchid/assets/landing/image-f5b8f2ac8194836c76af.webp","/qinglan-orchid/assets/orchid-icon.png","/qinglan-orchid/experience/","/qinglan-orchid/favicon.svg","/qinglan-orchid/icons/orchid-180.png","/qinglan-orchid/icons/orchid-192.png","/qinglan-orchid/icons/orchid-512.png","/qinglan-orchid/","/qinglan-orchid/install-app.js"];
const OFFLINE=NAMESPACE+'-offline-'+VERSION, RUNTIME=NAMESPACE+'-runtime', READY=BASE+'__qinglan_offline_ready';
const DOCUMENTS=[BASE,BASE+'experience/'];
const canonical=path=>path===BASE+'index.html'?BASE:[BASE+'experience',BASE+'experience/index.html'].includes(path)?BASE+'experience/':path;
self.addEventListener('install',event=>event.waitUntil(self.skipWaiting()));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
function storedResponse(response){
 if(!response.redirected)return response;
 const headers=new Headers(response.headers);headers.delete('Content-Encoding');headers.delete('Content-Length');
 return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
}
async function status(){
 const cache=await caches.open(OFFLINE),marker=await cache.match(READY);
 if(!marker)return{ready:false};
 const saved=await marker.json();if(saved.version!==VERSION)return{ready:false,requiresUpdate:true};
 for(const resource of RESOURCES)if(!await cache.match(resource))return{ready:false};
 return{ready:true,version:VERSION,updated:saved.updated};
}
let preparing=null;
async function prepare(port){
 const cache=await caches.open(OFFLINE);await cache.delete(READY);
 let next=0,complete=0;
 async function worker(){
  while(next<RESOURCES.length){
   const resource=RESOURCES[next++];
   const response=await fetch(new Request(resource,{cache:'reload',credentials:'same-origin'}));
   const final=new URL(response.url),same=final.origin===self.location.origin&&canonical(final.pathname)===canonical(resource);
   if(!response.ok||(response.redirected&&!same))throw new Error('资源暂时无法保存，请检查网络后重试。');
   if(DOCUMENTS.includes(resource)&&!(response.headers.get('content-type')||'').includes('text/html'))throw new Error('体验资源尚未准备好，请稍后重试。');
   await cache.put(resource,storedResponse(response));
   port.postMessage({type:'PROGRESS',current:complete++,total:RESOURCES.length,path:resource});
  }
 }
 // Wait for all workers to stop before exposing failure, so a retry cannot race.
 const results=await Promise.allSettled([worker(),worker(),worker()]);
 if(results.some(result=>result.status==='rejected'))throw new Error('保存未完成，请联网后重试。');
 await cache.put(READY,new Response(JSON.stringify({version:VERSION,updated:new Date().toISOString()}),{headers:{'Content-Type':'application/json'}}));
 const result=await status();
 if(result.ready)for(const name of await caches.keys())if(name.startsWith(NAMESPACE+'-offline-')&&name!==OFFLINE)await caches.delete(name);
 return result;
}
self.addEventListener('message',event=>{
 const port=event.ports&&event.ports[0];if(!port)return;
 if(event.data?.type==='STATUS')event.waitUntil(status().then(value=>port.postMessage({type:'STATUS',...value})).catch(()=>port.postMessage({type:'STATUS',ready:false})));
 if(event.data?.type==='PREPARE_OFFLINE'){
  if(preparing){port.postMessage({type:'ERROR',message:'另一处正在准备资源，请稍后查看状态。'});return;}
  preparing=prepare(port).then(value=>port.postMessage({type:'COMPLETE',...value})).catch(()=>port.postMessage({type:'ERROR',message:'保存未完成。请保持联网并留出约 60MB 空间，再点击重试。'})).finally(()=>{preparing=null;});
  event.waitUntil(preparing);
 }
});
async function offlineDocument(path){
 const currentCache=await caches.open(OFFLINE),current=await currentCache.match(path);
 if(current&&await currentCache.match(READY))return current;
 // Keep the previous self-contained experience available until the new snapshot is saved.
 for(const name of await caches.keys())if(name===NAMESPACE||name.startsWith(NAMESPACE+'-offline-')){const cache=await caches.open(name);if(!await cache.match(READY))continue;const response=await cache.match(path);if(response)return response;}
}
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url),path=canonical(url.pathname);
 if(request.method!=='GET'||url.origin!==self.location.origin||!RESOURCES.includes(path))return;
 event.respondWith((async()=>{
  if(DOCUMENTS.includes(path)){
   try{const response=await fetch(request);if(response.ok)return response;const cached=await offlineDocument(path);return cached||response;}
   catch(error){const cached=await offlineDocument(path);if(cached)return cached;throw error;}
  }
  const snapshot=await caches.open(OFFLINE),offline=await snapshot.match(path);if(offline)return offline;
  const runtime=await caches.open(RUNTIME),cached=await runtime.match(path);if(cached)return cached;
  const response=await fetch(request);
  if(response.ok){const copy=storedResponse(response.clone());event.waitUntil(runtime.put(path,copy).catch(()=>{}));}
  return response;
 })());
});
