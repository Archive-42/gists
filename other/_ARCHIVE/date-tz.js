// -- ToLocale reverse: what common date would be when it's x date in that country?
function createRemoteDate(remoteLocaleIsoString, timeZone) {
  let dHere = new Date(remoteLocaleIsoString);
  let dThere = new Date(
    new Date(remoteLocaleIsoString)
      .toLocaleString("af", { timeZone })
      .replace(" ", "T")
  );
  let diff = dHere.getTime() - dThere.getTime();
  let remoteDate = new Date(dHere.getTime() + diff);
  return remoteDate;
}

function createRemoteDate_test() {
  if (
    !(
      createRemoteDate("2020-03-28T19:00:00", "America/Lima").toLocaleString(
        "af",
        "Europe/Madrid"
      ) === "2020-03-29 01:00:00" &&
      createRemoteDate("2020-03-28T20:00:00", "America/Lima").toLocaleString(
        "af",
        "Europe/Madrid"
      ) === "2020-03-29 03:00:00" &&
      createRemoteDate("2020-03-28T21:00:00", "America/Lima").toLocaleString(
        "af",
        "Europe/Madrid"
      ) === "2020-03-29 04:00:00"
    )
  )
    throw "ERROR: createRemoteDate fails";
  console.log("createRemoteDate test: ok");
}

// --- better ToLocale
/**
 * Like ToLocaleString but returning a more useful object
 * Proper calculation of not only timeZones but also DLS
 * Quick alternative to this (get 'yyyy-mm-dd hh:mi:ss')
 * => new Date('2020-03-29T01:00').toLocaleString('af',{timeZone:'America/Lima'})
 */
const dateToLocaleObj = (dateArg, locale = "en-US", timeZone) => {
  let date = typeof dateArg === "object" ? dateArg : new Date(dateArg);

  // en-US style: mm/dd/yyyy, hh:mi
  let str = date.toLocaleString("en-US", {
    hour: "2-digit",
    hour12: false,
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone,
  });

  let weekDayNumbers = {
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
    Sun: 7,
  };

  let tmp = str
    .replace(/\s/g, "")
    .replace(/(\/|,|:)/g, "-")
    .split("-");
  // let arr = [ tmp[2], tmp[0], tmp[1], tmp[3], tmp[4], date.getMilliseconds() ];

  let obj = {
    year: tmp[2],
    month: tmp[0],
    day: tmp[1],
    hour: tmp[3],
    minutes: tmp[4],
    seconds: `${date.getSeconds()}`.padStart(2, "0"),
    milliseconds: `${date.getMilliseconds()}`.padStart(3, "0"),
    weekDay:
      weekDayNumbers[
        date.toLocaleString("en-US", { weekday: "short", timeZone })
      ],
    weekDayName: date.toLocaleString(locale, { weekday: "long", timeZone }),
    monthName: date.toLocaleString(locale, { month: "long", timeZone }),
    originalDate: date,
    transposedDate: null,
  };

  // -- transposedDate is a fake date object that will return the proper date.getHours() as if this computer were in the target timezone
  let transposedDateString = `${obj.year}-${obj.month}-${obj.day}T${obj.hour}:${obj.minutes}:${obj.seconds}.${obj.milliseconds}`; // no Z at end so it's locale

  // console.log("localeDateString", localeDateString)
  obj.transposedDate = new Date(transposedDateString);
  return obj;
};

// -- Test
function dateToLocaleObj_test() {
  let d = dateToLocaleObj("2020-06-01T01:00Z", "gl-ES", "America/Lima");

  console.log(d);
  let isoString = d.transposedDate.toISOString();
  let hours = d.transposedDate.getHours();

  console.log(isoString, hours);

  if (
    d.monthName !== "Maio" ||
    isoString !== "2020-05-31T18:00:00.000Z" ||
    hours !== 20
  ) {
    throw `Error: dateToLocaleObj fails`;
  }

  console.log("dateToLocaleObj ok");
}
