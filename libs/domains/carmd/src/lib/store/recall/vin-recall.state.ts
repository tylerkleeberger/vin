import {createReducer, on} from '@ngrx/store';
import {applyReductions} from '~vm/utils/ngrx';
import {recallVin} from './vin-recall.actions';


// Set the feature name for the carmd recall feature state
// -- Dictionary of VINs and their recall information ????????
export interface VINRecallState {
  vinRecallDict: any;
  vins: string[];
}

// Set the initial state for the carmd recall feature state
// -- ????????
export const initialVINRecallState: VINRecallState = {
  vinRecallDict: {},
  vins: [],
}

// Merge Entity = ????????
export const mergeEntity =
  <TKey extends string | number, TEntity, TState>(
    keyProp: keyof TEntity,
    idProp: keyof TState,
    entityProp: keyof TState,
  ) =>
    (
      state: TState,
      {
        entity,
      }: {
        entity: TEntity;
      },
    ): TState => ({
      ...state,
      [entityProp]: {
        ...state[entityProp],
        [entity[keyProp] as string | number]: entity,
      },
      [idProp]: [...(state[idProp] as (string | number)[]), entity[keyProp]],
    });


// Set the reducer for the carmd recall feature state
export const vinRecallReducer = createReducer(
  initialVINRecallState,
  on(recallVin, applyReductions(mergeEntity('vin', 'vins', 'vinRecallDict'))),
);
