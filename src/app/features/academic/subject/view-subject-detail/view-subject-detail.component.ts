import {Component, OnDestroy, OnInit} from '@angular/core';
import {AcademicSubject} from "../../../../data/models/academic/academic-subject";
import {SubjectService} from "../../../../data/services/academic/subject.service";
import {ActivatedRoute} from "@angular/router";
import {ClassGroup} from "../../../../data/models/academic/class-group";
import {CreateClassGroupComponent} from "../create-class-group/create-class-group.component";
import {Subject, takeUntil} from "rxjs";
import {DialogService} from "primeng/dynamicdialog";
import {CREATE, UPDATE} from "../../../../core/constants/actions";
import {DataView} from "primeng/dataview";

@Component({
  selector: 'app-view-subject-detail',
  templateUrl: './view-subject-detail.component.html',
  styleUrl: './view-subject-detail.component.scss'
})
export class ViewSubjectDetailComponent implements OnInit, OnDestroy {
  subjectId: string = "";
  classGroups: ClassGroup[] = [];
  subject: AcademicSubject | undefined;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private subjectService: SubjectService,
              private activatedRoute: ActivatedRoute,
              private dialogService: DialogService) {

  }

  ngOnInit(): void {
    this.findSubjectBySubjectId();
  }

  public onFilter(dv: DataView, event: Event): void {
    dv.filter((event.target as HTMLInputElement).value);
  }

  private findSubjectBySubjectId() {
    this.activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.subjectId = params['subjectId'] || null;
    });
    this.subjectService.getById(this.subjectId).pipe(takeUntil(this.destroy$)).subscribe(r => {
      if (!r.success) return;
      this.subject = r.data;
      this.classGroups = r.data.classGroup;
    });
  }

  public showClassGroupDialog(action: string, classGroup?: ClassGroup): void {
    if (classGroup && action == UPDATE)
      classGroup.subjectId = this.subjectId;

    this.dialogService.open(CreateClassGroupComponent, {
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
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  protected readonly CREATE = CREATE;
}
