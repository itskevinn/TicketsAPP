import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
interface City {
    name: string,
    code: string
}

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrl: './create-subject.component.scss'
})

export class CreateSubjectComponent {
  cities!: City[];
  totalRecords!: number;
  loading: boolean = false;
  selectAll: boolean = false;
  selectedCities!: City[];
  selectedCity!: City[];
  elementToRemoveList: any
  items!: MenuItem[];

    constructor() {
        this.cities = [
            {name: 'Alvaro', code: 'NY'},
            {name: 'Romeo', code: 'RM'},
            {name: 'julieta', code: 'LDN'},
            {name: 'elver', code: 'IST'},
            {name: 'galarga', code: 'PRS'},
            {name: 'galarga', code: '1'},
            {name: 'galarga', code: '2'},
            {name: 'galarga', code: '3'},
            {name: 'galarga', code: '4'},
            {name: 'galarga', code: '5'},
            {name: 'Alvaro', code: 'NY'},
            {name: 'Romeo', code: 'RM'},
            {name: 'julieta', code: 'LDN'},
            {name: 'elver', code: 'IST'},
            {name: 'shi', code: 'AA'}
        ];
    }
    

    ngOnInit() {
      this.items = [
            {
                label: 'Crear grupo',
                routerLink: 'personal'
            },
            {
                label: 'Agregar estudiantes al grupo de clase',
                routerLink: 'seat'
            },
            {
                label: 'Confirmar datos',
                routerLink: 'payment'
            }
        ];
    }

    loadCustomers() {
        // this.customerService.getCustomersLarge().then((res) => {
        //     this.customers = res;
        // });
    }
    deleteStudentList(student: City){
      this.selectedCities.forEach(element => {
        if (student.code === element.code) {
          this.elementToRemoveList = element.code;
        }
      });
            this.selectedCities = this.selectedCities.filter(student => student.code !== this.elementToRemoveList);
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
