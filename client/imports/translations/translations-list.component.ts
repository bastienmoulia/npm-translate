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
export class TranslationsListComponent extends MeteorComponent implements OnInit{
  packId: string;
  langs: string[];
  translations: any[];
  isAdmin: boolean;
  user: Meteor.User;
  showOnlyMissing: boolean;
  progression: any;
  constructor(private route: ActivatedRoute, private ngZone: NgZone) {
    super();
    this.langs = [];
    this.translations = [];
    this.isAdmin = false;
    this.showOnlyMissing = false;
    this.progression = {};
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
            console.log("packId", this.packId);
            let pack: IPack = Packs.findOne(this.packId);
            console.log("pack", pack);
            if (pack) {
              this.langs = pack.langs;
              this.translations = pack.translations;
              console.log("user", this.user);
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
    this.progression = {};
    const translationsLength = this.translations.length;
    this.langs.forEach((lang) => {
      if (translationsLength > 0) {
        let translationInLang = this.translations.filter((translation) => {
          console.log("translation.langs[lang]", translation.langs[lang]);
          return translation.langs[lang] && translation.langs[lang] !== '';
        });
        console.log("translationInLang", translationInLang);
        this.progression[lang] = Math.round(translationInLang.length / translationsLength * 100);
      } else {
        this.progression[lang] = 0;
      }
      console.log("progression", this.progression);
    });
  }
}