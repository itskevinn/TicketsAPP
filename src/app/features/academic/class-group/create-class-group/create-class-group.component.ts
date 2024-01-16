import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DialogService, DynamicDialogComponent, DynamicDialogRef} from "primeng/dynamicdialog";
import {markFormControlsAsTouched, setFormValues} from "../../../../shared/functions/functions";
import {ActivatedRoute} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {TeacherService} from "../../../../data/services/academic/teacher.service";
import {CustomMessageService} from "../../../../core/service/custom-message.service";
import {Teacher} from "../../../../data/models/academic/teacher";
import {ClassGroup} from "../../../../data/models/academic/class-group";
import {ClassGroupService} from "../../../../data/services/academic/class-group.service";
import {CREATE, UPDATE} from "../../../../core/constants/actions";

@Component({
  selector: 'app-create-class-group',
  templateUrl: './create-class-group.component.html',
  styleUrl: './create-class-group.component.scss'
})
export class CreateClassGroupComponent {
  action: string = '';
  subjectId: string = '';
  teachers: Teacher[] = [];
  public classGroupFrom: FormGroup;
  selectedTeacher: Teacher | undefined;
  dialogInstance: DynamicDialogComponent | undefined;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private formBuilder: FormBuilder, private dialogService: DialogService, private ref: DynamicDialogRef,
              private route: ActivatedRoute, private teacherService: TeacherService, private messageService: CustomMessageService,
              private classGroupService: ClassGroupService) {
    this.dialogInstance = this.dialogService.getInstance(this.ref);
    this.validateRouteParam();
    this.classGroupFrom = this.buildClassGroupForm();
    this.getTeachers();
    this.setDefaultValues();
    this.action = this.dialogInstance.data.action;
  }

  private setDefaultValues(): void {
    if (this.dialogInstance?.data.classGroup) {
      setFormValues(this.classGroupFrom, this.dialogInstance?.data.classGroup);
      this.teacherService.getById(this.dialogInstance.data.classGroup.teacherDto.id).pipe(takeUntil(this.destroy$)).subscribe(r => {
        this.messageService.handleResponse(r, false);
        this.selectedTeacher = r.data;
      });
    }
  }

  private buildClassGroupForm(): FormGroup {
    return this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      description: [''],
      subjectId: [this.subjectId]
    });
  }

  private validateRouteParam(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.subjectId = params['subjectId'] || null;
    });
  }

  public getTeachers(): void {
    this.teacherService.getBySubjectId(this.subjectId).pipe(takeUntil(this.destroy$)).subscribe(r => {
      this.messageService.handleResponse(r, false);
      this.teachers = r.data;
    });
  }

  public confirm(result: any): void {
    if (!result) {
      this.ref.close();
    }
    let classGroup: ClassGroup;
    if (this.classGroupFrom.invalid) {
      markFormControlsAsTouched(this.classGroupFrom);
      return;
    }
    classGroup = this.classGroupFrom.value;
    if (this.selectedTeacher)
      classGroup.teacherId = this.selectedTeacher.id;
    if (this.action == CREATE) this.save(classGroup);
    if (this.action == UPDATE) this.update(classGroup);
    this.ref.close();
  }


  private save(classGroup: ClassGroup): void {
    this.classGroupService
      .save(classGroup)
      .pipe(takeUntil(this.destroy$))
      .subscribe((r) => {
        this.messageService.handleResponse(r);
      });
  }

  private update(classGroup: ClassGroup): void {
    this.classGroupService
      .update(classGroup)
      .pipe(takeUntil(this.destroy$))
      .subscribe((r) => {
        this.messageService.handleResponse(r);
      });
  }
}
