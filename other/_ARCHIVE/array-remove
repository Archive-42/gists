let items = ['a','c','a','b'];

// -- shortest
[...new Set(items)]

// -- also
Array.from(new Set(items))

// -- filter
items.filter((e,i)=>items.indexOf(e)>=i);

// -- reduce
Object.keys(items.reduce((a,c)=>({...a,[c]:1}),{}))