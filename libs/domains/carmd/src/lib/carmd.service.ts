import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';

const CARMD_API_BASE_URL = 'https://api.carmd.com/v3.0';
const VM_CARMD_PARTNER_TOKEN = '2a9c3c010438423c87d20181f290388e';
const VM_CARMD_AUTH_KEY = 'NjBhZjExM2EtYjVkYS00YmI1LWI4ZTktYWYxZGU2MDM5NzFl';

export interface CarMDMessage {
  code: number;
  counter: number;
  version: string;
  message: 'ok' | string;
  credentials: 'valid' | string;
  endpoint: 'decode' | string;
}

export interface CarMDVINResult {
  year?: number;
  make?: string;
  model?: string;
  manufacturer?: string;
  engine?: string;
  trim?: string;
  transmission?: string;
}

export interface CarMDVINResponse {
  message: CarMDMessage;
  data: CarMDVINResult;
}

export class CarMDError extends Error {
  constructor(message: string, public readonly response: CarMDVINResponse) {
    super(message);
  }
}

@Injectable()
export class CarMDService {
  constructor(private readonly http: HttpClient) {}

  decodeVIN(vin: string): Observable<CarMDVINResult> {
    return this.http
      .get<CarMDVINResponse>(`${CARMD_API_BASE_URL}/decode`, {
        headers: {
          Authorization: `Basic ${VM_CARMD_AUTH_KEY}`,
          'Partner-Token': VM_CARMD_PARTNER_TOKEN,
        },
        params: new HttpParams({ fromObject: { vin } }),
      })
      .pipe(
        switchMap((response) =>
          response.message.message === 'ok'
            ? of(response.data)
            : throwError(() => response)
        ),
        catchError((err) =>
          throwError(() => new CarMDError('Error retrieving VIN details.', err))
        )
      );
  }
}
