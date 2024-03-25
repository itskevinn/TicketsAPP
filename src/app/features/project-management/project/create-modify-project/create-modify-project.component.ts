import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProjectService} from "../../../../data/services/project-management/project.service";
import {CustomMessageService} from "../../../../core/service/custom-message.service";
import {Project} from "../../../../data/models/projects-management/project.model";
import {Subject, takeUntil} from "rxjs";
import {ClassGroup} from "../../../../data/models/academic/class-group";
import {ClassGroupService} from "../../../../data/services/academic/class-group.service";
import {AcademicSubjectService} from "../../../../data/services/academic/academic-subject.service";
import {AcademicSubject} from "../../../../data/models/academic/academic-subject";
import {DialogService, DynamicDialogComponent, DynamicDialogRef} from "primeng/dynamicdialog";
import {markFormControlsAsDirty} from "../../../../shared/functions/functions";

@Component({
  selector: 'app-create-modify-project',
  templateUrl: './create-modify-project.component.html',
  styleUrl: './create-modify-project.component.scss'
})
export class CreateModifyProjectComponent implements OnInit, OnDestroy {
  public project!: Project;
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
    private projectService: ProjectService,
    private messageService: CustomMessageService,
    private classGroupService: ClassGroupService,
    private subjectService: AcademicSubjectService) {
    this.projectFormGroup = this.buildForm();
    this.dialogInstance = this.dialogService.getInstance(this.ref);
  }

  ngOnInit(): void {
    this.findSubjectsByUser();
  }

  private findSubjectsByUser(): void {
    this.subjectService.getAllByUser().pipe(takeUntil(this.destroy$)).subscribe(r => {
      this.messageService.handleResponse(r, false);
      if (r.success) this.subjects = r.data;
    });
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  public getClassGroupsBySelectedSubject(subjectId: any): void {
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
      markFormControlsAsDirty(this.projectFormGroup);
      return;
    }
    if (!this.selectedClassGroup) return;
    this.project = this.projectFormGroup.value;
    this.project.classGroupId = this.selectedClassGroup.id;
    console.log(this.project);
    this.projectService.save(this.project).pipe(takeUntil(this.destroy$)).subscribe(r => {
      this.messageService.handleResponse(r, true);
      this.ref.close(true);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
