import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from '../_services/global.service';
import { ModalService } from '../_services/modal.service';
import { PatientAuthenticationService } from '../_services/patient-authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  @ViewChild('fform') resetPasswordFormDirective!: any;

  formErrors: any = {
    aadhar: '',
    mobile: ''
  };

  validationMessages: any = {
    aadhar: {
      required: 'Aadhar is required.',
    },
    mobile: {
      required: 'Mobile number is required.'
    }
  };

  constructor(private authenticationService: PatientAuthenticationService,
    private router: Router,
    private globalService: GlobalService,
    private formBuilder: FormBuilder,
    private modalService: ModalService) { 
      this.createForm();
    }

  ngOnInit(): void {

  }

  createForm(): void {
    this.resetPasswordForm = this.formBuilder.group({
      aadhar: ['', [Validators.required]],
      mobile: ['', [Validators.required]]
    });

    this.resetPasswordForm.valueChanges.subscribe((data) => this.onValueChanged(data));

    this.onValueChanged(); // (re)set form validation messages
  }

  onValueChanged(data?: any) {
    if (!this.resetPasswordForm) {
      return;
    }

    const form = this.resetPasswordForm;
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

  reset_password() {
    let aadhar = this.resetPasswordForm.value.aadhar;
    let mobile = this.resetPasswordForm.value.mobile;

    this.resetPasswordFormDirective.resetForm();
    this.resetPasswordForm.reset({
      aadhar: '',
      mobile: ''
    });

    this.authenticationService.reset_password(aadhar, mobile)
    .pipe(
      catchError(
        (error: HttpErrorResponse) => {
          console.log(error);
          this.modalService.displayError(
            error,
            'Reset Password error'
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
          this.router.navigate(['/verify_reset_otp'], {state: {aadhar: aadhar, mobile: mobile}})
        }
      });
  }

}
