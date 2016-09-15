import {Packs} from '../../../both/collections/packs.collection';
import {Meteor} from 'meteor/meteor';
 
Meteor.publish('packs', () => Packs.find());