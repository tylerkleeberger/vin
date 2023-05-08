import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { VINDetails } from './models/vin-details.model';
import {VinRecallData} from './models/vin-recall-data.model';

export const CARMD_API_BASE_URL = 'https://api.carmd.com/v3.0';
const VM_CARMD_PARTNER_TOKEN = 'fdace21bf9434d828e15377ccfe67efb';
const VM_CARMD_AUTH_KEY = 'ODg0ZjA4NTItZTIwZS00M2JkLTk3MDQtN2FjZDM1MmYxNjZk';

export const AUTH_HEADERS = {
  Authorization: `Basic ${VM_CARMD_AUTH_KEY}`,
  'Partner-Token': VM_CARMD_PARTNER_TOKEN,
}
export interface CarMDMessage {
  code: number;
  counter: number;
  version: string;
  message: 'ok' | string;
  credentials: 'valid' | string;
  endpoint: 'decode' | 'recall' | string;
}

export interface CarMDResponse {
  message: CarMDMessage;
}
export interface CarMDVINResponse extends CarMDResponse {
  data: VINDetails;
}

export interface CarMDRecallResponse extends CarMDResponse {
  data: VinRecallData;
}

export class CarMDError<T extends CarMDResponse> extends Error {
  constructor(message: string, public readonly response: T) {
    super(message);
  }
}

@Injectable()
export class CarMDService {
  constructor(private readonly http: HttpClient) {}

  decodeVIN(vin: string): Observable<VINDetails> {
    return this.http
      .get<CarMDVINResponse>(`${CARMD_API_BASE_URL}/decode`, {
        headers: {
          ...AUTH_HEADERS,
        },
        params: new HttpParams({ fromObject: { vin } }),
      })
      .pipe(
        switchMap((response) =>
          response.message.message === 'ok' ? of({ ...response.data, vin }) : throwError(() => response),
        ),
        catchError((err) => throwError(() => new CarMDError('Error retrieving VIN details.', err))),
      );
  }

  // 1) Method name -- get recall information by VIN#
  // 2) Method parameters -- vin: string
  // 3) Method return type -- Observable<recallData>
  checkRecall(vin: string): Observable<VinRecallData> {
    // 4) Method body -- use the HttpClient to make a GET request to the CarMD API recall endpoint
    return this.http
      // response type is recallResponse
      .get<CarMDRecallResponse>(`${CARMD_API_BASE_URL}/recall`, {
        // 5) Method body -- set the Authorization and Partner-Token headers
        headers: {
          ...AUTH_HEADERS
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
            of({recalls: response.data, vin}) :
            // 9) Method body -- use the RxJS throwError operator to return the response if the response message is not ok
            throwError(() => response),
        ),
        // 10) Method body -- use the RxJS catchError operator to return a new CarMDError if an error occurs
        catchError((err) => throwError(() => new CarMDError('Error retrieving recall details.', err))),
      );
  }

}

