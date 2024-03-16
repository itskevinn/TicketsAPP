import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DialogService, DynamicDialogComponent, DynamicDialogRef} from "primeng/dynamicdialog";
import {markFormControlsAsTouched, setFormValues} from "../../../../shared/functions/functions";
import {TeacherService} from "../../../../data/services/academic/teacher.service";
import {CustomMessageService} from "../../../../core/service/custom-message.service";
import {Teacher} from "../../../../data/models/academic/teacher";
import {ClassGroup} from "../../../../data/models/academic/class-group";
import {ClassGroupService} from "../../../../data/services/academic/class-group.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-create-class-group',
  templateUrl: './create-class-group.component.html',
  styleUrl: './create-class-group.component.scss'
})
export class CreateClassGroupComponent implements OnInit {
  action: string = '';
  subjectId: string = '';
  teachers: Teacher[] = [];
  public classGroupFrom: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();
  selectedTeacher: Teacher | undefined;
  dialogInstance: DynamicDialogComponent | undefined;

  constructor(private formBuilder: FormBuilder,
              private dialogService: DialogService,
              private ref: DynamicDialogRef,
              private teacherService: TeacherService,
              private classGroupService: ClassGroupService,
              private messageService: CustomMessageService) {
    this.dialogInstance = this.dialogService.getInstance(this.ref);
    this.classGroupFrom = this.buildClassGroupForm();

  }

  ngOnInit(): void {
    this.action = this.dialogInstance?.data.action;
    this.subjectId = this.dialogInstance?.data.subjectId;
    this.getTeachers();
    this.setDefaultValues();
  }

  private setDefaultValues(): void {
    if (this.dialogInstance?.data.classGroup) {
      setFormValues(this.classGroupFrom, this.dialogInstance?.data.classGroup);
      this.selectedTeacher = this.teachers.filter(t => t.id == this.dialogInstance?.data.classGroup.teacherDto.id)[0];
    }
  }

  private buildClassGroupForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      description: [''],
      subjectId: [this.subjectId]
    });
  }

  public getTeachers(): void {
    this.teacherService.getAll().subscribe(r => {
      this.messageService.handleResponse(r, false);
      this.teachers = r.data;
    });
  }

  public confirm(result: any): void {
    if (!result) {
      this.ref.close(false);
      return;
    }
    let classGroup: ClassGroup;
    if (this.classGroupFrom.invalid) {
      markFormControlsAsTouched(this.classGroupFrom);
      return;
    }
    classGroup = this.classGroupFrom.value;
    classGroup.subjectId = this.subjectId;
    if (this.selectedTeacher) {
      classGroup.teacherId = this.selectedTeacher.id;
    }

    this.classGroupService.save(classGroup).pipe(takeUntil(this.destroy$))
      .subscribe(r => {
        this.messageService.handleResponse(r, true);
        if (r.success) this.ref.close(true);
      });
  }

  private update(classGroup: ClassGroup): void {
    this.classGroupService
      .update(classGroup)
      .subscribe((r) => {
        this.messageService.handleResponse(r);
      });
  }

}
