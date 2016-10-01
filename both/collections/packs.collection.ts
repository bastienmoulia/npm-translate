import {Mongo} from 'meteor/mongo';

import {IPack} from '../interfaces/pack.interface';

export const Packs: Mongo.Collection<IPack> = new Mongo.Collection<IPack>('packs');

function loggedIn() {
  return !!Meteor.user();
}

function updateAvailable(userId, doc, fieldNames, modifier) {
  if (!Meteor.user()) {
    return false;
  }
  if (userId === doc.owner) {
    return true;
  }
  if (modifier.$set && modifier.$set.translations) {
    return true;
  }
  return false;
}

Packs.allow({
  insert: loggedIn,
  update: updateAvailable
});
