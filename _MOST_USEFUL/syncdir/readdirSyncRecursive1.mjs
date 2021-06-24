const fs = require("fs");
const path = require("path");

/**
 * Also known as dirWalkSync.js
 * returns array of string paths (ls -r, dir /s)
 * includes both files an directories, these ones ending in 'path.sep'
 */
export function dirWalkSync(dir, filter, acc = []) {
  dir = Array.isArray(dir) ? path.join(...dir) : dir;

  for (let el of fs.readdirSync(dir, { withFileTypes: true })) {
    let elName = path.join(dir, el.name, el.isDirectory() ? path.sep : "");
    if (
      !filter ||
      (typeof filter === "object" && filter.test(elName)) ||
      (typeof filter === "function" && filter(elName))
    ) {
      acc.push(elName);
    }
    if (el.isDirectory()) {
      dirWalkSync(elName, filter, acc);
    }
  }
  return acc;
}
dirWalkSync.sep = path.sep; // so you dont have to import path just for this

// -- EXAMPLES
//console.log(dirWalkSync([__dirname,'.']).join('\n'))  // can pipe this in linux, e.g.
//console.log(dirWalkSync('.', /test\.js$/ ))
//console.log(dirWalkSync('.', e=>!e.match(/(\.git|node_modules)/) && e.endsWith(dirWalkSync.sep)));
