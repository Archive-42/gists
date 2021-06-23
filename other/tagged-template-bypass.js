/*
minimum tagged template function that just returns the string
*/
function (strings, ...vars) {
  // reduce without second parameter makes first cycle to fill acc with [0] and curr with [1]
  return strings.raw.reduce( (acc,curr) => acc + vars.shift() + curr); 
}

// one liner, e.g. to trick css-in-js vscode plugins
let css = (s,...v)=>s.raw.reduce((a,c)=>a+v.shift()+c);

// example
css`one ${'two'} three`; // "one two three"