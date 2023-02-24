import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { PatientPortalComponent } from "./patient-portal/patient-portal.component";
import { HospitalPortalComponent } from "./hospital-portal/hospital-portal.component";
import { PatientRegisterComponent } from "./patient-register/patient-register.component";
import { PatientDashboardComponent } from "./patient-dashboard/patient-dashboard.component";
import { MedicalRecordsComponent } from "./medical-records/medical-records.component";
import { ComposeConsentComponent } from "./compose-consent/compose-consent.component";
import { PendingConsentsComponent } from "./pending-consents/pending-consents.component";


export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', component: HomeComponent },
    { path: 'medicalrecords', component: MedicalRecordsComponent },
    { path: 'composeconsent', component: ComposeConsentComponent },
    { path: 'pendingconsents', component: PendingConsentsComponent },
    { path: 'patientPortal', component: PatientPortalComponent },
    { path: 'patientPortal/register', component: PatientRegisterComponent },
    { path: 'patientPortal/dashboard', component: PatientDashboardComponent },
    { path: 'hospitalPortal', component: HospitalPortalComponent }
  ];