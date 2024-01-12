import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable} from "rxjs";
import {Response} from "../../models/response.model";
import {environment} from "../../../../environments/environment";
import {Student} from "../../models/academic/student";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private readonly baseUrl = environment.academicBaseUrlV1;

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Response<Student[]>> {
    return this.http.get<Response<Student[]>>(`${this.baseUrl}/Student/GetAll`)
      .pipe(catchError(err => {
        throw err;
      }));
  }

  public update(student: Student): Observable<Response<Student[]>> {
    return this.http.put<Response<Student[]>>(`${this.baseUrl}/Student/Update`, student)
      .pipe(catchError(err => {
        throw err;
      }))
  }

  public save(student: Student): Observable<Response<Student[]>> {
    return this.http.post<Response<Student[]>>(`${this.baseUrl}/Student/Create`, student)
      .pipe(catchError(err => {
        throw err;
      }))
  }
}