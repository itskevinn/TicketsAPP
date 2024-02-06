import {Component, OnDestroy, OnInit} from '@angular/core';
import {Teacher} from '../../../../data/models/academic/teacher';
import {TeacherService} from '../../../../data/services/academic/teacher.service';
import {Subject, takeUntil} from 'rxjs';
import {CREATE, UPDATE} from '../../../../core/constants/actions';
import {CreatePersonComponent} from '../../staff/create-person/create-person.component';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {CustomMessageService} from "../../../../core/service/custom-message.service";

@Component({
  selector: 'app-teachers-info',
  templateUrl: './teachers-info.component.html',
  styleUrl: './teachers-info.component.scss',
})
export class TeachersInfoComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  teachers: Teacher[] = [];
  action: string = '';
  cols: any[] = [];
  ref: DynamicDialogRef | undefined;

  constructor(
    private teacherService: TeacherService,
    private messageService: CustomMessageService,
    private dialogService: DialogService
  ) {
    this.initializeCols();
  }

  ngOnInit(): void {
    this.getTeachers();
  }

  private getTeachers(): void {
    this.teacherService
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((r) => {
        if (!r.success) {
          return;
        }
        this.teachers = r.data;
      });
  }

  private initializeCols() {
    this.cols = [
      {field: 'firstName', header: 'Primer Nombre'},
      {field: 'middleName', header: 'Segundo Nombre'},
      {field: 'lastName', header: 'Primer Apellido'},
      {field: 'secondLastName', header: 'Segundo Apellido'},
      {field: 'email', header: 'Correo electrónico'},
    ];
  }

  public delete(teacher: Teacher): void {
    //TODO: eliminar profesor
  }

  public handleFile(file: any) {
    console.log(file);
  }

  public showRegisterModifyTeacherDialog(
    action: string,
    teacher?: Teacher
  ): void {
    this.ref = this.dialogService.open(CreatePersonComponent, {
      header: `${action} profesor`,
      width: '50vw',
      contentStyle: {overflow: 'auto'},
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      data: {
        action: action,
        teacher: teacher,
      },
    });

    this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      if (!data) return;

      if (action == CREATE) this.save(data);
      if (action == UPDATE) this.update(data);
    });
  }

  private save(teacher: Teacher): void {
    this.teacherService
      .save(teacher)
      .pipe(takeUntil(this.destroy$))
      .subscribe((r) => {
        this.messageService.handleResponse(r);
        this.getTeachers();
      });
  }

  private update(teacher: Teacher): void {
    this.teacherService
      .update(teacher)
      .pipe(takeUntil(this.destroy$))
      .subscribe((r) => {
        this.messageService.handleResponse(r);
        this.getTeachers();
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
