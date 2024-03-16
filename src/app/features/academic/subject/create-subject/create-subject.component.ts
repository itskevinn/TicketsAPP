import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClassGroup} from "../../../../data/models/academic/class-group";
import {DialogService, DynamicDialogComponent, DynamicDialogRef} from "primeng/dynamicdialog";
import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SubjectService} from "../../../../data/services/academic/subject.service";
import {markFormControlsAsTouched, setFormValues} from "../../../../shared/functions/functions";
import {CREATE, UPDATE} from "../../../../core/constants/actions";
import {AcademicSubject} from "../../../../data/models/academic/academic-subject";

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrl: './create-subject.component.scss'
})

export class CreateSubjectComponent implements OnInit, OnDestroy {
  classGroups: ClassGroup[] = [];
  subjectFormGroup: FormGroup;
  subjectCode: string = '';
  action: string = CREATE;
  dialogInstance: DynamicDialogComponent | undefined;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private ref: DynamicDialogRef,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private subjectService: SubjectService,
              private dialogService: DialogService
  ) {
    this.validateRouteParam();
    this.subjectFormGroup = this.buildSubjectGroupForm();
    this.dialogInstance = this.dialogService.getInstance(this.ref);
  }

  ngOnInit(): void {
    if (this.subjectCode && this.subjectCode !== 'new') this.getSubjectInfo(this.subjectCode);
  }

  private buildSubjectGroupForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      code: ['', Validators.required]
    });
  }

  private validateRouteParam(): void {
    this.activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.subjectCode = params['subjectId'] || null;
    });
  }


  private getSubjectInfo(subjectId: string): void {
    this.action = UPDATE;
    this.subjectService.getById(subjectId).pipe(takeUntil(this.destroy$)).subscribe(r => {
      if (!r.success) return;

      setFormValues(this.subjectFormGroup, r.data)
      this.classGroups = r.data.classGroup;
    });
  }

  public confirm(result: any): void {
    if (!result) {
      this.ref.close();
    }
    let academicSubject: AcademicSubject;
    if (this.subjectFormGroup.invalid) {
      markFormControlsAsTouched(this.subjectFormGroup);
      return;
    }
    academicSubject = this.subjectFormGroup.value;
    this.ref.close(academicSubject);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

}
