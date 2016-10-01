import { RouterConfig, provideRouter } from '@angular/router';

import { PacksListComponent } from './imports/packs/packs-list.component';
import { PackDetailsComponent } from './imports/packs/pack-details.component';
import { PackConfigComponent } from './imports/packs/pack-config.component';

const routes: RouterConfig = [
  { path: '', component: PacksListComponent },
  { path: 'package/:packId', component: PackDetailsComponent },
  { path: 'package/:packId/config', component: PackConfigComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
