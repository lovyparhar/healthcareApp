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
    adhaar: '',
    password: '',
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
    adhaar: {
      required: 'adhaar is required.',
    },
    password: {
      required: 'Password is required.',
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

    if (this.state && this.state.adhaar) {
      this.registerForm.get('adhaar')!.setValue(this.state.adhaar);
    }
  }
  createForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      adhaar: ['', [Validators.required]],
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

  register() {
    // if (!this.globalService.currentCredentials) {
    let firstName = this.registerForm.value.firstName;
    let lastName = this.registerForm.value.lastName;
    let email = this.registerForm.value.email;
    let adhaar = this.registerForm.value.adhaar;
    let password = this.registerForm.value.password;

    this.registerFormDirective.resetForm();
    this.registerForm.reset({
      firstName: '',
      lastName: '',
      email: '',
      adhaar: '',
      password: '',
    });

    this.authenticationService
      .register(firstName, lastName, email, adhaar, password)
      .subscribe(
        (data: any) => {
          this.postregister();
          this.modalService.displayOkDialog('register Successful!', '');
        },
        (error: any) => {
          console.log(error);
          // this.modalService.displayOkDialog(
          //   'register Error',
          //   'The username/password is not valid.'
          // );
        }
      );
    // }
  }
  postregister()
  {
    this.router.navigate(['home']);
  }
  ngOnInit(): void {}
}
