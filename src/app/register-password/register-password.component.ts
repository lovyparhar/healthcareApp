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
    email: '',
  };

  validationMessages: any = {
    password: {
      required: 'password is required.',
    },
    email: {
      required: 'email is required.',
    },
  };
  constructor(
    private authenticationService: PatientAuthenticationService,
    private router: Router,
    private consentservice: ConsentService,
    private globalService: GlobalService,
    private formBuilder: FormBuilder,
    private modalService: ModalService
  ) {
    this.state = this.router.getCurrentNavigation()?.extras.state;
    this.createForm();
  }

  ngOnInit(): void {}
  createForm(): void {
    this.registerForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      email: ['', [Validators.required]],
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
    let firstname = this.state.firstName;
    let lastname = this.state.lastName;
    let email = this.registerForm.value.email;
    let dateOfBirth = this.state.dateOfBirth;

    // const [year, month, day] = dateOfBirth.split('-');
    // const formattedDateISO = `${year}-${month}-${day}T00:00:00`;

    let phoneNumber = this.state.phoneNumber;
    let password = this.registerForm.value.password;
    let aadhar = this.state.aadhar;
    let godFatherName = this.state.godFatherName;
    let godFatherNumber = this.state.godFatherNumber;

    this.registerFormDirective.resetForm();
    this.registerForm.reset({
      password: '',
      email: '',
    });

    this.authenticationService
      .register(
        firstname,
        lastname,
        email,
        aadhar,
        password,
        dateOfBirth,
        phoneNumber,
        godFatherName,
        godFatherNumber
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
  }
}
