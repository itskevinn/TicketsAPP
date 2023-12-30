import {Ticket} from "./ticket";

export interface List {
    id: string;
    name: string;
    tickets: Ticket[];
}