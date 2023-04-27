import { Component, OnInit, ViewChild } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

import { GlobalService } from '../_services/global.service';
import { ModalService } from '../_services/modal.service';
import { ConsentService } from '../_services/consent.service';
@Component({
  selector: 'app-edit-approve-consent',
  templateUrl: './edit-approve-consent.component.html',
  styleUrls: ['./edit-approve-consent.component.scss'],
})
export class EditApproveConsentComponent implements OnInit {
  editApproveConsentForm!: FormGroup;
  @ViewChild('fform') editApproveConsentFormDirective!: any;
  consent: any;
  recordList: any;
  formErrors: any = {
    enddate: '',
  };

  validationMessages: any = {
    enddate: {
      required: 'Source Hospital is required.',
    },
   
  };
  constructor(
    private router: Router,
    public globalService: GlobalService,
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private consentService: ConsentService,
    private datePipe: DatePipe

  ) {
    this.createForm();
    this.consent = this.router.getCurrentNavigation()?.extras.state;
    if(!this.consent)
    {
      router.navigate(['/dashboard']);
    }
  }
  createForm(): void {
    this.editApproveConsentForm = this.formBuilder.group({
      enddate: ['', [Validators.required]],
    });

    this.editApproveConsentForm.valueChanges.subscribe((data) =>
      this.onValueChanged(data)
    );

    this.onValueChanged(); // (re)set form validation messages
  }

  onValueChanged(data?: any) {
    if (!this.editApproveConsentForm) {
      return;
    }

    const form = this.editApproveConsentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);

        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
  editApprove(){
    let myDate: Date = this.editApproveConsentForm.value.enddate;
    const enddate = this.datePipe.transform(myDate, 'yyyy-MM-ddTHH:mm:ss') as string;

    this.consent.endTime = enddate;
    this.modalService
      .confirmationDialog(
        'Confirm',
        'Are you sure you want to approve this consent?'
      )
      ?.subscribe((res) => {
        if (res === 'y') {
          this.consentService.approveConsent(this.consent)?.subscribe((data) => {
            this.modalService.displayOkDialog('Consent Approved', '');
            this.router.navigate(['dashboard']);
          });
        }
      });
  }
  ngOnInit(): void {}
}
