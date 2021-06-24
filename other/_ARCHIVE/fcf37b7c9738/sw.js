const version = 4;
let staticName = `staticCache-${version}`;
let dynamicName = `dynamicCache`;
let imageName = `imageCache-${version}`;
let options = {
  ignoreSearch: false,
  ignoreMethod: false,
  ignoreVary: false,
};
//starter html and css and js files
let assets = ["/", "/index.html", "/css/main.css", "/js/app.js", "/404.html"];
//starter images
let imageAssets = ["/img/1011-800x600.jpg", "/img/distracted-boyfriend.jpg"];

self.addEventListener("install", (ev) => {
  // service worker has been installed.
  //Extendable Event
  console.log(`Version ${version} installed`);
  // build a cache
  ev.waitUntil(
    caches
      .open(staticName)
      .then((cache) => {
        cache.addAll(assets).then(
          () => {
            //addAll == fetch() + put()
            // console.log(`${staticName} has been updated.`);
          },
          (err) => {
            console.warn(`failed to update ${staticName}.`);
          }
        );
      })
      .then(() => {
        caches.open(imageName).then((cache) => {
          cache.addAll(imageAssets).then(
            () => {
              console.log(`${imageName} has been updated.`);
            },
            (err) => {
              console.warn(`failed to update ${staticName}.`);
            }
          );
        });
      })
  );
});

self.addEventListener("activate", (ev) => {
  // when the service worker has been activated to replace an old one.
  //Extendable Event
  console.log("activated");
  // delete old versions of caches.
  ev.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => {
            if (key != staticName && key != imageName) {
              return true;
            }
          })
          .map((key) => caches.delete(key))
      ).then((empties) => {
        //empties is an Array of boolean values.
        //one for each cache deleted
      });
    })
  );
});

self.addEventListener("fetch", (ev) => {
  // Extendable Event.
  ev.respondWith(
    caches.match(ev.request).then((cacheRes) => {
      return (
        cacheRes ||
        Promise.resolve().then(() => {
          let opts = {
            mode: ev.request.mode, //cors, no-cors, same-origin, navigate
            cache: "no-cache",
          };
          if (!ev.request.url.startsWith(location.origin)) {
            //not on the same domain as my html file
            opts.mode = "cors";
            opts.credentials = "omit";
          }
          return fetch(ev.request.url, opts).then(
            (fetchResponse) => {
              //we got a response from the server.
              if (fetchResponse.ok) {
                return handleFetchResponse(fetchResponse, ev.request);
              }
              //not ok 404 error
              if (fetchResponse.status == 404) {
                if (ev.request.url.match(/\.html/i)) {
                  return caches.open(staticName).then((cache) => {
                    return cache.match("/404.html");
                  });
                }
                if (
                  ev.request.url.match(/\.jpg$/i) ||
                  ev.request.url.match(/\.png$/i)
                ) {
                  return caches.open(imageName).then((cache) => {
                    return cache.match("/img/distracted-boyfriend.jpg");
                  });
                }
              }
            },
            (err) => {
              //this is the network failure
              //return the 404.html file if it is a request for an html file
              if (ev.request.url.match(/\.html/i)) {
                return caches.open(staticName).then((cache) => {
                  return cache.match("/404.html");
                });
              }
            }
          );
        })
      );
    }) //end of match().then()
  ); //end of respondWith
}); //end of fetch listener

const handleFetchResponse = (fetchResponse, request) => {
  let type = fetchResponse.headers.get("content-type");
  // console.log('handle request for', type, request.url);
  if (type && type.match(/^image\//i)) {
    //save the image in image cache
    // console.log(`SAVE ${request.url} in image cache`);
    return caches.open(imageName).then((cache) => {
      cache.put(request, fetchResponse.clone());
      return fetchResponse;
    });
  } else {
    //save in dynamic cache - html, css, fonts, js, etc
    // console.log(`SAVE ${request.url} in dynamic cache`);
    return caches.open(dynamicName).then((cache) => {
      cache.put(request, fetchResponse.clone());
      return fetchResponse;
    });
  }
};

self.addEventListener("message", (ev) => {
  let data = ev.data;
  //console.log({ ev });
  let clientId = ev.source.id;
  // console.log('Service Worker received', data, clientId);
  if ("addPerson" in data) {
    let msg = "Thanks. Pretend I did something with the data.";
    sendMessage(
      {
        code: 0,
        message: msg,
      },
      clientId
    );
  }
  if ("otherAction" in data) {
    let msg = "Hola";
    sendMessage({
      code: 0,
      message: msg,
    });
  }
});

const sendMessage = async (msg, clientId) => {
  let allClients = [];
  if (clientId) {
    let client = await clients.get(clientId);
    allClients.push(client);
  } else {
    allClients = await clients.matchAll({ includeUncontrolled: true });
  }
  return Promise.all(
    allClients.map((client) => {
      // console.log('postMessage', msg, 'to', client.id);
      return client.postMessage(msg);
    })
  );
};
