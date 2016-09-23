import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Mongo } from 'meteor/mongo';
import { LoginButtons, InjectUser } from 'angular2-meteor-accounts-ui';
import { MeteorComponent } from 'angular2-meteor';

import { Packs }   from '../../../both/collections/packs.collection';
import { IPack } from '../../../both/interfaces/pack.interface';
import { PacksFormComponent } from './packs-form.component';

import template from './packs-list.component.html';

@Component({
  selector: 'packs-list',
  template,
  directives: [PacksFormComponent, ROUTER_DIRECTIVES, LoginButtons]
})
@InjectUser('user')
export class PacksListComponent extends MeteorComponent implements OnInit {
  packs: Mongo.Cursor<IPack>;
  packsFiltered: IPack[];
  user: Meteor.User;
  filter: string;
  constructor() {
    super();
    this.filter = '';
  }

  ngOnInit() {
    this.packs = Packs.find();
    this.subscribe('packs', () => {
      this.packs = Packs.find();
      this.updateFilter();
    }, true);
  }

  updateFilter() {
    this.packsFiltered = [];
    this.packs.forEach((pack) => {
      console.log("updateFilter", pack);
      if (pack._id.indexOf(this.filter) !== -1) {
        this.packsFiltered.push(pack);
      }
    });
  }
}
