import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from '../_services/global.service';
import { ModalService } from '../_services/modal.service';
import { ConsentService } from '../_services/consent.service';
import { PatientAuthenticationService } from '../_services/patient-authentication.service';

@Component({
  selector: 'app-register-password',
  templateUrl: './register-password.component.html',
  styleUrls: ['./register-password.component.scss'],
})
export class RegisterPasswordComponent implements OnInit {
  state: any;
  registerForm!: FormGroup;
  @ViewChild('fform') registerFormDirective!: any;

  formErrors: any = {
    password: '',
  };

  validationMessages: any = {
    password: {
      required: 'password is required.',
    },
  };
  constructor(
    private authenticationService: PatientAuthenticationService,
    private router: Router,
    private consentservice: ConsentService,
    private globalService: GlobalService,
    private formBuilder: FormBuilder,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.state = this.router.getCurrentNavigation()?.extras.state;

    this.createForm();
    console.log(this.router.getCurrentNavigation());
  }
  createForm(): void {
    this.registerForm = this.formBuilder.group({
      password: ['', [Validators.required]],
    });

    this.registerForm.valueChanges.subscribe((data) =>
      this.onValueChanged(data)
    );

    this.onValueChanged(); // (re)set form validation messages
  }
  onValueChanged(data?: any) {
    if (!this.registerForm) {
      return;
    }

    const form = this.registerForm;
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

  record() {
    let firstname = this.state.firstname;
    let lastname = this.state.lastname;
    let email = this.state.email;
    let dateOfBirth = this.state.dateOfBirth;
    let phoneNumber = this.state.phoneNumber;
    let password = this.registerForm.value.password;
    let aadhar = this.state.aadhar;

    this.registerFormDirective.resetForm();
    this.registerForm.reset({
      password: '',
    });

    this.authenticationService
      .register(
        firstname,
        lastname,
        email,
        aadhar,
        password,
        dateOfBirth,
        phoneNumber
      )
      .subscribe(
        (data: any) => {
          this.authenticationService
            .registerdemographic(
              firstname,
              lastname,
              aadhar,
              dateOfBirth,
              phoneNumber
            )
            .subscribe(
              (data: any) => {
                this.modalService.displayOkDialog(
                  'User Registered Successfully!',
                  ''
                );
                this.router.navigate(['/login']);
              },
              (error: any) => {
                this.modalService.displayError(error);
              }
            );
        },
        (error: any) => {
          this.modalService.displayError(error);
        }
      );
  }
}
