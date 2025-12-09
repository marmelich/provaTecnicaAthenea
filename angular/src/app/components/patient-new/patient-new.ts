import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PatientsService } from '../../services/patients.service';
import { Patient } from '../../interfaces/patient';

@Component({
  selector: 'patient-new',
  imports: [FormsModule],
  templateUrl: './patient-new.html',
  styleUrl: './patient-new.css',
})

export class PatientNew {
  public newPatient: Patient = {
    id: 0, 
    nom: '',
    cognoms: '',
    dni: '',
    dataNaixement: '',
    poblacio: '',
    cip: ''
  };

  constructor(private router: Router, private service: PatientsService) {

  }

  goHome() {
    this.router.navigate(['/'])
  }

  createPatient() {
    this.service.createPatient(this.newPatient).subscribe(response => {
      if (response.success) {
        console.log("Created patient: ", response.patient);
        this.router.navigate(['/'])
      }
      else {
        console.error("Error creating patient: ", response.message)
      }
    },
    error => {
      console.error("Petition error: ", error)
    });
  }
}
