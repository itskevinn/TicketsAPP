import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClassGroup} from "../../../../data/models/academic/class-group";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {CreateClassGroupComponent} from "../../class-group/create-class-group/create-class-group.component";
import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SubjectService} from "../../../../data/services/academic/subject.service";
import {setFormValues} from "../../../../shared/functions/functions";
import {CREATE, UPDATE} from "../../../../core/constants/actions";
import {Student} from "../../../../data/models/academic/student";

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrl: './create-subject.component.scss'
})

export class CreateSubjectComponent implements OnInit, OnDestroy {
  classGroups: ClassGroup[] = [];
  subjectFormGroup: FormGroup;
  selectedStudents: Student[] = [];
  selectedClassGroupId: string = '';
  subjectId: string = '';
  action: string = CREATE;
  protected readonly CREATE = CREATE;
  protected readonly UPDATE = UPDATE;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private dialogService: DialogService, private ref: DynamicDialogRef,
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

  public showClassGroupDialog(action: string, classGroup?: ClassGroup, index?: number): void {
    if (classGroup && action == UPDATE && index != undefined)
      classGroup.subjectId = this.subjectId;

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
        subjectId: this.subjectId,
        classGroup: classGroup
      },
    });

    this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe(r => {
      if (index) {
        this.classGroups.splice(index, 1, {...this.classGroups[index], ...r});
      } else if (r && action == CREATE) {
        this.classGroups.push(r);
      }
    });
  }

  public showClassGroupStudents(classGroup: ClassGroup): void {
    this.selectedClassGroupId = classGroup.id;
    this.selectedStudents = classGroup.students;
  }

  private getSubjectInfo(subjectId: string): void {
    this.action = UPDATE;
    this.subjectService.getById(subjectId).pipe(takeUntil(this.destroy$)).subscribe(r => {
      if (!r.success) return;

      setFormValues(this.subjectFormGroup, r.data)
      this.classGroups = r.data.classGroup;
    });
  }

  public handleStudentsSelection(students: Student[]): void {
    this.selectedStudents = students;
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

}
