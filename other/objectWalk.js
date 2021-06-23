 /** 
   * Returns array of all object paths, optionally filtered
   * Useful to pair it with objectPath: https://gist.github.com/drodsou/201cc95272049a991e3294bd8efa173b
   * @param {{}} obj - Any object
   * @param {(path:string)=>boolean} filterFn - A function
   * @param {string} parentPath - For recursion only: accumulated key pat
   * @param {[string]} filteredPaths - For recursion only: accumulated paths array
   * @returns {[string]} - Array of filtered paths
  */
 function objectWalk (obj, filterFn, parentPath="", filteredPaths=[]) {
  for (let key of Object.keys(obj)) {
    let keyPath = parentPath + '.' + key;
    if (!filterFn || filterFn(keyPath)) { 
      filteredPaths.push(keyPath) 
    }
    if (typeof obj[key] === 'object') { 
      objectWalk(obj[key], filterFn, keyPath, filteredPaths) 
    }
  }
  return filteredPaths;
}

