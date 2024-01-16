import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClassGroup} from "../../../../data/models/academic/class-group";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {CreateClassGroupComponent} from "../../class-group/create-class-group/create-class-group.component";
import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {CustomMessageService} from "../../../../core/service/custom-message.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SubjectService} from "../../../../data/services/academic/subject.service";

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrl: './create-subject.component.scss'
})

export class CreateSubjectComponent implements OnInit, OnDestroy {
  classGroups: ClassGroup[] = [];
  subjectFormGroup: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();
  subjectId: string = '';

  constructor(private dialogService: DialogService, private ref: DynamicDialogRef,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute, private messageService: CustomMessageService,
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

  public showClassGroupDialog(action: string, classGroup?: ClassGroup): void {
    this.ref = this.dialogService.open(CreateClassGroupComponent, {
      header: `${action} grupo de clases`,
      width: '40vw',
      contentStyle: {overflow: 'auto'},
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      data: {
        action: action,
        classGroup: classGroup,
      },
    });

    this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe(_ => {
      this.getSubjectInfo(this.subjectId);
    });
  }

  private getSubjectInfo(subjectId: string): void {
    this.subjectService.getById(subjectId).pipe(takeUntil(this.destroy$)).subscribe(r => {
      if (!r.success) {
        return;
      }
      this.subjectFormGroup.controls['name'].setValue(r.data.name);
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
