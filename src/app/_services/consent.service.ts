import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ConsentService {
  constructor(private globalService: GlobalService, private http: HttpClient) {}

  request_data(sourceHospitalId: string) {
    if (!this.globalService.currentCredentials) return;

    let postUrl = this.globalService.patientRootUrl + '/consent/sendConsent';
    console.log(postUrl);

    let approved = true;
    let patientId = this.globalService.currentCredentials.aadhar;
    let destinationHospitalId = 'P';

    return this.http.post<any>(postUrl, {
      approved: approved,
      patientId: patientId,
      destinationHospitalId: destinationHospitalId,
      sourceHospitalId: sourceHospitalId,
    });
  }
  approveConsent(consent: any) {
    if (!this.globalService.currentCredentials) return;
    console.log(consent);
    let postUrl = this.globalService.patientRootUrl + '/consent/sendConsent';

    let approved = true; // Should be always true.
    let patientId = this.globalService.currentCredentials.aadhar;
    return this.http.post(
      postUrl,
      {
        approved: approved,
        patientId: patientId,
        destinationHospitalId: consent.destinationHospitalId,
        sourceHospitalId: consent.sourceHospitalId,
        department: consent.department,
        startTime: consent.startTime,
        endTime: consent.endTime,
      },
      { responseType: 'text' }
    );
  }
  compose_consent(
    sourceHospitalId: string,
    destinationHospitalId: string,
    startDate: string,
    endDate: string
  ) {
    if (!this.globalService.currentCredentials) return;

    let postUrl = this.globalService.patientRootUrl + '/consent/sendConsent';
    let approved = false; // Should be always true.
    let patientId = this.globalService.currentCredentials.aadhar;

    return this.http.post(
      postUrl,
      {
        approved: approved,
        patientId: patientId,
        destinationHospitalId: destinationHospitalId,
        sourceHospitalId: sourceHospitalId,
        startTime: startDate,
        endTime: endDate,
      },
      { responseType: 'text' }
    );
  }
  getConsents() {
    let postUrl =
      this.globalService.patientRootUrl + '/consent/getPendingConsents';
    return this.http.get(postUrl);
  }
}
