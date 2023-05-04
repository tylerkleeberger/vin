import {Injectable} from '@angular/core';
import {CarMDRecallService} from '../../carmdrecall.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {recallVin, vinRecallFailure, vinRecallSuccess} from './vin-recall.actions';
import {catchError, map, of, switchMap} from 'rxjs';

@Injectable()
export class VinRecallEffects {

  // Construct the effects class with the actions and the recall service
  constructor(
    private readonly actions$: Actions,
    private readonly recallService: CarMDRecallService
  ) {}


  recallVin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(recallVin),
      switchMap(({ vin }) =>
        this.recallService.recallVIN(vin).pipe(
          map((recallData) => vinRecallSuccess({ entity: recallData })),
          catchError((error) => of(vinRecallFailure({ error }))),
        ),
      ),
    ),
  );


}
