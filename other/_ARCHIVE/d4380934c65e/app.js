const APP = {
  isOnline: "onLine" in navigator && navigator.onLine,
  //attempt to set the isOnline value
  images: [
    "/img/bored.gif",
    "/img/fail.gif",
    "/img/i-won.gif",
    "/img/MiSSiNG_IMAGE.jpg",
  ],
  init() {
    //show online status somewhere
    document.querySelector(".isOnOff").textContent = APP.probably();

    //listen for online and offline
    window.addEventListener("online", APP.goneOnline);
    window.addEventListener("offline", APP.goneOffline);

    //click to load random image from APP.images
    document.body.addEventListener("click", APP.loadImg);

    if ("serviceWorker" in navigator) {
      //register our service worker
      navigator.serviceWorker
        .register("/sw.js", {
          updateViaCache: "none",
          scope: "/",
        })
        .then(() => {
          //finished registering
        })
        .catch((err) => {
          console.warn("Failed to register", err.message);
        });

      //listen for messages
      navigator.serviceWorker.addEventListener("message", ({ data }) => {
        //received a message from the service worker
        console.log(data, "from service worker");
        //do something with the response from the service worker
        if ("isOnline" in data) {
          APP.isOnline = data.isOnline;
          let span = document.querySelector(".isOnOff");
          span.textContent = APP.isOnline
            ? "Confirmed ONLINE"
            : "Confirmed OFFLINE";
          if (APP.isOnline) {
            console.log("try to load another image");
            document.body.click();
          }
        }
      });
    }
  },
  goneOnline(ev) {
    APP.isOnline = true;
    document.querySelector(".isOnOff").textContent = "ONLINE";
  },
  goneOffline(ev) {
    APP.isOffline = false;
    document.querySelector(".isOnOff").textContent = "OFFLINE";
  },
  probably() {
    return APP.isOnline ? "Probably Online" : "Probably Offline";
  },
  loadImg(ev) {
    let imgSRC = APP.images[Math.floor(Math.random() * APP.images.length)];
    let p = document.querySelector(".img");
    p.innerHTML = ``;
    let img = document.createElement("img");
    img.addEventListener("load", (ev) => {
      p.append(img);
    });
    img.addEventListener("error", (err) => {
      p.textContent = "Could not load an image";
      //use ServiceWorker to check if we are REALLY online
      navigator.serviceWorker.controller.postMessage({
        checkOnline: APP.isOnline,
      });
    });
    img.alt = "random image";
    img.src = imgSRC;
    //this will trigger a fetch event in the service worker
  },
};
document.addEventListener("DOMContentLoaded", APP.init);
