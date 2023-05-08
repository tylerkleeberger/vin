import {HttpClient, HttpClientModule, HttpParams} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';

import {AUTH_HEADERS, CARMD_API_BASE_URL, CarMDError, CarMDService, CarMDVINResponse} from './carmd.service';
import {cold, hot} from 'jasmine-marbles';

describe('CarMDService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [CarMDService],
    });
  });

  it('should be created', () => {
    const service = TestBed.inject(CarMDService);
    expect(service).toBeTruthy();
  });

  describe('decodeVin()', () => {
    it('should return vehicle details if an valid VIN was provided', (done) => {
      const service = TestBed.inject(CarMDService);

      service.decodeVIN('KNDJE723667159725').subscribe({
        next: (result) => {
          expect(result).toEqual({
            engine: 'V6, 2.7L; DOHC; 24V',
            make: 'KIA',
            manufacturer: 'KIA',
            model: 'NEW SPORTAGE',
            transmission: 'STANDARD',
            trim: 'LX V6 4WD',
            year: 2006,
          });
          done();
        },
        error: (error) => {
          done();
          throw new Error('Expected valid VIN response');
        },
      });
    });

    it('should return vehicle error message if an invalid VIN was provided', (done) => {
      const service = TestBed.inject(CarMDService);

      service.decodeVIN('KNDJE723667159725').subscribe({
        next: () => {
          done();
          throw new Error('Expected error VIN response');
        },
        error: (error) => {
          done();
          expect(error).toEqual({
            engine: 'V6, 2.7L; DOHC; 24V',
            make: 'KIA',
            manufacturer: 'KIA',
            model: 'NEW SPORTAGE',
            transmission: 'STANDARD',
            trim: 'LX V6 4WD',
            year: 2006,
          });
        },
      });

      // const expected = service.decodeVIN('derp');
      // expect(expected).toBeObservable(cold('#', undefined, new CarMDError('', {} as CarMDVINResponse)));
    });
  });

  describe('recallVIN()', () => {
    it('should return recall information if a valid VIN was provided', () => {
      // ARRANGE
      const service = TestBed.inject(CarMDService);
      const http = TestBed.inject(HttpClient);
      const recall1 = {
        'campaign_number': '22V165000',
        'consequence': 'INOPERATIVE WINDSHIELD WIPERS CAN REDUCE VISIBILITY IN CERTAIN DRIVING CONDITIONS, INCREASING THE RISK OF A CRASH.',
        'corrective_action': 'DEALERS WILL INSPECT THE WIPER MODULE, AND REPAIR OR REPLACE IT AS NECESSARY, FREE OF CHARGE.  INTERIM OWNER NOTIFICATION LETTERS INFORMING OWNERS OF THE SAFETY RISK WERE MAILED ON APRIL 21, 2022.  OWNER NOTIFICATION LETTERS WERE MAILED ON OCTOBER 25, 2022.  OWNERS MAY CONTACT CHEVROLET CUSTOMER SERVICE AT 1-800-222-1020 AND GMC CUSTOMER SERVICE AT 1-800-462-8782.  GM\'S NUMBER FOR THIS RECALL IS N212352530.',
        'desc': 'GENERAL MOTORS, LLC (GM) IS RECALLING CERTAIN 2014-2015 CHEVROLET EQUINOX AND GMC TERRAIN VEHICLES.  THE BALL JOINTS IN THE WINDSHIELD WIPER MODULE MAY CORRODE, CAUSING ONE OR BOTH WINDSHIELD WIPERS TO FAIL.',
        'recall_date': '1/17/2022',
        'recall_number': '25997',
      };
      const vin = '1GNALDEK9FZ108495';

      const getSpy = jest.spyOn(http, 'get').mockReturnValue(cold('a|', {
        a: {
          message: {
            message: 'ok',
          },
          data: [
            recall1,
          ],
        },
      }));
      // ACT
      const expected = service.recallVIN(vin);
      // ASSERT
      expect(expected).toBeObservable(cold('a|', {
        a: {
          recalls: [
            recall1,
          ], vin,
        },
      }));
      expect(getSpy).toHaveBeenCalledWith(`${CARMD_API_BASE_URL}/recall`, {
        headers: {
          ...AUTH_HEADERS,
        },
        // 6) Method body -- set the vin query parameter
        params:
          new HttpParams({fromObject: {vin}}),
      });
    });

    it('should return error message if an invalid VIN was provided', (done) => {

      // ARRANGE

      // Inject dependencies
      const service = TestBed.inject(CarMDService);
      const http = TestBed.inject(HttpClient);
      const recallFail = {
        'data': null,
        'message': {
          'code': 1003,
          'counter': 7,
          'credentials': 'valid',
          'endpoint': 'recall',
          'message': 'Invalid subscription/credits',
          'version': 'v3.0.0',
        },
      };

      // Spy on HTTP Get Method
      const getSpy = jest.spyOn(http, 'get').mockReturnValue(cold('a|', {
        a: recallFail,
      }));

      // ACT

      const expected = service.recallVIN('bad');

      // ASSERT
      expect(expected).toBeObservable(cold('#', undefined, new CarMDError('Invalid subscription/credits', recallFail)));

      // service.recallVIN('bad').subscribe({
      //   next: () => {
      //     done.fail('Expected recall error response');
      //   },
      //   error: (error) => {
      //     expect(error).toEqual(new CarMDError('Invalid VIN', error));
      //     done();
      //   },
      // });
    });
  });

})
;
