import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {Response} from "../../models/response.model";
import {TicketList} from "../../models/projects-management/ticketList";
import {Project} from "../../models/projects-management/project.model";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly baseUrl = environment.baseUrlV1;

  constructor(private http: HttpClient) {
  }

  public getAllByUserId(userId: string): Observable<Response<Project[]>> {
    return this.http.get<Response<Project[]>>(`${this.baseUrl}/Project/AllByUserId/${userId}`)
      .pipe(catchError(err => {
        throw err;
      }))
  }

  public save(project: Project): Observable<Response<Project>> {
    return this.http.post<Response<Project>>(`${this.baseUrl}/Project/Create`, project)
      .pipe(catchError(err => {
        throw err;
      }))
  }

  public update(project: Project): Observable<Response<Project>> {
    return this.http.put<Response<Project>>(`${this.baseUrl}/Project/Update`, project)
      .pipe(catchError(err => {
        throw err;
      }))
  }

  public delete(projectId: string): Observable<Response<Project>> {
    return this.http.delete<Response<Project>>(`${this.baseUrl}/Project/Delete/${projectId}`)
      .pipe(catchError(err => {
        throw err;
      }))
  }
}
