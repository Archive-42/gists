// -- this is mostly garbage

const monthsNames = [null,'January','February','March','April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const daysNames = ['Su','Mo','Tu','We','Th', 'Fr', 'Sa', 'Su'];
const weekDay = (dateOrShortIso)=>{
  let date = typeof dateOrShortIso === 'string' ? new Date(dateOrShortIso) : dateOrShortIso;
  let dow = date.getDay();
  if (dow === 0) dow = 7;
  return dow;
}

// -- not needed: date.toLocaleString('af').replace(' ','T');
const dateToISOLocale = (date)=>{
  // ToISOString with current timezone
  let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
  let localISOTime = (new Date(date.getTime() - tzoffset)).toISOString().slice(0, -1);;
  // => '2015-01-26T06:40:36.181'
  return localISOTime;
}

// not needed see .md above about 'weirdness'
const createDateFromISOLocale = (isoStr)=>{
  isoStr = isoStr.toUpperCase();
  if (!isoStr.includes('T')) { isoStr += 'T00:00'; }
  return new Date(isoStr);
}

const dateToISOLocaleShort = (date)=>toIsoTz(date).slice(0,10);

// -- no,no,no isoshort without t is UTF, really want that?
const addDays = (strISOShort, days=1)=>{
  let date = new Date(strISOShort);
  date.setDate(date.getDate() + days)
  let ret = toIsoTzShort(date)
  return ret;
}

module.exports = {
  monthsNames, daysNames, weekDay, 
  toIsoTz, toIsoTzShort, addDays,
}