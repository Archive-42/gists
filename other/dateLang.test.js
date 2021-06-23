// -- comment one
const {dateLang} = require('./dateLang')
// import {dateLang} from './dateLang'


let date = '03/05/2018'
let result = [dateLang(date,'gl',0), dateLang(date,'gl',1),  dateLang(date,'gl',2), dateLang(date,'gl',3)].join(' | ')
let expected = '2018-05-03 | 03/05/2018 | 3 de maio de 2018 | xoves, 3 de maio de 2018'

// -- automated jest test

// make it standalone testable win plain nodejs outside create-react-app's npm test
if (typeof it === 'undefined') global.it=global.test=(str,fn)=>{console.log('•',str);fn.then?fn.then():fn()} 

test('dateLang works',()=>{
  if (result !== expected) {
    console.log('result', result)
    throw new Error('...BADLY!')
  }
})