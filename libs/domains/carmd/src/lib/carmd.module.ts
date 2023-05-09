import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CarMDService } from './carmd.service';
import { FEATURE_NAME, featureReducer } from './store/feature.state';
import { VinRecallEffects } from './store/recall/vin-recall.effects';
import { VINDetailsEffects } from './store/vin-details.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(FEATURE_NAME, featureReducer),
    EffectsModule.forFeature([VINDetailsEffects, VinRecallEffects]),
  ],
  providers: [CarMDService],
})
export class CarMDModule {}
