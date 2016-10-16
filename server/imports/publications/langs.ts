import {Langs} from '../../../both/collections/langs.collection';
import {Meteor} from 'meteor/meteor';

Meteor.publish('langs', () => Langs.find());