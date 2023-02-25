import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../_services/global.service';
import { PatientAuthenticationService } from '../_services/patient-authentication.service';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss'],
})
export class PatientDashboardComponent implements OnInit {

  constructor(
    public globalservice: GlobalService,
    private authenticationService: PatientAuthenticationService
  ) {
  }

  ngOnInit(): void {}

}
