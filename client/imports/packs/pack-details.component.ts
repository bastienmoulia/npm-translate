import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { Tracker } from 'meteor/tracker';
import { MeteorComponent } from 'angular2-meteor';
import { InjectUser } from 'angular2-meteor-accounts-ui';

import { Packs } from '../../../both/collections/packs.collection';
import { TranslationsListComponent } from '../translations/translations-list.component';
import { IPack } from '../../../both/interfaces/pack.interface';
import { ENV } from '../../../both/env';

import template from './pack-details.component.html';

@Component({
  selector: 'pack-details',
  template,
  directives: [ROUTER_DIRECTIVES, TranslationsListComponent]
})
@InjectUser('user')
export class PackDetailsComponent extends MeteorComponent implements OnInit {
  packId: string;
  pack: IPack;
  isAdmin: boolean;
  user: Meteor.User;
  scope: string;
  constructor(private route: ActivatedRoute, private ngZone: NgZone) {
    super();
    this.isAdmin = false;
    this.scope = '@todo'; // ENV.scope;
  }

  ngOnInit() {
    this.route.params
      .map(params => params['packId'])
      .subscribe(packId => {
        this.packId = packId;
        Tracker.autorun(() => {
          this.ngZone.run(() => {
            this.pack = Packs.findOne(this.packId);
            this.subscribe('packs', () => {
              this.pack = Packs.findOne(this.packId);
              if (this.user && this.user._id === this.pack.owner) {
                this.isAdmin = true;
              }
            }, true);
          });
        });
      });
  }

  publish() {
    Meteor.call('publish', this.packId, (err, response) => {
      console.log('publish', err, response);
    });
  }
}
