import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentDetailsComponent } from './apartment-details.component';

describe('ApartmentDetails', () => {
  let component: ApartmentDetailsComponent;
  let fixture: ComponentFixture<ApartmentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApartmentDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ApartmentDetailsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
