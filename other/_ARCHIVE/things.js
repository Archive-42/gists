import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";
import SimpleSchema from "simpl-schema";
// import Collections2 from 'collection2';

export const Things = new Mongo.Collection("things");
const schema = new SimpleSchema({
  owner: { type: String, regEx: SimpleSchema.RegEx.Id, optional: false },
  name: { type: String },
  url: { type: String, regEx: SimpleSchema.RegEx.Url, optional: false },
  text: { type: Number, optional: false },
  createdAt: { type: Date },
  analyzed: { type: Boolean, defaultValue: false },
  username: { type: String, optional: false },
});

Things.attachSchema = schema;

Meteor.methods({
  "things.insert"(thing) {
    // check(thing.text, String);
    // check(thing.url, String);

    // Make sure the user is logged in before inserting a thing
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Things.insert({
      text: thing.text,
      url: thing.url,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },
  "things.remove"(thingId) {
    check(thingId, String);
    Things.remove(thingId);
  },
  "things.setChecked"(thingId, setChecked) {
    check(thingId, String);
    check(setChecked, Boolean);

    Things.update(thingId, { $set: { checked: setChecked } });
  },
});
