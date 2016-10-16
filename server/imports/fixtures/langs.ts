import { Langs } from '../../../both/collections/langs.collection';
import { Lang } from '../../../both/models/lang.model';
import { ENV } from '../../../both/env';


export function loadLangs() {
  if (Langs.find({}).cursor.count() === 0) {
    const env: ENV = new(ENV);
    console.log("loadLangs", env.langs);
    env.langs.forEach((lang: Lang) => Langs.insert(lang));
  }
}
