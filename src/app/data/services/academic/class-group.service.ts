import {Injectable} from '@angular/core';
import {catchError, Observable} from "rxjs";
import {Response} from "../../models/response.model";
import {HttpClient} from "@angular/common/http";
import {ClassGroup} from "../../models/academic/class-group";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClassGroupService {
  private readonly baseUrl = environment.academicBaseUrlV1;

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Response<ClassGroup[]>> {
    return this.http.get<Response<ClassGroup[]>>(`${this.baseUrl}/ClassGroup/GetAll`)
      .pipe(catchError(err => {
        throw err;
      }));
  }

  public getBySubjectId(subjectId: string): Observable<Response<ClassGroup[]>> {
    return this.http.get<Response<ClassGroup[]>>(`${this.baseUrl}/ClassGroup/GetBySubjectId/${subjectId}`)
      .pipe(catchError(err => {
        throw err;
      }));
  }

  public update(classGroup: ClassGroup): Observable<Response<ClassGroup>> {
    return this.http.put<Response<ClassGroup>>(`${this.baseUrl}/ClassGroup/Update`, classGroup)
      .pipe(catchError(err => {
        throw err;
      }))
  }

  public save(classGroup: ClassGroup): Observable<Response<ClassGroup>> {
    return this.http.post<Response<ClassGroup>>(`${this.baseUrl}/ClassGroup/Create`, classGroup)
      .pipe(catchError(err => {
        throw err;
      }))
  }
}
