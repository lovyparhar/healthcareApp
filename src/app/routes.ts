import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PatientRegisterComponent } from './patient-register/patient-register.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { MedicalRecordsComponent } from './medical-records/medical-records.component';
import { ComposeConsentComponent } from './compose-consent/compose-consent.component';
import { PendingConsentsComponent } from './pending-consents/pending-consents.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordOTPComponent } from './reset-password-otp/reset-password-otp.component';
import { EditApproveConsentComponent } from './edit-approve-consent/edit-approve-consent.component';
import { AuthGuard } from './auth.gaurd';
import { LoggedInGaurd } from './loggedin.gaurd';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [LoggedInGaurd] },
  { path: 'login', component: HomeComponent, canActivate: [LoggedInGaurd] },
  { path: '', component: HomeComponent, canActivate: [LoggedInGaurd] },
  { path: 'medicalrecords', component: MedicalRecordsComponent, canActivate: [AuthGuard]  },
  { path: 'composeconsent', component: ComposeConsentComponent, canActivate: [AuthGuard]  },
  { path: 'pendingconsents', component: PendingConsentsComponent, canActivate: [AuthGuard]  },
  { path: 'register', component: PatientRegisterComponent },
  { path: 'dashboard', component: PatientDashboardComponent, canActivate: [AuthGuard]  },
  { path: 'change_password', component: ChangePasswordComponent },
  { path: 'reset_password', component: ResetPasswordComponent },
  { path: 'verify_reset_otp', component: ResetPasswordOTPComponent },
  { path: 'editapproveconsent', component: EditApproveConsentComponent, canActivate: [AuthGuard]  },
];
