## nodejs weirdness ahead

https://itnext.io/error-handling-with-async-await-in-js-26c3f20bc06a

## TL;DR: 

To prevent throw's inside async's exiting with code 0 despite the error, **ALWAYS** call the top level async function this way:

```
async function start () { ... };
start().catch(e=>{console.log(e);process.exit(1);})
// note that try-catch wont work here, must use .catch (see explanation bellow)
```
or
```
;(async ()=>{
  // your code here
})().catch(e=>{console.log(e);process.exit(1);})
```

### async throw exits with code 0 (no error)
```
async function thrower() { throw new Error('async throw') }
thrower();
// shows stack trace as expected + some unhandled promise warning... but who cares, right? WRONG!, because:
// exit code: 0   <- echo $?  or  echo %errorlevel%
// with 'node --no-warnings', exit code still 0, but also no stack trace !!!???
```

### try catch does nothing

```
try {
  thrower();
} catch (e) {console.log("catched?... NO!")}
// still unhandled warning and exit code0
```

### SOLUTION 1: but .catch() does
```
thrower().catch(e=>console.log("catched this time", e); process.exit(1););
```

### explanation

the **.catch()** catches the 'reject' of the promise AND any throw inside an async function is considered a "reject", not a standard throw... ???, hence the catch of the try catches nothing, but the .catch does.

In fact doing **return Promise.reject()** behaves in the same manner of **throw new Error('')**

### SOLUTION 2: but I see try catch with await all the time in everyone's code!!!

Right, because it works **when the try-catch is inside an async fuction itself**

```
;(async ()=>{

  try {
    await thrower();
  } catch (e) {console.log("catched!!",e); process.exit(1)}

})();
```