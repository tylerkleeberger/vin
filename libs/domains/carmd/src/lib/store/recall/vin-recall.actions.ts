import {createAction, props} from '@ngrx/store';
import {VinRecallData} from '../../models/vin-recall-data.model';
import {CarMDError, CarMDRecallResponse} from '../../carmd.service';


// Set the action type for the recall action
export const checkVinRecalled = createAction(
  '[DOMAIN: CarMD] (Vin) Check Recall', props<{ vin: string }>());



// Set the action type for the recall success action
//  -- move VIN Data interface from service to model for import as entity
//
// Recall Success action is dispatched when the recall data is successfully retrieved
//  -- the entity is the recall data
export const vinRecalled = createAction(
  '[DOMAIN: CarMD] (Vin) Recalled', props<{ entity: VinRecallData }>());


// Set the action type for the recall failure action
//   -- import CarMDError from service to use as error prop
export const vinRecallCheckFailure = createAction(
  '[DOMAIN: CarMD] (Vin Recall Check) Failure', props<{ error: CarMDError<CarMDRecallResponse> }>());
