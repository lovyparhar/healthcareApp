import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  patientRootUrl: string = 'http://127.0.0.1:8080';
  constructor() {}

  saveCredentials(cred: string): void {
    localStorage.setItem('currentCredentials', cred);
  }
  get currentCredentials(): any {
    const currCredentials = localStorage.getItem('currentCredentials');
    if (currCredentials) return JSON.parse(currCredentials);
    else return null;
  }
  eraseCredentials(): void {
    localStorage.removeItem('currentCredentials');
  }
}
