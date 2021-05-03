import { uid } from './uid.js';
import { state } from './data.js';

//https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase

const IDB = (function init() {
  let db = null;
  let objectStore = null;
  let DBOpenReq = indexedDB.open('WhiskeyDB', 4);

  DBOpenReq.addEventListener('error', (err) => {
    //Error occurred while trying to open DB
    console.warn(err);
  });

  DBOpenReq.addEventListener('success', (ev) => {
    //DB has been opened... after upgradeneeded
    db = ev.target.result;
    console.log('success opening DB');
    if (typeof state !== 'undefined') {
      let tx = makeTX('whiskeyStore', 'readwrite');
      tx.oncomplete = (ev) => {
        console.log('finished adding any needed data');
        buildList();
      };
      let store = tx.objectStore('whiskeyStore');
      let request = store.getAll(); // or store.count()
      // let request = store.delete .deleteIndex .clear()
      request.onsuccess = (ev) => {
        if (ev.target.result.length === 0) {
          //OR ev.target.result.length !== state.length
          state.forEach((obj) => {
            let req = store.add(obj);
            req.onsuccess = (ev) => {
              console.log('added an object');
            };
            // tx.abort() - if you want to kill your transaction
            req.onerror = (err) => {
              console.warn(err);
            };
          });
        }
      };
    } else {
      buildList();
    }
  });

  DBOpenReq.addEventListener('upgradeneeded', (ev) => {
    //first time opening this DB
    //OR a new version was passed into open()
    db = ev.target.result;
    let oldVersion = ev.oldVersion;
    let newVersion = ev.newVersion || db.version;
    console.log('DB updated from version', oldVersion, 'to', newVersion);

    // console.log('upgrade', db);
    if (db.objectStoreNames.contains('whiskeyStore')) {
      db.deleteObjectStore('whiskeyStore');
    }
    //create the ObjectStore
    objectStore = db.createObjectStore('whiskeyStore', {
      keyPath: 'id',
    });
    //add the indexes
    objectStore.createIndex('nameIDX', 'name', { unique: false });
    objectStore.createIndex('countryIDX', 'country', { unique: false });
    objectStore.createIndex('ageIDX', 'age', { unique: false });
    objectStore.createIndex('editIDX', 'lastEdit', { unique: false });
  });

  document.getElementById('btnUpdate').addEventListener('click', (ev) => {
    ev.preventDefault();

    let name = document.getElementById('name').value.trim();
    let country = document.getElementById('country').value.trim();
    let age = parseInt(document.getElementById('age').value);
    let owned = document.getElementById('isOwned').checked;
    //id
    let key = document.whiskeyForm.getAttribute('data-key');
    if (key) {
      let whiskey = {
        id: key,
        name,
        country,
        age,
        owned,
        lastEdit: Date.now(),
      };
      let tx = makeTX('whiskeyStore', 'readwrite');
      tx.oncomplete = (ev) => {
        console.log(ev);
        buildList();
        clearForm();
      };

      let store = tx.objectStore('whiskeyStore');
      let request = store.put(whiskey); //request a put/update

      request.onsuccess = (ev) => {
        console.log('successfully updated an object');
        //move on to the next request in the transaction or
        //commit the transaction
      };
      request.onerror = (err) => {
        console.log('error in request to update');
      };
    }
  });

  document.getElementById('btnDelete').addEventListener('click', (ev) => {
    ev.preventDefault();
    //id
    let key = document.whiskeyForm.getAttribute('data-key');
    if (key) {
      let tx = makeTX('whiskeyStore', 'readwrite');
      tx.oncomplete = (ev) => {
        console.log(ev);
        buildList();
        clearForm();
      };

      let store = tx.objectStore('whiskeyStore');
      let request = store.delete(key); //request a delete

      request.onsuccess = (ev) => {
        console.log('successfully deleted an object');
        //move on to the next request in the transaction or
        //commit the transaction
      };
      request.onerror = (err) => {
        console.log('error in request to delete');
      };
    }
  });

  document.getElementById('btnAdd').addEventListener('click', (ev) => {
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
      lastEdit: Date.now(),
    };

    let tx = makeTX('whiskeyStore', 'readwrite');
    tx.oncomplete = (ev) => {
      //console.log(ev);
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
    //version 1 - getAll from Store
    //let getReq = store.getAll(); //key or keyrange optional

    //version 2 - getAll with keyrange and index
    // let range = IDBKeyRange.lowerBound(14, true); //false 14 or higher... true 15 or higher
    // let range = IDBKeyRange.bound(1, 10, false, false);
    // let idx = store.index('ageIDX');
    // let getReq = idx.getAll(range);

    //version 1 AND 2 return an array
    //option can pass in a key or a keyRange
    // getReq.onsuccess = (ev) => {
    //   //getAll was successful
    //   let request = ev.target; //request === getReq === ev.target
    //   //console.log({ request });
    //   list.innerHTML = request.result
    //     .map((whiskey) => {
    //       return `<li data-key="${whiskey.id}"><span>${whiskey.name}</span> ${whiskey.age}</li>`;
    //     })
    //     .join('\n');
    // };
    // getReq.onerror = (err) => {
    //   console.warn(err);
    // };

    //version 3 - using a cursor
    let index = store.index('nameIDX');
    let range = IDBKeyRange.bound('A', 'Z', false, false); //case sensitive A-Z a-z
    list.innerHTML = '';
    //direction - next, nextunique, prev, prevunique
    index.openCursor(range, 'next').onsuccess = (ev) => {
      let cursor = ev.target.result;
      if (cursor) {
        console.log(
          cursor.source.objectStore.name,
          cursor.source.name,
          cursor.direction,
          cursor.key,
          cursor.primaryKey
        );
        let whiskey = cursor.value;
        list.innerHTML += `<li data-key="${whiskey.id}"><span>${whiskey.name}</span> ${whiskey.age}</li>`;
        cursor.continue(); //call onsuccess
      } else {
        console.log('end of cursor');
      }
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
      //put the whiskey id into a form attribute
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
    document.whiskeyForm.removeAttribute('data-key');
  }
})();
