import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { GlobalService } from './global.service';
import { ModalService } from './modal.service';
import { ConsentService } from './consent.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ConsentRequestSocketService {
  private serverUrl = 'http://localhost:8082/patientSocket';
  private stompClient!: Stomp.Client;

  constructor(
    private globalService: GlobalService,
    private modalService: ModalService,
    private consentService: ConsentService,
    private router: Router
  ) {}

  initializeWebSocketConnection() {
    if (this.globalService.currentCredentials) {
      let ws: WebSocket = new SockJS(this.serverUrl);
      this.stompClient = Stomp.over(ws);
      let that = this;
      that.stompClient.connect({}, function (frame) {
        that.stompClient.subscribe(
          '/user/' +
            that.globalService.currentCredentials.aadhar +
            '/consent-request',
          (message: any) => {
            that.onMessageReceived(message);
          }
        );
      });
    }
  }

  closeWebSocketConnection() {
    let that = this;
    that.stompClient.disconnect(function () {
      console.log('Disconnecting the socket connection');
    });
  }

  onMessageReceived(message: any) {
    // console.log(message);
    let data = JSON.parse(message.body);
    // console.log(data);

    let dmessage = `Consent Request received from <b>Hospital:  
    ${data.destinationHospitalId}</b> for accessing your data from the <br><b>Hospital: 
    ${data.sourceHospitalId}, Department: ${data.department}, till ${data.endTime}</b><br>
     You can approve the consent by going to Pending Consents on Dashboard`;
    this.modalService
      .displayApproveConsentDialog(
        `<div class="text-warning"> Consent Request Received </div>`,
        dmessage
      )
      .subscribe((res) => {
        if (res === 'Approve') {
          this.modalService
            .confirmationDialog(
              'Confirm',
              'Are you sure you want to approve this consent?'
            )
            ?.subscribe((res) => {
              if (res === 'y') {
                this.consentService
                  .approveConsent(data)
                  ?.subscribe((res) => {
                    this.modalService.displayOkDialog('Consent Approved', '');
                  });
              }
            });
        }
        else{
          this.router.navigate(['/editapproveconsent'], { state: data });
        }
      });
    // this.globalService.addRecord(data);
  }
}
