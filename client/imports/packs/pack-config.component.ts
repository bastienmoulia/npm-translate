import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { Tracker } from 'meteor/tracker';
import { MeteorComponent } from 'angular2-meteor';
import { InjectUser } from 'angular2-meteor-accounts-ui';

import { Packs } from '../../../both/collections/packs.collection';
import { IPack } from '../../../both/interfaces/pack.interface';
import { DisplayLangPipe } from '../shared/display-lang.pipe';

import template from './pack-config.component.html';

@Component({
  selector: 'pack-config',
  template,
  directives: [ROUTER_DIRECTIVES],
  pipes: [DisplayLangPipe]
})
@InjectUser('user')
export class PackConfigComponent extends MeteorComponent implements OnInit {
  packId: string;
  pack: IPack;
  user: Meteor.User;
  constructor(private route: ActivatedRoute, private ngZone: NgZone) {
    super();
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
            }, true);
          });
        });
      });
  }

  publish() {
    Meteor.call('publish', this.packId, (err, response) => {
      console.log("publish", err, response);
    });
  }
}