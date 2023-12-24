import { Component, Input } from '@angular/core';
import { TaskSchema } from 'src/app/data/models/task/taskschema';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input() task!: TaskSchema;
}
