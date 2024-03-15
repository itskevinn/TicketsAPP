import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClassGroup} from "../../../../data/models/academic/class-group";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SubjectService} from "../../../../data/services/academic/subject.service";
import {setFormValues} from "../../../../shared/functions/functions";
import {CREATE, UPDATE} from "../../../../core/constants/actions";

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrl: './create-subject.component.scss'
})

export class CreateSubjectComponent implements OnInit, OnDestroy {
  classGroups: ClassGroup[] = [];
  subjectFormGroup: FormGroup;
  subjectId: string = '';
  action: string = CREATE;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private ref: DynamicDialogRef,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private subjectService: SubjectService) {
    this.validateRouteParam();
    this.subjectFormGroup = this.buildSubjectGroupForm();
  }

  ngOnInit(): void {
    if (this.subjectId && this.subjectId !== 'new') this.getSubjectInfo(this.subjectId);
  }

  private buildSubjectGroupForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  private validateRouteParam(): void {
    this.activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.subjectId = params['subjectId'] || null;
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

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

}
