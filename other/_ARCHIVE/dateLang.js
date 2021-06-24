// -- Not needed anymore: this was before I learned about ToLocale wonders

/**
 * 
 * @param {*} date : js date or 'yyyy-mm-dd'
 */

function dateLang(date, lang='en', format=0) {

  // -- language
  let days, months, dateUtf
  
  // check input date format if string
  dateUtf = date
  if ( typeof date === 'string'  && date.includes ('/') ) {
    if ( ['gl','es'].includes(lang) ) {
      // asume input is dd/mm/yyyy
      dateUtf = date.split('/')[2] + '-' + date.split('/')[1] + '-' + date.split('/')[0]  
    }
    else {
      // asume input is mm/dd/yyyy
      dateUtf = date.split('/')[2] + '-' + date.split('/')[0] + '-' + date.split('/')[1]  
    }
  }

  // -- convert to date if string
  const pad0 = (n)=>('0'+n).slice(-2)
  var d = typeof dateUtf === 'string' ? new Date(dateUtf) : dateUtf

  if ( isNaN(d.getTime()) ) {
    throw new Error(`dateLang.js : passed date is not valid: ${date} (lang: ${lang})` )
  }


  // check language for day of week
  if (lang==='gl') {  // galician, galego, gallego
    days = 'domingo,luns,martes,mércores,xoves,venres,sábado'.split(',')
    months = 'xaneiro,febreiro,marzo,abril,maio,xuño,xullo,agosto,setembro,outubro,novembro,decembro'.split(',')
  }
  else if (lang==='es') { // spanish, español, castellano
    days = 'domingo,lunes,martes,miércoles,jueves,viernes,sábado'.split(',')
    months = 'enero,febrero,marzo,abril,mayo,junio,julio,agosto,septiembre,octubre,noviembre,diciembre'.split(',')
    // warning: getMonth() return value is 0-11
  }
  else if (lang==='en') { // spanish, español, castellano
    days = 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.split(',')
    months = 'January,February,March,April,June,July,August,September,October,November,December'.split(',')
    // warning: getMonth() return value is 0-11
  }
  else {
    throw new Error (`dateLang.js : not a valid language: ${lang}`)
  }

  
  // -- Output 
  let res

  if (format === 0) {
    // utf short yyyy-mm-dd
    res = d.getFullYear() + '-' + pad0(d.getMonth()+1) + '-' + pad0(d.getDate())
  }

  else if (format === 1) {
    // short
    if (['gl','es'].includes(lang)) {
      // dd/mm/yyy
      res = pad0(d.getDate()) + '/' + pad0(d.getMonth()+1) + '/' + d.getFullYear()
    } 
    else {
      // mm/dd/yyyy
      res =  pad0(d.getMonth()+1) + '/' + pad0(d.getDate()) + '/' + d.getFullYear()
    }
  } 

  else if (format === 2) {
    // long without day of week
    if (['gl','es'].includes(lang)) {
      res = d.getDate() + ' de ' + months[d.getMonth()] + ' de ' + d.getFullYear()
    }
    else {
      res = months[d.getMonth()] + d.getDate() + ', ' + d.getFullYear()
    }
  }

  else if (format === 3) {
    // long without day of week
    if (['gl','es'].includes(lang)) {
      res = days[d.getDay()] + ', ' + d.getDate() + ' de ' + months[d.getMonth()] + ' de ' + d.getFullYear()
    }
    else {
      res = days[d.getDay()] + ', ' + months[d.getMonth()] + d.getDate() + ', ' + d.getFullYear()
    }
  }

  else {
    throw new Error (`dateLang.js: invalid 'format' parameter: ${format}`)
  }

  return res
    
}

// -- export
//module.exports = {dateLang}
export {dateLang} // comment if used by plain node