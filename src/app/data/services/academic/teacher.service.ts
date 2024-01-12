import {Injectable} from '@angular/core';
import {catchError, Observable} from "rxjs";
import {Response} from "../../models/response.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Teacher} from "../../models/academic/teacher";
import {Student} from "../../models/academic/student";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private readonly baseUrl = environment.academicBaseUrlV1;

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Response<Teacher[]>> {
    return this.http.get<Response<Student[]>>(`${this.baseUrl}/Teacher/GetAll`)
      .pipe(catchError(err => {
        throw err;
      }));
  }

  public update(teacher: Teacher): Observable<Response<Teacher[]>> {
    return this.http.put<Response<Teacher[]>>(`${this.baseUrl}/Teacher/Update`, teacher)
      .pipe(catchError(err => {
        throw err;
      }))
  }

  public save(teacher: Teacher): Observable<Response<Teacher[]>> {
    return this.http.post<Response<Teacher[]>>(`${this.baseUrl}/Teacher/Create`, teacher)
      .pipe(catchError(err => {
        throw err;
      }))
  }
}
