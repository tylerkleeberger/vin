import {createAction, props} from '@ngrx/store';
import {VinRecallData} from '../../models/vin-recall-data.model';
import {CarMDError} from '../../carmdrecall.service';


// Set the action type for the recall action
export const recallVin = createAction(
  '[DOMAIN: carMD] (Vin Recall) Recall', props<{ vin: string }>());



// Set the action type for the recall success action
//  -- move VIN Data interface from service to model for import as entity
//
// Recall Success action is dispatched when the recall data is successfully retrieved
//  -- the entity is the recall data
export const vinRecallSuccess = createAction(
  '[DOMAIN: carMD] (Vin Recall) Recall Success', props<{ entity: VinRecallData }>());


// Set the action type for the recall failure action
//   -- import CarMDError from service to use as error prop
export const vinRecallFailure = createAction(
  '[DOMAIN: carMD] (Vin Recall) Recall Failure', props<{ error: CarMDError }>());
