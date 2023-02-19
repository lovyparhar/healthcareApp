import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalPortalComponent } from './hospital-portal.component';

describe('HospitalPortalComponent', () => {
  let component: HospitalPortalComponent;
  let fixture: ComponentFixture<HospitalPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalPortalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
