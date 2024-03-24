import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Student} from '../../../../data/models/academic/student';
import {Subject, takeUntil} from 'rxjs';
import {StudentService} from '../../../../data/services/academic/student.service';
import {CREATE, UPDATE} from '../../../../core/constants/actions';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {CreatePersonComponent} from '../../staff/create-person/create-person.component';
import {CustomMessageService} from "../../../../core/service/custom-message.service";

@Component({
    selector: 'app-students-info',
    templateUrl: './students-info.component.html',
    styleUrl: './students-info.component.scss',
})
export class StudentsInfoComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();
    students: Student[] = [];
    action: string = '';
    student: Student = null!;
    cols: any[] = [];
    ref: DynamicDialogRef | undefined;

    constructor(
        private studentService: StudentService,
        private messageService: CustomMessageService,
        private dialogService: DialogService
    ) {
        this.initializeCols();
    }

    ngOnInit(): void {
        this.getStudents();
    }

    private getStudents(): void {
        this.studentService
            .getAll()
            .pipe(takeUntil(this.destroy$))
            .subscribe((r) => {
                if (!r.success) {
                    return;
                }
                this.students = r.data;

            });
    }
    
    private initializeCols(): void {
        this.cols = [
            {field: 'firstName', header: 'Primer Nombre'},
            {field: 'middleName', header: 'Segundo Nombre'},
            {field: 'lastName', header: 'Primer Apellido'},
            {field: 'secondLastName', header: 'Segundo Apellido'},
            {field: 'email', header: 'Correo electrónico'},
        ];
    }

    public delete(student: Student): void {
        //TODO: eliminar estudiante
    }

    public handleFile(file: any): void {
        console.log(file);
    }

    public showRegisterModifyStudentDialog(
        action: string,
        student?: Student
    ): void {
        this.ref = this.dialogService.open(CreatePersonComponent, {
            header: `${action} estudiante`,
            width: '50vw',
            contentStyle: {overflow: 'auto'},
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw',
            },
            data: {
                action: action,
                person: student,
            },
        });

        this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
            if (!data) return;

            if (action == CREATE) this.save(data);
            if (action == UPDATE) this.update(data);
        });
    }

    private save(student: Student): void {
        this.studentService
            .save(student)
            .pipe(takeUntil(this.destroy$))
            .subscribe((r) => {
                this.messageService.handleResponse(r);
                this.getStudents();
            });
    }

    private update(student: Student): void {
        this.studentService
            .update(student)
            .pipe(takeUntil(this.destroy$))
            .subscribe((r) => {
                this.messageService.handleResponse(r);
                this.getStudents();
            });
    }

    ngOnDestroy(): void {
        if (this.ref) {
            this.ref.close();
        }
        this.destroy$.next();
        this.destroy$.complete();
    }
}
