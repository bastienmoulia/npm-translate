import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, CanActivate } from '@angular/router';
import { Tracker } from 'meteor/tracker';
import { MeteorComponent } from 'angular2-meteor';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { MdIconRegistry } from '@angular/material';

import { Packs } from '../../../../both/collections/packs.collection';
import { Pack } from '../../../../both/models/pack.model';
import { Langs } from '../../../../both/collections/langs.collection';
import { Lang } from '../../../../both/models/lang.model';

import template from './pack-config.component.html';

@Component({
  selector: 'pack-config',
  providers: [MdIconRegistry],
  template
})
@InjectUser('user')
export class PackConfigComponent extends MeteorComponent implements OnInit, CanActivate {
  packId: string;
  pack: Pack;
  user: Meteor.User;
  langs: Observable<Lang[]>;
  addLangForm: FormGroup;
  addJsonForm: FormGroup;
  file: Blob;
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
    this.langs = Langs.find({}).zone();
    this.subscribe('langs', () => {
      this.langs = Langs.find({}).zone();
    }, true);
    this.addLangForm = this.formBuilder.group({
      lang: ['', Validators.required]
    });
    this.addJsonForm = this.formBuilder.group({
      jsonFile: ['', Validators.required]
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

  addJson() {
    console.log("addJson");
    let reader = new FileReader();

    reader.onload = ((theFile) => {
      return (e) => {
        console.log("result", JSON.parse(e.target.result));

        // TODO compare new JSON with old translations
        // display number of added, editted and deleted fields
        // confirm
      }
    })(this.file);

    reader.readAsText(this.file);
  }

  fileChangeEvent(fileInput: any) {
    console.log(fileInput);
    this.file = fileInput.target.files[0];
  }
}
