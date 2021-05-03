import { uid } from './uid.js';
console.log(uid());
//nothing else to import because we are using the built in methods
//https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase

const IDB = (function init() {
  let db = null;
  let objectStore = null;
  let DBOpenReq = indexedDB.open('WhiskeyDB', 6);

  DBOpenReq.addEventListener('error', (err) => {
    //Error occurred while trying to open DB
    console.warn(err);
  });
  DBOpenReq.addEventListener('success', (ev) => {
    //DB has been opened... after upgradeneeded
    db = ev.target.result;
    console.log('success', db);
    buildList();
  });
  DBOpenReq.addEventListener('upgradeneeded', (ev) => {
    //first time opening this DB
    //OR a new version was passed into open()
    db = ev.target.result;
    let oldVersion = ev.oldVersion;
    let newVersion = ev.newVersion || db.version;
    console.log('DB updated from version', oldVersion, 'to', newVersion);

    console.log('upgrade', db);
    if (!db.objectStoreNames.contains('whiskeyStore')) {
      objectStore = db.createObjectStore('whiskeyStore', {
        keyPath: 'id',
      });
    }
  });

  document.whiskeyForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    //one of the form buttons was clicked

    let name = document.getElementById('name').value.trim();
    let country = document.getElementById('country').value.trim();
    let age = parseInt(document.getElementById('age').value);
    let owned = document.getElementById('isOwned').checked;

    let whiskey = {
      id: uid(),
      name,
      country,
      age,
      owned,
    };

    let tx = makeTX('whiskeyStore', 'readwrite');
    tx.oncomplete = (ev) => {
      console.log(ev);
      buildList();
      clearForm();
    };

    let store = tx.objectStore('whiskeyStore');
    let request = store.add(whiskey); //request an insert/add

    request.onsuccess = (ev) => {
      console.log('successfully added an object');
      //move on to the next request in the transaction or
      //commit the transaction
    };
    request.onerror = (err) => {
      console.log('error in request to add');
    };
  });

  function buildList() {
    //use getAll to get an array of objects from our store
    let list = document.querySelector('.wList');
    list.innerHTML = `<li>Loading...</li>`;
    let tx = makeTX('whiskeyStore', 'readonly');
    tx.oncomplete = (ev) => {
      //transaction for reading all objects is complete
    };
    let store = tx.objectStore('whiskeyStore');
    let getReq = store.getAll();
    //returns an array
    //option can pass in a key or a keyRange
    getReq.onsuccess = (ev) => {
      //getAll was successful
      let request = ev.target; //request === getReq === ev.target
      console.log({ request });
      list.innerHTML = request.result
        .map((whiskey) => {
          return `<li data-key="${whiskey.id}"><span>${whiskey.name}</span> ${whiskey.age}</li>`;
        })
        .join('\n');
    };
    getReq.onerror = (err) => {
      console.warn(err);
    };
  }

  document.querySelector('.wList').addEventListener('click', (ev) => {
    let li = ev.target.closest('[data-key]');
    let id = li.getAttribute('data-key');
    console.log(li, id);

    let tx = makeTX('whiskeyStore', 'readonly');
    tx.oncomplete = (ev) => {
      //get transaction complete
    };
    let store = tx.objectStore('whiskeyStore');
    let req = store.get(id);
    req.onsuccess = (ev) => {
      let request = ev.target;
      let whiskey = request.result;
      document.getElementById('name').value = whiskey.name;
      document.getElementById('country').value = whiskey.country;
      document.getElementById('age').value = whiskey.age;
      document.getElementById('isOwned').checked = whiskey.owned;
      document.whiskeyForm.setAttribute('data-key', whiskey.id);
    };
    req.onerror = (err) => {
      console.warn(err);
    };
  });

  function makeTX(storeName, mode) {
    let tx = db.transaction(storeName, mode);
    tx.onerror = (err) => {
      console.warn(err);
    };
    return tx;
  }

  document.getElementById('btnClear').addEventListener('click', clearForm);

  function clearForm(ev) {
    if (ev) ev.preventDefault();
    document.whiskeyForm.reset();
  }
})();
