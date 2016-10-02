import { Langs } from '../../../both/collections/langs.collection';
import { ILang } from '../../../both/interfaces/lang.interface';
import { ENV } from '../../../both/env';


export function loadLangs() {
  if (Langs.find().count() === 0) {
    const env: ENV = new(ENV);
    env.langs.forEach((lang: ILang) => Langs.insert(lang));
  }
}
