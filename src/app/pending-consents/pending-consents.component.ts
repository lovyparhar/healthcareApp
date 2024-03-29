import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConsentService } from '../_services/consent.service';
import { GlobalService } from '../_services/global.service';
import { ModalService } from '../_services/modal.service';
import { PatientAuthenticationService } from '../_services/patient-authentication.service';

@Component({
  selector: 'app-pending-consents',
  templateUrl: './pending-consents.component.html',
  styleUrls: ['./pending-consents.component.scss'],
})
export class PendingConsentsComponent implements OnInit {
  pendingConsentList: any;
  constructor(
    private authenticationService: PatientAuthenticationService,
    private router: Router,
    private modalService: ModalService,
    public globalService: GlobalService,
    private consentService: ConsentService
  ) {}

  approveConsent(consent: any) {
    console.log(consent);
    this.modalService
      .confirmationDialog(
        'Confirm',
        'Are you sure you want to approve this consent?'
      )
      ?.subscribe((res) => {
        if (res === 'y') {
          this.consentService.approveConsent(consent)?.subscribe((data) => {
            this.modalService.displayOkDialog('Consent Approved', '');
            let currentUrl = this.router.url;
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate([currentUrl]);
              });
          });
        }
      });
  }
  rejectConsent(consent: any) {
    console.log(consent);
    this.modalService
      .confirmationDialog(
        'Confirm',
        'Are you sure you want to reject this consent?'
      )
      ?.subscribe((res) => {
        if (res === 'y') {
          this.consentService.rejectConsent(consent)?.subscribe((data) => {
            this.modalService.displayOkDialog('Consent rejected', '');
            let currentUrl = this.router.url;
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate([currentUrl]);
              });
          });
        }
      });
  }
  editApproveConsent(consent: any) {
    this.router.navigate(['/editapproveconsent'], { state: consent });
  }
  ngOnInit(): void {
    if (this.globalService.currentCredentials) {
      this.consentService.getConsents()?.subscribe((data: any) => {
        this.pendingConsentList = data;
      });
    }
  }
}
