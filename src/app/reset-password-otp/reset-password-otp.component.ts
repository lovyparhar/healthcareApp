import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { GlobalService } from '../_services/global.service';
import { ModalService } from '../_services/modal.service';
import { PatientAuthenticationService } from '../_services/patient-authentication.service';

@Component({
  selector: 'app-reset-password-otp',
  templateUrl: './reset-password-otp.component.html',
  styleUrls: ['./reset-password-otp.component.scss']
})
export class ResetPasswordOTPComponent implements OnInit {
  resetPasswordOTPForm!: FormGroup;
  @ViewChild('fform') resetPasswordOTPFormDirective!: any;
  state: any;

  formErrors: any = {
    otp: '',
    new_password: ''
  };

  validationMessages: any = {
    otp: {
      required: 'Aadhar is required.',
    },
    new_password: {
      required: 'Mobile number is required.'
    }
  };

  constructor(private authenticationService: PatientAuthenticationService,
    private router: Router,
    private globalService: GlobalService,
    private formBuilder: FormBuilder,
    private modalService: ModalService) { 
      this.createForm();
      this.state = this.router.getCurrentNavigation()?.extras.state;
    }

  ngOnInit(): void {

  }

  createForm(): void {
    this.resetPasswordOTPForm = this.formBuilder.group({
      otp: ['', [Validators.required]],
      new_password: ['', [Validators.required]]
    });

    this.resetPasswordOTPForm.valueChanges.subscribe((data) => this.onValueChanged(data));

    this.onValueChanged(); // (re)set form validation messages
  }

  onValueChanged(data?: any) {
    if (!this.resetPasswordOTPForm) {
      return;
    }

    const form = this.resetPasswordOTPForm;
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

  verify_otp() {
    let otp = this.resetPasswordOTPForm.value.otp;
    let new_password = this.resetPasswordOTPForm.value.new_password;

    this.resetPasswordOTPFormDirective.resetForm();
    this.resetPasswordOTPForm.reset({
      otp: '',
      new_password: ''
    });

    this.authenticationService.verify_reset_otp(this.state.mobile, otp, new_password, this.state.aadhar)
    .pipe(
      catchError(
        (error: HttpErrorResponse) => {
          console.log(error);
          this.modalService.displayError(
            error,
            'Reset Password OTP error'
          );
          return of(false);
        }
      ) 
    )
    .subscribe( 
      (data: any) => {
        if(data) {
          console.log(data);
          this.modalService.displayOkDialog(data.title, data.payload);
          this.router.navigate(["/login"]);
        }
      });
  }

}
