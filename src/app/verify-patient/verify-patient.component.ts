import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from '../_services/global.service';
import { ModalService } from '../_services/modal.service';
import { PatientAuthenticationService } from '../_services/patient-authentication.service';

@Component({
  selector: 'app-verify-patient',
  templateUrl: './verify-patient.component.html',
  styleUrls: ['./verify-patient.component.scss'],
})
export class VerifyPatientComponent implements OnInit {
  verifyPatientForm!: FormGroup;
  @ViewChild('fform') verifyPatientFormDirective!: any;
  state: any;

  formErrors: any = {
    aadhar: '',
  };

  validationMessages: any = {
    aadhar: {
      required: 'aadhar is required.',
    },
  };
  constructor(
    private authenticationService: PatientAuthenticationService,
    private router: Router,
    private globalService: GlobalService,
    private formBuilder: FormBuilder,
    private modalService: ModalService
  ) {
    this.createForm();
  }
  createForm(): void {
    this.verifyPatientForm = this.formBuilder.group({
      aadhar: ['', [Validators.required]],
    });

    this.verifyPatientForm.valueChanges.subscribe((data) =>
      this.onValueChanged(data)
    );

    this.onValueChanged(); // (re)set form validation messages
  }
  onValueChanged(data?: any) {
    if (!this.verifyPatientForm) {
      return;
    }

    const form = this.verifyPatientForm;
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
  verifyPatient() {
    let aadhar = this.verifyPatientForm.value.aadhar;

    this.verifyPatientFormDirective.resetForm();
    this.verifyPatientForm.reset({
      aadhar: '',
    });

    this.authenticationService.verifyPatient(aadhar).subscribe(
      (data: any) => {
        this.modalService.displayOkDialog(
          'User Found!',
          'Please enter the OTP sent to the registered number.'
        );

        this.router.navigate(['/verifyotp'], {
          state: { aadhar: aadhar, newPatient: false }, //sending patient data and role.
        });
      },
      (error: any) => {
        // console.log(error);
        this.modalService.displayOkDialog(
          'User Not Found!',
          'Please register a new user using phone number.'
        );
        this.router.navigate(['/sendotp'], { state: { aadhar: aadhar } });
      }
    );
  }
  ngOnInit(): void {}
}
