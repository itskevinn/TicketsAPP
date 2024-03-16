import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {catchError, Observable} from "rxjs";
import {Response} from "../../models/response.model";
import {Ticket} from "../../models/projects-management/ticket";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor() {
  }

}
