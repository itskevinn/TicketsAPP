import { Component } from '@angular/core';
import { List } from "../../../data/models/ticket/list";
import { TicketService } from "../../../data/services/ticket/ticket.service";
import { ActivatedRoute } from "@angular/router";
import { catchError, map, Subscription } from "rxjs";

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrl: './board.component.scss'
})
export class BoardComponent {
    lists: List[] = [];
    id: string | null = '';
    subscription: Subscription[] = [];

    constructor(private ticketService: TicketService, private route: ActivatedRoute) {
        this.lists = [];
    }

    ngOnInit(): void {
        this.getDataList();
    }

    getDataList(): void {
        let subscription = this.ticketService.getByProject("867206f8-4666-4f6a-5b45-08dc04d7b0af")
            .subscribe(r => {
                if (!r.success) {
                    return;
                }
                this.lists = r.data;
            });
        subscription.add(subscription);
    }
}
