import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from '../_services/global.service';
import { ModalService } from '../_services/modal.service';
import { PatientAuthenticationService } from '../_services/patient-authentication.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss'],
})
export class VerifyOTPComponent implements OnInit {
  verifyPatientForm!: FormGroup;
  @ViewChild('fform') verifyPatientFormDirective!: any;
  state: any;

  formErrors: any = {
    otp: '',
  };

  validationMessages: any = {
    otp: {
      required: 'otp is required.',
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
    this.state = this.router.getCurrentNavigation()?.extras.state;
  }
  createForm(): void {
    this.verifyPatientForm = this.formBuilder.group({
      otp: ['', [Validators.required]],
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
  verifyOTP() {
    let otp = this.verifyPatientForm.value.otp;
    let aadhar = this.state.aadhar;
    this.verifyPatientFormDirective.resetForm();
    this.verifyPatientForm.reset({
      otp: '',
    });

    this.authenticationService.verifyOTP(otp, aadhar).subscribe(
      (data: any) => {
        this.modalService.displayOkDialog(
          'OTP Verified!',
          'Please create a password for your account.'
        );

        if (data) {
          console.log(data);
          this.router.navigate(['/registerpassword'], {
            state: data,
          });
        }
      },
      (error: any) => {
        // console.log(error);
        this.modalService.displayOkDialog(
          'OTP Incorrect',
          'Please enter correct OTP.'
        );
        let currentUrl = this.router.url;
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate([currentUrl], { state: { aadhar: aadhar } });
          });
      }
    );
  }
  ngOnInit(): void {}
}
