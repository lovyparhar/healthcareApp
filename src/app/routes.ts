import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { PatientRegisterComponent } from "./patient-register/patient-register.component";
import { PatientDashboardComponent } from "./patient-dashboard/patient-dashboard.component";
import { MedicalRecordsComponent } from "./medical-records/medical-records.component";
import { ComposeConsentComponent } from "./compose-consent/compose-consent.component";
import { PendingConsentsComponent } from "./pending-consents/pending-consents.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { ResetPasswordOTPComponent } from "./reset-password-otp/reset-password-otp.component";


export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: HomeComponent },
    { path: '', component: HomeComponent },
    { path: 'medicalrecords', component: MedicalRecordsComponent },
    { path: 'composeconsent', component: ComposeConsentComponent },
    { path: 'pendingconsents', component: PendingConsentsComponent },
    { path: 'register', component: PatientRegisterComponent },
    { path: 'dashboard', component: PatientDashboardComponent },
    { path: 'change_password', component: ChangePasswordComponent },
    { path: 'reset_password', component: ResetPasswordComponent},
    {path: 'verify_reset_otp', component: ResetPasswordOTPComponent}
  ];