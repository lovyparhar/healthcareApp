import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { PatientPortalComponent } from './patient-portal/patient-portal.component';
import { HospitalPortalComponent } from './hospital-portal/hospital-portal.component';
import { GlobalService } from './_services/global.service';
import { PatientLoginComponent } from './patient-login/patient-login.component';
import { PatientRegisterComponent } from './patient-register/patient-register.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { ComposeConsentComponent } from './compose-consent/compose-consent.component';
import { MedicalRecordsComponent } from './medical-records/medical-records.component';
import { PendingConsentsComponent } from './pending-consents/pending-consents.component';
import { JwtInterceptor } from './jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    PatientPortalComponent,
    HospitalPortalComponent,
    PatientLoginComponent,
    PatientRegisterComponent,
    PatientDashboardComponent,
    ComposeConsentComponent,
    MedicalRecordsComponent,
    PendingConsentsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
  ],
  providers: [
    GlobalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
