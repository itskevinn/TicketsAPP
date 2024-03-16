import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TicketService} from 'src/app/data/services/project-management/ticket.service';
import {MatDialog} from "@angular/material/dialog";
import {Ticket} from "../../../../data/models/projects-management/ticket";
import {tick} from "@angular/core/testing";
import {TicketList} from "../../../../data/models/projects-management/ticketList";

@Component({
    selector: 'app-projects-management',
    templateUrl: './ticket.component.html',
    styleUrl: './projects-management.component.scss'
})
export class TicketComponent {
    @Input() ticket!: Ticket;
    @Output() editTicket: EventEmitter<Ticket> = new EventEmitter();
    @Input() list?: TicketList;
    priorityStyle = "";

    constructor(public dialog: MatDialog, public ticketService: TicketService) {
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
