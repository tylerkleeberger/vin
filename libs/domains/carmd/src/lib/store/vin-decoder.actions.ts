import { createAction, props } from '@ngrx/store';
import { CarMDError } from '../carmd.service';
import { VINDetails } from '../models/vin-details.model';

export const decodeVin = createAction('[DOMAIN: CarMD] (Vin) Decode', props<{ vin: string }>());
export const vinDecoded = createAction('[DOMAIN: CarMD] (Vin) Decoded', props<{ entity: VINDetails }>());
export const vinDecodingFailed = createAction('[DOMAIN: CarMD] (Vin Decoding) Failed', props<{ error: CarMDError }>());
