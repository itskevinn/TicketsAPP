import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { TicketList } from "../../../../data/models/projects-management/ticketList";
import { TicketService } from 'src/app/data/services/project-management/ticket.service';
import {Ticket} from "../../../../data/models/projects-management/ticket";

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss'
})
export class ListComponent {
    @Input() list: TicketList | undefined;
    @Output() editTask: EventEmitter<Ticket> = new EventEmitter();

    constructor(public tasksService: TicketService) { }

    ngOnInit(): void { }

    drop(event: CdkDragDrop<Ticket[] | undefined, any>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data!, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                event.container.data!,
                event.previousIndex,
                event.currentIndex);
        }

    }

    handleEdit(ticket: Ticket) {
        if (this.list) {
            ticket.ticketListId = this.list.id;
            this.editTask.emit(ticket);
        }
    }
}
