const version = 2;

self.addEventListener("install", (ev) => {
  //installed
  //ev.waitUntil()
  //load pre-cache
});
self.addEventListener("activate", (ev) => {
  //activating
  // self.skipWaiting();
  //ev.waitUntil();
  //delete old caches
});
self.addEventListener("message", (ev) => {
  //message received
  //do things based on message props
  let data = ev.data;
  console.log("SW received", data);
  if ("checkOnline" in data) {
    //make a fetch call to see if we can
    let url = "/img/test.gif";
    let req = new Request(url, {
      method: "HEAD", //skip the actual image download
    });
    ev.waitUntil(
      fetch(req).then(
        (response) => {
          console.log("Able to get the test image headers");
          return sendMessage({ isOnline: true });
        },
        (err) => {
          console.log("Failed to fetch image headers");
          return sendMessage({ isOnline: false });
        }
      )
    );
  }
});
self.addEventListener("fetch", (ev) => {
  //fetch request received
  //ev.respondWith()
  //send back a response from cache or fetch
});

const sendMessage = async (msg) => {
  let allClients = await clients.matchAll({ includeUncontrolled: true });
  return Promise.all(
    allClients.map((client) => {
      let channel = new MessageChannel();
      if ("isOnline" in msg) {
        console.log("tell the browser if online");
      }
      return client.postMessage(msg);
    })
  );
};
