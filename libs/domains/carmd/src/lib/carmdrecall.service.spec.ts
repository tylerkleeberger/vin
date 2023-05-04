import { TestBed } from '@angular/core/testing';

import { CarmdrecallService } from './carmdrecall.service';

describe('CarmdrecallService', () => {
  let service: CarmdrecallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarmdrecallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
