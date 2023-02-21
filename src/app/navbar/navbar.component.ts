import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../_services/global.service';
import { ModalService } from '../_services/modal.service';
import { PatientAuthenticationService } from '../_services/patient-authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public globalservice: GlobalService,
    private router: Router,
    private authenticationService: PatientAuthenticationService,
    private modalService: ModalService) { }

  ngOnInit(): void {
  }
  logout() {

    let title = "Confirmation";
    let message = "Are you sure you want to log out?";
    this.modalService.confirmationDialog(title, message).subscribe(result => {
      console.log(result);

      // If the user wants to log out
      if(result === "y") {
        this.globalservice.eraseCredentials();
        this.router.navigate(['']);
        // this.authenticationService.logout()
        // .subscribe(
        //   result => {
        //     this.globals.eraseCredentials();
        //     this.modalService.displayOkDialog(`<div class="text-success">Logout Success</div>`, <string>result);
        //   },
        //   error => {
        //     console.log(error);
        //     this.modalService.displayOkDialog(`<div class="text-danger">Logout Error</div>`, '');
        //   });
      }      
    });
  }

}
