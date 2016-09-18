import { Packs } from '../../../both/collections/packs.collection';
import { IPack } from '../../../both/interfaces/pack.interface';

export function loadPacks() {
  if (Packs.find().count() === 0) {
    const packs: IPack[] = [
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