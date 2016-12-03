import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';

import template from './app.component.html';

@Component({
  selector: 'app',
  template
})
export class AppComponent {
  constructor(translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

      // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }
}
