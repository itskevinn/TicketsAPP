import {Component, OnDestroy, OnInit} from '@angular/core';
import {AcademicSubject} from "../../../../data/models/academic/academic-subject";
import {AcademicSubjectService} from "../../../../data/services/academic/academic-subject.service";
import {ActivatedRoute} from "@angular/router";
import {ClassGroup} from "../../../../data/models/academic/class-group";
import {CreateClassGroupComponent} from "../create-class-group/create-class-group.component";
import {Subject, takeUntil} from "rxjs";
import {DialogService} from "primeng/dynamicdialog";
import {CREATE} from "../../../../core/constants/actions";
import {DataView} from "primeng/dataview";

@Component({
  selector: 'app-view-subject-detail',
  templateUrl: './view-subject-detail.component.html',
  styleUrl: './view-subject-detail.component.scss'
})
export class ViewSubjectDetailComponent implements OnInit, OnDestroy {
  subjectCode: string = "";
  classGroups: ClassGroup[] = [];
  subject: AcademicSubject | undefined;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private subjectService: AcademicSubjectService,
              private activatedRoute: ActivatedRoute,
              private dialogService: DialogService) {

  }

  ngOnInit(): void {
    this.findSubjectBySubjectCode();
  }

  public onFilter(dv: DataView, event: Event): void {
    dv.filter((event.target as HTMLInputElement).value);
  }

  private findSubjectBySubjectCode() {
    this.activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.subjectCode = params['subjectCode'] || null;
    });
    this.subjectService.getByCode(this.subjectCode).pipe(takeUntil(this.destroy$)).subscribe(r => {
      if (!r.success) return;
      this.subject = r.data;
      this.classGroups = r.data.classGroup;
    });
  }

  public openCreateModifyClassGroupDialog(action: string, classGroup?: ClassGroup): void {
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
        subjectCode: this.subjectCode,
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
