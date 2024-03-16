import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClassGroup} from "../../../../data/models/academic/class-group";
import {ActivatedRoute} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {ClassGroupService} from "../../../../data/services/academic/class-group.service";
import {Student} from "../../../../data/models/academic/student";

@Component({
  selector: 'app-view-class-group-detail',
  templateUrl: './view-class-group-detail.component.html',
  styleUrl: './view-class-group-detail.component.scss'
})
export class ViewClassGroupDetailComponent implements OnInit, OnDestroy {
  private classGroupId: string = '';
  protected students: Student[] = [];
  public classGroup: ClassGroup | undefined;
  public destroy$: Subject<void> = new Subject<void>();

  constructor(private activatedRoute: ActivatedRoute, private classGroupService: ClassGroupService) {
  }

  ngOnInit() {
    this.findClassGroupById();
  }

  private findClassGroupById() {
    this.activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.classGroupId = params['groupCode'] || null;
    });
    this.classGroupService.getById(this.classGroupId).pipe(takeUntil(this.destroy$)).subscribe(r => {
      console.log(r.data)
      if (!r.success) return;
      this.classGroup = r.data;
      this.students = r.data.students;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
