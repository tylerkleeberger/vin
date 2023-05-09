import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'check-recall', loadChildren: () => import('~vm/pages/check-recall').then(m => m.PagesCheckRecallModule)
  },
  {
    path: 'vin-lookup', loadChildren: () => import('~vm/pages/vin-lookup').then(m => m.PagesVinLookupModule)
  },
  {
    path: '', redirectTo: 'check-recall', pathMatch: 'full'
  }
];
