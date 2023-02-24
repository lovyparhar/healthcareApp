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
  selector: 'app-patient-login',
  templateUrl: './patient-login.component.html',
  styleUrls: ['./patient-login.component.scss'],
})
export class PatientLoginComponent implements OnInit {
  loginForm!: FormGroup;
  @ViewChild('fform') loginFormDirective!: any;
  state: any;

  formErrors: any = {
    adhaar: '',
    password: '',
  };

  validationMessages: any = {
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
      this.loginForm.get('adhaar')!.setValue(this.state.adhaar);
    }
  }
  createForm(): void {
    this.loginForm = this.formBuilder.group({
      adhaar: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.loginForm.valueChanges.subscribe((data) => this.onValueChanged(data));

    this.onValueChanged(); // (re)set form validation messages
  }
  onValueChanged(data?: any) {
    if (!this.loginForm) {
      return;
    }

    const form = this.loginForm;
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

  login() {
    // if (!this.globalService.currentCredentials) {
    let adhaar = this.loginForm.value.adhaar;
    let password = this.loginForm.value.password;

    this.loginFormDirective.resetForm();
    this.loginForm.reset({
      adhaar: '',
      password: '',
    });

    this.authenticationService.login(adhaar, password).subscribe(
      (data: any) => {
        this.postLogin();
        // this.modalService.displayOkDialog('Login Successful!', '');
      },
      (error: any) => {
        console.log(error);
        // this.modalService.displayOkDialog(
        //   'Login Error',
        //   'The username/password is not valid.'
        // );
      }
    );
    // }
  }

  postLogin()
  {
    console.log("Hello dashboard");
    this.router.navigate(['dashboard']);
  }
  logout() {
    this.globalService.eraseCredentials();
  }

  ngOnInit(): void { }
}
