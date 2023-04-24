import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyPatientComponent } from './verify-patient.component';

describe('VerifyPatientComponent', () => {
  let component: VerifyPatientComponent;
  let fixture: ComponentFixture<VerifyPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
