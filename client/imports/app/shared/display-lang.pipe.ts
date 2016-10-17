import { Pipe, PipeTransform } from '@angular/core';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { MeteorComponent } from 'angular2-meteor';
import { Observable } from 'rxjs/Observable';
import { MeteorObservable } from 'meteor-rxjs';

import { Langs } from '../../../../both/collections/langs.collection';
import { Lang } from '../../../../both/models/lang.model';

@Pipe({
  name: 'displayLang'
})
export class DisplayLangPipe extends MeteorComponent implements PipeTransform {
  constructor() {
    super();
  }

  transform(langId: string): any {
    let langName = new Observable((observer) => {
      MeteorObservable.subscribe('langs').subscribe(() => {
        let lang = Langs.findOne({ _id: langId });
        if (lang) {
          observer.next(lang.name);
        } else {
          observer.next(langId);
        }
        observer.complete();
      });
    });
    return langName;
  }
}
