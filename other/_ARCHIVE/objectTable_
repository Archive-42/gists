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


console.log(objectTable(ex) );
// [
//   { _id: 'one', value: 1, translation: 'uno' },
//   { _id: 'two', value: 2, translation: 'dos' }
// ]

console.log( objectTable(ex,o=>o.value>1, '_customId' ) );
// [ { _customId: 'two', value: 2, translation: 'dos' } ]