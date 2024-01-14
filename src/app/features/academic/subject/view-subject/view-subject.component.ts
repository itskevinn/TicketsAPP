import {Component, OnInit} from '@angular/core';
import {AcademicSubject} from '../../../../data/models/academic/academic-subject';
import {SubjectService} from '../../../../data/services/academic/subject.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {Subject, takeUntil} from "rxjs";
import {DataView} from 'primeng/dataview';


@Component({
  selector: 'app-subject',
  templateUrl: './view-subject.component.html',
  styleUrl: './view-subject.component.scss'
})
export class ViewSubjectComponent implements OnInit {
  subjects!: AcademicSubject[];
  position: string = 'top';
  sortField: string = '';
  sortOrder: number = 0;
  sortOptions = [
    {label: 'Nombre ascendente', value: 'name'},
    {label: 'Nombre descendente', value: '!name'},
  ];
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private subjectService: SubjectService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private router: Router
  ) {
  }

  ngOnInit() {
    this.subjectService.getAll().pipe(takeUntil(this.destroy$)).subscribe(r => {
      if (!r.success) {
        return;
      }
      this.subjects = r.data;
    });

  }

  edit(subject: AcademicSubject) {
    if (subject) {
      this.confirmationService.confirm({
        message: '¿Está seguro que quiere editar esta asignatura?',
        header: 'Confirmation',
        icon: 'pi pi-info-circle',
        acceptIcon: "none",
        rejectIcon: "none",
        rejectButtonStyleClass: "p-button-text",
        accept: () => {
          this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'Request submitted'});
          this.router.navigate(['/subject/edit/' + subject.code]).then(r => console.trace(r));
        },
        reject: () => {
          this.messageService.add({severity: 'error', summary: 'Rejected', detail: 'Process incomplete', life: 3000});
        },
        key: 'positionDialog'
      });

    }
  }

  public onSortChange(event: any): void {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  public onFilter(dv: DataView, event: Event): void {
    dv.filter((event.target as HTMLInputElement).value);
  }
}
