import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Meteor } from 'meteor/meteor';
import { MeteorComponent } from 'angular2-meteor';
import { Observable } from 'rxjs/Observable';
import { MdUniqueSelectionDispatcher } from '@angular/material';

import { Packs } from '../../../../both/collections/packs.collection';
import { Langs } from '../../../../both/collections/langs.collection';
import { Pack } from '../../../../both/models/pack.model';
import { Lang } from '../../../../both/models/lang.model';

import template from './packs-form.component.html';

@Component({
  selector: 'packs-form',
  providers: [MdUniqueSelectionDispatcher],
  template
})
export class PacksFormComponent extends MeteorComponent implements OnInit {
  addForm: FormGroup;
  langs: Observable<Lang[]>;
  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.langs = Langs.find({}).zone();
    this.subscribe('langs', () => {
      this.langs = Langs.find({}).zone();
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
        let form: Pack = {
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
