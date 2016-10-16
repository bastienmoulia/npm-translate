import { Packs } from '../../../both/collections/packs.collection';
import { Pack } from '../../../both/models/pack.model';

export function loadPacks() {
  if (Packs.find({}).cursor.count() === 0) {
    const packs: Pack[] = [
      {
        _id: 'test',
        langs: ['en', 'fr'],
        public: true,
        translations: [
          {
            'key': 'MY_KEY',
            'langs': {
              'en': 'My key',
              'fr': 'Ma clé'
            },
          }
        ]
      }
    ];

    packs.forEach((pack) => Packs.insert(pack));
  }
}