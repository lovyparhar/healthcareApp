import { TestBed } from '@angular/core/testing';

import { PatientAuthenticationService } from './patient-authentication.service';

describe('PatientAuthenticationService', () => {
  let service: PatientAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
