/**
 * Access nested JavaScript object and arays by string path
 * Mix from: https://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-and-arays-by-string-path
 * @param {{}} obj - object
 * @param {string} keysStr - e.g 'a.b[1].c'
 * @param {boolean} doTrhow - false/undefined: does not throw on inexistent path, just returns undefined; true: throws on inexistent path
*/
function objectPath (obj, keysStr, doThrow=false) {
  keysStr = keysStr.replace(/^\./, '');           // strip leading dot if exists
  keysStr = keysStr.replace(/\[(\w+)\]/g, '.$1'); // convert [array-indexes] to .keys
  return keysStr.split('.').reduce(
    (prevObj, currKey) => doThrow ? prevObj[currKey] : prevObj && prevObj[currKey], 
    obj
  )  // throws if key
}

