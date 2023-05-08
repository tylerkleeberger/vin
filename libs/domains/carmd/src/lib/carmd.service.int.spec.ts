import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { CarMDError, CarMDService, CarMDVINResponse } from './carmd.service';
import { cold, hot } from 'jasmine-marbles';

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
    it('should return recall information if a valid VIN was provided', (done) => {
      // ARRANGE
      const service = TestBed.inject(CarMDService);

      // ACT
      // -- fake .get() call --
      service.recallVIN('1GNALDEK9FZ108495').subscribe({

        // ASSERT
        next: (result) => {
          expect(result).toEqual({recalls: [
            {
              "campaign_number": "22V165000",
              "consequence": "INOPERATIVE WINDSHIELD WIPERS CAN REDUCE VISIBILITY IN CERTAIN DRIVING CONDITIONS, INCREASING THE RISK OF A CRASH.",
              "corrective_action": "DEALERS WILL INSPECT THE WIPER MODULE, AND REPAIR OR REPLACE IT AS NECESSARY, FREE OF CHARGE.  INTERIM OWNER NOTIFICATION LETTERS INFORMING OWNERS OF THE SAFETY RISK WERE MAILED ON APRIL 21, 2022.  OWNER NOTIFICATION LETTERS WERE MAILED ON OCTOBER 25, 2022.  OWNERS MAY CONTACT CHEVROLET CUSTOMER SERVICE AT 1-800-222-1020 AND GMC CUSTOMER SERVICE AT 1-800-462-8782.  GM'S NUMBER FOR THIS RECALL IS N212352530.",
              "desc": "GENERAL MOTORS, LLC (GM) IS RECALLING CERTAIN 2014-2015 CHEVROLET EQUINOX AND GMC TERRAIN VEHICLES.  THE BALL JOINTS IN THE WINDSHIELD WIPER MODULE MAY CORRODE, CAUSING ONE OR BOTH WINDSHIELD WIPERS TO FAIL.",
              "recall_date": "1/17/2022",
              "recall_number": "25997"
            },
            {
              "campaign_number": "15V666000",
              "consequence": "IN THE EVENT OF A CRASH NECESSITATING DEPLOYMENT OF ONE OR BOTH OF THE SIDE IMPACT AIR BAGS, THE AIR BAG'S INFLATOR MAY RUPTURE AND THE AIR BAG MAY NOT PROPERLY INFLATE. THE RUPTURE COULD CAUSE METAL FRAGMENTS TO STRIKE THE VEHICLE OCCUPANTS, POTENTIALLY RESULTING IN SERIOUS INJURY OR DEATH.  ADDITIONALLY, IF THE AIR BAG DOES NOT PROPERLY INFLATE, THE DRIVER OR PASSENGER IS AT AN INCREASED RISK OF INJURY.",
              "corrective_action": "GM WILL NOTIFY OWNERS, AND DEALERS WILL REPLACE THE SIDE IMPACT AIR BAG MODULES, FREE OF CHARGE. THE RECALL BEGAN ON OCTOBER 19, 2015.  OWNERS MAY CONTACT BUICK CUSTOMER SERVICE AT 1-800-521-7300, CHEVROLET CUSTOMER SERVICE AT 1-800-222-1020, CADILLAC CUSTOMER SERVICE AT 1-800-458-8006, OR GMC CUSTOMER SERVICE AT 1-800-462-8782.  GM'S NUMBER FOR THIS RECALL IS 01320.",
              "desc": "GENERAL MOTORS LLC (GM) IS RECALLING CERTAIN MODEL YEAR 2015 BUICK LACROSSE, CADILLAC XTS, CHEVROLET CAMARO, EQUINOX, MALIBU, AND GMC TERRAIN VEHICLES.  THE AFFECTED VEHICLES HAVE FRONT SEAT-MOUNTED SIDE IMPACT AIR BAGS WHOSE INFLATOR MAY RUPTURE UPON ITS DEPLOYMENT.",
              "recall_date": "1/16/2015",
              "recall_number": "25998"
            }
          ], vin: '1GNALDEK9FZ108495'});
          done();
        },
        error: (error) => {
          console.log(error);
          done.fail('Expected VIN recall details');
        }
      });
    }, 10000);

    it('should return error message if an invalid VIN was provided', (done) => {

      // ARRANGE
      const service = TestBed.inject(CarMDService);

      // ACT
      service.recallVIN('bad').subscribe({
        next: () => {
          done.fail('Expected recall error response');
        },
        error: (error) => {
          expect(error).toEqual(new CarMDError('Invalid VIN', error));
          done();
        },
      });
    });
  });

});
