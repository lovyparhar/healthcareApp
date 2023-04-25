import {
  Component,
  OnInit,
  EventEmitter,
  Inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from '../_services/global.service';
import { ModalService } from '../_services/modal.service';
import { PatientAuthenticationService } from '../_services/patient-authentication.service';

@Component({
  selector: 'app-patient-register',
  templateUrl: './patient-register.component.html',
  styleUrls: ['./patient-register.component.scss'],
})
export class PatientRegisterComponent implements OnInit {
  registerForm!: FormGroup;
  @ViewChild('fform') registerFormDirective!: any;
  state: any;

  formErrors: any = {
    firstName: '',
    lastName: '',
    email: '',
    aadhar: '',
    password: '',
    dob: ''
  };

  validationMessages: any = {
    firstName: {
      required: 'First name is required.',
    },
    lastName: {
      required: 'Last Name is required.',
    },
    email: {
      required: 'Email is required.',
    },
    aadhar: {
      required: 'aadhar is required.',
    },
    password: {
      required: 'Password is required.',
    },
    dob: {
      required: 'Date of Birth is required.',
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
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      aadhar: ['', [Validators.required]],
      password: ['', [Validators.required]],
      dob: ['', [Validators.required]],

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

  register() {
    let firstName = this.registerForm.value.firstName;
    let lastName = this.registerForm.value.lastName;
    let email = this.registerForm.value.email;
    let aadhar = this.registerForm.value.aadhar;
    let password = this.registerForm.value.password;
    let dob = this.registerForm.value.dob;
    let phoneNumber = this.state.phoneNumber;
    console.log(phoneNumber);
    const [year, month, day] = dob.split('-');
    const formattedDateISO = `${year}-${month}-${day}T00:00:00`;
    const formattedDatedmy = `${day}/${month}/${year}`;

    this.registerFormDirective.resetForm();
    this.registerForm.reset({
      firstName: '',
      lastName: '',
      email: '',
      aadhar: '',
      password: '',
    });

    this.authenticationService
      .register(
        firstName,
        lastName,
        email,
        aadhar,
        password,
        formattedDatedmy,
        phoneNumber
      )
      .subscribe(
        (data: any) => {
          this.authenticationService
            .registerdemographic(
              firstName,
              lastName,
              aadhar,
              formattedDateISO,
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
  ngOnInit(): void {}
}
