import { Component, OnInit } from '@angular/core';
import { PatientAuthenticationService } from '../_services/patient-authentication.service';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss']
})
export class PatientDashboardComponent implements OnInit {
  userName: string;

  constructor(private authenticationService: PatientAuthenticationService) {this.userName = "GGGG" }

  ngOnInit(): void {
  }

  sayHello() {
    this.authenticationService.hello().subscribe(
      (message) => {
        console.log(message);
      }
    );
  }

}
