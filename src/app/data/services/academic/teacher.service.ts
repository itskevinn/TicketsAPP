import {Injectable} from '@angular/core';
import {catchError, Observable} from "rxjs";
import {Response} from "../../models/response.model";
import {Student} from "../../models/academic/student";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private readonly baseUrl = environment.academicBaseUrlV1;

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Response<Student[]>> {
    return this.http.get<Response<Student[]>>(`${this.baseUrl}/Teacher/GetAll`)
      .pipe(catchError(err => {
        throw err;
      }))
  }
}
