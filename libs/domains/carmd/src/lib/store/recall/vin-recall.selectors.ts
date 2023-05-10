import {createSelector} from '@ngrx/store';
import {get, transformDictToArray} from '~vm/utils/func';
import {featureState} from '../feature.state';
import {StampedVinRecallData} from '../../models/vin-recall-data.model';

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
  vins,
  vinRecallDict,
  transformDictToArray,
);

export const recentVinRecalls = createSelector(vinRecall, (vinRecall: StampedVinRecallData[]) =>
  vinRecall
    .sort(
      (a: StampedVinRecallData, b: StampedVinRecallData) =>
        (b.timestamp ?? 0) - (a.timestamp ?? 0),
    )
    .slice(0, 10),
);


//
