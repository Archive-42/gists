let o = { 
  a : {
    b :[0,{c:'c'}]
  },
  x : { 
    b: 'another b'
  }
}

console.log( objectWalk( o ));
// [ '.a.b', '.a.b.0', '.a.b.1', '.a.b.1.c', '.x.b' ]
console.log( objectWalk( o, p=>p.endsWith('.b') ));
// [ '.a.b', '.x.b' ]