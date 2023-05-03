import { createReducer } from '@ngrx/store';
import { EntityDictionary } from '~vm/utils/func';
import { VINDetails } from '../models/vin-details.model';

export interface VINDetailsState {
  vinDetailsDict: EntityDictionary<VINDetails>;
  vins: string[];
}

const initialState: VINDetailsState = {
  vinDetailsDict: {},
  vins: [],
};

export const vinDetailsReducer = createReducer(initialState);
