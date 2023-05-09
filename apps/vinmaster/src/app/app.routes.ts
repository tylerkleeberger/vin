import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'check-recall', loadChildren: () => import('~vm/pages/check-recall').then(m => m.PagesCheckRecallModule)
  },
  {
    path: '', redirectTo: 'check-recall', pathMatch: 'full'
  }
];
