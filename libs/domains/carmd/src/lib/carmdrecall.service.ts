import {Injectable} from '@angular/core';
import {CarMDVINResponse} from './carmd.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, Observable, of, switchMap, throwError} from 'rxjs';


const CARMD_API_BASE_URL = 'https://api.carmd.com/v3.0';
const VM_CARMD_PARTNER_TOKEN = '2a9c3c010438423c87d20181f290388e';
const VM_CARMD_AUTH_KEY = 'NjBhZjExM2EtYjVkYS00YmI1LWI4ZTktYWYxZGU2MDM5NzFl';


export interface recallMessage {
  code: number;
  counter: number;
  version: string;
  message: 'ok' | string;
  credentials: 'valid' | string;
  endpoint: 'recall' | string;
}

export interface recallData {
  vin: string;
  desc?: string;
  corrective_action?: string;
  consequence?: string;
  recall_date?: string;
  campaign_number?: string;
  recall_number?: string;
}

export interface recallResponse {
  message: recallMessage;
  data: recallData;
}

export class CarMDError extends Error {
  constructor(message: string, public readonly response: CarMDVINResponse) {
    super(message);
  }
}

@Injectable({
  providedIn: 'root',
})
export class CarMDRecallService {

  constructor(
    private readonly http: HttpClient,
  ) {
  }

  // 1) Method name -- get recall information by VIN#
  // 2) Method parameters -- vin: string
  // 3) Method return type -- Observable<recallData>
  recallVIN(vin: string): Observable<recallData> {
    // 4) Method body -- use the HttpClient to make a GET request to the CarMD API recall endpoint
    return this.http
      // response type is recallResponse
      .get<recallResponse>(`${CARMD_API_BASE_URL}/recall`, {
        // 5) Method body -- set the Authorization and Partner-Token headers
        headers: {
          Authorization: `Basic ${VM_CARMD_AUTH_KEY}`,
          'Partner-Token': VM_CARMD_PARTNER_TOKEN,
        },
        // 6) Method body -- set the vin query parameter
        params:
          new HttpParams({fromObject: {vin}}),
        })
      // 7) Method body -- use the RxJS switchMap operator to return the recallData object if the response message is ok
      .pipe(
        switchMap((response) =>
          response.message.message === 'ok' ?
          // 8) Method body -- use the RxJS of operator to return the recallData object with the vin property set to the vin parameter
            of({...response.data, vin}) :
            // 9) Method body -- use the RxJS throwError operator to return the response if the response message is not ok
            throwError(() => response),
        ),
        // 10) Method body -- use the RxJS catchError operator to return a new CarMDError if an error occurs
        catchError((err) => throwError(() => new CarMDError('Error retrieving recall details.', err))),
      );
  }

  // Setup NgRx State, Selectors, and Effects


}
