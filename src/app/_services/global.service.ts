import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  patientRootUrl: string = "http://127.0.0.1:8080"
  constructor() { }

  saveCredentials(cred: string) : void{
    localStorage.setItem('currentCredentials', cred);
  }

  eraseCredentials() : void{
    localStorage.removeItem('currentCredentials');
  }
}
