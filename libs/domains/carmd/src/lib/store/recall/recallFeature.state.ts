import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import {vinRecallReducer, VINRecallState} from './vin-recall.state';

// Set the feature name for the carmd recall feature state

export const FEATURE_NAME = 'domain-carmd-recall';

// Selector to get the feature state
export const featureState = createFeatureSelector<FeatureState>(FEATURE_NAME);

export interface FeatureState {
  vinRecall: VINRecallState;
}

// Reducer to combine the feature state -- ??????

export const featureReducer: ActionReducerMap<FeatureState> = {
  vinRecall: vinRecallReducer,
}
