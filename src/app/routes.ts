import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { PatientPortalComponent } from "./patient-portal/patient-portal.component";
import { HospitalPortalComponent } from "./hospital-portal/hospital-portal.component";
import { PatientRegisterComponent } from "./patient-register/patient-register.component";
import { PatientDashboardComponent } from "./patient-dashboard/patient-dashboard.component";


export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', component: HomeComponent },
    { path: 'patientPortal', component: PatientPortalComponent },
    { path: 'patientPortal/register', component: PatientRegisterComponent },
    { path: 'patientPortal/dashboard', component: PatientDashboardComponent },
    { path: 'hospitalPortal', component: HospitalPortalComponent }
  ];