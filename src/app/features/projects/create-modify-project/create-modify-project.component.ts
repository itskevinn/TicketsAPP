import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TeacherService} from "../../../data/services/academic/teacher.service";
import {ProjectService} from "../../../data/services/project-management/project.service";
import {CustomMessageService} from "../../../core/service/custom-message.service";
import {Teacher} from "../../../data/models/academic/teacher";
import {Project} from "../../../data/models/projects-management/project.model";
import {Subject, take, takeUntil} from "rxjs";
import {ProjectStatus} from "../../../data/models/projects-management/project-status.model";
import {ClassGroup} from "../../../data/models/academic/class-group";
import {ClassGroupService} from "../../../data/services/academic/class-group.service";
import {AcademicSubjectService} from "../../../data/services/academic/academic-subject.service";
import {AcademicSubject} from "../../../data/models/academic/academic-subject";
import {DialogService, DynamicDialogComponent, DynamicDialogRef} from "primeng/dynamicdialog";
import {markFormControlsAsTouched} from "../../../shared/functions/functions";

@Component({
  selector: 'app-create-modify-project',
  templateUrl: './create-modify-project.component.html',
  styleUrl: './create-modify-project.component.scss'
})
export class CreateModifyProjectComponent implements OnInit, OnDestroy {
  public project!: Project;
  public teachers: Teacher[] = [];
  public selectedTeacher!: Teacher;
  public projectFormGroup: FormGroup;
  public subjects: AcademicSubject[] = [];
  public selectedSubject!: AcademicSubject;
  public classGroups: ClassGroup[] = [];
  public selectedClassGroup!: ClassGroup;
  private destroy$: Subject<void> = new Subject<void>();
  dialogInstance: DynamicDialogComponent | undefined;

  constructor(
    private ref: DynamicDialogRef,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private teacherService: TeacherService,
    private projectService: ProjectService,
    private messageService: CustomMessageService,
    private classGroupService: ClassGroupService,
    private subjectService: AcademicSubjectService) {
    this.projectFormGroup = this.buildForm();
    this.dialogInstance = this.dialogService.getInstance(this.ref);
  }

  ngOnInit(): void {
    this.getTeachers();

  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  private getTeachers(): void {
    this.teacherService.getAll().subscribe(r => {
      this.messageService.handleResponse(r, false);
      this.teachers = r.data;
    });
  }

  public getSubjectsBySelectedTeacher(teacherId: string): void {
    this.subjectService.getAllByTeacher(teacherId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(r => {
        if (!r.success) return;
        this.subjects = r.data;
      });
  }

  public getClassGroupsBySelectedSubject(subjectId: string): void {
    this.classGroupService.getBySubjectId(subjectId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(r => {
        if (!r.success) return;
        this.classGroups = r.data;
      });
  }

  public confirm(result: any): void {
    if (!result) {
      this.ref.close(false);
    }
    if (this.projectFormGroup.invalid) {
      markFormControlsAsTouched(this.projectFormGroup);
      return;
    }
    if (!this.selectedTeacher) return;
    if (!this.selectedClassGroup) return;
    this.project = this.projectFormGroup.value;
    this.project.projectManagerId = this.selectedTeacher.id;
    this.project.classGroupId = this.selectedClassGroup.code;
    this.projectService.save(this.project).pipe(takeUntil(this.destroy$)).subscribe(r => {
      this.messageService.handleResponse(r, true);
    });
    this.ref.close(true);
  }

  ngOnDestroy(): void {
  }


}
