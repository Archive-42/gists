let md = `
# Ragged Jupyter notebook

Some inconsecuential text for the events to come.

## first execution
<server shell {"order":1}>
  dir
</server>

## second execution
<server js {"order":2}>
  // could do a: require('./x.js')
  x2 = a=>a*2;
  x2(3);
</server>

# Tadaa?

Adieu
`;

// captures <server order options>content</server>
let tag = "server";
let re= new RegExp('\<' +tag+ ' (?<type>[^ ]+) (?<options>[^\>]*)\>(?<content>[^\<]*)\<\/' +tag+ '\>');
let expTextAll = md.match(new RegExp(re,'g'));
let expObjAll=[];
expTextAll.forEach(expText=>{
  //console.log('\n---\n',expText)
  let expParsed = expText.match(new RegExp(re))
  expParsed.groups.options = JSON.parse(expParsed.groups.options||'{}')
  expObjAll.push({matchedText:expParsed[0] , ...expParsed.groups});
})


console.log(expObjAll);
/*
[
  {
    matchedText: '<server shell {"order":1}>\n  dir\n</server>',
    type: 'shell',
    options: { order: 1 },
    content: '\n  dir\n'
  },
  {
    matchedText: '<server js {"order":2}>\n' +
      "  // could do a: require('./x.js')\n" +
      '  x2 = a=>a*2;\n' +
      '  x2(3);\n' +
      '</server>',
    type: 'js',
    options: { order: 2 },
    content: "\n  // could do a: require('./x.js')\n  x2 = a=>a*2;\n  x2(3);\n"
  }
]
*/

expObjAll.forEach(cmd=>{
  let result
  switch (cmd.type) {
    case 'shell':
      result = 'exec ' + cmd.content.trim();
      break;
    case 'javascript':
    case 'js':
      result = eval(cmd.content);
      break;
    default:
      throw new Error(`unknown command type ${cmd.type} in ${cmd.matchedText}`);
  }
  md = md.replace(cmd.matchedText, result)
})


console.log(md)

/*
# Ragged Jupyter notebook

Some inconsecuential text for the events to come.

## first execution
exec dir

## second execution
6

# Tadaa?

Adieu
*/