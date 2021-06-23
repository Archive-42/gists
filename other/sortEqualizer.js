
/**
 * replaces character with its equivalent character in terms of sorting
 * defaults to spanish equalizables
 */

function sortEqualizer( str, equalizables) {
  let eqStr = str.toLowerCase()

  // defaults to spanish equalizables
  equalizables = equalizables || { ' ':'', 'á':'a', 'é':'e', 'í':'i', 'ó':'o', 'ú':'u', 'ü':'u', 'ñ':'nz', 'ç':'c' }
  
  eqStr = eqStr.replace( new RegExp(Object.keys(equalizables).join('|'),'g'), (match)=>equalizables[match] )

  return eqStr
}

// -- export
//module.exports = {sortEqualizer}
export {sortEqualizer}   // comment if used by plain nodejs