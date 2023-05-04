import {createSelector} from '@ngrx/store';
import {featureState} from './recallFeature.state';
import {get, transformDictToArray} from '~vm/utils/func';

export const vinRecallState = createSelector(
  featureState, get('vinRecall'));

export const vinRecallDict = createSelector(
  vinRecallState, get('vinRecallDict'));

export const vins = createSelector(
  vinRecallState, get('vinRecallDict'));

export const vinRecall = createSelector(
  vins, vinRecallDict, transformDictToArray);
