```js
// simple list files of a folder (not recursive)
const fs = require("fs");
const path = require("path");
let filesAndDirs = fs.readdirSync(path.join(__dirname, "/"));

// subdirectories only (not recursive)
let subdirs = fs
  .readdirSync(path.join(__dirname, "/"))
  .filter((f) => fs.statSync(f).isDirectory());

// subdirectories only (node +10)
const fs = require("fs");
function getSubdirectories(baseDir) {
  return fs
    .readdirSync(baseDir, { withFileTypes: true })
    .filter((dirObj) => dirObj.isDirectory())
    .map((dirObj) => dirObj.name);
}

// with glob, directories only (normal or recursive)
const glob = require("glob"); // npm install glob
let subdirs = glob
  .sync("__dirname", { mark: true })
  .filter((f) => f.endsWith("/")); // mark adds '/' at the end of directories
```
