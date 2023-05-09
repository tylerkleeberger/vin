import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { pagesVinLookupRoutes } from './lib.routes';
import { VinLookupPage } from './vin-lookup.page';
import {IonicModule} from '@ionic/angular';
import {PushPipe} from '@rx-angular/template/push';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(pagesVinLookupRoutes),
    IonicModule,
    PushPipe,
  ],
  declarations: [VinLookupPage],
})
export class PagesVinLookupModule {

}
