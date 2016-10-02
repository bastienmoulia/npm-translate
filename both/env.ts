import 'reflect-metadata';
import {Injectable} from '@angular/core';

@Injectable()
export class ENV {
  scope = '@bastienmoulia';
  langs = [{
    name: 'English',
    _id: 'en'
  }, {
    name: 'Français',
    _id: 'fr'
  }, {
    name: 'Español',
    _id: 'es'
  }];
}
