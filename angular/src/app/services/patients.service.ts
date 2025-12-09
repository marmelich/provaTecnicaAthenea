import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../interfaces/patient';
import { EditPatientResponse } from '../interfaces/EditPatientResponse'
import { CreatePatientResponse } from '../interfaces/CreatePatientResponse'

@Injectable({
  providedIn: 'root',
})

export class PatientsService {
  
  constructor(private http: HttpClient){
  
  }

  getPatients(): Observable<Patient[]>{
    return this.http.get<Patient[]>('http://localhost:8000/api/getPatients.php');
  }
  
  getPatientById(id: string): Observable<Patient> {
    return this.http.get<Patient>(`http://localhost:8000/api/getPatient.php?id=${id}`);
  }

  editPatient(patient: Patient): Observable<EditPatientResponse> {
    return this.http.put<EditPatientResponse>(`http://localhost:8000/api/editPatient.php`, patient);
  }

  createPatient(patient: Patient): Observable<CreatePatientResponse> {
    return this.http.post<CreatePatientResponse>(`http://localhost:8000/api/createPatient.php`, patient);
  }


}
