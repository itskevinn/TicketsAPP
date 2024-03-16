import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {Response} from "../../models/response.model";
import {Ticket} from "../../models/projects-management/ticket";
import {TicketList} from "../../models/projects-management/ticketList";

@Injectable({
  providedIn: 'root'
})
export class TicketListService {

  private readonly baseUrl = environment.baseUrlV1;

  constructor(private http: HttpClient) {
  }

  public getByProjectId(projectId: string): Observable<Response<TicketList[]>> {
    return this.http.get<Response<TicketList[]>>(`${this.baseUrl}/TicketList/GetByProjectId/${projectId}`)
      .pipe(catchError(err => {
        throw err;
      }))
  }
}
