Nodejs worker threads
=====================

Proper concurrency in nodejs: "getting golang goroutines in node"

-   For CPU consuming sync tasks (not IO), similar to spawn but with
    less costs and posibility to share memory
-   Not for shared http/websockets (use cluster or spawn for that)
-   https://nodejs.org/api/worker\_threads.html

Using **microjob** library
--------------------------

-   Launch 4 fibonacci sync processes in parallel
-   Cool thing: you pass a function, not .js file, so basically you kind
    of have **go coroutines** syntax in nodejs
-   https://github.com/wilk/microjob

::: {#cb1 .sourceCode}
``` {.sourceCode .js}
function workFib (num) {
  
  function fibRec(nRec) {
    if (nRec <= 1) {
      return nRec
    }
    return fibRec(nRec-1) + fibRec(nRec-2)
  }
  
  let result = fibRec(num)
  return result;
}


const workLoop = (data) => {
  let i = 0;
  console.log('starting data 1', data)
  console.log('starting data 2', data)
  console.log('starting data 3', data)
  for (i = 0; i < data; i++) {
    // heavy CPU load ...
    
  }

  return i;
}


let work = workFib;

(async () => {
  const { job, start, stop } = require("microjob");
  
  try {
    // start the worker pool
    await start();
 
    let results 
    let startTime = Date.now();

    // work(2000000000); // approx 1 second 
    // work(2000000000); // approx 1 second 

    let count = 0
    let jobs = []
    jobs.push( job(work, {data: 45} ) );
    jobs.push( job(work, {data: 45} ) );
    jobs.push( job(work, {data: 45} ) );
    jobs.push( job(work, {data: 45} ) );


    console.log('jobs sent');
    results = await Promise.all(jobs)

    console.log(`jobs done in ${Date.now()-startTime}`, results) 
    console.log('count', count)
    
  } catch (err) {  console.error(err);  } 
  finally {  await stop();  } // shutdown worker pool


})();
```
:::

My own naive approach
---------------------

-   My first attempt to grasp the concepts

### createThreadedJobQueue.js

::: {#cb2 .sourceCode}
``` {.sourceCode .js}
/*
  TODO: auto restart worker on crash
*/
module.exports = function createThreadedJobQueue (workerFile, numWorkers) {

  const { Worker } = require('worker_threads');
  const numCPUs = require('os').cpus().length;

  let workersReg = []  // workers/threads registry [{id:index, worker, on:boolean, busy:boolean}]
  // input jobs queue
  let jobs = []
  let jobsClosed = false;
  let jobDoneCallback

  numWorkers = numWorkers || numCPUs

  
  // pick first non-busy workerReg
  let pickWorkerReg = () => {
    for (let workerReg of workersReg) {
      if (!workerReg.busy) {return workerReg;}
    }
  }

  // returns number of busy workers
  let workersBusy = () => {
    let count = 0
    for (let workerReg of workersReg) {
      if (workerReg.busy) {count++;}
    }
    return count;
  }


  function onWorkerEvent(ev) {
    console.log('message from worker:', ev.workerId, 'event:', ev.type, 'value:', ev.props)
    if (ev.type === 'message') {
      // save result
      jobDoneCallback(ev.props);

      // assign a new job to 
      let workerReg = workersReg[ev.workerId]
      workerReg.busy=false;
      assignNextJob()

      // all done?
      if (jobsClosed && workersBusy() === 0) {
        console.log('All jobs closed and done')
        closeWorkers();
        jobDoneCallback({end:true})
        //process.exit(0);
      }

    }
    
  }

  function createWorker(workerId, onWorkerEvent) {
    let worker = new Worker(workerFile, {
      workerData:{ workerId },
      //synchronizedStdio: false
    });

    // parentPort.postMessage()
    worker.on('message', (props)=>onWorkerEvent({workerId, type:'message', props:props}));
    worker.on('error', (err)=>onWorkerEvent({workerId, type:'error', props:err}));
    worker.on('exit', (code)=>onWorkerEvent({workerId, type:'exit', props:code}));
    
    return worker;
  }

  function closeWorkers () {
    workersReg.forEach(wr=>{wr.worker.unref()})
  }

  function assignNextJob() {
    let workerReg = pickWorkerReg();
    if (!workerReg) return;
    let job = jobs.shift();
    if (!job) return;
    console.log('assigning', job.type, job.props, 'to worker', workerReg.workerId);
    workerReg.busy = true; 
    workerReg.worker.postMessage(job);
  }

  // create all workers
  for (let workerId=0; workerId < numWorkers; workerId++) {
    let worker = createWorker(workerId, onWorkerEvent);
    workersReg.push({workerId, on:true, busy:false, worker: worker });
  }

  // -- return
  let queueInterface = {
    push(requestedJob) { 
      let requestedJobs = Array.isArray(requestedJob) ? requestedJob : [requestedJob]
      for (let rj of requestedJobs) {
        jobs.push(rj) 
        assignNextJob()
      }
    },

    close() { 
      jobsClosed = true 
    },

    onJobDone(cb)  {
      jobDoneCallback = cb
    }// callback for results, etc
  }
  return queueInterface;
}
```
:::

### thread-worker.js

::: {#cb3 .sourceCode}
``` {.sourceCode .js}
const { parentPort, workerData } = require('worker_threads');

function fib (num) {
  
  function fibRec(nRec) {
    if (nRec <= 1) {
      return nRec
    }
    return fibRec(nRec-1) + fibRec(nRec-2)
  }
  
  //console.log('- starting fib', num);
  let result = fibRec(num)
  return result;
}

parentPort.on("message",msg=>{  // {job:'fib', props:, result:}
  parentPort.postMessage({...msg, result: fib(msg.props)});
})
```
:::

### thread-main.js

::: {#cb4 .sourceCode}
``` {.sourceCode .js}
let createThreadedJobQueue = require('./createThreadedJobQueue');

const path = require('path');
let jobsQueue = createThreadedJobQueue(path.join(__dirname, 'thread-worker.js'));

let startTime = Date.now()
jobsQueue.onJobDone(ev=>{
  console.log(`• ${Date.now()-startTime} job done`, ev)

}, 4)

jobsQueue.push([
  {id:0, type:'fib', props:42},
  {id:1, type:'fib', props:42},
  {id:2, type:'fib', props:42},
  {id:3, type:'fib', props:42},
])
jobsQueue.close();

console.log('jobs requested')


//mainThread().catch(e=>{console.log(e);process.exit(1)});
```
:::

Somehow related
---------------

-   threads: works both in browser (web workers) and node (worker
    threads) with the same interface
    -   https://github.com/andywer/threads.js
-   parallel-js: uses spawn instead of workers, but works in browser
    with web workers as well
    -   https://github.com/wilk/microjob
