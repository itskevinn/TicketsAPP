import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClassGroup} from "../../../../data/models/academic/class-group";
import {Subject, takeUntil} from "rxjs";
import {ClassGroupService} from "../../../../data/services/academic/class-group.service";
import {Student} from "../../../../data/models/academic/student";
import {DialogService, DynamicDialogComponent, DynamicDialogRef} from "primeng/dynamicdialog";
import {CustomMessageService} from "../../../../core/service/custom-message.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {setFormValues} from "../../../../shared/functions/functions";
import {CREATE, UPDATE} from "../../../../core/constants/actions";
import {StudentService} from "../../../../data/services/academic/student.service";
import {Teacher} from "../../../../data/models/academic/teacher";
import {TeacherService} from "../../../../data/services/academic/teacher.service";

@Component({
    selector: 'app-view-class-group-detail',
    templateUrl: './view-class-group-detail.component.html',
    styleUrl: './view-class-group-detail.component.scss'
})
export class ViewClassGroupDetailComponent implements OnInit, OnDestroy {
    public students: Student[] = [];
    public teachers: Teacher[] = [];
    public action: string = CREATE;
    public selectedTeacher!: Teacher;
    private classGroupCode: string = '';
    public classGroupFormGroup: FormGroup;
    private subjectId: number | undefined;
    public selectedStudents: Student[] = [];
    public classGroup: ClassGroup | undefined;
    private dialogInstance: DynamicDialogComponent;
    public destroy$: Subject<void> = new Subject<void>();

    constructor(private ref: DynamicDialogRef,
                private formBuilder: FormBuilder,
                private dialogService: DialogService,
                private teacherService: TeacherService,
                private studentService: StudentService,
                private messageService: CustomMessageService,
                private classGroupService: ClassGroupService
    ) {
        this.classGroupFormGroup = this.buildClassGroupFormGroup();
        this.dialogInstance = this.dialogService.getInstance(this.ref);
    }

    ngOnInit() {
        this.action = this.dialogInstance.data.action;
        this.subjectId = this.dialogInstance.data.subjectId;
        this.classGroupCode = this.dialogInstance.data.classGroup.code;
        if (this.classGroupCode) this.findClassGroupByCode();
        this.findAllStudents();
        this.findAllTeachers();
    }

    private buildClassGroupFormGroup(): FormGroup {
        return this.formBuilder.group({
            code: ['', Validators.required],
            subjectId: [this.subjectId]
        });
    }

    private findAllStudents(): void {
        this.studentService.getAll().pipe(takeUntil(this.destroy$)).subscribe(r => {
            this.messageService.handleResponse(r, false);
            if (!r.success) return;
            this.students = r.data;
        })
    }

    private findAllTeachers(): void {
        this.teacherService.getAll().pipe(takeUntil(this.destroy$)).subscribe(r => {
            this.messageService.handleResponse(r, false);
            if (!r.success) return;
            this.teachers = r.data;
        })
    }


    private findClassGroupByCode() {
        this.classGroupService.getByCode(this.classGroupCode).pipe(takeUntil(this.destroy$)).subscribe(r => {
            this.messageService.handleResponse(r, false);
            if (!r.success) return;
            this.classGroup = r.data;
            this.selectedStudents = r.data.students;
            if (this.action === UPDATE) {
                this.selectedTeacher = r.data.teacherDto;
                setFormValues(this.classGroupFormGroup, r.data);
            }

        });
    }

    public handleConfirmAction(result: boolean): void {
        if (!result) this.ref.close();
        let classGroup: ClassGroup = this.classGroupFormGroup.value;
        if (this.action === UPDATE) {
            this.classGroupService.update(classGroup).pipe(takeUntil(this.destroy$))
                .subscribe(r => {
                    this.messageService.handleResponse(r, true);
                });
            return;
        }
        if (this.action === CREATE) {
            this.classGroupService.save(classGroup).pipe(takeUntil(this.destroy$))
                .subscribe(r => {
                    this.messageService.handleResponse(r, true);
                });
            return;
        }
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
