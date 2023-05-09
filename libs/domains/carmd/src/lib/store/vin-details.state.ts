import { createReducer, on } from '@ngrx/store';
import { EntityDictionary } from '~vm/utils/func';
import { applyReductions, mergeEntity } from '~vm/utils/ngrx';
import { StampedVINDetails, VINDetails } from '../models/vin-details.model';
import { vinDecoded } from './vin-decoder.actions';

export interface VINDetailsState {
  vinDetailsDict: EntityDictionary<StampedVINDetails>;
  vins: string[];
}

export const initialVINDetailsState: VINDetailsState = {
  vinDetailsDict: {},
  vins: [],
};

export const trackTimestamp = (
  state: VINDetailsState,
  { entity }: { entity: VINDetails },
): VINDetailsState => ({
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
  on(
    vinDecoded,
    applyReductions(
      mergeEntity('vin', 'vins', 'vinDetailsDict'),
      trackTimestamp,
    ),
  ),
);
