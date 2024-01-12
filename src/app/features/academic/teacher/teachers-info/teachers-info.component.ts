import {Component, OnDestroy, OnInit} from '@angular/core';
import {Teacher} from "../../../../data/models/academic/teacher";
import {TeacherService} from "../../../../data/services/academic/teacher.service";
import {Subject, takeUntil} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Person} from "../../../../data/models/academic/person";
import {
  markFormControlsAsDirty,
  markFormControlsAsTouched,
  setFormValues
} from "../../../../shared/functions/functions";

@Component({
  selector: 'app-teachers-info',
  templateUrl: './teachers-info.component.html',
  styleUrl: './teachers-info.component.scss'
})
export class TeachersInfoComponent implements OnInit, OnDestroy {
  teachers: Teacher[] = [];
  personForm: FormGroup;
  private destroy$ = new Subject<void>();
  teacherDialog: boolean = false;
  action: string = '';
  teacher: Teacher = null!;

  constructor(private teacherService: TeacherService, private formBuilder: FormBuilder,) {
    this.personForm = this.buildPersonForm();
  }

  public showRegisterModifyTeacherDialog(action: string, teacher?: Teacher): void {
    this.action = action;
    if (teacher)
      this.teacher = teacher;
    this.teacherDialog = true;
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
    if (this.personForm.invalid) {
      markFormControlsAsDirty(this.personForm);
      return;
    }
    person = this.personForm.value;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
