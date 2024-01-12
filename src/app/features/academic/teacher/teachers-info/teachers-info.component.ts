import {Component, OnDestroy, OnInit} from '@angular/core';
import {Teacher} from "../../../../data/models/academic/teacher";
import {TeacherService} from "../../../../data/services/academic/teacher.service";
import {Subject, takeUntil} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Person} from "../../../../data/models/academic/person";
import {
  markFormControlsAsDirty,
  setFormValues
} from "../../../../shared/functions/functions";
import {MessageService} from "primeng/api";
import {CREATE, UPDATE} from "../../../../core/constants/actions";

@Component({
  selector: 'app-teachers-info',
  templateUrl: './teachers-info.component.html',
  styleUrl: './teachers-info.component.scss'
})
export class TeachersInfoComponent implements OnInit, OnDestroy {
  teachers: Teacher[] = [];
  personForm: FormGroup;
  private destroy$ = new Subject<void>();
  showTeacherDialog: boolean = false;
  action: string = '';
  teacher: Teacher = null!;
  submitted: boolean = false;
  showDeleteTeacherDialog: boolean = false;
  cols: any[] = [];

  constructor(private teacherService: TeacherService, private formBuilder: FormBuilder, private messageService: MessageService) {
    this.personForm = this.buildPersonForm();
    this.cols = [
      {field: 'firstName', header: 'Primer Nombre'},
      {field: 'middleName', header: 'Segundo Nombre'},
      {field: 'lastName', header: 'Primer Apellido'},
      {field: 'secondLastName', header: 'Segundo Apellido'},
      {field: 'email', header: 'Correo electrónico'}
    ];
  }


  ngOnInit(): void {
    this.getTeachers();
  }

  private getTeachers(): void {
    this.teacherService.getAll().pipe(takeUntil(this.destroy$)).subscribe(r => {
      if (!r.success) {
        return;
      }
      this.teachers = r.data;
    });
  }

  private buildPersonForm(): FormGroup {
    this.personForm = this.formBuilder.group({
      id: [],
      firstName: ['', Validators.required],
      middleName: [],
      lastName: ['', Validators.required],
      secondLastName: [],
      email: ['', Validators.required]
    });
    return this.personForm;
  }

  private setPersonFormValues(person: Person) {
    setFormValues(this.personForm, person);
  }

  public confirm(): void {
    let person: Person;
    this.submitted = true;
    if (this.personForm.invalid) {
      markFormControlsAsDirty(this.personForm);
      return;
    }
    person = this.personForm.value;
    if (this.action === CREATE) this.save(person);
    if (this.action === UPDATE) this.update(person);
  }

  private save(teacher: Teacher): void {
    this.teacherService.save(teacher).pipe(takeUntil(this.destroy$)).subscribe(r => {
      if (!r.success) {
        this.messageService.add({
          closable: true,
          key: 'gt',
          severity: 'error',
          summary: 'Ha ocurrido un error',
          'detail': r.message
        });
        return;
      }
      this.messageService.add({
        closable: true,
        key: 'gt',
        severity: 'success',
        summary: 'Hecho',
        'detail': r.message
      });
      this.getTeachers();
    });
    this.showTeacherDialog = false;
    this.personForm.reset();
  }

  private update(teacher: Teacher): void {
    this.teacherService.update(teacher).pipe(takeUntil(this.destroy$)).subscribe(r => {
      if (!r.success) {
        this.messageService.add({
          closable: true,
          key: 'gt',
          severity: 'error',
          summary: 'Ha ocurrido un error',
          'detail': r.message
        });
        return;
      }
      this.messageService.add({
        closable: true,
        key: 'gt',
        severity: 'success',
        summary: 'Hecho',
        'detail': r.message
      });
      this.getTeachers();
    });
    this.showTeacherDialog = false;
    this.personForm.reset();
  }

  public closeDialog() {
    this.showTeacherDialog = false;
    this.personForm.reset();
  }

  public delete(teacher: Teacher): void {
    this.showTeacherDialog = false;
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

  public showRegisterModifyTeacherDialog(action: string, teacher?: Teacher): void {
    this.action = action;
    if (teacher) {
      this.teacher = teacher;
      this.setPersonFormValues(teacher);
    }
    this.showTeacherDialog = true;
  }
}
