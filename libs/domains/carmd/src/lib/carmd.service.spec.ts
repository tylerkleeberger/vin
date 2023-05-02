import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { CarMDError, CarMDService, CarMDVINResponse } from './carmd.service';
import { cold, hot } from 'jasmine-marbles';

describe('CarmdService', () => {
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
});
