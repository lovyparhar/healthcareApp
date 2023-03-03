import { Component, OnInit, ViewChild } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from '../_services/global.service';
import { ModalService } from '../_services/modal.service';
import { PatientAuthenticationService } from '../_services/patient-authentication.service';

@Component({
  selector: 'app-medical-records',
  templateUrl: './medical-records.component.html',
  styleUrls: ['./medical-records.component.scss']
})
export class MedicalRecordsComponent implements OnInit {
  getRecordsForm!: FormGroup;
  @ViewChild('fform') consentFormDirective!: any;
  state: any;

  private serverUrl = 'http://localhost:8082/patientSocket'
  private stompClient!: Stomp.Client;

  formErrors: any = {
    sourcehospital: '',
    startdate: '',
    enddate: '',
  };

  validationMessages: any = {
    sourcehospital: {
      required: 'Source Hospital is required.',
    },
    startdate: {
      required: 'daterange is required.',
    },
    enddate: {
      required: 'daterange is required.',
    },
  };
  sourceHospitals: any = ['H1', 'H2', 'H3'];

  constructor(
    private authenticationService: PatientAuthenticationService,
    private router: Router,
    public globalService: GlobalService,
    private formBuilder: FormBuilder,
    private modalService: ModalService
  ) {
    this.createForm();
    this.state = this.router.getCurrentNavigation()?.extras.state;
    this.initializeWebSocketConnection();
  }

  createForm(): void {
    this.getRecordsForm = this.formBuilder.group({
      sourcehospital: ['', [Validators.required]],
      startdate: ['', [Validators.required]],
      enddate: ['', [Validators.required]],
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
  }

  ngOnInit(): void {}

  initializeWebSocketConnection(){
    let ws: WebSocket = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    that.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/sendData", (message: any) => {
        that.onMessageReceived(message);
      });
    });
  }

  onMessageReceived(message: any) {
    console.log(message);
    let data = JSON.parse(message.body);
    this.globalService.addRecord(data);
  }
}
