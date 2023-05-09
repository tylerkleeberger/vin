import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { CarMDService } from '../carmd.service';
import {
  decodeVin,
  vinDecoded,
  vinDecodingFailed,
} from './vin-decoder.actions';

@Injectable()
export class VINDetailsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly carmd: CarMDService,
  ) {}

  decodeVin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(decodeVin),
      switchMap(({ vin }) =>
        this.carmd.decodeVIN(vin).pipe(
          map(entity => vinDecoded({ entity })),
          catchError(error => of(vinDecodingFailed({ error }))),
        ),
      ),
    ),
  );
}
