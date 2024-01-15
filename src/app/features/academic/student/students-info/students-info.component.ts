import { Component, OnDestroy, OnInit } from '@angular/core';
import { Student } from '../../../../data/models/academic/student';
import { Subject, takeUntil } from 'rxjs';
import { StudentService } from '../../../../data/services/academic/student.service';
import { MessageService } from 'primeng/api';
import { CREATE, UPDATE } from '../../../../core/constants/actions';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreatePersonComponent } from '../../staff/create-person/create-person.component';

@Component({
  selector: 'app-students-info',
  templateUrl: './students-info.component.html',
  styleUrl: './students-info.component.scss',
})
export class StudentsInfoComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  students: Student[] = [];
  action: string = '';
  student: Student = null!;
  cols: any[] = [];
  ref: DynamicDialogRef | undefined;

  constructor(
    private studentService: StudentService,
    private messageService: MessageService,
    private dialogService: DialogService
  ) {
    this.initializeCols();
  }

  ngOnInit(): void {
    this.getStudents();
  }

  private getStudents(): void {
    this.studentService
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((r) => {
        if (!r.success) {
          return;
        }
        this.students = r.data;
      });
  }

  private initializeCols() {
    this.cols = [
      { field: 'firstName', header: 'Primer Nombre' },
      { field: 'middleName', header: 'Segundo Nombre' },
      { field: 'lastName', header: 'Primer Apellido' },
      { field: 'secondLastName', header: 'Segundo Apellido' },
      { field: 'email', header: 'Correo electrónico' },
    ];
  }

  public delete(student: Student): void {
    //TODO: eliminar profesor
  }

  public handleFile(file: any) {
    console.log(file);
  }

  public showRegisterModifyStudentDialog(
    action: string,
    student?: Student
  ): void {
    this.ref = this.dialogService.open(CreatePersonComponent, {
      header: `${action} estudiante`,
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      data: {
        action: action,
        student: student,
      },
    });

    this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      if (!data) return;

      if (action == CREATE) this.save(data);
      if (action == UPDATE) this.update(data);
    });
  }

  private save(student: Student): void {
    this.studentService
      .save(student)
      .pipe(takeUntil(this.destroy$))
      .subscribe((r) => {
        if (!r.success) {
          this.messageService.add({
            closable: true,
            key: 'gt',
            severity: 'error',
            summary: 'Ha ocurrido un error',
            detail: `${r.message}: ${r.exceptionMessage}`,
          });
          return;
        }
        this.messageService.add({
          closable: true,
          key: 'gt',
          severity: 'success',
          summary: 'Hecho',
          detail: r.message,
        });
        this.getStudents();
      });
  }

  private update(student: Student): void {
    this.studentService
      .update(student)
      .pipe(takeUntil(this.destroy$))
      .subscribe((r) => {
        if (!r.success) {
          this.messageService.add({
            closable: true,
            key: 'gt',
            severity: 'error',
            summary: 'Ha ocurrido un error',
            detail: `${r.message}: ${r.exceptionMessage}`,
          });
          return;
        }
        this.messageService.add({
          closable: true,
          key: 'gt',
          severity: 'success',
          summary: 'Hecho',
          detail: r.message,
        });
        this.getStudents();
      });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
    this.destroy$.next();
    this.destroy$.complete();
  }
}
