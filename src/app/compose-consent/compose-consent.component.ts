import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ConsentService } from '../_services/consent.service';
import { GlobalService } from '../_services/global.service';
import { ModalService } from '../_services/modal.service';
import { PatientAuthenticationService } from '../_services/patient-authentication.service';
@Component({
  selector: 'app-compose-consent',
  templateUrl: './compose-consent.component.html',
  styleUrls: ['./compose-consent.component.scss'],
})
export class ComposeConsentComponent implements OnInit {
  consentForm!: FormGroup;
  @ViewChild('fform') consentFormDirective!: any;
  state: any;

  formErrors: any = {
    sourcehospital: '',
    destinationhospital: '',
    startdate: '',
    enddate: '',
  };

  validationMessages: any = {
    sourcehospital: {
      required: 'Source Hospital is required.',
    },
    destinationhospital: {
      required: 'Source Hospital is required.',
    },
    startdate: {
      required: 'daterange is required.',
    },
    enddate: {
      required: 'daterange is required.',
    },
  };
  sourceHospitals: any = ['H1', 'H2', 'H3'];
  destinationHospitals: any = ['H1', 'H2', 'H3'];

  constructor(
    private authenticationService: PatientAuthenticationService,
    private router: Router,
    private globalService: GlobalService,
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private consentService: ConsentService
  ) {
    this.createForm();
    this.state = this.router.getCurrentNavigation()?.extras.state;

    // if (this.state && this.state.sourcehospital) {
    //   this.consentForm.get('sourcehospital')!.setValue(this.state.sourcehospital);
    // }
  }
  createForm(): void {
    this.consentForm = this.formBuilder.group({
      sourcehospital: ['', [Validators.required]],
      destinationhospital: ['', [Validators.required]],
      startdate: ['', [Validators.required]],
      enddate: ['', [Validators.required]],
    });

    this.consentForm.valueChanges.subscribe((data) =>
      this.onValueChanged(data)
    );

    this.onValueChanged(); // (re)set form validation messages
  }
  onValueChanged(data?: any) {
    if (!this.consentForm) {
      return;
    }

    const form = this.consentForm;
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
  composeConsent() {
    const isoString = this.consentForm.value.startdate
      .toISOString()
      .slice(0, 19);

    this.consentService
      .compose_consent(
        this.consentForm.value.sourcehospital,
        this.consentForm.value.destinationhospital,
        this.consentForm.value.startdate.toISOString().slice(0, 19),
        this.consentForm.value.enddate.toISOString().slice(0, 19)
      )
      ?.subscribe((data) => {
        this.modalService.displayOkDialog('Consent Created Successfully!', '');
        // this.router.navigate(['composeconsent']);
        window.location.reload()

      });
  }

  ngOnInit(): void {}
}
