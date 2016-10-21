import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountsModule } from 'angular2-meteor-accounts-ui';
import { MdButtonModule } from "@angular2-material/button";
import { MdToolbarModule } from "@angular2-material/toolbar";
import { MdInputModule } from "@angular2-material/input";
import { MdCardModule } from "@angular2-material/card";
import { MdCoreModule } from "@angular2-material/core";
import { MdCheckboxModule } from "@angular2-material/checkbox";
import { MdListModule } from "@angular2-material/list";

import { AppComponent } from './app.component';
import { PACKS_DECLARATIONS } from './packs';
import { TRANSLATIONS_DECLARATIONS } from './translations';
import { DisplayLangPipe } from './shared/display-lang.pipe';

import { routes } from './app.routes';

@NgModule({
  // Components, Pipes, Directive
  declarations: [
    AppComponent,
    ...PACKS_DECLARATIONS,
    ...TRANSLATIONS_DECLARATIONS,
    DisplayLangPipe
  ],
  // Entry Components
  entryComponents: [
    AppComponent
  ],
  // Providers
  providers: [
    //DemoDataService
  ],
  // Modules
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AccountsModule,
    MdCoreModule.forRoot(),
    MdButtonModule.forRoot(),
    MdToolbarModule.forRoot(),
    MdInputModule.forRoot(),
    MdCardModule.forRoot(),
    MdCheckboxModule.forRoot(),
    MdListModule.forRoot()
  ],
  // Main Component
  bootstrap: [ AppComponent ]
})
export class AppModule {}
