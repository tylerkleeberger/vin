import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { CarMDService } from './carmd.service';
import { FEATURE_NAME, featureReducer } from './store/feature.state';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature(FEATURE_NAME, featureReducer)],
  providers: [CarMDService],
})
export class CarMDModule {}
