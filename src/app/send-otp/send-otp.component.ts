import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from '../_services/global.service';
import { ModalService } from '../_services/modal.service';
import { PatientAuthenticationService } from '../_services/patient-authentication.service';

@Component({
  selector: 'app-send-otp',
  templateUrl: './send-otp.component.html',
  styleUrls: ['./send-otp.component.scss'],
})
export class SendOTPComponent implements OnInit {
  sendOTPForm!: FormGroup;
  @ViewChild('fform') sendOTPFormDirective!: any;
  state: any;

  formErrors: any = {
    phoneNumber: '',
  };

  validationMessages: any = {
    phoneNumber: {
      required: 'Phone Number is required.',
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
    this.sendOTPForm = this.formBuilder.group({
      phoneNumber: ['', [Validators.required]],
    });

    this.sendOTPForm.valueChanges.subscribe((data) =>
      this.onValueChanged(data)
    );

    this.onValueChanged(); // (re)set form validation messages
  }
  onValueChanged(data?: any) {
    if (!this.sendOTPForm) {
      return;
    }

    const form = this.sendOTPForm;
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
  sendOTP() {
    let phoneNumber = this.sendOTPForm.value.phoneNumber;

    this.sendOTPFormDirective.resetForm();
    this.sendOTPForm.reset({
      phoneNumber: '',
    });

    this.authenticationService.sendOTP(phoneNumber).subscribe(
      (data: any) => {
        this.modalService.displayOkDialog(
          'OTP sent',
          'Please enter the OTP sent to the given number.'
        );

        this.router.navigate(['/verifyotp'], {
          state: { phoneNumber: phoneNumber, newPatient: true }, //sending patient data and role.
        });
      },
      (error: any) => {
        // console.log(error);
        this.modalService.displayOkDialog(
          'Phone Number not valid!',
          'Please enter again.'
        );
        this.router.navigate(['/sendotp']);
      }
    );
  }
  ngOnInit(): void {}
}
