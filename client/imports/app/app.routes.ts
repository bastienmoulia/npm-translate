import { Route } from '@angular/router';

import { PacksListComponent } from './packs/packs-list.component';
import { PackDetailsComponent } from './packs/pack-details.component';
import { PackConfigComponent } from './packs/pack-config.component';

export const routes: Route[] = [
  { path: '', component: PacksListComponent },
  { path: 'package/:packId', component: PackDetailsComponent },
  { path: 'package/:packId/config', component: PackConfigComponent }
];
