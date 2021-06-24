/** 
 * Returns an object with only the filtered keys of the original object
 * Warning: not cloned, keys are linked to original object
 * Kind of sql 'select' for js objects
 * @param {{}} mainObj - Any object
 * @param {({})=>boolean} filterFn - A function (mandatory)
 * @returns {[{_key:string, $otherkeys }]} - Array of filtered entries with added '_key' on each one
*/
function objectFilter (mainObj, filterFn) {
  let filteredObj = {};
  for (let entryKey of Object.keys(mainObj)) {
    if (filterFn(mainObj[entryKey])) { 
      filteredObj[entryKey] = mainObj[entryKey] 
    }
  }
  return filteredObj;
}