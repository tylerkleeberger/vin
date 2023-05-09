import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VinLookupPage } from './vin-lookup.page';

describe('VinLookupPage', () => {
  let component: VinLookupPage;
  let fixture: ComponentFixture<VinLookupPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VinLookupPage],
    }).compileComponents();

    fixture = TestBed.createComponent(VinLookupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
