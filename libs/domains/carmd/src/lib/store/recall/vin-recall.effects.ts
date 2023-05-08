import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, of, switchMap} from 'rxjs';
import {checkVinRecalled, vinRecallCheckFailure, vinRecalled} from './vin-recall.actions';
import {CarMDService} from '../../carmd.service';

@Injectable()
export class VinRecallEffects {

  // Construct the effects class with the actions and the recall service
  constructor(
    private readonly actions$: Actions,
    private readonly recallService: CarMDService
  ) {}


  recallVin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkVinRecalled),
      switchMap(({ vin }) =>
        this.recallService.recallVIN(vin).pipe(
          map((recallData) => vinRecalled({ entity: recallData })),
          catchError((error) => of(vinRecallCheckFailure({ error }))),
        ),
      ),
    ),
  );


}
