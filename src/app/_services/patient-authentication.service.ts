import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class PatientAuthenticationService {
  constructor(private globalService: GlobalService, private http: HttpClient) {}

  login(aadhar: string, password: string) {
    let postUrl = this.globalService.patientRootUrl + '/auth/login';
    console.log(postUrl);

    return this.http
      .post<any>(postUrl, { aadhar: aadhar, password: password })
      .pipe(
        map((credentials) => {
          console.log('The Username and password', aadhar, ' ', password);
          console.log('The Credentials is ', credentials);

          // login successful if there's a jwt token in the response
          if (credentials) {
            this.globalService.saveCredentials(JSON.stringify(credentials));
          }

          return credentials;
        })
      );
  }

  register(
    firstname: string,
    lastname: string,
    email: string,
    aadhar: string,
    password: string,
    dateOfBirth: string,
    phoneNumber: string
  ) {
    let postUrl = this.globalService.patientRootUrl + '/auth/register';
    console.log(postUrl);

    return this.http
      .post<any>(postUrl, {
        firstname: firstname,
        lastname: lastname,
        aadhar: aadhar,
        password: password,
        email: email,
        dateOfBirth: dateOfBirth,
        phoneNumber: phoneNumber,
      })
      .pipe(
        map((credentials) => {
          // login successful if there's a jwt token in the response
          return credentials;
        })
      );
  }
  registerdemographic(
    firstname: string,
    lastname: string,
    aadhar: string,
    dateOfBirth: string,
    phoneNumber: string
  ) {
    let postUrl =
      this.globalService.patientRootUrl + '/auth/add-user-demographic';
    console.log(postUrl);

    return this.http
      .post<any>(postUrl, {
        firstName: firstname,
        lastName: lastname,
        aadhar: aadhar,
        dateOfBirth: dateOfBirth,
        phoneNumber: phoneNumber,
      })
      .pipe(
        map((credentials) => {
          // login successful if there's a jwt token in the response
          return credentials;
        })
      );
  }

  verifyPatient(aadhar: string) {
    let postUrl =
      this.globalService.patientRootUrl + '/auth/get-user-demographic';
    console.log(postUrl, aadhar);

    return this.http.post<any>(postUrl, { aadhar: aadhar });
  }
  sendOTP(phoneNumber: string) {
    let postUrl = this.globalService.patientRootUrl + '/auth/send-generic-otp';
    console.log(postUrl, phoneNumber);

    return this.http.post<any>(postUrl, { phoneNumber: phoneNumber });
  }
  verifyOTP(otp: string, state: any) {
    let postUrl =
      this.globalService.patientRootUrl + '/auth/verify-generic-otp';

    if (state.newPatient) {
      return this.http.post<any>(postUrl, { phoneNumber: state.phoneNumber, otp: otp });
    } else {
      return this.http.post<any>(postUrl, { aadhar: state.aadhar, otp: otp });
    }
  }
  change_password(new_password: string) {
    let postUrl = this.globalService.patientRootUrl + '/auth/change-password';
    console.log(postUrl);

    return this.http.post<any>(postUrl, { password: new_password });
  }

  reset_password(aadhar: string, mobile: string) {
    let postUrl = this.globalService.patientRootUrl + '/auth/send-otp';
    console.log(postUrl);

    return this.http.post<any>(postUrl, {
      aadhar: aadhar,
      phoneNumber: mobile,
    });
  }

  verify_reset_otp(
    phoneNumber: string,
    otp: string,
    password: string,
    aadhar: string
  ) {
    let postUrl = this.globalService.patientRootUrl + '/auth/verify-otp';
    console.log(postUrl);

    return this.http.patch<any>(postUrl, {
      phoneNumber: phoneNumber,
      otp: otp,
      password: password,
      aadhar: aadhar,
    });
  }

  logout() {
    // return this.http.post((this.globalService.patientRootUrl + '/logout'), {});
  }
}
