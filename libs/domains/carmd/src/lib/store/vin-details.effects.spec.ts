import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jasmine-marbles';
import { CarMDService } from '../carmd.service';
import { VINDetails } from '../models/vin-details.model';
import { decodeVin, vinDecoded } from './vin-decoder.actions';
import { VINDetailsEffects } from './vin-details.effects';
import { initialVINDetailsState } from './vin-details.state';

const KIA_VIN = 'KNDJE723667159725';
const KIA_DETAILS: VINDetails = {
  engine: 'V6, 2.7L; DOHC; 24V',
  make: 'KIA',
  manufacturer: 'KIA',
  model: 'NEW SPORTAGE',
  transmission: 'STANDARD',
  trim: 'LX V6 4WD',
  year: 2006,
};

describe('VINDetailsEffects', () => {
  let actions$: Actions;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        VINDetailsEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          initialState: {
            vinDetails: initialVINDetailsState,
          },
        }),
        {
          provide: CarMDService,
          useValue: {
            decodeVIN: jest.fn(),
          },
        },
      ],
    }),
  );

  describe('decodeVin$', () => {
    it('should handle the decodeVin action, make a request to the CarMD service to decode, and return the VINDetails', () => {
      actions$ = hot('-a-', { a: decodeVin({ vin: KIA_VIN }) });

      const service = TestBed.inject(CarMDService);
      const effects = TestBed.inject(VINDetailsEffects);

      jest.spyOn(service, 'decodeVIN').mockReturnValue(cold('v', { v: KIA_DETAILS }));

      expect(effects.decodeVin$).toBeObservable(hot('-b-', { b: vinDecoded({ details: KIA_DETAILS }) }));
    });
  });
});
