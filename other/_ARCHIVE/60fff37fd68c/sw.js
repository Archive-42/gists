const version = 1;
const preCacheName = `static-${version}`;
const precache = ["/", "/index.html"];
//if you add '/404.html' to the precache the file must exist or the install event will fail

self.addEventListener("install", (ev) => {
  //installed
  ev.waitUntil(
    caches
      .open(preCacheName)
      .then((cache) => {
        console.log("caching the static files");
        cache.addAll(precache);
      })
      .catch(console.warn)
  );
  //load pre-cache
});
self.addEventListener("activate", (ev) => {
  //activating
  ev.waitUntil(
    caches
      .keys()
      .then((keys) => {
        return Promise.all(
          keys
            .filter((key) => key !== preCacheName)
            .map((key) => caches.delete(key))
        );
      })
      .catch(console.warn)
  );
  //delete old caches
});
self.addEventListener("fetch", (ev) => {
  //fetch request received
  //send back a response from cache or fetch
  ev.respondWith(
    caches.match(ev.request).then((cacheRes) => {
      return (
        cacheRes ||
        fetch(ev.request).then(
          (response) => {
            return response;
          },
          (err) => {
            //network failure
            //send something else from the cache?
            //Video about handling cache /fetch 404 errors
            // https://www.youtube.com/watch?v=MXw4Uh7pnLI
          }
        )
      );
    })
  );
});

self.addEventListener("message", (ev) => {
  //message received
  //do things based on message props
  let data = ev.data;
  console.log("SW received", data);
});
const sendMessage = async (msg) => {
  let allClients = await clients.matchAll({ includeUncontrolled: true });
  return Promise.all(
    allClients.map((client) => {
      let channel = new MessageChannel();
      return client.postMessage(msg);
    })
  );
};
