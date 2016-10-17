import { Component, OnInit, OnDestroy } from '@angular/core';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import { Meteor } from 'meteor/meteor';
import { MeteorComponent } from 'angular2-meteor';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Packs } from '../../../../both/collections/packs.collection';
import { Pack } from '../../../../both/models/pack.model';

import template from './packs-list.component.html';

@Component({
  selector: 'packs-list',
  template
})
@InjectUser('user')
export class PacksListComponent extends MeteorComponent implements OnInit, OnDestroy {
  packs: Observable<Pack[]>;
  packsSub: Subscription;
  packsFiltered: Pack[];
  user: Meteor.User;
  filter: string;
  constructor() {
    super();
    this.filter = '';
    this.packsFiltered = [];
  }

  ngOnInit() {
    this.packsSub = MeteorObservable.subscribe('packs').subscribe(() => {
      this.packs = Packs.find({});
      this.packs.subscribe((packs) => {
        this.updateFilter(packs);
        this.updateProgression();
      });
    });
  }

  updateFilter(packs) {
    this.packsFiltered = [];
    packs.forEach((pack: Pack) => {
      console.log('updateFilter', pack);
      if (pack._id.indexOf(this.filter) !== -1) {
        this.packsFiltered.push(pack);
      }
    });
  }

  updateProgression() {
    this.packsFiltered.forEach((pack: Pack) => {
      const totalTranslations: number = pack.translations.length * pack.langs.length;
      if (totalTranslations > 0) {
        let translationDone: number = 0;
        pack.translations.forEach((translation) => {
          pack.langs.forEach((lang) => {
            if (translation.langs[lang] && translation.langs[lang] !== '') {
              translationDone += 1;
            }
          });
        });
        pack.progression = translationDone / totalTranslations;
      } else {
        pack.progression = 0;
      }
    });
  }

  ngOnDestroy() {
    this.packsSub.unsubscribe;
  }
}
