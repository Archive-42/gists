/*
replaces {{filename}} inside .md files in /src folder with filename content and saves .md file in similar path in /build
*/
const fs = require('fs');
const path = require('path');

let mdFiles = dirWalkSync(path.join(__dirname,'../src')).filter(f=>f.match(/\\doc\\.+\.md/));

for (let mdFile of mdFiles) {
  let tmp = mdFile.split(path.sep)// .slice(0,-1).join('\\');
  let mdFileName = tmp.pop();
  let mdFilePath = tmp.join(path.sep);
  let mdContent = fs.readFileSync(mdFile,'utf8');
  let mdVariables = mdContent.match(/({{[^}]*}})/g); 
  for (let mdVariable of mdVariables) {
    let mdVarContent = mdVariable.slice(2,-2).trim();
    console.log('•• pasa');
    let mdVarFile = path.join(mdFilePath,mdVarContent);
    let mdVarFileContent = fs.readFileSync(mdVarFile,'utf8');
    mdContent = mdContent.replace(new RegExp(mdVariable,'g'), mdVarFileContent);
  }
  let mdFilePathBuild = mdFilePath
    .replace(/\\src\\/,"\\build\\")
    .replace(/\\doc\\/,"\\");
  writeFileSyncRecursive(path.join(mdFilePathBuild,mdFileName), mdContent, 'utf8');
}

// copy or import eg:
// dirWalkSync: https://gist.github.com/drodsou/11603d87731c3b03fbb27ef7eba8aadf
// writeFileSyncRecursive: https://gist.github.com/drodsou/de2ba6291aea67ffc5bc4b52d8c32abd
