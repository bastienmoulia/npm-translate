import { MongoObservable } from 'meteor-rxjs';

import { Pack } from '../models/pack.model';

export const Packs = new MongoObservable.Collection<Pack>('packs');

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
