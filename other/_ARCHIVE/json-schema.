const ajv = new require('ajv')();   // npm install ajv
const data = require('./testdata.json');
const schema = require('./json-schema');

let valid = ajv.validate(schema, data);
if (!valid) {
  throw `\nERROR: validating file 'data.json':\n`
  + JSON.stringify(ajv.errors,null,2);
}
