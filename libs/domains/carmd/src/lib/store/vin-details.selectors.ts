import { createSelector } from '@ngrx/store';
import { get, transformDictToArray } from '~vm/utils/func';
import { featureState } from './feature.state';

export const vinDetailsState = createSelector(featureState, get('vinDetails'));

export const vinDetailsDict = createSelector(vinDetailsState, get('vinDetailsDict'));
export const vins = createSelector(vinDetailsState, get('vins'));

export const vinDetails = createSelector(vins, vinDetailsDict, transformDictToArray);