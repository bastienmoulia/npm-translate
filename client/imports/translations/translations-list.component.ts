import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import { MeteorComponent } from 'angular2-meteor';

// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';

import { Packs } from '../../../both/collections/packs.collection';
import { IPack } from '../../../both/interfaces/pack.interface';
import { TranslationsFormComponent } from './translations-form.component';
import { DisplayLangPipe } from '../shared/display-lang.pipe';

import template from './translations-list.component.html';

@Component({
  selector: 'translations-list',
  template,
  directives: [TranslationsFormComponent],
  pipes: [DisplayLangPipe]
})
@InjectUser('user')
export class TranslationsListComponent extends MeteorComponent implements OnInit {
  packId: string;
  langs: any[];
  translations: any[];
  isAdmin: boolean;
  user: Meteor.User;
  showOnlyMissing: boolean;
  constructor(private route: ActivatedRoute, private ngZone: NgZone) {
    super();
    this.langs = [];
    this.translations = [];
    this.isAdmin = false;
    this.showOnlyMissing = false;
    /*this.translations.valueChanges
      // only recompute when the user stops typing for 400ms
      .debounceTime(400)
      // only recompute if the new value is different than the last
      .distinctUntilChanged()
      .subscribe((newTranslation) => {
        console.log('new translations', newTranslation);
      });*/
  }

  ngOnInit() {
    this.route.params
      .map(params => params['packId'])
      .subscribe(packId => {
        this.packId = packId;
        Tracker.autorun(() => {
          this.ngZone.run(() => {
            console.log('packId', this.packId);
            let pack: IPack = Packs.findOne(this.packId);
            console.log('pack', pack);
            if (pack) {
              pack.langs.forEach((lang) => {
                this.langs.push({
                  id: lang,
                  isDisplay: true
                });
              });
              this.translations = pack.translations;
              console.log('user', this.user);
              if (this.user && this.user._id === pack.owner) {
                this.isAdmin = true;
              }
              this.updateProgression();
            }
          });
        });
      });
  }

  save() {
    if (Meteor.userId()) {
      Packs.update(this.packId, {
        $set: {translations: this.translations }
      });
    } else {
      alert('Please log in to edit a translation');
    }
  }

  delete(translation) {
    this.translations.splice(this.translations.indexOf(translation), 1);
    if (Meteor.userId()) {
      Packs.update(this.packId, {
        $set: {translations: this.translations }
      });
    } else {
      alert('Please log in to delete a translation');
    }
  }

  updateProgression() {
    const translationsLength: number = this.translations.length;
    this.langs.forEach((lang) => {
      if (translationsLength > 0) {
        let translationInLang: any[] = this.translations.filter((translation) => {
          console.log('translation.langs[lang]', translation.langs[lang.id]);
          return translation.langs[lang.id] && translation.langs[lang.id] !== '';
        });
        console.log('translationInLang', translationInLang);
        lang.progression = Math.round(translationInLang.length / translationsLength * 100);
      } else {
        lang.progression = 0;
      }
    });
  }
}
