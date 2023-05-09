import { Route } from '@angular/router';
import {VinLookupPage} from './vin-lookup.page';

export const pagesVinLookupRoutes: Route[] = [
   {path: '', pathMatch: 'full', component: VinLookupPage}
];
