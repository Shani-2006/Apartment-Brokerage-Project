import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentForm } from './apartment-form.component';

describe('ApartmentForm', () => {
  let component: ApartmentForm;
  let fixture: ComponentFixture<ApartmentForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApartmentForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ApartmentForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
