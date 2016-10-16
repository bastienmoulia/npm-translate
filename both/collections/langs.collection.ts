import { MongoObservable } from 'meteor-rxjs';

import { Lang } from '../models/lang.model';

export const Langs = new MongoObservable.Collection<Lang>('langs');
