import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckRecallPage } from './check-recall.page';

describe('CheckRecallPage', () => {
  let component: CheckRecallPage;
  let fixture: ComponentFixture<CheckRecallPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckRecallPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckRecallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
