import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class ConsentService {

  constructor(private globalService: GlobalService, private http: HttpClient) { }

  request_data(sourceHospitalId: string) {

    if(!this.globalService.currentCredentials)
      return;

    let postUrl = this.globalService.patientRootUrl + '/consent/sendConsent';
    console.log(postUrl);

    let approved = true;
    let patientId = this.globalService.currentCredentials.aadhar;
    let destinationHospitalId = "P";

    return this.http.post<any>(postUrl, {approved: approved, patientId: patientId, destinationHospitalId: destinationHospitalId, sourceHospitalId: sourceHospitalId });
  }
}
