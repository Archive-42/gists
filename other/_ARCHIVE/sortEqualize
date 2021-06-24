// -- comment one
const {sortEqualizer} = require('./sortEqualizer')
//import {sortEqualizer} from './sortEqualizer'

 // -- make it standalone testable win plain nodejs outside create-react-app's npm test
if (typeof it === 'undefined') global.it=global.test=(str,fn)=>{console.log('•',str);fn.then?fn.then():fn()} 

// -- tests
test('sortEqualizer works',()=>{
  let res = ['ñ','o','n','B','á'].sort( (a,b)=>sortEqualizer(a) > sortEqualizer(b) ? 1 : -1 )
  res = res.join('')
  if (res !=='áBnño') { throw '...BADLY!' }   //expect(res).toBe('áBnño')
})
