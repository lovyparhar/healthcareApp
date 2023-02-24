import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../_services/global.service';
import { ModalService } from '../_services/modal.service';
import { PatientAuthenticationService } from '../_services/patient-authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  userName: string;

  constructor(
    public globalservice: GlobalService,
    private router: Router,
    private authenticationService: PatientAuthenticationService,
    private modalService: ModalService
  ) {
    if (globalservice.currentCredentials) {
      this.userName = globalservice.currentCredentials.firstname;
    } else {
      this.userName = '';
    }
  }

  ngOnInit(): void {}

  dashboard() {
    if (this.globalservice.currentCredentials) {
      this.router.navigate(['dashboard']);
    } else {
      this.router.navigate(['']);
    }
  }
  logout() {
    let title = 'Confirmation';
    let message = 'Are you sure you want to log out?';
    this.modalService.confirmationDialog(title, message).subscribe((result) => {
      // If the user wants to log out
      if (result === 'y') {
        this.globalservice.eraseCredentials();
        this.router.navigate(['']);
      }
    });
  }
}
