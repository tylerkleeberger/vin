import { createSelector } from '@ngrx/store';
import { get, transformDictToArray } from '~vm/utils/func';
import { StampedVINDetails } from '../models/vin-details.model';
import { featureState } from './feature.state';

export const vinDetailsState = createSelector(featureState, get('vinDetails'));

export const vinDetailsDict = createSelector(
  vinDetailsState,
  get('vinDetailsDict'),
);
export const vins = createSelector(vinDetailsState, get('vins'));

export const vinDetails = createSelector(
  vins,
  vinDetailsDict,
  transformDictToArray,
);

export const recentVinDetails = createSelector(vinDetails, (vinDetails: StampedVINDetails[]) =>
  vinDetails
    .sort(
      (a: StampedVINDetails, b: StampedVINDetails) =>
        (b.timestamp ?? 0) - (a.timestamp ?? 0),
    )
    .slice(0, 10),
);
