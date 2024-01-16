import {Component, OnDestroy, OnInit} from '@angular/core';
import {AcademicSubject} from '../../../../data/models/academic/academic-subject';
import {SubjectService} from '../../../../data/services/academic/subject.service';
import {Subject, takeUntil} from "rxjs";
import {DataView} from 'primeng/dataview';


@Component({
  selector: 'app-subject',
  templateUrl: './view-subject.component.html',
  styleUrl: './view-subject.component.scss'
})
export class ViewSubjectComponent implements OnInit, OnDestroy {
  subjects!: AcademicSubject[];
  position: string = 'top';
  sortField: string = '';
  sortOrder: number = 0;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private subjectService: SubjectService
  ) {
  }

  ngOnInit() {
    this.getAll();
  }

  private getAll() {
    this.subjectService.getAll().pipe(takeUntil(this.destroy$)).subscribe(r => {
      if (!r.success) {
        return;
      }
      this.subjects = r.data;
    });
  }

  public onFilter(dv: DataView, event: Event): void {
    dv.filter((event.target as HTMLInputElement).value);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
