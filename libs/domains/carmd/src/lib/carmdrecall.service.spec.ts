import { TestBed } from '@angular/core/testing';

import {CarMDRecallService} from './carmdrecall.service';
import {HttpClientModule} from '@angular/common/http';

// Ini
describe('CarMDRecallService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [CarMDRecallService],
    });
  });

  it('should be created', () => {
    const service = TestBed.inject(CarMDRecallService);
    expect(service).toBeTruthy();
  });

  describe('recallVIN()', () => {
    it('should return recall information if a valid VIN was provided', (done) => {
      const service = TestBed.inject(CarMDRecallService);

      service.recallVIN('1GNALDEK9FZ108495').subscribe({
        next: (result) => {
          expect(result).toEqual({
            vin: '1GNALDEK9FZ108495',
            desc: "GENERAL MOTORS, LLC (GM) IS RECALLING CERTAIN 2014-2015 CHEVROLET EQUINOX AND GMC TERRAIN VEHICLES. THE BALL JOINTS IN THE WINDSHIELD WIPER MODULE MAY CORRODE, CAUSING ONE OR BOTH WINDSHIELD WIPERS TO FAIL.",
            corrective_action: "DEALERS WILL INSPECT THE WIPER MODULE, AND REPAIR OR REPLACE IT AS NECESSARY, FREE OF CHARGE. INTERIM OWNER NOTIFICATION LETTERS INFORMING OWNERS OF THE SAFETY RISK WERE MAILED ON APRIL 21, 2022. OWNER NOTIFICATION LETTERS WERE MAILED ON OCTOBER 25, 2022. OWNERS MAY CONTACT CHEVROLET CUSTOMER SERVICE AT 1-800-222-1020 AND GMC CUSTOMER SERVICE AT 1-800-462-8782. GM'S NUMBER FOR THIS RECALL IS N212352530.",
            consequence: "INOPERATIVE WINDSHIELD WIPERS CAN REDUCE VISIBILITY IN CERTAIN DRIVING CONDITIONS, INCREASING THE RISK OF A CRASH.",
            recall_date: "1/17/2022",
            campaign_number: "22V165000",
            recall_number: "25997"
          });
          done();
        },
        error: (error) => {
          done();
          throw new Error('Expected VIN recall details');
        }
      });
    });

    it('should return error message if an invalid VIN was provided', (done) => {
      const service = TestBed.inject(CarMDRecallService);

      service.recallVIN('1GNALDEK9FZ108495').subscribe({
        next: () => {
          done();
          throw new Error('Expected recall error response');
        },
        error: (error) => {
          done();

        },
      });
    });
  });
});
