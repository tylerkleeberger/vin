import { Component } from '@angular/core';
import {Store} from '@ngrx/store';
import {checkVinRecalled, recentVinRecalls, vinRecall} from '~vm/domains/carmd';

@Component({
  templateUrl: './check-recall.page.html',
  styleUrls: ['./check-recall.page.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class CheckRecallPage {

  // Observable for HTML template display
  //  --  Selector of data from the store based on VinRecallData Model Interface with timestamp included
  recalls$ = this.store.select(recentVinRecalls);

  constructor(
    private readonly store: Store,
  ) {}

  // Dispatch action to store
  checkRecalls(vin: any) {
    this.store.dispatch(checkVinRecalled({ vin }))
  }


  // Test Recall VIN
  //  1GNALDEK9FZ108495

}
