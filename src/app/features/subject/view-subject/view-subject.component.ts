import { Component, OnInit } from '@angular/core';
import { Subject } from '../../../data/models/subject/subject';
import { SubjectService } from '../../../data/services/subject/subject.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

interface City {
    name: string,
    code: string
}

@Component({
  selector: 'app-subject',
  templateUrl: './view-subject.component.html',
  styleUrl: './view-subject.component.scss'
})
export class ViewSubjectComponent implements OnInit{
  subjects!: Subject[];
  position: string = 'top';
  cities!: City[];
  totalRecords!: number;
  loading: boolean = false;
  selectAll: boolean = false;
  selectedCities!: City[];
  selectedCity!: City[];
  elementToRemoveList: any

  constructor(private subjectService: SubjectService, 
                private confirmationService: ConfirmationService, 
                private messageService: MessageService,
                private router: Router
               ) 
    {
      this.cities = [
            {name: 'Alvaro', code: 'NY'},
            {name: 'Romeo', code: 'RM'},
            {name: 'julieta', code: 'LDN'},
            {name: 'elver', code: 'IST'},
            {name: 'galarga', code: 'PRS'},
            {name: 'galarga', code: 'PRS'},
            {name: 'galarga', code: 'PRS'},
            {name: 'galarga', code: 'PRS'},
            {name: 'galarga', code: 'PRS'},
            {name: 'galarga', code: 'PRS'},
            {name: 'Alvaro', code: 'NY'},
            {name: 'Romeo', code: 'RM'},
            {name: 'julieta', code: 'LDN'},
            {name: 'elver', code: 'IST'},
            {name: 'galarga', code: 'PRS'}
        ];            
    }

    ngOnInit() {
        this.subjectService.getProductsSmall().then((subject) => (this.subjects = subject));
    }
    edit(subject: Subject){
      if (subject) {
        this.confirmationService.confirm({
            message: 'Está seguro que quiere editar esta asignatura?',
            header: 'Confirmation',
            icon: 'pi pi-info-circle',
            acceptIcon:"none",
            rejectIcon:"none",
            rejectButtonStyleClass:"p-button-text",
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Request submitted' });
                this.router.navigate(['/subjects/edit/'+ subject.code])
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Process incomplete', life: 3000 });
            },
            key: 'positionDialog'
        });
        
      }
    }
    editStudentList(subject: Subject){
      this.router.navigate(['/subjects/edit/'+ subject.id])
    }

    onSelectionChange(value = []) {
        this.selectAll = value.length === this.totalRecords;
        this.selectedCities = value;
    }

    onSelectAllChange(event: any) {
        const checked = event.checked;

        if (checked) {
            this.selectedCities = this.cities;
            this.selectAll = true;
        } else {
            this.selectAll = false;
        }
    }
}
