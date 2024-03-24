import {Component, OnDestroy, OnInit} from '@angular/core';
import {AcademicSubject} from '../../../../data/models/academic/academic-subject';
import {AcademicSubjectService} from '../../../../data/services/academic/academic-subject.service';
import {Subject, takeUntil} from "rxjs";
import {DataView} from 'primeng/dataview';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {CreateSubjectComponent} from "../create-subject/create-subject.component";
import {CREATE, UPDATE} from "../../../../core/constants/actions";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
    selector: 'app-subject',
    templateUrl: './view-subject.component.html',
    styleUrl: './view-subject.component.scss'
})
export class ViewSubjectComponent implements OnInit, OnDestroy {
    subjects: AcademicSubject[] = [];
    position: string = 'top';
    sortField: string = '';
    sortOrder: number = 0;
    subject!: AcademicSubject;
    private destroy$: Subject<void> = new Subject<void>();
    ref: DynamicDialogRef | undefined;
    action: string = '';

    constructor(private subjectService: AcademicSubjectService, public dialogService: DialogService, public router: Router
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

    public openCreateModifySubjectDialog(action: string, subject?: AcademicSubject) {
        this.ref = this.dialogService.open(CreateSubjectComponent, {
            header: `${action} asignatura`,
            width: '40vw',
            contentStyle: {overflow: 'auto'},
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw',
            },
            data: {
                action: action,
                subject: subject,
                subjectCode: subject?.code
            },
        });

        this.ref?.onClose.pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
            if (response) this.getAll();
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    protected readonly CREATE = CREATE;
    protected readonly UPDATE = UPDATE;
}
