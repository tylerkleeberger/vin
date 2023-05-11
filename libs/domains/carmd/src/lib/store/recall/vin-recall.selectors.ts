import { createSelector } from '@ngrx/store';
import { get } from '~vm/utils/func';
import { featureState } from '../feature.state';

export const vinRecallState = createSelector(featureState, get('vinRecalls'));

export const vinRecalls = createSelector(vinRecallState, get('recalls'));
