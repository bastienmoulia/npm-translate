import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Meteor } from 'meteor/meteor';

import { Packs } from '../../../both/collections/packs.collection';

import template from './translations-form.component.html';
 
@Component({
  selector: 'translations-form',
  template,
  directives: [REACTIVE_FORM_DIRECTIVES]
})
export class TranslationsFormComponent implements OnInit {
  addForm: FormGroup;
 
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) {}
 
  ngOnInit() {
    this.addForm = this.formBuilder.group({
      key: ['', Validators.required]
    });
  }

  resetForm() {
    this.addForm.controls['key']['updateValue']('');
  }
 
  addTranslation() {
    if (this.addForm.valid) {
      if (Meteor.userId()) {
        this.route.params
          .map(params => params['packId'])
          .subscribe(packId => {
            console.log("this.addForm.value", this.addForm.value);
            // TODO raffraichir aprés ajout
            Packs.update(packId, {
              $addToSet: {translations: Object.assign({}, this.addForm.value, { langs: {} }) }
            });
          });

        // XXX will be replaced by this.addForm.reset() in RC5+
        this.resetForm();
      } else {
        alert('Please log in to add a translation');
      }
    }
  }
}
