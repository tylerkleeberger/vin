import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { vinDetailsReducer, VINDetailsState } from './vin-details.state';

export const FEATURE_NAME = 'domain-carmd';

export const featureState = createFeatureSelector<FeatureState>(FEATURE_NAME);

export interface FeatureState {
  vinDetails: VINDetailsState;
}

export const featureReducer: ActionReducerMap<FeatureState> = {
  vinDetails: vinDetailsReducer,
};
