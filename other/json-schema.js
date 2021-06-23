const validApps = ["mobile","web"];
const validGroups = ["grpAdmin","grpUser"];
const validAuthentication = ["none","own","ldap", "github","google"];

module.exports = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    apps : {
      "type": "object",
      "patternProperties": {
        [`^(${validApps.join('|')})$`] : {}
      },
      "additionalProperties": false,  // important for validaapps only

    },
    origins : {
      "type": "object"
    },
    users: {
      "type": "object",
      "patternProperties": {
        "^.+$": {             // userId
          "type": "object",
          "properties" : {
            name : {type: "string"},
            email : {type: "string", pattern: "^.+@.+\..+"},
            authorizedApps : {
              "type" : "array",
              "items" : {
                "type" : "string",
                "enum" : validApps
              }
            },
            authentication : {
              "type": "string",
              "enum": validAuthentication
            },
            groups : {
              "type" : "array",
              "items": {
                "type": "string",
                "enum" : validGroups,
              }
            },
            passwordHash : {type:"string"}
          }, // userId properties
          "required" : ["name","email","authorizedApps","authentication","groups"],
          "additionalProperties": false
        } // one user
      },
      //"additionalProperties": false
    } // users

  }, // main properties
  "required": [ "apps", "users", "origins" ],
  "additionalProperties": false,
  // "definitions": {
  //   "int": { "type": "integer" },   // usage: "foo": { "$ref": "#/definitions/int" },
  // }
}