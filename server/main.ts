import {loadPacks} from './imports/fixtures/packs';
import {loadLangs} from './imports/fixtures/langs';
import {Meteor} from 'meteor/meteor';

import './imports/publications/langs';
import './imports/publications/packs';


Meteor.startup(() => {
  // load initial
  // loadPacks();
  loadLangs();
});