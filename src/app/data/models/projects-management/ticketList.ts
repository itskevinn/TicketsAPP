import {Ticket} from "./ticket";

export interface TicketList {
    id: string;
    name: string;
    tickets: Ticket[];
}