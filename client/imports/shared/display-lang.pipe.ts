import { Pipe } from '@angular/core';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { MeteorComponent } from 'angular2-meteor';

import { Langs } from '../../../both/collections/langs.collection';
import { ILang } from '../../../both/interfaces/lang.interface';

@Pipe({
  name: 'displayLang'
})
export class DisplayLangPipe extends MeteorComponent{
  constructor() {
    super();
  }

  transform(langId: string): any {
    //console.log("langId", langId);
    return langId; // TODO
    /*this.subscribe('langs', () => {
      console.log("subscribe");
      const lang: ILang = Langs.findOne({ _id: langId });
      console.log("lang", lang);
      if (lang) {
        return lang.name;
      } else {
        return langId;
      }
    }, true);*/
  }
}