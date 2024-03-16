import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TicketListService} from 'src/app/data/services/project-management/ticket-list.service';
import {MatDialog} from "@angular/material/dialog";
import {Ticket} from "../../../../data/models/projects-management/ticket";
import {tick} from "@angular/core/testing";
import {TicketList} from "../../../../data/models/projects-management/ticketList";

@Component({
    selector: 'app-ticket',
    templateUrl: './ticket.component.html',
    styleUrl: './ticket.component.scss'
})
export class TicketComponent {
    @Input() ticket!: Ticket;
    @Output() editTicket: EventEmitter<Ticket> = new EventEmitter();
    @Input() list?: TicketList;
    priorityStyle = "";

    constructor(public dialog: MatDialog, public ticketService: TicketListService) {
    }

    ngOnInit(): void {
        this.priorityStyle = `5px solid ${this.ticket?.priority?.backgroundColor}`
    }

    handleEditTicket(ticket: Ticket) {
        this.editTicket.emit(ticket);
    }

    removeTask(taskId: string): void {
        //TODO: método para eliminar projects-management
    }

    protected readonly tick = tick;
}
