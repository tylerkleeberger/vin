import {createReducer, on} from '@ngrx/store';
import {applyReductions, mergeEntity} from '~vm/utils/ngrx';
import {checkVinRecalled} from './vin-recall.actions';
import {EntityDictionary} from '~vm/utils/func';
import {VinRecallData, StampedVinRecallData} from '../../models/vin-recall-data.model';


// Set the feature name for the carmd recall feature state
// -- Dictionary of VINs -- keys for storing entity information in state mapped to "vins"
export interface VINRecallState {
  vinRecallDict: EntityDictionary<StampedVinRecallData>;
  vins: string[];
}

// Set the initial state for the carmd recall feature state
// -- start with empty dictionary of VINs
export const initialVINRecallState: VINRecallState = {
  vinRecallDict: {},
  vins: [],
};


// Incorporate timestamp into state
export const trackRecallTimestamp = (
  state: VINRecallState,
  {entity}: { entity: VinRecallData },
): VINRecallState => ({
  ...state,
  vinRecallDict: {
    ...state.vinRecallDict,
    [entity.vin]: {
      ...state.vinRecallDict[entity.vin],
      timestamp: Date.now(),
    },
  },
});


// Set the reducer for the carmd recall feature state
export const vinRecallReducer = createReducer(
  initialVINRecallState,
  on(
    checkVinRecalled,
    applyReductions(
      mergeEntity('vin', 'vins', 'vinRecallDict'),
      trackRecallTimestamp,
    )),
);
