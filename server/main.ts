import {loadLangs} from './imports/fixtures/langs';

import {Meteor} from 'meteor/meteor';

import './imports/publications/langs';
import './imports/publications/packs';

Meteor.startup(() => {
  loadLangs();
});
