import { AsyncPipe } from '@angular/common';
import {Component, OnInit} from '@angular/core';
import { PatientsService } from '../../services/patients.service';
import { Observable } from 'rxjs';
import { Patient } from '../../interfaces/patient';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'patients-table',
  standalone: true,
  imports: [AsyncPipe, CommonModule, FormsModule],
  templateUrl: './patients-table.html',
  styleUrls: ['./patients-table.css'],
})

export class PatientsTable implements OnInit{

  public patientsResults$!: Observable<Patient[]>

  public paginationCurrentPage = 1;
  public paginationPageSize = 10;
  public paginationTotalPatients = 0;
  public paginationTotalPages = 0;

  public filters = {
    nom: '',
    cognoms: '',
    dataNaixement: '',
    dni: '',
    poblacio: '',
    cip: ''
  };

  constructor(private service: PatientsService, private router: Router){
    
  }
  
  ngOnInit(): void {
    this.patientsResults$ = this.service.getPatients();

    this.patientsResults$.subscribe(patients => {
    this.paginationTotalPatients = patients.length;
    this.paginationTotalPages = Math.ceil(this.paginationTotalPatients / this.paginationPageSize);
  });
  }

  //NAVIGATION
  onRowClicked(patient: any) {
    this.router.navigate(['/patient', patient.id]);
  }
  newPatient(){
    this.router.navigate(['newPatient']);
  }

  //FILTER
  filteredPatients(patients: Patient[]): Patient[] {
    const filtered = patients.filter(p => 
      p.nom.toLowerCase().includes(this.filters.nom.toLowerCase()) &&
      p.cognoms.toLowerCase().includes(this.filters.cognoms.toLowerCase()) &&
      p.dataNaixement.includes(this.filters.dataNaixement) &&
      p.dni.toLowerCase().includes(this.filters.dni.toLowerCase()) &&
      p.poblacio.toLowerCase().includes(this.filters.poblacio.toLowerCase()) &&
      p.cip.toLowerCase().includes(this.filters.cip.toLowerCase())
    );

    //para cuando se busca mientras se está en otra página
    if (this.paginationCurrentPage > Math.ceil(filtered.length / this.paginationPageSize)) {
      this.paginationCurrentPage = 1;
    }

    return filtered;
  }

  //PAGINATION
  paginationGetPagedPatients(patients: Patient[]): Patient[] {
    const filtered = this.filteredPatients(patients);
    this.paginationTotalPages = Math.ceil(filtered.length / this.paginationPageSize);

    const start = (this.paginationCurrentPage - 1) * this.paginationPageSize;
    return filtered.slice(start, start + this.paginationPageSize);
  }
  paginationNextPage() {
    if (this.paginationCurrentPage < this.paginationTotalPages) this.paginationCurrentPage++;
  }
  paginationPreviousPage() {
    if (this.paginationCurrentPage > 1) this.paginationCurrentPage--;
  }


}
