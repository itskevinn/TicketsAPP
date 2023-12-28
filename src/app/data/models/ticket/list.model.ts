import {TaskModel as TicketModel} from "./taskModel";

export interface List {
    id: string;
    name: string;
    tickets: TicketModel[];
}