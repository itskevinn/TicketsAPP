import {Component} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {DialogService} from "primeng/dynamicdialog";
import {DataView} from "primeng/dataview";
import {ProjectService} from "../../../data/services/project-management/project.service";
import {CREATE, UPDATE} from "../../../core/constants/actions";
import {Project} from "../../../data/models/projects-management/project.model";
import {CreateModifyProjectComponent} from "../create-modify-project/create-modify-project.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  project!: Project;
  action: string = '';
  sortOrder: number = 0;
  sortField: string = '';
  position: string = 'top';
  projects: Project[] = [];
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private projectService: ProjectService, public dialogService: DialogService
  ) {
  }

  ngOnInit() {
    this.getAll();
  }


  private getAll() {
    this.projectService.getAll().pipe(takeUntil(this.destroy$)).subscribe(r => {
      if (!r.success) {
        return;
      }
      this.projects = r.data;
    });
  }

  public onFilter(dv: DataView, event: Event): void {
    dv.filter((event.target as HTMLInputElement).value);
  }

  public openCreateModifyProjectDialog(action: string, project?: Project) {
    this.dialogService.open(CreateModifyProjectComponent, {
      header: `${action} proyecto`,
      width: '40vw',
      contentStyle: {overflow: 'auto'},
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      data: {
        action: action,
        project: project,
      },
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected readonly UPDATE = UPDATE;
  protected readonly CREATE = CREATE;
}
