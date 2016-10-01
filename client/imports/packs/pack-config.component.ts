import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, ROUTER_DIRECTIVES, CanActivate } from '@angular/router';
import { Tracker } from 'meteor/tracker';
import { MeteorComponent } from 'angular2-meteor';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Packs } from '../../../both/collections/packs.collection';
import { IPack } from '../../../both/interfaces/pack.interface';
import { DisplayLangPipe } from '../shared/display-lang.pipe';
import { Langs } from '../../../both/collections/langs.collection';
import { ILang } from '../../../both/interfaces/lang.interface';

import template from './pack-config.component.html';

@Component({
  selector: 'pack-config',
  template,
  directives: [ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
  pipes: [DisplayLangPipe]
})
@InjectUser('user')
export class PackConfigComponent extends MeteorComponent implements OnInit, CanActivate {
  packId: string;
  pack: IPack;
  user: Meteor.User;
  langs: Mongo.Cursor<ILang>;
  addLangForm: FormGroup;
  constructor(private route: ActivatedRoute, private ngZone: NgZone, private formBuilder: FormBuilder) {
    super();
  }

  canActivate() {
    console.log('this.pack.owner', this.pack.owner);
    console.log('this.user._id', this.user._id);
    return (this.pack && this.pack.owner === this.user._id);
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
    this.langs = Langs.find();
    this.subscribe('langs', () => {
      this.langs = Langs.find();
    }, true);
    this.addLangForm = this.formBuilder.group({
      lang: ['', Validators.required]
    });
    // TODO ne pas afficher les langues déjà choisies
  }

  delete(lang: string) {
    if (confirm('Are you sure to delete all translations in ' + lang + ' ?')) {
      this.pack.langs.splice(this.pack.langs.indexOf(lang), 1);
      Packs.update(this.packId, {
        $set: {langs: this.pack.langs }
      });
    }
  }

  addLang() {
    let lang: string = this.addLangForm.value.lang;
    if (this.pack.langs.indexOf(lang) === -1 && lang !== '') {
      this.pack.langs.push(lang);
      Packs.update(this.packId, {
        $set: {langs: this.pack.langs }
      });
    }
  }
}
