import {createSelector} from '@ngrx/store';
import {get, transformDictToArray} from '~vm/utils/func';
import {featureState} from '../feature.state';

export const vinRecallState = createSelector(
  featureState, get('vinRecalls'),
);

export const vinRecallDict = createSelector(
  vinRecallState, get('vinRecallDict'),
);

export const vins = createSelector(
  vinRecallState, get('vins'),
);

export const vinRecall = createSelector(
  vins, vinRecallDict, transformDictToArray,
);


//
