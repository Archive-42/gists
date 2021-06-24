// selfcontained pattern
function createCancellable () {
  let cancelled = false;
  return {
    cancel() {cancelled=true; console.log('cancel!')},
    async run() {
      for (let x=20;x-->0;) {
        await new Promise(res=>setTimeout(res,100));
        if (cancelled) return "cancelled"
      }
      return "finished"
    }
  }
}

let a = createCancellable();
setTimeout(a.cancel, 1000);
console.log( await a.run());
a.cancel()