import {Component, OnDestroy, OnInit} from '@angular/core';
import {TicketList} from "../../../../data/models/projects-management/ticketList";
import {ActivatedRoute} from "@angular/router";
import {TicketListService} from "../../../../data/services/project-management/ticket-list.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit, OnDestroy {
  ticketLists: TicketList[] = [];
  projectId: string = '';
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private ticketListService: TicketListService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getTicketLists();
  }

  getTicketLists(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.projectId = params['projectId'];
    });
    this.ticketListService.getByProjectId(this.projectId).pipe(takeUntil(this.destroy$))
      .subscribe(r => {
        if (!r.success) {
          return;
        }
        this.ticketLists = r.data;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
