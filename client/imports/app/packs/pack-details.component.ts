import { Component, NgZone, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tracker } from 'meteor/tracker';
import { MeteorComponent } from 'angular2-meteor';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import { Observable } from 'rxjs/Observable';

import { Packs } from '../../../../both/collections/packs.collection';
import { Pack } from '../../../../both/models/pack.model';
import { ENV } from '../../../../both/env';

import template from './pack-details.component.html';

@Component({
  selector: 'pack-details',
  template,
  providers: [ENV]
})
@InjectUser('user')
export class PackDetailsComponent extends MeteorComponent implements OnInit {
  packId: string;
  pack: Pack;
  isAdmin: boolean;
  user: Meteor.User;
  scope: string;

  constructor(private route: ActivatedRoute, private ngZone: NgZone, private env: ENV) {
    super();
    this.isAdmin = false;
    this.scope = env.scope;
  }

  ngOnInit() {
    this.route.params
      .map(params => params['packId'])
      .subscribe(packId => {
        this.packId = packId;
        this.pack = Packs.findOne(this.packId);
        this.subscribe('packs', () => {
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
}
