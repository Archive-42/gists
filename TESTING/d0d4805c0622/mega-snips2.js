


//--------------------------------


stringPermutations('abc'); // ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']

//--------------------------------


const supportsTouchEvents = () =>
  window && 'ontouchstart' in window;

//--------------------------------


supportsTouchEvents(); // true

//--------------------------------


const swapCase = str =>
  [...str]
    .map(c => (c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase()))
    .join('');

//--------------------------------


swapCase('Hello world!'); // 'hELLO WORLD!'

//--------------------------------


const takeRightUntil = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightUntil([1, 2, 3, 4], n => n < 3); // [3, 4]

//--------------------------------


const takeRightWhile = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (!fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const takeUntil = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeUntil([1, 2, 3, 4], n => n >= 3); // [1, 2]

//--------------------------------


const takeWhile = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (!fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

//--------------------------------


const toISOStringWithTimezone = date => {
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? '+' : '-';
  const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    diff + pad(tzOffset / 60) +
    ':' + pad(tzOffset % 60);
};

//--------------------------------


toISOStringWithTimezone(new Date()); // '2020-10-06T20:43:33-04:00'

//--------------------------------


const toOrdinalSuffix = num => {
  const int = parseInt(num),
    digits = [int % 10, int % 100],
    ordinals = ['st', 'nd', 'rd', 'th'],
    oPattern = [1, 2, 3, 4],
    tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
  return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
    ? int + ordinals[digits[0] - 1]
    : int + ordinals[3];
};

//--------------------------------


toOrdinalSuffix('123'); // '123rd'

//--------------------------------


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


const HSBToRGB = (h, s, b) => {
  s /= 100;
  b /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [255 * f(5), 255 * f(3), 255 * f(1)];
};

//--------------------------------


HSBToRGB(18, 81, 99); // [252.45, 109.31084999999996, 47.965499999999984]

//--------------------------------


const HSLToRGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

//--------------------------------


HSLToRGB(13, 100, 11); // [56.1, 12.155, 0]

//--------------------------------


const RGBToHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};

//--------------------------------


RGBToHSL(45, 23, 11); // [21.17647, 60.71428, 10.98039]

//--------------------------------


const RGBToHex = (r, g, b) =>
  ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');

//--------------------------------


RGBToHex(255, 165, 1); // 'ffa501'

//--------------------------------


const UUIDGeneratorBrowser = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );

//--------------------------------


UUIDGeneratorBrowser(); // '7982fcfe-5721-4632-bede-6000885be57d'

//--------------------------------


const crypto = require('crypto');

const UUIDGeneratorNode = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
  );

//--------------------------------


UUIDGeneratorNode(); // '79c7c136-60ee-40a2-beb2-856f1feabefc'

//--------------------------------


const approximatelyEqual = (v1, v2, epsilon = 0.001) =>
  Math.abs(v1 - v2) < epsilon;

//--------------------------------


approximatelyEqual(Math.PI / 2.0, 1.5708); // true

//--------------------------------


const arithmeticProgression  = (n, lim) =>
  Array.from({ length: Math.ceil(lim / n) }, (_, i) => (i + 1) * n );

//--------------------------------


arithmeticProgression(5, 25); // [5, 10, 15, 20, 25]

//--------------------------------


const arrayToHTMLList = (arr, listID) => 
  document.querySelector(`#${listID}`).innerHTML += arr
    .map(item => `<li>${item}</li>`)
    .join('');

//--------------------------------


arrayToHTMLList(['item 1', 'item 2'], 'myListID');

//--------------------------------


const binomialCoefficient = (n, k) => {
  if (Number.isNaN(n) || Number.isNaN(k)) return NaN;
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  if (k === 1 || k === n - 1) return n;
  if (n - k < k) k = n - k;
  let res = n;
  for (let j = 2; j <= k; j++) res *= (n - j + 1) / j;
  return Math.round(res);
};

//--------------------------------


binomialCoefficient(8, 2); // 28

//--------------------------------


const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight ||
    document.documentElement.clientHeight);

//--------------------------------


bottomVisible(); // true

//--------------------------------


const bubbleSort = arr => {
  let swapped = false;
  const a = [...arr];
  for (let i = 1; i < a.length - 1; i++) {
    swapped = false;
    for (let j = 0; j < a.length - i; j++) {
      if (a[j + 1] < a[j]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    if (!swapped) return a;
  }
  return a;
};

//--------------------------------


bubbleSort([2, 1, 4, 3]); // [1, 2, 3, 4]

//--------------------------------


const bucketSort = (arr, size = 5) => {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const buckets = Array.from(
    { length: Math.floor((max - min) / size) + 1 },
    () => []
  );
  arr.forEach(val => {
    buckets[Math.floor((val - min) / size)].push(val);
  });
  return buckets.reduce((acc, b) => [...acc, ...b.sort((a, b) => a - b)], []);
};

//--------------------------------


bucketSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const capitalizeEveryWord = str =>
  str.replace(/\b[a-z]/g, char => char.toUpperCase());

//--------------------------------


capitalizeEveryWord('hello world!'); // 'Hello World!'

//--------------------------------


const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

//--------------------------------


chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

//--------------------------------


const chunkIntoN = (arr, n) => {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}

//--------------------------------


chunkIntoN([1, 2, 3, 4, 5, 6, 7], 4); // [[1, 2], [3, 4], [5, 6], [7]]

//--------------------------------


const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

//--------------------------------


copyToClipboard('Lorem ipsum'); // 'Lorem ipsum' copied to clipboard.

//--------------------------------


const countOccurrences = (arr, val) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

//--------------------------------


countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3

//--------------------------------


const dayOfYear = date =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

//--------------------------------


dayOfYear(new Date()); // 272

//--------------------------------


const daysAgo = n => {
  let d = new Date();
  d.setDate(d.getDate() - Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysAgo(20); // 2020-09-16 (if current date is 2020-10-06)

//--------------------------------


const daysFromNow = n => {
  let d = new Date();
  d.setDate(d.getDate() + Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysFromNow(5); // 2020-10-13 (if current date is 2020-10-08)

//--------------------------------


const deepFlatten = arr =>
  [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));

//--------------------------------


deepFlatten([1, [2], [[3], 4], 5]); // [1, 2, 3, 4, 5]

//--------------------------------


const defaults = (obj, ...defs) =>
  Object.assign({}, obj, ...defs.reverse(), obj);

//--------------------------------


defaults({ a: 1 }, { b: 2 }, { b: 6 }, { a: 3 }); // { a: 1, b: 2 }

//--------------------------------


const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? 'Mobile'
    : 'Desktop';

//--------------------------------


detectDeviceType(); // 'Mobile' or 'Desktop'

//--------------------------------


const detectLanguage = (defaultLang = 'en-US') => 
  navigator.language ||
  (Array.isArray(navigator.languages) && navigator.languages[0]) ||
  defaultLang;

//--------------------------------


detectLanguage(); // 'nl-NL'

//--------------------------------


const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};

//--------------------------------


difference([1, 2, 3, 3], [1, 2, 4]); // [3, 3]

//--------------------------------


const dropRightWhile = (arr, func) => {
  let rightIndex = arr.length;
  while (rightIndex-- && !func(arr[rightIndex]));
  return arr.slice(0, rightIndex + 1);
};

//--------------------------------


dropRightWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const dropWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
  return arr;
};

//--------------------------------


dropWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const factorial = n =>
  n < 0
    ? (() => {
        throw new TypeError('Negative numbers are not allowed!');
      })()
    : n <= 1
    ? 1
    : n * factorial(n - 1);

//--------------------------------


factorial(6); // 720

//--------------------------------


const fibonacci = n =>
  Array.from({ length: n }).reduce(
    (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
    []
  );

//--------------------------------


fibonacci(6); // [0, 1, 1, 2, 3, 5]

//--------------------------------


const filterNonUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) === arr.lastIndexOf(i));

//--------------------------------


filterNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1, 3, 5]

//--------------------------------


const filterUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) !== arr.lastIndexOf(i));

//--------------------------------


filterUnique([1, 2, 2, 3, 4, 4, 5]); // [2, 4]

//--------------------------------


const flattenObject = (obj, prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}.` : '';
    if (
      typeof obj[k] === 'object' &&
      obj[k] !== null &&
      Object.keys(obj[k]).length > 0
    )
      Object.assign(acc, flattenObject(obj[k], pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});

//--------------------------------


flattenObject({ a: { b: { c: 1 } }, d: 1 }); // { 'a.b.c': 1, d: 1 }

//--------------------------------


const forEachRight = (arr, callback) =>
  arr
    .slice()
    .reverse()
    .forEach(callback);

//--------------------------------


forEachRight([1, 2, 3, 4], val => console.log(val)); // '4', '3', '2', '1'

//--------------------------------


const forOwn = (obj, fn) =>
  Object.keys(obj).forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwn({ foo: 'bar', a: 1 }, v => console.log(v)); // 'bar', 1

//--------------------------------


const forOwnRight = (obj, fn) =>
  Object.keys(obj)
    .reverse()
    .forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwnRight({ foo: 'bar', a: 1 }, v => console.log(v)); // 1, 'bar'

//--------------------------------


const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24);

//--------------------------------


getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')); // 9

//--------------------------------


const getElementsBiggerThanViewport = () => {
  const docWidth = document.documentElement.offsetWidth;
  return [...document.querySelectorAll('*')].filter(
    el => el.offsetWidth > docWidth
  );
};

//--------------------------------


getElementsBiggerThanViewport(); // <div id="ultra-wide-item" />

//--------------------------------


const getMonthsDiffBetweenDates = (dateInitial, dateFinal) =>
  Math.max(
    (dateFinal.getFullYear() - dateInitial.getFullYear()) * 12 +
      dateFinal.getMonth() -
      dateInitial.getMonth(),
    0
  );

//--------------------------------


getMonthsDiffBetweenDates(new Date('2017-12-13'), new Date('2018-04-29')); // 4

//--------------------------------


const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});

//--------------------------------


getScrollPosition(); // {x: 0, y: 200}

//--------------------------------


const getSiblings = el =>
  [...el.parentNode.childNodes].filter(node => node !== el);

//--------------------------------


getSiblings(document.querySelector('head')); // ['body']

//--------------------------------


const getType = v =>
  (v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name);

//--------------------------------


getType(new Set([1, 2, 3])); // 'Set'

//--------------------------------


const getVerticalOffset = el => {
  let offset = el.offsetTop,
    _el = el;
  while (_el.offsetParent) {
    _el = _el.offsetParent;
    offset += _el.offsetTop;
  }
  return offset;
};

//--------------------------------


getVerticalOffset('.my-element'); // 120

//--------------------------------


const hammingDistance = (num1, num2) =>
  ((num1 ^ num2).toString(2).match(/1/g) || '').length;

//--------------------------------


hammingDistance(2, 3); // 1

//--------------------------------


const haveSameContents = (a, b) => {
  for (const v of new Set([...a, ...b]))
    if (a.filter(e => e === v).length !== b.filter(e => e === v).length)
      return false;
  return true;
};

//--------------------------------


haveSameContents([1, 2, 4], [2, 4, 1]); // true

//--------------------------------


const heapsort = arr => {
  const a = [...arr];
  let l = a.length;

  const heapify = (a, i) => {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let max = i;
    if (left < l && a[left] > a[max]) max = left;
    if (right < l && a[right] > a[max]) max = right;
    if (max !== i) {
      [a[max], a[i]] = [a[i], a[max]];
      heapify(a, max);
    }
  };

  for (let i = Math.floor(l / 2); i >= 0; i -= 1) heapify(a, i);
  for (i = a.length - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    l--;
    heapify(a, 0);
  }
  return a;
};

//--------------------------------


heapsort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const initialize2DArray = (w, h, val = null) =>
  Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));

//--------------------------------


initialize2DArray(2, 2, 0); // [[0, 0], [0, 0]]

//--------------------------------


const initializeArrayWithValues = (n, val = 0) =>
  Array.from({ length: n }).fill(val);

//--------------------------------


initializeArrayWithValues(5, 2); // [2, 2, 2, 2, 2]

//--------------------------------


const insertionSort = arr =>
  arr.reduce((acc, x) => {
    if (!acc.length) return [x];
    acc.some((y, j) => {
      if (x <= y) {
        acc.splice(j, 0, x);
        return true;
      }
      if (x > y && j === acc.length - 1) {
        acc.splice(j + 1, 0, x);
        return true;
      }
      return false;
    });
    return acc;
  }, []);

//--------------------------------


insertionSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const intersection = (a, b) => {
  const s = new Set(b);
  return [...new Set(a)].filter(x => s.has(x));
};

//--------------------------------


intersection([1, 2, 3], [4, 3, 2]); // [2, 3]

//--------------------------------


const isAnagram = (str1, str2) => {
  const normalize = str =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, '')
      .split('')
      .sort()
      .join('');
  return normalize(str1) === normalize(str2);
};

//--------------------------------


isAnagram('iceman', 'cinema'); // true

//--------------------------------


const isContainedIn = (a, b) => {
  for (const v of new Set(a)) {
    if (
      !b.some(e => e === v) ||
      a.filter(e => e === v).length > b.filter(e => e === v).length
    )
      return false;
  }
  return true;
};

//--------------------------------


isContainedIn([1, 4], [2, 4, 1]); // true

//--------------------------------


const isLocalStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.localStorage.setItem(key, null);
    window.localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isLocalStorageEnabled(); // true, if localStorage is accessible

//--------------------------------


const isPrime = num => {
  const boundary = Math.floor(Math.sqrt(num));
  for (let i = 2; i <= boundary; i++) if (num % i === 0) return false;
  return num >= 2;
};

//--------------------------------


isPrime(11); // true

//--------------------------------


const isSameDate = (dateA, dateB) =>
  dateA.toISOString() === dateB.toISOString();

//--------------------------------


isSameDate(new Date(2010, 10, 20), new Date(2010, 10, 20)); // true

//--------------------------------


const isSessionStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.sessionStorage.setItem(key, null);
    window.sessionStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isSessionStorageEnabled(); // true, if sessionStorage is accessible

//--------------------------------


const kMeans = (data, k = 1) => {
  const centroids = data.slice(0, k);
  const distances = Array.from({ length: data.length }, () =>
    Array.from({ length: k }, () => 0)
  );
  const classes = Array.from({ length: data.length }, () => -1);
  let itr = true;

  while (itr) {
    itr = false;

    for (let d in data) {
      for (let c = 0; c < k; c++) {
        distances[d][c] = Math.hypot(
          ...Object.keys(data[0]).map(key => data[d][key] - centroids[c][key])
        );
      }
      const m = distances[d].indexOf(Math.min(...distances[d]));
      if (classes[d] !== m) itr = true;
      classes[d] = m;
    }

    for (let c = 0; c < k; c++) {
      centroids[c] = Array.from({ length: data[0].length }, () => 0);
      const size = data.reduce((acc, _, d) => {
        if (classes[d] === c) {
          acc++;
          for (let i in data[0]) centroids[c][i] += data[d][i];
        }
        return acc;
      }, 0);
      for (let i in data[0]) {
        centroids[c][i] = parseFloat(Number(centroids[c][i] / size).toFixed(2));
      }
    }
  }

  return classes;
};

//--------------------------------


kMeans([[0, 0], [0, 1], [1, 3], [2, 0]], 2); // [0, 1, 1, 0]

//--------------------------------


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

//--------------------------------


const randomIntArrayInRange = (min, max, n = 1) =>
  Array.from(
    { length: n },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );

//--------------------------------


randomIntArrayInRange(12, 35, 10); // [ 34, 14, 27, 17, 30, 27, 20, 26, 21, 14 ]

//--------------------------------


const randomIntegerInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

//--------------------------------


randomIntegerInRange(0, 5); // 2

//--------------------------------


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

//--------------------------------



const remove = (arr, func) =>
  Array.isArray(arr)
    ? arr.filter(func).reduce((acc, val) => {
      arr.splice(arr.indexOf(val), 1);
      return acc.concat(val);
    }, [])
    : [];

//--------------------------------


remove([1, 2, 3, 4], n => n % 2 === 0); // [2, 4]

//--------------------------------


const removeAccents = str =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

//--------------------------------


removeAccents('Antoine de Saint-Exupéry'); // 'Antoine de Saint-Exupery'

//--------------------------------


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

//--------------------------------


const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

//--------------------------------


scrollToTop(); // Smooth-scrolls to the top of the page

//--------------------------------


const sdbm = str => {
  let arr = str.split('');
  return arr.reduce(
    (hashCode, currentVal) =>
      (hashCode =
        currentVal.charCodeAt(0) +
        (hashCode << 6) +
        (hashCode << 16) -
        hashCode),
    0
  );
};

//--------------------------------


sdbm('name'); // -3521204949

//--------------------------------


const selectionSort = arr => {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    const min = a
      .slice(i + 1)
      .reduce((acc, val, j) => (val < a[acc] ? j + i + 1 : acc), i);
    if (min !== i) [a[i], a[min]] = [a[min], a[i]];
  }
  return a;
};

//--------------------------------


selectionSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const serializeCookie = (name, val) =>
  `${encodeURIComponent(name)}=${encodeURIComponent(val)}`;

//--------------------------------


serializeCookie('foo', 'bar'); // 'foo=bar'

//--------------------------------


const slugify = str =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

//--------------------------------


slugify('Hello World!'); // 'hello-world'

//--------------------------------


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

//--------------------------------


const sortedIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr.findIndex(el =>
    isDescending ? val >= fn(el) : val <= fn(el)
  );
  return index === -1 ? arr.length : index;
};

//--------------------------------


sortedIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 0

//--------------------------------


const sortedLastIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr
    .reverse()
    .findIndex(el => (isDescending ? n <= el : n >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndex([10, 20, 30, 30, 40], 30); // 4

//--------------------------------


const sortedLastIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr
    .map(fn)
    .reverse()
    .findIndex(el => (isDescending ? val <= el : val >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 1

//--------------------------------


const stringPermutations = str => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str
    .split('')
    .reduce(
      (acc, letter, i) =>
        acc.concat(
          stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(
            val => letter + val
          )
        ),
      []
    );
};

//--------------------------------


stringPermutations('abc'); // ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']

//--------------------------------


const supportsTouchEvents = () =>
  window && 'ontouchstart' in window;

//--------------------------------


supportsTouchEvents(); // true

//--------------------------------


const swapCase = str =>
  [...str]
    .map(c => (c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase()))
    .join('');

//--------------------------------


swapCase('Hello world!'); // 'hELLO WORLD!'

//--------------------------------


const takeRightUntil = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightUntil([1, 2, 3, 4], n => n < 3); // [3, 4]

//--------------------------------


const takeRightWhile = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (!fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const takeUntil = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeUntil([1, 2, 3, 4], n => n >= 3); // [1, 2]

//--------------------------------


const takeWhile = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (!fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

//--------------------------------


const toISOStringWithTimezone = date => {
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? '+' : '-';
  const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    diff + pad(tzOffset / 60) +
    ':' + pad(tzOffset % 60);
};

//--------------------------------


toISOStringWithTimezone(new Date()); // '2020-10-06T20:43:33-04:00'

//--------------------------------


const toOrdinalSuffix = num => {
  const int = parseInt(num),
    digits = [int % 10, int % 100],
    ordinals = ['st', 'nd', 'rd', 'th'],
    oPattern = [1, 2, 3, 4],
    tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
  return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
    ? int + ordinals[digits[0] - 1]
    : int + ordinals[3];
};

//--------------------------------


toOrdinalSuffix('123'); // '123rd'

//--------------------------------


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


const HSBToRGB = (h, s, b) => {
  s /= 100;
  b /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [255 * f(5), 255 * f(3), 255 * f(1)];
};

//--------------------------------


HSBToRGB(18, 81, 99); // [252.45, 109.31084999999996, 47.965499999999984]

//--------------------------------


const HSLToRGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

//--------------------------------


HSLToRGB(13, 100, 11); // [56.1, 12.155, 0]

//--------------------------------


const RGBToHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};

//--------------------------------


RGBToHSL(45, 23, 11); // [21.17647, 60.71428, 10.98039]

//--------------------------------


const RGBToHex = (r, g, b) =>
  ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');

//--------------------------------


RGBToHex(255, 165, 1); // 'ffa501'

//--------------------------------


const UUIDGeneratorBrowser = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );

//--------------------------------


UUIDGeneratorBrowser(); // '7982fcfe-5721-4632-bede-6000885be57d'

//--------------------------------


const crypto = require('crypto');

const UUIDGeneratorNode = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
  );

//--------------------------------


UUIDGeneratorNode(); // '79c7c136-60ee-40a2-beb2-856f1feabefc'

//--------------------------------


const approximatelyEqual = (v1, v2, epsilon = 0.001) =>
  Math.abs(v1 - v2) < epsilon;

//--------------------------------


approximatelyEqual(Math.PI / 2.0, 1.5708); // true

//--------------------------------


const arithmeticProgression  = (n, lim) =>
  Array.from({ length: Math.ceil(lim / n) }, (_, i) => (i + 1) * n );

//--------------------------------


arithmeticProgression(5, 25); // [5, 10, 15, 20, 25]

//--------------------------------


const arrayToHTMLList = (arr, listID) => 
  document.querySelector(`#${listID}`).innerHTML += arr
    .map(item => `<li>${item}</li>`)
    .join('');

//--------------------------------


arrayToHTMLList(['item 1', 'item 2'], 'myListID');

//--------------------------------


const binomialCoefficient = (n, k) => {
  if (Number.isNaN(n) || Number.isNaN(k)) return NaN;
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  if (k === 1 || k === n - 1) return n;
  if (n - k < k) k = n - k;
  let res = n;
  for (let j = 2; j <= k; j++) res *= (n - j + 1) / j;
  return Math.round(res);
};

//--------------------------------


binomialCoefficient(8, 2); // 28

//--------------------------------


const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight ||
    document.documentElement.clientHeight);

//--------------------------------


bottomVisible(); // true

//--------------------------------


const bubbleSort = arr => {
  let swapped = false;
  const a = [...arr];
  for (let i = 1; i < a.length - 1; i++) {
    swapped = false;
    for (let j = 0; j < a.length - i; j++) {
      if (a[j + 1] < a[j]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    if (!swapped) return a;
  }
  return a;
};

//--------------------------------


bubbleSort([2, 1, 4, 3]); // [1, 2, 3, 4]

//--------------------------------


const bucketSort = (arr, size = 5) => {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const buckets = Array.from(
    { length: Math.floor((max - min) / size) + 1 },
    () => []
  );
  arr.forEach(val => {
    buckets[Math.floor((val - min) / size)].push(val);
  });
  return buckets.reduce((acc, b) => [...acc, ...b.sort((a, b) => a - b)], []);
};

//--------------------------------


bucketSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const capitalizeEveryWord = str =>
  str.replace(/\b[a-z]/g, char => char.toUpperCase());

//--------------------------------


capitalizeEveryWord('hello world!'); // 'Hello World!'

//--------------------------------


const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

//--------------------------------


chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

//--------------------------------


const chunkIntoN = (arr, n) => {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}

//--------------------------------


chunkIntoN([1, 2, 3, 4, 5, 6, 7], 4); // [[1, 2], [3, 4], [5, 6], [7]]

//--------------------------------


const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

//--------------------------------


copyToClipboard('Lorem ipsum'); // 'Lorem ipsum' copied to clipboard.

//--------------------------------


const countOccurrences = (arr, val) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

//--------------------------------


countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3

//--------------------------------


const dayOfYear = date =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

//--------------------------------


dayOfYear(new Date()); // 272

//--------------------------------


const daysAgo = n => {
  let d = new Date();
  d.setDate(d.getDate() - Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysAgo(20); // 2020-09-16 (if current date is 2020-10-06)

//--------------------------------


const daysFromNow = n => {
  let d = new Date();
  d.setDate(d.getDate() + Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysFromNow(5); // 2020-10-13 (if current date is 2020-10-08)

//--------------------------------


const deepFlatten = arr =>
  [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));

//--------------------------------


deepFlatten([1, [2], [[3], 4], 5]); // [1, 2, 3, 4, 5]

//--------------------------------


const defaults = (obj, ...defs) =>
  Object.assign({}, obj, ...defs.reverse(), obj);

//--------------------------------


defaults({ a: 1 }, { b: 2 }, { b: 6 }, { a: 3 }); // { a: 1, b: 2 }

//--------------------------------


const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? 'Mobile'
    : 'Desktop';

//--------------------------------


detectDeviceType(); // 'Mobile' or 'Desktop'

//--------------------------------


const detectLanguage = (defaultLang = 'en-US') => 
  navigator.language ||
  (Array.isArray(navigator.languages) && navigator.languages[0]) ||
  defaultLang;

//--------------------------------


detectLanguage(); // 'nl-NL'

//--------------------------------


const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};

//--------------------------------


difference([1, 2, 3, 3], [1, 2, 4]); // [3, 3]

//--------------------------------


const dropRightWhile = (arr, func) => {
  let rightIndex = arr.length;
  while (rightIndex-- && !func(arr[rightIndex]));
  return arr.slice(0, rightIndex + 1);
};

//--------------------------------


dropRightWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const dropWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
  return arr;
};

//--------------------------------


dropWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const factorial = n =>
  n < 0
    ? (() => {
        throw new TypeError('Negative numbers are not allowed!');
      })()
    : n <= 1
    ? 1
    : n * factorial(n - 1);

//--------------------------------


factorial(6); // 720

//--------------------------------


const fibonacci = n =>
  Array.from({ length: n }).reduce(
    (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
    []
  );

//--------------------------------


fibonacci(6); // [0, 1, 1, 2, 3, 5]

//--------------------------------


const filterNonUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) === arr.lastIndexOf(i));

//--------------------------------


filterNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1, 3, 5]

//--------------------------------


const filterUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) !== arr.lastIndexOf(i));

//--------------------------------


filterUnique([1, 2, 2, 3, 4, 4, 5]); // [2, 4]

//--------------------------------


const flattenObject = (obj, prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}.` : '';
    if (
      typeof obj[k] === 'object' &&
      obj[k] !== null &&
      Object.keys(obj[k]).length > 0
    )
      Object.assign(acc, flattenObject(obj[k], pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});

//--------------------------------


flattenObject({ a: { b: { c: 1 } }, d: 1 }); // { 'a.b.c': 1, d: 1 }

//--------------------------------


const forEachRight = (arr, callback) =>
  arr
    .slice()
    .reverse()
    .forEach(callback);

//--------------------------------


forEachRight([1, 2, 3, 4], val => console.log(val)); // '4', '3', '2', '1'

//--------------------------------


const forOwn = (obj, fn) =>
  Object.keys(obj).forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwn({ foo: 'bar', a: 1 }, v => console.log(v)); // 'bar', 1

//--------------------------------


const forOwnRight = (obj, fn) =>
  Object.keys(obj)
    .reverse()
    .forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwnRight({ foo: 'bar', a: 1 }, v => console.log(v)); // 1, 'bar'

//--------------------------------


const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24);

//--------------------------------


getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')); // 9

//--------------------------------


const getElementsBiggerThanViewport = () => {
  const docWidth = document.documentElement.offsetWidth;
  return [...document.querySelectorAll('*')].filter(
    el => el.offsetWidth > docWidth
  );
};

//--------------------------------


getElementsBiggerThanViewport(); // <div id="ultra-wide-item" />

//--------------------------------


const getMonthsDiffBetweenDates = (dateInitial, dateFinal) =>
  Math.max(
    (dateFinal.getFullYear() - dateInitial.getFullYear()) * 12 +
      dateFinal.getMonth() -
      dateInitial.getMonth(),
    0
  );

//--------------------------------


getMonthsDiffBetweenDates(new Date('2017-12-13'), new Date('2018-04-29')); // 4

//--------------------------------


const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});

//--------------------------------


getScrollPosition(); // {x: 0, y: 200}

//--------------------------------


const getSiblings = el =>
  [...el.parentNode.childNodes].filter(node => node !== el);

//--------------------------------


getSiblings(document.querySelector('head')); // ['body']

//--------------------------------


const getType = v =>
  (v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name);

//--------------------------------


getType(new Set([1, 2, 3])); // 'Set'

//--------------------------------


const getVerticalOffset = el => {
  let offset = el.offsetTop,
    _el = el;
  while (_el.offsetParent) {
    _el = _el.offsetParent;
    offset += _el.offsetTop;
  }
  return offset;
};

//--------------------------------


getVerticalOffset('.my-element'); // 120

//--------------------------------


const hammingDistance = (num1, num2) =>
  ((num1 ^ num2).toString(2).match(/1/g) || '').length;

//--------------------------------


hammingDistance(2, 3); // 1

//--------------------------------


const haveSameContents = (a, b) => {
  for (const v of new Set([...a, ...b]))
    if (a.filter(e => e === v).length !== b.filter(e => e === v).length)
      return false;
  return true;
};

//--------------------------------


haveSameContents([1, 2, 4], [2, 4, 1]); // true

//--------------------------------


const heapsort = arr => {
  const a = [...arr];
  let l = a.length;

  const heapify = (a, i) => {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let max = i;
    if (left < l && a[left] > a[max]) max = left;
    if (right < l && a[right] > a[max]) max = right;
    if (max !== i) {
      [a[max], a[i]] = [a[i], a[max]];
      heapify(a, max);
    }
  };

  for (let i = Math.floor(l / 2); i >= 0; i -= 1) heapify(a, i);
  for (i = a.length - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    l--;
    heapify(a, 0);
  }
  return a;
};

//--------------------------------


heapsort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const initialize2DArray = (w, h, val = null) =>
  Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));

//--------------------------------


initialize2DArray(2, 2, 0); // [[0, 0], [0, 0]]

//--------------------------------


const initializeArrayWithValues = (n, val = 0) =>
  Array.from({ length: n }).fill(val);

//--------------------------------


initializeArrayWithValues(5, 2); // [2, 2, 2, 2, 2]

//--------------------------------


const insertionSort = arr =>
  arr.reduce((acc, x) => {
    if (!acc.length) return [x];
    acc.some((y, j) => {
      if (x <= y) {
        acc.splice(j, 0, x);
        return true;
      }
      if (x > y && j === acc.length - 1) {
        acc.splice(j + 1, 0, x);
        return true;
      }
      return false;
    });
    return acc;
  }, []);

//--------------------------------


insertionSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const intersection = (a, b) => {
  const s = new Set(b);
  return [...new Set(a)].filter(x => s.has(x));
};

//--------------------------------


intersection([1, 2, 3], [4, 3, 2]); // [2, 3]

//--------------------------------


const isAnagram = (str1, str2) => {
  const normalize = str =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, '')
      .split('')
      .sort()
      .join('');
  return normalize(str1) === normalize(str2);
};

//--------------------------------


isAnagram('iceman', 'cinema'); // true

//--------------------------------


const isContainedIn = (a, b) => {
  for (const v of new Set(a)) {
    if (
      !b.some(e => e === v) ||
      a.filter(e => e === v).length > b.filter(e => e === v).length
    )
      return false;
  }
  return true;
};

//--------------------------------


isContainedIn([1, 4], [2, 4, 1]); // true

//--------------------------------


const isLocalStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.localStorage.setItem(key, null);
    window.localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isLocalStorageEnabled(); // true, if localStorage is accessible

//--------------------------------


const isPrime = num => {
  const boundary = Math.floor(Math.sqrt(num));
  for (let i = 2; i <= boundary; i++) if (num % i === 0) return false;
  return num >= 2;
};

//--------------------------------


isPrime(11); // true

//--------------------------------


const isSameDate = (dateA, dateB) =>
  dateA.toISOString() === dateB.toISOString();

//--------------------------------


isSameDate(new Date(2010, 10, 20), new Date(2010, 10, 20)); // true

//--------------------------------


const isSessionStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.sessionStorage.setItem(key, null);
    window.sessionStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isSessionStorageEnabled(); // true, if sessionStorage is accessible

//--------------------------------


const kMeans = (data, k = 1) => {
  const centroids = data.slice(0, k);
  const distances = Array.from({ length: data.length }, () =>
    Array.from({ length: k }, () => 0)
  );
  const classes = Array.from({ length: data.length }, () => -1);
  let itr = true;

  while (itr) {
    itr = false;

    for (let d in data) {
      for (let c = 0; c < k; c++) {
        distances[d][c] = Math.hypot(
          ...Object.keys(data[0]).map(key => data[d][key] - centroids[c][key])
        );
      }
      const m = distances[d].indexOf(Math.min(...distances[d]));
      if (classes[d] !== m) itr = true;
      classes[d] = m;
    }

    for (let c = 0; c < k; c++) {
      centroids[c] = Array.from({ length: data[0].length }, () => 0);
      const size = data.reduce((acc, _, d) => {
        if (classes[d] === c) {
          acc++;
          for (let i in data[0]) centroids[c][i] += data[d][i];
        }
        return acc;
      }, 0);
      for (let i in data[0]) {
        centroids[c][i] = parseFloat(Number(centroids[c][i] / size).toFixed(2));
      }
    }
  }

  return classes;
};

//--------------------------------


kMeans([[0, 0], [0, 1], [1, 3], [2, 0]], 2); // [0, 1, 1, 0]

//--------------------------------


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

//--------------------------------


const randomIntArrayInRange = (min, max, n = 1) =>
  Array.from(
    { length: n },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );

//--------------------------------


randomIntArrayInRange(12, 35, 10); // [ 34, 14, 27, 17, 30, 27, 20, 26, 21, 14 ]

//--------------------------------


const randomIntegerInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

//--------------------------------


randomIntegerInRange(0, 5); // 2

//--------------------------------


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

//--------------------------------



const remove = (arr, func) =>
  Array.isArray(arr)
    ? arr.filter(func).reduce((acc, val) => {
      arr.splice(arr.indexOf(val), 1);
      return acc.concat(val);
    }, [])
    : [];

//--------------------------------


remove([1, 2, 3, 4], n => n % 2 === 0); // [2, 4]

//--------------------------------


const removeAccents = str =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

//--------------------------------


removeAccents('Antoine de Saint-Exupéry'); // 'Antoine de Saint-Exupery'

//--------------------------------


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

//--------------------------------


const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

//--------------------------------


scrollToTop(); // Smooth-scrolls to the top of the page

//--------------------------------


const sdbm = str => {
  let arr = str.split('');
  return arr.reduce(
    (hashCode, currentVal) =>
      (hashCode =
        currentVal.charCodeAt(0) +
        (hashCode << 6) +
        (hashCode << 16) -
        hashCode),
    0
  );
};

//--------------------------------


sdbm('name'); // -3521204949

//--------------------------------


const selectionSort = arr => {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    const min = a
      .slice(i + 1)
      .reduce((acc, val, j) => (val < a[acc] ? j + i + 1 : acc), i);
    if (min !== i) [a[i], a[min]] = [a[min], a[i]];
  }
  return a;
};

//--------------------------------


selectionSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const serializeCookie = (name, val) =>
  `${encodeURIComponent(name)}=${encodeURIComponent(val)}`;

//--------------------------------


serializeCookie('foo', 'bar'); // 'foo=bar'

//--------------------------------


const slugify = str =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

//--------------------------------


slugify('Hello World!'); // 'hello-world'

//--------------------------------


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

//--------------------------------


const sortedIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr.findIndex(el =>
    isDescending ? val >= fn(el) : val <= fn(el)
  );
  return index === -1 ? arr.length : index;
};

//--------------------------------


sortedIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 0

//--------------------------------


const sortedLastIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr
    .reverse()
    .findIndex(el => (isDescending ? n <= el : n >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndex([10, 20, 30, 30, 40], 30); // 4

//--------------------------------


const sortedLastIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr
    .map(fn)
    .reverse()
    .findIndex(el => (isDescending ? val <= el : val >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 1

//--------------------------------


const stringPermutations = str => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str
    .split('')
    .reduce(
      (acc, letter, i) =>
        acc.concat(
          stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(
            val => letter + val
          )
        ),
      []
    );
};

//--------------------------------


stringPermutations('abc'); // ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']

//--------------------------------


const supportsTouchEvents = () =>
  window && 'ontouchstart' in window;

//--------------------------------


supportsTouchEvents(); // true

//--------------------------------


const swapCase = str =>
  [...str]
    .map(c => (c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase()))
    .join('');

//--------------------------------


swapCase('Hello world!'); // 'hELLO WORLD!'

//--------------------------------


const takeRightUntil = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightUntil([1, 2, 3, 4], n => n < 3); // [3, 4]

//--------------------------------


const takeRightWhile = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (!fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const takeUntil = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeUntil([1, 2, 3, 4], n => n >= 3); // [1, 2]

//--------------------------------


const takeWhile = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (!fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

//--------------------------------


const toISOStringWithTimezone = date => {
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? '+' : '-';
  const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    diff + pad(tzOffset / 60) +
    ':' + pad(tzOffset % 60);
};

//--------------------------------


toISOStringWithTimezone(new Date()); // '2020-10-06T20:43:33-04:00'

//--------------------------------


const toOrdinalSuffix = num => {
  const int = parseInt(num),
    digits = [int % 10, int % 100],
    ordinals = ['st', 'nd', 'rd', 'th'],
    oPattern = [1, 2, 3, 4],
    tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
  return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
    ? int + ordinals[digits[0] - 1]
    : int + ordinals[3];
};

//--------------------------------


toOrdinalSuffix('123'); // '123rd'

//--------------------------------


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


const HSBToRGB = (h, s, b) => {
  s /= 100;
  b /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [255 * f(5), 255 * f(3), 255 * f(1)];
};

//--------------------------------


HSBToRGB(18, 81, 99); // [252.45, 109.31084999999996, 47.965499999999984]

//--------------------------------


const HSLToRGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

//--------------------------------


HSLToRGB(13, 100, 11); // [56.1, 12.155, 0]

//--------------------------------


const RGBToHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};

//--------------------------------


RGBToHSL(45, 23, 11); // [21.17647, 60.71428, 10.98039]

//--------------------------------


const RGBToHex = (r, g, b) =>
  ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');

//--------------------------------


RGBToHex(255, 165, 1); // 'ffa501'

//--------------------------------


const UUIDGeneratorBrowser = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );

//--------------------------------


UUIDGeneratorBrowser(); // '7982fcfe-5721-4632-bede-6000885be57d'

//--------------------------------


const crypto = require('crypto');

const UUIDGeneratorNode = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
  );

//--------------------------------


UUIDGeneratorNode(); // '79c7c136-60ee-40a2-beb2-856f1feabefc'

//--------------------------------


const approximatelyEqual = (v1, v2, epsilon = 0.001) =>
  Math.abs(v1 - v2) < epsilon;

//--------------------------------


approximatelyEqual(Math.PI / 2.0, 1.5708); // true

//--------------------------------


const arithmeticProgression  = (n, lim) =>
  Array.from({ length: Math.ceil(lim / n) }, (_, i) => (i + 1) * n );

//--------------------------------


arithmeticProgression(5, 25); // [5, 10, 15, 20, 25]

//--------------------------------


const arrayToHTMLList = (arr, listID) => 
  document.querySelector(`#${listID}`).innerHTML += arr
    .map(item => `<li>${item}</li>`)
    .join('');

//--------------------------------


arrayToHTMLList(['item 1', 'item 2'], 'myListID');

//--------------------------------


const binomialCoefficient = (n, k) => {
  if (Number.isNaN(n) || Number.isNaN(k)) return NaN;
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  if (k === 1 || k === n - 1) return n;
  if (n - k < k) k = n - k;
  let res = n;
  for (let j = 2; j <= k; j++) res *= (n - j + 1) / j;
  return Math.round(res);
};

//--------------------------------


binomialCoefficient(8, 2); // 28

//--------------------------------


const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight ||
    document.documentElement.clientHeight);

//--------------------------------


bottomVisible(); // true

//--------------------------------


const bubbleSort = arr => {
  let swapped = false;
  const a = [...arr];
  for (let i = 1; i < a.length - 1; i++) {
    swapped = false;
    for (let j = 0; j < a.length - i; j++) {
      if (a[j + 1] < a[j]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    if (!swapped) return a;
  }
  return a;
};

//--------------------------------


bubbleSort([2, 1, 4, 3]); // [1, 2, 3, 4]

//--------------------------------


const bucketSort = (arr, size = 5) => {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const buckets = Array.from(
    { length: Math.floor((max - min) / size) + 1 },
    () => []
  );
  arr.forEach(val => {
    buckets[Math.floor((val - min) / size)].push(val);
  });
  return buckets.reduce((acc, b) => [...acc, ...b.sort((a, b) => a - b)], []);
};

//--------------------------------


bucketSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const capitalizeEveryWord = str =>
  str.replace(/\b[a-z]/g, char => char.toUpperCase());

//--------------------------------


capitalizeEveryWord('hello world!'); // 'Hello World!'

//--------------------------------


const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

//--------------------------------


chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

//--------------------------------


const chunkIntoN = (arr, n) => {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}

//--------------------------------


chunkIntoN([1, 2, 3, 4, 5, 6, 7], 4); // [[1, 2], [3, 4], [5, 6], [7]]

//--------------------------------


const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

//--------------------------------


copyToClipboard('Lorem ipsum'); // 'Lorem ipsum' copied to clipboard.

//--------------------------------


const countOccurrences = (arr, val) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

//--------------------------------


countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3

//--------------------------------


const dayOfYear = date =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

//--------------------------------


dayOfYear(new Date()); // 272

//--------------------------------


const daysAgo = n => {
  let d = new Date();
  d.setDate(d.getDate() - Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysAgo(20); // 2020-09-16 (if current date is 2020-10-06)

//--------------------------------


const daysFromNow = n => {
  let d = new Date();
  d.setDate(d.getDate() + Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysFromNow(5); // 2020-10-13 (if current date is 2020-10-08)

//--------------------------------


const deepFlatten = arr =>
  [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));

//--------------------------------


deepFlatten([1, [2], [[3], 4], 5]); // [1, 2, 3, 4, 5]

//--------------------------------


const defaults = (obj, ...defs) =>
  Object.assign({}, obj, ...defs.reverse(), obj);

//--------------------------------


defaults({ a: 1 }, { b: 2 }, { b: 6 }, { a: 3 }); // { a: 1, b: 2 }

//--------------------------------


const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? 'Mobile'
    : 'Desktop';

//--------------------------------


detectDeviceType(); // 'Mobile' or 'Desktop'

//--------------------------------


const detectLanguage = (defaultLang = 'en-US') => 
  navigator.language ||
  (Array.isArray(navigator.languages) && navigator.languages[0]) ||
  defaultLang;

//--------------------------------


detectLanguage(); // 'nl-NL'

//--------------------------------


const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};

//--------------------------------


difference([1, 2, 3, 3], [1, 2, 4]); // [3, 3]

//--------------------------------


const dropRightWhile = (arr, func) => {
  let rightIndex = arr.length;
  while (rightIndex-- && !func(arr[rightIndex]));
  return arr.slice(0, rightIndex + 1);
};

//--------------------------------


dropRightWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const dropWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
  return arr;
};

//--------------------------------


dropWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const factorial = n =>
  n < 0
    ? (() => {
        throw new TypeError('Negative numbers are not allowed!');
      })()
    : n <= 1
    ? 1
    : n * factorial(n - 1);

//--------------------------------


factorial(6); // 720

//--------------------------------


const fibonacci = n =>
  Array.from({ length: n }).reduce(
    (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
    []
  );

//--------------------------------


fibonacci(6); // [0, 1, 1, 2, 3, 5]

//--------------------------------


const filterNonUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) === arr.lastIndexOf(i));

//--------------------------------


filterNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1, 3, 5]

//--------------------------------


const filterUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) !== arr.lastIndexOf(i));

//--------------------------------


filterUnique([1, 2, 2, 3, 4, 4, 5]); // [2, 4]

//--------------------------------


const flattenObject = (obj, prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}.` : '';
    if (
      typeof obj[k] === 'object' &&
      obj[k] !== null &&
      Object.keys(obj[k]).length > 0
    )
      Object.assign(acc, flattenObject(obj[k], pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});

//--------------------------------


flattenObject({ a: { b: { c: 1 } }, d: 1 }); // { 'a.b.c': 1, d: 1 }

//--------------------------------


const forEachRight = (arr, callback) =>
  arr
    .slice()
    .reverse()
    .forEach(callback);

//--------------------------------


forEachRight([1, 2, 3, 4], val => console.log(val)); // '4', '3', '2', '1'

//--------------------------------


const forOwn = (obj, fn) =>
  Object.keys(obj).forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwn({ foo: 'bar', a: 1 }, v => console.log(v)); // 'bar', 1

//--------------------------------


const forOwnRight = (obj, fn) =>
  Object.keys(obj)
    .reverse()
    .forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwnRight({ foo: 'bar', a: 1 }, v => console.log(v)); // 1, 'bar'

//--------------------------------


const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24);

//--------------------------------


getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')); // 9

//--------------------------------


const getElementsBiggerThanViewport = () => {
  const docWidth = document.documentElement.offsetWidth;
  return [...document.querySelectorAll('*')].filter(
    el => el.offsetWidth > docWidth
  );
};

//--------------------------------


getElementsBiggerThanViewport(); // <div id="ultra-wide-item" />

//--------------------------------


const getMonthsDiffBetweenDates = (dateInitial, dateFinal) =>
  Math.max(
    (dateFinal.getFullYear() - dateInitial.getFullYear()) * 12 +
      dateFinal.getMonth() -
      dateInitial.getMonth(),
    0
  );

//--------------------------------


getMonthsDiffBetweenDates(new Date('2017-12-13'), new Date('2018-04-29')); // 4

//--------------------------------


const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});

//--------------------------------


getScrollPosition(); // {x: 0, y: 200}

//--------------------------------


const getSiblings = el =>
  [...el.parentNode.childNodes].filter(node => node !== el);

//--------------------------------


getSiblings(document.querySelector('head')); // ['body']

//--------------------------------


const getType = v =>
  (v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name);

//--------------------------------


getType(new Set([1, 2, 3])); // 'Set'

//--------------------------------


const getVerticalOffset = el => {
  let offset = el.offsetTop,
    _el = el;
  while (_el.offsetParent) {
    _el = _el.offsetParent;
    offset += _el.offsetTop;
  }
  return offset;
};

//--------------------------------


getVerticalOffset('.my-element'); // 120

//--------------------------------


const hammingDistance = (num1, num2) =>
  ((num1 ^ num2).toString(2).match(/1/g) || '').length;

//--------------------------------


hammingDistance(2, 3); // 1

//--------------------------------


const haveSameContents = (a, b) => {
  for (const v of new Set([...a, ...b]))
    if (a.filter(e => e === v).length !== b.filter(e => e === v).length)
      return false;
  return true;
};

//--------------------------------


haveSameContents([1, 2, 4], [2, 4, 1]); // true

//--------------------------------


const heapsort = arr => {
  const a = [...arr];
  let l = a.length;

  const heapify = (a, i) => {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let max = i;
    if (left < l && a[left] > a[max]) max = left;
    if (right < l && a[right] > a[max]) max = right;
    if (max !== i) {
      [a[max], a[i]] = [a[i], a[max]];
      heapify(a, max);
    }
  };

  for (let i = Math.floor(l / 2); i >= 0; i -= 1) heapify(a, i);
  for (i = a.length - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    l--;
    heapify(a, 0);
  }
  return a;
};

//--------------------------------


heapsort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const initialize2DArray = (w, h, val = null) =>
  Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));

//--------------------------------


initialize2DArray(2, 2, 0); // [[0, 0], [0, 0]]

//--------------------------------


const initializeArrayWithValues = (n, val = 0) =>
  Array.from({ length: n }).fill(val);

//--------------------------------


initializeArrayWithValues(5, 2); // [2, 2, 2, 2, 2]

//--------------------------------


const insertionSort = arr =>
  arr.reduce((acc, x) => {
    if (!acc.length) return [x];
    acc.some((y, j) => {
      if (x <= y) {
        acc.splice(j, 0, x);
        return true;
      }
      if (x > y && j === acc.length - 1) {
        acc.splice(j + 1, 0, x);
        return true;
      }
      return false;
    });
    return acc;
  }, []);

//--------------------------------


insertionSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const intersection = (a, b) => {
  const s = new Set(b);
  return [...new Set(a)].filter(x => s.has(x));
};

//--------------------------------


intersection([1, 2, 3], [4, 3, 2]); // [2, 3]

//--------------------------------


const isAnagram = (str1, str2) => {
  const normalize = str =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, '')
      .split('')
      .sort()
      .join('');
  return normalize(str1) === normalize(str2);
};

//--------------------------------


isAnagram('iceman', 'cinema'); // true

//--------------------------------


const isContainedIn = (a, b) => {
  for (const v of new Set(a)) {
    if (
      !b.some(e => e === v) ||
      a.filter(e => e === v).length > b.filter(e => e === v).length
    )
      return false;
  }
  return true;
};

//--------------------------------


isContainedIn([1, 4], [2, 4, 1]); // true

//--------------------------------


const isLocalStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.localStorage.setItem(key, null);
    window.localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isLocalStorageEnabled(); // true, if localStorage is accessible

//--------------------------------


const isPrime = num => {
  const boundary = Math.floor(Math.sqrt(num));
  for (let i = 2; i <= boundary; i++) if (num % i === 0) return false;
  return num >= 2;
};

//--------------------------------


isPrime(11); // true

//--------------------------------


const isSameDate = (dateA, dateB) =>
  dateA.toISOString() === dateB.toISOString();

//--------------------------------


isSameDate(new Date(2010, 10, 20), new Date(2010, 10, 20)); // true

//--------------------------------


const isSessionStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.sessionStorage.setItem(key, null);
    window.sessionStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isSessionStorageEnabled(); // true, if sessionStorage is accessible

//--------------------------------


const kMeans = (data, k = 1) => {
  const centroids = data.slice(0, k);
  const distances = Array.from({ length: data.length }, () =>
    Array.from({ length: k }, () => 0)
  );
  const classes = Array.from({ length: data.length }, () => -1);
  let itr = true;

  while (itr) {
    itr = false;

    for (let d in data) {
      for (let c = 0; c < k; c++) {
        distances[d][c] = Math.hypot(
          ...Object.keys(data[0]).map(key => data[d][key] - centroids[c][key])
        );
      }
      const m = distances[d].indexOf(Math.min(...distances[d]));
      if (classes[d] !== m) itr = true;
      classes[d] = m;
    }

    for (let c = 0; c < k; c++) {
      centroids[c] = Array.from({ length: data[0].length }, () => 0);
      const size = data.reduce((acc, _, d) => {
        if (classes[d] === c) {
          acc++;
          for (let i in data[0]) centroids[c][i] += data[d][i];
        }
        return acc;
      }, 0);
      for (let i in data[0]) {
        centroids[c][i] = parseFloat(Number(centroids[c][i] / size).toFixed(2));
      }
    }
  }

  return classes;
};

//--------------------------------


kMeans([[0, 0], [0, 1], [1, 3], [2, 0]], 2); // [0, 1, 1, 0]

//--------------------------------


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

//--------------------------------


const randomIntArrayInRange = (min, max, n = 1) =>
  Array.from(
    { length: n },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );

//--------------------------------


randomIntArrayInRange(12, 35, 10); // [ 34, 14, 27, 17, 30, 27, 20, 26, 21, 14 ]

//--------------------------------


const randomIntegerInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

//--------------------------------


randomIntegerInRange(0, 5); // 2

//--------------------------------


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

//--------------------------------



const remove = (arr, func) =>
  Array.isArray(arr)
    ? arr.filter(func).reduce((acc, val) => {
      arr.splice(arr.indexOf(val), 1);
      return acc.concat(val);
    }, [])
    : [];

//--------------------------------


remove([1, 2, 3, 4], n => n % 2 === 0); // [2, 4]

//--------------------------------


const removeAccents = str =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

//--------------------------------


removeAccents('Antoine de Saint-Exupéry'); // 'Antoine de Saint-Exupery'

//--------------------------------


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

//--------------------------------


const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

//--------------------------------


scrollToTop(); // Smooth-scrolls to the top of the page

//--------------------------------


const sdbm = str => {
  let arr = str.split('');
  return arr.reduce(
    (hashCode, currentVal) =>
      (hashCode =
        currentVal.charCodeAt(0) +
        (hashCode << 6) +
        (hashCode << 16) -
        hashCode),
    0
  );
};

//--------------------------------


sdbm('name'); // -3521204949

//--------------------------------


const selectionSort = arr => {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    const min = a
      .slice(i + 1)
      .reduce((acc, val, j) => (val < a[acc] ? j + i + 1 : acc), i);
    if (min !== i) [a[i], a[min]] = [a[min], a[i]];
  }
  return a;
};

//--------------------------------


selectionSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const serializeCookie = (name, val) =>
  `${encodeURIComponent(name)}=${encodeURIComponent(val)}`;

//--------------------------------


serializeCookie('foo', 'bar'); // 'foo=bar'

//--------------------------------


const slugify = str =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

//--------------------------------


slugify('Hello World!'); // 'hello-world'

//--------------------------------


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

//--------------------------------


const sortedIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr.findIndex(el =>
    isDescending ? val >= fn(el) : val <= fn(el)
  );
  return index === -1 ? arr.length : index;
};

//--------------------------------


sortedIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 0

//--------------------------------


const sortedLastIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr
    .reverse()
    .findIndex(el => (isDescending ? n <= el : n >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndex([10, 20, 30, 30, 40], 30); // 4

//--------------------------------


const sortedLastIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr
    .map(fn)
    .reverse()
    .findIndex(el => (isDescending ? val <= el : val >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 1

//--------------------------------


const stringPermutations = str => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str
    .split('')
    .reduce(
      (acc, letter, i) =>
        acc.concat(
          stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(
            val => letter + val
          )
        ),
      []
    );
};

//--------------------------------


stringPermutations('abc'); // ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']

//--------------------------------


const supportsTouchEvents = () =>
  window && 'ontouchstart' in window;

//--------------------------------


supportsTouchEvents(); // true

//--------------------------------


const swapCase = str =>
  [...str]
    .map(c => (c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase()))
    .join('');

//--------------------------------


swapCase('Hello world!'); // 'hELLO WORLD!'

//--------------------------------


const takeRightUntil = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightUntil([1, 2, 3, 4], n => n < 3); // [3, 4]

//--------------------------------


const takeRightWhile = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (!fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const takeUntil = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeUntil([1, 2, 3, 4], n => n >= 3); // [1, 2]

//--------------------------------


const takeWhile = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (!fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

//--------------------------------


const toISOStringWithTimezone = date => {
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? '+' : '-';
  const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    diff + pad(tzOffset / 60) +
    ':' + pad(tzOffset % 60);
};

//--------------------------------


toISOStringWithTimezone(new Date()); // '2020-10-06T20:43:33-04:00'

//--------------------------------


const toOrdinalSuffix = num => {
  const int = parseInt(num),
    digits = [int % 10, int % 100],
    ordinals = ['st', 'nd', 'rd', 'th'],
    oPattern = [1, 2, 3, 4],
    tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
  return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
    ? int + ordinals[digits[0] - 1]
    : int + ordinals[3];
};

//--------------------------------


toOrdinalSuffix('123'); // '123rd'

//--------------------------------


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


const HSBToRGB = (h, s, b) => {
  s /= 100;
  b /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [255 * f(5), 255 * f(3), 255 * f(1)];
};

//--------------------------------


HSBToRGB(18, 81, 99); // [252.45, 109.31084999999996, 47.965499999999984]

//--------------------------------


const HSLToRGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

//--------------------------------


HSLToRGB(13, 100, 11); // [56.1, 12.155, 0]

//--------------------------------


const RGBToHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};

//--------------------------------


RGBToHSL(45, 23, 11); // [21.17647, 60.71428, 10.98039]

//--------------------------------


const RGBToHex = (r, g, b) =>
  ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');

//--------------------------------


RGBToHex(255, 165, 1); // 'ffa501'

//--------------------------------


const UUIDGeneratorBrowser = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );

//--------------------------------


UUIDGeneratorBrowser(); // '7982fcfe-5721-4632-bede-6000885be57d'

//--------------------------------


const crypto = require('crypto');

const UUIDGeneratorNode = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
  );

//--------------------------------


UUIDGeneratorNode(); // '79c7c136-60ee-40a2-beb2-856f1feabefc'

//--------------------------------


const approximatelyEqual = (v1, v2, epsilon = 0.001) =>
  Math.abs(v1 - v2) < epsilon;

//--------------------------------


approximatelyEqual(Math.PI / 2.0, 1.5708); // true

//--------------------------------


const arithmeticProgression  = (n, lim) =>
  Array.from({ length: Math.ceil(lim / n) }, (_, i) => (i + 1) * n );

//--------------------------------


arithmeticProgression(5, 25); // [5, 10, 15, 20, 25]

//--------------------------------


const arrayToHTMLList = (arr, listID) => 
  document.querySelector(`#${listID}`).innerHTML += arr
    .map(item => `<li>${item}</li>`)
    .join('');

//--------------------------------


arrayToHTMLList(['item 1', 'item 2'], 'myListID');

//--------------------------------


const binomialCoefficient = (n, k) => {
  if (Number.isNaN(n) || Number.isNaN(k)) return NaN;
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  if (k === 1 || k === n - 1) return n;
  if (n - k < k) k = n - k;
  let res = n;
  for (let j = 2; j <= k; j++) res *= (n - j + 1) / j;
  return Math.round(res);
};

//--------------------------------


binomialCoefficient(8, 2); // 28

//--------------------------------


const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight ||
    document.documentElement.clientHeight);

//--------------------------------


bottomVisible(); // true

//--------------------------------


const bubbleSort = arr => {
  let swapped = false;
  const a = [...arr];
  for (let i = 1; i < a.length - 1; i++) {
    swapped = false;
    for (let j = 0; j < a.length - i; j++) {
      if (a[j + 1] < a[j]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    if (!swapped) return a;
  }
  return a;
};

//--------------------------------


bubbleSort([2, 1, 4, 3]); // [1, 2, 3, 4]

//--------------------------------


const bucketSort = (arr, size = 5) => {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const buckets = Array.from(
    { length: Math.floor((max - min) / size) + 1 },
    () => []
  );
  arr.forEach(val => {
    buckets[Math.floor((val - min) / size)].push(val);
  });
  return buckets.reduce((acc, b) => [...acc, ...b.sort((a, b) => a - b)], []);
};

//--------------------------------


bucketSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const capitalizeEveryWord = str =>
  str.replace(/\b[a-z]/g, char => char.toUpperCase());

//--------------------------------


capitalizeEveryWord('hello world!'); // 'Hello World!'

//--------------------------------


const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

//--------------------------------


chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

//--------------------------------


const chunkIntoN = (arr, n) => {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}

//--------------------------------


chunkIntoN([1, 2, 3, 4, 5, 6, 7], 4); // [[1, 2], [3, 4], [5, 6], [7]]

//--------------------------------


const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

//--------------------------------


copyToClipboard('Lorem ipsum'); // 'Lorem ipsum' copied to clipboard.

//--------------------------------


const countOccurrences = (arr, val) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

//--------------------------------


countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3

//--------------------------------


const dayOfYear = date =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

//--------------------------------


dayOfYear(new Date()); // 272

//--------------------------------


const daysAgo = n => {
  let d = new Date();
  d.setDate(d.getDate() - Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysAgo(20); // 2020-09-16 (if current date is 2020-10-06)

//--------------------------------


const daysFromNow = n => {
  let d = new Date();
  d.setDate(d.getDate() + Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysFromNow(5); // 2020-10-13 (if current date is 2020-10-08)

//--------------------------------


const deepFlatten = arr =>
  [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));

//--------------------------------


deepFlatten([1, [2], [[3], 4], 5]); // [1, 2, 3, 4, 5]

//--------------------------------


const defaults = (obj, ...defs) =>
  Object.assign({}, obj, ...defs.reverse(), obj);

//--------------------------------


defaults({ a: 1 }, { b: 2 }, { b: 6 }, { a: 3 }); // { a: 1, b: 2 }

//--------------------------------


const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? 'Mobile'
    : 'Desktop';

//--------------------------------


detectDeviceType(); // 'Mobile' or 'Desktop'

//--------------------------------


const detectLanguage = (defaultLang = 'en-US') => 
  navigator.language ||
  (Array.isArray(navigator.languages) && navigator.languages[0]) ||
  defaultLang;

//--------------------------------


detectLanguage(); // 'nl-NL'

//--------------------------------


const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};

//--------------------------------


difference([1, 2, 3, 3], [1, 2, 4]); // [3, 3]

//--------------------------------


const dropRightWhile = (arr, func) => {
  let rightIndex = arr.length;
  while (rightIndex-- && !func(arr[rightIndex]));
  return arr.slice(0, rightIndex + 1);
};

//--------------------------------


dropRightWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const dropWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
  return arr;
};

//--------------------------------


dropWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const factorial = n =>
  n < 0
    ? (() => {
        throw new TypeError('Negative numbers are not allowed!');
      })()
    : n <= 1
    ? 1
    : n * factorial(n - 1);

//--------------------------------


factorial(6); // 720

//--------------------------------


const fibonacci = n =>
  Array.from({ length: n }).reduce(
    (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
    []
  );

//--------------------------------


fibonacci(6); // [0, 1, 1, 2, 3, 5]

//--------------------------------


const filterNonUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) === arr.lastIndexOf(i));

//--------------------------------


filterNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1, 3, 5]

//--------------------------------


const filterUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) !== arr.lastIndexOf(i));

//--------------------------------


filterUnique([1, 2, 2, 3, 4, 4, 5]); // [2, 4]

//--------------------------------


const flattenObject = (obj, prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}.` : '';
    if (
      typeof obj[k] === 'object' &&
      obj[k] !== null &&
      Object.keys(obj[k]).length > 0
    )
      Object.assign(acc, flattenObject(obj[k], pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});

//--------------------------------


flattenObject({ a: { b: { c: 1 } }, d: 1 }); // { 'a.b.c': 1, d: 1 }

//--------------------------------


const forEachRight = (arr, callback) =>
  arr
    .slice()
    .reverse()
    .forEach(callback);

//--------------------------------


forEachRight([1, 2, 3, 4], val => console.log(val)); // '4', '3', '2', '1'

//--------------------------------


const forOwn = (obj, fn) =>
  Object.keys(obj).forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwn({ foo: 'bar', a: 1 }, v => console.log(v)); // 'bar', 1

//--------------------------------


const forOwnRight = (obj, fn) =>
  Object.keys(obj)
    .reverse()
    .forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwnRight({ foo: 'bar', a: 1 }, v => console.log(v)); // 1, 'bar'

//--------------------------------


const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24);

//--------------------------------


getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')); // 9

//--------------------------------


const getElementsBiggerThanViewport = () => {
  const docWidth = document.documentElement.offsetWidth;
  return [...document.querySelectorAll('*')].filter(
    el => el.offsetWidth > docWidth
  );
};

//--------------------------------


getElementsBiggerThanViewport(); // <div id="ultra-wide-item" />

//--------------------------------


const getMonthsDiffBetweenDates = (dateInitial, dateFinal) =>
  Math.max(
    (dateFinal.getFullYear() - dateInitial.getFullYear()) * 12 +
      dateFinal.getMonth() -
      dateInitial.getMonth(),
    0
  );

//--------------------------------


getMonthsDiffBetweenDates(new Date('2017-12-13'), new Date('2018-04-29')); // 4

//--------------------------------


const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});

//--------------------------------


getScrollPosition(); // {x: 0, y: 200}

//--------------------------------


const getSiblings = el =>
  [...el.parentNode.childNodes].filter(node => node !== el);

//--------------------------------


getSiblings(document.querySelector('head')); // ['body']

//--------------------------------


const getType = v =>
  (v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name);

//--------------------------------


getType(new Set([1, 2, 3])); // 'Set'

//--------------------------------


const getVerticalOffset = el => {
  let offset = el.offsetTop,
    _el = el;
  while (_el.offsetParent) {
    _el = _el.offsetParent;
    offset += _el.offsetTop;
  }
  return offset;
};

//--------------------------------


getVerticalOffset('.my-element'); // 120

//--------------------------------


const hammingDistance = (num1, num2) =>
  ((num1 ^ num2).toString(2).match(/1/g) || '').length;

//--------------------------------


hammingDistance(2, 3); // 1

//--------------------------------


const haveSameContents = (a, b) => {
  for (const v of new Set([...a, ...b]))
    if (a.filter(e => e === v).length !== b.filter(e => e === v).length)
      return false;
  return true;
};

//--------------------------------


haveSameContents([1, 2, 4], [2, 4, 1]); // true

//--------------------------------


const heapsort = arr => {
  const a = [...arr];
  let l = a.length;

  const heapify = (a, i) => {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let max = i;
    if (left < l && a[left] > a[max]) max = left;
    if (right < l && a[right] > a[max]) max = right;
    if (max !== i) {
      [a[max], a[i]] = [a[i], a[max]];
      heapify(a, max);
    }
  };

  for (let i = Math.floor(l / 2); i >= 0; i -= 1) heapify(a, i);
  for (i = a.length - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    l--;
    heapify(a, 0);
  }
  return a;
};

//--------------------------------


heapsort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const initialize2DArray = (w, h, val = null) =>
  Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));

//--------------------------------


initialize2DArray(2, 2, 0); // [[0, 0], [0, 0]]

//--------------------------------


const initializeArrayWithValues = (n, val = 0) =>
  Array.from({ length: n }).fill(val);

//--------------------------------


initializeArrayWithValues(5, 2); // [2, 2, 2, 2, 2]

//--------------------------------


const insertionSort = arr =>
  arr.reduce((acc, x) => {
    if (!acc.length) return [x];
    acc.some((y, j) => {
      if (x <= y) {
        acc.splice(j, 0, x);
        return true;
      }
      if (x > y && j === acc.length - 1) {
        acc.splice(j + 1, 0, x);
        return true;
      }
      return false;
    });
    return acc;
  }, []);

//--------------------------------


insertionSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const intersection = (a, b) => {
  const s = new Set(b);
  return [...new Set(a)].filter(x => s.has(x));
};

//--------------------------------


intersection([1, 2, 3], [4, 3, 2]); // [2, 3]

//--------------------------------


const isAnagram = (str1, str2) => {
  const normalize = str =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, '')
      .split('')
      .sort()
      .join('');
  return normalize(str1) === normalize(str2);
};

//--------------------------------


isAnagram('iceman', 'cinema'); // true

//--------------------------------


const isContainedIn = (a, b) => {
  for (const v of new Set(a)) {
    if (
      !b.some(e => e === v) ||
      a.filter(e => e === v).length > b.filter(e => e === v).length
    )
      return false;
  }
  return true;
};

//--------------------------------


isContainedIn([1, 4], [2, 4, 1]); // true

//--------------------------------


const isLocalStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.localStorage.setItem(key, null);
    window.localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isLocalStorageEnabled(); // true, if localStorage is accessible

//--------------------------------


const isPrime = num => {
  const boundary = Math.floor(Math.sqrt(num));
  for (let i = 2; i <= boundary; i++) if (num % i === 0) return false;
  return num >= 2;
};

//--------------------------------


isPrime(11); // true

//--------------------------------


const isSameDate = (dateA, dateB) =>
  dateA.toISOString() === dateB.toISOString();

//--------------------------------


isSameDate(new Date(2010, 10, 20), new Date(2010, 10, 20)); // true

//--------------------------------


const isSessionStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.sessionStorage.setItem(key, null);
    window.sessionStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isSessionStorageEnabled(); // true, if sessionStorage is accessible

//--------------------------------


const kMeans = (data, k = 1) => {
  const centroids = data.slice(0, k);
  const distances = Array.from({ length: data.length }, () =>
    Array.from({ length: k }, () => 0)
  );
  const classes = Array.from({ length: data.length }, () => -1);
  let itr = true;

  while (itr) {
    itr = false;

    for (let d in data) {
      for (let c = 0; c < k; c++) {
        distances[d][c] = Math.hypot(
          ...Object.keys(data[0]).map(key => data[d][key] - centroids[c][key])
        );
      }
      const m = distances[d].indexOf(Math.min(...distances[d]));
      if (classes[d] !== m) itr = true;
      classes[d] = m;
    }

    for (let c = 0; c < k; c++) {
      centroids[c] = Array.from({ length: data[0].length }, () => 0);
      const size = data.reduce((acc, _, d) => {
        if (classes[d] === c) {
          acc++;
          for (let i in data[0]) centroids[c][i] += data[d][i];
        }
        return acc;
      }, 0);
      for (let i in data[0]) {
        centroids[c][i] = parseFloat(Number(centroids[c][i] / size).toFixed(2));
      }
    }
  }

  return classes;
};

//--------------------------------


kMeans([[0, 0], [0, 1], [1, 3], [2, 0]], 2); // [0, 1, 1, 0]

//--------------------------------


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

//--------------------------------


const randomIntArrayInRange = (min, max, n = 1) =>
  Array.from(
    { length: n },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );

//--------------------------------


randomIntArrayInRange(12, 35, 10); // [ 34, 14, 27, 17, 30, 27, 20, 26, 21, 14 ]

//--------------------------------


const randomIntegerInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

//--------------------------------


randomIntegerInRange(0, 5); // 2

//--------------------------------


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

//--------------------------------



const remove = (arr, func) =>
  Array.isArray(arr)
    ? arr.filter(func).reduce((acc, val) => {
      arr.splice(arr.indexOf(val), 1);
      return acc.concat(val);
    }, [])
    : [];

//--------------------------------


remove([1, 2, 3, 4], n => n % 2 === 0); // [2, 4]

//--------------------------------


const removeAccents = str =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

//--------------------------------


removeAccents('Antoine de Saint-Exupéry'); // 'Antoine de Saint-Exupery'

//--------------------------------


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

//--------------------------------


const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

//--------------------------------


scrollToTop(); // Smooth-scrolls to the top of the page

//--------------------------------


const sdbm = str => {
  let arr = str.split('');
  return arr.reduce(
    (hashCode, currentVal) =>
      (hashCode =
        currentVal.charCodeAt(0) +
        (hashCode << 6) +
        (hashCode << 16) -
        hashCode),
    0
  );
};

//--------------------------------


sdbm('name'); // -3521204949

//--------------------------------


const selectionSort = arr => {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    const min = a
      .slice(i + 1)
      .reduce((acc, val, j) => (val < a[acc] ? j + i + 1 : acc), i);
    if (min !== i) [a[i], a[min]] = [a[min], a[i]];
  }
  return a;
};

//--------------------------------


selectionSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const serializeCookie = (name, val) =>
  `${encodeURIComponent(name)}=${encodeURIComponent(val)}`;

//--------------------------------


serializeCookie('foo', 'bar'); // 'foo=bar'

//--------------------------------


const slugify = str =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

//--------------------------------


slugify('Hello World!'); // 'hello-world'

//--------------------------------


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

//--------------------------------


const sortedIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr.findIndex(el =>
    isDescending ? val >= fn(el) : val <= fn(el)
  );
  return index === -1 ? arr.length : index;
};

//--------------------------------


sortedIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 0

//--------------------------------


const sortedLastIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr
    .reverse()
    .findIndex(el => (isDescending ? n <= el : n >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndex([10, 20, 30, 30, 40], 30); // 4

//--------------------------------


const sortedLastIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr
    .map(fn)
    .reverse()
    .findIndex(el => (isDescending ? val <= el : val >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 1

//--------------------------------


const stringPermutations = str => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str
    .split('')
    .reduce(
      (acc, letter, i) =>
        acc.concat(
          stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(
            val => letter + val
          )
        ),
      []
    );
};

//--------------------------------


stringPermutations('abc'); // ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']

//--------------------------------


const supportsTouchEvents = () =>
  window && 'ontouchstart' in window;

//--------------------------------


supportsTouchEvents(); // true

//--------------------------------


const swapCase = str =>
  [...str]
    .map(c => (c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase()))
    .join('');

//--------------------------------


swapCase('Hello world!'); // 'hELLO WORLD!'

//--------------------------------


const takeRightUntil = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightUntil([1, 2, 3, 4], n => n < 3); // [3, 4]

//--------------------------------


const takeRightWhile = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (!fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const takeUntil = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeUntil([1, 2, 3, 4], n => n >= 3); // [1, 2]

//--------------------------------


const takeWhile = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (!fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

//--------------------------------


const toISOStringWithTimezone = date => {
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? '+' : '-';
  const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    diff + pad(tzOffset / 60) +
    ':' + pad(tzOffset % 60);
};

//--------------------------------


toISOStringWithTimezone(new Date()); // '2020-10-06T20:43:33-04:00'

//--------------------------------


const toOrdinalSuffix = num => {
  const int = parseInt(num),
    digits = [int % 10, int % 100],
    ordinals = ['st', 'nd', 'rd', 'th'],
    oPattern = [1, 2, 3, 4],
    tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
  return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
    ? int + ordinals[digits[0] - 1]
    : int + ordinals[3];
};

//--------------------------------


toOrdinalSuffix('123'); // '123rd'

//--------------------------------


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


const HSBToRGB = (h, s, b) => {
  s /= 100;
  b /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [255 * f(5), 255 * f(3), 255 * f(1)];
};

//--------------------------------


HSBToRGB(18, 81, 99); // [252.45, 109.31084999999996, 47.965499999999984]

//--------------------------------


const HSLToRGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

//--------------------------------


HSLToRGB(13, 100, 11); // [56.1, 12.155, 0]

//--------------------------------


const RGBToHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};

//--------------------------------


RGBToHSL(45, 23, 11); // [21.17647, 60.71428, 10.98039]

//--------------------------------


const RGBToHex = (r, g, b) =>
  ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');

//--------------------------------


RGBToHex(255, 165, 1); // 'ffa501'

//--------------------------------


const UUIDGeneratorBrowser = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );

//--------------------------------


UUIDGeneratorBrowser(); // '7982fcfe-5721-4632-bede-6000885be57d'

//--------------------------------


const crypto = require('crypto');

const UUIDGeneratorNode = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
  );

//--------------------------------


UUIDGeneratorNode(); // '79c7c136-60ee-40a2-beb2-856f1feabefc'

//--------------------------------


const approximatelyEqual = (v1, v2, epsilon = 0.001) =>
  Math.abs(v1 - v2) < epsilon;

//--------------------------------


approximatelyEqual(Math.PI / 2.0, 1.5708); // true

//--------------------------------


const arithmeticProgression  = (n, lim) =>
  Array.from({ length: Math.ceil(lim / n) }, (_, i) => (i + 1) * n );

//--------------------------------


arithmeticProgression(5, 25); // [5, 10, 15, 20, 25]

//--------------------------------


const arrayToHTMLList = (arr, listID) => 
  document.querySelector(`#${listID}`).innerHTML += arr
    .map(item => `<li>${item}</li>`)
    .join('');

//--------------------------------


arrayToHTMLList(['item 1', 'item 2'], 'myListID');

//--------------------------------


const binomialCoefficient = (n, k) => {
  if (Number.isNaN(n) || Number.isNaN(k)) return NaN;
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  if (k === 1 || k === n - 1) return n;
  if (n - k < k) k = n - k;
  let res = n;
  for (let j = 2; j <= k; j++) res *= (n - j + 1) / j;
  return Math.round(res);
};

//--------------------------------


binomialCoefficient(8, 2); // 28

//--------------------------------


const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight ||
    document.documentElement.clientHeight);

//--------------------------------


bottomVisible(); // true

//--------------------------------


const bubbleSort = arr => {
  let swapped = false;
  const a = [...arr];
  for (let i = 1; i < a.length - 1; i++) {
    swapped = false;
    for (let j = 0; j < a.length - i; j++) {
      if (a[j + 1] < a[j]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    if (!swapped) return a;
  }
  return a;
};

//--------------------------------


bubbleSort([2, 1, 4, 3]); // [1, 2, 3, 4]

//--------------------------------


const bucketSort = (arr, size = 5) => {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const buckets = Array.from(
    { length: Math.floor((max - min) / size) + 1 },
    () => []
  );
  arr.forEach(val => {
    buckets[Math.floor((val - min) / size)].push(val);
  });
  return buckets.reduce((acc, b) => [...acc, ...b.sort((a, b) => a - b)], []);
};

//--------------------------------


bucketSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const capitalizeEveryWord = str =>
  str.replace(/\b[a-z]/g, char => char.toUpperCase());

//--------------------------------


capitalizeEveryWord('hello world!'); // 'Hello World!'

//--------------------------------


const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

//--------------------------------


chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

//--------------------------------


const chunkIntoN = (arr, n) => {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}

//--------------------------------


chunkIntoN([1, 2, 3, 4, 5, 6, 7], 4); // [[1, 2], [3, 4], [5, 6], [7]]

//--------------------------------


const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

//--------------------------------


copyToClipboard('Lorem ipsum'); // 'Lorem ipsum' copied to clipboard.

//--------------------------------


const countOccurrences = (arr, val) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

//--------------------------------


countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3

//--------------------------------


const dayOfYear = date =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

//--------------------------------


dayOfYear(new Date()); // 272

//--------------------------------


const daysAgo = n => {
  let d = new Date();
  d.setDate(d.getDate() - Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysAgo(20); // 2020-09-16 (if current date is 2020-10-06)

//--------------------------------


const daysFromNow = n => {
  let d = new Date();
  d.setDate(d.getDate() + Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysFromNow(5); // 2020-10-13 (if current date is 2020-10-08)

//--------------------------------


const deepFlatten = arr =>
  [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));

//--------------------------------


deepFlatten([1, [2], [[3], 4], 5]); // [1, 2, 3, 4, 5]

//--------------------------------


const defaults = (obj, ...defs) =>
  Object.assign({}, obj, ...defs.reverse(), obj);

//--------------------------------


defaults({ a: 1 }, { b: 2 }, { b: 6 }, { a: 3 }); // { a: 1, b: 2 }

//--------------------------------


const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? 'Mobile'
    : 'Desktop';

//--------------------------------


detectDeviceType(); // 'Mobile' or 'Desktop'

//--------------------------------


const detectLanguage = (defaultLang = 'en-US') => 
  navigator.language ||
  (Array.isArray(navigator.languages) && navigator.languages[0]) ||
  defaultLang;

//--------------------------------


detectLanguage(); // 'nl-NL'

//--------------------------------


const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};

//--------------------------------


difference([1, 2, 3, 3], [1, 2, 4]); // [3, 3]

//--------------------------------


const dropRightWhile = (arr, func) => {
  let rightIndex = arr.length;
  while (rightIndex-- && !func(arr[rightIndex]));
  return arr.slice(0, rightIndex + 1);
};

//--------------------------------


dropRightWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const dropWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
  return arr;
};

//--------------------------------


dropWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const factorial = n =>
  n < 0
    ? (() => {
        throw new TypeError('Negative numbers are not allowed!');
      })()
    : n <= 1
    ? 1
    : n * factorial(n - 1);

//--------------------------------


factorial(6); // 720

//--------------------------------


const fibonacci = n =>
  Array.from({ length: n }).reduce(
    (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
    []
  );

//--------------------------------


fibonacci(6); // [0, 1, 1, 2, 3, 5]

//--------------------------------


const filterNonUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) === arr.lastIndexOf(i));

//--------------------------------


filterNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1, 3, 5]

//--------------------------------


const filterUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) !== arr.lastIndexOf(i));

//--------------------------------


filterUnique([1, 2, 2, 3, 4, 4, 5]); // [2, 4]

//--------------------------------


const flattenObject = (obj, prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}.` : '';
    if (
      typeof obj[k] === 'object' &&
      obj[k] !== null &&
      Object.keys(obj[k]).length > 0
    )
      Object.assign(acc, flattenObject(obj[k], pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});

//--------------------------------


flattenObject({ a: { b: { c: 1 } }, d: 1 }); // { 'a.b.c': 1, d: 1 }

//--------------------------------


const forEachRight = (arr, callback) =>
  arr
    .slice()
    .reverse()
    .forEach(callback);

//--------------------------------


forEachRight([1, 2, 3, 4], val => console.log(val)); // '4', '3', '2', '1'

//--------------------------------


const forOwn = (obj, fn) =>
  Object.keys(obj).forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwn({ foo: 'bar', a: 1 }, v => console.log(v)); // 'bar', 1

//--------------------------------


const forOwnRight = (obj, fn) =>
  Object.keys(obj)
    .reverse()
    .forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwnRight({ foo: 'bar', a: 1 }, v => console.log(v)); // 1, 'bar'

//--------------------------------


const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24);

//--------------------------------


getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')); // 9

//--------------------------------


const getElementsBiggerThanViewport = () => {
  const docWidth = document.documentElement.offsetWidth;
  return [...document.querySelectorAll('*')].filter(
    el => el.offsetWidth > docWidth
  );
};

//--------------------------------


getElementsBiggerThanViewport(); // <div id="ultra-wide-item" />

//--------------------------------


const getMonthsDiffBetweenDates = (dateInitial, dateFinal) =>
  Math.max(
    (dateFinal.getFullYear() - dateInitial.getFullYear()) * 12 +
      dateFinal.getMonth() -
      dateInitial.getMonth(),
    0
  );

//--------------------------------


getMonthsDiffBetweenDates(new Date('2017-12-13'), new Date('2018-04-29')); // 4

//--------------------------------


const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});

//--------------------------------


getScrollPosition(); // {x: 0, y: 200}

//--------------------------------


const getSiblings = el =>
  [...el.parentNode.childNodes].filter(node => node !== el);

//--------------------------------


getSiblings(document.querySelector('head')); // ['body']

//--------------------------------


const getType = v =>
  (v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name);

//--------------------------------


getType(new Set([1, 2, 3])); // 'Set'

//--------------------------------


const getVerticalOffset = el => {
  let offset = el.offsetTop,
    _el = el;
  while (_el.offsetParent) {
    _el = _el.offsetParent;
    offset += _el.offsetTop;
  }
  return offset;
};

//--------------------------------


getVerticalOffset('.my-element'); // 120

//--------------------------------


const hammingDistance = (num1, num2) =>
  ((num1 ^ num2).toString(2).match(/1/g) || '').length;

//--------------------------------


hammingDistance(2, 3); // 1

//--------------------------------


const haveSameContents = (a, b) => {
  for (const v of new Set([...a, ...b]))
    if (a.filter(e => e === v).length !== b.filter(e => e === v).length)
      return false;
  return true;
};

//--------------------------------


haveSameContents([1, 2, 4], [2, 4, 1]); // true

//--------------------------------


const heapsort = arr => {
  const a = [...arr];
  let l = a.length;

  const heapify = (a, i) => {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let max = i;
    if (left < l && a[left] > a[max]) max = left;
    if (right < l && a[right] > a[max]) max = right;
    if (max !== i) {
      [a[max], a[i]] = [a[i], a[max]];
      heapify(a, max);
    }
  };

  for (let i = Math.floor(l / 2); i >= 0; i -= 1) heapify(a, i);
  for (i = a.length - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    l--;
    heapify(a, 0);
  }
  return a;
};

//--------------------------------


heapsort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const initialize2DArray = (w, h, val = null) =>
  Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));

//--------------------------------


initialize2DArray(2, 2, 0); // [[0, 0], [0, 0]]

//--------------------------------


const initializeArrayWithValues = (n, val = 0) =>
  Array.from({ length: n }).fill(val);

//--------------------------------


initializeArrayWithValues(5, 2); // [2, 2, 2, 2, 2]

//--------------------------------


const insertionSort = arr =>
  arr.reduce((acc, x) => {
    if (!acc.length) return [x];
    acc.some((y, j) => {
      if (x <= y) {
        acc.splice(j, 0, x);
        return true;
      }
      if (x > y && j === acc.length - 1) {
        acc.splice(j + 1, 0, x);
        return true;
      }
      return false;
    });
    return acc;
  }, []);

//--------------------------------


insertionSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const intersection = (a, b) => {
  const s = new Set(b);
  return [...new Set(a)].filter(x => s.has(x));
};

//--------------------------------


intersection([1, 2, 3], [4, 3, 2]); // [2, 3]

//--------------------------------


const isAnagram = (str1, str2) => {
  const normalize = str =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, '')
      .split('')
      .sort()
      .join('');
  return normalize(str1) === normalize(str2);
};

//--------------------------------


isAnagram('iceman', 'cinema'); // true

//--------------------------------


const isContainedIn = (a, b) => {
  for (const v of new Set(a)) {
    if (
      !b.some(e => e === v) ||
      a.filter(e => e === v).length > b.filter(e => e === v).length
    )
      return false;
  }
  return true;
};

//--------------------------------


isContainedIn([1, 4], [2, 4, 1]); // true

//--------------------------------


const isLocalStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.localStorage.setItem(key, null);
    window.localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isLocalStorageEnabled(); // true, if localStorage is accessible

//--------------------------------


const isPrime = num => {
  const boundary = Math.floor(Math.sqrt(num));
  for (let i = 2; i <= boundary; i++) if (num % i === 0) return false;
  return num >= 2;
};

//--------------------------------


isPrime(11); // true

//--------------------------------


const isSameDate = (dateA, dateB) =>
  dateA.toISOString() === dateB.toISOString();

//--------------------------------


isSameDate(new Date(2010, 10, 20), new Date(2010, 10, 20)); // true

//--------------------------------


const isSessionStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.sessionStorage.setItem(key, null);
    window.sessionStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isSessionStorageEnabled(); // true, if sessionStorage is accessible

//--------------------------------


const kMeans = (data, k = 1) => {
  const centroids = data.slice(0, k);
  const distances = Array.from({ length: data.length }, () =>
    Array.from({ length: k }, () => 0)
  );
  const classes = Array.from({ length: data.length }, () => -1);
  let itr = true;

  while (itr) {
    itr = false;

    for (let d in data) {
      for (let c = 0; c < k; c++) {
        distances[d][c] = Math.hypot(
          ...Object.keys(data[0]).map(key => data[d][key] - centroids[c][key])
        );
      }
      const m = distances[d].indexOf(Math.min(...distances[d]));
      if (classes[d] !== m) itr = true;
      classes[d] = m;
    }

    for (let c = 0; c < k; c++) {
      centroids[c] = Array.from({ length: data[0].length }, () => 0);
      const size = data.reduce((acc, _, d) => {
        if (classes[d] === c) {
          acc++;
          for (let i in data[0]) centroids[c][i] += data[d][i];
        }
        return acc;
      }, 0);
      for (let i in data[0]) {
        centroids[c][i] = parseFloat(Number(centroids[c][i] / size).toFixed(2));
      }
    }
  }

  return classes;
};

//--------------------------------


kMeans([[0, 0], [0, 1], [1, 3], [2, 0]], 2); // [0, 1, 1, 0]

//--------------------------------


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

//--------------------------------


const randomIntArrayInRange = (min, max, n = 1) =>
  Array.from(
    { length: n },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );

//--------------------------------


randomIntArrayInRange(12, 35, 10); // [ 34, 14, 27, 17, 30, 27, 20, 26, 21, 14 ]

//--------------------------------


const randomIntegerInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

//--------------------------------


randomIntegerInRange(0, 5); // 2

//--------------------------------


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

//--------------------------------



const remove = (arr, func) =>
  Array.isArray(arr)
    ? arr.filter(func).reduce((acc, val) => {
      arr.splice(arr.indexOf(val), 1);
      return acc.concat(val);
    }, [])
    : [];

//--------------------------------


remove([1, 2, 3, 4], n => n % 2 === 0); // [2, 4]

//--------------------------------


const removeAccents = str =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

//--------------------------------


removeAccents('Antoine de Saint-Exupéry'); // 'Antoine de Saint-Exupery'

//--------------------------------


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

//--------------------------------


const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

//--------------------------------


scrollToTop(); // Smooth-scrolls to the top of the page

//--------------------------------


const sdbm = str => {
  let arr = str.split('');
  return arr.reduce(
    (hashCode, currentVal) =>
      (hashCode =
        currentVal.charCodeAt(0) +
        (hashCode << 6) +
        (hashCode << 16) -
        hashCode),
    0
  );
};

//--------------------------------


sdbm('name'); // -3521204949

//--------------------------------


const selectionSort = arr => {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    const min = a
      .slice(i + 1)
      .reduce((acc, val, j) => (val < a[acc] ? j + i + 1 : acc), i);
    if (min !== i) [a[i], a[min]] = [a[min], a[i]];
  }
  return a;
};

//--------------------------------


selectionSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const serializeCookie = (name, val) =>
  `${encodeURIComponent(name)}=${encodeURIComponent(val)}`;

//--------------------------------


serializeCookie('foo', 'bar'); // 'foo=bar'

//--------------------------------


const slugify = str =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

//--------------------------------


slugify('Hello World!'); // 'hello-world'

//--------------------------------


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

//--------------------------------


const sortedIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr.findIndex(el =>
    isDescending ? val >= fn(el) : val <= fn(el)
  );
  return index === -1 ? arr.length : index;
};

//--------------------------------


sortedIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 0

//--------------------------------


const sortedLastIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr
    .reverse()
    .findIndex(el => (isDescending ? n <= el : n >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndex([10, 20, 30, 30, 40], 30); // 4

//--------------------------------


const sortedLastIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr
    .map(fn)
    .reverse()
    .findIndex(el => (isDescending ? val <= el : val >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 1

//--------------------------------


const stringPermutations = str => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str
    .split('')
    .reduce(
      (acc, letter, i) =>
        acc.concat(
          stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(
            val => letter + val
          )
        ),
      []
    );
};

//--------------------------------


stringPermutations('abc'); // ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']

//--------------------------------


const supportsTouchEvents = () =>
  window && 'ontouchstart' in window;

//--------------------------------


supportsTouchEvents(); // true

//--------------------------------


const swapCase = str =>
  [...str]
    .map(c => (c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase()))
    .join('');

//--------------------------------


swapCase('Hello world!'); // 'hELLO WORLD!'

//--------------------------------


const takeRightUntil = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightUntil([1, 2, 3, 4], n => n < 3); // [3, 4]

//--------------------------------


const takeRightWhile = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (!fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const takeUntil = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeUntil([1, 2, 3, 4], n => n >= 3); // [1, 2]

//--------------------------------


const takeWhile = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (!fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

//--------------------------------


const toISOStringWithTimezone = date => {
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? '+' : '-';
  const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    diff + pad(tzOffset / 60) +
    ':' + pad(tzOffset % 60);
};

//--------------------------------


toISOStringWithTimezone(new Date()); // '2020-10-06T20:43:33-04:00'

//--------------------------------


const toOrdinalSuffix = num => {
  const int = parseInt(num),
    digits = [int % 10, int % 100],
    ordinals = ['st', 'nd', 'rd', 'th'],
    oPattern = [1, 2, 3, 4],
    tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
  return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
    ? int + ordinals[digits[0] - 1]
    : int + ordinals[3];
};

//--------------------------------


toOrdinalSuffix('123'); // '123rd'

//--------------------------------


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


const HSBToRGB = (h, s, b) => {
  s /= 100;
  b /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [255 * f(5), 255 * f(3), 255 * f(1)];
};

//--------------------------------


HSBToRGB(18, 81, 99); // [252.45, 109.31084999999996, 47.965499999999984]

//--------------------------------


const HSLToRGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

//--------------------------------


HSLToRGB(13, 100, 11); // [56.1, 12.155, 0]

//--------------------------------


const RGBToHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};

//--------------------------------


RGBToHSL(45, 23, 11); // [21.17647, 60.71428, 10.98039]

//--------------------------------


const RGBToHex = (r, g, b) =>
  ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');

//--------------------------------


RGBToHex(255, 165, 1); // 'ffa501'

//--------------------------------


const UUIDGeneratorBrowser = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );

//--------------------------------


UUIDGeneratorBrowser(); // '7982fcfe-5721-4632-bede-6000885be57d'

//--------------------------------


const crypto = require('crypto');

const UUIDGeneratorNode = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
  );

//--------------------------------


UUIDGeneratorNode(); // '79c7c136-60ee-40a2-beb2-856f1feabefc'

//--------------------------------


const approximatelyEqual = (v1, v2, epsilon = 0.001) =>
  Math.abs(v1 - v2) < epsilon;

//--------------------------------


approximatelyEqual(Math.PI / 2.0, 1.5708); // true

//--------------------------------


const arithmeticProgression  = (n, lim) =>
  Array.from({ length: Math.ceil(lim / n) }, (_, i) => (i + 1) * n );

//--------------------------------


arithmeticProgression(5, 25); // [5, 10, 15, 20, 25]

//--------------------------------


const arrayToHTMLList = (arr, listID) => 
  document.querySelector(`#${listID}`).innerHTML += arr
    .map(item => `<li>${item}</li>`)
    .join('');

//--------------------------------


arrayToHTMLList(['item 1', 'item 2'], 'myListID');

//--------------------------------


const binomialCoefficient = (n, k) => {
  if (Number.isNaN(n) || Number.isNaN(k)) return NaN;
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  if (k === 1 || k === n - 1) return n;
  if (n - k < k) k = n - k;
  let res = n;
  for (let j = 2; j <= k; j++) res *= (n - j + 1) / j;
  return Math.round(res);
};

//--------------------------------


binomialCoefficient(8, 2); // 28

//--------------------------------


const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight ||
    document.documentElement.clientHeight);

//--------------------------------


bottomVisible(); // true

//--------------------------------


const bubbleSort = arr => {
  let swapped = false;
  const a = [...arr];
  for (let i = 1; i < a.length - 1; i++) {
    swapped = false;
    for (let j = 0; j < a.length - i; j++) {
      if (a[j + 1] < a[j]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    if (!swapped) return a;
  }
  return a;
};

//--------------------------------


bubbleSort([2, 1, 4, 3]); // [1, 2, 3, 4]

//--------------------------------


const bucketSort = (arr, size = 5) => {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const buckets = Array.from(
    { length: Math.floor((max - min) / size) + 1 },
    () => []
  );
  arr.forEach(val => {
    buckets[Math.floor((val - min) / size)].push(val);
  });
  return buckets.reduce((acc, b) => [...acc, ...b.sort((a, b) => a - b)], []);
};

//--------------------------------


bucketSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const capitalizeEveryWord = str =>
  str.replace(/\b[a-z]/g, char => char.toUpperCase());

//--------------------------------


capitalizeEveryWord('hello world!'); // 'Hello World!'

//--------------------------------


const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

//--------------------------------


chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

//--------------------------------


const chunkIntoN = (arr, n) => {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}

//--------------------------------


chunkIntoN([1, 2, 3, 4, 5, 6, 7], 4); // [[1, 2], [3, 4], [5, 6], [7]]

//--------------------------------


const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

//--------------------------------


copyToClipboard('Lorem ipsum'); // 'Lorem ipsum' copied to clipboard.

//--------------------------------


const countOccurrences = (arr, val) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

//--------------------------------


countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3

//--------------------------------


const dayOfYear = date =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

//--------------------------------


dayOfYear(new Date()); // 272

//--------------------------------


const daysAgo = n => {
  let d = new Date();
  d.setDate(d.getDate() - Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysAgo(20); // 2020-09-16 (if current date is 2020-10-06)

//--------------------------------


const daysFromNow = n => {
  let d = new Date();
  d.setDate(d.getDate() + Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysFromNow(5); // 2020-10-13 (if current date is 2020-10-08)

//--------------------------------


const deepFlatten = arr =>
  [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));

//--------------------------------


deepFlatten([1, [2], [[3], 4], 5]); // [1, 2, 3, 4, 5]

//--------------------------------


const defaults = (obj, ...defs) =>
  Object.assign({}, obj, ...defs.reverse(), obj);

//--------------------------------


defaults({ a: 1 }, { b: 2 }, { b: 6 }, { a: 3 }); // { a: 1, b: 2 }

//--------------------------------


const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? 'Mobile'
    : 'Desktop';

//--------------------------------


detectDeviceType(); // 'Mobile' or 'Desktop'

//--------------------------------


const detectLanguage = (defaultLang = 'en-US') => 
  navigator.language ||
  (Array.isArray(navigator.languages) && navigator.languages[0]) ||
  defaultLang;

//--------------------------------


detectLanguage(); // 'nl-NL'

//--------------------------------


const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};

//--------------------------------


difference([1, 2, 3, 3], [1, 2, 4]); // [3, 3]

//--------------------------------


const dropRightWhile = (arr, func) => {
  let rightIndex = arr.length;
  while (rightIndex-- && !func(arr[rightIndex]));
  return arr.slice(0, rightIndex + 1);
};

//--------------------------------


dropRightWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const dropWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
  return arr;
};

//--------------------------------


dropWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const factorial = n =>
  n < 0
    ? (() => {
        throw new TypeError('Negative numbers are not allowed!');
      })()
    : n <= 1
    ? 1
    : n * factorial(n - 1);

//--------------------------------


factorial(6); // 720

//--------------------------------


const fibonacci = n =>
  Array.from({ length: n }).reduce(
    (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
    []
  );

//--------------------------------


fibonacci(6); // [0, 1, 1, 2, 3, 5]

//--------------------------------


const filterNonUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) === arr.lastIndexOf(i));

//--------------------------------


filterNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1, 3, 5]

//--------------------------------


const filterUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) !== arr.lastIndexOf(i));

//--------------------------------


filterUnique([1, 2, 2, 3, 4, 4, 5]); // [2, 4]

//--------------------------------


const flattenObject = (obj, prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}.` : '';
    if (
      typeof obj[k] === 'object' &&
      obj[k] !== null &&
      Object.keys(obj[k]).length > 0
    )
      Object.assign(acc, flattenObject(obj[k], pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});

//--------------------------------


flattenObject({ a: { b: { c: 1 } }, d: 1 }); // { 'a.b.c': 1, d: 1 }

//--------------------------------


const forEachRight = (arr, callback) =>
  arr
    .slice()
    .reverse()
    .forEach(callback);

//--------------------------------


forEachRight([1, 2, 3, 4], val => console.log(val)); // '4', '3', '2', '1'

//--------------------------------


const forOwn = (obj, fn) =>
  Object.keys(obj).forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwn({ foo: 'bar', a: 1 }, v => console.log(v)); // 'bar', 1

//--------------------------------


const forOwnRight = (obj, fn) =>
  Object.keys(obj)
    .reverse()
    .forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwnRight({ foo: 'bar', a: 1 }, v => console.log(v)); // 1, 'bar'

//--------------------------------


const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24);

//--------------------------------


getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')); // 9

//--------------------------------


const getElementsBiggerThanViewport = () => {
  const docWidth = document.documentElement.offsetWidth;
  return [...document.querySelectorAll('*')].filter(
    el => el.offsetWidth > docWidth
  );
};

//--------------------------------


getElementsBiggerThanViewport(); // <div id="ultra-wide-item" />

//--------------------------------


const getMonthsDiffBetweenDates = (dateInitial, dateFinal) =>
  Math.max(
    (dateFinal.getFullYear() - dateInitial.getFullYear()) * 12 +
      dateFinal.getMonth() -
      dateInitial.getMonth(),
    0
  );

//--------------------------------


getMonthsDiffBetweenDates(new Date('2017-12-13'), new Date('2018-04-29')); // 4

//--------------------------------


const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});

//--------------------------------


getScrollPosition(); // {x: 0, y: 200}

//--------------------------------


const getSiblings = el =>
  [...el.parentNode.childNodes].filter(node => node !== el);

//--------------------------------


getSiblings(document.querySelector('head')); // ['body']

//--------------------------------


const getType = v =>
  (v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name);

//--------------------------------


getType(new Set([1, 2, 3])); // 'Set'

//--------------------------------


const getVerticalOffset = el => {
  let offset = el.offsetTop,
    _el = el;
  while (_el.offsetParent) {
    _el = _el.offsetParent;
    offset += _el.offsetTop;
  }
  return offset;
};

//--------------------------------


getVerticalOffset('.my-element'); // 120

//--------------------------------


const hammingDistance = (num1, num2) =>
  ((num1 ^ num2).toString(2).match(/1/g) || '').length;

//--------------------------------


hammingDistance(2, 3); // 1

//--------------------------------


const haveSameContents = (a, b) => {
  for (const v of new Set([...a, ...b]))
    if (a.filter(e => e === v).length !== b.filter(e => e === v).length)
      return false;
  return true;
};

//--------------------------------


haveSameContents([1, 2, 4], [2, 4, 1]); // true

//--------------------------------


const heapsort = arr => {
  const a = [...arr];
  let l = a.length;

  const heapify = (a, i) => {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let max = i;
    if (left < l && a[left] > a[max]) max = left;
    if (right < l && a[right] > a[max]) max = right;
    if (max !== i) {
      [a[max], a[i]] = [a[i], a[max]];
      heapify(a, max);
    }
  };

  for (let i = Math.floor(l / 2); i >= 0; i -= 1) heapify(a, i);
  for (i = a.length - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    l--;
    heapify(a, 0);
  }
  return a;
};

//--------------------------------


heapsort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const initialize2DArray = (w, h, val = null) =>
  Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));

//--------------------------------


initialize2DArray(2, 2, 0); // [[0, 0], [0, 0]]

//--------------------------------


const initializeArrayWithValues = (n, val = 0) =>
  Array.from({ length: n }).fill(val);

//--------------------------------


initializeArrayWithValues(5, 2); // [2, 2, 2, 2, 2]

//--------------------------------


const insertionSort = arr =>
  arr.reduce((acc, x) => {
    if (!acc.length) return [x];
    acc.some((y, j) => {
      if (x <= y) {
        acc.splice(j, 0, x);
        return true;
      }
      if (x > y && j === acc.length - 1) {
        acc.splice(j + 1, 0, x);
        return true;
      }
      return false;
    });
    return acc;
  }, []);

//--------------------------------


insertionSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const intersection = (a, b) => {
  const s = new Set(b);
  return [...new Set(a)].filter(x => s.has(x));
};

//--------------------------------


intersection([1, 2, 3], [4, 3, 2]); // [2, 3]

//--------------------------------


const isAnagram = (str1, str2) => {
  const normalize = str =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, '')
      .split('')
      .sort()
      .join('');
  return normalize(str1) === normalize(str2);
};

//--------------------------------


isAnagram('iceman', 'cinema'); // true

//--------------------------------


const isContainedIn = (a, b) => {
  for (const v of new Set(a)) {
    if (
      !b.some(e => e === v) ||
      a.filter(e => e === v).length > b.filter(e => e === v).length
    )
      return false;
  }
  return true;
};

//--------------------------------


isContainedIn([1, 4], [2, 4, 1]); // true

//--------------------------------


const isLocalStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.localStorage.setItem(key, null);
    window.localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isLocalStorageEnabled(); // true, if localStorage is accessible

//--------------------------------


const isPrime = num => {
  const boundary = Math.floor(Math.sqrt(num));
  for (let i = 2; i <= boundary; i++) if (num % i === 0) return false;
  return num >= 2;
};

//--------------------------------


isPrime(11); // true

//--------------------------------


const isSameDate = (dateA, dateB) =>
  dateA.toISOString() === dateB.toISOString();

//--------------------------------


isSameDate(new Date(2010, 10, 20), new Date(2010, 10, 20)); // true

//--------------------------------


const isSessionStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.sessionStorage.setItem(key, null);
    window.sessionStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isSessionStorageEnabled(); // true, if sessionStorage is accessible

//--------------------------------


const kMeans = (data, k = 1) => {
  const centroids = data.slice(0, k);
  const distances = Array.from({ length: data.length }, () =>
    Array.from({ length: k }, () => 0)
  );
  const classes = Array.from({ length: data.length }, () => -1);
  let itr = true;

  while (itr) {
    itr = false;

    for (let d in data) {
      for (let c = 0; c < k; c++) {
        distances[d][c] = Math.hypot(
          ...Object.keys(data[0]).map(key => data[d][key] - centroids[c][key])
        );
      }
      const m = distances[d].indexOf(Math.min(...distances[d]));
      if (classes[d] !== m) itr = true;
      classes[d] = m;
    }

    for (let c = 0; c < k; c++) {
      centroids[c] = Array.from({ length: data[0].length }, () => 0);
      const size = data.reduce((acc, _, d) => {
        if (classes[d] === c) {
          acc++;
          for (let i in data[0]) centroids[c][i] += data[d][i];
        }
        return acc;
      }, 0);
      for (let i in data[0]) {
        centroids[c][i] = parseFloat(Number(centroids[c][i] / size).toFixed(2));
      }
    }
  }

  return classes;
};

//--------------------------------


kMeans([[0, 0], [0, 1], [1, 3], [2, 0]], 2); // [0, 1, 1, 0]

//--------------------------------


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

//--------------------------------


const randomIntArrayInRange = (min, max, n = 1) =>
  Array.from(
    { length: n },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );

//--------------------------------


randomIntArrayInRange(12, 35, 10); // [ 34, 14, 27, 17, 30, 27, 20, 26, 21, 14 ]

//--------------------------------


const randomIntegerInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

//--------------------------------


randomIntegerInRange(0, 5); // 2

//--------------------------------


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

//--------------------------------



const remove = (arr, func) =>
  Array.isArray(arr)
    ? arr.filter(func).reduce((acc, val) => {
      arr.splice(arr.indexOf(val), 1);
      return acc.concat(val);
    }, [])
    : [];

//--------------------------------


remove([1, 2, 3, 4], n => n % 2 === 0); // [2, 4]

//--------------------------------


const removeAccents = str =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

//--------------------------------


removeAccents('Antoine de Saint-Exupéry'); // 'Antoine de Saint-Exupery'

//--------------------------------


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

//--------------------------------


const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

//--------------------------------


scrollToTop(); // Smooth-scrolls to the top of the page

//--------------------------------


const sdbm = str => {
  let arr = str.split('');
  return arr.reduce(
    (hashCode, currentVal) =>
      (hashCode =
        currentVal.charCodeAt(0) +
        (hashCode << 6) +
        (hashCode << 16) -
        hashCode),
    0
  );
};

//--------------------------------


sdbm('name'); // -3521204949

//--------------------------------


const selectionSort = arr => {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    const min = a
      .slice(i + 1)
      .reduce((acc, val, j) => (val < a[acc] ? j + i + 1 : acc), i);
    if (min !== i) [a[i], a[min]] = [a[min], a[i]];
  }
  return a;
};

//--------------------------------


selectionSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const serializeCookie = (name, val) =>
  `${encodeURIComponent(name)}=${encodeURIComponent(val)}`;

//--------------------------------


serializeCookie('foo', 'bar'); // 'foo=bar'

//--------------------------------


const slugify = str =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

//--------------------------------


slugify('Hello World!'); // 'hello-world'

//--------------------------------


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

//--------------------------------


const sortedIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr.findIndex(el =>
    isDescending ? val >= fn(el) : val <= fn(el)
  );
  return index === -1 ? arr.length : index;
};

//--------------------------------


sortedIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 0

//--------------------------------


const sortedLastIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr
    .reverse()
    .findIndex(el => (isDescending ? n <= el : n >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndex([10, 20, 30, 30, 40], 30); // 4

//--------------------------------


const sortedLastIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr
    .map(fn)
    .reverse()
    .findIndex(el => (isDescending ? val <= el : val >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 1

//--------------------------------


const stringPermutations = str => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str
    .split('')
    .reduce(
      (acc, letter, i) =>
        acc.concat(
          stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(
            val => letter + val
          )
        ),
      []
    );
};

//--------------------------------


stringPermutations('abc'); // ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']

//--------------------------------


const supportsTouchEvents = () =>
  window && 'ontouchstart' in window;

//--------------------------------


supportsTouchEvents(); // true

//--------------------------------


const swapCase = str =>
  [...str]
    .map(c => (c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase()))
    .join('');

//--------------------------------


swapCase('Hello world!'); // 'hELLO WORLD!'

//--------------------------------


const takeRightUntil = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightUntil([1, 2, 3, 4], n => n < 3); // [3, 4]

//--------------------------------


const takeRightWhile = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (!fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const takeUntil = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeUntil([1, 2, 3, 4], n => n >= 3); // [1, 2]

//--------------------------------


const takeWhile = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (!fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

//--------------------------------


const toISOStringWithTimezone = date => {
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? '+' : '-';
  const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    diff + pad(tzOffset / 60) +
    ':' + pad(tzOffset % 60);
};

//--------------------------------


toISOStringWithTimezone(new Date()); // '2020-10-06T20:43:33-04:00'

//--------------------------------


const toOrdinalSuffix = num => {
  const int = parseInt(num),
    digits = [int % 10, int % 100],
    ordinals = ['st', 'nd', 'rd', 'th'],
    oPattern = [1, 2, 3, 4],
    tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
  return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
    ? int + ordinals[digits[0] - 1]
    : int + ordinals[3];
};

//--------------------------------


toOrdinalSuffix('123'); // '123rd'

//--------------------------------


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


const HSBToRGB = (h, s, b) => {
  s /= 100;
  b /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [255 * f(5), 255 * f(3), 255 * f(1)];
};

//--------------------------------


HSBToRGB(18, 81, 99); // [252.45, 109.31084999999996, 47.965499999999984]

//--------------------------------


const HSLToRGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

//--------------------------------


HSLToRGB(13, 100, 11); // [56.1, 12.155, 0]

//--------------------------------


const RGBToHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};

//--------------------------------


RGBToHSL(45, 23, 11); // [21.17647, 60.71428, 10.98039]

//--------------------------------


const RGBToHex = (r, g, b) =>
  ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');

//--------------------------------


RGBToHex(255, 165, 1); // 'ffa501'

//--------------------------------


const UUIDGeneratorBrowser = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );

//--------------------------------


UUIDGeneratorBrowser(); // '7982fcfe-5721-4632-bede-6000885be57d'

//--------------------------------


const crypto = require('crypto');

const UUIDGeneratorNode = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
  );

//--------------------------------


UUIDGeneratorNode(); // '79c7c136-60ee-40a2-beb2-856f1feabefc'

//--------------------------------


const approximatelyEqual = (v1, v2, epsilon = 0.001) =>
  Math.abs(v1 - v2) < epsilon;

//--------------------------------


approximatelyEqual(Math.PI / 2.0, 1.5708); // true

//--------------------------------


const arithmeticProgression  = (n, lim) =>
  Array.from({ length: Math.ceil(lim / n) }, (_, i) => (i + 1) * n );

//--------------------------------


arithmeticProgression(5, 25); // [5, 10, 15, 20, 25]

//--------------------------------


const arrayToHTMLList = (arr, listID) => 
  document.querySelector(`#${listID}`).innerHTML += arr
    .map(item => `<li>${item}</li>`)
    .join('');

//--------------------------------


arrayToHTMLList(['item 1', 'item 2'], 'myListID');

//--------------------------------


const binomialCoefficient = (n, k) => {
  if (Number.isNaN(n) || Number.isNaN(k)) return NaN;
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  if (k === 1 || k === n - 1) return n;
  if (n - k < k) k = n - k;
  let res = n;
  for (let j = 2; j <= k; j++) res *= (n - j + 1) / j;
  return Math.round(res);
};

//--------------------------------


binomialCoefficient(8, 2); // 28

//--------------------------------


const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight ||
    document.documentElement.clientHeight);

//--------------------------------


bottomVisible(); // true

//--------------------------------


const bubbleSort = arr => {
  let swapped = false;
  const a = [...arr];
  for (let i = 1; i < a.length - 1; i++) {
    swapped = false;
    for (let j = 0; j < a.length - i; j++) {
      if (a[j + 1] < a[j]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    if (!swapped) return a;
  }
  return a;
};

//--------------------------------


bubbleSort([2, 1, 4, 3]); // [1, 2, 3, 4]

//--------------------------------


const bucketSort = (arr, size = 5) => {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const buckets = Array.from(
    { length: Math.floor((max - min) / size) + 1 },
    () => []
  );
  arr.forEach(val => {
    buckets[Math.floor((val - min) / size)].push(val);
  });
  return buckets.reduce((acc, b) => [...acc, ...b.sort((a, b) => a - b)], []);
};

//--------------------------------


bucketSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const capitalizeEveryWord = str =>
  str.replace(/\b[a-z]/g, char => char.toUpperCase());

//--------------------------------


capitalizeEveryWord('hello world!'); // 'Hello World!'

//--------------------------------


const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

//--------------------------------


chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

//--------------------------------


const chunkIntoN = (arr, n) => {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}

//--------------------------------


chunkIntoN([1, 2, 3, 4, 5, 6, 7], 4); // [[1, 2], [3, 4], [5, 6], [7]]

//--------------------------------


const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

//--------------------------------


copyToClipboard('Lorem ipsum'); // 'Lorem ipsum' copied to clipboard.

//--------------------------------


const countOccurrences = (arr, val) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

//--------------------------------


countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3

//--------------------------------


const dayOfYear = date =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

//--------------------------------


dayOfYear(new Date()); // 272

//--------------------------------


const daysAgo = n => {
  let d = new Date();
  d.setDate(d.getDate() - Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysAgo(20); // 2020-09-16 (if current date is 2020-10-06)

//--------------------------------


const daysFromNow = n => {
  let d = new Date();
  d.setDate(d.getDate() + Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysFromNow(5); // 2020-10-13 (if current date is 2020-10-08)

//--------------------------------


const deepFlatten = arr =>
  [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));

//--------------------------------


deepFlatten([1, [2], [[3], 4], 5]); // [1, 2, 3, 4, 5]

//--------------------------------


const defaults = (obj, ...defs) =>
  Object.assign({}, obj, ...defs.reverse(), obj);

//--------------------------------


defaults({ a: 1 }, { b: 2 }, { b: 6 }, { a: 3 }); // { a: 1, b: 2 }

//--------------------------------


const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? 'Mobile'
    : 'Desktop';

//--------------------------------


detectDeviceType(); // 'Mobile' or 'Desktop'

//--------------------------------


const detectLanguage = (defaultLang = 'en-US') => 
  navigator.language ||
  (Array.isArray(navigator.languages) && navigator.languages[0]) ||
  defaultLang;

//--------------------------------


detectLanguage(); // 'nl-NL'

//--------------------------------


const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};

//--------------------------------


difference([1, 2, 3, 3], [1, 2, 4]); // [3, 3]

//--------------------------------


const dropRightWhile = (arr, func) => {
  let rightIndex = arr.length;
  while (rightIndex-- && !func(arr[rightIndex]));
  return arr.slice(0, rightIndex + 1);
};

//--------------------------------


dropRightWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const dropWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
  return arr;
};

//--------------------------------


dropWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const factorial = n =>
  n < 0
    ? (() => {
        throw new TypeError('Negative numbers are not allowed!');
      })()
    : n <= 1
    ? 1
    : n * factorial(n - 1);

//--------------------------------


factorial(6); // 720

//--------------------------------


const fibonacci = n =>
  Array.from({ length: n }).reduce(
    (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
    []
  );

//--------------------------------


fibonacci(6); // [0, 1, 1, 2, 3, 5]

//--------------------------------


const filterNonUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) === arr.lastIndexOf(i));

//--------------------------------


filterNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1, 3, 5]

//--------------------------------


const filterUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) !== arr.lastIndexOf(i));

//--------------------------------


filterUnique([1, 2, 2, 3, 4, 4, 5]); // [2, 4]

//--------------------------------


const flattenObject = (obj, prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}.` : '';
    if (
      typeof obj[k] === 'object' &&
      obj[k] !== null &&
      Object.keys(obj[k]).length > 0
    )
      Object.assign(acc, flattenObject(obj[k], pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});

//--------------------------------


flattenObject({ a: { b: { c: 1 } }, d: 1 }); // { 'a.b.c': 1, d: 1 }

//--------------------------------


const forEachRight = (arr, callback) =>
  arr
    .slice()
    .reverse()
    .forEach(callback);

//--------------------------------


forEachRight([1, 2, 3, 4], val => console.log(val)); // '4', '3', '2', '1'

//--------------------------------


const forOwn = (obj, fn) =>
  Object.keys(obj).forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwn({ foo: 'bar', a: 1 }, v => console.log(v)); // 'bar', 1

//--------------------------------


const forOwnRight = (obj, fn) =>
  Object.keys(obj)
    .reverse()
    .forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwnRight({ foo: 'bar', a: 1 }, v => console.log(v)); // 1, 'bar'

//--------------------------------


const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24);

//--------------------------------


getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')); // 9

//--------------------------------


const getElementsBiggerThanViewport = () => {
  const docWidth = document.documentElement.offsetWidth;
  return [...document.querySelectorAll('*')].filter(
    el => el.offsetWidth > docWidth
  );
};

//--------------------------------


getElementsBiggerThanViewport(); // <div id="ultra-wide-item" />

//--------------------------------


const getMonthsDiffBetweenDates = (dateInitial, dateFinal) =>
  Math.max(
    (dateFinal.getFullYear() - dateInitial.getFullYear()) * 12 +
      dateFinal.getMonth() -
      dateInitial.getMonth(),
    0
  );

//--------------------------------


getMonthsDiffBetweenDates(new Date('2017-12-13'), new Date('2018-04-29')); // 4

//--------------------------------


const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});

//--------------------------------


getScrollPosition(); // {x: 0, y: 200}

//--------------------------------


const getSiblings = el =>
  [...el.parentNode.childNodes].filter(node => node !== el);

//--------------------------------


getSiblings(document.querySelector('head')); // ['body']

//--------------------------------


const getType = v =>
  (v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name);

//--------------------------------


getType(new Set([1, 2, 3])); // 'Set'

//--------------------------------


const getVerticalOffset = el => {
  let offset = el.offsetTop,
    _el = el;
  while (_el.offsetParent) {
    _el = _el.offsetParent;
    offset += _el.offsetTop;
  }
  return offset;
};

//--------------------------------


getVerticalOffset('.my-element'); // 120

//--------------------------------


const hammingDistance = (num1, num2) =>
  ((num1 ^ num2).toString(2).match(/1/g) || '').length;

//--------------------------------


hammingDistance(2, 3); // 1

//--------------------------------


const haveSameContents = (a, b) => {
  for (const v of new Set([...a, ...b]))
    if (a.filter(e => e === v).length !== b.filter(e => e === v).length)
      return false;
  return true;
};

//--------------------------------


haveSameContents([1, 2, 4], [2, 4, 1]); // true

//--------------------------------


const heapsort = arr => {
  const a = [...arr];
  let l = a.length;

  const heapify = (a, i) => {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let max = i;
    if (left < l && a[left] > a[max]) max = left;
    if (right < l && a[right] > a[max]) max = right;
    if (max !== i) {
      [a[max], a[i]] = [a[i], a[max]];
      heapify(a, max);
    }
  };

  for (let i = Math.floor(l / 2); i >= 0; i -= 1) heapify(a, i);
  for (i = a.length - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    l--;
    heapify(a, 0);
  }
  return a;
};

//--------------------------------


heapsort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const initialize2DArray = (w, h, val = null) =>
  Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));

//--------------------------------


initialize2DArray(2, 2, 0); // [[0, 0], [0, 0]]

//--------------------------------


const initializeArrayWithValues = (n, val = 0) =>
  Array.from({ length: n }).fill(val);

//--------------------------------


initializeArrayWithValues(5, 2); // [2, 2, 2, 2, 2]

//--------------------------------


const insertionSort = arr =>
  arr.reduce((acc, x) => {
    if (!acc.length) return [x];
    acc.some((y, j) => {
      if (x <= y) {
        acc.splice(j, 0, x);
        return true;
      }
      if (x > y && j === acc.length - 1) {
        acc.splice(j + 1, 0, x);
        return true;
      }
      return false;
    });
    return acc;
  }, []);

//--------------------------------


insertionSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const intersection = (a, b) => {
  const s = new Set(b);
  return [...new Set(a)].filter(x => s.has(x));
};

//--------------------------------


intersection([1, 2, 3], [4, 3, 2]); // [2, 3]

//--------------------------------


const isAnagram = (str1, str2) => {
  const normalize = str =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, '')
      .split('')
      .sort()
      .join('');
  return normalize(str1) === normalize(str2);
};

//--------------------------------


isAnagram('iceman', 'cinema'); // true

//--------------------------------


const isContainedIn = (a, b) => {
  for (const v of new Set(a)) {
    if (
      !b.some(e => e === v) ||
      a.filter(e => e === v).length > b.filter(e => e === v).length
    )
      return false;
  }
  return true;
};

//--------------------------------


isContainedIn([1, 4], [2, 4, 1]); // true

//--------------------------------


const isLocalStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.localStorage.setItem(key, null);
    window.localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isLocalStorageEnabled(); // true, if localStorage is accessible

//--------------------------------


const isPrime = num => {
  const boundary = Math.floor(Math.sqrt(num));
  for (let i = 2; i <= boundary; i++) if (num % i === 0) return false;
  return num >= 2;
};

//--------------------------------


isPrime(11); // true

//--------------------------------


const isSameDate = (dateA, dateB) =>
  dateA.toISOString() === dateB.toISOString();

//--------------------------------


isSameDate(new Date(2010, 10, 20), new Date(2010, 10, 20)); // true

//--------------------------------


const isSessionStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.sessionStorage.setItem(key, null);
    window.sessionStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isSessionStorageEnabled(); // true, if sessionStorage is accessible

//--------------------------------


const kMeans = (data, k = 1) => {
  const centroids = data.slice(0, k);
  const distances = Array.from({ length: data.length }, () =>
    Array.from({ length: k }, () => 0)
  );
  const classes = Array.from({ length: data.length }, () => -1);
  let itr = true;

  while (itr) {
    itr = false;

    for (let d in data) {
      for (let c = 0; c < k; c++) {
        distances[d][c] = Math.hypot(
          ...Object.keys(data[0]).map(key => data[d][key] - centroids[c][key])
        );
      }
      const m = distances[d].indexOf(Math.min(...distances[d]));
      if (classes[d] !== m) itr = true;
      classes[d] = m;
    }

    for (let c = 0; c < k; c++) {
      centroids[c] = Array.from({ length: data[0].length }, () => 0);
      const size = data.reduce((acc, _, d) => {
        if (classes[d] === c) {
          acc++;
          for (let i in data[0]) centroids[c][i] += data[d][i];
        }
        return acc;
      }, 0);
      for (let i in data[0]) {
        centroids[c][i] = parseFloat(Number(centroids[c][i] / size).toFixed(2));
      }
    }
  }

  return classes;
};

//--------------------------------


kMeans([[0, 0], [0, 1], [1, 3], [2, 0]], 2); // [0, 1, 1, 0]

//--------------------------------


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

//--------------------------------


const randomIntArrayInRange = (min, max, n = 1) =>
  Array.from(
    { length: n },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );

//--------------------------------


randomIntArrayInRange(12, 35, 10); // [ 34, 14, 27, 17, 30, 27, 20, 26, 21, 14 ]

//--------------------------------


const randomIntegerInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

//--------------------------------


randomIntegerInRange(0, 5); // 2

//--------------------------------


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

//--------------------------------



const remove = (arr, func) =>
  Array.isArray(arr)
    ? arr.filter(func).reduce((acc, val) => {
      arr.splice(arr.indexOf(val), 1);
      return acc.concat(val);
    }, [])
    : [];

//--------------------------------


remove([1, 2, 3, 4], n => n % 2 === 0); // [2, 4]

//--------------------------------


const removeAccents = str =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

//--------------------------------


removeAccents('Antoine de Saint-Exupéry'); // 'Antoine de Saint-Exupery'

//--------------------------------


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

//--------------------------------


const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

//--------------------------------


scrollToTop(); // Smooth-scrolls to the top of the page

//--------------------------------


const sdbm = str => {
  let arr = str.split('');
  return arr.reduce(
    (hashCode, currentVal) =>
      (hashCode =
        currentVal.charCodeAt(0) +
        (hashCode << 6) +
        (hashCode << 16) -
        hashCode),
    0
  );
};

//--------------------------------


sdbm('name'); // -3521204949

//--------------------------------


const selectionSort = arr => {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    const min = a
      .slice(i + 1)
      .reduce((acc, val, j) => (val < a[acc] ? j + i + 1 : acc), i);
    if (min !== i) [a[i], a[min]] = [a[min], a[i]];
  }
  return a;
};

//--------------------------------


selectionSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const serializeCookie = (name, val) =>
  `${encodeURIComponent(name)}=${encodeURIComponent(val)}`;

//--------------------------------


serializeCookie('foo', 'bar'); // 'foo=bar'

//--------------------------------


const slugify = str =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

//--------------------------------


slugify('Hello World!'); // 'hello-world'

//--------------------------------


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

//--------------------------------


const sortedIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr.findIndex(el =>
    isDescending ? val >= fn(el) : val <= fn(el)
  );
  return index === -1 ? arr.length : index;
};

//--------------------------------


sortedIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 0

//--------------------------------


const sortedLastIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr
    .reverse()
    .findIndex(el => (isDescending ? n <= el : n >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndex([10, 20, 30, 30, 40], 30); // 4

//--------------------------------


const sortedLastIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr
    .map(fn)
    .reverse()
    .findIndex(el => (isDescending ? val <= el : val >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 1

//--------------------------------


const stringPermutations = str => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str
    .split('')
    .reduce(
      (acc, letter, i) =>
        acc.concat(
          stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(
            val => letter + val
          )
        ),
      []
    );
};

//--------------------------------


stringPermutations('abc'); // ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']

//--------------------------------


const supportsTouchEvents = () =>
  window && 'ontouchstart' in window;

//--------------------------------


supportsTouchEvents(); // true

//--------------------------------


const swapCase = str =>
  [...str]
    .map(c => (c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase()))
    .join('');

//--------------------------------


swapCase('Hello world!'); // 'hELLO WORLD!'

//--------------------------------


const takeRightUntil = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightUntil([1, 2, 3, 4], n => n < 3); // [3, 4]

//--------------------------------


const takeRightWhile = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (!fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const takeUntil = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeUntil([1, 2, 3, 4], n => n >= 3); // [1, 2]

//--------------------------------


const takeWhile = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (!fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

//--------------------------------


const toISOStringWithTimezone = date => {
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? '+' : '-';
  const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    diff + pad(tzOffset / 60) +
    ':' + pad(tzOffset % 60);
};

//--------------------------------


toISOStringWithTimezone(new Date()); // '2020-10-06T20:43:33-04:00'

//--------------------------------


const toOrdinalSuffix = num => {
  const int = parseInt(num),
    digits = [int % 10, int % 100],
    ordinals = ['st', 'nd', 'rd', 'th'],
    oPattern = [1, 2, 3, 4],
    tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
  return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
    ? int + ordinals[digits[0] - 1]
    : int + ordinals[3];
};

//--------------------------------


toOrdinalSuffix('123'); // '123rd'

//--------------------------------


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


const HSBToRGB = (h, s, b) => {
  s /= 100;
  b /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [255 * f(5), 255 * f(3), 255 * f(1)];
};

//--------------------------------


HSBToRGB(18, 81, 99); // [252.45, 109.31084999999996, 47.965499999999984]

//--------------------------------


const HSLToRGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

//--------------------------------


HSLToRGB(13, 100, 11); // [56.1, 12.155, 0]

//--------------------------------


const RGBToHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};

//--------------------------------


RGBToHSL(45, 23, 11); // [21.17647, 60.71428, 10.98039]

//--------------------------------


const RGBToHex = (r, g, b) =>
  ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');

//--------------------------------


RGBToHex(255, 165, 1); // 'ffa501'

//--------------------------------


const UUIDGeneratorBrowser = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );

//--------------------------------


UUIDGeneratorBrowser(); // '7982fcfe-5721-4632-bede-6000885be57d'

//--------------------------------


const crypto = require('crypto');

const UUIDGeneratorNode = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
  );

//--------------------------------


UUIDGeneratorNode(); // '79c7c136-60ee-40a2-beb2-856f1feabefc'

//--------------------------------


const approximatelyEqual = (v1, v2, epsilon = 0.001) =>
  Math.abs(v1 - v2) < epsilon;

//--------------------------------


approximatelyEqual(Math.PI / 2.0, 1.5708); // true

//--------------------------------


const arithmeticProgression  = (n, lim) =>
  Array.from({ length: Math.ceil(lim / n) }, (_, i) => (i + 1) * n );

//--------------------------------


arithmeticProgression(5, 25); // [5, 10, 15, 20, 25]

//--------------------------------


const arrayToHTMLList = (arr, listID) => 
  document.querySelector(`#${listID}`).innerHTML += arr
    .map(item => `<li>${item}</li>`)
    .join('');

//--------------------------------


arrayToHTMLList(['item 1', 'item 2'], 'myListID');

//--------------------------------


const binomialCoefficient = (n, k) => {
  if (Number.isNaN(n) || Number.isNaN(k)) return NaN;
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  if (k === 1 || k === n - 1) return n;
  if (n - k < k) k = n - k;
  let res = n;
  for (let j = 2; j <= k; j++) res *= (n - j + 1) / j;
  return Math.round(res);
};

//--------------------------------


binomialCoefficient(8, 2); // 28

//--------------------------------


const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight ||
    document.documentElement.clientHeight);

//--------------------------------


bottomVisible(); // true

//--------------------------------


const bubbleSort = arr => {
  let swapped = false;
  const a = [...arr];
  for (let i = 1; i < a.length - 1; i++) {
    swapped = false;
    for (let j = 0; j < a.length - i; j++) {
      if (a[j + 1] < a[j]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    if (!swapped) return a;
  }
  return a;
};

//--------------------------------


bubbleSort([2, 1, 4, 3]); // [1, 2, 3, 4]

//--------------------------------


const bucketSort = (arr, size = 5) => {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const buckets = Array.from(
    { length: Math.floor((max - min) / size) + 1 },
    () => []
  );
  arr.forEach(val => {
    buckets[Math.floor((val - min) / size)].push(val);
  });
  return buckets.reduce((acc, b) => [...acc, ...b.sort((a, b) => a - b)], []);
};

//--------------------------------


bucketSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const capitalizeEveryWord = str =>
  str.replace(/\b[a-z]/g, char => char.toUpperCase());

//--------------------------------


capitalizeEveryWord('hello world!'); // 'Hello World!'

//--------------------------------


const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

//--------------------------------


chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

//--------------------------------


const chunkIntoN = (arr, n) => {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}

//--------------------------------


chunkIntoN([1, 2, 3, 4, 5, 6, 7], 4); // [[1, 2], [3, 4], [5, 6], [7]]

//--------------------------------


const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

//--------------------------------


copyToClipboard('Lorem ipsum'); // 'Lorem ipsum' copied to clipboard.

//--------------------------------


const countOccurrences = (arr, val) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

//--------------------------------


countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3

//--------------------------------


const dayOfYear = date =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

//--------------------------------


dayOfYear(new Date()); // 272

//--------------------------------


const daysAgo = n => {
  let d = new Date();
  d.setDate(d.getDate() - Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysAgo(20); // 2020-09-16 (if current date is 2020-10-06)

//--------------------------------


const daysFromNow = n => {
  let d = new Date();
  d.setDate(d.getDate() + Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysFromNow(5); // 2020-10-13 (if current date is 2020-10-08)

//--------------------------------


const deepFlatten = arr =>
  [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));

//--------------------------------


deepFlatten([1, [2], [[3], 4], 5]); // [1, 2, 3, 4, 5]

//--------------------------------


const defaults = (obj, ...defs) =>
  Object.assign({}, obj, ...defs.reverse(), obj);

//--------------------------------


defaults({ a: 1 }, { b: 2 }, { b: 6 }, { a: 3 }); // { a: 1, b: 2 }

//--------------------------------


const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? 'Mobile'
    : 'Desktop';

//--------------------------------


detectDeviceType(); // 'Mobile' or 'Desktop'

//--------------------------------


const detectLanguage = (defaultLang = 'en-US') => 
  navigator.language ||
  (Array.isArray(navigator.languages) && navigator.languages[0]) ||
  defaultLang;

//--------------------------------


detectLanguage(); // 'nl-NL'

//--------------------------------


const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};

//--------------------------------


difference([1, 2, 3, 3], [1, 2, 4]); // [3, 3]

//--------------------------------


const dropRightWhile = (arr, func) => {
  let rightIndex = arr.length;
  while (rightIndex-- && !func(arr[rightIndex]));
  return arr.slice(0, rightIndex + 1);
};

//--------------------------------


dropRightWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const dropWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
  return arr;
};

//--------------------------------


dropWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const factorial = n =>
  n < 0
    ? (() => {
        throw new TypeError('Negative numbers are not allowed!');
      })()
    : n <= 1
    ? 1
    : n * factorial(n - 1);

//--------------------------------


factorial(6); // 720

//--------------------------------


const fibonacci = n =>
  Array.from({ length: n }).reduce(
    (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
    []
  );

//--------------------------------


fibonacci(6); // [0, 1, 1, 2, 3, 5]

//--------------------------------


const filterNonUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) === arr.lastIndexOf(i));

//--------------------------------


filterNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1, 3, 5]

//--------------------------------


const filterUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) !== arr.lastIndexOf(i));

//--------------------------------


filterUnique([1, 2, 2, 3, 4, 4, 5]); // [2, 4]

//--------------------------------


const flattenObject = (obj, prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}.` : '';
    if (
      typeof obj[k] === 'object' &&
      obj[k] !== null &&
      Object.keys(obj[k]).length > 0
    )
      Object.assign(acc, flattenObject(obj[k], pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});

//--------------------------------


flattenObject({ a: { b: { c: 1 } }, d: 1 }); // { 'a.b.c': 1, d: 1 }

//--------------------------------


const forEachRight = (arr, callback) =>
  arr
    .slice()
    .reverse()
    .forEach(callback);

//--------------------------------


forEachRight([1, 2, 3, 4], val => console.log(val)); // '4', '3', '2', '1'

//--------------------------------


const forOwn = (obj, fn) =>
  Object.keys(obj).forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwn({ foo: 'bar', a: 1 }, v => console.log(v)); // 'bar', 1

//--------------------------------


const forOwnRight = (obj, fn) =>
  Object.keys(obj)
    .reverse()
    .forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwnRight({ foo: 'bar', a: 1 }, v => console.log(v)); // 1, 'bar'

//--------------------------------


const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24);

//--------------------------------


getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')); // 9

//--------------------------------


const getElementsBiggerThanViewport = () => {
  const docWidth = document.documentElement.offsetWidth;
  return [...document.querySelectorAll('*')].filter(
    el => el.offsetWidth > docWidth
  );
};

//--------------------------------


getElementsBiggerThanViewport(); // <div id="ultra-wide-item" />

//--------------------------------


const getMonthsDiffBetweenDates = (dateInitial, dateFinal) =>
  Math.max(
    (dateFinal.getFullYear() - dateInitial.getFullYear()) * 12 +
      dateFinal.getMonth() -
      dateInitial.getMonth(),
    0
  );

//--------------------------------


getMonthsDiffBetweenDates(new Date('2017-12-13'), new Date('2018-04-29')); // 4

//--------------------------------


const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});

//--------------------------------


getScrollPosition(); // {x: 0, y: 200}

//--------------------------------


const getSiblings = el =>
  [...el.parentNode.childNodes].filter(node => node !== el);

//--------------------------------


getSiblings(document.querySelector('head')); // ['body']

//--------------------------------


const getType = v =>
  (v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name);

//--------------------------------


getType(new Set([1, 2, 3])); // 'Set'

//--------------------------------


const getVerticalOffset = el => {
  let offset = el.offsetTop,
    _el = el;
  while (_el.offsetParent) {
    _el = _el.offsetParent;
    offset += _el.offsetTop;
  }
  return offset;
};

//--------------------------------


getVerticalOffset('.my-element'); // 120

//--------------------------------


const hammingDistance = (num1, num2) =>
  ((num1 ^ num2).toString(2).match(/1/g) || '').length;

//--------------------------------


hammingDistance(2, 3); // 1

//--------------------------------


const haveSameContents = (a, b) => {
  for (const v of new Set([...a, ...b]))
    if (a.filter(e => e === v).length !== b.filter(e => e === v).length)
      return false;
  return true;
};

//--------------------------------


haveSameContents([1, 2, 4], [2, 4, 1]); // true

//--------------------------------


const heapsort = arr => {
  const a = [...arr];
  let l = a.length;

  const heapify = (a, i) => {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let max = i;
    if (left < l && a[left] > a[max]) max = left;
    if (right < l && a[right] > a[max]) max = right;
    if (max !== i) {
      [a[max], a[i]] = [a[i], a[max]];
      heapify(a, max);
    }
  };

  for (let i = Math.floor(l / 2); i >= 0; i -= 1) heapify(a, i);
  for (i = a.length - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    l--;
    heapify(a, 0);
  }
  return a;
};

//--------------------------------


heapsort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const initialize2DArray = (w, h, val = null) =>
  Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));

//--------------------------------


initialize2DArray(2, 2, 0); // [[0, 0], [0, 0]]

//--------------------------------


const initializeArrayWithValues = (n, val = 0) =>
  Array.from({ length: n }).fill(val);

//--------------------------------


initializeArrayWithValues(5, 2); // [2, 2, 2, 2, 2]

//--------------------------------


const insertionSort = arr =>
  arr.reduce((acc, x) => {
    if (!acc.length) return [x];
    acc.some((y, j) => {
      if (x <= y) {
        acc.splice(j, 0, x);
        return true;
      }
      if (x > y && j === acc.length - 1) {
        acc.splice(j + 1, 0, x);
        return true;
      }
      return false;
    });
    return acc;
  }, []);

//--------------------------------


insertionSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const intersection = (a, b) => {
  const s = new Set(b);
  return [...new Set(a)].filter(x => s.has(x));
};

//--------------------------------


intersection([1, 2, 3], [4, 3, 2]); // [2, 3]

//--------------------------------


const isAnagram = (str1, str2) => {
  const normalize = str =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, '')
      .split('')
      .sort()
      .join('');
  return normalize(str1) === normalize(str2);
};

//--------------------------------


isAnagram('iceman', 'cinema'); // true

//--------------------------------


const isContainedIn = (a, b) => {
  for (const v of new Set(a)) {
    if (
      !b.some(e => e === v) ||
      a.filter(e => e === v).length > b.filter(e => e === v).length
    )
      return false;
  }
  return true;
};

//--------------------------------


isContainedIn([1, 4], [2, 4, 1]); // true

//--------------------------------


const isLocalStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.localStorage.setItem(key, null);
    window.localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isLocalStorageEnabled(); // true, if localStorage is accessible

//--------------------------------


const isPrime = num => {
  const boundary = Math.floor(Math.sqrt(num));
  for (let i = 2; i <= boundary; i++) if (num % i === 0) return false;
  return num >= 2;
};

//--------------------------------


isPrime(11); // true

//--------------------------------


const isSameDate = (dateA, dateB) =>
  dateA.toISOString() === dateB.toISOString();

//--------------------------------


isSameDate(new Date(2010, 10, 20), new Date(2010, 10, 20)); // true

//--------------------------------


const isSessionStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.sessionStorage.setItem(key, null);
    window.sessionStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isSessionStorageEnabled(); // true, if sessionStorage is accessible

//--------------------------------


const kMeans = (data, k = 1) => {
  const centroids = data.slice(0, k);
  const distances = Array.from({ length: data.length }, () =>
    Array.from({ length: k }, () => 0)
  );
  const classes = Array.from({ length: data.length }, () => -1);
  let itr = true;

  while (itr) {
    itr = false;

    for (let d in data) {
      for (let c = 0; c < k; c++) {
        distances[d][c] = Math.hypot(
          ...Object.keys(data[0]).map(key => data[d][key] - centroids[c][key])
        );
      }
      const m = distances[d].indexOf(Math.min(...distances[d]));
      if (classes[d] !== m) itr = true;
      classes[d] = m;
    }

    for (let c = 0; c < k; c++) {
      centroids[c] = Array.from({ length: data[0].length }, () => 0);
      const size = data.reduce((acc, _, d) => {
        if (classes[d] === c) {
          acc++;
          for (let i in data[0]) centroids[c][i] += data[d][i];
        }
        return acc;
      }, 0);
      for (let i in data[0]) {
        centroids[c][i] = parseFloat(Number(centroids[c][i] / size).toFixed(2));
      }
    }
  }

  return classes;
};

//--------------------------------


kMeans([[0, 0], [0, 1], [1, 3], [2, 0]], 2); // [0, 1, 1, 0]

//--------------------------------


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

//--------------------------------


const randomIntArrayInRange = (min, max, n = 1) =>
  Array.from(
    { length: n },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );

//--------------------------------


randomIntArrayInRange(12, 35, 10); // [ 34, 14, 27, 17, 30, 27, 20, 26, 21, 14 ]

//--------------------------------


const randomIntegerInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

//--------------------------------


randomIntegerInRange(0, 5); // 2

//--------------------------------


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

//--------------------------------



const remove = (arr, func) =>
  Array.isArray(arr)
    ? arr.filter(func).reduce((acc, val) => {
      arr.splice(arr.indexOf(val), 1);
      return acc.concat(val);
    }, [])
    : [];

//--------------------------------


remove([1, 2, 3, 4], n => n % 2 === 0); // [2, 4]

//--------------------------------


const removeAccents = str =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

//--------------------------------


removeAccents('Antoine de Saint-Exupéry'); // 'Antoine de Saint-Exupery'

//--------------------------------


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

//--------------------------------


const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

//--------------------------------


scrollToTop(); // Smooth-scrolls to the top of the page

//--------------------------------


const sdbm = str => {
  let arr = str.split('');
  return arr.reduce(
    (hashCode, currentVal) =>
      (hashCode =
        currentVal.charCodeAt(0) +
        (hashCode << 6) +
        (hashCode << 16) -
        hashCode),
    0
  );
};

//--------------------------------


sdbm('name'); // -3521204949

//--------------------------------


const selectionSort = arr => {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    const min = a
      .slice(i + 1)
      .reduce((acc, val, j) => (val < a[acc] ? j + i + 1 : acc), i);
    if (min !== i) [a[i], a[min]] = [a[min], a[i]];
  }
  return a;
};

//--------------------------------


selectionSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const serializeCookie = (name, val) =>
  `${encodeURIComponent(name)}=${encodeURIComponent(val)}`;

//--------------------------------


serializeCookie('foo', 'bar'); // 'foo=bar'

//--------------------------------


const slugify = str =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

//--------------------------------


slugify('Hello World!'); // 'hello-world'

//--------------------------------


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

//--------------------------------


const sortedIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr.findIndex(el =>
    isDescending ? val >= fn(el) : val <= fn(el)
  );
  return index === -1 ? arr.length : index;
};

//--------------------------------


sortedIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 0

//--------------------------------


const sortedLastIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr
    .reverse()
    .findIndex(el => (isDescending ? n <= el : n >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndex([10, 20, 30, 30, 40], 30); // 4

//--------------------------------


const sortedLastIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr
    .map(fn)
    .reverse()
    .findIndex(el => (isDescending ? val <= el : val >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 1

//--------------------------------


const stringPermutations = str => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str
    .split('')
    .reduce(
      (acc, letter, i) =>
        acc.concat(
          stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(
            val => letter + val
          )
        ),
      []
    );
};

//--------------------------------


stringPermutations('abc'); // ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']

//--------------------------------


const supportsTouchEvents = () =>
  window && 'ontouchstart' in window;

//--------------------------------


supportsTouchEvents(); // true

//--------------------------------


const swapCase = str =>
  [...str]
    .map(c => (c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase()))
    .join('');

//--------------------------------


swapCase('Hello world!'); // 'hELLO WORLD!'

//--------------------------------


const takeRightUntil = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightUntil([1, 2, 3, 4], n => n < 3); // [3, 4]

//--------------------------------


const takeRightWhile = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (!fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const takeUntil = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeUntil([1, 2, 3, 4], n => n >= 3); // [1, 2]

//--------------------------------


const takeWhile = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (!fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

//--------------------------------


const toISOStringWithTimezone = date => {
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? '+' : '-';
  const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    diff + pad(tzOffset / 60) +
    ':' + pad(tzOffset % 60);
};

//--------------------------------


toISOStringWithTimezone(new Date()); // '2020-10-06T20:43:33-04:00'

//--------------------------------


const toOrdinalSuffix = num => {
  const int = parseInt(num),
    digits = [int % 10, int % 100],
    ordinals = ['st', 'nd', 'rd', 'th'],
    oPattern = [1, 2, 3, 4],
    tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
  return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
    ? int + ordinals[digits[0] - 1]
    : int + ordinals[3];
};

//--------------------------------


toOrdinalSuffix('123'); // '123rd'

//--------------------------------


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


const HSBToRGB = (h, s, b) => {
  s /= 100;
  b /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [255 * f(5), 255 * f(3), 255 * f(1)];
};

//--------------------------------


HSBToRGB(18, 81, 99); // [252.45, 109.31084999999996, 47.965499999999984]

//--------------------------------


const HSLToRGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

//--------------------------------


HSLToRGB(13, 100, 11); // [56.1, 12.155, 0]

//--------------------------------


const RGBToHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};

//--------------------------------


RGBToHSL(45, 23, 11); // [21.17647, 60.71428, 10.98039]

//--------------------------------


const RGBToHex = (r, g, b) =>
  ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');

//--------------------------------


RGBToHex(255, 165, 1); // 'ffa501'

//--------------------------------


const UUIDGeneratorBrowser = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );

//--------------------------------


UUIDGeneratorBrowser(); // '7982fcfe-5721-4632-bede-6000885be57d'

//--------------------------------


const crypto = require('crypto');

const UUIDGeneratorNode = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
  );

//--------------------------------


UUIDGeneratorNode(); // '79c7c136-60ee-40a2-beb2-856f1feabefc'

//--------------------------------


const approximatelyEqual = (v1, v2, epsilon = 0.001) =>
  Math.abs(v1 - v2) < epsilon;

//--------------------------------


approximatelyEqual(Math.PI / 2.0, 1.5708); // true

//--------------------------------


const arithmeticProgression  = (n, lim) =>
  Array.from({ length: Math.ceil(lim / n) }, (_, i) => (i + 1) * n );

//--------------------------------


arithmeticProgression(5, 25); // [5, 10, 15, 20, 25]

//--------------------------------


const arrayToHTMLList = (arr, listID) => 
  document.querySelector(`#${listID}`).innerHTML += arr
    .map(item => `<li>${item}</li>`)
    .join('');

//--------------------------------


arrayToHTMLList(['item 1', 'item 2'], 'myListID');

//--------------------------------


const binomialCoefficient = (n, k) => {
  if (Number.isNaN(n) || Number.isNaN(k)) return NaN;
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  if (k === 1 || k === n - 1) return n;
  if (n - k < k) k = n - k;
  let res = n;
  for (let j = 2; j <= k; j++) res *= (n - j + 1) / j;
  return Math.round(res);
};

//--------------------------------


binomialCoefficient(8, 2); // 28

//--------------------------------


const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight ||
    document.documentElement.clientHeight);

//--------------------------------


bottomVisible(); // true

//--------------------------------


const bubbleSort = arr => {
  let swapped = false;
  const a = [...arr];
  for (let i = 1; i < a.length - 1; i++) {
    swapped = false;
    for (let j = 0; j < a.length - i; j++) {
      if (a[j + 1] < a[j]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    if (!swapped) return a;
  }
  return a;
};

//--------------------------------


bubbleSort([2, 1, 4, 3]); // [1, 2, 3, 4]

//--------------------------------


const bucketSort = (arr, size = 5) => {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const buckets = Array.from(
    { length: Math.floor((max - min) / size) + 1 },
    () => []
  );
  arr.forEach(val => {
    buckets[Math.floor((val - min) / size)].push(val);
  });
  return buckets.reduce((acc, b) => [...acc, ...b.sort((a, b) => a - b)], []);
};

//--------------------------------


bucketSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const capitalizeEveryWord = str =>
  str.replace(/\b[a-z]/g, char => char.toUpperCase());

//--------------------------------


capitalizeEveryWord('hello world!'); // 'Hello World!'

//--------------------------------


const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

//--------------------------------


chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

//--------------------------------


const chunkIntoN = (arr, n) => {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}

//--------------------------------


chunkIntoN([1, 2, 3, 4, 5, 6, 7], 4); // [[1, 2], [3, 4], [5, 6], [7]]

//--------------------------------


const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

//--------------------------------


copyToClipboard('Lorem ipsum'); // 'Lorem ipsum' copied to clipboard.

//--------------------------------


const countOccurrences = (arr, val) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

//--------------------------------


countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3

//--------------------------------


const dayOfYear = date =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

//--------------------------------


dayOfYear(new Date()); // 272

//--------------------------------


const daysAgo = n => {
  let d = new Date();
  d.setDate(d.getDate() - Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysAgo(20); // 2020-09-16 (if current date is 2020-10-06)

//--------------------------------


const daysFromNow = n => {
  let d = new Date();
  d.setDate(d.getDate() + Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysFromNow(5); // 2020-10-13 (if current date is 2020-10-08)

//--------------------------------


const deepFlatten = arr =>
  [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));

//--------------------------------


deepFlatten([1, [2], [[3], 4], 5]); // [1, 2, 3, 4, 5]

//--------------------------------


const defaults = (obj, ...defs) =>
  Object.assign({}, obj, ...defs.reverse(), obj);

//--------------------------------


defaults({ a: 1 }, { b: 2 }, { b: 6 }, { a: 3 }); // { a: 1, b: 2 }

//--------------------------------


const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? 'Mobile'
    : 'Desktop';

//--------------------------------


detectDeviceType(); // 'Mobile' or 'Desktop'

//--------------------------------


const detectLanguage = (defaultLang = 'en-US') => 
  navigator.language ||
  (Array.isArray(navigator.languages) && navigator.languages[0]) ||
  defaultLang;

//--------------------------------


detectLanguage(); // 'nl-NL'

//--------------------------------


const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};

//--------------------------------


difference([1, 2, 3, 3], [1, 2, 4]); // [3, 3]

//--------------------------------


const dropRightWhile = (arr, func) => {
  let rightIndex = arr.length;
  while (rightIndex-- && !func(arr[rightIndex]));
  return arr.slice(0, rightIndex + 1);
};

//--------------------------------


dropRightWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const dropWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
  return arr;
};

//--------------------------------


dropWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const factorial = n =>
  n < 0
    ? (() => {
        throw new TypeError('Negative numbers are not allowed!');
      })()
    : n <= 1
    ? 1
    : n * factorial(n - 1);

//--------------------------------


factorial(6); // 720

//--------------------------------


const fibonacci = n =>
  Array.from({ length: n }).reduce(
    (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
    []
  );

//--------------------------------


fibonacci(6); // [0, 1, 1, 2, 3, 5]

//--------------------------------


const filterNonUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) === arr.lastIndexOf(i));

//--------------------------------


filterNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1, 3, 5]

//--------------------------------


const filterUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) !== arr.lastIndexOf(i));

//--------------------------------


filterUnique([1, 2, 2, 3, 4, 4, 5]); // [2, 4]

//--------------------------------


const flattenObject = (obj, prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}.` : '';
    if (
      typeof obj[k] === 'object' &&
      obj[k] !== null &&
      Object.keys(obj[k]).length > 0
    )
      Object.assign(acc, flattenObject(obj[k], pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});

//--------------------------------


flattenObject({ a: { b: { c: 1 } }, d: 1 }); // { 'a.b.c': 1, d: 1 }

//--------------------------------


const forEachRight = (arr, callback) =>
  arr
    .slice()
    .reverse()
    .forEach(callback);

//--------------------------------


forEachRight([1, 2, 3, 4], val => console.log(val)); // '4', '3', '2', '1'

//--------------------------------


const forOwn = (obj, fn) =>
  Object.keys(obj).forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwn({ foo: 'bar', a: 1 }, v => console.log(v)); // 'bar', 1

//--------------------------------


const forOwnRight = (obj, fn) =>
  Object.keys(obj)
    .reverse()
    .forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwnRight({ foo: 'bar', a: 1 }, v => console.log(v)); // 1, 'bar'

//--------------------------------


const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24);

//--------------------------------


getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')); // 9

//--------------------------------


const getElementsBiggerThanViewport = () => {
  const docWidth = document.documentElement.offsetWidth;
  return [...document.querySelectorAll('*')].filter(
    el => el.offsetWidth > docWidth
  );
};

//--------------------------------


getElementsBiggerThanViewport(); // <div id="ultra-wide-item" />

//--------------------------------


const getMonthsDiffBetweenDates = (dateInitial, dateFinal) =>
  Math.max(
    (dateFinal.getFullYear() - dateInitial.getFullYear()) * 12 +
      dateFinal.getMonth() -
      dateInitial.getMonth(),
    0
  );

//--------------------------------


getMonthsDiffBetweenDates(new Date('2017-12-13'), new Date('2018-04-29')); // 4

//--------------------------------


const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});

//--------------------------------


getScrollPosition(); // {x: 0, y: 200}

//--------------------------------


const getSiblings = el =>
  [...el.parentNode.childNodes].filter(node => node !== el);

//--------------------------------


getSiblings(document.querySelector('head')); // ['body']

//--------------------------------


const getType = v =>
  (v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name);

//--------------------------------


getType(new Set([1, 2, 3])); // 'Set'

//--------------------------------


const getVerticalOffset = el => {
  let offset = el.offsetTop,
    _el = el;
  while (_el.offsetParent) {
    _el = _el.offsetParent;
    offset += _el.offsetTop;
  }
  return offset;
};

//--------------------------------


getVerticalOffset('.my-element'); // 120

//--------------------------------


const hammingDistance = (num1, num2) =>
  ((num1 ^ num2).toString(2).match(/1/g) || '').length;

//--------------------------------


hammingDistance(2, 3); // 1

//--------------------------------


const haveSameContents = (a, b) => {
  for (const v of new Set([...a, ...b]))
    if (a.filter(e => e === v).length !== b.filter(e => e === v).length)
      return false;
  return true;
};

//--------------------------------


haveSameContents([1, 2, 4], [2, 4, 1]); // true

//--------------------------------


const heapsort = arr => {
  const a = [...arr];
  let l = a.length;

  const heapify = (a, i) => {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let max = i;
    if (left < l && a[left] > a[max]) max = left;
    if (right < l && a[right] > a[max]) max = right;
    if (max !== i) {
      [a[max], a[i]] = [a[i], a[max]];
      heapify(a, max);
    }
  };

  for (let i = Math.floor(l / 2); i >= 0; i -= 1) heapify(a, i);
  for (i = a.length - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    l--;
    heapify(a, 0);
  }
  return a;
};

//--------------------------------


heapsort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const initialize2DArray = (w, h, val = null) =>
  Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));

//--------------------------------


initialize2DArray(2, 2, 0); // [[0, 0], [0, 0]]

//--------------------------------


const initializeArrayWithValues = (n, val = 0) =>
  Array.from({ length: n }).fill(val);

//--------------------------------


initializeArrayWithValues(5, 2); // [2, 2, 2, 2, 2]

//--------------------------------


const insertionSort = arr =>
  arr.reduce((acc, x) => {
    if (!acc.length) return [x];
    acc.some((y, j) => {
      if (x <= y) {
        acc.splice(j, 0, x);
        return true;
      }
      if (x > y && j === acc.length - 1) {
        acc.splice(j + 1, 0, x);
        return true;
      }
      return false;
    });
    return acc;
  }, []);

//--------------------------------


insertionSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const intersection = (a, b) => {
  const s = new Set(b);
  return [...new Set(a)].filter(x => s.has(x));
};

//--------------------------------


intersection([1, 2, 3], [4, 3, 2]); // [2, 3]

//--------------------------------


const isAnagram = (str1, str2) => {
  const normalize = str =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, '')
      .split('')
      .sort()
      .join('');
  return normalize(str1) === normalize(str2);
};

//--------------------------------


isAnagram('iceman', 'cinema'); // true

//--------------------------------


const isContainedIn = (a, b) => {
  for (const v of new Set(a)) {
    if (
      !b.some(e => e === v) ||
      a.filter(e => e === v).length > b.filter(e => e === v).length
    )
      return false;
  }
  return true;
};

//--------------------------------


isContainedIn([1, 4], [2, 4, 1]); // true

//--------------------------------


const isLocalStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.localStorage.setItem(key, null);
    window.localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isLocalStorageEnabled(); // true, if localStorage is accessible

//--------------------------------


const isPrime = num => {
  const boundary = Math.floor(Math.sqrt(num));
  for (let i = 2; i <= boundary; i++) if (num % i === 0) return false;
  return num >= 2;
};

//--------------------------------


isPrime(11); // true

//--------------------------------


const isSameDate = (dateA, dateB) =>
  dateA.toISOString() === dateB.toISOString();

//--------------------------------


isSameDate(new Date(2010, 10, 20), new Date(2010, 10, 20)); // true

//--------------------------------


const isSessionStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.sessionStorage.setItem(key, null);
    window.sessionStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isSessionStorageEnabled(); // true, if sessionStorage is accessible

//--------------------------------


const kMeans = (data, k = 1) => {
  const centroids = data.slice(0, k);
  const distances = Array.from({ length: data.length }, () =>
    Array.from({ length: k }, () => 0)
  );
  const classes = Array.from({ length: data.length }, () => -1);
  let itr = true;

  while (itr) {
    itr = false;

    for (let d in data) {
      for (let c = 0; c < k; c++) {
        distances[d][c] = Math.hypot(
          ...Object.keys(data[0]).map(key => data[d][key] - centroids[c][key])
        );
      }
      const m = distances[d].indexOf(Math.min(...distances[d]));
      if (classes[d] !== m) itr = true;
      classes[d] = m;
    }

    for (let c = 0; c < k; c++) {
      centroids[c] = Array.from({ length: data[0].length }, () => 0);
      const size = data.reduce((acc, _, d) => {
        if (classes[d] === c) {
          acc++;
          for (let i in data[0]) centroids[c][i] += data[d][i];
        }
        return acc;
      }, 0);
      for (let i in data[0]) {
        centroids[c][i] = parseFloat(Number(centroids[c][i] / size).toFixed(2));
      }
    }
  }

  return classes;
};

//--------------------------------


kMeans([[0, 0], [0, 1], [1, 3], [2, 0]], 2); // [0, 1, 1, 0]

//--------------------------------


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

//--------------------------------


const randomIntArrayInRange = (min, max, n = 1) =>
  Array.from(
    { length: n },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );

//--------------------------------


randomIntArrayInRange(12, 35, 10); // [ 34, 14, 27, 17, 30, 27, 20, 26, 21, 14 ]

//--------------------------------


const randomIntegerInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

//--------------------------------


randomIntegerInRange(0, 5); // 2

//--------------------------------


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

//--------------------------------



const remove = (arr, func) =>
  Array.isArray(arr)
    ? arr.filter(func).reduce((acc, val) => {
      arr.splice(arr.indexOf(val), 1);
      return acc.concat(val);
    }, [])
    : [];

//--------------------------------


remove([1, 2, 3, 4], n => n % 2 === 0); // [2, 4]

//--------------------------------


const removeAccents = str =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

//--------------------------------


removeAccents('Antoine de Saint-Exupéry'); // 'Antoine de Saint-Exupery'

//--------------------------------


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

//--------------------------------


const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

//--------------------------------


scrollToTop(); // Smooth-scrolls to the top of the page

//--------------------------------


const sdbm = str => {
  let arr = str.split('');
  return arr.reduce(
    (hashCode, currentVal) =>
      (hashCode =
        currentVal.charCodeAt(0) +
        (hashCode << 6) +
        (hashCode << 16) -
        hashCode),
    0
  );
};

//--------------------------------


sdbm('name'); // -3521204949

//--------------------------------


const selectionSort = arr => {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    const min = a
      .slice(i + 1)
      .reduce((acc, val, j) => (val < a[acc] ? j + i + 1 : acc), i);
    if (min !== i) [a[i], a[min]] = [a[min], a[i]];
  }
  return a;
};

//--------------------------------


selectionSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const serializeCookie = (name, val) =>
  `${encodeURIComponent(name)}=${encodeURIComponent(val)}`;

//--------------------------------


serializeCookie('foo', 'bar'); // 'foo=bar'

//--------------------------------


const slugify = str =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

//--------------------------------


slugify('Hello World!'); // 'hello-world'

//--------------------------------


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

//--------------------------------


const sortedIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr.findIndex(el =>
    isDescending ? val >= fn(el) : val <= fn(el)
  );
  return index === -1 ? arr.length : index;
};

//--------------------------------


sortedIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 0

//--------------------------------


const sortedLastIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr
    .reverse()
    .findIndex(el => (isDescending ? n <= el : n >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndex([10, 20, 30, 30, 40], 30); // 4

//--------------------------------


const sortedLastIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr
    .map(fn)
    .reverse()
    .findIndex(el => (isDescending ? val <= el : val >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 1

//--------------------------------


const stringPermutations = str => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str
    .split('')
    .reduce(
      (acc, letter, i) =>
        acc.concat(
          stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(
            val => letter + val
          )
        ),
      []
    );
};

//--------------------------------


stringPermutations('abc'); // ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']

//--------------------------------


const supportsTouchEvents = () =>
  window && 'ontouchstart' in window;

//--------------------------------


supportsTouchEvents(); // true

//--------------------------------


const swapCase = str =>
  [...str]
    .map(c => (c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase()))
    .join('');

//--------------------------------


swapCase('Hello world!'); // 'hELLO WORLD!'

//--------------------------------


const takeRightUntil = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightUntil([1, 2, 3, 4], n => n < 3); // [3, 4]

//--------------------------------


const takeRightWhile = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (!fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const takeUntil = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeUntil([1, 2, 3, 4], n => n >= 3); // [1, 2]

//--------------------------------


const takeWhile = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (!fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

//--------------------------------


const toISOStringWithTimezone = date => {
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? '+' : '-';
  const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    diff + pad(tzOffset / 60) +
    ':' + pad(tzOffset % 60);
};

//--------------------------------


toISOStringWithTimezone(new Date()); // '2020-10-06T20:43:33-04:00'

//--------------------------------


const toOrdinalSuffix = num => {
  const int = parseInt(num),
    digits = [int % 10, int % 100],
    ordinals = ['st', 'nd', 'rd', 'th'],
    oPattern = [1, 2, 3, 4],
    tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
  return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
    ? int + ordinals[digits[0] - 1]
    : int + ordinals[3];
};

//--------------------------------


toOrdinalSuffix('123'); // '123rd'

//--------------------------------


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


const HSBToRGB = (h, s, b) => {
  s /= 100;
  b /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [255 * f(5), 255 * f(3), 255 * f(1)];
};

//--------------------------------


HSBToRGB(18, 81, 99); // [252.45, 109.31084999999996, 47.965499999999984]

//--------------------------------


const HSLToRGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

//--------------------------------


HSLToRGB(13, 100, 11); // [56.1, 12.155, 0]

//--------------------------------


const RGBToHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};

//--------------------------------


RGBToHSL(45, 23, 11); // [21.17647, 60.71428, 10.98039]

//--------------------------------


const RGBToHex = (r, g, b) =>
  ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');

//--------------------------------


RGBToHex(255, 165, 1); // 'ffa501'

//--------------------------------


const UUIDGeneratorBrowser = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );

//--------------------------------


UUIDGeneratorBrowser(); // '7982fcfe-5721-4632-bede-6000885be57d'

//--------------------------------


const crypto = require('crypto');

const UUIDGeneratorNode = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
  );

//--------------------------------


UUIDGeneratorNode(); // '79c7c136-60ee-40a2-beb2-856f1feabefc'

//--------------------------------


const approximatelyEqual = (v1, v2, epsilon = 0.001) =>
  Math.abs(v1 - v2) < epsilon;

//--------------------------------


approximatelyEqual(Math.PI / 2.0, 1.5708); // true

//--------------------------------


const arithmeticProgression  = (n, lim) =>
  Array.from({ length: Math.ceil(lim / n) }, (_, i) => (i + 1) * n );

//--------------------------------


arithmeticProgression(5, 25); // [5, 10, 15, 20, 25]

//--------------------------------


const arrayToHTMLList = (arr, listID) => 
  document.querySelector(`#${listID}`).innerHTML += arr
    .map(item => `<li>${item}</li>`)
    .join('');

//--------------------------------


arrayToHTMLList(['item 1', 'item 2'], 'myListID');

//--------------------------------


const binomialCoefficient = (n, k) => {
  if (Number.isNaN(n) || Number.isNaN(k)) return NaN;
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  if (k === 1 || k === n - 1) return n;
  if (n - k < k) k = n - k;
  let res = n;
  for (let j = 2; j <= k; j++) res *= (n - j + 1) / j;
  return Math.round(res);
};

//--------------------------------


binomialCoefficient(8, 2); // 28

//--------------------------------


const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight ||
    document.documentElement.clientHeight);

//--------------------------------


bottomVisible(); // true

//--------------------------------


const bubbleSort = arr => {
  let swapped = false;
  const a = [...arr];
  for (let i = 1; i < a.length - 1; i++) {
    swapped = false;
    for (let j = 0; j < a.length - i; j++) {
      if (a[j + 1] < a[j]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    if (!swapped) return a;
  }
  return a;
};

//--------------------------------


bubbleSort([2, 1, 4, 3]); // [1, 2, 3, 4]

//--------------------------------


const bucketSort = (arr, size = 5) => {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const buckets = Array.from(
    { length: Math.floor((max - min) / size) + 1 },
    () => []
  );
  arr.forEach(val => {
    buckets[Math.floor((val - min) / size)].push(val);
  });
  return buckets.reduce((acc, b) => [...acc, ...b.sort((a, b) => a - b)], []);
};

//--------------------------------


bucketSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const capitalizeEveryWord = str =>
  str.replace(/\b[a-z]/g, char => char.toUpperCase());

//--------------------------------


capitalizeEveryWord('hello world!'); // 'Hello World!'

//--------------------------------


const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

//--------------------------------


chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

//--------------------------------


const chunkIntoN = (arr, n) => {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}

//--------------------------------


chunkIntoN([1, 2, 3, 4, 5, 6, 7], 4); // [[1, 2], [3, 4], [5, 6], [7]]

//--------------------------------


const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

//--------------------------------


copyToClipboard('Lorem ipsum'); // 'Lorem ipsum' copied to clipboard.

//--------------------------------


const countOccurrences = (arr, val) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

//--------------------------------


countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3

//--------------------------------


const dayOfYear = date =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

//--------------------------------


dayOfYear(new Date()); // 272

//--------------------------------


const daysAgo = n => {
  let d = new Date();
  d.setDate(d.getDate() - Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysAgo(20); // 2020-09-16 (if current date is 2020-10-06)

//--------------------------------


const daysFromNow = n => {
  let d = new Date();
  d.setDate(d.getDate() + Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysFromNow(5); // 2020-10-13 (if current date is 2020-10-08)

//--------------------------------


const deepFlatten = arr =>
  [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));

//--------------------------------


deepFlatten([1, [2], [[3], 4], 5]); // [1, 2, 3, 4, 5]

//--------------------------------


const defaults = (obj, ...defs) =>
  Object.assign({}, obj, ...defs.reverse(), obj);

//--------------------------------


defaults({ a: 1 }, { b: 2 }, { b: 6 }, { a: 3 }); // { a: 1, b: 2 }

//--------------------------------


const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? 'Mobile'
    : 'Desktop';

//--------------------------------


detectDeviceType(); // 'Mobile' or 'Desktop'

//--------------------------------


const detectLanguage = (defaultLang = 'en-US') => 
  navigator.language ||
  (Array.isArray(navigator.languages) && navigator.languages[0]) ||
  defaultLang;

//--------------------------------


detectLanguage(); // 'nl-NL'

//--------------------------------


const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};

//--------------------------------


difference([1, 2, 3, 3], [1, 2, 4]); // [3, 3]

//--------------------------------


const dropRightWhile = (arr, func) => {
  let rightIndex = arr.length;
  while (rightIndex-- && !func(arr[rightIndex]));
  return arr.slice(0, rightIndex + 1);
};

//--------------------------------


dropRightWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const dropWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
  return arr;
};

//--------------------------------


dropWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const factorial = n =>
  n < 0
    ? (() => {
        throw new TypeError('Negative numbers are not allowed!');
      })()
    : n <= 1
    ? 1
    : n * factorial(n - 1);

//--------------------------------


factorial(6); // 720

//--------------------------------


const fibonacci = n =>
  Array.from({ length: n }).reduce(
    (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
    []
  );

//--------------------------------


fibonacci(6); // [0, 1, 1, 2, 3, 5]

//--------------------------------


const filterNonUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) === arr.lastIndexOf(i));

//--------------------------------


filterNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1, 3, 5]

//--------------------------------


const filterUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) !== arr.lastIndexOf(i));

//--------------------------------


filterUnique([1, 2, 2, 3, 4, 4, 5]); // [2, 4]

//--------------------------------


const flattenObject = (obj, prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}.` : '';
    if (
      typeof obj[k] === 'object' &&
      obj[k] !== null &&
      Object.keys(obj[k]).length > 0
    )
      Object.assign(acc, flattenObject(obj[k], pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});

//--------------------------------


flattenObject({ a: { b: { c: 1 } }, d: 1 }); // { 'a.b.c': 1, d: 1 }

//--------------------------------


const forEachRight = (arr, callback) =>
  arr
    .slice()
    .reverse()
    .forEach(callback);

//--------------------------------


forEachRight([1, 2, 3, 4], val => console.log(val)); // '4', '3', '2', '1'

//--------------------------------


const forOwn = (obj, fn) =>
  Object.keys(obj).forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwn({ foo: 'bar', a: 1 }, v => console.log(v)); // 'bar', 1

//--------------------------------


const forOwnRight = (obj, fn) =>
  Object.keys(obj)
    .reverse()
    .forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwnRight({ foo: 'bar', a: 1 }, v => console.log(v)); // 1, 'bar'

//--------------------------------


const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24);

//--------------------------------


getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')); // 9

//--------------------------------


const getElementsBiggerThanViewport = () => {
  const docWidth = document.documentElement.offsetWidth;
  return [...document.querySelectorAll('*')].filter(
    el => el.offsetWidth > docWidth
  );
};

//--------------------------------


getElementsBiggerThanViewport(); // <div id="ultra-wide-item" />

//--------------------------------


const getMonthsDiffBetweenDates = (dateInitial, dateFinal) =>
  Math.max(
    (dateFinal.getFullYear() - dateInitial.getFullYear()) * 12 +
      dateFinal.getMonth() -
      dateInitial.getMonth(),
    0
  );

//--------------------------------


getMonthsDiffBetweenDates(new Date('2017-12-13'), new Date('2018-04-29')); // 4

//--------------------------------


const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});

//--------------------------------


getScrollPosition(); // {x: 0, y: 200}

//--------------------------------


const getSiblings = el =>
  [...el.parentNode.childNodes].filter(node => node !== el);

//--------------------------------


getSiblings(document.querySelector('head')); // ['body']

//--------------------------------


const getType = v =>
  (v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name);

//--------------------------------


getType(new Set([1, 2, 3])); // 'Set'

//--------------------------------


const getVerticalOffset = el => {
  let offset = el.offsetTop,
    _el = el;
  while (_el.offsetParent) {
    _el = _el.offsetParent;
    offset += _el.offsetTop;
  }
  return offset;
};

//--------------------------------


getVerticalOffset('.my-element'); // 120

//--------------------------------


const hammingDistance = (num1, num2) =>
  ((num1 ^ num2).toString(2).match(/1/g) || '').length;

//--------------------------------


hammingDistance(2, 3); // 1

//--------------------------------


const haveSameContents = (a, b) => {
  for (const v of new Set([...a, ...b]))
    if (a.filter(e => e === v).length !== b.filter(e => e === v).length)
      return false;
  return true;
};

//--------------------------------


haveSameContents([1, 2, 4], [2, 4, 1]); // true

//--------------------------------


const heapsort = arr => {
  const a = [...arr];
  let l = a.length;

  const heapify = (a, i) => {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let max = i;
    if (left < l && a[left] > a[max]) max = left;
    if (right < l && a[right] > a[max]) max = right;
    if (max !== i) {
      [a[max], a[i]] = [a[i], a[max]];
      heapify(a, max);
    }
  };

  for (let i = Math.floor(l / 2); i >= 0; i -= 1) heapify(a, i);
  for (i = a.length - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    l--;
    heapify(a, 0);
  }
  return a;
};

//--------------------------------


heapsort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const initialize2DArray = (w, h, val = null) =>
  Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));

//--------------------------------


initialize2DArray(2, 2, 0); // [[0, 0], [0, 0]]

//--------------------------------


const initializeArrayWithValues = (n, val = 0) =>
  Array.from({ length: n }).fill(val);

//--------------------------------


initializeArrayWithValues(5, 2); // [2, 2, 2, 2, 2]

//--------------------------------


const insertionSort = arr =>
  arr.reduce((acc, x) => {
    if (!acc.length) return [x];
    acc.some((y, j) => {
      if (x <= y) {
        acc.splice(j, 0, x);
        return true;
      }
      if (x > y && j === acc.length - 1) {
        acc.splice(j + 1, 0, x);
        return true;
      }
      return false;
    });
    return acc;
  }, []);

//--------------------------------


insertionSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const intersection = (a, b) => {
  const s = new Set(b);
  return [...new Set(a)].filter(x => s.has(x));
};

//--------------------------------


intersection([1, 2, 3], [4, 3, 2]); // [2, 3]

//--------------------------------


const isAnagram = (str1, str2) => {
  const normalize = str =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, '')
      .split('')
      .sort()
      .join('');
  return normalize(str1) === normalize(str2);
};

//--------------------------------


isAnagram('iceman', 'cinema'); // true

//--------------------------------


const isContainedIn = (a, b) => {
  for (const v of new Set(a)) {
    if (
      !b.some(e => e === v) ||
      a.filter(e => e === v).length > b.filter(e => e === v).length
    )
      return false;
  }
  return true;
};

//--------------------------------


isContainedIn([1, 4], [2, 4, 1]); // true

//--------------------------------


const isLocalStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.localStorage.setItem(key, null);
    window.localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isLocalStorageEnabled(); // true, if localStorage is accessible

//--------------------------------


const isPrime = num => {
  const boundary = Math.floor(Math.sqrt(num));
  for (let i = 2; i <= boundary; i++) if (num % i === 0) return false;
  return num >= 2;
};

//--------------------------------


isPrime(11); // true

//--------------------------------


const isSameDate = (dateA, dateB) =>
  dateA.toISOString() === dateB.toISOString();

//--------------------------------


isSameDate(new Date(2010, 10, 20), new Date(2010, 10, 20)); // true

//--------------------------------


const isSessionStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.sessionStorage.setItem(key, null);
    window.sessionStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isSessionStorageEnabled(); // true, if sessionStorage is accessible

//--------------------------------


const kMeans = (data, k = 1) => {
  const centroids = data.slice(0, k);
  const distances = Array.from({ length: data.length }, () =>
    Array.from({ length: k }, () => 0)
  );
  const classes = Array.from({ length: data.length }, () => -1);
  let itr = true;

  while (itr) {
    itr = false;

    for (let d in data) {
      for (let c = 0; c < k; c++) {
        distances[d][c] = Math.hypot(
          ...Object.keys(data[0]).map(key => data[d][key] - centroids[c][key])
        );
      }
      const m = distances[d].indexOf(Math.min(...distances[d]));
      if (classes[d] !== m) itr = true;
      classes[d] = m;
    }

    for (let c = 0; c < k; c++) {
      centroids[c] = Array.from({ length: data[0].length }, () => 0);
      const size = data.reduce((acc, _, d) => {
        if (classes[d] === c) {
          acc++;
          for (let i in data[0]) centroids[c][i] += data[d][i];
        }
        return acc;
      }, 0);
      for (let i in data[0]) {
        centroids[c][i] = parseFloat(Number(centroids[c][i] / size).toFixed(2));
      }
    }
  }

  return classes;
};

//--------------------------------


kMeans([[0, 0], [0, 1], [1, 3], [2, 0]], 2); // [0, 1, 1, 0]

//--------------------------------


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

//--------------------------------


const randomIntArrayInRange = (min, max, n = 1) =>
  Array.from(
    { length: n },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );

//--------------------------------


randomIntArrayInRange(12, 35, 10); // [ 34, 14, 27, 17, 30, 27, 20, 26, 21, 14 ]

//--------------------------------


const randomIntegerInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

//--------------------------------


randomIntegerInRange(0, 5); // 2

//--------------------------------


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

//--------------------------------



const remove = (arr, func) =>
  Array.isArray(arr)
    ? arr.filter(func).reduce((acc, val) => {
      arr.splice(arr.indexOf(val), 1);
      return acc.concat(val);
    }, [])
    : [];

//--------------------------------


remove([1, 2, 3, 4], n => n % 2 === 0); // [2, 4]

//--------------------------------


const removeAccents = str =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

//--------------------------------


removeAccents('Antoine de Saint-Exupéry'); // 'Antoine de Saint-Exupery'

//--------------------------------


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

//--------------------------------


const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

//--------------------------------


scrollToTop(); // Smooth-scrolls to the top of the page

//--------------------------------


const sdbm = str => {
  let arr = str.split('');
  return arr.reduce(
    (hashCode, currentVal) =>
      (hashCode =
        currentVal.charCodeAt(0) +
        (hashCode << 6) +
        (hashCode << 16) -
        hashCode),
    0
  );
};

//--------------------------------


sdbm('name'); // -3521204949

//--------------------------------


const selectionSort = arr => {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    const min = a
      .slice(i + 1)
      .reduce((acc, val, j) => (val < a[acc] ? j + i + 1 : acc), i);
    if (min !== i) [a[i], a[min]] = [a[min], a[i]];
  }
  return a;
};

//--------------------------------


selectionSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const serializeCookie = (name, val) =>
  `${encodeURIComponent(name)}=${encodeURIComponent(val)}`;

//--------------------------------


serializeCookie('foo', 'bar'); // 'foo=bar'

//--------------------------------


const slugify = str =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

//--------------------------------


slugify('Hello World!'); // 'hello-world'

//--------------------------------


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

//--------------------------------


const sortedIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr.findIndex(el =>
    isDescending ? val >= fn(el) : val <= fn(el)
  );
  return index === -1 ? arr.length : index;
};

//--------------------------------


sortedIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 0

//--------------------------------


const sortedLastIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr
    .reverse()
    .findIndex(el => (isDescending ? n <= el : n >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndex([10, 20, 30, 30, 40], 30); // 4

//--------------------------------


const sortedLastIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr
    .map(fn)
    .reverse()
    .findIndex(el => (isDescending ? val <= el : val >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 1

//--------------------------------


const stringPermutations = str => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str
    .split('')
    .reduce(
      (acc, letter, i) =>
        acc.concat(
          stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(
            val => letter + val
          )
        ),
      []
    );
};

//--------------------------------


stringPermutations('abc'); // ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']

//--------------------------------


const supportsTouchEvents = () =>
  window && 'ontouchstart' in window;

//--------------------------------


supportsTouchEvents(); // true

//--------------------------------


const swapCase = str =>
  [...str]
    .map(c => (c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase()))
    .join('');

//--------------------------------


swapCase('Hello world!'); // 'hELLO WORLD!'

//--------------------------------


const takeRightUntil = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightUntil([1, 2, 3, 4], n => n < 3); // [3, 4]

//--------------------------------


const takeRightWhile = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (!fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const takeUntil = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeUntil([1, 2, 3, 4], n => n >= 3); // [1, 2]

//--------------------------------


const takeWhile = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (!fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

//--------------------------------


const toISOStringWithTimezone = date => {
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? '+' : '-';
  const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    diff + pad(tzOffset / 60) +
    ':' + pad(tzOffset % 60);
};

//--------------------------------


toISOStringWithTimezone(new Date()); // '2020-10-06T20:43:33-04:00'

//--------------------------------


const toOrdinalSuffix = num => {
  const int = parseInt(num),
    digits = [int % 10, int % 100],
    ordinals = ['st', 'nd', 'rd', 'th'],
    oPattern = [1, 2, 3, 4],
    tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
  return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
    ? int + ordinals[digits[0] - 1]
    : int + ordinals[3];
};

//--------------------------------


toOrdinalSuffix('123'); // '123rd'

//--------------------------------


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


const HSBToRGB = (h, s, b) => {
  s /= 100;
  b /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [255 * f(5), 255 * f(3), 255 * f(1)];
};

//--------------------------------


HSBToRGB(18, 81, 99); // [252.45, 109.31084999999996, 47.965499999999984]

//--------------------------------


const HSLToRGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

//--------------------------------


HSLToRGB(13, 100, 11); // [56.1, 12.155, 0]

//--------------------------------


const RGBToHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};

//--------------------------------


RGBToHSL(45, 23, 11); // [21.17647, 60.71428, 10.98039]

//--------------------------------


const RGBToHex = (r, g, b) =>
  ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');

//--------------------------------


RGBToHex(255, 165, 1); // 'ffa501'

//--------------------------------


const UUIDGeneratorBrowser = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );

//--------------------------------


UUIDGeneratorBrowser(); // '7982fcfe-5721-4632-bede-6000885be57d'

//--------------------------------


const crypto = require('crypto');

const UUIDGeneratorNode = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
  );

//--------------------------------


UUIDGeneratorNode(); // '79c7c136-60ee-40a2-beb2-856f1feabefc'

//--------------------------------


const approximatelyEqual = (v1, v2, epsilon = 0.001) =>
  Math.abs(v1 - v2) < epsilon;

//--------------------------------


approximatelyEqual(Math.PI / 2.0, 1.5708); // true

//--------------------------------


const arithmeticProgression  = (n, lim) =>
  Array.from({ length: Math.ceil(lim / n) }, (_, i) => (i + 1) * n );

//--------------------------------


arithmeticProgression(5, 25); // [5, 10, 15, 20, 25]

//--------------------------------


const arrayToHTMLList = (arr, listID) => 
  document.querySelector(`#${listID}`).innerHTML += arr
    .map(item => `<li>${item}</li>`)
    .join('');

//--------------------------------


arrayToHTMLList(['item 1', 'item 2'], 'myListID');

//--------------------------------


const binomialCoefficient = (n, k) => {
  if (Number.isNaN(n) || Number.isNaN(k)) return NaN;
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  if (k === 1 || k === n - 1) return n;
  if (n - k < k) k = n - k;
  let res = n;
  for (let j = 2; j <= k; j++) res *= (n - j + 1) / j;
  return Math.round(res);
};

//--------------------------------


binomialCoefficient(8, 2); // 28

//--------------------------------


const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight ||
    document.documentElement.clientHeight);

//--------------------------------


bottomVisible(); // true

//--------------------------------


const bubbleSort = arr => {
  let swapped = false;
  const a = [...arr];
  for (let i = 1; i < a.length - 1; i++) {
    swapped = false;
    for (let j = 0; j < a.length - i; j++) {
      if (a[j + 1] < a[j]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    if (!swapped) return a;
  }
  return a;
};

//--------------------------------


bubbleSort([2, 1, 4, 3]); // [1, 2, 3, 4]

//--------------------------------


const bucketSort = (arr, size = 5) => {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const buckets = Array.from(
    { length: Math.floor((max - min) / size) + 1 },
    () => []
  );
  arr.forEach(val => {
    buckets[Math.floor((val - min) / size)].push(val);
  });
  return buckets.reduce((acc, b) => [...acc, ...b.sort((a, b) => a - b)], []);
};

//--------------------------------


bucketSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const capitalizeEveryWord = str =>
  str.replace(/\b[a-z]/g, char => char.toUpperCase());

//--------------------------------


capitalizeEveryWord('hello world!'); // 'Hello World!'

//--------------------------------


const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

//--------------------------------


chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

//--------------------------------


const chunkIntoN = (arr, n) => {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}

//--------------------------------


chunkIntoN([1, 2, 3, 4, 5, 6, 7], 4); // [[1, 2], [3, 4], [5, 6], [7]]

//--------------------------------


const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

//--------------------------------


copyToClipboard('Lorem ipsum'); // 'Lorem ipsum' copied to clipboard.

//--------------------------------


const countOccurrences = (arr, val) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

//--------------------------------


countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3

//--------------------------------


const dayOfYear = date =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

//--------------------------------


dayOfYear(new Date()); // 272

//--------------------------------


const daysAgo = n => {
  let d = new Date();
  d.setDate(d.getDate() - Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysAgo(20); // 2020-09-16 (if current date is 2020-10-06)

//--------------------------------


const daysFromNow = n => {
  let d = new Date();
  d.setDate(d.getDate() + Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysFromNow(5); // 2020-10-13 (if current date is 2020-10-08)

//--------------------------------


const deepFlatten = arr =>
  [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));

//--------------------------------


deepFlatten([1, [2], [[3], 4], 5]); // [1, 2, 3, 4, 5]

//--------------------------------


const defaults = (obj, ...defs) =>
  Object.assign({}, obj, ...defs.reverse(), obj);

//--------------------------------


defaults({ a: 1 }, { b: 2 }, { b: 6 }, { a: 3 }); // { a: 1, b: 2 }

//--------------------------------


const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? 'Mobile'
    : 'Desktop';

//--------------------------------


detectDeviceType(); // 'Mobile' or 'Desktop'

//--------------------------------


const detectLanguage = (defaultLang = 'en-US') => 
  navigator.language ||
  (Array.isArray(navigator.languages) && navigator.languages[0]) ||
  defaultLang;

//--------------------------------


detectLanguage(); // 'nl-NL'

//--------------------------------


const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};

//--------------------------------


difference([1, 2, 3, 3], [1, 2, 4]); // [3, 3]

//--------------------------------


const dropRightWhile = (arr, func) => {
  let rightIndex = arr.length;
  while (rightIndex-- && !func(arr[rightIndex]));
  return arr.slice(0, rightIndex + 1);
};

//--------------------------------


dropRightWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const dropWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
  return arr;
};

//--------------------------------


dropWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const factorial = n =>
  n < 0
    ? (() => {
        throw new TypeError('Negative numbers are not allowed!');
      })()
    : n <= 1
    ? 1
    : n * factorial(n - 1);

//--------------------------------


factorial(6); // 720

//--------------------------------


const fibonacci = n =>
  Array.from({ length: n }).reduce(
    (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
    []
  );

//--------------------------------


fibonacci(6); // [0, 1, 1, 2, 3, 5]

//--------------------------------


const filterNonUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) === arr.lastIndexOf(i));

//--------------------------------


filterNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1, 3, 5]

//--------------------------------


const filterUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) !== arr.lastIndexOf(i));

//--------------------------------


filterUnique([1, 2, 2, 3, 4, 4, 5]); // [2, 4]

//--------------------------------


const flattenObject = (obj, prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}.` : '';
    if (
      typeof obj[k] === 'object' &&
      obj[k] !== null &&
      Object.keys(obj[k]).length > 0
    )
      Object.assign(acc, flattenObject(obj[k], pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});

//--------------------------------


flattenObject({ a: { b: { c: 1 } }, d: 1 }); // { 'a.b.c': 1, d: 1 }

//--------------------------------


const forEachRight = (arr, callback) =>
  arr
    .slice()
    .reverse()
    .forEach(callback);

//--------------------------------


forEachRight([1, 2, 3, 4], val => console.log(val)); // '4', '3', '2', '1'

//--------------------------------


const forOwn = (obj, fn) =>
  Object.keys(obj).forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwn({ foo: 'bar', a: 1 }, v => console.log(v)); // 'bar', 1

//--------------------------------


const forOwnRight = (obj, fn) =>
  Object.keys(obj)
    .reverse()
    .forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwnRight({ foo: 'bar', a: 1 }, v => console.log(v)); // 1, 'bar'

//--------------------------------


const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24);

//--------------------------------


getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')); // 9

//--------------------------------


const getElementsBiggerThanViewport = () => {
  const docWidth = document.documentElement.offsetWidth;
  return [...document.querySelectorAll('*')].filter(
    el => el.offsetWidth > docWidth
  );
};

//--------------------------------


getElementsBiggerThanViewport(); // <div id="ultra-wide-item" />

//--------------------------------


const getMonthsDiffBetweenDates = (dateInitial, dateFinal) =>
  Math.max(
    (dateFinal.getFullYear() - dateInitial.getFullYear()) * 12 +
      dateFinal.getMonth() -
      dateInitial.getMonth(),
    0
  );

//--------------------------------


getMonthsDiffBetweenDates(new Date('2017-12-13'), new Date('2018-04-29')); // 4

//--------------------------------


const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});

//--------------------------------


getScrollPosition(); // {x: 0, y: 200}

//--------------------------------


const getSiblings = el =>
  [...el.parentNode.childNodes].filter(node => node !== el);

//--------------------------------


getSiblings(document.querySelector('head')); // ['body']

//--------------------------------


const getType = v =>
  (v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name);

//--------------------------------


getType(new Set([1, 2, 3])); // 'Set'

//--------------------------------


const getVerticalOffset = el => {
  let offset = el.offsetTop,
    _el = el;
  while (_el.offsetParent) {
    _el = _el.offsetParent;
    offset += _el.offsetTop;
  }
  return offset;
};

//--------------------------------


getVerticalOffset('.my-element'); // 120

//--------------------------------


const hammingDistance = (num1, num2) =>
  ((num1 ^ num2).toString(2).match(/1/g) || '').length;

//--------------------------------


hammingDistance(2, 3); // 1

//--------------------------------


const haveSameContents = (a, b) => {
  for (const v of new Set([...a, ...b]))
    if (a.filter(e => e === v).length !== b.filter(e => e === v).length)
      return false;
  return true;
};

//--------------------------------


haveSameContents([1, 2, 4], [2, 4, 1]); // true

//--------------------------------


const heapsort = arr => {
  const a = [...arr];
  let l = a.length;

  const heapify = (a, i) => {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let max = i;
    if (left < l && a[left] > a[max]) max = left;
    if (right < l && a[right] > a[max]) max = right;
    if (max !== i) {
      [a[max], a[i]] = [a[i], a[max]];
      heapify(a, max);
    }
  };

  for (let i = Math.floor(l / 2); i >= 0; i -= 1) heapify(a, i);
  for (i = a.length - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    l--;
    heapify(a, 0);
  }
  return a;
};

//--------------------------------


heapsort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const initialize2DArray = (w, h, val = null) =>
  Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));

//--------------------------------


initialize2DArray(2, 2, 0); // [[0, 0], [0, 0]]

//--------------------------------


const initializeArrayWithValues = (n, val = 0) =>
  Array.from({ length: n }).fill(val);

//--------------------------------


initializeArrayWithValues(5, 2); // [2, 2, 2, 2, 2]

//--------------------------------


const insertionSort = arr =>
  arr.reduce((acc, x) => {
    if (!acc.length) return [x];
    acc.some((y, j) => {
      if (x <= y) {
        acc.splice(j, 0, x);
        return true;
      }
      if (x > y && j === acc.length - 1) {
        acc.splice(j + 1, 0, x);
        return true;
      }
      return false;
    });
    return acc;
  }, []);

//--------------------------------


insertionSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const intersection = (a, b) => {
  const s = new Set(b);
  return [...new Set(a)].filter(x => s.has(x));
};

//--------------------------------


intersection([1, 2, 3], [4, 3, 2]); // [2, 3]

//--------------------------------


const isAnagram = (str1, str2) => {
  const normalize = str =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, '')
      .split('')
      .sort()
      .join('');
  return normalize(str1) === normalize(str2);
};

//--------------------------------


isAnagram('iceman', 'cinema'); // true

//--------------------------------


const isContainedIn = (a, b) => {
  for (const v of new Set(a)) {
    if (
      !b.some(e => e === v) ||
      a.filter(e => e === v).length > b.filter(e => e === v).length
    )
      return false;
  }
  return true;
};

//--------------------------------


isContainedIn([1, 4], [2, 4, 1]); // true

//--------------------------------


const isLocalStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.localStorage.setItem(key, null);
    window.localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isLocalStorageEnabled(); // true, if localStorage is accessible

//--------------------------------


const isPrime = num => {
  const boundary = Math.floor(Math.sqrt(num));
  for (let i = 2; i <= boundary; i++) if (num % i === 0) return false;
  return num >= 2;
};

//--------------------------------


isPrime(11); // true

//--------------------------------


const isSameDate = (dateA, dateB) =>
  dateA.toISOString() === dateB.toISOString();

//--------------------------------


isSameDate(new Date(2010, 10, 20), new Date(2010, 10, 20)); // true

//--------------------------------


const isSessionStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.sessionStorage.setItem(key, null);
    window.sessionStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isSessionStorageEnabled(); // true, if sessionStorage is accessible

//--------------------------------


const kMeans = (data, k = 1) => {
  const centroids = data.slice(0, k);
  const distances = Array.from({ length: data.length }, () =>
    Array.from({ length: k }, () => 0)
  );
  const classes = Array.from({ length: data.length }, () => -1);
  let itr = true;

  while (itr) {
    itr = false;

    for (let d in data) {
      for (let c = 0; c < k; c++) {
        distances[d][c] = Math.hypot(
          ...Object.keys(data[0]).map(key => data[d][key] - centroids[c][key])
        );
      }
      const m = distances[d].indexOf(Math.min(...distances[d]));
      if (classes[d] !== m) itr = true;
      classes[d] = m;
    }

    for (let c = 0; c < k; c++) {
      centroids[c] = Array.from({ length: data[0].length }, () => 0);
      const size = data.reduce((acc, _, d) => {
        if (classes[d] === c) {
          acc++;
          for (let i in data[0]) centroids[c][i] += data[d][i];
        }
        return acc;
      }, 0);
      for (let i in data[0]) {
        centroids[c][i] = parseFloat(Number(centroids[c][i] / size).toFixed(2));
      }
    }
  }

  return classes;
};

//--------------------------------


kMeans([[0, 0], [0, 1], [1, 3], [2, 0]], 2); // [0, 1, 1, 0]

//--------------------------------


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

//--------------------------------


const randomIntArrayInRange = (min, max, n = 1) =>
  Array.from(
    { length: n },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );

//--------------------------------


randomIntArrayInRange(12, 35, 10); // [ 34, 14, 27, 17, 30, 27, 20, 26, 21, 14 ]

//--------------------------------


const randomIntegerInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

//--------------------------------


randomIntegerInRange(0, 5); // 2

//--------------------------------


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

//--------------------------------



const remove = (arr, func) =>
  Array.isArray(arr)
    ? arr.filter(func).reduce((acc, val) => {
      arr.splice(arr.indexOf(val), 1);
      return acc.concat(val);
    }, [])
    : [];

//--------------------------------


remove([1, 2, 3, 4], n => n % 2 === 0); // [2, 4]

//--------------------------------


const removeAccents = str =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

//--------------------------------


removeAccents('Antoine de Saint-Exupéry'); // 'Antoine de Saint-Exupery'

//--------------------------------


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

//--------------------------------


const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

//--------------------------------


scrollToTop(); // Smooth-scrolls to the top of the page

//--------------------------------


const sdbm = str => {
  let arr = str.split('');
  return arr.reduce(
    (hashCode, currentVal) =>
      (hashCode =
        currentVal.charCodeAt(0) +
        (hashCode << 6) +
        (hashCode << 16) -
        hashCode),
    0
  );
};

//--------------------------------


sdbm('name'); // -3521204949

//--------------------------------


const selectionSort = arr => {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    const min = a
      .slice(i + 1)
      .reduce((acc, val, j) => (val < a[acc] ? j + i + 1 : acc), i);
    if (min !== i) [a[i], a[min]] = [a[min], a[i]];
  }
  return a;
};

//--------------------------------


selectionSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const serializeCookie = (name, val) =>
  `${encodeURIComponent(name)}=${encodeURIComponent(val)}`;

//--------------------------------


serializeCookie('foo', 'bar'); // 'foo=bar'

//--------------------------------


const slugify = str =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

//--------------------------------


slugify('Hello World!'); // 'hello-world'

//--------------------------------


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

//--------------------------------


const sortedIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr.findIndex(el =>
    isDescending ? val >= fn(el) : val <= fn(el)
  );
  return index === -1 ? arr.length : index;
};

//--------------------------------


sortedIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 0

//--------------------------------


const sortedLastIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr
    .reverse()
    .findIndex(el => (isDescending ? n <= el : n >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndex([10, 20, 30, 30, 40], 30); // 4

//--------------------------------


const sortedLastIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr
    .map(fn)
    .reverse()
    .findIndex(el => (isDescending ? val <= el : val >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 1

//--------------------------------


const stringPermutations = str => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str
    .split('')
    .reduce(
      (acc, letter, i) =>
        acc.concat(
          stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(
            val => letter + val
          )
        ),
      []
    );
};

//--------------------------------


stringPermutations('abc'); // ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']

//--------------------------------


const supportsTouchEvents = () =>
  window && 'ontouchstart' in window;

//--------------------------------


supportsTouchEvents(); // true

//--------------------------------


const swapCase = str =>
  [...str]
    .map(c => (c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase()))
    .join('');

//--------------------------------


swapCase('Hello world!'); // 'hELLO WORLD!'

//--------------------------------


const takeRightUntil = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightUntil([1, 2, 3, 4], n => n < 3); // [3, 4]

//--------------------------------


const takeRightWhile = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (!fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const takeUntil = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeUntil([1, 2, 3, 4], n => n >= 3); // [1, 2]

//--------------------------------


const takeWhile = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (!fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

//--------------------------------


const toISOStringWithTimezone = date => {
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? '+' : '-';
  const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    diff + pad(tzOffset / 60) +
    ':' + pad(tzOffset % 60);
};

//--------------------------------


toISOStringWithTimezone(new Date()); // '2020-10-06T20:43:33-04:00'

//--------------------------------


const toOrdinalSuffix = num => {
  const int = parseInt(num),
    digits = [int % 10, int % 100],
    ordinals = ['st', 'nd', 'rd', 'th'],
    oPattern = [1, 2, 3, 4],
    tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
  return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
    ? int + ordinals[digits[0] - 1]
    : int + ordinals[3];
};

//--------------------------------


toOrdinalSuffix('123'); // '123rd'

//--------------------------------


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


const HSBToRGB = (h, s, b) => {
  s /= 100;
  b /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [255 * f(5), 255 * f(3), 255 * f(1)];
};

//--------------------------------


HSBToRGB(18, 81, 99); // [252.45, 109.31084999999996, 47.965499999999984]

//--------------------------------


const HSLToRGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

//--------------------------------


HSLToRGB(13, 100, 11); // [56.1, 12.155, 0]

//--------------------------------


const RGBToHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};

//--------------------------------


RGBToHSL(45, 23, 11); // [21.17647, 60.71428, 10.98039]

//--------------------------------


const RGBToHex = (r, g, b) =>
  ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');

//--------------------------------


RGBToHex(255, 165, 1); // 'ffa501'

//--------------------------------


const UUIDGeneratorBrowser = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );

//--------------------------------


UUIDGeneratorBrowser(); // '7982fcfe-5721-4632-bede-6000885be57d'

//--------------------------------


const crypto = require('crypto');

const UUIDGeneratorNode = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
  );

//--------------------------------


UUIDGeneratorNode(); // '79c7c136-60ee-40a2-beb2-856f1feabefc'

//--------------------------------


const approximatelyEqual = (v1, v2, epsilon = 0.001) =>
  Math.abs(v1 - v2) < epsilon;

//--------------------------------


approximatelyEqual(Math.PI / 2.0, 1.5708); // true

//--------------------------------


const arithmeticProgression  = (n, lim) =>
  Array.from({ length: Math.ceil(lim / n) }, (_, i) => (i + 1) * n );

//--------------------------------


arithmeticProgression(5, 25); // [5, 10, 15, 20, 25]

//--------------------------------


const arrayToHTMLList = (arr, listID) => 
  document.querySelector(`#${listID}`).innerHTML += arr
    .map(item => `<li>${item}</li>`)
    .join('');

//--------------------------------


arrayToHTMLList(['item 1', 'item 2'], 'myListID');

//--------------------------------


const binomialCoefficient = (n, k) => {
  if (Number.isNaN(n) || Number.isNaN(k)) return NaN;
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  if (k === 1 || k === n - 1) return n;
  if (n - k < k) k = n - k;
  let res = n;
  for (let j = 2; j <= k; j++) res *= (n - j + 1) / j;
  return Math.round(res);
};

//--------------------------------


binomialCoefficient(8, 2); // 28

//--------------------------------


const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight ||
    document.documentElement.clientHeight);

//--------------------------------


bottomVisible(); // true

//--------------------------------


const bubbleSort = arr => {
  let swapped = false;
  const a = [...arr];
  for (let i = 1; i < a.length - 1; i++) {
    swapped = false;
    for (let j = 0; j < a.length - i; j++) {
      if (a[j + 1] < a[j]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    if (!swapped) return a;
  }
  return a;
};

//--------------------------------


bubbleSort([2, 1, 4, 3]); // [1, 2, 3, 4]

//--------------------------------


const bucketSort = (arr, size = 5) => {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const buckets = Array.from(
    { length: Math.floor((max - min) / size) + 1 },
    () => []
  );
  arr.forEach(val => {
    buckets[Math.floor((val - min) / size)].push(val);
  });
  return buckets.reduce((acc, b) => [...acc, ...b.sort((a, b) => a - b)], []);
};

//--------------------------------


bucketSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const capitalizeEveryWord = str =>
  str.replace(/\b[a-z]/g, char => char.toUpperCase());

//--------------------------------


capitalizeEveryWord('hello world!'); // 'Hello World!'

//--------------------------------


const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

//--------------------------------


chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

//--------------------------------


const chunkIntoN = (arr, n) => {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}

//--------------------------------


chunkIntoN([1, 2, 3, 4, 5, 6, 7], 4); // [[1, 2], [3, 4], [5, 6], [7]]

//--------------------------------


const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

//--------------------------------


copyToClipboard('Lorem ipsum'); // 'Lorem ipsum' copied to clipboard.

//--------------------------------


const countOccurrences = (arr, val) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

//--------------------------------


countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3

//--------------------------------


const dayOfYear = date =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

//--------------------------------


dayOfYear(new Date()); // 272

//--------------------------------


const daysAgo = n => {
  let d = new Date();
  d.setDate(d.getDate() - Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysAgo(20); // 2020-09-16 (if current date is 2020-10-06)

//--------------------------------


const daysFromNow = n => {
  let d = new Date();
  d.setDate(d.getDate() + Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysFromNow(5); // 2020-10-13 (if current date is 2020-10-08)

//--------------------------------


const deepFlatten = arr =>
  [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));

//--------------------------------


deepFlatten([1, [2], [[3], 4], 5]); // [1, 2, 3, 4, 5]

//--------------------------------


const defaults = (obj, ...defs) =>
  Object.assign({}, obj, ...defs.reverse(), obj);

//--------------------------------


defaults({ a: 1 }, { b: 2 }, { b: 6 }, { a: 3 }); // { a: 1, b: 2 }

//--------------------------------


const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? 'Mobile'
    : 'Desktop';

//--------------------------------


detectDeviceType(); // 'Mobile' or 'Desktop'

//--------------------------------


const detectLanguage = (defaultLang = 'en-US') => 
  navigator.language ||
  (Array.isArray(navigator.languages) && navigator.languages[0]) ||
  defaultLang;

//--------------------------------


detectLanguage(); // 'nl-NL'

//--------------------------------


const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};

//--------------------------------


difference([1, 2, 3, 3], [1, 2, 4]); // [3, 3]

//--------------------------------


const dropRightWhile = (arr, func) => {
  let rightIndex = arr.length;
  while (rightIndex-- && !func(arr[rightIndex]));
  return arr.slice(0, rightIndex + 1);
};

//--------------------------------


dropRightWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const dropWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
  return arr;
};

//--------------------------------


dropWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const factorial = n =>
  n < 0
    ? (() => {
        throw new TypeError('Negative numbers are not allowed!');
      })()
    : n <= 1
    ? 1
    : n * factorial(n - 1);

//--------------------------------


factorial(6); // 720

//--------------------------------


const fibonacci = n =>
  Array.from({ length: n }).reduce(
    (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
    []
  );

//--------------------------------


fibonacci(6); // [0, 1, 1, 2, 3, 5]

//--------------------------------


const filterNonUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) === arr.lastIndexOf(i));

//--------------------------------


filterNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1, 3, 5]

//--------------------------------


const filterUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) !== arr.lastIndexOf(i));

//--------------------------------


filterUnique([1, 2, 2, 3, 4, 4, 5]); // [2, 4]

//--------------------------------


const flattenObject = (obj, prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}.` : '';
    if (
      typeof obj[k] === 'object' &&
      obj[k] !== null &&
      Object.keys(obj[k]).length > 0
    )
      Object.assign(acc, flattenObject(obj[k], pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});

//--------------------------------


flattenObject({ a: { b: { c: 1 } }, d: 1 }); // { 'a.b.c': 1, d: 1 }

//--------------------------------


const forEachRight = (arr, callback) =>
  arr
    .slice()
    .reverse()
    .forEach(callback);

//--------------------------------


forEachRight([1, 2, 3, 4], val => console.log(val)); // '4', '3', '2', '1'

//--------------------------------


const forOwn = (obj, fn) =>
  Object.keys(obj).forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwn({ foo: 'bar', a: 1 }, v => console.log(v)); // 'bar', 1

//--------------------------------


const forOwnRight = (obj, fn) =>
  Object.keys(obj)
    .reverse()
    .forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwnRight({ foo: 'bar', a: 1 }, v => console.log(v)); // 1, 'bar'

//--------------------------------


const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24);

//--------------------------------


getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')); // 9

//--------------------------------


const getElementsBiggerThanViewport = () => {
  const docWidth = document.documentElement.offsetWidth;
  return [...document.querySelectorAll('*')].filter(
    el => el.offsetWidth > docWidth
  );
};

//--------------------------------


getElementsBiggerThanViewport(); // <div id="ultra-wide-item" />

//--------------------------------


const getMonthsDiffBetweenDates = (dateInitial, dateFinal) =>
  Math.max(
    (dateFinal.getFullYear() - dateInitial.getFullYear()) * 12 +
      dateFinal.getMonth() -
      dateInitial.getMonth(),
    0
  );

//--------------------------------


getMonthsDiffBetweenDates(new Date('2017-12-13'), new Date('2018-04-29')); // 4

//--------------------------------


const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});

//--------------------------------


getScrollPosition(); // {x: 0, y: 200}

//--------------------------------


const getSiblings = el =>
  [...el.parentNode.childNodes].filter(node => node !== el);

//--------------------------------


getSiblings(document.querySelector('head')); // ['body']

//--------------------------------


const getType = v =>
  (v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name);

//--------------------------------


getType(new Set([1, 2, 3])); // 'Set'

//--------------------------------


const getVerticalOffset = el => {
  let offset = el.offsetTop,
    _el = el;
  while (_el.offsetParent) {
    _el = _el.offsetParent;
    offset += _el.offsetTop;
  }
  return offset;
};

//--------------------------------


getVerticalOffset('.my-element'); // 120

//--------------------------------


const hammingDistance = (num1, num2) =>
  ((num1 ^ num2).toString(2).match(/1/g) || '').length;

//--------------------------------


hammingDistance(2, 3); // 1

//--------------------------------


const haveSameContents = (a, b) => {
  for (const v of new Set([...a, ...b]))
    if (a.filter(e => e === v).length !== b.filter(e => e === v).length)
      return false;
  return true;
};

//--------------------------------


haveSameContents([1, 2, 4], [2, 4, 1]); // true

//--------------------------------


const heapsort = arr => {
  const a = [...arr];
  let l = a.length;

  const heapify = (a, i) => {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let max = i;
    if (left < l && a[left] > a[max]) max = left;
    if (right < l && a[right] > a[max]) max = right;
    if (max !== i) {
      [a[max], a[i]] = [a[i], a[max]];
      heapify(a, max);
    }
  };

  for (let i = Math.floor(l / 2); i >= 0; i -= 1) heapify(a, i);
  for (i = a.length - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    l--;
    heapify(a, 0);
  }
  return a;
};

//--------------------------------


heapsort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const initialize2DArray = (w, h, val = null) =>
  Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));

//--------------------------------


initialize2DArray(2, 2, 0); // [[0, 0], [0, 0]]

//--------------------------------


const initializeArrayWithValues = (n, val = 0) =>
  Array.from({ length: n }).fill(val);

//--------------------------------


initializeArrayWithValues(5, 2); // [2, 2, 2, 2, 2]

//--------------------------------


const insertionSort = arr =>
  arr.reduce((acc, x) => {
    if (!acc.length) return [x];
    acc.some((y, j) => {
      if (x <= y) {
        acc.splice(j, 0, x);
        return true;
      }
      if (x > y && j === acc.length - 1) {
        acc.splice(j + 1, 0, x);
        return true;
      }
      return false;
    });
    return acc;
  }, []);

//--------------------------------


insertionSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const intersection = (a, b) => {
  const s = new Set(b);
  return [...new Set(a)].filter(x => s.has(x));
};

//--------------------------------


intersection([1, 2, 3], [4, 3, 2]); // [2, 3]

//--------------------------------


const isAnagram = (str1, str2) => {
  const normalize = str =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, '')
      .split('')
      .sort()
      .join('');
  return normalize(str1) === normalize(str2);
};

//--------------------------------


isAnagram('iceman', 'cinema'); // true

//--------------------------------


const isContainedIn = (a, b) => {
  for (const v of new Set(a)) {
    if (
      !b.some(e => e === v) ||
      a.filter(e => e === v).length > b.filter(e => e === v).length
    )
      return false;
  }
  return true;
};

//--------------------------------


isContainedIn([1, 4], [2, 4, 1]); // true

//--------------------------------


const isLocalStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.localStorage.setItem(key, null);
    window.localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isLocalStorageEnabled(); // true, if localStorage is accessible

//--------------------------------


const isPrime = num => {
  const boundary = Math.floor(Math.sqrt(num));
  for (let i = 2; i <= boundary; i++) if (num % i === 0) return false;
  return num >= 2;
};

//--------------------------------


isPrime(11); // true

//--------------------------------


const isSameDate = (dateA, dateB) =>
  dateA.toISOString() === dateB.toISOString();

//--------------------------------


isSameDate(new Date(2010, 10, 20), new Date(2010, 10, 20)); // true

//--------------------------------


const isSessionStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.sessionStorage.setItem(key, null);
    window.sessionStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isSessionStorageEnabled(); // true, if sessionStorage is accessible

//--------------------------------


const kMeans = (data, k = 1) => {
  const centroids = data.slice(0, k);
  const distances = Array.from({ length: data.length }, () =>
    Array.from({ length: k }, () => 0)
  );
  const classes = Array.from({ length: data.length }, () => -1);
  let itr = true;

  while (itr) {
    itr = false;

    for (let d in data) {
      for (let c = 0; c < k; c++) {
        distances[d][c] = Math.hypot(
          ...Object.keys(data[0]).map(key => data[d][key] - centroids[c][key])
        );
      }
      const m = distances[d].indexOf(Math.min(...distances[d]));
      if (classes[d] !== m) itr = true;
      classes[d] = m;
    }

    for (let c = 0; c < k; c++) {
      centroids[c] = Array.from({ length: data[0].length }, () => 0);
      const size = data.reduce((acc, _, d) => {
        if (classes[d] === c) {
          acc++;
          for (let i in data[0]) centroids[c][i] += data[d][i];
        }
        return acc;
      }, 0);
      for (let i in data[0]) {
        centroids[c][i] = parseFloat(Number(centroids[c][i] / size).toFixed(2));
      }
    }
  }

  return classes;
};

//--------------------------------


kMeans([[0, 0], [0, 1], [1, 3], [2, 0]], 2); // [0, 1, 1, 0]

//--------------------------------


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

//--------------------------------


const randomIntArrayInRange = (min, max, n = 1) =>
  Array.from(
    { length: n },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );

//--------------------------------


randomIntArrayInRange(12, 35, 10); // [ 34, 14, 27, 17, 30, 27, 20, 26, 21, 14 ]

//--------------------------------


const randomIntegerInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

//--------------------------------


randomIntegerInRange(0, 5); // 2

//--------------------------------


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

//--------------------------------



const remove = (arr, func) =>
  Array.isArray(arr)
    ? arr.filter(func).reduce((acc, val) => {
      arr.splice(arr.indexOf(val), 1);
      return acc.concat(val);
    }, [])
    : [];

//--------------------------------


remove([1, 2, 3, 4], n => n % 2 === 0); // [2, 4]

//--------------------------------


const removeAccents = str =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

//--------------------------------


removeAccents('Antoine de Saint-Exupéry'); // 'Antoine de Saint-Exupery'

//--------------------------------


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

//--------------------------------


const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

//--------------------------------


scrollToTop(); // Smooth-scrolls to the top of the page

//--------------------------------


const sdbm = str => {
  let arr = str.split('');
  return arr.reduce(
    (hashCode, currentVal) =>
      (hashCode =
        currentVal.charCodeAt(0) +
        (hashCode << 6) +
        (hashCode << 16) -
        hashCode),
    0
  );
};

//--------------------------------


sdbm('name'); // -3521204949

//--------------------------------


const selectionSort = arr => {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    const min = a
      .slice(i + 1)
      .reduce((acc, val, j) => (val < a[acc] ? j + i + 1 : acc), i);
    if (min !== i) [a[i], a[min]] = [a[min], a[i]];
  }
  return a;
};

//--------------------------------


selectionSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const serializeCookie = (name, val) =>
  `${encodeURIComponent(name)}=${encodeURIComponent(val)}`;

//--------------------------------


serializeCookie('foo', 'bar'); // 'foo=bar'

//--------------------------------


const slugify = str =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

//--------------------------------


slugify('Hello World!'); // 'hello-world'

//--------------------------------


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

//--------------------------------


const sortedIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr.findIndex(el =>
    isDescending ? val >= fn(el) : val <= fn(el)
  );
  return index === -1 ? arr.length : index;
};

//--------------------------------


sortedIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 0

//--------------------------------


const sortedLastIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr
    .reverse()
    .findIndex(el => (isDescending ? n <= el : n >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndex([10, 20, 30, 30, 40], 30); // 4

//--------------------------------


const sortedLastIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr
    .map(fn)
    .reverse()
    .findIndex(el => (isDescending ? val <= el : val >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 1

//--------------------------------


const stringPermutations = str => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str
    .split('')
    .reduce(
      (acc, letter, i) =>
        acc.concat(
          stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(
            val => letter + val
          )
        ),
      []
    );
};

//--------------------------------


stringPermutations('abc'); // ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']

//--------------------------------


const supportsTouchEvents = () =>
  window && 'ontouchstart' in window;

//--------------------------------


supportsTouchEvents(); // true

//--------------------------------


const swapCase = str =>
  [...str]
    .map(c => (c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase()))
    .join('');

//--------------------------------


swapCase('Hello world!'); // 'hELLO WORLD!'

//--------------------------------


const takeRightUntil = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightUntil([1, 2, 3, 4], n => n < 3); // [3, 4]

//--------------------------------


const takeRightWhile = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (!fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const takeUntil = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeUntil([1, 2, 3, 4], n => n >= 3); // [1, 2]

//--------------------------------


const takeWhile = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (!fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

//--------------------------------


const toISOStringWithTimezone = date => {
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? '+' : '-';
  const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    diff + pad(tzOffset / 60) +
    ':' + pad(tzOffset % 60);
};

//--------------------------------


toISOStringWithTimezone(new Date()); // '2020-10-06T20:43:33-04:00'

//--------------------------------


const toOrdinalSuffix = num => {
  const int = parseInt(num),
    digits = [int % 10, int % 100],
    ordinals = ['st', 'nd', 'rd', 'th'],
    oPattern = [1, 2, 3, 4],
    tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
  return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
    ? int + ordinals[digits[0] - 1]
    : int + ordinals[3];
};

//--------------------------------


toOrdinalSuffix('123'); // '123rd'

//--------------------------------


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


const HSBToRGB = (h, s, b) => {
  s /= 100;
  b /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [255 * f(5), 255 * f(3), 255 * f(1)];
};

//--------------------------------


HSBToRGB(18, 81, 99); // [252.45, 109.31084999999996, 47.965499999999984]

//--------------------------------


const HSLToRGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

//--------------------------------


HSLToRGB(13, 100, 11); // [56.1, 12.155, 0]

//--------------------------------


const RGBToHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};

//--------------------------------


RGBToHSL(45, 23, 11); // [21.17647, 60.71428, 10.98039]

//--------------------------------


const RGBToHex = (r, g, b) =>
  ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');

//--------------------------------


RGBToHex(255, 165, 1); // 'ffa501'

//--------------------------------


const UUIDGeneratorBrowser = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );

//--------------------------------


UUIDGeneratorBrowser(); // '7982fcfe-5721-4632-bede-6000885be57d'

//--------------------------------


const crypto = require('crypto');

const UUIDGeneratorNode = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
  );

//--------------------------------


UUIDGeneratorNode(); // '79c7c136-60ee-40a2-beb2-856f1feabefc'

//--------------------------------


const approximatelyEqual = (v1, v2, epsilon = 0.001) =>
  Math.abs(v1 - v2) < epsilon;

//--------------------------------


approximatelyEqual(Math.PI / 2.0, 1.5708); // true

//--------------------------------


const arithmeticProgression  = (n, lim) =>
  Array.from({ length: Math.ceil(lim / n) }, (_, i) => (i + 1) * n );

//--------------------------------


arithmeticProgression(5, 25); // [5, 10, 15, 20, 25]

//--------------------------------


const arrayToHTMLList = (arr, listID) => 
  document.querySelector(`#${listID}`).innerHTML += arr
    .map(item => `<li>${item}</li>`)
    .join('');

//--------------------------------


arrayToHTMLList(['item 1', 'item 2'], 'myListID');

//--------------------------------


const binomialCoefficient = (n, k) => {
  if (Number.isNaN(n) || Number.isNaN(k)) return NaN;
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  if (k === 1 || k === n - 1) return n;
  if (n - k < k) k = n - k;
  let res = n;
  for (let j = 2; j <= k; j++) res *= (n - j + 1) / j;
  return Math.round(res);
};

//--------------------------------


binomialCoefficient(8, 2); // 28

//--------------------------------


const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight ||
    document.documentElement.clientHeight);

//--------------------------------


bottomVisible(); // true

//--------------------------------


const bubbleSort = arr => {
  let swapped = false;
  const a = [...arr];
  for (let i = 1; i < a.length - 1; i++) {
    swapped = false;
    for (let j = 0; j < a.length - i; j++) {
      if (a[j + 1] < a[j]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    if (!swapped) return a;
  }
  return a;
};

//--------------------------------


bubbleSort([2, 1, 4, 3]); // [1, 2, 3, 4]

//--------------------------------


const bucketSort = (arr, size = 5) => {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const buckets = Array.from(
    { length: Math.floor((max - min) / size) + 1 },
    () => []
  );
  arr.forEach(val => {
    buckets[Math.floor((val - min) / size)].push(val);
  });
  return buckets.reduce((acc, b) => [...acc, ...b.sort((a, b) => a - b)], []);
};

//--------------------------------


bucketSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const capitalizeEveryWord = str =>
  str.replace(/\b[a-z]/g, char => char.toUpperCase());

//--------------------------------


capitalizeEveryWord('hello world!'); // 'Hello World!'

//--------------------------------


const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

//--------------------------------


chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

//--------------------------------


const chunkIntoN = (arr, n) => {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}

//--------------------------------


chunkIntoN([1, 2, 3, 4, 5, 6, 7], 4); // [[1, 2], [3, 4], [5, 6], [7]]

//--------------------------------


const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

//--------------------------------


copyToClipboard('Lorem ipsum'); // 'Lorem ipsum' copied to clipboard.

//--------------------------------


const countOccurrences = (arr, val) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

//--------------------------------


countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3

//--------------------------------


const dayOfYear = date =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

//--------------------------------


dayOfYear(new Date()); // 272

//--------------------------------


const daysAgo = n => {
  let d = new Date();
  d.setDate(d.getDate() - Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysAgo(20); // 2020-09-16 (if current date is 2020-10-06)

//--------------------------------


const daysFromNow = n => {
  let d = new Date();
  d.setDate(d.getDate() + Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysFromNow(5); // 2020-10-13 (if current date is 2020-10-08)

//--------------------------------


const deepFlatten = arr =>
  [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));

//--------------------------------


deepFlatten([1, [2], [[3], 4], 5]); // [1, 2, 3, 4, 5]

//--------------------------------


const defaults = (obj, ...defs) =>
  Object.assign({}, obj, ...defs.reverse(), obj);

//--------------------------------


defaults({ a: 1 }, { b: 2 }, { b: 6 }, { a: 3 }); // { a: 1, b: 2 }

//--------------------------------


const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? 'Mobile'
    : 'Desktop';

//--------------------------------


detectDeviceType(); // 'Mobile' or 'Desktop'

//--------------------------------


const detectLanguage = (defaultLang = 'en-US') => 
  navigator.language ||
  (Array.isArray(navigator.languages) && navigator.languages[0]) ||
  defaultLang;

//--------------------------------


detectLanguage(); // 'nl-NL'

//--------------------------------


const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};

//--------------------------------


difference([1, 2, 3, 3], [1, 2, 4]); // [3, 3]

//--------------------------------


const dropRightWhile = (arr, func) => {
  let rightIndex = arr.length;
  while (rightIndex-- && !func(arr[rightIndex]));
  return arr.slice(0, rightIndex + 1);
};

//--------------------------------


dropRightWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const dropWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
  return arr;
};

//--------------------------------


dropWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const factorial = n =>
  n < 0
    ? (() => {
        throw new TypeError('Negative numbers are not allowed!');
      })()
    : n <= 1
    ? 1
    : n * factorial(n - 1);

//--------------------------------


factorial(6); // 720

//--------------------------------


const fibonacci = n =>
  Array.from({ length: n }).reduce(
    (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
    []
  );

//--------------------------------


fibonacci(6); // [0, 1, 1, 2, 3, 5]

//--------------------------------


const filterNonUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) === arr.lastIndexOf(i));

//--------------------------------


filterNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1, 3, 5]

//--------------------------------


const filterUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) !== arr.lastIndexOf(i));

//--------------------------------


filterUnique([1, 2, 2, 3, 4, 4, 5]); // [2, 4]

//--------------------------------


const flattenObject = (obj, prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}.` : '';
    if (
      typeof obj[k] === 'object' &&
      obj[k] !== null &&
      Object.keys(obj[k]).length > 0
    )
      Object.assign(acc, flattenObject(obj[k], pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});

//--------------------------------


flattenObject({ a: { b: { c: 1 } }, d: 1 }); // { 'a.b.c': 1, d: 1 }

//--------------------------------


const forEachRight = (arr, callback) =>
  arr
    .slice()
    .reverse()
    .forEach(callback);

//--------------------------------


forEachRight([1, 2, 3, 4], val => console.log(val)); // '4', '3', '2', '1'

//--------------------------------


const forOwn = (obj, fn) =>
  Object.keys(obj).forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwn({ foo: 'bar', a: 1 }, v => console.log(v)); // 'bar', 1

//--------------------------------


const forOwnRight = (obj, fn) =>
  Object.keys(obj)
    .reverse()
    .forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwnRight({ foo: 'bar', a: 1 }, v => console.log(v)); // 1, 'bar'

//--------------------------------


const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24);

//--------------------------------


getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')); // 9

//--------------------------------


const getElementsBiggerThanViewport = () => {
  const docWidth = document.documentElement.offsetWidth;
  return [...document.querySelectorAll('*')].filter(
    el => el.offsetWidth > docWidth
  );
};

//--------------------------------


getElementsBiggerThanViewport(); // <div id="ultra-wide-item" />

//--------------------------------


const getMonthsDiffBetweenDates = (dateInitial, dateFinal) =>
  Math.max(
    (dateFinal.getFullYear() - dateInitial.getFullYear()) * 12 +
      dateFinal.getMonth() -
      dateInitial.getMonth(),
    0
  );

//--------------------------------


getMonthsDiffBetweenDates(new Date('2017-12-13'), new Date('2018-04-29')); // 4

//--------------------------------


const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});

//--------------------------------


getScrollPosition(); // {x: 0, y: 200}

//--------------------------------


const getSiblings = el =>
  [...el.parentNode.childNodes].filter(node => node !== el);

//--------------------------------


getSiblings(document.querySelector('head')); // ['body']

//--------------------------------


const getType = v =>
  (v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name);

//--------------------------------


getType(new Set([1, 2, 3])); // 'Set'

//--------------------------------


const getVerticalOffset = el => {
  let offset = el.offsetTop,
    _el = el;
  while (_el.offsetParent) {
    _el = _el.offsetParent;
    offset += _el.offsetTop;
  }
  return offset;
};

//--------------------------------


getVerticalOffset('.my-element'); // 120

//--------------------------------


const hammingDistance = (num1, num2) =>
  ((num1 ^ num2).toString(2).match(/1/g) || '').length;

//--------------------------------


hammingDistance(2, 3); // 1

//--------------------------------


const haveSameContents = (a, b) => {
  for (const v of new Set([...a, ...b]))
    if (a.filter(e => e === v).length !== b.filter(e => e === v).length)
      return false;
  return true;
};

//--------------------------------


haveSameContents([1, 2, 4], [2, 4, 1]); // true

//--------------------------------


const heapsort = arr => {
  const a = [...arr];
  let l = a.length;

  const heapify = (a, i) => {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let max = i;
    if (left < l && a[left] > a[max]) max = left;
    if (right < l && a[right] > a[max]) max = right;
    if (max !== i) {
      [a[max], a[i]] = [a[i], a[max]];
      heapify(a, max);
    }
  };

  for (let i = Math.floor(l / 2); i >= 0; i -= 1) heapify(a, i);
  for (i = a.length - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    l--;
    heapify(a, 0);
  }
  return a;
};

//--------------------------------


heapsort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const initialize2DArray = (w, h, val = null) =>
  Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));

//--------------------------------


initialize2DArray(2, 2, 0); // [[0, 0], [0, 0]]

//--------------------------------


const initializeArrayWithValues = (n, val = 0) =>
  Array.from({ length: n }).fill(val);

//--------------------------------


initializeArrayWithValues(5, 2); // [2, 2, 2, 2, 2]

//--------------------------------


const insertionSort = arr =>
  arr.reduce((acc, x) => {
    if (!acc.length) return [x];
    acc.some((y, j) => {
      if (x <= y) {
        acc.splice(j, 0, x);
        return true;
      }
      if (x > y && j === acc.length - 1) {
        acc.splice(j + 1, 0, x);
        return true;
      }
      return false;
    });
    return acc;
  }, []);

//--------------------------------


insertionSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const intersection = (a, b) => {
  const s = new Set(b);
  return [...new Set(a)].filter(x => s.has(x));
};

//--------------------------------


intersection([1, 2, 3], [4, 3, 2]); // [2, 3]

//--------------------------------


const isAnagram = (str1, str2) => {
  const normalize = str =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, '')
      .split('')
      .sort()
      .join('');
  return normalize(str1) === normalize(str2);
};

//--------------------------------


isAnagram('iceman', 'cinema'); // true

//--------------------------------


const isContainedIn = (a, b) => {
  for (const v of new Set(a)) {
    if (
      !b.some(e => e === v) ||
      a.filter(e => e === v).length > b.filter(e => e === v).length
    )
      return false;
  }
  return true;
};

//--------------------------------


isContainedIn([1, 4], [2, 4, 1]); // true

//--------------------------------


const isLocalStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.localStorage.setItem(key, null);
    window.localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isLocalStorageEnabled(); // true, if localStorage is accessible

//--------------------------------


const isPrime = num => {
  const boundary = Math.floor(Math.sqrt(num));
  for (let i = 2; i <= boundary; i++) if (num % i === 0) return false;
  return num >= 2;
};

//--------------------------------


isPrime(11); // true

//--------------------------------


const isSameDate = (dateA, dateB) =>
  dateA.toISOString() === dateB.toISOString();

//--------------------------------


isSameDate(new Date(2010, 10, 20), new Date(2010, 10, 20)); // true

//--------------------------------


const isSessionStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.sessionStorage.setItem(key, null);
    window.sessionStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isSessionStorageEnabled(); // true, if sessionStorage is accessible

//--------------------------------


const kMeans = (data, k = 1) => {
  const centroids = data.slice(0, k);
  const distances = Array.from({ length: data.length }, () =>
    Array.from({ length: k }, () => 0)
  );
  const classes = Array.from({ length: data.length }, () => -1);
  let itr = true;

  while (itr) {
    itr = false;

    for (let d in data) {
      for (let c = 0; c < k; c++) {
        distances[d][c] = Math.hypot(
          ...Object.keys(data[0]).map(key => data[d][key] - centroids[c][key])
        );
      }
      const m = distances[d].indexOf(Math.min(...distances[d]));
      if (classes[d] !== m) itr = true;
      classes[d] = m;
    }

    for (let c = 0; c < k; c++) {
      centroids[c] = Array.from({ length: data[0].length }, () => 0);
      const size = data.reduce((acc, _, d) => {
        if (classes[d] === c) {
          acc++;
          for (let i in data[0]) centroids[c][i] += data[d][i];
        }
        return acc;
      }, 0);
      for (let i in data[0]) {
        centroids[c][i] = parseFloat(Number(centroids[c][i] / size).toFixed(2));
      }
    }
  }

  return classes;
};

//--------------------------------


kMeans([[0, 0], [0, 1], [1, 3], [2, 0]], 2); // [0, 1, 1, 0]

//--------------------------------


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

//--------------------------------


const randomIntArrayInRange = (min, max, n = 1) =>
  Array.from(
    { length: n },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );

//--------------------------------


randomIntArrayInRange(12, 35, 10); // [ 34, 14, 27, 17, 30, 27, 20, 26, 21, 14 ]

//--------------------------------


const randomIntegerInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

//--------------------------------


randomIntegerInRange(0, 5); // 2

//--------------------------------


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

//--------------------------------



const remove = (arr, func) =>
  Array.isArray(arr)
    ? arr.filter(func).reduce((acc, val) => {
      arr.splice(arr.indexOf(val), 1);
      return acc.concat(val);
    }, [])
    : [];

//--------------------------------


remove([1, 2, 3, 4], n => n % 2 === 0); // [2, 4]

//--------------------------------


const removeAccents = str =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

//--------------------------------


removeAccents('Antoine de Saint-Exupéry'); // 'Antoine de Saint-Exupery'

//--------------------------------


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

//--------------------------------


const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

//--------------------------------


scrollToTop(); // Smooth-scrolls to the top of the page

//--------------------------------


const sdbm = str => {
  let arr = str.split('');
  return arr.reduce(
    (hashCode, currentVal) =>
      (hashCode =
        currentVal.charCodeAt(0) +
        (hashCode << 6) +
        (hashCode << 16) -
        hashCode),
    0
  );
};

//--------------------------------


sdbm('name'); // -3521204949

//--------------------------------


const selectionSort = arr => {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    const min = a
      .slice(i + 1)
      .reduce((acc, val, j) => (val < a[acc] ? j + i + 1 : acc), i);
    if (min !== i) [a[i], a[min]] = [a[min], a[i]];
  }
  return a;
};

//--------------------------------


selectionSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const serializeCookie = (name, val) =>
  `${encodeURIComponent(name)}=${encodeURIComponent(val)}`;

//--------------------------------


serializeCookie('foo', 'bar'); // 'foo=bar'

//--------------------------------


const slugify = str =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

//--------------------------------


slugify('Hello World!'); // 'hello-world'

//--------------------------------


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

//--------------------------------


const sortedIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr.findIndex(el =>
    isDescending ? val >= fn(el) : val <= fn(el)
  );
  return index === -1 ? arr.length : index;
};

//--------------------------------


sortedIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 0

//--------------------------------


const sortedLastIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr
    .reverse()
    .findIndex(el => (isDescending ? n <= el : n >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndex([10, 20, 30, 30, 40], 30); // 4

//--------------------------------


const sortedLastIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr
    .map(fn)
    .reverse()
    .findIndex(el => (isDescending ? val <= el : val >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 1

//--------------------------------


const stringPermutations = str => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str
    .split('')
    .reduce(
      (acc, letter, i) =>
        acc.concat(
          stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(
            val => letter + val
          )
        ),
      []
    );
};

//--------------------------------


stringPermutations('abc'); // ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']

//--------------------------------


const supportsTouchEvents = () =>
  window && 'ontouchstart' in window;

//--------------------------------


supportsTouchEvents(); // true

//--------------------------------


const swapCase = str =>
  [...str]
    .map(c => (c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase()))
    .join('');

//--------------------------------


swapCase('Hello world!'); // 'hELLO WORLD!'

//--------------------------------


const takeRightUntil = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightUntil([1, 2, 3, 4], n => n < 3); // [3, 4]

//--------------------------------


const takeRightWhile = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (!fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const takeUntil = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeUntil([1, 2, 3, 4], n => n >= 3); // [1, 2]

//--------------------------------


const takeWhile = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (!fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

//--------------------------------


const toISOStringWithTimezone = date => {
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? '+' : '-';
  const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    diff + pad(tzOffset / 60) +
    ':' + pad(tzOffset % 60);
};

//--------------------------------


toISOStringWithTimezone(new Date()); // '2020-10-06T20:43:33-04:00'

//--------------------------------


const toOrdinalSuffix = num => {
  const int = parseInt(num),
    digits = [int % 10, int % 100],
    ordinals = ['st', 'nd', 'rd', 'th'],
    oPattern = [1, 2, 3, 4],
    tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
  return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
    ? int + ordinals[digits[0] - 1]
    : int + ordinals[3];
};

//--------------------------------


toOrdinalSuffix('123'); // '123rd'

//--------------------------------


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


const HSBToRGB = (h, s, b) => {
  s /= 100;
  b /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [255 * f(5), 255 * f(3), 255 * f(1)];
};

//--------------------------------


HSBToRGB(18, 81, 99); // [252.45, 109.31084999999996, 47.965499999999984]

//--------------------------------


const HSLToRGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

//--------------------------------


HSLToRGB(13, 100, 11); // [56.1, 12.155, 0]

//--------------------------------


const RGBToHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};

//--------------------------------


RGBToHSL(45, 23, 11); // [21.17647, 60.71428, 10.98039]

//--------------------------------


const RGBToHex = (r, g, b) =>
  ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');

//--------------------------------


RGBToHex(255, 165, 1); // 'ffa501'

//--------------------------------


const UUIDGeneratorBrowser = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );

//--------------------------------


UUIDGeneratorBrowser(); // '7982fcfe-5721-4632-bede-6000885be57d'

//--------------------------------


const crypto = require('crypto');

const UUIDGeneratorNode = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
  );

//--------------------------------


UUIDGeneratorNode(); // '79c7c136-60ee-40a2-beb2-856f1feabefc'

//--------------------------------


const approximatelyEqual = (v1, v2, epsilon = 0.001) =>
  Math.abs(v1 - v2) < epsilon;

//--------------------------------


approximatelyEqual(Math.PI / 2.0, 1.5708); // true

//--------------------------------


const arithmeticProgression  = (n, lim) =>
  Array.from({ length: Math.ceil(lim / n) }, (_, i) => (i + 1) * n );

//--------------------------------


arithmeticProgression(5, 25); // [5, 10, 15, 20, 25]

//--------------------------------


const arrayToHTMLList = (arr, listID) => 
  document.querySelector(`#${listID}`).innerHTML += arr
    .map(item => `<li>${item}</li>`)
    .join('');

//--------------------------------


arrayToHTMLList(['item 1', 'item 2'], 'myListID');

//--------------------------------


const binomialCoefficient = (n, k) => {
  if (Number.isNaN(n) || Number.isNaN(k)) return NaN;
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  if (k === 1 || k === n - 1) return n;
  if (n - k < k) k = n - k;
  let res = n;
  for (let j = 2; j <= k; j++) res *= (n - j + 1) / j;
  return Math.round(res);
};

//--------------------------------


binomialCoefficient(8, 2); // 28

//--------------------------------


const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight ||
    document.documentElement.clientHeight);

//--------------------------------


bottomVisible(); // true

//--------------------------------


const bubbleSort = arr => {
  let swapped = false;
  const a = [...arr];
  for (let i = 1; i < a.length - 1; i++) {
    swapped = false;
    for (let j = 0; j < a.length - i; j++) {
      if (a[j + 1] < a[j]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    if (!swapped) return a;
  }
  return a;
};

//--------------------------------


bubbleSort([2, 1, 4, 3]); // [1, 2, 3, 4]

//--------------------------------


const bucketSort = (arr, size = 5) => {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const buckets = Array.from(
    { length: Math.floor((max - min) / size) + 1 },
    () => []
  );
  arr.forEach(val => {
    buckets[Math.floor((val - min) / size)].push(val);
  });
  return buckets.reduce((acc, b) => [...acc, ...b.sort((a, b) => a - b)], []);
};

//--------------------------------


bucketSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const capitalizeEveryWord = str =>
  str.replace(/\b[a-z]/g, char => char.toUpperCase());

//--------------------------------


capitalizeEveryWord('hello world!'); // 'Hello World!'

//--------------------------------


const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

//--------------------------------


chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

//--------------------------------


const chunkIntoN = (arr, n) => {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}

//--------------------------------


chunkIntoN([1, 2, 3, 4, 5, 6, 7], 4); // [[1, 2], [3, 4], [5, 6], [7]]

//--------------------------------


const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

//--------------------------------


copyToClipboard('Lorem ipsum'); // 'Lorem ipsum' copied to clipboard.

//--------------------------------


const countOccurrences = (arr, val) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

//--------------------------------


countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3

//--------------------------------


const dayOfYear = date =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

//--------------------------------


dayOfYear(new Date()); // 272

//--------------------------------


const daysAgo = n => {
  let d = new Date();
  d.setDate(d.getDate() - Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysAgo(20); // 2020-09-16 (if current date is 2020-10-06)

//--------------------------------


const daysFromNow = n => {
  let d = new Date();
  d.setDate(d.getDate() + Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysFromNow(5); // 2020-10-13 (if current date is 2020-10-08)

//--------------------------------


const deepFlatten = arr =>
  [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));

//--------------------------------


deepFlatten([1, [2], [[3], 4], 5]); // [1, 2, 3, 4, 5]

//--------------------------------


const defaults = (obj, ...defs) =>
  Object.assign({}, obj, ...defs.reverse(), obj);

//--------------------------------


defaults({ a: 1 }, { b: 2 }, { b: 6 }, { a: 3 }); // { a: 1, b: 2 }

//--------------------------------


const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? 'Mobile'
    : 'Desktop';

//--------------------------------


detectDeviceType(); // 'Mobile' or 'Desktop'

//--------------------------------


const detectLanguage = (defaultLang = 'en-US') => 
  navigator.language ||
  (Array.isArray(navigator.languages) && navigator.languages[0]) ||
  defaultLang;

//--------------------------------


detectLanguage(); // 'nl-NL'

//--------------------------------


const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};

//--------------------------------


difference([1, 2, 3, 3], [1, 2, 4]); // [3, 3]

//--------------------------------


const dropRightWhile = (arr, func) => {
  let rightIndex = arr.length;
  while (rightIndex-- && !func(arr[rightIndex]));
  return arr.slice(0, rightIndex + 1);
};

//--------------------------------


dropRightWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const dropWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
  return arr;
};

//--------------------------------


dropWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const factorial = n =>
  n < 0
    ? (() => {
        throw new TypeError('Negative numbers are not allowed!');
      })()
    : n <= 1
    ? 1
    : n * factorial(n - 1);

//--------------------------------


factorial(6); // 720

//--------------------------------


const fibonacci = n =>
  Array.from({ length: n }).reduce(
    (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
    []
  );

//--------------------------------


fibonacci(6); // [0, 1, 1, 2, 3, 5]

//--------------------------------


const filterNonUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) === arr.lastIndexOf(i));

//--------------------------------


filterNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1, 3, 5]

//--------------------------------


const filterUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) !== arr.lastIndexOf(i));

//--------------------------------


filterUnique([1, 2, 2, 3, 4, 4, 5]); // [2, 4]

//--------------------------------


const flattenObject = (obj, prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}.` : '';
    if (
      typeof obj[k] === 'object' &&
      obj[k] !== null &&
      Object.keys(obj[k]).length > 0
    )
      Object.assign(acc, flattenObject(obj[k], pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});

//--------------------------------


flattenObject({ a: { b: { c: 1 } }, d: 1 }); // { 'a.b.c': 1, d: 1 }

//--------------------------------


const forEachRight = (arr, callback) =>
  arr
    .slice()
    .reverse()
    .forEach(callback);

//--------------------------------


forEachRight([1, 2, 3, 4], val => console.log(val)); // '4', '3', '2', '1'

//--------------------------------


const forOwn = (obj, fn) =>
  Object.keys(obj).forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwn({ foo: 'bar', a: 1 }, v => console.log(v)); // 'bar', 1

//--------------------------------


const forOwnRight = (obj, fn) =>
  Object.keys(obj)
    .reverse()
    .forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwnRight({ foo: 'bar', a: 1 }, v => console.log(v)); // 1, 'bar'

//--------------------------------


const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24);

//--------------------------------


getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')); // 9

//--------------------------------


const getElementsBiggerThanViewport = () => {
  const docWidth = document.documentElement.offsetWidth;
  return [...document.querySelectorAll('*')].filter(
    el => el.offsetWidth > docWidth
  );
};

//--------------------------------


getElementsBiggerThanViewport(); // <div id="ultra-wide-item" />

//--------------------------------


const getMonthsDiffBetweenDates = (dateInitial, dateFinal) =>
  Math.max(
    (dateFinal.getFullYear() - dateInitial.getFullYear()) * 12 +
      dateFinal.getMonth() -
      dateInitial.getMonth(),
    0
  );

//--------------------------------


getMonthsDiffBetweenDates(new Date('2017-12-13'), new Date('2018-04-29')); // 4

//--------------------------------


const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});

//--------------------------------


getScrollPosition(); // {x: 0, y: 200}

//--------------------------------


const getSiblings = el =>
  [...el.parentNode.childNodes].filter(node => node !== el);

//--------------------------------


getSiblings(document.querySelector('head')); // ['body']

//--------------------------------


const getType = v =>
  (v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name);

//--------------------------------


getType(new Set([1, 2, 3])); // 'Set'

//--------------------------------


const getVerticalOffset = el => {
  let offset = el.offsetTop,
    _el = el;
  while (_el.offsetParent) {
    _el = _el.offsetParent;
    offset += _el.offsetTop;
  }
  return offset;
};

//--------------------------------


getVerticalOffset('.my-element'); // 120

//--------------------------------


const hammingDistance = (num1, num2) =>
  ((num1 ^ num2).toString(2).match(/1/g) || '').length;

//--------------------------------


hammingDistance(2, 3); // 1

//--------------------------------


const haveSameContents = (a, b) => {
  for (const v of new Set([...a, ...b]))
    if (a.filter(e => e === v).length !== b.filter(e => e === v).length)
      return false;
  return true;
};

//--------------------------------


haveSameContents([1, 2, 4], [2, 4, 1]); // true

//--------------------------------


const heapsort = arr => {
  const a = [...arr];
  let l = a.length;

  const heapify = (a, i) => {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let max = i;
    if (left < l && a[left] > a[max]) max = left;
    if (right < l && a[right] > a[max]) max = right;
    if (max !== i) {
      [a[max], a[i]] = [a[i], a[max]];
      heapify(a, max);
    }
  };

  for (let i = Math.floor(l / 2); i >= 0; i -= 1) heapify(a, i);
  for (i = a.length - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    l--;
    heapify(a, 0);
  }
  return a;
};

//--------------------------------


heapsort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const initialize2DArray = (w, h, val = null) =>
  Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));

//--------------------------------


initialize2DArray(2, 2, 0); // [[0, 0], [0, 0]]

//--------------------------------


const initializeArrayWithValues = (n, val = 0) =>
  Array.from({ length: n }).fill(val);

//--------------------------------


initializeArrayWithValues(5, 2); // [2, 2, 2, 2, 2]

//--------------------------------


const insertionSort = arr =>
  arr.reduce((acc, x) => {
    if (!acc.length) return [x];
    acc.some((y, j) => {
      if (x <= y) {
        acc.splice(j, 0, x);
        return true;
      }
      if (x > y && j === acc.length - 1) {
        acc.splice(j + 1, 0, x);
        return true;
      }
      return false;
    });
    return acc;
  }, []);

//--------------------------------


insertionSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const intersection = (a, b) => {
  const s = new Set(b);
  return [...new Set(a)].filter(x => s.has(x));
};

//--------------------------------


intersection([1, 2, 3], [4, 3, 2]); // [2, 3]

//--------------------------------


const isAnagram = (str1, str2) => {
  const normalize = str =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, '')
      .split('')
      .sort()
      .join('');
  return normalize(str1) === normalize(str2);
};

//--------------------------------


isAnagram('iceman', 'cinema'); // true

//--------------------------------


const isContainedIn = (a, b) => {
  for (const v of new Set(a)) {
    if (
      !b.some(e => e === v) ||
      a.filter(e => e === v).length > b.filter(e => e === v).length
    )
      return false;
  }
  return true;
};

//--------------------------------


isContainedIn([1, 4], [2, 4, 1]); // true

//--------------------------------


const isLocalStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.localStorage.setItem(key, null);
    window.localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isLocalStorageEnabled(); // true, if localStorage is accessible

//--------------------------------


const isPrime = num => {
  const boundary = Math.floor(Math.sqrt(num));
  for (let i = 2; i <= boundary; i++) if (num % i === 0) return false;
  return num >= 2;
};

//--------------------------------


isPrime(11); // true

//--------------------------------


const isSameDate = (dateA, dateB) =>
  dateA.toISOString() === dateB.toISOString();

//--------------------------------


isSameDate(new Date(2010, 10, 20), new Date(2010, 10, 20)); // true

//--------------------------------


const isSessionStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.sessionStorage.setItem(key, null);
    window.sessionStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isSessionStorageEnabled(); // true, if sessionStorage is accessible

//--------------------------------


const kMeans = (data, k = 1) => {
  const centroids = data.slice(0, k);
  const distances = Array.from({ length: data.length }, () =>
    Array.from({ length: k }, () => 0)
  );
  const classes = Array.from({ length: data.length }, () => -1);
  let itr = true;

  while (itr) {
    itr = false;

    for (let d in data) {
      for (let c = 0; c < k; c++) {
        distances[d][c] = Math.hypot(
          ...Object.keys(data[0]).map(key => data[d][key] - centroids[c][key])
        );
      }
      const m = distances[d].indexOf(Math.min(...distances[d]));
      if (classes[d] !== m) itr = true;
      classes[d] = m;
    }

    for (let c = 0; c < k; c++) {
      centroids[c] = Array.from({ length: data[0].length }, () => 0);
      const size = data.reduce((acc, _, d) => {
        if (classes[d] === c) {
          acc++;
          for (let i in data[0]) centroids[c][i] += data[d][i];
        }
        return acc;
      }, 0);
      for (let i in data[0]) {
        centroids[c][i] = parseFloat(Number(centroids[c][i] / size).toFixed(2));
      }
    }
  }

  return classes;
};

//--------------------------------


kMeans([[0, 0], [0, 1], [1, 3], [2, 0]], 2); // [0, 1, 1, 0]

//--------------------------------


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

//--------------------------------


const randomIntArrayInRange = (min, max, n = 1) =>
  Array.from(
    { length: n },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );

//--------------------------------


randomIntArrayInRange(12, 35, 10); // [ 34, 14, 27, 17, 30, 27, 20, 26, 21, 14 ]

//--------------------------------


const randomIntegerInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

//--------------------------------


randomIntegerInRange(0, 5); // 2

//--------------------------------


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

//--------------------------------



const remove = (arr, func) =>
  Array.isArray(arr)
    ? arr.filter(func).reduce((acc, val) => {
      arr.splice(arr.indexOf(val), 1);
      return acc.concat(val);
    }, [])
    : [];

//--------------------------------


remove([1, 2, 3, 4], n => n % 2 === 0); // [2, 4]

//--------------------------------


const removeAccents = str =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

//--------------------------------


removeAccents('Antoine de Saint-Exupéry'); // 'Antoine de Saint-Exupery'

//--------------------------------


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

//--------------------------------


const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

//--------------------------------


scrollToTop(); // Smooth-scrolls to the top of the page

//--------------------------------


const sdbm = str => {
  let arr = str.split('');
  return arr.reduce(
    (hashCode, currentVal) =>
      (hashCode =
        currentVal.charCodeAt(0) +
        (hashCode << 6) +
        (hashCode << 16) -
        hashCode),
    0
  );
};

//--------------------------------


sdbm('name'); // -3521204949

//--------------------------------


const selectionSort = arr => {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    const min = a
      .slice(i + 1)
      .reduce((acc, val, j) => (val < a[acc] ? j + i + 1 : acc), i);
    if (min !== i) [a[i], a[min]] = [a[min], a[i]];
  }
  return a;
};

//--------------------------------


selectionSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const serializeCookie = (name, val) =>
  `${encodeURIComponent(name)}=${encodeURIComponent(val)}`;

//--------------------------------


serializeCookie('foo', 'bar'); // 'foo=bar'

//--------------------------------


const slugify = str =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

//--------------------------------


slugify('Hello World!'); // 'hello-world'

//--------------------------------


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

//--------------------------------


const sortedIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr.findIndex(el =>
    isDescending ? val >= fn(el) : val <= fn(el)
  );
  return index === -1 ? arr.length : index;
};

//--------------------------------


sortedIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 0

//--------------------------------


const sortedLastIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr
    .reverse()
    .findIndex(el => (isDescending ? n <= el : n >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndex([10, 20, 30, 30, 40], 30); // 4

//--------------------------------


const sortedLastIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr
    .map(fn)
    .reverse()
    .findIndex(el => (isDescending ? val <= el : val >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 1

//--------------------------------


const stringPermutations = str => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str
    .split('')
    .reduce(
      (acc, letter, i) =>
        acc.concat(
          stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(
            val => letter + val
          )
        ),
      []
    );
};

//--------------------------------


stringPermutations('abc'); // ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']

//--------------------------------


const supportsTouchEvents = () =>
  window && 'ontouchstart' in window;

//--------------------------------


supportsTouchEvents(); // true

//--------------------------------


const swapCase = str =>
  [...str]
    .map(c => (c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase()))
    .join('');

//--------------------------------


swapCase('Hello world!'); // 'hELLO WORLD!'

//--------------------------------


const takeRightUntil = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightUntil([1, 2, 3, 4], n => n < 3); // [3, 4]

//--------------------------------


const takeRightWhile = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (!fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const takeUntil = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeUntil([1, 2, 3, 4], n => n >= 3); // [1, 2]

//--------------------------------


const takeWhile = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (!fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

//--------------------------------


const toISOStringWithTimezone = date => {
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? '+' : '-';
  const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    diff + pad(tzOffset / 60) +
    ':' + pad(tzOffset % 60);
};

//--------------------------------


toISOStringWithTimezone(new Date()); // '2020-10-06T20:43:33-04:00'

//--------------------------------


const toOrdinalSuffix = num => {
  const int = parseInt(num),
    digits = [int % 10, int % 100],
    ordinals = ['st', 'nd', 'rd', 'th'],
    oPattern = [1, 2, 3, 4],
    tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
  return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
    ? int + ordinals[digits[0] - 1]
    : int + ordinals[3];
};

//--------------------------------


toOrdinalSuffix('123'); // '123rd'

//--------------------------------


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


const HSBToRGB = (h, s, b) => {
  s /= 100;
  b /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [255 * f(5), 255 * f(3), 255 * f(1)];
};

//--------------------------------


HSBToRGB(18, 81, 99); // [252.45, 109.31084999999996, 47.965499999999984]

//--------------------------------


const HSLToRGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

//--------------------------------


HSLToRGB(13, 100, 11); // [56.1, 12.155, 0]

//--------------------------------


const RGBToHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};

//--------------------------------


RGBToHSL(45, 23, 11); // [21.17647, 60.71428, 10.98039]

//--------------------------------


const RGBToHex = (r, g, b) =>
  ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');

//--------------------------------


RGBToHex(255, 165, 1); // 'ffa501'

//--------------------------------


const UUIDGeneratorBrowser = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );

//--------------------------------


UUIDGeneratorBrowser(); // '7982fcfe-5721-4632-bede-6000885be57d'

//--------------------------------


const crypto = require('crypto');

const UUIDGeneratorNode = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
  );

//--------------------------------


UUIDGeneratorNode(); // '79c7c136-60ee-40a2-beb2-856f1feabefc'

//--------------------------------


const approximatelyEqual = (v1, v2, epsilon = 0.001) =>
  Math.abs(v1 - v2) < epsilon;

//--------------------------------


approximatelyEqual(Math.PI / 2.0, 1.5708); // true

//--------------------------------


const arithmeticProgression  = (n, lim) =>
  Array.from({ length: Math.ceil(lim / n) }, (_, i) => (i + 1) * n );

//--------------------------------


arithmeticProgression(5, 25); // [5, 10, 15, 20, 25]

//--------------------------------


const arrayToHTMLList = (arr, listID) => 
  document.querySelector(`#${listID}`).innerHTML += arr
    .map(item => `<li>${item}</li>`)
    .join('');

//--------------------------------


arrayToHTMLList(['item 1', 'item 2'], 'myListID');

//--------------------------------


const binomialCoefficient = (n, k) => {
  if (Number.isNaN(n) || Number.isNaN(k)) return NaN;
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  if (k === 1 || k === n - 1) return n;
  if (n - k < k) k = n - k;
  let res = n;
  for (let j = 2; j <= k; j++) res *= (n - j + 1) / j;
  return Math.round(res);
};

//--------------------------------


binomialCoefficient(8, 2); // 28

//--------------------------------


const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight ||
    document.documentElement.clientHeight);

//--------------------------------


bottomVisible(); // true

//--------------------------------


const bubbleSort = arr => {
  let swapped = false;
  const a = [...arr];
  for (let i = 1; i < a.length - 1; i++) {
    swapped = false;
    for (let j = 0; j < a.length - i; j++) {
      if (a[j + 1] < a[j]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    if (!swapped) return a;
  }
  return a;
};

//--------------------------------


bubbleSort([2, 1, 4, 3]); // [1, 2, 3, 4]

//--------------------------------


const bucketSort = (arr, size = 5) => {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const buckets = Array.from(
    { length: Math.floor((max - min) / size) + 1 },
    () => []
  );
  arr.forEach(val => {
    buckets[Math.floor((val - min) / size)].push(val);
  });
  return buckets.reduce((acc, b) => [...acc, ...b.sort((a, b) => a - b)], []);
};

//--------------------------------


bucketSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const capitalizeEveryWord = str =>
  str.replace(/\b[a-z]/g, char => char.toUpperCase());

//--------------------------------


capitalizeEveryWord('hello world!'); // 'Hello World!'

//--------------------------------


const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

//--------------------------------


chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

//--------------------------------


const chunkIntoN = (arr, n) => {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}

//--------------------------------


chunkIntoN([1, 2, 3, 4, 5, 6, 7], 4); // [[1, 2], [3, 4], [5, 6], [7]]

//--------------------------------


const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

//--------------------------------


copyToClipboard('Lorem ipsum'); // 'Lorem ipsum' copied to clipboard.

//--------------------------------


const countOccurrences = (arr, val) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

//--------------------------------


countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3

//--------------------------------


const dayOfYear = date =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

//--------------------------------


dayOfYear(new Date()); // 272

//--------------------------------


const daysAgo = n => {
  let d = new Date();
  d.setDate(d.getDate() - Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysAgo(20); // 2020-09-16 (if current date is 2020-10-06)

//--------------------------------


const daysFromNow = n => {
  let d = new Date();
  d.setDate(d.getDate() + Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysFromNow(5); // 2020-10-13 (if current date is 2020-10-08)

//--------------------------------


const deepFlatten = arr =>
  [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));

//--------------------------------


deepFlatten([1, [2], [[3], 4], 5]); // [1, 2, 3, 4, 5]

//--------------------------------


const defaults = (obj, ...defs) =>
  Object.assign({}, obj, ...defs.reverse(), obj);

//--------------------------------


defaults({ a: 1 }, { b: 2 }, { b: 6 }, { a: 3 }); // { a: 1, b: 2 }

//--------------------------------


const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? 'Mobile'
    : 'Desktop';

//--------------------------------


detectDeviceType(); // 'Mobile' or 'Desktop'

//--------------------------------


const detectLanguage = (defaultLang = 'en-US') => 
  navigator.language ||
  (Array.isArray(navigator.languages) && navigator.languages[0]) ||
  defaultLang;

//--------------------------------


detectLanguage(); // 'nl-NL'

//--------------------------------


const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};

//--------------------------------


difference([1, 2, 3, 3], [1, 2, 4]); // [3, 3]

//--------------------------------


const dropRightWhile = (arr, func) => {
  let rightIndex = arr.length;
  while (rightIndex-- && !func(arr[rightIndex]));
  return arr.slice(0, rightIndex + 1);
};

//--------------------------------


dropRightWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const dropWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
  return arr;
};

//--------------------------------


dropWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const factorial = n =>
  n < 0
    ? (() => {
        throw new TypeError('Negative numbers are not allowed!');
      })()
    : n <= 1
    ? 1
    : n * factorial(n - 1);

//--------------------------------


factorial(6); // 720

//--------------------------------


const fibonacci = n =>
  Array.from({ length: n }).reduce(
    (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
    []
  );

//--------------------------------


fibonacci(6); // [0, 1, 1, 2, 3, 5]

//--------------------------------


const filterNonUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) === arr.lastIndexOf(i));

//--------------------------------


filterNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1, 3, 5]

//--------------------------------


const filterUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) !== arr.lastIndexOf(i));

//--------------------------------


filterUnique([1, 2, 2, 3, 4, 4, 5]); // [2, 4]

//--------------------------------


const flattenObject = (obj, prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}.` : '';
    if (
      typeof obj[k] === 'object' &&
      obj[k] !== null &&
      Object.keys(obj[k]).length > 0
    )
      Object.assign(acc, flattenObject(obj[k], pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});

//--------------------------------


flattenObject({ a: { b: { c: 1 } }, d: 1 }); // { 'a.b.c': 1, d: 1 }

//--------------------------------


const forEachRight = (arr, callback) =>
  arr
    .slice()
    .reverse()
    .forEach(callback);

//--------------------------------


forEachRight([1, 2, 3, 4], val => console.log(val)); // '4', '3', '2', '1'

//--------------------------------


const forOwn = (obj, fn) =>
  Object.keys(obj).forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwn({ foo: 'bar', a: 1 }, v => console.log(v)); // 'bar', 1

//--------------------------------


const forOwnRight = (obj, fn) =>
  Object.keys(obj)
    .reverse()
    .forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwnRight({ foo: 'bar', a: 1 }, v => console.log(v)); // 1, 'bar'

//--------------------------------


const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24);

//--------------------------------


getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')); // 9

//--------------------------------


const getElementsBiggerThanViewport = () => {
  const docWidth = document.documentElement.offsetWidth;
  return [...document.querySelectorAll('*')].filter(
    el => el.offsetWidth > docWidth
  );
};

//--------------------------------


getElementsBiggerThanViewport(); // <div id="ultra-wide-item" />

//--------------------------------


const getMonthsDiffBetweenDates = (dateInitial, dateFinal) =>
  Math.max(
    (dateFinal.getFullYear() - dateInitial.getFullYear()) * 12 +
      dateFinal.getMonth() -
      dateInitial.getMonth(),
    0
  );

//--------------------------------


getMonthsDiffBetweenDates(new Date('2017-12-13'), new Date('2018-04-29')); // 4

//--------------------------------


const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});

//--------------------------------


getScrollPosition(); // {x: 0, y: 200}

//--------------------------------


const getSiblings = el =>
  [...el.parentNode.childNodes].filter(node => node !== el);

//--------------------------------


getSiblings(document.querySelector('head')); // ['body']

//--------------------------------


const getType = v =>
  (v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name);

//--------------------------------


getType(new Set([1, 2, 3])); // 'Set'

//--------------------------------


const getVerticalOffset = el => {
  let offset = el.offsetTop,
    _el = el;
  while (_el.offsetParent) {
    _el = _el.offsetParent;
    offset += _el.offsetTop;
  }
  return offset;
};

//--------------------------------


getVerticalOffset('.my-element'); // 120

//--------------------------------


const hammingDistance = (num1, num2) =>
  ((num1 ^ num2).toString(2).match(/1/g) || '').length;

//--------------------------------


hammingDistance(2, 3); // 1

//--------------------------------


const haveSameContents = (a, b) => {
  for (const v of new Set([...a, ...b]))
    if (a.filter(e => e === v).length !== b.filter(e => e === v).length)
      return false;
  return true;
};

//--------------------------------


haveSameContents([1, 2, 4], [2, 4, 1]); // true

//--------------------------------


const heapsort = arr => {
  const a = [...arr];
  let l = a.length;

  const heapify = (a, i) => {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let max = i;
    if (left < l && a[left] > a[max]) max = left;
    if (right < l && a[right] > a[max]) max = right;
    if (max !== i) {
      [a[max], a[i]] = [a[i], a[max]];
      heapify(a, max);
    }
  };

  for (let i = Math.floor(l / 2); i >= 0; i -= 1) heapify(a, i);
  for (i = a.length - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    l--;
    heapify(a, 0);
  }
  return a;
};

//--------------------------------


heapsort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const initialize2DArray = (w, h, val = null) =>
  Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));

//--------------------------------


initialize2DArray(2, 2, 0); // [[0, 0], [0, 0]]

//--------------------------------


const initializeArrayWithValues = (n, val = 0) =>
  Array.from({ length: n }).fill(val);

//--------------------------------


initializeArrayWithValues(5, 2); // [2, 2, 2, 2, 2]

//--------------------------------


const insertionSort = arr =>
  arr.reduce((acc, x) => {
    if (!acc.length) return [x];
    acc.some((y, j) => {
      if (x <= y) {
        acc.splice(j, 0, x);
        return true;
      }
      if (x > y && j === acc.length - 1) {
        acc.splice(j + 1, 0, x);
        return true;
      }
      return false;
    });
    return acc;
  }, []);

//--------------------------------


insertionSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const intersection = (a, b) => {
  const s = new Set(b);
  return [...new Set(a)].filter(x => s.has(x));
};

//--------------------------------


intersection([1, 2, 3], [4, 3, 2]); // [2, 3]

//--------------------------------


const isAnagram = (str1, str2) => {
  const normalize = str =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, '')
      .split('')
      .sort()
      .join('');
  return normalize(str1) === normalize(str2);
};

//--------------------------------


isAnagram('iceman', 'cinema'); // true

//--------------------------------


const isContainedIn = (a, b) => {
  for (const v of new Set(a)) {
    if (
      !b.some(e => e === v) ||
      a.filter(e => e === v).length > b.filter(e => e === v).length
    )
      return false;
  }
  return true;
};

//--------------------------------


isContainedIn([1, 4], [2, 4, 1]); // true

//--------------------------------


const isLocalStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.localStorage.setItem(key, null);
    window.localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isLocalStorageEnabled(); // true, if localStorage is accessible

//--------------------------------


const isPrime = num => {
  const boundary = Math.floor(Math.sqrt(num));
  for (let i = 2; i <= boundary; i++) if (num % i === 0) return false;
  return num >= 2;
};

//--------------------------------


isPrime(11); // true

//--------------------------------


const isSameDate = (dateA, dateB) =>
  dateA.toISOString() === dateB.toISOString();

//--------------------------------


isSameDate(new Date(2010, 10, 20), new Date(2010, 10, 20)); // true

//--------------------------------


const isSessionStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.sessionStorage.setItem(key, null);
    window.sessionStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isSessionStorageEnabled(); // true, if sessionStorage is accessible

//--------------------------------


const kMeans = (data, k = 1) => {
  const centroids = data.slice(0, k);
  const distances = Array.from({ length: data.length }, () =>
    Array.from({ length: k }, () => 0)
  );
  const classes = Array.from({ length: data.length }, () => -1);
  let itr = true;

  while (itr) {
    itr = false;

    for (let d in data) {
      for (let c = 0; c < k; c++) {
        distances[d][c] = Math.hypot(
          ...Object.keys(data[0]).map(key => data[d][key] - centroids[c][key])
        );
      }
      const m = distances[d].indexOf(Math.min(...distances[d]));
      if (classes[d] !== m) itr = true;
      classes[d] = m;
    }

    for (let c = 0; c < k; c++) {
      centroids[c] = Array.from({ length: data[0].length }, () => 0);
      const size = data.reduce((acc, _, d) => {
        if (classes[d] === c) {
          acc++;
          for (let i in data[0]) centroids[c][i] += data[d][i];
        }
        return acc;
      }, 0);
      for (let i in data[0]) {
        centroids[c][i] = parseFloat(Number(centroids[c][i] / size).toFixed(2));
      }
    }
  }

  return classes;
};

//--------------------------------


kMeans([[0, 0], [0, 1], [1, 3], [2, 0]], 2); // [0, 1, 1, 0]

//--------------------------------


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

//--------------------------------


const randomIntArrayInRange = (min, max, n = 1) =>
  Array.from(
    { length: n },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );

//--------------------------------


randomIntArrayInRange(12, 35, 10); // [ 34, 14, 27, 17, 30, 27, 20, 26, 21, 14 ]

//--------------------------------


const randomIntegerInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

//--------------------------------


randomIntegerInRange(0, 5); // 2

//--------------------------------


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

//--------------------------------



const remove = (arr, func) =>
  Array.isArray(arr)
    ? arr.filter(func).reduce((acc, val) => {
      arr.splice(arr.indexOf(val), 1);
      return acc.concat(val);
    }, [])
    : [];

//--------------------------------


remove([1, 2, 3, 4], n => n % 2 === 0); // [2, 4]

//--------------------------------


const removeAccents = str =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

//--------------------------------


removeAccents('Antoine de Saint-Exupéry'); // 'Antoine de Saint-Exupery'

//--------------------------------


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

//--------------------------------


const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

//--------------------------------


scrollToTop(); // Smooth-scrolls to the top of the page

//--------------------------------


const sdbm = str => {
  let arr = str.split('');
  return arr.reduce(
    (hashCode, currentVal) =>
      (hashCode =
        currentVal.charCodeAt(0) +
        (hashCode << 6) +
        (hashCode << 16) -
        hashCode),
    0
  );
};

//--------------------------------


sdbm('name'); // -3521204949

//--------------------------------


const selectionSort = arr => {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    const min = a
      .slice(i + 1)
      .reduce((acc, val, j) => (val < a[acc] ? j + i + 1 : acc), i);
    if (min !== i) [a[i], a[min]] = [a[min], a[i]];
  }
  return a;
};

//--------------------------------


selectionSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const serializeCookie = (name, val) =>
  `${encodeURIComponent(name)}=${encodeURIComponent(val)}`;

//--------------------------------


serializeCookie('foo', 'bar'); // 'foo=bar'

//--------------------------------


const slugify = str =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

//--------------------------------


slugify('Hello World!'); // 'hello-world'

//--------------------------------


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

//--------------------------------


const sortedIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr.findIndex(el =>
    isDescending ? val >= fn(el) : val <= fn(el)
  );
  return index === -1 ? arr.length : index;
};

//--------------------------------


sortedIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 0

//--------------------------------


const sortedLastIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr
    .reverse()
    .findIndex(el => (isDescending ? n <= el : n >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndex([10, 20, 30, 30, 40], 30); // 4

//--------------------------------


const sortedLastIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr
    .map(fn)
    .reverse()
    .findIndex(el => (isDescending ? val <= el : val >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 1

//--------------------------------


const stringPermutations = str => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str
    .split('')
    .reduce(
      (acc, letter, i) =>
        acc.concat(
          stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(
            val => letter + val
          )
        ),
      []
    );
};

//--------------------------------


stringPermutations('abc'); // ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']

//--------------------------------


const supportsTouchEvents = () =>
  window && 'ontouchstart' in window;

//--------------------------------


supportsTouchEvents(); // true

//--------------------------------


const swapCase = str =>
  [...str]
    .map(c => (c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase()))
    .join('');

//--------------------------------


swapCase('Hello world!'); // 'hELLO WORLD!'

//--------------------------------


const takeRightUntil = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightUntil([1, 2, 3, 4], n => n < 3); // [3, 4]

//--------------------------------


const takeRightWhile = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (!fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const takeUntil = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeUntil([1, 2, 3, 4], n => n >= 3); // [1, 2]

//--------------------------------


const takeWhile = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (!fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

//--------------------------------


const toISOStringWithTimezone = date => {
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? '+' : '-';
  const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    diff + pad(tzOffset / 60) +
    ':' + pad(tzOffset % 60);
};

//--------------------------------


toISOStringWithTimezone(new Date()); // '2020-10-06T20:43:33-04:00'

//--------------------------------


const toOrdinalSuffix = num => {
  const int = parseInt(num),
    digits = [int % 10, int % 100],
    ordinals = ['st', 'nd', 'rd', 'th'],
    oPattern = [1, 2, 3, 4],
    tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
  return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
    ? int + ordinals[digits[0] - 1]
    : int + ordinals[3];
};

//--------------------------------


toOrdinalSuffix('123'); // '123rd'

//--------------------------------


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


const HSBToRGB = (h, s, b) => {
  s /= 100;
  b /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [255 * f(5), 255 * f(3), 255 * f(1)];
};

//--------------------------------


HSBToRGB(18, 81, 99); // [252.45, 109.31084999999996, 47.965499999999984]

//--------------------------------


const HSLToRGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

//--------------------------------


HSLToRGB(13, 100, 11); // [56.1, 12.155, 0]

//--------------------------------


const RGBToHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};

//--------------------------------


RGBToHSL(45, 23, 11); // [21.17647, 60.71428, 10.98039]

//--------------------------------


const RGBToHex = (r, g, b) =>
  ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');

//--------------------------------


RGBToHex(255, 165, 1); // 'ffa501'

//--------------------------------


const UUIDGeneratorBrowser = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );

//--------------------------------


UUIDGeneratorBrowser(); // '7982fcfe-5721-4632-bede-6000885be57d'

//--------------------------------


const crypto = require('crypto');

const UUIDGeneratorNode = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
  );

//--------------------------------


UUIDGeneratorNode(); // '79c7c136-60ee-40a2-beb2-856f1feabefc'

//--------------------------------


const approximatelyEqual = (v1, v2, epsilon = 0.001) =>
  Math.abs(v1 - v2) < epsilon;

//--------------------------------


approximatelyEqual(Math.PI / 2.0, 1.5708); // true

//--------------------------------


const arithmeticProgression  = (n, lim) =>
  Array.from({ length: Math.ceil(lim / n) }, (_, i) => (i + 1) * n );

//--------------------------------


arithmeticProgression(5, 25); // [5, 10, 15, 20, 25]

//--------------------------------


const arrayToHTMLList = (arr, listID) => 
  document.querySelector(`#${listID}`).innerHTML += arr
    .map(item => `<li>${item}</li>`)
    .join('');

//--------------------------------


arrayToHTMLList(['item 1', 'item 2'], 'myListID');

//--------------------------------


const binomialCoefficient = (n, k) => {
  if (Number.isNaN(n) || Number.isNaN(k)) return NaN;
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  if (k === 1 || k === n - 1) return n;
  if (n - k < k) k = n - k;
  let res = n;
  for (let j = 2; j <= k; j++) res *= (n - j + 1) / j;
  return Math.round(res);
};

//--------------------------------


binomialCoefficient(8, 2); // 28

//--------------------------------


const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight ||
    document.documentElement.clientHeight);

//--------------------------------


bottomVisible(); // true

//--------------------------------


const bubbleSort = arr => {
  let swapped = false;
  const a = [...arr];
  for (let i = 1; i < a.length - 1; i++) {
    swapped = false;
    for (let j = 0; j < a.length - i; j++) {
      if (a[j + 1] < a[j]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    if (!swapped) return a;
  }
  return a;
};

//--------------------------------


bubbleSort([2, 1, 4, 3]); // [1, 2, 3, 4]

//--------------------------------


const bucketSort = (arr, size = 5) => {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const buckets = Array.from(
    { length: Math.floor((max - min) / size) + 1 },
    () => []
  );
  arr.forEach(val => {
    buckets[Math.floor((val - min) / size)].push(val);
  });
  return buckets.reduce((acc, b) => [...acc, ...b.sort((a, b) => a - b)], []);
};

//--------------------------------


bucketSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const capitalizeEveryWord = str =>
  str.replace(/\b[a-z]/g, char => char.toUpperCase());

//--------------------------------


capitalizeEveryWord('hello world!'); // 'Hello World!'

//--------------------------------


const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

//--------------------------------


chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

//--------------------------------


const chunkIntoN = (arr, n) => {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}

//--------------------------------


chunkIntoN([1, 2, 3, 4, 5, 6, 7], 4); // [[1, 2], [3, 4], [5, 6], [7]]

//--------------------------------


const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

//--------------------------------


copyToClipboard('Lorem ipsum'); // 'Lorem ipsum' copied to clipboard.

//--------------------------------


const countOccurrences = (arr, val) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

//--------------------------------


countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3

//--------------------------------


const dayOfYear = date =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

//--------------------------------


dayOfYear(new Date()); // 272

//--------------------------------


const daysAgo = n => {
  let d = new Date();
  d.setDate(d.getDate() - Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysAgo(20); // 2020-09-16 (if current date is 2020-10-06)

//--------------------------------


const daysFromNow = n => {
  let d = new Date();
  d.setDate(d.getDate() + Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysFromNow(5); // 2020-10-13 (if current date is 2020-10-08)

//--------------------------------


const deepFlatten = arr =>
  [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));

//--------------------------------


deepFlatten([1, [2], [[3], 4], 5]); // [1, 2, 3, 4, 5]

//--------------------------------


const defaults = (obj, ...defs) =>
  Object.assign({}, obj, ...defs.reverse(), obj);

//--------------------------------


defaults({ a: 1 }, { b: 2 }, { b: 6 }, { a: 3 }); // { a: 1, b: 2 }

//--------------------------------


const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? 'Mobile'
    : 'Desktop';

//--------------------------------


detectDeviceType(); // 'Mobile' or 'Desktop'

//--------------------------------


const detectLanguage = (defaultLang = 'en-US') => 
  navigator.language ||
  (Array.isArray(navigator.languages) && navigator.languages[0]) ||
  defaultLang;

//--------------------------------


detectLanguage(); // 'nl-NL'

//--------------------------------


const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};

//--------------------------------


difference([1, 2, 3, 3], [1, 2, 4]); // [3, 3]

//--------------------------------


const dropRightWhile = (arr, func) => {
  let rightIndex = arr.length;
  while (rightIndex-- && !func(arr[rightIndex]));
  return arr.slice(0, rightIndex + 1);
};

//--------------------------------


dropRightWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const dropWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
  return arr;
};

//--------------------------------


dropWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const factorial = n =>
  n < 0
    ? (() => {
        throw new TypeError('Negative numbers are not allowed!');
      })()
    : n <= 1
    ? 1
    : n * factorial(n - 1);

//--------------------------------


factorial(6); // 720

//--------------------------------


const fibonacci = n =>
  Array.from({ length: n }).reduce(
    (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
    []
  );

//--------------------------------


fibonacci(6); // [0, 1, 1, 2, 3, 5]

//--------------------------------


const filterNonUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) === arr.lastIndexOf(i));

//--------------------------------


filterNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1, 3, 5]

//--------------------------------


const filterUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) !== arr.lastIndexOf(i));

//--------------------------------


filterUnique([1, 2, 2, 3, 4, 4, 5]); // [2, 4]

//--------------------------------


const flattenObject = (obj, prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}.` : '';
    if (
      typeof obj[k] === 'object' &&
      obj[k] !== null &&
      Object.keys(obj[k]).length > 0
    )
      Object.assign(acc, flattenObject(obj[k], pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});

//--------------------------------


flattenObject({ a: { b: { c: 1 } }, d: 1 }); // { 'a.b.c': 1, d: 1 }

//--------------------------------


const forEachRight = (arr, callback) =>
  arr
    .slice()
    .reverse()
    .forEach(callback);

//--------------------------------


forEachRight([1, 2, 3, 4], val => console.log(val)); // '4', '3', '2', '1'

//--------------------------------


const forOwn = (obj, fn) =>
  Object.keys(obj).forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwn({ foo: 'bar', a: 1 }, v => console.log(v)); // 'bar', 1

//--------------------------------


const forOwnRight = (obj, fn) =>
  Object.keys(obj)
    .reverse()
    .forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwnRight({ foo: 'bar', a: 1 }, v => console.log(v)); // 1, 'bar'

//--------------------------------


const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24);

//--------------------------------


getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')); // 9

//--------------------------------


const getElementsBiggerThanViewport = () => {
  const docWidth = document.documentElement.offsetWidth;
  return [...document.querySelectorAll('*')].filter(
    el => el.offsetWidth > docWidth
  );
};

//--------------------------------


getElementsBiggerThanViewport(); // <div id="ultra-wide-item" />

//--------------------------------


const getMonthsDiffBetweenDates = (dateInitial, dateFinal) =>
  Math.max(
    (dateFinal.getFullYear() - dateInitial.getFullYear()) * 12 +
      dateFinal.getMonth() -
      dateInitial.getMonth(),
    0
  );

//--------------------------------


getMonthsDiffBetweenDates(new Date('2017-12-13'), new Date('2018-04-29')); // 4

//--------------------------------


const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});

//--------------------------------


getScrollPosition(); // {x: 0, y: 200}

//--------------------------------


const getSiblings = el =>
  [...el.parentNode.childNodes].filter(node => node !== el);

//--------------------------------


getSiblings(document.querySelector('head')); // ['body']

//--------------------------------


const getType = v =>
  (v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name);

//--------------------------------


getType(new Set([1, 2, 3])); // 'Set'

//--------------------------------


const getVerticalOffset = el => {
  let offset = el.offsetTop,
    _el = el;
  while (_el.offsetParent) {
    _el = _el.offsetParent;
    offset += _el.offsetTop;
  }
  return offset;
};

//--------------------------------


getVerticalOffset('.my-element'); // 120

//--------------------------------


const hammingDistance = (num1, num2) =>
  ((num1 ^ num2).toString(2).match(/1/g) || '').length;

//--------------------------------


hammingDistance(2, 3); // 1

//--------------------------------


const haveSameContents = (a, b) => {
  for (const v of new Set([...a, ...b]))
    if (a.filter(e => e === v).length !== b.filter(e => e === v).length)
      return false;
  return true;
};

//--------------------------------


haveSameContents([1, 2, 4], [2, 4, 1]); // true

//--------------------------------


const heapsort = arr => {
  const a = [...arr];
  let l = a.length;

  const heapify = (a, i) => {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let max = i;
    if (left < l && a[left] > a[max]) max = left;
    if (right < l && a[right] > a[max]) max = right;
    if (max !== i) {
      [a[max], a[i]] = [a[i], a[max]];
      heapify(a, max);
    }
  };

  for (let i = Math.floor(l / 2); i >= 0; i -= 1) heapify(a, i);
  for (i = a.length - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    l--;
    heapify(a, 0);
  }
  return a;
};

//--------------------------------


heapsort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const initialize2DArray = (w, h, val = null) =>
  Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));

//--------------------------------


initialize2DArray(2, 2, 0); // [[0, 0], [0, 0]]

//--------------------------------


const initializeArrayWithValues = (n, val = 0) =>
  Array.from({ length: n }).fill(val);

//--------------------------------


initializeArrayWithValues(5, 2); // [2, 2, 2, 2, 2]

//--------------------------------


const insertionSort = arr =>
  arr.reduce((acc, x) => {
    if (!acc.length) return [x];
    acc.some((y, j) => {
      if (x <= y) {
        acc.splice(j, 0, x);
        return true;
      }
      if (x > y && j === acc.length - 1) {
        acc.splice(j + 1, 0, x);
        return true;
      }
      return false;
    });
    return acc;
  }, []);

//--------------------------------


insertionSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const intersection = (a, b) => {
  const s = new Set(b);
  return [...new Set(a)].filter(x => s.has(x));
};

//--------------------------------


intersection([1, 2, 3], [4, 3, 2]); // [2, 3]

//--------------------------------


const isAnagram = (str1, str2) => {
  const normalize = str =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, '')
      .split('')
      .sort()
      .join('');
  return normalize(str1) === normalize(str2);
};

//--------------------------------


isAnagram('iceman', 'cinema'); // true

//--------------------------------


const isContainedIn = (a, b) => {
  for (const v of new Set(a)) {
    if (
      !b.some(e => e === v) ||
      a.filter(e => e === v).length > b.filter(e => e === v).length
    )
      return false;
  }
  return true;
};

//--------------------------------


isContainedIn([1, 4], [2, 4, 1]); // true

//--------------------------------


const isLocalStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.localStorage.setItem(key, null);
    window.localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isLocalStorageEnabled(); // true, if localStorage is accessible

//--------------------------------


const isPrime = num => {
  const boundary = Math.floor(Math.sqrt(num));
  for (let i = 2; i <= boundary; i++) if (num % i === 0) return false;
  return num >= 2;
};

//--------------------------------


isPrime(11); // true

//--------------------------------


const isSameDate = (dateA, dateB) =>
  dateA.toISOString() === dateB.toISOString();

//--------------------------------


isSameDate(new Date(2010, 10, 20), new Date(2010, 10, 20)); // true

//--------------------------------


const isSessionStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.sessionStorage.setItem(key, null);
    window.sessionStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isSessionStorageEnabled(); // true, if sessionStorage is accessible

//--------------------------------


const kMeans = (data, k = 1) => {
  const centroids = data.slice(0, k);
  const distances = Array.from({ length: data.length }, () =>
    Array.from({ length: k }, () => 0)
  );
  const classes = Array.from({ length: data.length }, () => -1);
  let itr = true;

  while (itr) {
    itr = false;

    for (let d in data) {
      for (let c = 0; c < k; c++) {
        distances[d][c] = Math.hypot(
          ...Object.keys(data[0]).map(key => data[d][key] - centroids[c][key])
        );
      }
      const m = distances[d].indexOf(Math.min(...distances[d]));
      if (classes[d] !== m) itr = true;
      classes[d] = m;
    }

    for (let c = 0; c < k; c++) {
      centroids[c] = Array.from({ length: data[0].length }, () => 0);
      const size = data.reduce((acc, _, d) => {
        if (classes[d] === c) {
          acc++;
          for (let i in data[0]) centroids[c][i] += data[d][i];
        }
        return acc;
      }, 0);
      for (let i in data[0]) {
        centroids[c][i] = parseFloat(Number(centroids[c][i] / size).toFixed(2));
      }
    }
  }

  return classes;
};

//--------------------------------


kMeans([[0, 0], [0, 1], [1, 3], [2, 0]], 2); // [0, 1, 1, 0]

//--------------------------------


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

//--------------------------------


const randomIntArrayInRange = (min, max, n = 1) =>
  Array.from(
    { length: n },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );

//--------------------------------


randomIntArrayInRange(12, 35, 10); // [ 34, 14, 27, 17, 30, 27, 20, 26, 21, 14 ]

//--------------------------------


const randomIntegerInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

//--------------------------------


randomIntegerInRange(0, 5); // 2

//--------------------------------


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

//--------------------------------



const remove = (arr, func) =>
  Array.isArray(arr)
    ? arr.filter(func).reduce((acc, val) => {
      arr.splice(arr.indexOf(val), 1);
      return acc.concat(val);
    }, [])
    : [];

//--------------------------------


remove([1, 2, 3, 4], n => n % 2 === 0); // [2, 4]

//--------------------------------


const removeAccents = str =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

//--------------------------------


removeAccents('Antoine de Saint-Exupéry'); // 'Antoine de Saint-Exupery'

//--------------------------------


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

//--------------------------------


const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

//--------------------------------


scrollToTop(); // Smooth-scrolls to the top of the page

//--------------------------------


const sdbm = str => {
  let arr = str.split('');
  return arr.reduce(
    (hashCode, currentVal) =>
      (hashCode =
        currentVal.charCodeAt(0) +
        (hashCode << 6) +
        (hashCode << 16) -
        hashCode),
    0
  );
};

//--------------------------------


sdbm('name'); // -3521204949

//--------------------------------


const selectionSort = arr => {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    const min = a
      .slice(i + 1)
      .reduce((acc, val, j) => (val < a[acc] ? j + i + 1 : acc), i);
    if (min !== i) [a[i], a[min]] = [a[min], a[i]];
  }
  return a;
};

//--------------------------------


selectionSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const serializeCookie = (name, val) =>
  `${encodeURIComponent(name)}=${encodeURIComponent(val)}`;

//--------------------------------


serializeCookie('foo', 'bar'); // 'foo=bar'

//--------------------------------


const slugify = str =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

//--------------------------------


slugify('Hello World!'); // 'hello-world'

//--------------------------------


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

//--------------------------------


const sortedIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr.findIndex(el =>
    isDescending ? val >= fn(el) : val <= fn(el)
  );
  return index === -1 ? arr.length : index;
};

//--------------------------------


sortedIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 0

//--------------------------------


const sortedLastIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr
    .reverse()
    .findIndex(el => (isDescending ? n <= el : n >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndex([10, 20, 30, 30, 40], 30); // 4

//--------------------------------


const sortedLastIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr
    .map(fn)
    .reverse()
    .findIndex(el => (isDescending ? val <= el : val >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 1

//--------------------------------


const stringPermutations = str => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str
    .split('')
    .reduce(
      (acc, letter, i) =>
        acc.concat(
          stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(
            val => letter + val
          )
        ),
      []
    );
};

//--------------------------------


stringPermutations('abc'); // ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']

//--------------------------------


const supportsTouchEvents = () =>
  window && 'ontouchstart' in window;

//--------------------------------


supportsTouchEvents(); // true

//--------------------------------


const swapCase = str =>
  [...str]
    .map(c => (c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase()))
    .join('');

//--------------------------------


swapCase('Hello world!'); // 'hELLO WORLD!'

//--------------------------------


const takeRightUntil = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightUntil([1, 2, 3, 4], n => n < 3); // [3, 4]

//--------------------------------


const takeRightWhile = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (!fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const takeUntil = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeUntil([1, 2, 3, 4], n => n >= 3); // [1, 2]

//--------------------------------


const takeWhile = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (!fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

//--------------------------------


const toISOStringWithTimezone = date => {
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? '+' : '-';
  const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    diff + pad(tzOffset / 60) +
    ':' + pad(tzOffset % 60);
};

//--------------------------------


toISOStringWithTimezone(new Date()); // '2020-10-06T20:43:33-04:00'

//--------------------------------


const toOrdinalSuffix = num => {
  const int = parseInt(num),
    digits = [int % 10, int % 100],
    ordinals = ['st', 'nd', 'rd', 'th'],
    oPattern = [1, 2, 3, 4],
    tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
  return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
    ? int + ordinals[digits[0] - 1]
    : int + ordinals[3];
};

//--------------------------------


toOrdinalSuffix('123'); // '123rd'

//--------------------------------


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


const HSBToRGB = (h, s, b) => {
  s /= 100;
  b /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [255 * f(5), 255 * f(3), 255 * f(1)];
};

//--------------------------------


HSBToRGB(18, 81, 99); // [252.45, 109.31084999999996, 47.965499999999984]

//--------------------------------


const HSLToRGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

//--------------------------------


HSLToRGB(13, 100, 11); // [56.1, 12.155, 0]

//--------------------------------


const RGBToHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};

//--------------------------------


RGBToHSL(45, 23, 11); // [21.17647, 60.71428, 10.98039]

//--------------------------------


const RGBToHex = (r, g, b) =>
  ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');

//--------------------------------


RGBToHex(255, 165, 1); // 'ffa501'

//--------------------------------


const UUIDGeneratorBrowser = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );

//--------------------------------


UUIDGeneratorBrowser(); // '7982fcfe-5721-4632-bede-6000885be57d'

//--------------------------------


const crypto = require('crypto');

const UUIDGeneratorNode = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
  );

//--------------------------------


UUIDGeneratorNode(); // '79c7c136-60ee-40a2-beb2-856f1feabefc'

//--------------------------------


const approximatelyEqual = (v1, v2, epsilon = 0.001) =>
  Math.abs(v1 - v2) < epsilon;

//--------------------------------


approximatelyEqual(Math.PI / 2.0, 1.5708); // true

//--------------------------------


const arithmeticProgression  = (n, lim) =>
  Array.from({ length: Math.ceil(lim / n) }, (_, i) => (i + 1) * n );

//--------------------------------


arithmeticProgression(5, 25); // [5, 10, 15, 20, 25]

//--------------------------------


const arrayToHTMLList = (arr, listID) => 
  document.querySelector(`#${listID}`).innerHTML += arr
    .map(item => `<li>${item}</li>`)
    .join('');

//--------------------------------


arrayToHTMLList(['item 1', 'item 2'], 'myListID');

//--------------------------------


const binomialCoefficient = (n, k) => {
  if (Number.isNaN(n) || Number.isNaN(k)) return NaN;
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  if (k === 1 || k === n - 1) return n;
  if (n - k < k) k = n - k;
  let res = n;
  for (let j = 2; j <= k; j++) res *= (n - j + 1) / j;
  return Math.round(res);
};

//--------------------------------


binomialCoefficient(8, 2); // 28

//--------------------------------


const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight ||
    document.documentElement.clientHeight);

//--------------------------------


bottomVisible(); // true

//--------------------------------


const bubbleSort = arr => {
  let swapped = false;
  const a = [...arr];
  for (let i = 1; i < a.length - 1; i++) {
    swapped = false;
    for (let j = 0; j < a.length - i; j++) {
      if (a[j + 1] < a[j]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    if (!swapped) return a;
  }
  return a;
};

//--------------------------------


bubbleSort([2, 1, 4, 3]); // [1, 2, 3, 4]

//--------------------------------


const bucketSort = (arr, size = 5) => {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const buckets = Array.from(
    { length: Math.floor((max - min) / size) + 1 },
    () => []
  );
  arr.forEach(val => {
    buckets[Math.floor((val - min) / size)].push(val);
  });
  return buckets.reduce((acc, b) => [...acc, ...b.sort((a, b) => a - b)], []);
};

//--------------------------------


bucketSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const capitalizeEveryWord = str =>
  str.replace(/\b[a-z]/g, char => char.toUpperCase());

//--------------------------------


capitalizeEveryWord('hello world!'); // 'Hello World!'

//--------------------------------


const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

//--------------------------------


chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

//--------------------------------


const chunkIntoN = (arr, n) => {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}

//--------------------------------


chunkIntoN([1, 2, 3, 4, 5, 6, 7], 4); // [[1, 2], [3, 4], [5, 6], [7]]

//--------------------------------


const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

//--------------------------------


copyToClipboard('Lorem ipsum'); // 'Lorem ipsum' copied to clipboard.

//--------------------------------


const countOccurrences = (arr, val) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

//--------------------------------


countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3

//--------------------------------


const dayOfYear = date =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

//--------------------------------


dayOfYear(new Date()); // 272

//--------------------------------


const daysAgo = n => {
  let d = new Date();
  d.setDate(d.getDate() - Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysAgo(20); // 2020-09-16 (if current date is 2020-10-06)

//--------------------------------


const daysFromNow = n => {
  let d = new Date();
  d.setDate(d.getDate() + Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysFromNow(5); // 2020-10-13 (if current date is 2020-10-08)

//--------------------------------


const deepFlatten = arr =>
  [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));

//--------------------------------


deepFlatten([1, [2], [[3], 4], 5]); // [1, 2, 3, 4, 5]

//--------------------------------


const defaults = (obj, ...defs) =>
  Object.assign({}, obj, ...defs.reverse(), obj);

//--------------------------------


defaults({ a: 1 }, { b: 2 }, { b: 6 }, { a: 3 }); // { a: 1, b: 2 }

//--------------------------------


const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? 'Mobile'
    : 'Desktop';

//--------------------------------


detectDeviceType(); // 'Mobile' or 'Desktop'

//--------------------------------


const detectLanguage = (defaultLang = 'en-US') => 
  navigator.language ||
  (Array.isArray(navigator.languages) && navigator.languages[0]) ||
  defaultLang;

//--------------------------------


detectLanguage(); // 'nl-NL'

//--------------------------------


const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};

//--------------------------------


difference([1, 2, 3, 3], [1, 2, 4]); // [3, 3]

//--------------------------------


const dropRightWhile = (arr, func) => {
  let rightIndex = arr.length;
  while (rightIndex-- && !func(arr[rightIndex]));
  return arr.slice(0, rightIndex + 1);
};

//--------------------------------


dropRightWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const dropWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
  return arr;
};

//--------------------------------


dropWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const factorial = n =>
  n < 0
    ? (() => {
        throw new TypeError('Negative numbers are not allowed!');
      })()
    : n <= 1
    ? 1
    : n * factorial(n - 1);

//--------------------------------


factorial(6); // 720

//--------------------------------


const fibonacci = n =>
  Array.from({ length: n }).reduce(
    (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
    []
  );

//--------------------------------


fibonacci(6); // [0, 1, 1, 2, 3, 5]

//--------------------------------


const filterNonUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) === arr.lastIndexOf(i));

//--------------------------------


filterNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1, 3, 5]

//--------------------------------


const filterUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) !== arr.lastIndexOf(i));

//--------------------------------


filterUnique([1, 2, 2, 3, 4, 4, 5]); // [2, 4]

//--------------------------------


const flattenObject = (obj, prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}.` : '';
    if (
      typeof obj[k] === 'object' &&
      obj[k] !== null &&
      Object.keys(obj[k]).length > 0
    )
      Object.assign(acc, flattenObject(obj[k], pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});

//--------------------------------


flattenObject({ a: { b: { c: 1 } }, d: 1 }); // { 'a.b.c': 1, d: 1 }

//--------------------------------


const forEachRight = (arr, callback) =>
  arr
    .slice()
    .reverse()
    .forEach(callback);

//--------------------------------


forEachRight([1, 2, 3, 4], val => console.log(val)); // '4', '3', '2', '1'

//--------------------------------


const forOwn = (obj, fn) =>
  Object.keys(obj).forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwn({ foo: 'bar', a: 1 }, v => console.log(v)); // 'bar', 1

//--------------------------------


const forOwnRight = (obj, fn) =>
  Object.keys(obj)
    .reverse()
    .forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwnRight({ foo: 'bar', a: 1 }, v => console.log(v)); // 1, 'bar'

//--------------------------------


const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24);

//--------------------------------


getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')); // 9

//--------------------------------


const getElementsBiggerThanViewport = () => {
  const docWidth = document.documentElement.offsetWidth;
  return [...document.querySelectorAll('*')].filter(
    el => el.offsetWidth > docWidth
  );
};

//--------------------------------


getElementsBiggerThanViewport(); // <div id="ultra-wide-item" />

//--------------------------------


const getMonthsDiffBetweenDates = (dateInitial, dateFinal) =>
  Math.max(
    (dateFinal.getFullYear() - dateInitial.getFullYear()) * 12 +
      dateFinal.getMonth() -
      dateInitial.getMonth(),
    0
  );

//--------------------------------


getMonthsDiffBetweenDates(new Date('2017-12-13'), new Date('2018-04-29')); // 4

//--------------------------------


const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});

//--------------------------------


getScrollPosition(); // {x: 0, y: 200}

//--------------------------------


const getSiblings = el =>
  [...el.parentNode.childNodes].filter(node => node !== el);

//--------------------------------


getSiblings(document.querySelector('head')); // ['body']

//--------------------------------


const getType = v =>
  (v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name);

//--------------------------------


getType(new Set([1, 2, 3])); // 'Set'

//--------------------------------


const getVerticalOffset = el => {
  let offset = el.offsetTop,
    _el = el;
  while (_el.offsetParent) {
    _el = _el.offsetParent;
    offset += _el.offsetTop;
  }
  return offset;
};

//--------------------------------


getVerticalOffset('.my-element'); // 120

//--------------------------------


const hammingDistance = (num1, num2) =>
  ((num1 ^ num2).toString(2).match(/1/g) || '').length;

//--------------------------------


hammingDistance(2, 3); // 1

//--------------------------------


const haveSameContents = (a, b) => {
  for (const v of new Set([...a, ...b]))
    if (a.filter(e => e === v).length !== b.filter(e => e === v).length)
      return false;
  return true;
};

//--------------------------------


haveSameContents([1, 2, 4], [2, 4, 1]); // true

//--------------------------------


const heapsort = arr => {
  const a = [...arr];
  let l = a.length;

  const heapify = (a, i) => {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let max = i;
    if (left < l && a[left] > a[max]) max = left;
    if (right < l && a[right] > a[max]) max = right;
    if (max !== i) {
      [a[max], a[i]] = [a[i], a[max]];
      heapify(a, max);
    }
  };

  for (let i = Math.floor(l / 2); i >= 0; i -= 1) heapify(a, i);
  for (i = a.length - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    l--;
    heapify(a, 0);
  }
  return a;
};

//--------------------------------


heapsort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const initialize2DArray = (w, h, val = null) =>
  Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));

//--------------------------------


initialize2DArray(2, 2, 0); // [[0, 0], [0, 0]]

//--------------------------------


const initializeArrayWithValues = (n, val = 0) =>
  Array.from({ length: n }).fill(val);

//--------------------------------


initializeArrayWithValues(5, 2); // [2, 2, 2, 2, 2]

//--------------------------------


const insertionSort = arr =>
  arr.reduce((acc, x) => {
    if (!acc.length) return [x];
    acc.some((y, j) => {
      if (x <= y) {
        acc.splice(j, 0, x);
        return true;
      }
      if (x > y && j === acc.length - 1) {
        acc.splice(j + 1, 0, x);
        return true;
      }
      return false;
    });
    return acc;
  }, []);

//--------------------------------


insertionSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const intersection = (a, b) => {
  const s = new Set(b);
  return [...new Set(a)].filter(x => s.has(x));
};

//--------------------------------


intersection([1, 2, 3], [4, 3, 2]); // [2, 3]

//--------------------------------


const isAnagram = (str1, str2) => {
  const normalize = str =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, '')
      .split('')
      .sort()
      .join('');
  return normalize(str1) === normalize(str2);
};

//--------------------------------


isAnagram('iceman', 'cinema'); // true

//--------------------------------


const isContainedIn = (a, b) => {
  for (const v of new Set(a)) {
    if (
      !b.some(e => e === v) ||
      a.filter(e => e === v).length > b.filter(e => e === v).length
    )
      return false;
  }
  return true;
};

//--------------------------------


isContainedIn([1, 4], [2, 4, 1]); // true

//--------------------------------


const isLocalStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.localStorage.setItem(key, null);
    window.localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isLocalStorageEnabled(); // true, if localStorage is accessible

//--------------------------------


const isPrime = num => {
  const boundary = Math.floor(Math.sqrt(num));
  for (let i = 2; i <= boundary; i++) if (num % i === 0) return false;
  return num >= 2;
};

//--------------------------------


isPrime(11); // true

//--------------------------------


const isSameDate = (dateA, dateB) =>
  dateA.toISOString() === dateB.toISOString();

//--------------------------------


isSameDate(new Date(2010, 10, 20), new Date(2010, 10, 20)); // true

//--------------------------------


const isSessionStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.sessionStorage.setItem(key, null);
    window.sessionStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isSessionStorageEnabled(); // true, if sessionStorage is accessible

//--------------------------------


const kMeans = (data, k = 1) => {
  const centroids = data.slice(0, k);
  const distances = Array.from({ length: data.length }, () =>
    Array.from({ length: k }, () => 0)
  );
  const classes = Array.from({ length: data.length }, () => -1);
  let itr = true;

  while (itr) {
    itr = false;

    for (let d in data) {
      for (let c = 0; c < k; c++) {
        distances[d][c] = Math.hypot(
          ...Object.keys(data[0]).map(key => data[d][key] - centroids[c][key])
        );
      }
      const m = distances[d].indexOf(Math.min(...distances[d]));
      if (classes[d] !== m) itr = true;
      classes[d] = m;
    }

    for (let c = 0; c < k; c++) {
      centroids[c] = Array.from({ length: data[0].length }, () => 0);
      const size = data.reduce((acc, _, d) => {
        if (classes[d] === c) {
          acc++;
          for (let i in data[0]) centroids[c][i] += data[d][i];
        }
        return acc;
      }, 0);
      for (let i in data[0]) {
        centroids[c][i] = parseFloat(Number(centroids[c][i] / size).toFixed(2));
      }
    }
  }

  return classes;
};

//--------------------------------


kMeans([[0, 0], [0, 1], [1, 3], [2, 0]], 2); // [0, 1, 1, 0]

//--------------------------------


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

//--------------------------------


const randomIntArrayInRange = (min, max, n = 1) =>
  Array.from(
    { length: n },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );

//--------------------------------


randomIntArrayInRange(12, 35, 10); // [ 34, 14, 27, 17, 30, 27, 20, 26, 21, 14 ]

//--------------------------------


const randomIntegerInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

//--------------------------------


randomIntegerInRange(0, 5); // 2

//--------------------------------


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

//--------------------------------



const remove = (arr, func) =>
  Array.isArray(arr)
    ? arr.filter(func).reduce((acc, val) => {
      arr.splice(arr.indexOf(val), 1);
      return acc.concat(val);
    }, [])
    : [];

//--------------------------------


remove([1, 2, 3, 4], n => n % 2 === 0); // [2, 4]

//--------------------------------


const removeAccents = str =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

//--------------------------------


removeAccents('Antoine de Saint-Exupéry'); // 'Antoine de Saint-Exupery'

//--------------------------------


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

//--------------------------------


const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

//--------------------------------


scrollToTop(); // Smooth-scrolls to the top of the page

//--------------------------------


const sdbm = str => {
  let arr = str.split('');
  return arr.reduce(
    (hashCode, currentVal) =>
      (hashCode =
        currentVal.charCodeAt(0) +
        (hashCode << 6) +
        (hashCode << 16) -
        hashCode),
    0
  );
};

//--------------------------------


sdbm('name'); // -3521204949

//--------------------------------


const selectionSort = arr => {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    const min = a
      .slice(i + 1)
      .reduce((acc, val, j) => (val < a[acc] ? j + i + 1 : acc), i);
    if (min !== i) [a[i], a[min]] = [a[min], a[i]];
  }
  return a;
};

//--------------------------------


selectionSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const serializeCookie = (name, val) =>
  `${encodeURIComponent(name)}=${encodeURIComponent(val)}`;

//--------------------------------


serializeCookie('foo', 'bar'); // 'foo=bar'

//--------------------------------


const slugify = str =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

//--------------------------------


slugify('Hello World!'); // 'hello-world'

//--------------------------------


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

//--------------------------------


const sortedIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr.findIndex(el =>
    isDescending ? val >= fn(el) : val <= fn(el)
  );
  return index === -1 ? arr.length : index;
};

//--------------------------------


sortedIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 0

//--------------------------------


const sortedLastIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr
    .reverse()
    .findIndex(el => (isDescending ? n <= el : n >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndex([10, 20, 30, 30, 40], 30); // 4

//--------------------------------


const sortedLastIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr
    .map(fn)
    .reverse()
    .findIndex(el => (isDescending ? val <= el : val >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 1

//--------------------------------


const stringPermutations = str => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str
    .split('')
    .reduce(
      (acc, letter, i) =>
        acc.concat(
          stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(
            val => letter + val
          )
        ),
      []
    );
};

//--------------------------------


stringPermutations('abc'); // ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']

//--------------------------------


const supportsTouchEvents = () =>
  window && 'ontouchstart' in window;

//--------------------------------


supportsTouchEvents(); // true

//--------------------------------


const swapCase = str =>
  [...str]
    .map(c => (c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase()))
    .join('');

//--------------------------------


swapCase('Hello world!'); // 'hELLO WORLD!'

//--------------------------------


const takeRightUntil = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightUntil([1, 2, 3, 4], n => n < 3); // [3, 4]

//--------------------------------


const takeRightWhile = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (!fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const takeUntil = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeUntil([1, 2, 3, 4], n => n >= 3); // [1, 2]

//--------------------------------


const takeWhile = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (!fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

//--------------------------------


const toISOStringWithTimezone = date => {
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? '+' : '-';
  const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    diff + pad(tzOffset / 60) +
    ':' + pad(tzOffset % 60);
};

//--------------------------------


toISOStringWithTimezone(new Date()); // '2020-10-06T20:43:33-04:00'

//--------------------------------


const toOrdinalSuffix = num => {
  const int = parseInt(num),
    digits = [int % 10, int % 100],
    ordinals = ['st', 'nd', 'rd', 'th'],
    oPattern = [1, 2, 3, 4],
    tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
  return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
    ? int + ordinals[digits[0] - 1]
    : int + ordinals[3];
};

//--------------------------------


toOrdinalSuffix('123'); // '123rd'

//--------------------------------


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


const HSBToRGB = (h, s, b) => {
  s /= 100;
  b /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [255 * f(5), 255 * f(3), 255 * f(1)];
};

//--------------------------------


HSBToRGB(18, 81, 99); // [252.45, 109.31084999999996, 47.965499999999984]

//--------------------------------


const HSLToRGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

//--------------------------------


HSLToRGB(13, 100, 11); // [56.1, 12.155, 0]

//--------------------------------


const RGBToHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};

//--------------------------------


RGBToHSL(45, 23, 11); // [21.17647, 60.71428, 10.98039]

//--------------------------------


const RGBToHex = (r, g, b) =>
  ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');

//--------------------------------


RGBToHex(255, 165, 1); // 'ffa501'

//--------------------------------


const UUIDGeneratorBrowser = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );

//--------------------------------


UUIDGeneratorBrowser(); // '7982fcfe-5721-4632-bede-6000885be57d'

//--------------------------------


const crypto = require('crypto');

const UUIDGeneratorNode = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
  );

//--------------------------------


UUIDGeneratorNode(); // '79c7c136-60ee-40a2-beb2-856f1feabefc'

//--------------------------------


const approximatelyEqual = (v1, v2, epsilon = 0.001) =>
  Math.abs(v1 - v2) < epsilon;

//--------------------------------


approximatelyEqual(Math.PI / 2.0, 1.5708); // true

//--------------------------------


const arithmeticProgression  = (n, lim) =>
  Array.from({ length: Math.ceil(lim / n) }, (_, i) => (i + 1) * n );

//--------------------------------


arithmeticProgression(5, 25); // [5, 10, 15, 20, 25]

//--------------------------------


const arrayToHTMLList = (arr, listID) => 
  document.querySelector(`#${listID}`).innerHTML += arr
    .map(item => `<li>${item}</li>`)
    .join('');

//--------------------------------


arrayToHTMLList(['item 1', 'item 2'], 'myListID');

//--------------------------------


const binomialCoefficient = (n, k) => {
  if (Number.isNaN(n) || Number.isNaN(k)) return NaN;
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  if (k === 1 || k === n - 1) return n;
  if (n - k < k) k = n - k;
  let res = n;
  for (let j = 2; j <= k; j++) res *= (n - j + 1) / j;
  return Math.round(res);
};

//--------------------------------


binomialCoefficient(8, 2); // 28

//--------------------------------


const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight ||
    document.documentElement.clientHeight);

//--------------------------------


bottomVisible(); // true

//--------------------------------


const bubbleSort = arr => {
  let swapped = false;
  const a = [...arr];
  for (let i = 1; i < a.length - 1; i++) {
    swapped = false;
    for (let j = 0; j < a.length - i; j++) {
      if (a[j + 1] < a[j]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    if (!swapped) return a;
  }
  return a;
};

//--------------------------------


bubbleSort([2, 1, 4, 3]); // [1, 2, 3, 4]

//--------------------------------


const bucketSort = (arr, size = 5) => {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const buckets = Array.from(
    { length: Math.floor((max - min) / size) + 1 },
    () => []
  );
  arr.forEach(val => {
    buckets[Math.floor((val - min) / size)].push(val);
  });
  return buckets.reduce((acc, b) => [...acc, ...b.sort((a, b) => a - b)], []);
};

//--------------------------------


bucketSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const capitalizeEveryWord = str =>
  str.replace(/\b[a-z]/g, char => char.toUpperCase());

//--------------------------------


capitalizeEveryWord('hello world!'); // 'Hello World!'

//--------------------------------


const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

//--------------------------------


chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

//--------------------------------


const chunkIntoN = (arr, n) => {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}

//--------------------------------


chunkIntoN([1, 2, 3, 4, 5, 6, 7], 4); // [[1, 2], [3, 4], [5, 6], [7]]

//--------------------------------


const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

//--------------------------------


copyToClipboard('Lorem ipsum'); // 'Lorem ipsum' copied to clipboard.

//--------------------------------


const countOccurrences = (arr, val) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

//--------------------------------


countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3

//--------------------------------


const dayOfYear = date =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

//--------------------------------


dayOfYear(new Date()); // 272

//--------------------------------


const daysAgo = n => {
  let d = new Date();
  d.setDate(d.getDate() - Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysAgo(20); // 2020-09-16 (if current date is 2020-10-06)

//--------------------------------


const daysFromNow = n => {
  let d = new Date();
  d.setDate(d.getDate() + Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysFromNow(5); // 2020-10-13 (if current date is 2020-10-08)

//--------------------------------


const deepFlatten = arr =>
  [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));

//--------------------------------


deepFlatten([1, [2], [[3], 4], 5]); // [1, 2, 3, 4, 5]

//--------------------------------


const defaults = (obj, ...defs) =>
  Object.assign({}, obj, ...defs.reverse(), obj);

//--------------------------------


defaults({ a: 1 }, { b: 2 }, { b: 6 }, { a: 3 }); // { a: 1, b: 2 }

//--------------------------------


const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? 'Mobile'
    : 'Desktop';

//--------------------------------


detectDeviceType(); // 'Mobile' or 'Desktop'

//--------------------------------


const detectLanguage = (defaultLang = 'en-US') => 
  navigator.language ||
  (Array.isArray(navigator.languages) && navigator.languages[0]) ||
  defaultLang;

//--------------------------------


detectLanguage(); // 'nl-NL'

//--------------------------------


const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};

//--------------------------------


difference([1, 2, 3, 3], [1, 2, 4]); // [3, 3]

//--------------------------------


const dropRightWhile = (arr, func) => {
  let rightIndex = arr.length;
  while (rightIndex-- && !func(arr[rightIndex]));
  return arr.slice(0, rightIndex + 1);
};

//--------------------------------


dropRightWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const dropWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
  return arr;
};

//--------------------------------


dropWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const factorial = n =>
  n < 0
    ? (() => {
        throw new TypeError('Negative numbers are not allowed!');
      })()
    : n <= 1
    ? 1
    : n * factorial(n - 1);

//--------------------------------


factorial(6); // 720

//--------------------------------


const fibonacci = n =>
  Array.from({ length: n }).reduce(
    (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
    []
  );

//--------------------------------


fibonacci(6); // [0, 1, 1, 2, 3, 5]

//--------------------------------


const filterNonUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) === arr.lastIndexOf(i));

//--------------------------------


filterNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1, 3, 5]

//--------------------------------


const filterUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) !== arr.lastIndexOf(i));

//--------------------------------


filterUnique([1, 2, 2, 3, 4, 4, 5]); // [2, 4]

//--------------------------------


const flattenObject = (obj, prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}.` : '';
    if (
      typeof obj[k] === 'object' &&
      obj[k] !== null &&
      Object.keys(obj[k]).length > 0
    )
      Object.assign(acc, flattenObject(obj[k], pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});

//--------------------------------


flattenObject({ a: { b: { c: 1 } }, d: 1 }); // { 'a.b.c': 1, d: 1 }

//--------------------------------


const forEachRight = (arr, callback) =>
  arr
    .slice()
    .reverse()
    .forEach(callback);

//--------------------------------


forEachRight([1, 2, 3, 4], val => console.log(val)); // '4', '3', '2', '1'

//--------------------------------


const forOwn = (obj, fn) =>
  Object.keys(obj).forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwn({ foo: 'bar', a: 1 }, v => console.log(v)); // 'bar', 1

//--------------------------------


const forOwnRight = (obj, fn) =>
  Object.keys(obj)
    .reverse()
    .forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwnRight({ foo: 'bar', a: 1 }, v => console.log(v)); // 1, 'bar'

//--------------------------------


const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24);

//--------------------------------


getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')); // 9

//--------------------------------


const getElementsBiggerThanViewport = () => {
  const docWidth = document.documentElement.offsetWidth;
  return [...document.querySelectorAll('*')].filter(
    el => el.offsetWidth > docWidth
  );
};

//--------------------------------


getElementsBiggerThanViewport(); // <div id="ultra-wide-item" />

//--------------------------------


const getMonthsDiffBetweenDates = (dateInitial, dateFinal) =>
  Math.max(
    (dateFinal.getFullYear() - dateInitial.getFullYear()) * 12 +
      dateFinal.getMonth() -
      dateInitial.getMonth(),
    0
  );

//--------------------------------


getMonthsDiffBetweenDates(new Date('2017-12-13'), new Date('2018-04-29')); // 4

//--------------------------------


const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});

//--------------------------------


getScrollPosition(); // {x: 0, y: 200}

//--------------------------------


const getSiblings = el =>
  [...el.parentNode.childNodes].filter(node => node !== el);

//--------------------------------


getSiblings(document.querySelector('head')); // ['body']

//--------------------------------


const getType = v =>
  (v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name);

//--------------------------------


getType(new Set([1, 2, 3])); // 'Set'

//--------------------------------


const getVerticalOffset = el => {
  let offset = el.offsetTop,
    _el = el;
  while (_el.offsetParent) {
    _el = _el.offsetParent;
    offset += _el.offsetTop;
  }
  return offset;
};

//--------------------------------


getVerticalOffset('.my-element'); // 120

//--------------------------------


const hammingDistance = (num1, num2) =>
  ((num1 ^ num2).toString(2).match(/1/g) || '').length;

//--------------------------------


hammingDistance(2, 3); // 1

//--------------------------------


const haveSameContents = (a, b) => {
  for (const v of new Set([...a, ...b]))
    if (a.filter(e => e === v).length !== b.filter(e => e === v).length)
      return false;
  return true;
};

//--------------------------------


haveSameContents([1, 2, 4], [2, 4, 1]); // true

//--------------------------------


const heapsort = arr => {
  const a = [...arr];
  let l = a.length;

  const heapify = (a, i) => {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let max = i;
    if (left < l && a[left] > a[max]) max = left;
    if (right < l && a[right] > a[max]) max = right;
    if (max !== i) {
      [a[max], a[i]] = [a[i], a[max]];
      heapify(a, max);
    }
  };

  for (let i = Math.floor(l / 2); i >= 0; i -= 1) heapify(a, i);
  for (i = a.length - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    l--;
    heapify(a, 0);
  }
  return a;
};

//--------------------------------


heapsort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const initialize2DArray = (w, h, val = null) =>
  Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));

//--------------------------------


initialize2DArray(2, 2, 0); // [[0, 0], [0, 0]]

//--------------------------------


const initializeArrayWithValues = (n, val = 0) =>
  Array.from({ length: n }).fill(val);

//--------------------------------


initializeArrayWithValues(5, 2); // [2, 2, 2, 2, 2]

//--------------------------------


const insertionSort = arr =>
  arr.reduce((acc, x) => {
    if (!acc.length) return [x];
    acc.some((y, j) => {
      if (x <= y) {
        acc.splice(j, 0, x);
        return true;
      }
      if (x > y && j === acc.length - 1) {
        acc.splice(j + 1, 0, x);
        return true;
      }
      return false;
    });
    return acc;
  }, []);

//--------------------------------


insertionSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const intersection = (a, b) => {
  const s = new Set(b);
  return [...new Set(a)].filter(x => s.has(x));
};

//--------------------------------


intersection([1, 2, 3], [4, 3, 2]); // [2, 3]

//--------------------------------


const isAnagram = (str1, str2) => {
  const normalize = str =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, '')
      .split('')
      .sort()
      .join('');
  return normalize(str1) === normalize(str2);
};

//--------------------------------


isAnagram('iceman', 'cinema'); // true

//--------------------------------


const isContainedIn = (a, b) => {
  for (const v of new Set(a)) {
    if (
      !b.some(e => e === v) ||
      a.filter(e => e === v).length > b.filter(e => e === v).length
    )
      return false;
  }
  return true;
};

//--------------------------------


isContainedIn([1, 4], [2, 4, 1]); // true

//--------------------------------


const isLocalStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.localStorage.setItem(key, null);
    window.localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isLocalStorageEnabled(); // true, if localStorage is accessible

//--------------------------------


const isPrime = num => {
  const boundary = Math.floor(Math.sqrt(num));
  for (let i = 2; i <= boundary; i++) if (num % i === 0) return false;
  return num >= 2;
};

//--------------------------------


isPrime(11); // true

//--------------------------------


const isSameDate = (dateA, dateB) =>
  dateA.toISOString() === dateB.toISOString();

//--------------------------------


isSameDate(new Date(2010, 10, 20), new Date(2010, 10, 20)); // true

//--------------------------------


const isSessionStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.sessionStorage.setItem(key, null);
    window.sessionStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isSessionStorageEnabled(); // true, if sessionStorage is accessible

//--------------------------------


const kMeans = (data, k = 1) => {
  const centroids = data.slice(0, k);
  const distances = Array.from({ length: data.length }, () =>
    Array.from({ length: k }, () => 0)
  );
  const classes = Array.from({ length: data.length }, () => -1);
  let itr = true;

  while (itr) {
    itr = false;

    for (let d in data) {
      for (let c = 0; c < k; c++) {
        distances[d][c] = Math.hypot(
          ...Object.keys(data[0]).map(key => data[d][key] - centroids[c][key])
        );
      }
      const m = distances[d].indexOf(Math.min(...distances[d]));
      if (classes[d] !== m) itr = true;
      classes[d] = m;
    }

    for (let c = 0; c < k; c++) {
      centroids[c] = Array.from({ length: data[0].length }, () => 0);
      const size = data.reduce((acc, _, d) => {
        if (classes[d] === c) {
          acc++;
          for (let i in data[0]) centroids[c][i] += data[d][i];
        }
        return acc;
      }, 0);
      for (let i in data[0]) {
        centroids[c][i] = parseFloat(Number(centroids[c][i] / size).toFixed(2));
      }
    }
  }

  return classes;
};

//--------------------------------


kMeans([[0, 0], [0, 1], [1, 3], [2, 0]], 2); // [0, 1, 1, 0]

//--------------------------------


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

//--------------------------------


const randomIntArrayInRange = (min, max, n = 1) =>
  Array.from(
    { length: n },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );

//--------------------------------


randomIntArrayInRange(12, 35, 10); // [ 34, 14, 27, 17, 30, 27, 20, 26, 21, 14 ]

//--------------------------------


const randomIntegerInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

//--------------------------------


randomIntegerInRange(0, 5); // 2

//--------------------------------


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

//--------------------------------



const remove = (arr, func) =>
  Array.isArray(arr)
    ? arr.filter(func).reduce((acc, val) => {
      arr.splice(arr.indexOf(val), 1);
      return acc.concat(val);
    }, [])
    : [];

//--------------------------------


remove([1, 2, 3, 4], n => n % 2 === 0); // [2, 4]

//--------------------------------


const removeAccents = str =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

//--------------------------------


removeAccents('Antoine de Saint-Exupéry'); // 'Antoine de Saint-Exupery'

//--------------------------------


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

//--------------------------------


const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

//--------------------------------


scrollToTop(); // Smooth-scrolls to the top of the page

//--------------------------------


const sdbm = str => {
  let arr = str.split('');
  return arr.reduce(
    (hashCode, currentVal) =>
      (hashCode =
        currentVal.charCodeAt(0) +
        (hashCode << 6) +
        (hashCode << 16) -
        hashCode),
    0
  );
};

//--------------------------------


sdbm('name'); // -3521204949

//--------------------------------


const selectionSort = arr => {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    const min = a
      .slice(i + 1)
      .reduce((acc, val, j) => (val < a[acc] ? j + i + 1 : acc), i);
    if (min !== i) [a[i], a[min]] = [a[min], a[i]];
  }
  return a;
};

//--------------------------------


selectionSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const serializeCookie = (name, val) =>
  `${encodeURIComponent(name)}=${encodeURIComponent(val)}`;

//--------------------------------


serializeCookie('foo', 'bar'); // 'foo=bar'

//--------------------------------


const slugify = str =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

//--------------------------------


slugify('Hello World!'); // 'hello-world'

//--------------------------------


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

//--------------------------------


const sortedIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr.findIndex(el =>
    isDescending ? val >= fn(el) : val <= fn(el)
  );
  return index === -1 ? arr.length : index;
};

//--------------------------------


sortedIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 0

//--------------------------------


const sortedLastIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr
    .reverse()
    .findIndex(el => (isDescending ? n <= el : n >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndex([10, 20, 30, 30, 40], 30); // 4

//--------------------------------


const sortedLastIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr
    .map(fn)
    .reverse()
    .findIndex(el => (isDescending ? val <= el : val >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 1

//--------------------------------


const stringPermutations = str => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str
    .split('')
    .reduce(
      (acc, letter, i) =>
        acc.concat(
          stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(
            val => letter + val
          )
        ),
      []
    );
};

//--------------------------------


stringPermutations('abc'); // ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']

//--------------------------------


const supportsTouchEvents = () =>
  window && 'ontouchstart' in window;

//--------------------------------


supportsTouchEvents(); // true

//--------------------------------


const swapCase = str =>
  [...str]
    .map(c => (c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase()))
    .join('');

//--------------------------------


swapCase('Hello world!'); // 'hELLO WORLD!'

//--------------------------------


const takeRightUntil = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightUntil([1, 2, 3, 4], n => n < 3); // [3, 4]

//--------------------------------


const takeRightWhile = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (!fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const takeUntil = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeUntil([1, 2, 3, 4], n => n >= 3); // [1, 2]

//--------------------------------


const takeWhile = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (!fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

//--------------------------------


const toISOStringWithTimezone = date => {
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? '+' : '-';
  const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    diff + pad(tzOffset / 60) +
    ':' + pad(tzOffset % 60);
};

//--------------------------------


toISOStringWithTimezone(new Date()); // '2020-10-06T20:43:33-04:00'

//--------------------------------


const toOrdinalSuffix = num => {
  const int = parseInt(num),
    digits = [int % 10, int % 100],
    ordinals = ['st', 'nd', 'rd', 'th'],
    oPattern = [1, 2, 3, 4],
    tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
  return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
    ? int + ordinals[digits[0] - 1]
    : int + ordinals[3];
};

//--------------------------------


toOrdinalSuffix('123'); // '123rd'

//--------------------------------


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


const HSBToRGB = (h, s, b) => {
  s /= 100;
  b /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [255 * f(5), 255 * f(3), 255 * f(1)];
};

//--------------------------------


HSBToRGB(18, 81, 99); // [252.45, 109.31084999999996, 47.965499999999984]

//--------------------------------


const HSLToRGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

//--------------------------------


HSLToRGB(13, 100, 11); // [56.1, 12.155, 0]

//--------------------------------


const RGBToHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};

//--------------------------------


RGBToHSL(45, 23, 11); // [21.17647, 60.71428, 10.98039]

//--------------------------------


const RGBToHex = (r, g, b) =>
  ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');

//--------------------------------


RGBToHex(255, 165, 1); // 'ffa501'

//--------------------------------


const UUIDGeneratorBrowser = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );

//--------------------------------


UUIDGeneratorBrowser(); // '7982fcfe-5721-4632-bede-6000885be57d'

//--------------------------------


const crypto = require('crypto');

const UUIDGeneratorNode = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
  );

//--------------------------------


UUIDGeneratorNode(); // '79c7c136-60ee-40a2-beb2-856f1feabefc'

//--------------------------------


const approximatelyEqual = (v1, v2, epsilon = 0.001) =>
  Math.abs(v1 - v2) < epsilon;

//--------------------------------


approximatelyEqual(Math.PI / 2.0, 1.5708); // true

//--------------------------------


const arithmeticProgression  = (n, lim) =>
  Array.from({ length: Math.ceil(lim / n) }, (_, i) => (i + 1) * n );

//--------------------------------


arithmeticProgression(5, 25); // [5, 10, 15, 20, 25]

//--------------------------------


const arrayToHTMLList = (arr, listID) => 
  document.querySelector(`#${listID}`).innerHTML += arr
    .map(item => `<li>${item}</li>`)
    .join('');

//--------------------------------


arrayToHTMLList(['item 1', 'item 2'], 'myListID');

//--------------------------------


const binomialCoefficient = (n, k) => {
  if (Number.isNaN(n) || Number.isNaN(k)) return NaN;
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  if (k === 1 || k === n - 1) return n;
  if (n - k < k) k = n - k;
  let res = n;
  for (let j = 2; j <= k; j++) res *= (n - j + 1) / j;
  return Math.round(res);
};

//--------------------------------


binomialCoefficient(8, 2); // 28

//--------------------------------


const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight ||
    document.documentElement.clientHeight);

//--------------------------------


bottomVisible(); // true

//--------------------------------


const bubbleSort = arr => {
  let swapped = false;
  const a = [...arr];
  for (let i = 1; i < a.length - 1; i++) {
    swapped = false;
    for (let j = 0; j < a.length - i; j++) {
      if (a[j + 1] < a[j]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    if (!swapped) return a;
  }
  return a;
};

//--------------------------------


bubbleSort([2, 1, 4, 3]); // [1, 2, 3, 4]

//--------------------------------


const bucketSort = (arr, size = 5) => {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const buckets = Array.from(
    { length: Math.floor((max - min) / size) + 1 },
    () => []
  );
  arr.forEach(val => {
    buckets[Math.floor((val - min) / size)].push(val);
  });
  return buckets.reduce((acc, b) => [...acc, ...b.sort((a, b) => a - b)], []);
};

//--------------------------------


bucketSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const capitalizeEveryWord = str =>
  str.replace(/\b[a-z]/g, char => char.toUpperCase());

//--------------------------------


capitalizeEveryWord('hello world!'); // 'Hello World!'

//--------------------------------


const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

//--------------------------------


chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

//--------------------------------


const chunkIntoN = (arr, n) => {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}

//--------------------------------


chunkIntoN([1, 2, 3, 4, 5, 6, 7], 4); // [[1, 2], [3, 4], [5, 6], [7]]

//--------------------------------


const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

//--------------------------------


copyToClipboard('Lorem ipsum'); // 'Lorem ipsum' copied to clipboard.

//--------------------------------


const countOccurrences = (arr, val) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

//--------------------------------


countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3

//--------------------------------


const dayOfYear = date =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

//--------------------------------


dayOfYear(new Date()); // 272

//--------------------------------


const daysAgo = n => {
  let d = new Date();
  d.setDate(d.getDate() - Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysAgo(20); // 2020-09-16 (if current date is 2020-10-06)

//--------------------------------


const daysFromNow = n => {
  let d = new Date();
  d.setDate(d.getDate() + Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysFromNow(5); // 2020-10-13 (if current date is 2020-10-08)

//--------------------------------


const deepFlatten = arr =>
  [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));

//--------------------------------


deepFlatten([1, [2], [[3], 4], 5]); // [1, 2, 3, 4, 5]

//--------------------------------


const defaults = (obj, ...defs) =>
  Object.assign({}, obj, ...defs.reverse(), obj);

//--------------------------------


defaults({ a: 1 }, { b: 2 }, { b: 6 }, { a: 3 }); // { a: 1, b: 2 }

//--------------------------------


const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? 'Mobile'
    : 'Desktop';

//--------------------------------


detectDeviceType(); // 'Mobile' or 'Desktop'

//--------------------------------


const detectLanguage = (defaultLang = 'en-US') => 
  navigator.language ||
  (Array.isArray(navigator.languages) && navigator.languages[0]) ||
  defaultLang;

//--------------------------------


detectLanguage(); // 'nl-NL'

//--------------------------------


const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};

//--------------------------------


difference([1, 2, 3, 3], [1, 2, 4]); // [3, 3]

//--------------------------------


const dropRightWhile = (arr, func) => {
  let rightIndex = arr.length;
  while (rightIndex-- && !func(arr[rightIndex]));
  return arr.slice(0, rightIndex + 1);
};

//--------------------------------


dropRightWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const dropWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
  return arr;
};

//--------------------------------


dropWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const factorial = n =>
  n < 0
    ? (() => {
        throw new TypeError('Negative numbers are not allowed!');
      })()
    : n <= 1
    ? 1
    : n * factorial(n - 1);

//--------------------------------


factorial(6); // 720

//--------------------------------


const fibonacci = n =>
  Array.from({ length: n }).reduce(
    (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
    []
  );

//--------------------------------


fibonacci(6); // [0, 1, 1, 2, 3, 5]

//--------------------------------


const filterNonUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) === arr.lastIndexOf(i));

//--------------------------------


filterNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1, 3, 5]

//--------------------------------


const filterUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) !== arr.lastIndexOf(i));

//--------------------------------


filterUnique([1, 2, 2, 3, 4, 4, 5]); // [2, 4]

//--------------------------------


const flattenObject = (obj, prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}.` : '';
    if (
      typeof obj[k] === 'object' &&
      obj[k] !== null &&
      Object.keys(obj[k]).length > 0
    )
      Object.assign(acc, flattenObject(obj[k], pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});

//--------------------------------


flattenObject({ a: { b: { c: 1 } }, d: 1 }); // { 'a.b.c': 1, d: 1 }

//--------------------------------


const forEachRight = (arr, callback) =>
  arr
    .slice()
    .reverse()
    .forEach(callback);

//--------------------------------


forEachRight([1, 2, 3, 4], val => console.log(val)); // '4', '3', '2', '1'

//--------------------------------


const forOwn = (obj, fn) =>
  Object.keys(obj).forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwn({ foo: 'bar', a: 1 }, v => console.log(v)); // 'bar', 1

//--------------------------------


const forOwnRight = (obj, fn) =>
  Object.keys(obj)
    .reverse()
    .forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwnRight({ foo: 'bar', a: 1 }, v => console.log(v)); // 1, 'bar'

//--------------------------------


const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24);

//--------------------------------


getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')); // 9

//--------------------------------


const getElementsBiggerThanViewport = () => {
  const docWidth = document.documentElement.offsetWidth;
  return [...document.querySelectorAll('*')].filter(
    el => el.offsetWidth > docWidth
  );
};

//--------------------------------


getElementsBiggerThanViewport(); // <div id="ultra-wide-item" />

//--------------------------------


const getMonthsDiffBetweenDates = (dateInitial, dateFinal) =>
  Math.max(
    (dateFinal.getFullYear() - dateInitial.getFullYear()) * 12 +
      dateFinal.getMonth() -
      dateInitial.getMonth(),
    0
  );

//--------------------------------


getMonthsDiffBetweenDates(new Date('2017-12-13'), new Date('2018-04-29')); // 4

//--------------------------------


const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});

//--------------------------------


getScrollPosition(); // {x: 0, y: 200}

//--------------------------------


const getSiblings = el =>
  [...el.parentNode.childNodes].filter(node => node !== el);

//--------------------------------


getSiblings(document.querySelector('head')); // ['body']

//--------------------------------


const getType = v =>
  (v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name);

//--------------------------------


getType(new Set([1, 2, 3])); // 'Set'

//--------------------------------


const getVerticalOffset = el => {
  let offset = el.offsetTop,
    _el = el;
  while (_el.offsetParent) {
    _el = _el.offsetParent;
    offset += _el.offsetTop;
  }
  return offset;
};

//--------------------------------


getVerticalOffset('.my-element'); // 120

//--------------------------------


const hammingDistance = (num1, num2) =>
  ((num1 ^ num2).toString(2).match(/1/g) || '').length;

//--------------------------------


hammingDistance(2, 3); // 1

//--------------------------------


const haveSameContents = (a, b) => {
  for (const v of new Set([...a, ...b]))
    if (a.filter(e => e === v).length !== b.filter(e => e === v).length)
      return false;
  return true;
};

//--------------------------------


haveSameContents([1, 2, 4], [2, 4, 1]); // true

//--------------------------------


const heapsort = arr => {
  const a = [...arr];
  let l = a.length;

  const heapify = (a, i) => {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let max = i;
    if (left < l && a[left] > a[max]) max = left;
    if (right < l && a[right] > a[max]) max = right;
    if (max !== i) {
      [a[max], a[i]] = [a[i], a[max]];
      heapify(a, max);
    }
  };

  for (let i = Math.floor(l / 2); i >= 0; i -= 1) heapify(a, i);
  for (i = a.length - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    l--;
    heapify(a, 0);
  }
  return a;
};

//--------------------------------


heapsort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const initialize2DArray = (w, h, val = null) =>
  Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));

//--------------------------------


initialize2DArray(2, 2, 0); // [[0, 0], [0, 0]]

//--------------------------------


const initializeArrayWithValues = (n, val = 0) =>
  Array.from({ length: n }).fill(val);

//--------------------------------


initializeArrayWithValues(5, 2); // [2, 2, 2, 2, 2]

//--------------------------------


const insertionSort = arr =>
  arr.reduce((acc, x) => {
    if (!acc.length) return [x];
    acc.some((y, j) => {
      if (x <= y) {
        acc.splice(j, 0, x);
        return true;
      }
      if (x > y && j === acc.length - 1) {
        acc.splice(j + 1, 0, x);
        return true;
      }
      return false;
    });
    return acc;
  }, []);

//--------------------------------


insertionSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const intersection = (a, b) => {
  const s = new Set(b);
  return [...new Set(a)].filter(x => s.has(x));
};

//--------------------------------


intersection([1, 2, 3], [4, 3, 2]); // [2, 3]

//--------------------------------


const isAnagram = (str1, str2) => {
  const normalize = str =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, '')
      .split('')
      .sort()
      .join('');
  return normalize(str1) === normalize(str2);
};

//--------------------------------


isAnagram('iceman', 'cinema'); // true

//--------------------------------


const isContainedIn = (a, b) => {
  for (const v of new Set(a)) {
    if (
      !b.some(e => e === v) ||
      a.filter(e => e === v).length > b.filter(e => e === v).length
    )
      return false;
  }
  return true;
};

//--------------------------------


isContainedIn([1, 4], [2, 4, 1]); // true

//--------------------------------


const isLocalStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.localStorage.setItem(key, null);
    window.localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isLocalStorageEnabled(); // true, if localStorage is accessible

//--------------------------------


const isPrime = num => {
  const boundary = Math.floor(Math.sqrt(num));
  for (let i = 2; i <= boundary; i++) if (num % i === 0) return false;
  return num >= 2;
};

//--------------------------------


isPrime(11); // true

//--------------------------------


const isSameDate = (dateA, dateB) =>
  dateA.toISOString() === dateB.toISOString();

//--------------------------------


isSameDate(new Date(2010, 10, 20), new Date(2010, 10, 20)); // true

//--------------------------------


const isSessionStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.sessionStorage.setItem(key, null);
    window.sessionStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isSessionStorageEnabled(); // true, if sessionStorage is accessible

//--------------------------------


const kMeans = (data, k = 1) => {
  const centroids = data.slice(0, k);
  const distances = Array.from({ length: data.length }, () =>
    Array.from({ length: k }, () => 0)
  );
  const classes = Array.from({ length: data.length }, () => -1);
  let itr = true;

  while (itr) {
    itr = false;

    for (let d in data) {
      for (let c = 0; c < k; c++) {
        distances[d][c] = Math.hypot(
          ...Object.keys(data[0]).map(key => data[d][key] - centroids[c][key])
        );
      }
      const m = distances[d].indexOf(Math.min(...distances[d]));
      if (classes[d] !== m) itr = true;
      classes[d] = m;
    }

    for (let c = 0; c < k; c++) {
      centroids[c] = Array.from({ length: data[0].length }, () => 0);
      const size = data.reduce((acc, _, d) => {
        if (classes[d] === c) {
          acc++;
          for (let i in data[0]) centroids[c][i] += data[d][i];
        }
        return acc;
      }, 0);
      for (let i in data[0]) {
        centroids[c][i] = parseFloat(Number(centroids[c][i] / size).toFixed(2));
      }
    }
  }

  return classes;
};

//--------------------------------


kMeans([[0, 0], [0, 1], [1, 3], [2, 0]], 2); // [0, 1, 1, 0]

//--------------------------------


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

//--------------------------------


const randomIntArrayInRange = (min, max, n = 1) =>
  Array.from(
    { length: n },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );

//--------------------------------


randomIntArrayInRange(12, 35, 10); // [ 34, 14, 27, 17, 30, 27, 20, 26, 21, 14 ]

//--------------------------------


const randomIntegerInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

//--------------------------------


randomIntegerInRange(0, 5); // 2

//--------------------------------


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

//--------------------------------



const remove = (arr, func) =>
  Array.isArray(arr)
    ? arr.filter(func).reduce((acc, val) => {
      arr.splice(arr.indexOf(val), 1);
      return acc.concat(val);
    }, [])
    : [];

//--------------------------------


remove([1, 2, 3, 4], n => n % 2 === 0); // [2, 4]

//--------------------------------


const removeAccents = str =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

//--------------------------------


removeAccents('Antoine de Saint-Exupéry'); // 'Antoine de Saint-Exupery'

//--------------------------------


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

//--------------------------------


const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

//--------------------------------


scrollToTop(); // Smooth-scrolls to the top of the page

//--------------------------------


const sdbm = str => {
  let arr = str.split('');
  return arr.reduce(
    (hashCode, currentVal) =>
      (hashCode =
        currentVal.charCodeAt(0) +
        (hashCode << 6) +
        (hashCode << 16) -
        hashCode),
    0
  );
};

//--------------------------------


sdbm('name'); // -3521204949

//--------------------------------


const selectionSort = arr => {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    const min = a
      .slice(i + 1)
      .reduce((acc, val, j) => (val < a[acc] ? j + i + 1 : acc), i);
    if (min !== i) [a[i], a[min]] = [a[min], a[i]];
  }
  return a;
};

//--------------------------------


selectionSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const serializeCookie = (name, val) =>
  `${encodeURIComponent(name)}=${encodeURIComponent(val)}`;

//--------------------------------


serializeCookie('foo', 'bar'); // 'foo=bar'

//--------------------------------


const slugify = str =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

//--------------------------------


slugify('Hello World!'); // 'hello-world'

//--------------------------------


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

//--------------------------------


const sortedIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr.findIndex(el =>
    isDescending ? val >= fn(el) : val <= fn(el)
  );
  return index === -1 ? arr.length : index;
};

//--------------------------------


sortedIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 0

//--------------------------------


const sortedLastIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr
    .reverse()
    .findIndex(el => (isDescending ? n <= el : n >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndex([10, 20, 30, 30, 40], 30); // 4

//--------------------------------


const sortedLastIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr
    .map(fn)
    .reverse()
    .findIndex(el => (isDescending ? val <= el : val >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 1

//--------------------------------


const stringPermutations = str => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str
    .split('')
    .reduce(
      (acc, letter, i) =>
        acc.concat(
          stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(
            val => letter + val
          )
        ),
      []
    );
};

//--------------------------------


stringPermutations('abc'); // ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']

//--------------------------------


const supportsTouchEvents = () =>
  window && 'ontouchstart' in window;

//--------------------------------


supportsTouchEvents(); // true

//--------------------------------


const swapCase = str =>
  [...str]
    .map(c => (c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase()))
    .join('');

//--------------------------------


swapCase('Hello world!'); // 'hELLO WORLD!'

//--------------------------------


const takeRightUntil = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightUntil([1, 2, 3, 4], n => n < 3); // [3, 4]

//--------------------------------


const takeRightWhile = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (!fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const takeUntil = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeUntil([1, 2, 3, 4], n => n >= 3); // [1, 2]

//--------------------------------


const takeWhile = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (!fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

//--------------------------------


const toISOStringWithTimezone = date => {
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? '+' : '-';
  const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    diff + pad(tzOffset / 60) +
    ':' + pad(tzOffset % 60);
};

//--------------------------------


toISOStringWithTimezone(new Date()); // '2020-10-06T20:43:33-04:00'

//--------------------------------


const toOrdinalSuffix = num => {
  const int = parseInt(num),
    digits = [int % 10, int % 100],
    ordinals = ['st', 'nd', 'rd', 'th'],
    oPattern = [1, 2, 3, 4],
    tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
  return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
    ? int + ordinals[digits[0] - 1]
    : int + ordinals[3];
};

//--------------------------------


toOrdinalSuffix('123'); // '123rd'

//--------------------------------


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


const CSVToArray = (data, delimiter = ',', omitFirstRow = false) =>
  data
    .slice(omitFirstRow ? data.indexOf('\n') + 1 : 0)
    .split('\n')
    .map(v => v.split(delimiter));

//--------------------------------


CSVToArray('a,b\nc,d'); // [['a', 'b'], ['c', 'd']];
CSVToArray('a;b\nc;d', ';'); // [['a', 'b'], ['c', 'd']];
CSVToArray('col1,col2\na,b\nc,d', ',', true); // [['a', 'b'], ['c', 'd']];

//--------------------------------


const CSVToJSON = (data, delimiter = ',') => {
  const titles = data.slice(0, data.indexOf('\n')).split(delimiter);
  return data
    .slice(data.indexOf('\n') + 1)
    .split('\n')
    .map(v => {
      const values = v.split(delimiter);
      return titles.reduce(
        (obj, title, index) => ((obj[title] = values[index]), obj),
        {}
      );
    });
};

//--------------------------------


CSVToJSON('col1,col2\na,b\nc,d');
// [{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}];
CSVToJSON('col1;col2\na;b\nc;d', ';');
// [{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}];

//--------------------------------


const HSBToRGB = (h, s, b) => {
  s /= 100;
  b /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [255 * f(5), 255 * f(3), 255 * f(1)];
};

//--------------------------------


HSBToRGB(18, 81, 99); // [252.45, 109.31084999999996, 47.965499999999984]

//--------------------------------


const HSLToRGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

//--------------------------------


HSLToRGB(13, 100, 11); // [56.1, 12.155, 0]

//--------------------------------


const fs = require('fs');

const JSONToFile = (obj, filename) =>
  fs.writeFileSync(`${filename}.json`, JSON.stringify(obj, null, 2));

//--------------------------------


JSONToFile({ test: 'is passed' }, 'testJsonFile');
// writes the object to 'testJsonFile.json'

//--------------------------------


const JSONtoCSV = (arr, columns, delimiter = ',') =>
  [
    columns.join(delimiter),
    ...arr.map(obj =>
      columns.reduce(
        (acc, key) =>
          `${acc}${!acc.length ? '' : delimiter}"${!obj[key] ? '' : obj[key]}"`,
        ''
      )
    ),
  ].join('\n');

//--------------------------------


JSONtoCSV(
  [{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }],
  ['a', 'b']
); // 'a,b\n"1","2"\n"3","4"\n"6",""\n"","7"'
JSONtoCSV(
  [{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }],
  ['a', 'b'],
  ';'
); // 'a;b\n"1";"2"\n"3";"4"\n"6";""\n"";"7"'

//--------------------------------


const RGBToHSB = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const v = Math.max(r, g, b),
    n = v - Math.min(r, g, b);
  const h =
    n && v === r ? (g - b) / n : v === g ? 2 + (b - r) / n : 4 + (r - g) / n;
  return [60 * (h < 0 ? h + 6 : h), v && (n / v) * 100, v * 100];
};

//--------------------------------


RGBToHSB(252, 111, 48);
// [18.529411764705856, 80.95238095238095, 98.82352941176471]

//--------------------------------


const RGBToHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};

//--------------------------------


RGBToHSL(45, 23, 11); // [21.17647, 60.71428, 10.98039]

//--------------------------------


const RGBToHex = (r, g, b) =>
  ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');

//--------------------------------


RGBToHex(255, 165, 1); // 'ffa501'

//--------------------------------


const URLJoin = (...args) =>
  args
    .join('/')
    .replace(/[\/]+/g, '/')
    .replace(/^(.+):\//, '$1://')
    .replace(/^file:/, 'file:/')
    .replace(/\/(\?|&|#[^!])/g, '$1')
    .replace(/\?/g, '&')
    .replace('&', '?');

//--------------------------------


URLJoin('http://www.google.com', 'a', '/b/cd', '?foo=123', '?bar=foo');
// 'http://www.google.com/a/b/cd?foo=123&bar=foo'

//--------------------------------


const UUIDGeneratorBrowser = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );

//--------------------------------


UUIDGeneratorBrowser(); // '7982fcfe-5721-4632-bede-6000885be57d'

//--------------------------------


const crypto = require('crypto');

const UUIDGeneratorNode = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
  );

//--------------------------------


UUIDGeneratorNode(); // '79c7c136-60ee-40a2-beb2-856f1feabefc'

//--------------------------------


const accumulate = (...nums) =>
  nums.reduce((acc, n) => [...acc, n + +acc.slice(-1)], []);

//--------------------------------


accumulate(1, 2, 3, 4); // [1, 3, 6, 10]
accumulate(...[1, 2, 3, 4]); // [1, 3, 6, 10]

//--------------------------------


const addClass = (el, className) => el.classList.add(className);

//--------------------------------


addClass(document.querySelector('p'), 'special');
// The paragraph will now have the 'special' class

//--------------------------------


const addDaysToDate = (date, n) => {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
};

//--------------------------------


addDaysToDate('2020-10-15', 10); // '2020-10-25'
addDaysToDate('2020-10-15', -10); // '2020-10-05'

//--------------------------------


const addMinutesToDate = (date, n) => {
  const d = new Date(date);
  d.setTime(d.getTime() + n * 60000);
  return d.toISOString().split('.')[0].replace('T',' ');
};

//--------------------------------


addMinutesToDate('2020-10-19 12:00:00', 10); // '2020-10-19 12:10:00'
addMinutesToDate('2020-10-19', -10); // '2020-10-18 23:50:00'

//--------------------------------


const addMultipleListeners = (el, types, listener, options, useCapture) => {
  types.forEach(type =>
    el.addEventListener(type, listener, options, useCapture)
  );
};

//--------------------------------


addMultipleListeners(
  document.querySelector('.my-element'),
  ['click', 'mousedown'],
  () => { console.log('hello!') }
);

//--------------------------------


const addStyles = (el, styles) => Object.assign(el.style, styles);

//--------------------------------


addStyles(document.getElementById('my-element'), {
  background: 'red',
  color: '#ffff00',
  fontSize: '3rem'
});

//--------------------------------


const addWeekDays = (startDate, count) =>
  Array.from({ length: count }).reduce(date => {
    date = new Date(date.setDate(date.getDate() + 1));
    if (date.getDay() % 6 === 0)
      date = new Date(date.setDate(date.getDate() + (date.getDay() / 6 + 1)));
    return date;
  }, startDate);

//--------------------------------


addWeekDays(new Date('Oct 09, 2020'), 5); // 'Oct 16, 2020'
addWeekDays(new Date('Oct 12, 2020'), 5); // 'Oct 19, 2020'

//--------------------------------


const all = (arr, fn = Boolean) => arr.every(fn);

//--------------------------------


all([4, 2, 3], x => x > 1); // true
all([1, 2, 3]); // true

//--------------------------------


const allEqual = arr => arr.every(val => val === arr[0]);

//--------------------------------


allEqual([1, 2, 3, 4, 5, 6]); // false
allEqual([1, 1, 1, 1]); // true

//--------------------------------


const allEqualBy = (arr, fn) => {
  const eql = fn(arr[0]);
  return arr.every(val => fn(val) === eql);
};

//--------------------------------


allEqualBy([1.1, 1.2, 1.3], Math.round); // true
allEqualBy([1.1, 1.3, 1.6], Math.round); // false

//--------------------------------


const allUnique = arr => arr.length === new Set(arr).size;

//--------------------------------


allUnique([1, 2, 3, 4]); // true
allUnique([1, 1, 2, 3]); // false

//--------------------------------


const allUniqueBy = (arr, fn) => arr.length === new Set(arr.map(fn)).size;

//--------------------------------


allUniqueBy([1.2, 2.4, 2.9], Math.round); // true
allUniqueBy([1.2, 2.3, 2.4], Math.round); // false

//--------------------------------


const and = (a, b) => a && b;

//--------------------------------


and(true, true); // true
and(true, false); // false
and(false, false); // false

//--------------------------------


const any = (arr, fn = Boolean) => arr.some(fn);

//--------------------------------


any([0, 1, 2, 0], x => x >= 2); // true
any([0, 0, 1, 0]); // true

//--------------------------------


const aperture = (n, arr) =>
  n > arr.length
    ? []
    : arr.slice(n - 1).map((v, i) => arr.slice(i, i + n));

//--------------------------------


aperture(2, [1, 2, 3, 4]); // [[1, 2], [2, 3], [3, 4]]
aperture(3, [1, 2, 3, 4]); // [[1, 2, 3], [2, 3, 4]]
aperture(5, [1, 2, 3, 4]); // []

//--------------------------------


const approximatelyEqual = (v1, v2, epsilon = 0.001) =>
  Math.abs(v1 - v2) < epsilon;

//--------------------------------


approximatelyEqual(Math.PI / 2.0, 1.5708); // true

//--------------------------------


const arithmeticProgression  = (n, lim) =>
  Array.from({ length: Math.ceil(lim / n) }, (_, i) => (i + 1) * n );

//--------------------------------


arithmeticProgression(5, 25); // [5, 10, 15, 20, 25]

//--------------------------------


const arrayToCSV = (arr, delimiter = ',') =>
  arr
    .map(v =>
      v.map(x => (isNaN(x) ? `"${x.replace(/"/g, '""')}"` : x)).join(delimiter)
    )
    .join('\n');

//--------------------------------


arrayToCSV([['a', 'b'], ['c', 'd']]); // '"a","b"\n"c","d"'
arrayToCSV([['a', 'b'], ['c', 'd']], ';'); // '"a";"b"\n"c";"d"'
arrayToCSV([['a', '"b" great'], ['c', 3.1415]]);
// '"a","""b"" great"\n"c",3.1415'

//--------------------------------


const arrayToHTMLList = (arr, listID) => 
  document.querySelector(`#${listID}`).innerHTML += arr
    .map(item => `<li>${item}</li>`)
    .join('');

//--------------------------------


arrayToHTMLList(['item 1', 'item 2'], 'myListID');

//--------------------------------


const ary = (fn, n) => (...args) => fn(...args.slice(0, n));

//--------------------------------


const firstTwoMax = ary(Math.max, 2);
[[2, 6, 'a'], [6, 4, 8], [10]].map(x => firstTwoMax(...x)); // [6, 6, 10]

//--------------------------------


const atob = str => Buffer.from(str, 'base64').toString('binary');

//--------------------------------


atob('Zm9vYmFy'); // 'foobar'

//--------------------------------


const attempt = (fn, ...args) => {
  try {
    return fn(...args);
  } catch (e) {
    return e instanceof Error ? e : new Error(e);
  }
};

//--------------------------------


var elements = attempt(function(selector) {
  return document.querySelectorAll(selector);
}, '>_>');
if (elements instanceof Error) elements = []; // elements = []

//--------------------------------


const average = (...nums) =>
  nums.reduce((acc, val) => acc + val, 0) / nums.length;

//--------------------------------


average(...[1, 2, 3]); // 2
average(1, 2, 3); // 2

//--------------------------------


const averageBy = (arr, fn) =>
  arr
    .map(typeof fn === 'function' ? fn : val => val[fn])
    .reduce((acc, val) => acc + val, 0) / arr.length;

//--------------------------------


averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n); // 5
averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n'); // 5

//--------------------------------


const bifurcate = (arr, filter) =>
  arr.reduce((acc, val, i) => (acc[filter[i] ? 0 : 1].push(val), acc), [
    [],
    [],
  ]);

//--------------------------------


bifurcate(['beep', 'boop', 'foo', 'bar'], [true, true, false, true]);
// [ ['beep', 'boop', 'bar'], ['foo'] ]

//--------------------------------


const bifurcateBy = (arr, fn) =>
  arr.reduce((acc, val, i) => (acc[fn(val, i) ? 0 : 1].push(val), acc), [
    [],
    [],
  ]);

//--------------------------------


bifurcateBy(['beep', 'boop', 'foo', 'bar'], x => x[0] === 'b');
// [ ['beep', 'boop', 'bar'], ['foo'] ]

//--------------------------------


const binary = fn => (a, b) => fn(a, b);

//--------------------------------


['2', '1', '0'].map(binary(Math.max)); // [2, 1, 2]

//--------------------------------


const binarySearch = (arr, item) => {
  let l = 0,
    r = arr.length - 1;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    const guess = arr[mid];
    if (guess === item) return mid;
    if (guess > item) r = mid - 1;
    else l = mid + 1;
  }
  return -1;
};

//--------------------------------


binarySearch([1, 2, 3, 4, 5], 1); // 0
binarySearch([1, 2, 3, 4, 5], 5); // 4
binarySearch([1, 2, 3, 4, 5], 6); // -1

//--------------------------------


const bind = (fn, context, ...boundArgs) => (...args) =>
  fn.apply(context, [...boundArgs, ...args]);

//--------------------------------


function greet(greeting, punctuation) {
  return greeting + ' ' + this.user + punctuation;
}
const freddy = { user: 'fred' };
const freddyBound = bind(greet, freddy);
console.log(freddyBound('hi', '!')); // 'hi fred!'

//--------------------------------


const bindAll = (obj, ...fns) =>
  fns.forEach(
    fn => (
      (f = obj[fn]),
      (obj[fn] = function() {
        return f.apply(obj);
      })
    )
  );

//--------------------------------


var view = {
  label: 'docs',
  click: function() {
    console.log('clicked ' + this.label);
  }
};
bindAll(view, 'click');
document.body.addEventListener('click', view.click);
// Log 'clicked docs' when clicked.

//--------------------------------


const bindKey = (context, fn, ...boundArgs) => (...args) =>
  context[fn].apply(context, [...boundArgs, ...args]);

//--------------------------------


const freddy = {
  user: 'fred',
  greet: function(greeting, punctuation) {
    return greeting + ' ' + this.user + punctuation;
  }
};
const freddyBound = bindKey(freddy, 'greet');
console.log(freddyBound('hi', '!')); // 'hi fred!'

//--------------------------------


const binomialCoefficient = (n, k) => {
  if (Number.isNaN(n) || Number.isNaN(k)) return NaN;
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  if (k === 1 || k === n - 1) return n;
  if (n - k < k) k = n - k;
  let res = n;
  for (let j = 2; j <= k; j++) res *= (n - j + 1) / j;
  return Math.round(res);
};

//--------------------------------


binomialCoefficient(8, 2); // 28

//--------------------------------


const both = (f, g) => (...args) => f(...args) && g(...args);

//--------------------------------


const isEven = num => num % 2 === 0;
const isPositive = num => num > 0;
const isPositiveEven = both(isEven, isPositive);
isPositiveEven(4); // true
isPositiveEven(-2); // false

//--------------------------------


const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight ||
    document.documentElement.clientHeight);

//--------------------------------


bottomVisible(); // true

//--------------------------------


const btoa = str => Buffer.from(str, 'binary').toString('base64');

//--------------------------------


btoa('foobar'); // 'Zm9vYmFy'

//--------------------------------


const bubbleSort = arr => {
  let swapped = false;
  const a = [...arr];
  for (let i = 1; i < a.length - 1; i++) {
    swapped = false;
    for (let j = 0; j < a.length - i; j++) {
      if (a[j + 1] < a[j]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    if (!swapped) return a;
  }
  return a;
};

//--------------------------------


bubbleSort([2, 1, 4, 3]); // [1, 2, 3, 4]

//--------------------------------


const bucketSort = (arr, size = 5) => {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const buckets = Array.from(
    { length: Math.floor((max - min) / size) + 1 },
    () => []
  );
  arr.forEach(val => {
    buckets[Math.floor((val - min) / size)].push(val);
  });
  return buckets.reduce((acc, b) => [...acc, ...b.sort((a, b) => a - b)], []);
};

//--------------------------------


bucketSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const byteSize = str => new Blob([str]).size;

//--------------------------------


byteSize('😀'); // 4
byteSize('Hello World'); // 11

//--------------------------------


const caesarCipher = (str, shift, decrypt = false) => {
  const s = decrypt ? (26 - shift) % 26 : shift;
  const n = s > 0 ? s : 26 + (s % 26);
  return [...str]
    .map((l, i) => {
      const c = str.charCodeAt(i);
      if (c >= 65 && c <= 90)
        return String.fromCharCode(((c - 65 + n) % 26) + 65);
      if (c >= 97 && c <= 122)
        return String.fromCharCode(((c - 97 + n) % 26) + 97);
      return l;
    })
    .join('');
};

//--------------------------------


caesarCipher('Hello World!', -3); // 'Ebiil Tloia!'
caesarCipher('Ebiil Tloia!', 23, true); // 'Hello World!'

//--------------------------------


const call = (key, ...args) => context => context[key](...args);

//--------------------------------


Promise.resolve([1, 2, 3])
  .then(call('map', x => 2 * x))
  .then(console.log); // [ 2, 4, 6 ]
const map = call.bind(null, 'map');
Promise.resolve([1, 2, 3])
  .then(map(x => 2 * x))
  .then(console.log); // [ 2, 4, 6 ]

//--------------------------------


const capitalize = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() +
  (lowerRest ? rest.join('').toLowerCase() : rest.join(''));

//--------------------------------


capitalize('fooBar'); // 'FooBar'
capitalize('fooBar', true); // 'Foobar'

//--------------------------------


const capitalizeEveryWord = str =>
  str.replace(/\b[a-z]/g, char => char.toUpperCase());

//--------------------------------


capitalizeEveryWord('hello world!'); // 'Hello World!'

//--------------------------------


const cartesianProduct = (a, b) =>
  a.reduce((p, x) => [...p, ...b.map(y => [x, y])], []);

//--------------------------------


cartesianProduct(['x', 'y'], [1, 2]);
// [['x', 1], ['x', 2], ['y', 1], ['y', 2]]

//--------------------------------


const castArray = val => (Array.isArray(val) ? val : [val]);

//--------------------------------


castArray('foo'); // ['foo']
castArray([1]); // [1]

//--------------------------------


const celsiusToFahrenheit = degrees => 1.8 * degrees + 32;

//--------------------------------


celsiusToFahrenheit(33); // 91.4

//--------------------------------


const chainAsync = fns => {
  let curr = 0;
  const last = fns[fns.length - 1];
  const next = () => {
    const fn = fns[curr++];
    fn === last ? fn() : fn(next);
  };
  next();
};

//--------------------------------


chainAsync([
  next => {
    console.log('0 seconds');
    setTimeout(next, 1000);
  },
  next => {
    console.log('1 second');
    setTimeout(next, 1000);
  },
  () => {
    console.log('2 second');
  }
]);

//--------------------------------


const changeLightness = (delta, hslStr) => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);

  const newLightness = Math.max(
    0,
    Math.min(100, lightness + parseFloat(delta))
  );

  return `hsl(${hue}, ${saturation}%, ${newLightness}%)`;
};

//--------------------------------


changeLightness(10, 'hsl(330, 50%, 50%)'); // 'hsl(330, 50%, 60%)'
changeLightness(-10, 'hsl(330, 50%, 50%)'); // 'hsl(330, 50%, 40%)'

//--------------------------------


const checkProp = (predicate, prop) => obj => !!predicate(obj[prop]);

//--------------------------------


const lengthIs4 = checkProp(l => l === 4, 'length');
lengthIs4([]); // false
lengthIs4([1, 2, 3, 4]); // true
lengthIs4(new Set([1, 2, 3, 4])); // false (Set uses Size, not length)

const session = { user: {} };
const validUserSession = checkProp(u => u.active && !u.disabled, 'user');

validUserSession(session); // false

session.user.active = true;
validUserSession(session); // true

const noLength = checkProp(l => l === undefined, 'length');
noLength([]); // false
noLength({}); // true
noLength(new Set()); // true

//--------------------------------


const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

//--------------------------------


chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

//--------------------------------


const chunkIntoN = (arr, n) => {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}

//--------------------------------


chunkIntoN([1, 2, 3, 4, 5, 6, 7], 4); // [[1, 2], [3, 4], [5, 6], [7]]

//--------------------------------


const clampNumber = (num, a, b) =>
  Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));

//--------------------------------


clampNumber(2, 3, 5); // 3
clampNumber(1, -1, -5); // -1

//--------------------------------


const cloneRegExp = regExp => new RegExp(regExp.source, regExp.flags);

//--------------------------------


const regExp = /lorem ipsum/gi;
const regExp2 = cloneRegExp(regExp); // regExp !== regExp2

//--------------------------------


const coalesce = (...args) => args.find(v => ![undefined, null].includes(v));

//--------------------------------


coalesce(null, undefined, '', NaN, 'Waldo'); // ''

//--------------------------------


const coalesceFactory = valid => (...args) => args.find(valid);

//--------------------------------


const customCoalesce = coalesceFactory(
  v => ![null, undefined, '', NaN].includes(v)
);
customCoalesce(undefined, null, NaN, '', 'Waldo'); // 'Waldo'

//--------------------------------


const collectInto = fn => (...args) => fn(args);

//--------------------------------


const Pall = collectInto(Promise.all.bind(Promise));
let p1 = Promise.resolve(1);
let p2 = Promise.resolve(2);
let p3 = new Promise(resolve => setTimeout(resolve, 2000, 3));
Pall(p1, p2, p3).then(console.log); // [1, 2, 3] (after about 2 seconds)

//--------------------------------


const colorize = (...args) => ({
  black: `\x1b[30m${args.join(' ')}`,
  red: `\x1b[31m${args.join(' ')}`,
  green: `\x1b[32m${args.join(' ')}`,
  yellow: `\x1b[33m${args.join(' ')}`,
  blue: `\x1b[34m${args.join(' ')}`,
  magenta: `\x1b[35m${args.join(' ')}`,
  cyan: `\x1b[36m${args.join(' ')}`,
  white: `\x1b[37m${args.join(' ')}`,
  bgBlack: `\x1b[40m${args.join(' ')}\x1b[0m`,
  bgRed: `\x1b[41m${args.join(' ')}\x1b[0m`,
  bgGreen: `\x1b[42m${args.join(' ')}\x1b[0m`,
  bgYellow: `\x1b[43m${args.join(' ')}\x1b[0m`,
  bgBlue: `\x1b[44m${args.join(' ')}\x1b[0m`,
  bgMagenta: `\x1b[45m${args.join(' ')}\x1b[0m`,
  bgCyan: `\x1b[46m${args.join(' ')}\x1b[0m`,
  bgWhite: `\x1b[47m${args.join(' ')}\x1b[0m`
});

//--------------------------------


console.log(colorize('foo').red); // 'foo' (red letters)
console.log(colorize('foo', 'bar').bgBlue); // 'foo bar' (blue background)
console.log(colorize(colorize('foo').yellow, colorize('foo').green).bgWhite);
// 'foo bar' (first word in yellow letters, second word in green letters, white background for both)

//--------------------------------


const combine = (a, b, prop) =>
  Object.values(
    [...a, ...b].reduce((acc, v) => {
      if (v[prop])
        acc[v[prop]] = acc[v[prop]]
          ? { ...acc[v[prop]], ...v }
          : { ...v };
      return acc;
    }, {})
  );

//--------------------------------


const x = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Maria' }
];
const y = [
  { id: 1, age: 28 },
  { id: 3, age: 26 },
  { age: 3}
];
combine(x, y, 'id');
// [
//  { id: 1, name: 'John', age: 28 },
//  { id: 2, name: 'Maria' },
//  { id: 3, age: 26 }
// ]

//--------------------------------


const compact = arr => arr.filter(Boolean);

//--------------------------------


compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34]); 
// [ 1, 2, 3, 'a', 's', 34 ]

//--------------------------------


const compactObject = val => {
  const data = Array.isArray(val) ? val.filter(Boolean) : val;
  return Object.keys(data).reduce(
    (acc, key) => {
      const value = data[key];
      if (Boolean(value))
        acc[key] = typeof value === 'object' ? compactObject(value) : value;
      return acc;
    },
    Array.isArray(val) ? [] : {}
  );
};

//--------------------------------


const obj = {
  a: null,
  b: false,
  c: true,
  d: 0,
  e: 1,
  f: '',
  g: 'a',
  h: [null, false, '', true, 1, 'a'],
  i: { j: 0, k: false, l: 'a' }
};
compactObject(obj);
// { c: true, e: 1, g: 'a', h: [ true, 1, 'a' ], i: { l: 'a' } }

//--------------------------------


const compactWhitespace = str => str.replace(/\s{2,}/g, ' ');

//--------------------------------


compactWhitespace('Lorem    Ipsum'); // 'Lorem Ipsum'
compactWhitespace('Lorem \n Ipsum'); // 'Lorem Ipsum'

//--------------------------------


const complement = fn => (...args) => !fn(...args);

//--------------------------------


const isEven = num => num % 2 === 0;
const isOdd = complement(isEven);
isOdd(2); // false
isOdd(3); // true

//--------------------------------


const compose = (...fns) =>
  fns.reduce((f, g) => (...args) => f(g(...args)));

//--------------------------------


const add5 = x => x + 5;
const multiply = (x, y) => x * y;
const multiplyAndAdd5 = compose(
  add5,
  multiply
);
multiplyAndAdd5(5, 2); // 15

//--------------------------------


const composeRight = (...fns) =>
  fns.reduce((f, g) => (...args) => g(f(...args)));

//--------------------------------


const add = (x, y) => x + y;
const square = x => x * x;
const addAndSquare = composeRight(add, square);
addAndSquare(1, 2); // 9

//--------------------------------


const containsWhitespace = str => /\s/.test(str);

//--------------------------------


containsWhitespace('lorem'); // false
containsWhitespace('lorem ipsum'); // true

//--------------------------------


const converge = (converger, fns) => (...args) =>
  converger(...fns.map(fn => fn.apply(null, args)));

//--------------------------------


const average = converge((a, b) => a / b, [
  arr => arr.reduce((a, v) => a + v, 0),
  arr => arr.length
]);
average([1, 2, 3, 4, 5, 6, 7]); // 4

//--------------------------------


const copySign = (x, y) => Math.sign(x) === Math.sign(y) ? x : -x;

//--------------------------------


copySign(2, 3); // 2
copySign(2, -3); // -2
copySign(-2, 3); // 2
copySign(-2, -3); // -2

//--------------------------------


const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

//--------------------------------


copyToClipboard('Lorem ipsum'); // 'Lorem ipsum' copied to clipboard.

//--------------------------------


const countBy = (arr, fn) =>
  arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});

//--------------------------------


countBy([6.1, 4.2, 6.3], Math.floor); // {4: 1, 6: 2}
countBy(['one', 'two', 'three'], 'length'); // {3: 2, 5: 1}
countBy([{ count: 5 }, { count: 10 }, { count: 5 }], x => x.count)
// {5: 2, 10: 1}

//--------------------------------


const countOccurrences = (arr, val) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

//--------------------------------


countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3

//--------------------------------


const countSubstrings = (str, searchValue) => {
  let count = 0,
    i = 0;
  while (true) {
    const r = str.indexOf(searchValue, i);
    if (r !== -1) [count, i] = [count + 1, r + 1];
    else return count;
  }
};

//--------------------------------


countSubstrings('tiktok tok tok tik tok tik', 'tik'); // 3
countSubstrings('tutut tut tut', 'tut'); // 4

//--------------------------------


const countWeekDaysBetween = (startDate, endDate) =>
  Array
    .from({ length: (endDate - startDate) / (1000 * 3600 * 24) })
    .reduce(count => {
      if (startDate.getDay() % 6 !== 0) count++;
      startDate = new Date(startDate.setDate(startDate.getDate() + 1));
      return count;
    }, 0);

//--------------------------------


countWeekDaysBetween(new Date('Oct 05, 2020'), new Date('Oct 06, 2020')); // 1
countWeekDaysBetween(new Date('Oct 05, 2020'), new Date('Oct 14, 2020')); // 7

//--------------------------------


const counter = (selector, start, end, step = 1, duration = 2000) => {
  let current = start,
    _step = (end - start) * step < 0 ? -step : step,
    timer = setInterval(() => {
      current += _step;
      document.querySelector(selector).innerHTML = current;
      if (current >= end) document.querySelector(selector).innerHTML = end;
      if (current >= end) clearInterval(timer);
    }, Math.abs(Math.floor(duration / (end - start))));
  return timer;
};

//--------------------------------


counter('#my-id', 1, 1000, 5, 2000);
// Creates a 2-second timer for the element with id="my-id"

//--------------------------------


const fs = require('fs');

const createDirIfNotExists = dir => (!fs.existsSync(dir) ? fs.mkdirSync(dir) : undefined);

//--------------------------------


createDirIfNotExists('test');
// creates the directory 'test', if it doesn't exist

//--------------------------------


const createElement = str => {
  const el = document.createElement('div');
  el.innerHTML = str;
  return el.firstElementChild;
};

//--------------------------------


const el = createElement(
  `<div class="container">
    <p>Hello!</p>
  </div>`
);
console.log(el.className); // 'container'

//--------------------------------


const createEventHub = () => ({
  hub: Object.create(null),
  emit(event, data) {
    (this.hub[event] || []).forEach(handler => handler(data));
  },
  on(event, handler) {
    if (!this.hub[event]) this.hub[event] = [];
    this.hub[event].push(handler);
  },
  off(event, handler) {
    const i = (this.hub[event] || []).findIndex(h => h === handler);
    if (i > -1) this.hub[event].splice(i, 1);
    if (this.hub[event].length === 0) delete this.hub[event];
  }
});

//--------------------------------


const handler = data => console.log(data);
const hub = createEventHub();
let increment = 0;

// Subscribe: listen for different types of events
hub.on('message', handler);
hub.on('message', () => console.log('Message event fired'));
hub.on('increment', () => increment++);

// Publish: emit events to invoke all handlers subscribed to them, passing the data to them as an argument
hub.emit('message', 'hello world'); // logs 'hello world' and 'Message event fired'
hub.emit('message', { hello: 'world' }); // logs the object and 'Message event fired'
hub.emit('increment'); // `increment` variable is now 1

// Unsubscribe: stop a specific handler from listening to the 'message' event
hub.off('message', handler);

//--------------------------------


const currentURL = () => window.location.href;

//--------------------------------


currentURL(); // 'https://www.google.com/'

//--------------------------------


const curry = (fn, arity = fn.length, ...args) =>
  arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args);

//--------------------------------


curry(Math.pow)(2)(10); // 1024
curry(Math.min, 3)(10)(50)(2); // 2

//--------------------------------


const cycleGenerator = function* (arr) {
  let i = 0;
  while (true) {
    yield arr[i % arr.length];
    i++;
  }
};

//--------------------------------


const binaryCycle = cycleGenerator([0, 1]);
binaryCycle.next(); // { value: 0, done: false }
binaryCycle.next(); // { value: 1, done: false }
binaryCycle.next(); // { value: 0, done: false }
binaryCycle.next(); // { value: 1, done: false }

//--------------------------------


const dayName = (date, locale) =>
  date.toLocaleDateString(locale, { weekday: 'long' });

//--------------------------------


dayName(new Date()); // 'Saturday'
dayName(new Date('09/23/2020'), 'de-DE'); // 'Samstag'

//--------------------------------


const dayOfYear = date =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

//--------------------------------


dayOfYear(new Date()); // 272

//--------------------------------


const daysAgo = n => {
  let d = new Date();
  d.setDate(d.getDate() - Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysAgo(20); // 2020-09-16 (if current date is 2020-10-06)

//--------------------------------


const daysFromNow = n => {
  let d = new Date();
  d.setDate(d.getDate() + Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysFromNow(5); // 2020-10-13 (if current date is 2020-10-08)

//--------------------------------


const debounce = (fn, ms = 0) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

//--------------------------------


window.addEventListener(
  'resize',
  debounce(() => {
    console.log(window.innerWidth);
    console.log(window.innerHeight);
  }, 250)
); // Will log the window dimensions at most every 250ms

//--------------------------------


const debouncePromise = (fn, ms = 0) => {
  let timeoutId;
  const pending = [];
  return (...args) =>
    new Promise((res, rej) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const currentPending = [...pending];
        pending.length = 0;
        Promise.resolve(fn.apply(this, args)).then(
          data => {
            currentPending.forEach(({ resolve }) => resolve(data));
          },
          error => {
            currentPending.forEach(({ reject }) => reject(error));
          }
        );
      }, ms);
      pending.push({ resolve: res, reject: rej });
    });
};

//--------------------------------


const fn = arg => new Promise(resolve => {
  setTimeout(resolve, 1000, ['resolved', arg]);
});
const debounced = debouncePromise(fn, 200);
debounced('foo').then(console.log);
debounced('bar').then(console.log);
// Will log ['resolved', 'bar'] both times

//--------------------------------


const decapitalize = ([first, ...rest], upperRest = false) =>
  first.toLowerCase() +
  (upperRest ? rest.join('').toUpperCase() : rest.join(''));

//--------------------------------


decapitalize('FooBar'); // 'fooBar'
decapitalize('FooBar', true); // 'fOOBAR'

//--------------------------------


const deepClone = obj => {
  if (obj === null) return null;
  let clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    key =>
      (clone[key] =
        typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  );
  if (Array.isArray(obj)) {
    clone.length = obj.length;
    return Array.from(clone);
  }
  return clone;
};

//--------------------------------


const a = { foo: 'bar', obj: { a: 1, b: 2 } };
const b = deepClone(a); // a !== b, a.obj !== b.obj

//--------------------------------


const deepFlatten = arr =>
  [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));

//--------------------------------


deepFlatten([1, [2], [[3], 4], 5]); // [1, 2, 3, 4, 5]

//--------------------------------


const deepFreeze = obj => {
  Object.keys(obj).forEach(prop => {
    if (typeof obj[prop] === 'object') deepFreeze(obj[prop]);
  });
  return Object.freeze(obj);
};

//--------------------------------


'use strict';

const val = deepFreeze([1, [2, 3]]);

val[0] = 3; // not allowed
val[1][0] = 4; // not allowed as well

//--------------------------------


const deepGet = (obj, keys) =>
  keys.reduce(
    (xs, x) => (xs && xs[x] !== null && xs[x] !== undefined ? xs[x] : null),
    obj
  );

//--------------------------------


let index = 2;
const data = {
  foo: {
    foz: [1, 2, 3],
    bar: {
      baz: ['a', 'b', 'c']
    }
  }
};
deepGet(data, ['foo', 'foz', index]); // get 3
deepGet(data, ['foo', 'bar', 'baz', 8, 'foz']); // null

//--------------------------------


const deepMapKeys = (obj, fn) =>
  Array.isArray(obj)
    ? obj.map(val => deepMapKeys(val, fn))
    : typeof obj === 'object'
    ? Object.keys(obj).reduce((acc, current) => {
        const key = fn(current);
        const val = obj[current];
        acc[key] =
          val !== null && typeof val === 'object' ? deepMapKeys(val, fn) : val;
        return acc;
      }, {})
    : obj;

//--------------------------------


const obj = {
  foo: '1',
  nested: {
    child: {
      withArray: [
        {
          grandChild: ['hello']
        }
      ]
    }
  }
};
const upperKeysObj = deepMapKeys(obj, key => key.toUpperCase());
/*
{
  "FOO":"1",
  "NESTED":{
    "CHILD":{
      "WITHARRAY":[
        {
          "GRANDCHILD":[ 'hello' ]
        }
      ]
    }
  }
}
*/

//--------------------------------


const defaults = (obj, ...defs) =>
  Object.assign({}, obj, ...defs.reverse(), obj);

//--------------------------------


defaults({ a: 1 }, { b: 2 }, { b: 6 }, { a: 3 }); // { a: 1, b: 2 }

//--------------------------------


const defer = (fn, ...args) => setTimeout(fn, 1, ...args);

//--------------------------------


// Example A:
defer(console.log, 'a'), console.log('b'); // logs 'b' then 'a'

// Example B:
document.querySelector('#someElement').innerHTML = 'Hello';
longRunningFunction();
// Browser will not update the HTML until this has finished
defer(longRunningFunction);
// Browser will update the HTML then run the function

//--------------------------------


const degreesToRads = deg => (deg * Math.PI) / 180.0;

//--------------------------------


degreesToRads(90.0); // ~1.5708

//--------------------------------


const delay = (fn, ms, ...args) => setTimeout(fn, ms, ...args);

//--------------------------------


delay(
  function(text) {
    console.log(text);
  },
  1000,
  'later'
); // Logs 'later' after one second.

//--------------------------------


const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? 'Mobile'
    : 'Desktop';

//--------------------------------


detectDeviceType(); // 'Mobile' or 'Desktop'

//--------------------------------


const detectLanguage = (defaultLang = 'en-US') => 
  navigator.language ||
  (Array.isArray(navigator.languages) && navigator.languages[0]) ||
  defaultLang;

//--------------------------------


detectLanguage(); // 'nl-NL'

//--------------------------------


const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};

//--------------------------------


difference([1, 2, 3, 3], [1, 2, 4]); // [3, 3]

//--------------------------------


const differenceBy = (a, b, fn) => {
  const s = new Set(b.map(fn));
  return a.map(fn).filter(el => !s.has(el));
};

//--------------------------------


differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [1]
differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], v => v.x); // [2]

//--------------------------------


const differenceWith = (arr, val, comp = (a, b) => a === b) =>
  arr.filter(a => val.findIndex(b => comp(a, b)) === -1);

//--------------------------------


differenceWith(
  [1, 1.2, 1.5, 3, 0],
  [1.9, 3, 0],
  (a, b) => Math.round(a) === Math.round(b)
); // [1, 1.2]
differenceWith([1, 1.2, 1.3], [1, 1.3, 1.5]); // [1.2]

//--------------------------------


const dig = (obj, target) =>
  target in obj
    ? obj[target]
    : Object.values(obj).reduce((acc, val) => {
        if (acc !== undefined) return acc;
        if (typeof val === 'object') return dig(val, target);
      }, undefined);

//--------------------------------


const data = {
  level1: {
    level2: {
      level3: 'some data'
    }
  }
};
dig(data, 'level3'); // 'some data'
dig(data, 'level4'); // undefined

//--------------------------------


const digitize = n => [...`${Math.abs(n)}`].map(i => parseInt(i));

//--------------------------------


digitize(123); // [1, 2, 3]
digitize(-123); // [1, 2, 3]

//--------------------------------


const distance = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0);

//--------------------------------


distance(1, 1, 2, 3); // ~2.2361

//--------------------------------


const divmod = (x, y) => [Math.floor(x / y), x % y];

//--------------------------------


divmod(8, 3); // [2, 2]
divmod(3, 8); // [0, 3]
divmod(5, 5); // [1, 0]

//--------------------------------


const drop = (arr, n = 1) => arr.slice(n);

//--------------------------------


drop([1, 2, 3]); // [2, 3]
drop([1, 2, 3], 2); // [3]
drop([1, 2, 3], 42); // []

//--------------------------------


const dropRight = (arr, n = 1) => arr.slice(0, -n);

//--------------------------------


dropRight([1, 2, 3]); // [1, 2]
dropRight([1, 2, 3], 2); // [1]
dropRight([1, 2, 3], 42); // []

//--------------------------------


const dropRightWhile = (arr, func) => {
  let rightIndex = arr.length;
  while (rightIndex-- && !func(arr[rightIndex]));
  return arr.slice(0, rightIndex + 1);
};

//--------------------------------


dropRightWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const dropWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
  return arr;
};

//--------------------------------


dropWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const either = (f, g) => (...args) => f(...args) || g(...args);

//--------------------------------


const isEven = num => num % 2 === 0;
const isPositive = num => num > 0;
const isPositiveOrEven = either(isPositive, isEven);
isPositiveOrEven(4); // true
isPositiveOrEven(3); // true

//--------------------------------


const elementContains = (parent, child) =>
  parent !== child && parent.contains(child);

//--------------------------------


elementContains(
  document.querySelector('head'),
  document.querySelector('title')
);
// true
elementContains(document.querySelector('body'), document.querySelector('body'));
// false

//--------------------------------


const elementIsFocused = el => (el === document.activeElement);

//--------------------------------


elementIsFocused(el); // true if the element is focused

//--------------------------------


const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) ||
        (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};

//--------------------------------


// e.g. 100x100 viewport and a 10x10px element at position {top: -1, left: 0, bottom: 9, right: 10}
elementIsVisibleInViewport(el); // false - (not fully visible)
elementIsVisibleInViewport(el, true); // true - (partially visible)

//--------------------------------


const equals = (a, b) => {
  if (a === b) return true;
  if (a instanceof Date && b instanceof Date)
    return a.getTime() === b.getTime();
  if (!a || !b || (typeof a !== 'object' && typeof b !== 'object'))
    return a === b;
  if (a.prototype !== b.prototype) return false;
  let keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every(k => equals(a[k], b[k]));
};

//--------------------------------


equals(
  { a: [2, { e: 3 }], b: [4], c: 'foo' },
  { a: [2, { e: 3 }], b: [4], c: 'foo' }
); // true
equals([1, 2, 3], { 0: 1, 1: 2, 2: 3 }); // true

//--------------------------------


const escapeHTML = str =>
  str.replace(
    /[&<>'"]/g,
    tag =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
  );

//--------------------------------


escapeHTML('<a href="#">Me & you</a>'); 
// '&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;'

//--------------------------------


const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

//--------------------------------


escapeRegExp('(test)'); // \\(test\\)

//--------------------------------


const euclideanDistance = (a, b) =>
  Math.hypot(...Object.keys(a).map(k => b[k] - a[k]));

//--------------------------------


euclideanDistance([1, 1], [2, 3]); // ~2.2361
euclideanDistance([1, 1, 1], [2, 3, 2]); // ~2.4495

//--------------------------------


const everyNth = (arr, nth) => arr.filter((e, i) => i % nth === nth - 1);

//--------------------------------


everyNth([1, 2, 3, 4, 5, 6], 2); // [ 2, 4, 6 ]

//--------------------------------


const expandTabs = (str, count) => str.replace(/\t/g, ' '.repeat(count));

//--------------------------------


expandTabs('\t\tlorem', 3); // '      lorem'

//--------------------------------


const extendHex = shortHex =>
  '#' +
  shortHex
    .slice(shortHex.startsWith('#') ? 1 : 0)
    .split('')
    .map(x => x + x)
    .join('');

//--------------------------------


extendHex('#03f'); // '#0033ff'
extendHex('05a'); // '#0055aa'

//--------------------------------


const factorial = n =>
  n < 0
    ? (() => {
        throw new TypeError('Negative numbers are not allowed!');
      })()
    : n <= 1
    ? 1
    : n * factorial(n - 1);

//--------------------------------


factorial(6); // 720

//--------------------------------


const fahrenheitToCelsius = degrees => (degrees - 32) * 5 / 9;

//--------------------------------


fahrenheitToCelsius(32); // 0

//--------------------------------


const fibonacci = n =>
  Array.from({ length: n }).reduce(
    (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
    []
  );

//--------------------------------


fibonacci(6); // [0, 1, 1, 2, 3, 5]

//--------------------------------


const filterNonUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) === arr.lastIndexOf(i));

//--------------------------------


filterNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1, 3, 5]

//--------------------------------


const filterNonUniqueBy = (arr, fn) =>
  arr.filter((v, i) => arr.every((x, j) => (i === j) === fn(v, x, i, j)));

//--------------------------------


filterNonUniqueBy(
  [
    { id: 0, value: 'a' },
    { id: 1, value: 'b' },
    { id: 2, value: 'c' },
    { id: 1, value: 'd' },
    { id: 0, value: 'e' }
  ],
  (a, b) => a.id === b.id
); // [ { id: 2, value: 'c' } ]

//--------------------------------


const filterUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) !== arr.lastIndexOf(i));

//--------------------------------


filterUnique([1, 2, 2, 3, 4, 4, 5]); // [2, 4]

//--------------------------------


const filterUniqueBy = (arr, fn) =>
  arr.filter((v, i) => arr.some((x, j) => (i !== j) === fn(v, x, i, j)));

//--------------------------------


filterUniqueBy(
  [
    { id: 0, value: 'a' },
    { id: 1, value: 'b' },
    { id: 2, value: 'c' },
    { id: 3, value: 'd' },
    { id: 0, value: 'e' }
  ],
  (a, b) => a.id == b.id
); // [ { id: 0, value: 'a' }, { id: 0, value: 'e' } ]

//--------------------------------


const findKey = (obj, fn) => 
  Object.keys(obj).find(key => fn(obj[key], key, obj));

//--------------------------------


findKey(
  {
    barney: { age: 36, active: true },
    fred: { age: 40, active: false },
    pebbles: { age: 1, active: true }
  },
  x => x['active']
); // 'barney'

//--------------------------------


const findKeys = (obj, val) => 
  Object.keys(obj).filter(key => obj[key] === val);

//--------------------------------


const ages = {
  Leo: 20,
  Zoey: 21,
  Jane: 20,
};
findKeys(ages, 20); // [ 'Leo', 'Jane' ]

//--------------------------------


const findLast = (arr, fn) => arr.filter(fn).pop();

//--------------------------------


findLast([1, 2, 3, 4], n => n % 2 === 1); // 3

//--------------------------------


const findLastIndex = (arr, fn) =>
  (arr
    .map((val, i) => [i, val])
    .filter(([i, val]) => fn(val, i, arr))
    .pop() || [-1])[0];

//--------------------------------


findLastIndex([1, 2, 3, 4], n => n % 2 === 1); // 2 (index of the value 3)
findLastIndex([1, 2, 3, 4], n => n === 5); // -1 (default value when not found)

//--------------------------------


const findLastKey = (obj, fn) =>
  Object.keys(obj)
    .reverse()
    .find(key => fn(obj[key], key, obj));

//--------------------------------


findLastKey(
  {
    barney: { age: 36, active: true },
    fred: { age: 40, active: false },
    pebbles: { age: 1, active: true }
  },
  x => x['active']
); // 'pebbles'

//--------------------------------


const flatten = (arr, depth = 1) =>
  arr.reduce(
    (a, v) =>
      a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v),
    []
  );

//--------------------------------


flatten([1, [2], 3, 4]); // [1, 2, 3, 4]
flatten([1, [2, [3, [4, 5], 6], 7], 8], 2); // [1, 2, 3, [4, 5], 6, 7, 8]

//--------------------------------


const flattenObject = (obj, prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}.` : '';
    if (
      typeof obj[k] === 'object' &&
      obj[k] !== null &&
      Object.keys(obj[k]).length > 0
    )
      Object.assign(acc, flattenObject(obj[k], pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});

//--------------------------------


flattenObject({ a: { b: { c: 1 } }, d: 1 }); // { 'a.b.c': 1, d: 1 }

//--------------------------------


const flip = fn => (first, ...rest) => fn(...rest, first);

//--------------------------------


let a = { name: 'John Smith' };
let b = {};
const mergeFrom = flip(Object.assign);
let mergePerson = mergeFrom.bind(null, a);
mergePerson(b); // == b
b = {};
Object.assign(b, a); // == b

//--------------------------------


const forEachRight = (arr, callback) =>
  arr
    .slice()
    .reverse()
    .forEach(callback);

//--------------------------------


forEachRight([1, 2, 3, 4], val => console.log(val)); // '4', '3', '2', '1'

//--------------------------------


const forOwn = (obj, fn) =>
  Object.keys(obj).forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwn({ foo: 'bar', a: 1 }, v => console.log(v)); // 'bar', 1

//--------------------------------


const forOwnRight = (obj, fn) =>
  Object.keys(obj)
    .reverse()
    .forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwnRight({ foo: 'bar', a: 1 }, v => console.log(v)); // 1, 'bar'

//--------------------------------


const formToObject = form =>
  Array.from(new FormData(form)).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value
    }),
    {}
  );

//--------------------------------


formToObject(document.querySelector('#form'));
// { email: 'test@email.com', name: 'Test Name' }

//--------------------------------


const formatDuration = ms => {
  if (ms < 0) ms = -ms;
  const time = {
    day: Math.floor(ms / 86400000),
    hour: Math.floor(ms / 3600000) % 24,
    minute: Math.floor(ms / 60000) % 60,
    second: Math.floor(ms / 1000) % 60,
    millisecond: Math.floor(ms) % 1000
  };
  return Object.entries(time)
    .filter(val => val[1] !== 0)
    .map(([key, val]) => `${val} ${key}${val !== 1 ? 's' : ''}`)
    .join(', ');
};

//--------------------------------


formatDuration(1001); // '1 second, 1 millisecond'
formatDuration(34325055574);
// '397 days, 6 hours, 44 minutes, 15 seconds, 574 milliseconds'

//--------------------------------


const formatNumber = num => num.toLocaleString();

//--------------------------------


formatNumber(123456); // '123,456' in `en-US`
formatNumber(15675436903); // '15.675.436.903' in `de-DE`

//--------------------------------


const frequencies = arr =>
  arr.reduce((a, v) => {
    a[v] = a[v] ? a[v] + 1 : 1;
    return a;
  }, {});

//--------------------------------


frequencies(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // { a: 4, b: 2, c: 1 }
frequencies([...'ball']); // { b: 1, a: 1, l: 2 }

//--------------------------------


const fromCamelCase = (str, separator = '_') =>
  str
    .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
    .toLowerCase();

//--------------------------------


fromCamelCase('someDatabaseFieldName', ' '); // 'some database field name'
fromCamelCase('someLabelThatNeedsToBeDecamelized', '-'); 
// 'some-label-that-needs-to-be-decamelized'
fromCamelCase('someJavascriptProperty', '_'); // 'some_javascript_property'
fromCamelCase('JSONToCSV', '.'); // 'json.to.csv'

//--------------------------------


const fromTimestamp = timestamp => new Date(timestamp * 1000);

//--------------------------------


fromTimestamp(1602162242); // 2020-10-08T13:04:02.000Z

//--------------------------------


const frozenSet = iterable => {
  const s = new Set(iterable);
  s.add = undefined;
  s.delete = undefined;
  s.clear = undefined;
  return s;
};

//--------------------------------


frozenSet([1, 2, 3, 1, 2]); 
// Set { 1, 2, 3, add: undefined, delete: undefined, clear: undefined }

//--------------------------------


const fullscreen = (mode = true, el = 'body') =>
  mode
    ? document.querySelector(el).requestFullscreen()
    : document.exitFullscreen();

//--------------------------------


fullscreen(); // Opens `body` in fullscreen mode
fullscreen(false); // Exits fullscreen mode

//--------------------------------


const functionName = fn => (console.debug(fn.name), fn);

//--------------------------------


let m = functionName(Math.max)(5, 6);
// max (logged in debug channel of console)
// m = 6

//--------------------------------


const functions = (obj, inherited = false) =>
  (inherited
    ? [...Object.keys(obj), ...Object.keys(Object.getPrototypeOf(obj))]
    : Object.keys(obj)
  ).filter(key => typeof obj[key] === 'function');

//--------------------------------


function Foo() {
  this.a = () => 1;
  this.b = () => 2;
}
Foo.prototype.c = () => 3;
functions(new Foo()); // ['a', 'b']
functions(new Foo(), true); // ['a', 'b', 'c']

//--------------------------------


const gcd = (...arr) => {
  const _gcd = (x, y) => (!y ? x : gcd(y, x % y));
  return [...arr].reduce((a, b) => _gcd(a, b));
};

//--------------------------------


gcd(8, 36); // 4
gcd(...[12, 8, 32]); // 4

//--------------------------------


const generateItems = (n, fn) => Array.from({ length: n }, (_, i) => fn(i));

//--------------------------------


generateItems(10, Math.random);
// [0.21, 0.08, 0.40, 0.96, 0.96, 0.24, 0.19, 0.96, 0.42, 0.70]

//--------------------------------


const generatorToArray = gen => [...gen];

//--------------------------------


const s = new Set([1, 2, 1, 3, 1, 4]);
generatorToArray(s.entries()); // [[ 1, 1 ], [ 2, 2 ], [ 3, 3 ], [ 4, 4 ]]

//--------------------------------


const geometricProgression = (end, start = 1, step = 2) =>
  Array.from({
    length: Math.floor(Math.log(end / start) / Math.log(step)) + 1,
  }).map((_, i) => start * step ** i);

//--------------------------------


geometricProgression(256); // [1, 2, 4, 8, 16, 32, 64, 128, 256]
geometricProgression(256, 3); // [3, 6, 12, 24, 48, 96, 192]
geometricProgression(256, 1, 4); // [1, 4, 16, 64, 256]

//--------------------------------


const get = (from, ...selectors) =>
  [...selectors].map(s =>
    s
      .replace(/\[([^\[\]]*)\]/g, '.$1.')
      .split('.')
      .filter(t => t !== '')
      .reduce((prev, cur) => prev && prev[cur], from)
  );

//--------------------------------


const obj = {
  selector: { to: { val: 'val to select' } },
  target: [1, 2, { a: 'test' }],
};
get(obj, 'selector.to.val', 'target[0]', 'target[2].a');
// ['val to select', 1, 'test']

//--------------------------------


const getAncestors = el => {
  let ancestors = [];
  while (el) {
    ancestors.unshift(el);
    el = el.parentNode;
  }
  return ancestors;
};

//--------------------------------


getAncestors(document.querySelector('nav')); 
// [document, html, body, header, nav]

//--------------------------------


const getBaseURL = url => url.replace(/[?#].*$/, '');

//--------------------------------


getBaseURL('http://url.com/page?name=Adam&surname=Smith');
// 'http://url.com/page'

//--------------------------------


const getColonTimeFromDate = date => date.toTimeString().slice(0, 8);

//--------------------------------


getColonTimeFromDate(new Date()); // '08:38:00'

//--------------------------------


const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24);

//--------------------------------


getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')); // 9

//--------------------------------


const getElementsBiggerThanViewport = () => {
  const docWidth = document.documentElement.offsetWidth;
  return [...document.querySelectorAll('*')].filter(
    el => el.offsetWidth > docWidth
  );
};

//--------------------------------


getElementsBiggerThanViewport(); // <div id="ultra-wide-item" />

//--------------------------------


const getImages = (el, includeDuplicates = false) => {
  const images = [...el.getElementsByTagName('img')].map(img =>
    img.getAttribute('src')
  );
  return includeDuplicates ? images : [...new Set(images)];
};

//--------------------------------


getImages(document, true); // ['image1.jpg', 'image2.png', 'image1.png', '...']
getImages(document, false); // ['image1.jpg', 'image2.png', '...']

//--------------------------------


const getMeridiemSuffixOfInteger = num =>
  num === 0 || num === 24
    ? 12 + 'am'
    : num === 12
    ? 12 + 'pm'
    : num < 12
    ? (num % 12) + 'am'
    : (num % 12) + 'pm';

//--------------------------------


getMeridiemSuffixOfInteger(0); // '12am'
getMeridiemSuffixOfInteger(11); // '11am'
getMeridiemSuffixOfInteger(13); // '1pm'
getMeridiemSuffixOfInteger(25); // '1pm'

//--------------------------------


const getMonthsDiffBetweenDates = (dateInitial, dateFinal) =>
  Math.max(
    (dateFinal.getFullYear() - dateInitial.getFullYear()) * 12 +
      dateFinal.getMonth() -
      dateInitial.getMonth(),
    0
  );

//--------------------------------


getMonthsDiffBetweenDates(new Date('2017-12-13'), new Date('2018-04-29')); // 4

//--------------------------------


const getParentsUntil = (el, selector) => {
  let parents = [],
    _el = el.parentNode;
  while (_el && typeof _el.matches === 'function') {
    parents.unshift(_el);
    if (_el.matches(selector)) return parents;
    else _el = _el.parentNode;
  }
  return [];
};

//--------------------------------


getParentsUntil(document.querySelector('#home-link'), 'header');
// [header, nav, ul, li]

//--------------------------------


const getProtocol = () => window.location.protocol;

//--------------------------------


getProtocol(); // 'https:'

//--------------------------------


const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});

//--------------------------------


getScrollPosition(); // {x: 0, y: 200}

//--------------------------------


const getSelectedText = () => window.getSelection().toString();

//--------------------------------


getSelectedText(); // 'Lorem ipsum'

//--------------------------------


const getSiblings = el =>
  [...el.parentNode.childNodes].filter(node => node !== el);

//--------------------------------


getSiblings(document.querySelector('head')); // ['body']

//--------------------------------


const getStyle = (el, ruleName) => getComputedStyle(el)[ruleName];

//--------------------------------


getStyle(document.querySelector('p'), 'font-size'); // '16px'

//--------------------------------


const getTimestamp = (date = new Date()) => Math.floor(date.getTime() / 1000);

//--------------------------------


getTimestamp(); // 1602162242

//--------------------------------


const getType = v =>
  (v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name);

//--------------------------------


getType(new Set([1, 2, 3])); // 'Set'

//--------------------------------


const getURLParameters = url =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => (
      (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a
    ),
    {}
  );

//--------------------------------


getURLParameters('google.com'); // {}
getURLParameters('http://url.com/page?name=Adam&surname=Smith');
// {name: 'Adam', surname: 'Smith'}

//--------------------------------


const getVerticalOffset = el => {
  let offset = el.offsetTop,
    _el = el;
  while (_el.offsetParent) {
    _el = _el.offsetParent;
    offset += _el.offsetTop;
  }
  return offset;
};

//--------------------------------


getVerticalOffset('.my-element'); // 120

//--------------------------------


const groupBy = (arr, fn) =>
  arr
    .map(typeof fn === 'function' ? fn : val => val[fn])
    .reduce((acc, val, i) => {
      acc[val] = (acc[val] || []).concat(arr[i]);
      return acc;
    }, {});

//--------------------------------


groupBy([6.1, 4.2, 6.3], Math.floor); // {4: [4.2], 6: [6.1, 6.3]}
groupBy(['one', 'two', 'three'], 'length'); // {3: ['one', 'two'], 5: ['three']}

//--------------------------------


const hammingDistance = (num1, num2) =>
  ((num1 ^ num2).toString(2).match(/1/g) || '').length;

//--------------------------------


hammingDistance(2, 3); // 1

//--------------------------------


const hasClass = (el, className) => el.classList.contains(className);

//--------------------------------


hasClass(document.querySelector('p.special'), 'special'); // true

//--------------------------------


const hasDuplicates = arr => new Set(arr).size !== arr.length;

//--------------------------------


hasDuplicates([0, 1, 1, 2]); // true
hasDuplicates([0, 1, 2, 3]); // false

//--------------------------------


const hasFlags = (...flags) =>
  flags.every(flag =>
    process.argv.includes(/^-{1,2}/.test(flag) ? flag : '--' + flag)
  );

//--------------------------------


// node myScript.js -s --test --cool=true
hasFlags('-s'); // true
hasFlags('--test', 'cool=true', '-s'); // true
hasFlags('special'); // false

//--------------------------------


const hasKey = (obj, keys) => {
  return (
    keys.length > 0 &&
    keys.every(key => {
      if (typeof obj !== 'object' || !obj.hasOwnProperty(key)) return false;
      obj = obj[key];
      return true;
    })
  );
};

//--------------------------------


let obj = {
  a: 1,
  b: { c: 4 },
  'b.d': 5
};
hasKey(obj, ['a']); // true
hasKey(obj, ['b']); // true
hasKey(obj, ['b', 'c']); // true
hasKey(obj, ['b.d']); // true
hasKey(obj, ['d']); // false
hasKey(obj, ['c']); // false
hasKey(obj, ['b', 'f']); // false

//--------------------------------


const hashBrowser = val =>
  crypto.subtle
    .digest('SHA-256', new TextEncoder('utf-8').encode(val))
    .then(h => {
      let hexes = [],
        view = new DataView(h);
      for (let i = 0; i < view.byteLength; i += 4)
        hexes.push(('00000000' + view.getUint32(i).toString(16)).slice(-8));
      return hexes.join('');
    });

//--------------------------------


hashBrowser(
  JSON.stringify({ a: 'a', b: [1, 2, 3, 4], foo: { c: 'bar' } })
).then(console.log);
// '04aa106279f5977f59f9067fa9712afc4aedc6f5862a8defc34552d8c7206393'

//--------------------------------


const crypto = require('crypto');

const hashNode = val =>
  new Promise(resolve =>
    setTimeout(
      () => resolve(crypto.createHash('sha256').update(val).digest('hex')),
      0
    )
  );

//--------------------------------


hashNode(JSON.stringify({ a: 'a', b: [1, 2, 3, 4], foo: { c: 'bar' } })).then(
  console.log
);
// '04aa106279f5977f59f9067fa9712afc4aedc6f5862a8defc34552d8c7206393'

//--------------------------------


const haveSameContents = (a, b) => {
  for (const v of new Set([...a, ...b]))
    if (a.filter(e => e === v).length !== b.filter(e => e === v).length)
      return false;
  return true;
};

//--------------------------------


haveSameContents([1, 2, 4], [2, 4, 1]); // true

//--------------------------------


const head = arr => (arr && arr.length ? arr[0] : undefined);

//--------------------------------


head([1, 2, 3]); // 1
head([]); // undefined
head(null); // undefined
head(undefined); // undefined

//--------------------------------


const heapsort = arr => {
  const a = [...arr];
  let l = a.length;

  const heapify = (a, i) => {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let max = i;
    if (left < l && a[left] > a[max]) max = left;
    if (right < l && a[right] > a[max]) max = right;
    if (max !== i) {
      [a[max], a[i]] = [a[i], a[max]];
      heapify(a, max);
    }
  };

  for (let i = Math.floor(l / 2); i >= 0; i -= 1) heapify(a, i);
  for (i = a.length - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    l--;
    heapify(a, 0);
  }
  return a;
};

//--------------------------------


heapsort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const hexToRGB = hex => {
  let alpha = false,
    h = hex.slice(hex.startsWith('#') ? 1 : 0);
  if (h.length === 3) h = [...h].map(x => x + x).join('');
  else if (h.length === 8) alpha = true;
  h = parseInt(h, 16);
  return (
    'rgb' +
    (alpha ? 'a' : '') +
    '(' +
    (h >>> (alpha ? 24 : 16)) +
    ', ' +
    ((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) +
    ', ' +
    ((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) +
    (alpha ? `, ${h & 0x000000ff}` : '') +
    ')'
  );
};

//--------------------------------


hexToRGB('#27ae60ff'); // 'rgba(39, 174, 96, 255)'
hexToRGB('27ae60'); // 'rgb(39, 174, 96)'
hexToRGB('#fff'); // 'rgb(255, 255, 255)'

//--------------------------------


const hide = (...el) => [...el].forEach(e => (e.style.display = 'none'));

//--------------------------------


hide(document.querySelectorAll('img')); // Hides all <img> elements on the page

//--------------------------------


const httpDelete = (url, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open('DELETE', url, true);
  request.onload = () => callback(request);
  request.onerror = () => err(request);
  request.send();
};

//--------------------------------


httpDelete('https://jsonplaceholder.typicode.com/posts/1', request => {
  console.log(request.responseText);
}); // Logs: {}

//--------------------------------


const httpGet = (url, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = () => callback(request.responseText);
  request.onerror = () => err(request);
  request.send();
};

//--------------------------------


httpGet(
  'https://jsonplaceholder.typicode.com/posts/1',
  console.log
); /*
Logs: {
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
}
*/

//--------------------------------


const httpPost = (url, data, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  request.onload = () => callback(request.responseText);
  request.onerror = () => err(request);
  request.send(data);
};

//--------------------------------


const newPost = {
  userId: 1,
  id: 1337,
  title: 'Foo',
  body: 'bar bar bar'
};
const data = JSON.stringify(newPost);
httpPost(
  'https://jsonplaceholder.typicode.com/posts',
  data,
  console.log
); /*
Logs: {
  "userId": 1,
  "id": 1337,
  "title": "Foo",
  "body": "bar bar bar"
}
*/
httpPost(
  'https://jsonplaceholder.typicode.com/posts',
  null, // does not send a body
  console.log
); /*
Logs: {
  "id": 101
}
*/

//--------------------------------


const httpPut = (url, data, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open('PUT', url, true);
  request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  request.onload = () => callback(request);
  request.onerror = () => err(request);
  request.send(data);
};

//--------------------------------


const password = 'fooBaz';
const data = JSON.stringify({
  id: 1,
  title: 'foo',
  body: 'bar',
  userId: 1
});
httpPut('https://jsonplaceholder.typicode.com/posts/1', data, request => {
  console.log(request.responseText);
}); /*
Logs: {
  id: 1,
  title: 'foo',
  body: 'bar',
  userId: 1
}
*/

//--------------------------------


const httpsRedirect = () => {
  if (location.protocol !== 'https:')
    location.replace('https://' + location.href.split('//')[1]);
};

//--------------------------------


httpsRedirect(); 
// If you are on http://mydomain.com, you are redirected to https://mydomain.com

//--------------------------------


const hz = (fn, iterations = 100) => {
  const before = performance.now();
  for (let i = 0; i < iterations; i++) fn();
  return (1000 * iterations) / (performance.now() - before);
};

//--------------------------------


const numbers = Array(10000).fill().map((_, i) => i);

const sumReduce = () => numbers.reduce((acc, n) => acc + n, 0);
const sumForLoop = () => {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  return sum;
};

Math.round(hz(sumReduce)); // 572
Math.round(hz(sumForLoop)); // 4784

//--------------------------------


const inRange = (n, start, end = null) => {
  if (end && start > end) [end, start] = [start, end];
  return end == null ? n >= 0 && n < start : n >= start && n < end;
};

//--------------------------------


inRange(3, 2, 5); // true
inRange(3, 4); // true
inRange(2, 3, 5); // false
inRange(3, 2); // false

//--------------------------------


const includesAll = (arr, values) => values.every(v => arr.includes(v));

//--------------------------------


includesAll([1, 2, 3, 4], [1, 4]); // true
includesAll([1, 2, 3, 4], [1, 5]); // false

//--------------------------------


const includesAny = (arr, values) => values.some(v => arr.includes(v));

//--------------------------------


includesAny([1, 2, 3, 4], [2, 9]); // true
includesAny([1, 2, 3, 4], [8, 9]); // false

//--------------------------------


const indentString = (str, count, indent = ' ') =>
  str.replace(/^/gm, indent.repeat(count));

//--------------------------------


indentString('Lorem\nIpsum', 2); // '  Lorem\n  Ipsum'
indentString('Lorem\nIpsum', 2, '_'); // '__Lorem\n__Ipsum'

//--------------------------------


const indexOfAll = (arr, val) =>
  arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);

//--------------------------------


indexOfAll([1, 2, 3, 1, 2, 3], 1); // [0, 3]
indexOfAll([1, 2, 3], 4); // []

//--------------------------------


const indexOfSubstrings = function* (str, searchValue) {
  let i = 0;
  while (true) {
    const r = str.indexOf(searchValue, i);
    if (r !== -1) {
      yield r;
      i = r + 1;
    } else return;
  }
};

//--------------------------------


[...indexOfSubstrings('tiktok tok tok tik tok tik', 'tik')]; // [0, 15, 23]
[...indexOfSubstrings('tutut tut tut', 'tut')]; // [0, 2, 6, 10]
[...indexOfSubstrings('hello', 'hi')]; // []

//--------------------------------


const initial = arr => arr.slice(0, -1);

//--------------------------------


initial([1, 2, 3]); // [1, 2]

//--------------------------------


const initialize2DArray = (w, h, val = null) =>
  Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));

//--------------------------------


initialize2DArray(2, 2, 0); // [[0, 0], [0, 0]]

//--------------------------------


const initializeArrayWithRange = (end, start = 0, step = 1) =>
  Array.from(
    { length: Math.ceil((end - start + 1) / step) },
    (_, i) => i * step + start
  );

//--------------------------------


initializeArrayWithRange(5); // [0, 1, 2, 3, 4, 5]
initializeArrayWithRange(7, 3); // [3, 4, 5, 6, 7]
initializeArrayWithRange(9, 0, 2); // [0, 2, 4, 6, 8]

//--------------------------------


const initializeArrayWithRangeRight = (end, start = 0, step = 1) =>
  Array.from({ length: Math.ceil((end + 1 - start) / step) }).map(
    (v, i, arr) => (arr.length - i - 1) * step + start
  );

//--------------------------------


initializeArrayWithRangeRight(5); // [5, 4, 3, 2, 1, 0]
initializeArrayWithRangeRight(7, 3); // [7, 6, 5, 4, 3]
initializeArrayWithRangeRight(9, 0, 2); // [8, 6, 4, 2, 0]

//--------------------------------


const initializeArrayWithValues = (n, val = 0) =>
  Array.from({ length: n }).fill(val);

//--------------------------------


initializeArrayWithValues(5, 2); // [2, 2, 2, 2, 2]

//--------------------------------


const initializeNDArray = (val, ...args) =>
  args.length === 0
    ? val
    : Array.from({ length: args[0] }).map(() =>
        initializeNDArray(val, ...args.slice(1))
      );

//--------------------------------


initializeNDArray(1, 3); // [1, 1, 1]
initializeNDArray(5, 2, 2, 2); // [[[5, 5], [5, 5]], [[5, 5], [5, 5]]]

//--------------------------------


const injectCSS = css => {
  let el = document.createElement('style');
  el.type = 'text/css';
  el.innerText = css;
  document.head.appendChild(el);
  return el;
};

//--------------------------------


injectCSS('body { background-color: #000 }'); 
// '<style type="text/css">body { background-color: #000 }</style>'

//--------------------------------


const insertAfter = (el, htmlString) =>
  el.insertAdjacentHTML('afterend', htmlString);

//--------------------------------


insertAfter(document.getElementById('myId'), '<p>after</p>');
// <div id="myId">...</div> <p>after</p>

//--------------------------------


const insertAt = (arr, i, ...v) => {
  arr.splice(i + 1, 0, ...v);
  return arr;
};

//--------------------------------


let myArray = [1, 2, 3, 4];
insertAt(myArray, 2, 5); // myArray = [1, 2, 3, 5, 4]

let otherArray = [2, 10];
insertAt(otherArray, 0, 4, 6, 8); // otherArray = [2, 4, 6, 8, 10]

//--------------------------------


const insertBefore = (el, htmlString) =>
  el.insertAdjacentHTML('beforebegin', htmlString);

//--------------------------------


insertBefore(document.getElementById('myId'), '<p>before</p>');
// <p>before</p> <div id="myId">...</div>

//--------------------------------


const insertionSort = arr =>
  arr.reduce((acc, x) => {
    if (!acc.length) return [x];
    acc.some((y, j) => {
      if (x <= y) {
        acc.splice(j, 0, x);
        return true;
      }
      if (x > y && j === acc.length - 1) {
        acc.splice(j + 1, 0, x);
        return true;
      }
      return false;
    });
    return acc;
  }, []);

//--------------------------------


insertionSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const intersection = (a, b) => {
  const s = new Set(b);
  return [...new Set(a)].filter(x => s.has(x));
};

//--------------------------------


intersection([1, 2, 3], [4, 3, 2]); // [2, 3]

//--------------------------------


const intersectionBy = (a, b, fn) => {
  const s = new Set(b.map(fn));
  return [...new Set(a)].filter(x => s.has(fn(x)));
};

//--------------------------------


intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [2.1]
intersectionBy(
  [{ title: 'Apple' }, { title: 'Orange' }],
  [{ title: 'Orange' }, { title: 'Melon' }],
  x => x.title
); // [{ title: 'Orange' }]

//--------------------------------


const intersectionWith = (a, b, comp) =>
  a.filter(x => b.findIndex(y => comp(x, y)) !== -1);

//--------------------------------


intersectionWith(
  [1, 1.2, 1.5, 3, 0],
  [1.9, 3, 0, 3.9],
  (a, b) => Math.round(a) === Math.round(b)
); // [1.5, 3, 0]

//--------------------------------


const invertKeyValues = (obj, fn) =>
  Object.keys(obj).reduce((acc, key) => {
    const val = fn ? fn(obj[key]) : obj[key];
    acc[val] = acc[val] || [];
    acc[val].push(key);
    return acc;
  }, {});

//--------------------------------


invertKeyValues({ a: 1, b: 2, c: 1 }); // { 1: [ 'a', 'c' ], 2: [ 'b' ] }
invertKeyValues({ a: 1, b: 2, c: 1 }, value => 'group' + value);
// { group1: [ 'a', 'c' ], group2: [ 'b' ] }

//--------------------------------


const is = (type, val) => ![, null].includes(val) && val.constructor === type;

//--------------------------------


is(Array, [1]); // true
is(ArrayBuffer, new ArrayBuffer()); // true
is(Map, new Map()); // true
is(RegExp, /./g); // true
is(Set, new Set()); // true
is(WeakMap, new WeakMap()); // true
is(WeakSet, new WeakSet()); // true
is(String, ''); // true
is(String, new String('')); // true
is(Number, 1); // true
is(Number, new Number(1)); // true
is(Boolean, true); // true
is(Boolean, new Boolean(true)); // true

//--------------------------------


const isAbsoluteURL = str => /^[a-z][a-z0-9+.-]*:/.test(str);

//--------------------------------


isAbsoluteURL('https://google.com'); // true
isAbsoluteURL('ftp://www.myserver.net'); // true
isAbsoluteURL('/foo/bar'); // false

//--------------------------------


const isAfterDate = (dateA, dateB) => dateA > dateB;

//--------------------------------


isAfterDate(new Date(2010, 10, 21), new Date(2010, 10, 20)); // true

//--------------------------------


const isAlpha = str => /^[a-zA-Z]*$/.test(str);

//--------------------------------


isAlpha('sampleInput'); // true
isAlpha('this Will fail'); // false
isAlpha('123'); // false

//--------------------------------


const isAlphaNumeric = str => /^[a-z0-9]+$/gi.test(str);

//--------------------------------


isAlphaNumeric('hello123'); // true
isAlphaNumeric('123'); // true
isAlphaNumeric('hello 123'); // false (space character is not alphanumeric)
isAlphaNumeric('#$hello'); // false

//--------------------------------


const isAnagram = (str1, str2) => {
  const normalize = str =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, '')
      .split('')
      .sort()
      .join('');
  return normalize(str1) === normalize(str2);
};

//--------------------------------


isAnagram('iceman', 'cinema'); // true

//--------------------------------


const isArrayLike = obj =>
  obj != null && typeof obj[Symbol.iterator] === 'function';

//--------------------------------


isArrayLike([1, 2, 3]); // true
isArrayLike(document.querySelectorAll('.className')); // true
isArrayLike('abc'); // true
isArrayLike(null); // false

//--------------------------------


const isAsyncFunction = val =>
  Object.prototype.toString.call(val) === '[object AsyncFunction]';

//--------------------------------


isAsyncFunction(function() {}); // false
isAsyncFunction(async function() {}); // true

//--------------------------------


const isBeforeDate = (dateA, dateB) => dateA < dateB;

//--------------------------------


isBeforeDate(new Date(2010, 10, 20), new Date(2010, 10, 21)); // true

//--------------------------------


const isBetweenDates = (dateStart, dateEnd, date) =>
  date > dateStart && date < dateEnd;

//--------------------------------


isBetweenDates(
  new Date(2010, 11, 20),
  new Date(2010, 11, 30),
  new Date(2010, 11, 19)
); // false
isBetweenDates(
  new Date(2010, 11, 20),
  new Date(2010, 11, 30),
  new Date(2010, 11, 25)
); // true

//--------------------------------


const isBoolean = val => typeof val === 'boolean';

//--------------------------------


isBoolean(null); // false
isBoolean(false); // true

//--------------------------------


const isBrowser = () => ![typeof window, typeof document].includes('undefined');

//--------------------------------


isBrowser(); // true (browser)
isBrowser(); // false (Node)

//--------------------------------


const isBrowserTabFocused = () => !document.hidden;

//--------------------------------


isBrowserTabFocused(); // true

//--------------------------------


const isContainedIn = (a, b) => {
  for (const v of new Set(a)) {
    if (
      !b.some(e => e === v) ||
      a.filter(e => e === v).length > b.filter(e => e === v).length
    )
      return false;
  }
  return true;
};

//--------------------------------


isContainedIn([1, 4], [2, 4, 1]); // true

//--------------------------------


const isDateValid = (...val) => !Number.isNaN(new Date(...val).valueOf());

//--------------------------------


isDateValid('December 17, 1995 03:24:00'); // true
isDateValid('1995-12-17T03:24:00'); // true
isDateValid('1995-12-17 T03:24:00'); // false
isDateValid('Duck'); // false
isDateValid(1995, 11, 17); // true
isDateValid(1995, 11, 17, 'Duck'); // false
isDateValid({}); // false

//--------------------------------


const isDeepFrozen = obj =>
  Object.isFrozen(obj) &&
  Object.keys(obj).every(
    prop => typeof obj[prop] !== 'object' || isDeepFrozen(obj[prop])
  );

//--------------------------------


const x = Object.freeze({ a: 1 });
const y = Object.freeze({ b: { c: 2 } });
isDeepFrozen(x); // true
isDeepFrozen(y); // false

//--------------------------------


const isDisjoint = (a, b) => {
  const sA = new Set(a), sB = new Set(b);
  return [...sA].every(v => !sB.has(v));
};

//--------------------------------


isDisjoint(new Set([1, 2]), new Set([3, 4])); // true
isDisjoint(new Set([1, 2]), new Set([1, 3])); // false

//--------------------------------


const isDivisible = (dividend, divisor) => dividend % divisor === 0;

//--------------------------------


isDivisible(6, 3); // true

//--------------------------------


const isDuplexStream = val =>
  val !== null &&
  typeof val === 'object' &&
  typeof val.pipe === 'function' &&
  typeof val._read === 'function' &&
  typeof val._readableState === 'object' &&
  typeof val._write === 'function' &&
  typeof val._writableState === 'object';

//--------------------------------


const Stream = require('stream');

isDuplexStream(new Stream.Duplex()); // true

//--------------------------------


const isEmpty = val => val == null || !(Object.keys(val) || val).length;

//--------------------------------


isEmpty([]); // true
isEmpty({}); // true
isEmpty(''); // true
isEmpty([1, 2]); // false
isEmpty({ a: 1, b: 2 }); // false
isEmpty('text'); // false
isEmpty(123); // true - type is not considered a collection
isEmpty(true); // true - type is not considered a collection

//--------------------------------


const isEven = num => num % 2 === 0;

//--------------------------------


isEven(3); // false

//--------------------------------


const isFunction = val => typeof val === 'function';

//--------------------------------


isFunction('x'); // false
isFunction(x => x); // true

//--------------------------------


const isGeneratorFunction = val =>
  Object.prototype.toString.call(val) === '[object GeneratorFunction]';

//--------------------------------


isGeneratorFunction(function() {}); // false
isGeneratorFunction(function*() {}); // true

//--------------------------------


const isISOString = val => {
  const d = new Date(val);
  return !Number.isNaN(d.valueOf()) && d.toISOString() === val;
};


//--------------------------------


isISOString('2020-10-12T10:10:10.000Z'); // true
isISOString('2020-10-12'); // false

//--------------------------------


const isLeapYear = year => new Date(year, 1, 29).getMonth() === 1;

//--------------------------------


isLeapYear(2019); // false
isLeapYear(2020); // true

//--------------------------------


const isLocalStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.localStorage.setItem(key, null);
    window.localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isLocalStorageEnabled(); // true, if localStorage is accessible

//--------------------------------


const isLowerCase = str => str === str.toLowerCase();

//--------------------------------


isLowerCase('abc'); // true
isLowerCase('a3@$'); // true
isLowerCase('Ab4'); // false

//--------------------------------


const isNegativeZero = val => val === 0 && 1 / val === -Infinity;

//--------------------------------


isNegativeZero(-0); // true
isNegativeZero(0); // false

//--------------------------------


const isNil = val => val === undefined || val === null;

//--------------------------------


isNil(null); // true
isNil(undefined); // true
isNil(''); // false

//--------------------------------


const isNode = () =>
  typeof process !== 'undefined' &&
  process.versions !== null &&
  process.versions.node !== null;

//--------------------------------


isNode(); // true (Node)
isNode(); // false (browser)

//--------------------------------


const isNull = val => val === null;

//--------------------------------


isNull(null); // true

//--------------------------------


const isNumber = val => typeof val === 'number' && val === val;

//--------------------------------


isNumber(1); // true
isNumber('1'); // false
isNumber(NaN); // false

//--------------------------------


const isObject = obj => obj === Object(obj);

//--------------------------------


isObject([1, 2, 3, 4]); // true
isObject([]); // true
isObject(['Hello!']); // true
isObject({ a: 1 }); // true
isObject({}); // true
isObject(true); // false

//--------------------------------


const isObjectLike = val => val !== null && typeof val === 'object';

//--------------------------------


isObjectLike({}); // true
isObjectLike([1, 2, 3]); // true
isObjectLike(x => x); // false
isObjectLike(null); // false

//--------------------------------


const isOdd = num => num % 2 === 1;

//--------------------------------


isOdd(3); // true

//--------------------------------


const isPlainObject = val =>
  !!val && typeof val === 'object' && val.constructor === Object;

//--------------------------------


isPlainObject({ a: 1 }); // true
isPlainObject(new Map()); // false

//--------------------------------


const isPowerOfTen = n => Math.log10(n) % 1 === 0;

//--------------------------------


isPowerOfTen(1); // true
isPowerOfTen(10); // true
isPowerOfTen(20); // false

//--------------------------------


const isPowerOfTwo = n => !!n && (n & (n - 1)) == 0;

//--------------------------------


isPowerOfTwo(0); // false
isPowerOfTwo(1); // true
isPowerOfTwo(8); // true

//--------------------------------


const isPrime = num => {
  const boundary = Math.floor(Math.sqrt(num));
  for (let i = 2; i <= boundary; i++) if (num % i === 0) return false;
  return num >= 2;
};

//--------------------------------


isPrime(11); // true

//--------------------------------


const isPrimitive = val => Object(val) !== val;

//--------------------------------


isPrimitive(null); // true
isPrimitive(undefined); // true
isPrimitive(50); // true
isPrimitive('Hello!'); // true
isPrimitive(false); // true
isPrimitive(Symbol()); // true
isPrimitive([]); // false
isPrimitive({}); // false

//--------------------------------


const isPromiseLike = obj =>
  obj !== null &&
  (typeof obj === 'object' || typeof obj === 'function') &&
  typeof obj.then === 'function';

//--------------------------------


isPromiseLike({
  then: function() {
    return '';
  }
}); // true
isPromiseLike(null); // false
isPromiseLike({}); // false

//--------------------------------


const isReadableStream = val =>
  val !== null &&
  typeof val === 'object' &&
  typeof val.pipe === 'function' &&
  typeof val._read === 'function' &&
  typeof val._readableState === 'object';

//--------------------------------


const fs = require('fs');

isReadableStream(fs.createReadStream('test.txt')); // true

//--------------------------------


const isSameDate = (dateA, dateB) =>
  dateA.toISOString() === dateB.toISOString();

//--------------------------------


isSameDate(new Date(2010, 10, 20), new Date(2010, 10, 20)); // true

//--------------------------------


const isSessionStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.sessionStorage.setItem(key, null);
    window.sessionStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isSessionStorageEnabled(); // true, if sessionStorage is accessible

//--------------------------------


const isSorted = arr => {
  if (arr.length <= 1) return 0;
  const direction = arr[1] - arr[0];
  for (let i = 2; i < arr.length; i++) {
    if ((arr[i] - arr[i - 1]) * direction < 0) return 0;
  }
  return Math.sign(direction);
};

//--------------------------------


isSorted([0, 1, 2, 2]); // 1
isSorted([4, 3, 2]); // -1
isSorted([4, 3, 5]); // 0
isSorted([4]); // 0

//--------------------------------


const isStream = val =>
  val !== null && typeof val === 'object' && typeof val.pipe === 'function';

//--------------------------------


const fs = require('fs');

isStream(fs.createReadStream('test.txt')); // true

//--------------------------------


const isString = val => typeof val === 'string';

//--------------------------------


isString('10'); // true

//--------------------------------


const isSymbol = val => typeof val === 'symbol';

//--------------------------------


isSymbol(Symbol('x')); // true

//--------------------------------


const isTravisCI = () => 'TRAVIS' in process.env && 'CI' in process.env;

//--------------------------------


isTravisCI(); // true (if code is running on Travis CI)

//--------------------------------


const isUndefined = val => val === undefined;

//--------------------------------


isUndefined(undefined); // true

//--------------------------------


const isUpperCase = str => str === str.toUpperCase();

//--------------------------------


isUpperCase('ABC'); // true
isUpperCase('A3@$'); // true
isUpperCase('aB4'); // false

//--------------------------------


const isValidJSON = str => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isValidJSON('{"name":"Adam","age":20}'); // true
isValidJSON('{"name":"Adam",age:"20"}'); // false
isValidJSON(null); // true

//--------------------------------


const isWeekday = (d = new Date()) => d.getDay() % 6 !== 0;

//--------------------------------


isWeekday(); // true (if current date is 2019-07-19)

//--------------------------------


const isWeekend = (d = new Date()) => d.getDay() % 6 === 0;

//--------------------------------


isWeekend(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const isWritableStream = val =>
  val !== null &&
  typeof val === 'object' &&
  typeof val.pipe === 'function' &&
  typeof val._write === 'function' &&
  typeof val._writableState === 'object';

//--------------------------------


const fs = require('fs');

isWritableStream(fs.createWriteStream('test.txt')); // true

//--------------------------------



const join = (arr, separator = ',', end = separator) =>
  arr.reduce(
    (acc, val, i) =>
      i === arr.length - 2
        ? acc + val + end
        : i === arr.length - 1
          ? acc + val
          : acc + val + separator,
    ''
  );

//--------------------------------


join(['pen', 'pineapple', 'apple', 'pen'],',','&'); // 'pen,pineapple,apple&pen'
join(['pen', 'pineapple', 'apple', 'pen'], ','); // 'pen,pineapple,apple,pen'
join(['pen', 'pineapple', 'apple', 'pen']); // 'pen,pineapple,apple,pen'

//--------------------------------


const juxt = (...fns) => (...args) => [...fns].map(fn => [...args].map(fn));

//--------------------------------


juxt(
  x => x + 1,
  x => x - 1,
  x => x * 10
)(1, 2, 3); // [[2, 3, 4], [0, 1, 2], [10, 20, 30]]
juxt(
  s => s.length,
  s => s.split(' ').join('-')
)('30 seconds of code'); // [[18], ['30-seconds-of-code']]

//--------------------------------


const kMeans = (data, k = 1) => {
  const centroids = data.slice(0, k);
  const distances = Array.from({ length: data.length }, () =>
    Array.from({ length: k }, () => 0)
  );
  const classes = Array.from({ length: data.length }, () => -1);
  let itr = true;

  while (itr) {
    itr = false;

    for (let d in data) {
      for (let c = 0; c < k; c++) {
        distances[d][c] = Math.hypot(
          ...Object.keys(data[0]).map(key => data[d][key] - centroids[c][key])
        );
      }
      const m = distances[d].indexOf(Math.min(...distances[d]));
      if (classes[d] !== m) itr = true;
      classes[d] = m;
    }

    for (let c = 0; c < k; c++) {
      centroids[c] = Array.from({ length: data[0].length }, () => 0);
      const size = data.reduce((acc, _, d) => {
        if (classes[d] === c) {
          acc++;
          for (let i in data[0]) centroids[c][i] += data[d][i];
        }
        return acc;
      }, 0);
      for (let i in data[0]) {
        centroids[c][i] = parseFloat(Number(centroids[c][i] / size).toFixed(2));
      }
    }
  }

  return classes;
};

//--------------------------------


kMeans([[0, 0], [0, 1], [1, 3], [2, 0]], 2); // [0, 1, 1, 0]

//--------------------------------


const kNearestNeighbors = (data, labels, point, k = 3) => {
  const kNearest = data
    .map((el, i) => ({
      dist: Math.hypot(...Object.keys(el).map(key => point[key] - el[key])),
      label: labels[i]
    }))
    .sort((a, b) => a.dist - b.dist)
    .slice(0, k);

  return kNearest.reduce(
    (acc, { label }, i) => {
      acc.classCounts[label] =
        Object.keys(acc.classCounts).indexOf(label) !== -1
          ? acc.classCounts[label] + 1
          : 1;
      if (acc.classCounts[label] > acc.topClassCount) {
        acc.topClassCount = acc.classCounts[label];
        acc.topClass = label;
      }
      return acc;
    },
    {
      classCounts: {},
      topClass: kNearest[0].label,
      topClassCount: 0
    }
  ).topClass;
};

//--------------------------------


const data = [[0, 0], [0, 1], [1, 3], [2, 0]];
const labels = [0, 1, 1, 0];

kNearestNeighbors(data, labels, [1, 2], 2); // 1
kNearestNeighbors(data, labels, [1, 0], 2); // 0

//--------------------------------


const kmToMiles = km => km * 0.621371;

//--------------------------------


kmToMiles(8.1) // 5.0331051

//--------------------------------


const last = arr => (arr && arr.length ? arr[arr.length - 1] : undefined);

//--------------------------------


last([1, 2, 3]); // 3
last([]); // undefined
last(null); // undefined
last(undefined); // undefined

//--------------------------------


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const lcm = (...arr) => {
  const gcd = (x, y) => (!y ? x : gcd(y, x % y));
  const _lcm = (x, y) => (x * y) / gcd(x, y);
  return [...arr].reduce((a, b) => _lcm(a, b));
};

//--------------------------------


lcm(12, 7); // 84
lcm(...[1, 3, 4, 5]); // 60

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const linearSearch = (arr, item) => {
  for (const i in arr) {
    if (arr[i] === item) return +i;
  }
  return -1;
};

//--------------------------------


linearSearch([2, 9, 9], 9); // 1
linearSearch([2, 9, 9], 7); // -1

//--------------------------------


const listenOnce = (el, evt, fn) =>
  el.addEventListener(evt, fn, { once: true });

//--------------------------------


listenOnce(
  document.getElementById('my-id'),
  'click',
  () => console.log('Hello world')
); // 'Hello world' will only be logged on the first click

//--------------------------------


const logBase = (n, base) => Math.log(n) / Math.log(base);

//--------------------------------


logBase(10, 10); // 1
logBase(100, 10); // 2

//--------------------------------


const longestItem = (...vals) =>
  vals.reduce((a, x) => (x.length > a.length ? x : a));

//--------------------------------


longestItem('this', 'is', 'a', 'testcase'); // 'testcase'
longestItem(...['a', 'ab', 'abc']); // 'abc'
longestItem(...['a', 'ab', 'abc'], 'abcd'); // 'abcd'
longestItem([1, 2, 3], [1, 2], [1, 2, 3, 4, 5]); // [1, 2, 3, 4, 5]
longestItem([1, 2, 3], 'foobar'); // 'foobar'

//--------------------------------


const lowercaseKeys = obj =>
  Object.keys(obj).reduce((acc, key) => {
    acc[key.toLowerCase()] = obj[key];
    return acc;
  }, {});

//--------------------------------


const myObj = { Name: 'Adam', sUrnAME: 'Smith' };
const myObjLower = lowercaseKeys(myObj); // {name: 'Adam', surname: 'Smith'};

//--------------------------------


const luhnCheck = num => {
  let arr = (num + '')
    .split('')
    .reverse()
    .map(x => parseInt(x));
  let lastDigit = arr.splice(0, 1)[0];
  let sum = arr.reduce(
    (acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9),
    0
  );
  sum += lastDigit;
  return sum % 10 === 0;
};

//--------------------------------


luhnCheck('4485275742308327'); // true
luhnCheck(6011329933655299); //  false
luhnCheck(123456789); // false

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const mapValues = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[k] = fn(obj[k], k, obj);
    return acc;
  }, {});

//--------------------------------


const users = {
  fred: { user: 'fred', age: 40 },
  pebbles: { user: 'pebbles', age: 1 }
};
mapValues(users, u => u.age); // { fred: 40, pebbles: 1 }

//--------------------------------


const mask = (cc, num = 4, mask = '*') =>
  `${cc}`.slice(-num).padStart(`${cc}`.length, mask);

//--------------------------------


mask(1234567890); // '******7890'
mask(1234567890, 3); // '*******890'
mask(1234567890, -4, '$'); // '$$$$567890'

//--------------------------------


const matches = (obj, source) =>
  Object.keys(source).every(
    key => obj.hasOwnProperty(key) && obj[key] === source[key]
  );

//--------------------------------


matches({ age: 25, hair: 'long', beard: true }, { hair: 'long', beard: true });
// true
matches({ hair: 'long', beard: true }, { age: 25, hair: 'long', beard: true });
// false

//--------------------------------


const matchesWith = (obj, source, fn) =>
  Object.keys(source).every(key =>
    obj.hasOwnProperty(key) && fn
      ? fn(obj[key], source[key], key, obj, source)
      : obj[key] == source[key]
  );

//--------------------------------


const isGreeting = val => /^h(?:i|ello)$/.test(val);
matchesWith(
  { greeting: 'hello' },
  { greeting: 'hi' },
  (oV, sV) => isGreeting(oV) && isGreeting(sV)
); // true

//--------------------------------


const maxBy = (arr, fn) =>
  Math.max(...arr.map(typeof fn === 'function' ? fn : val => val[fn]));

//--------------------------------


maxBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], x => x.n); // 8
maxBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n'); // 8

//--------------------------------


const maxDate = (...dates) => new Date(Math.max(...dates));

//--------------------------------


const dates = [
  new Date(2017, 4, 13),
  new Date(2018, 2, 12),
  new Date(2016, 0, 10),
  new Date(2016, 0, 9)
];
maxDate(...dates); // 2018-03-11T22:00:00.000Z

//--------------------------------


const maxN = (arr, n = 1) => [...arr].sort((a, b) => b - a).slice(0, n);

//--------------------------------


maxN([1, 2, 3]); // [3]
maxN([1, 2, 3], 2); // [3, 2]

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const memoize = fn => {
  const cache = new Map();
  const cached = function (val) {
    return cache.has(val)
      ? cache.get(val)
      : cache.set(val, fn.call(this, val)) && cache.get(val);
  };
  cached.cache = cache;
  return cached;
};

//--------------------------------


// See the `anagrams` snippet.
const anagramsCached = memoize(anagrams);
anagramsCached('javascript'); // takes a long time
anagramsCached('javascript'); // returns virtually instantly since it's cached
console.log(anagramsCached.cache); // The cached anagrams map

//--------------------------------


const merge = (...objs) =>
  [...objs].reduce(
    (acc, obj) =>
      Object.keys(obj).reduce((a, k) => {
        acc[k] = acc.hasOwnProperty(k)
          ? [].concat(acc[k]).concat(obj[k])
          : obj[k];
        return acc;
      }, {}),
    {}
  );

//--------------------------------


const object = {
  a: [{ x: 2 }, { y: 4 }],
  b: 1
};
const other = {
  a: { z: 3 },
  b: [2, 3],
  c: 'foo'
};
merge(object, other);
// { a: [ { x: 2 }, { y: 4 }, { z: 3 } ], b: [ 1, 2, 3 ], c: 'foo' }

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const midpoint = ([x1, y1], [x2, y2]) => [(x1 + x2) / 2, (y1 + y2) / 2];

//--------------------------------


midpoint([2, 2], [4, 4]); // [3, 3]
midpoint([4, 4], [6, 6]); // [5, 5]
midpoint([1, 3], [2, 4]); // [1.5, 3.5]

//--------------------------------


const milesToKm = miles => miles * 1.609344;

//--------------------------------


milesToKm(5); // ~8.04672

//--------------------------------


const minBy = (arr, fn) =>
  Math.min(...arr.map(typeof fn === 'function' ? fn : val => val[fn]));

//--------------------------------


minBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], x => x.n); // 2
minBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n'); // 2

//--------------------------------


const minDate = (...dates) => new Date(Math.min(...dates));

//--------------------------------


const dates = [
  new Date(2017, 4, 13),
  new Date(2018, 2, 12),
  new Date(2016, 0, 10),
  new Date(2016, 0, 9)
];
minDate(...dates); // 2016-01-08T22:00:00.000Z

//--------------------------------


const minN = (arr, n = 1) => [...arr].sort((a, b) => a - b).slice(0, n);

//--------------------------------


minN([1, 2, 3]); // [1]
minN([1, 2, 3], 2); // [1, 2]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const mostPerformant = (fns, iterations = 10000) => {
  const times = fns.map(fn => {
    const before = performance.now();
    for (let i = 0; i < iterations; i++) fn();
    return performance.now() - before;
  });
  return times.indexOf(Math.min(...times));
};

//--------------------------------


mostPerformant([
  () => {
    // Loops through the entire array before returning `false`
    [1, 2, 3, 4, 5, 6, 7, 8, 9, '10'].every(el => typeof el === 'number');
  },
  () => {
    // Only needs to reach index `1` before returning `false`
    [1, '2', 3, 4, 5, 6, 7, 8, 9, 10].every(el => typeof el === 'number');
  }
]); // 1

//--------------------------------


const negate = func => (...args) => !func(...args);

//--------------------------------


[1, 2, 3, 4, 5, 6].filter(negate(n => n % 2 === 0)); // [ 1, 3, 5 ]

//--------------------------------


const nest = (items, id = null, link = 'parent_id') =>
  items
    .filter(item => item[link] === id)
    .map(item => ({ ...item, children: nest(items, item.id, link) }));

//--------------------------------


const comments = [
  { id: 1, parent_id: null },
  { id: 2, parent_id: 1 },
  { id: 3, parent_id: 1 },
  { id: 4, parent_id: 2 },
  { id: 5, parent_id: 4 }
];
const nestedComments = nest(comments);
// [{ id: 1, parent_id: null, children: [...] }]

//--------------------------------


const nodeListToArray = nodeList => [...nodeList];

//--------------------------------


nodeListToArray(document.childNodes); // [ <!DOCTYPE html>, html ]

//--------------------------------


const none = (arr, fn = Boolean) => !arr.some(fn);

//--------------------------------


none([0, 1, 3, 0], x => x == 2); // true
none([0, 0, 0]); // true

//--------------------------------


const normalizeLineEndings = (str, normalized = '\r\n') =>
  str.replace(/\r?\n/g, normalized);

//--------------------------------


normalizeLineEndings('This\r\nis a\nmultiline\nstring.\r\n');
// 'This\r\nis a\r\nmultiline\r\nstring.\r\n'
normalizeLineEndings('This\r\nis a\nmultiline\nstring.\r\n', '\n');
// 'This\nis a\nmultiline\nstring.\n'

//--------------------------------


const not = a => !a;

//--------------------------------


not(true); // false
not(false); // true

//--------------------------------


const nthArg = n => (...args) => args.slice(n)[0];

//--------------------------------


const third = nthArg(2);
third(1, 2, 3); // 3
third(1, 2); // undefined
const last = nthArg(-1);
last(1, 2, 3, 4, 5); // 5

//--------------------------------


const nthElement = (arr, n = 0) =>
  (n === -1 ? arr.slice(n) : arr.slice(n, n + 1))[0];

//--------------------------------


nthElement(['a', 'b', 'c'], 1); // 'b'
nthElement(['a', 'b', 'b'], -3); // 'a'

//--------------------------------


const nthRoot = (x, n) => Math.pow(x, 1 / n);

//--------------------------------


nthRoot(32, 5); // 2

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const objectToEntries = obj => Object.keys(obj).map(k => [k, obj[k]]);

//--------------------------------


objectToEntries({ a: 1, b: 2 }); // [ ['a', 1], ['b', 2] ]

//--------------------------------


const objectToPairs = obj => Object.entries(obj);

//--------------------------------


objectToPairs({ a: 1, b: 2 }); // [ ['a', 1], ['b', 2] ]

//--------------------------------


const objectToQueryString = queryParameters => {
  return queryParameters
    ? Object.entries(queryParameters).reduce(
        (queryString, [key, val], index) => {
          const symbol = queryString.length === 0 ? '?' : '&';
          queryString +=
            typeof val === 'string' ? `${symbol}${key}=${val}` : '';
          return queryString;
        },
        ''
      )
    : '';
};

//--------------------------------


objectToQueryString({ page: '1', size: '2kg', key: undefined });
// '?page=1&size=2kg'

//--------------------------------


const observeMutations = (element, callback, options) => {
  const observer = new MutationObserver(mutations =>
    mutations.forEach(m => callback(m))
  );
  observer.observe(
    element,
    Object.assign(
      {
        childList: true,
        attributes: true,
        attributeOldValue: true,
        characterData: true,
        characterDataOldValue: true,
        subtree: true,
      },
      options
    )
  );
  return observer;
};

//--------------------------------


const obs = observeMutations(document, console.log);
// Logs all mutations that happen on the page
obs.disconnect();
// Disconnects the observer and stops logging mutations on the page

//--------------------------------


const off = (el, evt, fn, opts = false) =>
  el.removeEventListener(evt, fn, opts);

//--------------------------------


const fn = () => console.log('!');
document.body.addEventListener('click', fn);
off(document.body, 'click', fn); // no longer logs '!' upon clicking on the page

//--------------------------------


const offset = (arr, offset) => [...arr.slice(offset), ...arr.slice(0, offset)];

//--------------------------------


offset([1, 2, 3, 4, 5], 2); // [3, 4, 5, 1, 2]
offset([1, 2, 3, 4, 5], -2); // [4, 5, 1, 2, 3]

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const on = (el, evt, fn, opts = {}) => {
  const delegatorFn = e =>
    e.target.matches(opts.target) && fn.call(e.target, e);
  el.addEventListener(
    evt,
    opts.target ? delegatorFn : fn,
    opts.options || false
  );
  if (opts.target) return delegatorFn;
};

//--------------------------------


const fn = () => console.log('!');
on(document.body, 'click', fn); // logs '!' upon clicking the body
on(document.body, 'click', fn, { target: 'p' });
// logs '!' upon clicking a `p` element child of the body
on(document.body, 'click', fn, { options: true });
// use capturing instead of bubbling

//--------------------------------


const onClickOutside = (element, callback) => {
  document.addEventListener('click', e => {
    if (!element.contains(e.target)) callback();
  });
};

//--------------------------------


onClickOutside('#my-element', () => console.log('Hello'));
// Will log 'Hello' whenever the user clicks outside of #my-element

//--------------------------------


const onScrollStop = callback => {
  let isScrolling;
  window.addEventListener(
    'scroll',
    e => {
      clearTimeout(isScrolling);
      isScrolling = setTimeout(() => {
        callback();
      }, 150);
    },
    false
  );
};

//--------------------------------


onScrollStop(() => {
  console.log('The user has stopped scrolling');
});

//--------------------------------


const onUserInputChange = callback => {
  let type = 'mouse',
    lastTime = 0;
  const mousemoveHandler = () => {
    const now = performance.now();
    if (now - lastTime < 20)
      (type = 'mouse'),
        callback(type),
        document.removeEventListener('mousemove', mousemoveHandler);
    lastTime = now;
  };
  document.addEventListener('touchstart', () => {
    if (type === 'touch') return;
    (type = 'touch'),
      callback(type),
      document.addEventListener('mousemove', mousemoveHandler);
  });
};

//--------------------------------


onUserInputChange(type => {
  console.log('The user is now using', type, 'as an input method.');
});

//--------------------------------


const once = fn => {
  let called = false;
  return function(...args) {
    if (called) return;
    called = true;
    return fn.apply(this, args);
  };
};

//--------------------------------


const startApp = function(event) {
  console.log(this, event); // document.body, MouseEvent
};
document.body.addEventListener('click', once(startApp));
// only runs `startApp` once upon click

//--------------------------------


const or = (a, b) => a || b;

//--------------------------------


or(true, true); // true
or(true, false); // true
or(false, false); // false

//--------------------------------


const orderBy = (arr, props, orders) =>
  [...arr].sort((a, b) =>
    props.reduce((acc, prop, i) => {
      if (acc === 0) {
        const [p1, p2] =
          orders && orders[i] === 'desc'
            ? [b[prop], a[prop]]
            : [a[prop], b[prop]];
        acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0;
      }
      return acc;
    }, 0)
  );

//--------------------------------


const users = [
  { name: 'fred', age: 48 },
  { name: 'barney', age: 36 },
  { name: 'fred', age: 40 },
];
orderBy(users, ['name', 'age'], ['asc', 'desc']);
// [{name: 'barney', age: 36}, {name: 'fred', age: 48}, {name: 'fred', age: 40}]
orderBy(users, ['name', 'age']);
// [{name: 'barney', age: 36}, {name: 'fred', age: 40}, {name: 'fred', age: 48}]

//--------------------------------


const orderWith = (arr, prop, order) => {
  const orderValues = order.reduce((acc, v, i) => {
    acc[v] = i;
    return acc;
  }, {});
  return [...arr].sort((a, b) => {
    if (orderValues[a[prop]] === undefined) return 1;
    if (orderValues[b[prop]] === undefined) return -1;
    return orderValues[a[prop]] - orderValues[b[prop]];
  });
};

//--------------------------------


const users = [
  { name: 'fred', language: 'Javascript' },
  { name: 'barney', language: 'TypeScript' },
  { name: 'frannie', language: 'Javascript' },
  { name: 'anna', language: 'Java' },
  { name: 'jimmy' },
  { name: 'nicky', language: 'Python' },
];
orderWith(users, 'language', ['Javascript', 'TypeScript', 'Java']);
/* 
[
  { name: 'fred', language: 'Javascript' },
  { name: 'frannie', language: 'Javascript' },
  { name: 'barney', language: 'TypeScript' },
  { name: 'anna', language: 'Java' },
  { name: 'jimmy' },
  { name: 'nicky', language: 'Python' }
]
*/

//--------------------------------


const HSBToRGB = (h, s, b) => {
  s /= 100;
  b /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [255 * f(5), 255 * f(3), 255 * f(1)];
};

//--------------------------------


HSBToRGB(18, 81, 99); // [252.45, 109.31084999999996, 47.965499999999984]

//--------------------------------


const HSLToRGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

//--------------------------------


HSLToRGB(13, 100, 11); // [56.1, 12.155, 0]

//--------------------------------


const RGBToHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};

//--------------------------------


RGBToHSL(45, 23, 11); // [21.17647, 60.71428, 10.98039]

//--------------------------------


const RGBToHex = (r, g, b) =>
  ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');

//--------------------------------


RGBToHex(255, 165, 1); // 'ffa501'

//--------------------------------


const UUIDGeneratorBrowser = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );

//--------------------------------


UUIDGeneratorBrowser(); // '7982fcfe-5721-4632-bede-6000885be57d'

//--------------------------------


const crypto = require('crypto');

const UUIDGeneratorNode = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
  );

//--------------------------------


UUIDGeneratorNode(); // '79c7c136-60ee-40a2-beb2-856f1feabefc'

//--------------------------------


const approximatelyEqual = (v1, v2, epsilon = 0.001) =>
  Math.abs(v1 - v2) < epsilon;

//--------------------------------


approximatelyEqual(Math.PI / 2.0, 1.5708); // true

//--------------------------------


const arithmeticProgression  = (n, lim) =>
  Array.from({ length: Math.ceil(lim / n) }, (_, i) => (i + 1) * n );

//--------------------------------


arithmeticProgression(5, 25); // [5, 10, 15, 20, 25]

//--------------------------------


const arrayToHTMLList = (arr, listID) => 
  document.querySelector(`#${listID}`).innerHTML += arr
    .map(item => `<li>${item}</li>`)
    .join('');

//--------------------------------


arrayToHTMLList(['item 1', 'item 2'], 'myListID');

//--------------------------------


const binomialCoefficient = (n, k) => {
  if (Number.isNaN(n) || Number.isNaN(k)) return NaN;
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  if (k === 1 || k === n - 1) return n;
  if (n - k < k) k = n - k;
  let res = n;
  for (let j = 2; j <= k; j++) res *= (n - j + 1) / j;
  return Math.round(res);
};

//--------------------------------


binomialCoefficient(8, 2); // 28

//--------------------------------


const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight ||
    document.documentElement.clientHeight);

//--------------------------------


bottomVisible(); // true

//--------------------------------


const bubbleSort = arr => {
  let swapped = false;
  const a = [...arr];
  for (let i = 1; i < a.length - 1; i++) {
    swapped = false;
    for (let j = 0; j < a.length - i; j++) {
      if (a[j + 1] < a[j]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    if (!swapped) return a;
  }
  return a;
};

//--------------------------------


bubbleSort([2, 1, 4, 3]); // [1, 2, 3, 4]

//--------------------------------


const bucketSort = (arr, size = 5) => {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const buckets = Array.from(
    { length: Math.floor((max - min) / size) + 1 },
    () => []
  );
  arr.forEach(val => {
    buckets[Math.floor((val - min) / size)].push(val);
  });
  return buckets.reduce((acc, b) => [...acc, ...b.sort((a, b) => a - b)], []);
};

//--------------------------------


bucketSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const capitalizeEveryWord = str =>
  str.replace(/\b[a-z]/g, char => char.toUpperCase());

//--------------------------------


capitalizeEveryWord('hello world!'); // 'Hello World!'

//--------------------------------


const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

//--------------------------------


chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

//--------------------------------


const chunkIntoN = (arr, n) => {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}

//--------------------------------


chunkIntoN([1, 2, 3, 4, 5, 6, 7], 4); // [[1, 2], [3, 4], [5, 6], [7]]

//--------------------------------


const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

//--------------------------------


copyToClipboard('Lorem ipsum'); // 'Lorem ipsum' copied to clipboard.

//--------------------------------


const countOccurrences = (arr, val) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

//--------------------------------


countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3

//--------------------------------


const dayOfYear = date =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

//--------------------------------


dayOfYear(new Date()); // 272

//--------------------------------


const daysAgo = n => {
  let d = new Date();
  d.setDate(d.getDate() - Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysAgo(20); // 2020-09-16 (if current date is 2020-10-06)

//--------------------------------


const daysFromNow = n => {
  let d = new Date();
  d.setDate(d.getDate() + Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysFromNow(5); // 2020-10-13 (if current date is 2020-10-08)

//--------------------------------


const deepFlatten = arr =>
  [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));

//--------------------------------


deepFlatten([1, [2], [[3], 4], 5]); // [1, 2, 3, 4, 5]

//--------------------------------


const defaults = (obj, ...defs) =>
  Object.assign({}, obj, ...defs.reverse(), obj);

//--------------------------------


defaults({ a: 1 }, { b: 2 }, { b: 6 }, { a: 3 }); // { a: 1, b: 2 }

//--------------------------------


const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? 'Mobile'
    : 'Desktop';

//--------------------------------


detectDeviceType(); // 'Mobile' or 'Desktop'

//--------------------------------


const detectLanguage = (defaultLang = 'en-US') => 
  navigator.language ||
  (Array.isArray(navigator.languages) && navigator.languages[0]) ||
  defaultLang;

//--------------------------------


detectLanguage(); // 'nl-NL'

//--------------------------------


const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};

//--------------------------------


difference([1, 2, 3, 3], [1, 2, 4]); // [3, 3]

//--------------------------------


const dropRightWhile = (arr, func) => {
  let rightIndex = arr.length;
  while (rightIndex-- && !func(arr[rightIndex]));
  return arr.slice(0, rightIndex + 1);
};

//--------------------------------


dropRightWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const dropWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
  return arr;
};

//--------------------------------


dropWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const factorial = n =>
  n < 0
    ? (() => {
        throw new TypeError('Negative numbers are not allowed!');
      })()
    : n <= 1
    ? 1
    : n * factorial(n - 1);

//--------------------------------


factorial(6); // 720

//--------------------------------


const fibonacci = n =>
  Array.from({ length: n }).reduce(
    (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
    []
  );

//--------------------------------


fibonacci(6); // [0, 1, 1, 2, 3, 5]

//--------------------------------


const filterNonUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) === arr.lastIndexOf(i));

//--------------------------------


filterNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1, 3, 5]

//--------------------------------


const filterUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) !== arr.lastIndexOf(i));

//--------------------------------


filterUnique([1, 2, 2, 3, 4, 4, 5]); // [2, 4]

//--------------------------------


const flattenObject = (obj, prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}.` : '';
    if (
      typeof obj[k] === 'object' &&
      obj[k] !== null &&
      Object.keys(obj[k]).length > 0
    )
      Object.assign(acc, flattenObject(obj[k], pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});

//--------------------------------


flattenObject({ a: { b: { c: 1 } }, d: 1 }); // { 'a.b.c': 1, d: 1 }

//--------------------------------


const forEachRight = (arr, callback) =>
  arr
    .slice()
    .reverse()
    .forEach(callback);

//--------------------------------


forEachRight([1, 2, 3, 4], val => console.log(val)); // '4', '3', '2', '1'

//--------------------------------


const forOwn = (obj, fn) =>
  Object.keys(obj).forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwn({ foo: 'bar', a: 1 }, v => console.log(v)); // 'bar', 1

//--------------------------------


const forOwnRight = (obj, fn) =>
  Object.keys(obj)
    .reverse()
    .forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwnRight({ foo: 'bar', a: 1 }, v => console.log(v)); // 1, 'bar'

//--------------------------------


const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24);

//--------------------------------


getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')); // 9

//--------------------------------


const getElementsBiggerThanViewport = () => {
  const docWidth = document.documentElement.offsetWidth;
  return [...document.querySelectorAll('*')].filter(
    el => el.offsetWidth > docWidth
  );
};

//--------------------------------


getElementsBiggerThanViewport(); // <div id="ultra-wide-item" />

//--------------------------------


const getMonthsDiffBetweenDates = (dateInitial, dateFinal) =>
  Math.max(
    (dateFinal.getFullYear() - dateInitial.getFullYear()) * 12 +
      dateFinal.getMonth() -
      dateInitial.getMonth(),
    0
  );

//--------------------------------


getMonthsDiffBetweenDates(new Date('2017-12-13'), new Date('2018-04-29')); // 4

//--------------------------------


const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});

//--------------------------------


getScrollPosition(); // {x: 0, y: 200}

//--------------------------------


const getSiblings = el =>
  [...el.parentNode.childNodes].filter(node => node !== el);

//--------------------------------


getSiblings(document.querySelector('head')); // ['body']

//--------------------------------


const getType = v =>
  (v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name);

//--------------------------------


getType(new Set([1, 2, 3])); // 'Set'

//--------------------------------


const getVerticalOffset = el => {
  let offset = el.offsetTop,
    _el = el;
  while (_el.offsetParent) {
    _el = _el.offsetParent;
    offset += _el.offsetTop;
  }
  return offset;
};

//--------------------------------


getVerticalOffset('.my-element'); // 120

//--------------------------------


const hammingDistance = (num1, num2) =>
  ((num1 ^ num2).toString(2).match(/1/g) || '').length;

//--------------------------------


hammingDistance(2, 3); // 1

//--------------------------------


const haveSameContents = (a, b) => {
  for (const v of new Set([...a, ...b]))
    if (a.filter(e => e === v).length !== b.filter(e => e === v).length)
      return false;
  return true;
};

//--------------------------------


haveSameContents([1, 2, 4], [2, 4, 1]); // true

//--------------------------------


const heapsort = arr => {
  const a = [...arr];
  let l = a.length;

  const heapify = (a, i) => {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let max = i;
    if (left < l && a[left] > a[max]) max = left;
    if (right < l && a[right] > a[max]) max = right;
    if (max !== i) {
      [a[max], a[i]] = [a[i], a[max]];
      heapify(a, max);
    }
  };

  for (let i = Math.floor(l / 2); i >= 0; i -= 1) heapify(a, i);
  for (i = a.length - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    l--;
    heapify(a, 0);
  }
  return a;
};

//--------------------------------


heapsort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const initialize2DArray = (w, h, val = null) =>
  Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));

//--------------------------------


initialize2DArray(2, 2, 0); // [[0, 0], [0, 0]]

//--------------------------------


const initializeArrayWithValues = (n, val = 0) =>
  Array.from({ length: n }).fill(val);

//--------------------------------


initializeArrayWithValues(5, 2); // [2, 2, 2, 2, 2]

//--------------------------------


const insertionSort = arr =>
  arr.reduce((acc, x) => {
    if (!acc.length) return [x];
    acc.some((y, j) => {
      if (x <= y) {
        acc.splice(j, 0, x);
        return true;
      }
      if (x > y && j === acc.length - 1) {
        acc.splice(j + 1, 0, x);
        return true;
      }
      return false;
    });
    return acc;
  }, []);

//--------------------------------


insertionSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const intersection = (a, b) => {
  const s = new Set(b);
  return [...new Set(a)].filter(x => s.has(x));
};

//--------------------------------


intersection([1, 2, 3], [4, 3, 2]); // [2, 3]

//--------------------------------


const isAnagram = (str1, str2) => {
  const normalize = str =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, '')
      .split('')
      .sort()
      .join('');
  return normalize(str1) === normalize(str2);
};

//--------------------------------


isAnagram('iceman', 'cinema'); // true

//--------------------------------


const isContainedIn = (a, b) => {
  for (const v of new Set(a)) {
    if (
      !b.some(e => e === v) ||
      a.filter(e => e === v).length > b.filter(e => e === v).length
    )
      return false;
  }
  return true;
};

//--------------------------------


isContainedIn([1, 4], [2, 4, 1]); // true

//--------------------------------


const isLocalStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.localStorage.setItem(key, null);
    window.localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isLocalStorageEnabled(); // true, if loc