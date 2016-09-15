import { RouterConfig, provideRouter } from '@angular/router';

import { PacksListComponent } from './imports/packs/packs-list.component';
import { PackDetailsComponent } from './imports/packs/pack-details.component';

const routes: RouterConfig = [
  { path: '', component: PacksListComponent },
  { path: 'package/:packId', component: PackDetailsComponent }
];
 
export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];