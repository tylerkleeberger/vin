import { Component } from '@angular/core';
import {of} from 'rxjs';
import {Store} from '@ngrx/store';
import {decodeVin} from '~vm/domains/carmd';

@Component({
  selector: 'vm-vin-lookup',
  templateUrl: './vin-lookup.page.html',
  styleUrls: ['./vin-lookup.page.scss'],
})
export class VinLookupPage {
  details$ = of([
    {
      vin: 'KNDJE723667159725',
      engine: 'V6, 2.7L; DOHC; 24V',
      make: 'KIA',
      manufacturer: 'KIA',
      model: 'NEW SPORTAGE',
      transmission: 'STANDARD',
      trim: 'LX V6 4WD',
      year: 2006,
    }
  ])

  recentSearches$ = of([
    {
      vin: 'test vin #',
      engine: 'test engine',
      make: 'test Make',
      manufacturer: 'test manufacturer',
      model: 'test Model',
      transmission: 'transmission',
      trim: 'trim',
      year: 1900,
    }
  ])

  constructor(
    private readonly store: Store,
  ) {}

  lookupVin(vin: any) {
    this.store.dispatch(decodeVin({vin}))
  }

}
