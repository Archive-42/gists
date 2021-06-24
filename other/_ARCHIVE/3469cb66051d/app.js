const APP = {
  init() {
    //Register the custom protocol handler `web+bob`
    //Requires HTTPS in Chrome
    //http works in Firefox for localhost
    //forget about Safari...

    // `web+bob:louise` would become
    // `http://127.0.0.1:3003/character.html?char=louise`
    navigator.registerProtocolHandler(
      `web+bob`,
      `http://127.0.0.1:3003/character.html?char=%s`,
      `Title`
    );

    //check if we are on the character page and handle the link
    APP.checkCustom();
  },
  checkCustom() {
    //are we on the character page?
    if (location.pathname.indexOf('character.html') > -1) {
      //Do we have a name in the queryString
      let params = new URL(location).searchParams;
      if (params.has('char')) {
        let value = params.get('char').split('web+bob:')[1];
        console.log(value);
        let h2 = document.querySelector('header h2');
        if (h2) {
          h2.textContent = value.toUpperCase();
        }
      }
    }
  },
};
document.addEventListener('DOMContentLoaded', APP.init);
