import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { decodeVin, recentVinDetails } from '~vm/domains/carmd';

@Component({
  templateUrl: './vin-lookup.page.html',
  styleUrls: ['./vin-lookup.page.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class VinLookupPage {
  recentSearches$ = this.store.select(recentVinDetails);

  constructor(private readonly store: Store) {}

  lookupVin(vin: any) {
    this.store.dispatch(decodeVin({ vin }));
  }
}
