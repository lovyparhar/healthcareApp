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
    public globalService: GlobalService,
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private consentService: ConsentService
  ) {}

  ngOnInit(): void {
    if (this.globalService.currentCredentials) {
      this.consentService.getConsents()?.subscribe((data: any) => {
        console.log(data);
        this.pendingConsentList = data;
      });
    }
  }
}
