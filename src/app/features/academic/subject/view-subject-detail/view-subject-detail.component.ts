import {Component, OnDestroy, OnInit} from '@angular/core';
import {AcademicSubject} from "../../../../data/models/academic/academic-subject";
import {AcademicSubjectService} from "../../../../data/services/academic/academic-subject.service";
import {ActivatedRoute} from "@angular/router";
import {ClassGroup} from "../../../../data/models/academic/class-group";
import {CreateClassGroupComponent} from "../create-class-group/create-class-group.component";
import {Subject, takeUntil} from "rxjs";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {CREATE, UPDATE} from "../../../../core/constants/actions";
import {DataView} from "primeng/dataview";
import {ViewClassGroupDetailComponent} from "../view-class-group-detail/view-class-group-detail.component";

@Component({
    selector: 'app-view-subject-detail',
    templateUrl: './view-subject-detail.component.html',
    styleUrl: './view-subject-detail.component.scss'
})
export class ViewSubjectDetailComponent implements OnInit, OnDestroy {
    subjectCode: string = "";
    classGroups: ClassGroup[] = [];
    ref: DynamicDialogRef | undefined;
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
        this.ref = this.dialogService.open(ViewClassGroupDetailComponent, {
            width: '70vw',
            contentStyle: {overflow: 'auto'},
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw',
            },
            data: {
                action: action,
                classGroup: classGroup,
                subjectId: this.subject?.id
            },
        });

        this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
            if (!data) return;
            this.findSubjectBySubjectCode();
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

    protected readonly CREATE = CREATE;
    protected readonly UPDATE = UPDATE;
}
