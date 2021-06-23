// Isomorphic pattern, instead of using browser AbortController, and simpler

async function cancellable (controller) {
  for (let x=20;x-->0;) {
    await new Promise(res=>setTimeout(res,100));
    if (controller.cancel) return "cancelled"
  }
  return "finished"
}

let c = {cancel: false}
setTimeout(()=>c.cancel=true,1000);
console.log( await cancellable(c) );