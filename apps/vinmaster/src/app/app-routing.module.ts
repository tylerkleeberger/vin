import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
