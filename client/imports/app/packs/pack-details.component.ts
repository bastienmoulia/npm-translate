import { Component, NgZone, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { MeteorComponent } from 'angular2-meteor';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MdIconRegistry } from '@angular/material';


import { Packs } from '../../../../both/collections/packs.collection';
import { Pack } from '../../../../both/models/pack.model';
import { ENV } from '../../../../both/env';

import template from './pack-details.component.html';

@Component({
  selector: 'pack-details',
  template,
  providers: [ENV, MdIconRegistry]
})
@InjectUser('user')
export class PackDetailsComponent extends MeteorComponent implements OnInit, OnDestroy {
  packId: string;
  paramsSub: Subscription;
  pack: Pack;
  packSub: Subscription;
  isAdmin: boolean;
  user: Meteor.User;
  scope: string;

  constructor(private route: ActivatedRoute, private ngZone: NgZone, private env: ENV) {
    super();
    this.isAdmin = false;
    this.scope = env.scope;
  }

  ngOnInit() {
    this.paramsSub = this.route.params
      .map(params => params['packId'])
      .subscribe(packId => {
        this.packId = packId;
        if (this.packSub) {
          this.packSub.unsubscribe();
        }
        this.packSub = this.subscribe('packs', () => {
          this.pack = Packs.findOne(this.packId);
          if (this.user && this.user._id === this.pack.owner) {
            this.isAdmin = true;
          }
        });
      });
  }

  publish() {
    Meteor.call('publish', this.packId, (err, response) => {
      console.log('publish', err, response);
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe;
    this.packSub.unsubscribe;
  }
}
