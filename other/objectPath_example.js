let o = {
  a : {
    b: [0,{c:'bingo'}]
  }
}

console.log(objectPath(o,'.a.b[1].c')) // returns 'bingo'
console.log(objectPath(o,'.a.x[1].c')) // returns undefined, does not throw
console.log(objectPath(o,'.a.x[1].c', true)) // throws error