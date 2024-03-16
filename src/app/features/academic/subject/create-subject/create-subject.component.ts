import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClassGroup} from "../../../../data/models/academic/class-group";
import {DialogService, DynamicDialogComponent, DynamicDialogRef} from "primeng/dynamicdialog";
import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AcademicSubjectService} from "../../../../data/services/academic/academic-subject.service";
import {markFormControlsAsTouched, setFormValues} from "../../../../shared/functions/functions";
import {CREATE, UPDATE} from "../../../../core/constants/actions";
import {AcademicSubject} from "../../../../data/models/academic/academic-subject";
import {CustomMessageService} from "../../../../core/service/custom-message.service";

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
              private subjectService: AcademicSubjectService,
              private dialogService: DialogService,
              private messageService: CustomMessageService
  ) {
    this.getSubjectCode();
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

  private getSubjectCode(): void {
    this.subjectCode = this.dialogInstance?.data.code;
  }


  private getSubjectInfo(subjectId: string): void {
    this.action = UPDATE;
    this.subjectService.getByCode(subjectId).pipe(takeUntil(this.destroy$)).subscribe(r => {
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
    this.subjectService.save(academicSubject).pipe(takeUntil(this.destroy$))
      .subscribe(r => {
        if (!r.success) return;
        this.messageService.handleResponse(r, true);
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
