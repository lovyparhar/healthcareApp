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
import { ApprovedConsentsComponent } from './approved-consents/approved-consents.component';
import { VerifyPatientComponent } from './verify-patient/verify-patient.component';
import { VerifyOTPComponent } from './verify-otp/verify-otp.component';
import { SendOTPComponent } from './send-otp/send-otp.component';
import { RegisterPasswordComponent } from './register-password/register-password.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [LoggedInGaurd] },
  { path: 'login', component: HomeComponent, canActivate: [LoggedInGaurd] },
  { path: '', component: HomeComponent, canActivate: [LoggedInGaurd] },
  { path: 'verifypatient', component: VerifyPatientComponent, canActivate: [LoggedInGaurd] },
  { path: 'register', component: PatientRegisterComponent, canActivate: [LoggedInGaurd] },
  { path: 'verifyotp', component: VerifyOTPComponent, canActivate: [LoggedInGaurd] },
  { path: 'sendotp', component: SendOTPComponent, canActivate: [LoggedInGaurd] },
  { path: 'registerpassword', component: RegisterPasswordComponent, canActivate: [LoggedInGaurd] },


  { path: 'change_password', component: ChangePasswordComponent, canActivate: [LoggedInGaurd] },
  { path: 'reset_password', component: ResetPasswordComponent, canActivate: [LoggedInGaurd] },
  { path: 'verify_reset_otp', component: ResetPasswordOTPComponent, canActivate: [LoggedInGaurd] },

  { path: 'editapproveconsent', component: EditApproveConsentComponent, canActivate: [AuthGuard]  },
  { path: 'medicalrecords', component: MedicalRecordsComponent, canActivate: [AuthGuard]  },
  { path: 'composeconsent', component: ComposeConsentComponent, canActivate: [AuthGuard]  },
  { path: 'pendingconsents', component: PendingConsentsComponent, canActivate: [AuthGuard]  },
  { path: 'approvedconsents', component: ApprovedConsentsComponent, canActivate: [AuthGuard]  },
  { path: 'dashboard', component: PatientDashboardComponent, canActivate: [AuthGuard]  },

];
