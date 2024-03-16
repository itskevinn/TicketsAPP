import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { catchError, Observable } from "rxjs";
import { Response } from "../../models/response.model";
import { TicketList } from "../../models/projects-management/ticketList";

@Injectable({
    providedIn: 'root'
})
export class TicketService {
    private readonly baseUrl = environment.baseUrlV1;

    constructor(private http: HttpClient) {
    }

    public getByProject(projectId: string): Observable<Response<TicketList[]>> {
        return this.http.get<Response<TicketList[]>>(`${this.baseUrl}/TicketList/GetByProjectId/${projectId}`)
            .pipe(catchError(err => {
                throw err;
            }))
    }
}
