// ------- EXAMPLE
let ex =  {
  'one' :{
    value: 1,
    translation: 'uno'
  },
  'two' :{
    value: 2,
    translation: 'dos'
  },
}


console.log(objectFilter(ex, x=>true) );
// {
//   one: { value: 1, translation: 'uno' },
//   two: { value: 2, translation: 'dos' }
// }

console.log( objectFilter(ex,o=>o.value>1) );
// { two: { value: 2, translation: 'dos' } }