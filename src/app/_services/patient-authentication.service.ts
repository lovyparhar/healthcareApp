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

  login(adhaar: string, password: string) {
    let postUrl = this.globalService.patientRootUrl + '/auth/login';
    console.log(postUrl);

    return this.http
      .post<any>(postUrl, { aadhar: adhaar, password: password })
      .pipe(
        map((credentials) => {
          console.log('The Username and password', adhaar, ' ', password);
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
    adhaar: string,
    password: string
  ) {
    let postUrl = this.globalService.patientRootUrl + '/auth/register';
    console.log(postUrl);

    return this.http
      .post<any>(postUrl, {
        firstname: firstname,
        lastname: lastname,
        aadhar: adhaar,
        password: password,
        email: email
      })
      .pipe(
        map((credentials) => {
          console.log('The adhaar and password', adhaar, ' ', password);
          console.log('The Credentials is ', credentials);

          // login successful if there's a jwt token in the response
          if (credentials) {
            this.globalService.saveCredentials(JSON.stringify(credentials));
          }

          return credentials;
        })
      );
  }
  logout() {
    // return this.http.post((this.globalService.patientRootUrl + '/logout'), {});
  }
}
