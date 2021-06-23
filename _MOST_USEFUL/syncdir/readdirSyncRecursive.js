const fs = require('fs');
const dir = (d) => fs.readdirSync(d, {withFileTypes:true})
  .map(f=>f.isDirectory() ? dir(d + '/' + f.name) : d + '/' + f.name)
  .flat();

// console.log(dir('somedir'));
// can use .filter() afterwards, of course
