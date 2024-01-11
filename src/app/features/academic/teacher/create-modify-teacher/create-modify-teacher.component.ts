import {Component, Input, OnDestroy} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {MessageService} from "primeng/api";
import {TeacherService} from "../../../../data/services/academic/teacher.service";
import {Teacher} from "../../../../data/models/academic/teacher";
import {Person} from "../../../../data/models/academic/person";
import {CREATE, UPDATE} from "../../../../core/constants/actions";

@Component({
  selector: 'app-create-modify-teacher',
  templateUrl: './create-modify-teacher.component.html',
  styleUrl: './create-modify-teacher.component.scss'
})
export class CreateModifyTeacherComponent implements OnDestroy {

  private destroy$ = new Subject<void>();
  @Input() data: any;

  constructor(private messageService: MessageService,
              private teacherService: TeacherService
  ) {
  }

  public handlePersonEvent(person: Person): void {
    if (this.data.action === CREATE) {
      this.createTeacher(person);
    } else if (this.data.action === UPDATE) {
      this.updateTeacher(person);
    }
  }

  private createTeacher(teacher: Teacher): void {
    if (!teacher) {
      this.messageService.add({
        severity: 'error',
        key: 'gt',
        closable: true,
        summary: 'Ha ocurrido un error',
        detail: 'Ocurrió un error al intentar recuperar la persona'
      });
      return;
    }
    this.teacherService.save(teacher).pipe(takeUntil(this.destroy$)).subscribe(r => {
      if (!r.success) {
        this.messageService.add({
          severity: 'error',
          key: 'gt',
          closable: true,
          summary: 'Ha ocurrido un error',
          detail: r.message
        });
        return;
      }
      this.messageService.add({severity: 'success', key: 'gt', closable: true, summary: 'Éxito', detail: r.message})
    })
  }

  private updateTeacher(teacher: Teacher): void {
    this.teacherService.update(teacher).pipe(takeUntil(this.destroy$)).subscribe(r => {
      if (!r.success) {
        this.messageService.add({
          severity: 'error',
          key: 'gt',
          closable: true,
          summary: 'Ha ocurrido un error',
          detail: r.message
        })
        return;
      }
      this.messageService.add({severity: 'success', key: 'gt', closable: true, summary: 'Éxito', detail: r.message})
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
