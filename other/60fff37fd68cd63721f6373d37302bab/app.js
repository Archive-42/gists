const APP = {
  images: ['/img/bored.gif', '/img/fail.gif', '/img/i-won.gif'],
  init() {
    //click to load random image from APP.images
    document.body.addEventListener('click', APP.loadImg);

    if ('serviceWorker' in navigator) {
      //register our service worker
      navigator.serviceWorker
        .register('/sw.js', {
          updateViaCache: 'none',
          scope: '/',
        })
        .then(() => {
          //finished registering
        })
        .catch((err) => {
          console.warn('Failed to register', err.message);
        });

      //listen for messages
      navigator.serviceWorker.addEventListener('message', ({ data }) => {
        //received a message from the service worker
        console.log(data, 'from service worker');
      });
    }
  },
  loadImg(ev) {
    let imgSRC = APP.images[Math.floor(Math.random() * APP.images.length)];
    let p = document.querySelector('.img');
    p.innerHTML = ``;
    let img = document.createElement('img');
    img.addEventListener('load', (ev) => {
      p.append(img);
    });
    img.addEventListener('error', (err) => {
      p.textContent = 'Could not load an image';
    });
    img.alt = 'random image';
    img.src = imgSRC;
    //this will trigger a fetch event in the service worker
  },
};
document.addEventListener('DOMContentLoaded', APP.init);
