import { createReducer, on } from '@ngrx/store';
import { vinDecoded } from '~vm/domains/carmd';
import { EntityDictionary } from '~vm/utils/func';
import { applyReductions } from '~vm/utils/ngrx';
import { StampedVINDetails, VINDetails } from '../models/vin-details.model';

export interface VINDetailsState {
  vinDetailsDict: EntityDictionary<StampedVINDetails>;
  vins: string[];
}

export const initialVINDetailsState: VINDetailsState = {
  vinDetailsDict: {},
  vins: [],
};

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

export const trackTimestamp = (state: VINDetailsState, { entity }: { entity: VINDetails }): VINDetailsState => ({
  ...state,
  vinDetailsDict: {
    ...state.vinDetailsDict,
    [entity.vin]: {
      ...state.vinDetailsDict[entity.vin],
      timestamp: Date.now(),
    },
  },
});

export const vinDetailsReducer = createReducer(
  initialVINDetailsState,
  on(vinDecoded, applyReductions(mergeEntity('vin', 'vins', 'vinDetailsDict'), trackTimestamp)),
);
