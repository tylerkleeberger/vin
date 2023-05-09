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
    private readonly carmd: CarMDService,
  ) {}

  // Operating off of streams (usually of actions)
  //  -- whenever checkVinRecall is dispatched --
  //  -- ofType filter (steam occuring over time) -- of checkVinRecalled action
  //  -- get = capture value (vin) from action
  //  -- creating a function that when the action occurs -> moves to switchMap (callback function)
  //  -- get new stream (with cold observable) -- switchMap subscribes = makes call to server -- checks error or not
  //  -- not an error = get data -->  effects job is to take action and turns into other actions
  recallVin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(checkVinRecalled),
        switchMap(({ vin }) =>
          this.carmd.checkRecall(vin).pipe(
            map(entity => vinRecalled({ entity })),
            catchError(error => of(vinRecallCheckFailure({ error }))),
          ),
        ),
      ),
    { dispatch: false },
  );
}
