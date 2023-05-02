import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarMDService } from './carmd.service';

@NgModule({
  imports: [CommonModule],
  providers: [CarMDService],
})
export class CarMDModule {}
