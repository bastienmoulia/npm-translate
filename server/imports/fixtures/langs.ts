import { Langs } from '../../../both/collections/langs.collection';
import { ILang } from '../../../both/interfaces/lang.interface';

export function loadLangs() {
  if (Langs.find().count() === 0) {
    const langs: ILang[] = [
      {
        name: 'English',
        key: 'en'
      },
      {
        name: 'Français',
        key: 'fr'
      }
    ];

    langs.forEach((lang) => Langs.insert(lang));
  }
}