import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsentService } from '../_services/consent.service';
import { GlobalService } from '../_services/global.service';
import { ModalService } from '../_services/modal.service';
import { PatientAuthenticationService } from '../_services/patient-authentication.service';

@Component({
  selector: 'app-approved-consents',
  templateUrl: './approved-consents.component.html',
  styleUrls: ['./approved-consents.component.scss']
})
export class ApprovedConsentsComponent implements OnInit {

  approvedConsentList: any;
  constructor(
    private authenticationService: PatientAuthenticationService,
    private router: Router,
    private modalService: ModalService,
    public globalService: GlobalService,
    private consentService: ConsentService
  ) {}

  revokeConsent(consent: any) {
    console.log(consent);
    this.modalService
      .confirmationDialog(
        'Confirm',
        'Are you sure you want to revoke this consent?'
      )
      ?.subscribe((res) => {
        if (res === 'y') {
          this.consentService.revokeConsent(consent)?.subscribe((data) => {
            this.modalService.displayOkDialog('Consent will be revoked', '');
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

  ngOnInit(): void {
    if (this.globalService.currentCredentials) {
      this.consentService.getApprovedConsents()?.subscribe((data: any) => {
        this.approvedConsentList = data;
      });
    }
  }

}
