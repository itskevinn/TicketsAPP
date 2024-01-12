import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TicketService} from 'src/app/data/services/ticket/ticket.service';
import {MatDialog} from "@angular/material/dialog";
import {Ticket} from "../../../../data/models/ticket/ticket";
import {tick} from "@angular/core/testing";
import {List} from "../../../../data/models/ticket/list";

@Component({
    selector: 'app-ticket',
    templateUrl: './ticket.component.html',
    styleUrl: './ticket.component.scss'
})
export class TicketComponent {
    @Input() ticket!: Ticket;
    @Output() editTicket: EventEmitter<Ticket> = new EventEmitter();
    @Input() list?: List;
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
        //TODO: método para eliminar ticket
    }

    protected readonly tick = tick;
}
