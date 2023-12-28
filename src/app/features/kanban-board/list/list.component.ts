import { Component, EventEmitter, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { List } from "../../../data/models/ticket/list.model";
import { TaskModel } from "../../../data/models/ticket/taskModel";
import { TicketService } from 'src/app/data/services/ticket/ticket.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss'
})
export class ListComponent {
    @Input() list: List;
    @Output() editTask: EventEmitter<Task> = new EventEmitter();

    constructor(public tasksService: TicketService) { }

    ngOnInit(): void { }

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
        }

    }

    handleEdit(task: Task) {
        if (this.list) {
            task.listId = this.list.id;
            this.editTask.emit(task);
        }
    }
}
