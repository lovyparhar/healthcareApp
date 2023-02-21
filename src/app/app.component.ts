import { Component } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'healthcareApp';

  private serverUrl = 'http://localhost:8080/patientSocket'
  private stompClient!: Stomp.Client;

  constructor() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection(){
    let ws: WebSocket = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    that.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/notify", (message: any) => {
        that.onMessageReceived(message);
      });
    });
  }

  onMessageReceived(message: any) {
    console.log(message);
  }
}
