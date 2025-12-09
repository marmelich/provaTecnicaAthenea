import { Routes } from '@angular/router';
import { PatientsTable } from './components/patients-table/patients-table';
import { PatientDetail } from './components/patient-detail/patient-detail';
import { PatientNew } from './components/patient-new/patient-new';

export const routes: Routes = [
    { path: '', component: PatientsTable},
    { path: 'patient/:id', component: PatientDetail },
    { path: 'newPatient', component: PatientNew}

];
