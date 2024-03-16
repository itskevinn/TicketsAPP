import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {TicketList} from "../../../../data/models/projects-management/ticketList";
import {Ticket} from "../../../../data/models/projects-management/ticket";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.scss'
})
export class TicketListComponent {
  @Input() projectId: string = '';
  @Input() ticketList: TicketList | undefined;
  @Output() editTask: EventEmitter<Ticket> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }
  

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
    if (this.ticketList) {
      ticket.ticketListId = this.ticketList.id;
      this.editTask.emit(ticket);
    }
  }
}
