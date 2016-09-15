import {Mongo} from 'meteor/mongo';

import {ILang} from '../interfaces/lang.interface';

export const Langs = new Mongo.Collection<ILang>('langs');