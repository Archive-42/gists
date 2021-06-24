const APP = {
  images: ["/img/bored.gif", "/img/fail.gif", "/img/i-won.gif"],
  init() {
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
      });

      //Test for SW or website...
      if ("standalone" in navigator && navigator.standalone) {
        console.log("Installed on iOS");
        document.body.classList.add("pwa");
      } else if (matchMedia("(display-mode: standalone)").matches) {
        console.log("Installed on Android or desktop");
        document.body.classList.add("pwa");
      } else {
        console.log("Launched from a browser tab");
        document.body.classList.remove("pwa");
      }
    }
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
    });
    img.alt = "random image";
    img.src = imgSRC;
    //this will trigger a fetch event in the service worker
  },
};
document.addEventListener("DOMContentLoaded", APP.init);
