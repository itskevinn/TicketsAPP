import {Priority} from "./priority";

export interface Ticket {
    id: string;
    description: string;
    allegedSolveDate: string;
    priority: Priority;
    ticketListId: string;
}