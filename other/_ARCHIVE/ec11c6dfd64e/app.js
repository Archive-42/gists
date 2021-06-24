const APP = {
  SW: null,
  cacheName: "assetCache1",
  init() {
    //called after DOMContentLoaded
    // if ('serviceWorker' in navigator) {
    //   // Register a service worker hosted at the root of the
    //   // site using the default scope.
    //   navigator.serviceWorker.register('/sw.js').then(
    //     (registration) => {
    //       APP.SW =
    //         registration.installing ||
    //         registration.waiting ||
    //         registration.active;
    //     },
    //     (error) => {
    //       console.log('Service worker registration failed:', error);
    //     }
    //   );
    // } else {
    //   console.log('Service workers are not supported.');
    // }

    APP.startCaching();

    document
      .querySelector("header>h2")
      .addEventListener("click", APP.deleteCache);
  },
  startCaching() {
    //open a cache and save some responses
    return caches
      .open(APP.cacheName)
      .then((cache) => {
        console.log(`Cache ${APP.cacheName} opened`);

        let urlString = "/img/1011-800x600.jpg?id=one";
        cache.add(urlString); //add = fetch + put

        let url = new URL("http://127.0.0.1:5500/img/1011-800x600.jpg?id=two");
        cache.add(url);

        let req = new Request("/img/1011-800x600.jpg?id=three");
        cache.add(req);

        cache.keys().then((keys) => {
          keys.forEach((key, index) => {
            // console.log(index, key);
          });
        });
        return cache;
      })
      .then((cache) => {
        //check if a cache exists
        caches.has(APP.cacheName).then((hasCache) => {
          // console.log(`${APP.cacheName} ${hasCache}`);
        });

        //search for files in caches
        // cache.match() cache.matchAll()
        // caches.match() - look in all caches
        let urlString = "/img/1016-800x600.jpg";
        return caches.match(urlString).then((cacheResponse) => {
          if (
            cacheResponse &&
            cacheResponse.status < 400 &&
            cacheResponse.headers.has("content-type") &&
            cacheResponse.headers.get("content-type").match(/^image\//i)
          ) {
            //not an error if not found
            console.log("found in the cache");
            // console.log(cacheResponse);
            return cacheResponse;
          } else {
            //no match found
            console.log("not in cache");
            return fetch(urlString).then((fetchResponse) => {
              if (!fetchResponse.ok) throw fetchResponse.statusText;
              //we have a valid fetch
              cache.put(urlString, fetchResponse.clone());
              return fetchResponse;
            });
          }
        });
      })
      .then((response) => {
        console.log(response);
        document.querySelector("output").textContent = response.url;
        return response.blob();
      })
      .then((blob) => {
        let url = URL.createObjectURL(blob);
        let img = document.createElement("img");
        img.src = url;
        document.querySelector("output").append(img);
      });
  },
  deleteCache() {
    //click the h2 to delete our cache OR something in a cache
    //delete a response from the cache
    // caches.open(APP.cacheName).then((cache) => {
    //   let url = '/img/1011-800x600.jpg?id=two';
    //   cache.delete(url).then((isGone) => {
    //     console.log(isGone);
    //   });
    // });
    //delete an entire cache
    caches.delete(APP.cacheName).then((isGone) => {
      console.log(isGone);
    });
  },
};

document.addEventListener("DOMContentLoaded", APP.init);
