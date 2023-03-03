import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from '../_services/global.service';
import { ModalService } from '../_services/modal.service';
import { PatientAuthenticationService } from '../_services/patient-authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  @ViewChild('fform') changePasswordFormDirective!: any;
  state: any;

  formErrors: any = {
    new_password: '',
  };

  validationMessages: any = {
    new_password: {
      required: 'Password is required.',
    },
  };
  
  constructor(
    private authenticationService: PatientAuthenticationService,
    private router: Router,
    private globalService: GlobalService,
    private formBuilder: FormBuilder,
    private modalService: ModalService) { 
      this.createForm();
  }

  ngOnInit(): void {
  }

  change_password(): void {
    let new_password = this.changePasswordForm.value.new_password;

    this.changePasswordFormDirective.resetForm();
    this.changePasswordForm.reset({
      new_password: '',
    });

    this.authenticationService.change_password(new_password)
    .pipe(
      catchError(
        (error: HttpErrorResponse) => {
          console.log(error);
          this.modalService.displayError(
            error,
            'Change Password error'
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
        }
      });
  }

  createForm(): void {
    this.changePasswordForm = this.formBuilder.group({
      new_password: ['', [Validators.required]],
    });

    this.changePasswordForm.valueChanges.subscribe((data) => this.onValueChanged(data));

    this.onValueChanged(); // (re)set form validation messages
  }

  onValueChanged(data?: any) {
    if (!this.changePasswordForm) {
      return;
    }

    const form = this.changePasswordForm;
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
}
