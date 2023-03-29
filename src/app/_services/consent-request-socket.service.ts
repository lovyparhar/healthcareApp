import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { GlobalService } from './global.service';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root',
})
export class ConsentRequestSocketService {
  private serverUrl = 'http://localhost:8082/patientSocket';
  private stompClient!: Stomp.Client;

  constructor(
    private globalService: GlobalService,
    private modalService: ModalService
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

    let dmessage = `Consent Request received from Hospital:  
    ${data.destinationHospitalId} for accessing your data from the <br><b>Hospital: 
    ${data.sourceHospitalId}, Department: ${data.department}, till ${data.endTime}</b><br>
     You can approved the consent by going to Pending Consents on Dashboard`;
    this.modalService.displayOkDialog(
      `<div class="text-warning"> Consent Request Received </div>`,
      dmessage
    );
    // this.globalService.addRecord(data);
  }
}
