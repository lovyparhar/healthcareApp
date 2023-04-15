import { Component, OnInit, ViewChild } from '@angular/core';
// import * as Stomp from 'stompjs';
// import * as SockJS from 'sockjs-client';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from '../_services/global.service';
import { ModalService } from '../_services/modal.service';
import { PatientAuthenticationService } from '../_services/patient-authentication.service';
import { ConsentService } from '../_services/consent.service';

@Component({
  selector: 'app-medical-records',
  templateUrl: './medical-records.component.html',
  styleUrls: ['./medical-records.component.scss'],
})
export class MedicalRecordsComponent implements OnInit {
  getRecordsForm!: FormGroup;
  @ViewChild('fform') getRecordsFormDirective!: any;
  state: any;
  recordList: any;
  formErrors: any = {
    sourcehospital: '',
    department: '',
  };

  validationMessages: any = {
    sourcehospital: {
      required: 'Source Hospital is required.',
    },
    department: {
      required: 'daterange is required.',
    },
  };
  sourceHospitals: any = ['H1', 'H2'];
  departments: any = ['All departments', 'Radiology', 'Urology', 'Oncology'];

  constructor(
    private authenticationService: PatientAuthenticationService,
    private router: Router,
    public globalService: GlobalService,
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private consentService: ConsentService
  ) {
    this.createForm();
    this.state = this.router.getCurrentNavigation()?.extras.state;
  }

  createForm(): void {
    this.getRecordsForm = this.formBuilder.group({
      sourcehospital: ['', [Validators.required]],
      department: ['', [Validators.required]],
    });

    this.getRecordsForm.valueChanges.subscribe((data) =>
      this.onValueChanged(data)
    );

    this.onValueChanged(); // (re)set form validation messages
  }

  onValueChanged(data?: any) {
    if (!this.getRecordsForm) {
      return;
    }

    const form = this.getRecordsForm;
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

  getRecords() {
    console.log(this.getRecordsForm.value);

    this.consentService
      .request_data(
        this.getRecordsForm.value.sourcehospital,
        this.getRecordsForm.value.department
      )
      ?.subscribe(
        (data) => {
          this.modalService.displayOkDialog(
            'Data Arriving soon.',
            'Please use refresh button below to get records '
          );
        },
        (error) => {
          this.modalService.displayError(error);
        }
      );

    this.getRecordsFormDirective.resetForm();
    this.getRecordsForm.reset({
      sourcehospital: '',
      department: '',
    });
  }
  fetchRecords() {
    this.consentService.fetchData()?.subscribe((data) => {
      console.log(data);
      this.recordList = data;
    });
  }
  clearRecords() {
    this.modalService
      .confirmationDialog(
        'Confirm',
        'Are you sure you want to clear all requested records?'
      )
      ?.subscribe((res) => {
        if (res === 'y') {
          this.consentService.clearRecords()?.subscribe((data) => {
            this.modalService.displayOkDialog('Records Cleared', '');
            // window.location.reload();
            let currentUrl = this.router.url;
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate([currentUrl]);
              });
          });
        }
      });
  }
  ngOnInit(): void {
    this.consentService.clearRecords().subscribe((data) => {});
  }
}
