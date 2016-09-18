import { Langs } from '../../../both/collections/langs.collection';
import { ILang } from '../../../both/interfaces/lang.interface';

export function loadLangs() {
  if (Langs.find().count() === 0) {
    const langs: ILang[] = [
      {
        name: 'English',
        _id: 'en'
      },
      {
        name: 'Français',
        _id: 'fr'
      }
    ];

    langs.forEach((lang) => Langs.insert(lang));
  }
}