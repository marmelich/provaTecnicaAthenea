import { Component } from '@angular/core';
import { Patient } from '../../interfaces/patient';
import { ActivatedRoute } from '@angular/router';
import { PatientsService } from '../../services/patients.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'patient-detail',
  imports: [AsyncPipe, CommonModule, FormsModule],
  templateUrl: './patient-detail.html',
  styleUrl: './patient-detail.css',
})

export class PatientDetail {
  
  public patient$!: Observable<Patient> //pacient lectura
  public editablePatient!: Patient; //pacient editar
  public isEditing = false;

  constructor(private route: ActivatedRoute, private service: PatientsService, private router: Router, private cdr: ChangeDetectorRef) {

  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.loadPatient(id);
  }

  private loadPatient(id: string) {
    this.patient$ = this.service.getPatientById(id); 

    //copia del editable
    this.patient$.subscribe(p => {
      this.editablePatient = { ...p };
    });
  }

  //BUTTONS
  goHome() {
    this.router.navigate(['/'])
  }
  toggleEdit() {
    if (this.isEditing){
      this.savePatient();
    }
    this.isEditing = !this.isEditing;
  }

  savePatient() {
    this.service.editPatient(this.editablePatient).subscribe(resp => {
      console.log("Respuesta del backend:", resp);

      if (resp.patient) {
        this.loadPatient(resp.patient.id.toString());
        this.cdr.detectChanges();
      }

      this.isEditing = false;
    });
  }

}
