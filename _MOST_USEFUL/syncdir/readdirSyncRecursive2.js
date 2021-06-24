/**
 * old version
 * Like readdirSync but recursive
 * opt:
 *    type:dir
 *    depth: n
 */
function readdirSyncRecursive2(folder, opt = { depth: 9999 }) {
  if (--opt.depth <= 0) return [];

  let fs = require("fs");
  let baseDir = folder.match(/\/$/) ? folder : folder + "/";
  let filesAndFolders = fs.readdirSync(baseDir).map((f) => baseDir + f);

  let files = [];
  filesAndFolders.forEach((f) => {
    if (fs.statSync(f).isDirectory()) {
      if (opt.type === "dir") files.push(f);
      files = files.concat(readdirSyncRecursive(f, Object.assign({}, opt))); // clone opt object to prevent mess
    } else {
      if (opt.type !== "dir") files.push(f);
    }
  });
  return files;
}
