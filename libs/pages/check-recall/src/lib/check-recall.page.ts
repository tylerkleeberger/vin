import { Component } from '@angular/core';
import {of} from 'rxjs';
import {Store} from '@ngrx/store';
import {checkVinRecalled} from '~vm/domains/carmd';

@Component({
  selector: 'vm-check-recall',
  templateUrl: './check-recall.page.html',
  styleUrls: ['./check-recall.page.scss'],
})
export class CheckRecallPage {
  recalls$ = of([
    {
      'campaign_number': '22V165000',
      'consequence': 'INOPERATIVE WINDSHIELD WIPERS CAN REDUCE VISIBILITY IN CERTAIN DRIVING CONDITIONS, INCREASING THE RISK OF A CRASH.',
      'corrective_action': 'DEALERS WILL INSPECT THE WIPER MODULE, AND REPAIR OR REPLACE IT AS NECESSARY, FREE OF CHARGE.  INTERIM OWNER NOTIFICATION LETTERS INFORMING OWNERS OF THE SAFETY RISK WERE MAILED ON APRIL 21, 2022.  OWNER NOTIFICATION LETTERS WERE MAILED ON OCTOBER 25, 2022.  OWNERS MAY CONTACT CHEVROLET CUSTOMER SERVICE AT 1-800-222-1020 AND GMC CUSTOMER SERVICE AT 1-800-462-8782.  GM\'S NUMBER FOR THIS RECALL IS N212352530.',
      'desc': 'GENERAL MOTORS, LLC (GM) IS RECALLING CERTAIN 2014-2015 CHEVROLET EQUINOX AND GMC TERRAIN VEHICLES.  THE BALL JOINTS IN THE WINDSHIELD WIPER MODULE MAY CORRODE, CAUSING ONE OR BOTH WINDSHIELD WIPERS TO FAIL.',
      'recall_date': '1/17/2022',
      'recall_number': '25997',
    }
  ])

  constructor(
    private readonly store: Store,
  ) {}

  checkRecalls(vin: any) {
    this.store.dispatch(checkVinRecalled({vin}))
  }



}
