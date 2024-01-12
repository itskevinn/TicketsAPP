import {Component, OnDestroy, OnInit} from '@angular/core';
import {Student} from "../../../../data/models/academic/student";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {StudentService} from "../../../../data/services/academic/student.service";
import {MessageService} from "primeng/api";
import {markFormControlsAsDirty, setFormValues} from "../../../../shared/functions/functions";
import {CREATE, UPDATE} from "../../../../core/constants/actions";
import {Person} from "../../../../data/models/academic/person";

@Component({
  selector: 'app-students-info',
  templateUrl: './students-info.component.html',
  styleUrl: './students-info.component.scss'
})
export class StudentsInfoComponent implements OnInit, OnDestroy {
  students: Student[] = [];
  studentForm: FormGroup;
  private destroy$ = new Subject<void>();
  showStudentDialog: boolean = false;
  action: string = '';
  student: Student = null!;
  submitted: boolean = false;
  showDeleteStudentDialog: boolean = false;
  cols: any[] = [];

  constructor(private studentService: StudentService, private formBuilder: FormBuilder, private messageService: MessageService) {
    this.studentForm = this.buildPersonForm();
    this.cols = [
      {field: 'firstName', header: 'Primer Nombre'},
      {field: 'middleName', header: 'Segundo Nombre'},
      {field: 'lastName', header: 'Primer Apellido'},
      {field: 'secondLastName', header: 'Segundo Apellido'},
      {field: 'email', header: 'Correo electrónico'}
    ];
  }


  ngOnInit(): void {
    this.getStudents();
  }

  private getStudents(): void {
    this.studentService.getAll().pipe(takeUntil(this.destroy$)).subscribe(r => {
      if (!r.success) {
        return;
      }
      this.students = r.data;
    });
  }

  private buildPersonForm(): FormGroup {
    this.studentForm = this.formBuilder.group({
      id: [],
      firstName: ['', Validators.required],
      middleName: [],
      lastName: ['', Validators.required],
      secondLastName: [],
      email: ['', Validators.required]
    });
    return this.studentForm;
  }

  private setPersonFormValues(student: Person) {
    setFormValues(this.studentForm, student);
  }

  public confirm(): void {
    let student: Person;
    this.submitted = true;
    if (this.studentForm.invalid) {
      markFormControlsAsDirty(this.studentForm);
      return;
    }
    student = this.studentForm.value;
    if (this.action === CREATE) this.save(student);
    if (this.action === UPDATE) this.update(student);
  }

  private save(student: Student): void {
    this.studentService.save(student).pipe(takeUntil(this.destroy$)).subscribe(r => {
      if (!r.success) {
        this.messageService.add({
          closable: true,
          key: 'gt',
          severity: 'error',
          summary: 'Ha ocurrido un error',
          detail: `${r.message}: ${r.exceptionMessage}`
        });
        return;
      }
      this.messageService.add({
        closable: true,
        key: 'gt',
        severity: 'success',
        summary: 'Hecho',
        detail: r.message
      });
      this.getStudents();
    });
    this.showStudentDialog = false;
    this.studentForm.reset();
  }

  private update(student: Student): void {
    this.studentService.update(student).pipe(takeUntil(this.destroy$)).subscribe(r => {
      if (!r.success) {
        this.messageService.add({
          closable: true,
          key: 'gt',
          severity: 'error',
          summary: 'Ha ocurrido un error',
          detail: `${r.message}: ${r.exceptionMessage}`
        });
        return;
      }
      this.messageService.add({
        closable: true,
        key: 'gt',
        severity: 'success',
        summary: 'Hecho',
        detail: r.message
      });
      this.getStudents();
    });
    this.showStudentDialog = false;
    this.studentForm.reset();
  }

  public closeDialog() {
    this.showStudentDialog = false;
    this.studentForm.reset();
  }

  public delete(student: Student): void {
    this.showStudentDialog = false;
    //TODO: eliminar profesor
  }

  public confirmDeleteSelected() {
    //TODO: confirmación de eliminación
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public handleFile(file: any) {
    console.log(file);
  }

  public showRegisterModifyStudentDialog(action: string, student?: Student): void {
    this.action = action;
    if (student) {
      this.student = student;
      this.setPersonFormValues(student);
    }
    this.showStudentDialog = true;
  }
}
