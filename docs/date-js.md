# javascript date stuff (mine field ahead)

- https://momentjs.com/guides/
- https://medium.com/[\@toastui/handling-time-zone-in-javascript-547e67aa842d]{.citation
  data-cites="toastui/handling-time-zone-in-javascript-547e67aa842d"}

## new Date()

date object of **UTC Time** (not locale!)

So .toISOString returns date in UTC time

BUT .getHours() or .setHours() do get/set **locale** time, be careful.
Can use .getUTCHours or .setUTCHours

(see dateToISOLocale function bellow for a locale .toISOString())

## Date.now() === new Date().getTime()

number of milliseconds elapsed since January 1, 1970 00:00:00 UTC.

## Unix time

number of SECONDS elapsed since January 1, 1970 00:00:00 UTC.

unixtimestamp = jsdate.getTime()/1000

## .getMonth()

0 === january

## iso vs standard date weirdness:

    > new Date('2020-03-15')    // ISO, UTC
    2020-03-15T00:00:00.000Z

    > new Date("2020-03-15T00:00")  // ISO, Locale!!!
    2020-03-14T23:00:00.000Z

    > new Date("2020-03-15T00:00Z") // ISO, UTC again!!
    2020-03-15T00:00:00.000Z

    > new Date('03/15/2020')    // Anglo (d/m/y), locale
    2020-03-14T23:00:00.000Z

    > new Date(2020,2,15)       // y,m-1,d, locale    MONTH-1!!!
    2020-03-14T23:00:00.000Z

## no problem here: locale conversion works ok even with DLS (daylight saving) changes

    // example for Spain, with DSL change between dates
    > new Date('2020-03-21T12:00:00.000Z').getHours()
    13
    > new Date('2020-04-21T12:00:00.000Z').getHours()
    14

## cool: toLocaleString & toLocaleDateString

- toLocaleDateString() converts only the date of a Date object into a
  string
- toLocaleString() converts date and time to a string

<!-- -->

    // galician, gallego, galego
    > new Date().toLocaleDateString('gl-Es',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }, {timeZone: "Europe/Madrid"})
    'domingo, 2 de febreiro de 2020'

- locale codes: https://docs.moodle.org/dev/Table\_of\_locales
- Options: https://www.w3schools.com/jsref/jsref\_tolocalestring.asp
- IANA timezone names (ignore offsets):
  https://gist.github.com/aviflax/a4093965be1cd008f172

## also, more performant than above: Intl.DateTimeFormat

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/DateTimeFormat

## npm date libraries

https://www.npmtrends.com/date-fns-vs-moment

- date-fns (more modular)
- luxon
- moment

## conclussion

Use nativa js date only for basic stuff with no timezone changes, and
only manipulating iso string

For changing timezones or precise date math accounting with daylight
saving etc, use a library
