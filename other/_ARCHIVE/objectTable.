/** 
 * Edit in: https://gist.github.com/drodsou/f987f34917799e4d906455d51068f9ba
 * Converts obj entries to table format (array of objects) and optionally filters it 
 * Kind of sql 'select' for js objects
 * @param {{}} mainObj - Any object
 * @param {({})=>boolean} filterFn - A function
 * @param {string} rowIdName - Optional string
 * @returns {[{_key:string, $otherkeys }]} - Array of filtered entries with added '_key' on each one
*/
function objectTable (mainObj, filterFn, rowIdName='_id') {
  let data = [];
  for (let entryKey of Object.keys(mainObj)) {
    if (!filterFn || filterFn(mainObj[entryKey])) { 
      data.push({[rowIdName]:entryKey, ...mainObj[entryKey]}) 
    }
  }
  return data;
}