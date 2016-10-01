import {Mongo} from 'meteor/mongo';

import {ILang} from '../interfaces/lang.interface';

export const Langs: Mongo.Collection<ILang> = new Mongo.Collection<ILang>('langs');
