import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { catchError, Observable } from "rxjs";
import { Response } from "../../models/response.model";
import { List } from "../../models/ticket/list.model";

@Injectable({
    providedIn: 'root'
})
export class TicketService {
    private readonly baseUrl = environment.baseUrlV1;

    constructor(private http: HttpClient) {
    }

    public getByProject(projectId: string): Observable<Response<List[]>> {
        return this.http.get<Response<List[]>>(`${this.baseUrl}/TicketList/GetByProjectId/${projectId}`)
            .pipe(catchError(err => {
                throw err;
            }))
    }
}
