import { createReducer, on } from '@ngrx/store';
import { VinRecallData } from '../../models/vin-recall-data.model';
import { vinRecalled } from './vin-recall.actions';

// Set the feature name for the carmd recall feature state
// -- Dictionary of VINs -- keys for storing entity information in state mapped to "vins"
export interface VINRecallState {
  recalls: VinRecallData[];
}

// Set the initial state for the carmd recall feature state
// -- start with empty dictionary of VINs
export const initialVINRecallState: VINRecallState = {
  recalls: [],
};

export const setRecalls = (
  state: VINRecallState,
  { entities }: { entities: VinRecallData[] },
) => ({
  ...state,
  recalls: entities,
});

// Set the reducer for the carmd recall feature state
export const vinRecallReducer = createReducer(
  initialVINRecallState,
  on(vinRecalled, setRecalls),
);
