import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Meteor } from 'meteor/meteor';
import { MeteorComponent } from 'angular2-meteor';

import { Packs } from '../../../both/collections/packs.collection';
import { Langs } from '../../../both/collections/langs.collection';
import { IPack } from '../../../both/interfaces/pack.interface';
import { ILang } from '../../../both/interfaces/lang.interface';

import template from './packs-form.component.html';

@Component({
  selector: 'packs-form',
  template,
  directives: [REACTIVE_FORM_DIRECTIVES]
})
export class PacksFormComponent extends MeteorComponent implements OnInit {
  addForm: FormGroup;
  langs: Mongo.Cursor<ILang>;
  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.langs = Langs.find();
    this.subscribe('langs', () => {
      this.langs = Langs.find();
    }, true);
    console.log('langs', this.langs);
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      lang: ['', Validators.required]
    });
  }

  resetForm() {
    this.addForm.controls['name']['updateValue']('');
  }

  addPack() {
    if (this.addForm.valid) {
      if (Meteor.userId()) {
        let form: IPack = {
          _id: this.addForm.value.name,
          langs: [this.addForm.value.lang],
          owner: Meteor.userId(),
          public: true,
          translations: []
        };
        Packs.insert(form);

        // XXX will be replaced by this.addForm.reset() in RC5+
        this.resetForm();
      } else {
        alert('Please log in to add a package');
      }
    }
  }
}
