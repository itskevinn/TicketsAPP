import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../data/models/ticket/task.model'
import { List } from 'src/app/data/models/ticket/list.model';
import { TicketService } from 'src/app/data/services/ticket/ticket.service';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrl: './task.component.scss'
})
export class TaskComponent {
    @Input() task!: Task;
    @Output() editTask: EventEmitter<Task> = new EventEmitter();
    @Input() list?: List;

    constructor(public dialog: MatDialog, public tasksService: TicketService) { }

    ngOnInit(): void { }

    handleEditTask(task: TaskSchema) {
        this.editTask.emit(task);
    }

    removeTask(taskId: string): void {
        const dialogRef = this.dialog.open(ModalComponent);
        dialogRef.afterClosed().subscribe((result) => {
            if (this.list) {
                this.tasksService.removeTask(taskId, this.list);
            }
        });
    }
}
