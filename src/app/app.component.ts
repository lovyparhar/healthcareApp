import { Component } from '@angular/core';
// import * as Stomp from 'stompjs';
// import * as SockJS from 'sockjs-client';
import { GlobalService } from './_services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'healthcareApp';

  private serverUrl = 'http://localhost:8082/patientSocket'
  // private stompClient!: Stomp.Client;

  constructor(public globalService: GlobalService) {
    // this.initializeWebSocketConnection();
  }
  
  ngOnInit() {
    if(this.globalService.currentCredentials) {
      this.globalService.loadRecords();
    }
    else {
      this.globalService.clearRecords();
    }
  }
  
  // initializeWebSocketConnection(){
  //   let ws: WebSocket = new SockJS(this.serverUrl);
  //   this.stompClient = Stomp.over(ws);
  //   let that = this;
  //   that.stompClient.connect({}, function (frame) {
  //     that.stompClient.subscribe("/sendData", (message: any) => {
  //       that.onMessageReceived(message);
  //     });
  //   });
  // }

  onMessageReceived(message: any) {
    console.log(message);
    let data = JSON.parse(message.body);
    this.globalService.addRecord(data);
  }
}
