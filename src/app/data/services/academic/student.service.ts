import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable} from "rxjs";
import {Response} from "../../models/response.model";
import {Student} from "../../models/academic/student";
import {environment} from "../../../../environments/environment";

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
      }))
  }
}