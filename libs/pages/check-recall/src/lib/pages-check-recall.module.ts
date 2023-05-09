import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {pagesCheckRecallRoutes} from './lib.routes';
import {CheckRecallPage} from './check-recall.page';
import {IonicModule} from '@ionic/angular';
import {PushPipe} from '@rx-angular/template/push';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(pagesCheckRecallRoutes),
    IonicModule,
    PushPipe,
  ],
  declarations: [CheckRecallPage],
})
export class PagesCheckRecallModule {
}
