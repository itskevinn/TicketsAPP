import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {Response} from "../../models/response.model";
import {AcademicSubject} from "../../models/academic/academic-subject";

@Injectable({
  providedIn: 'root'
})
export class AcademicSubjectService {
  private readonly baseUrl = environment.academicBaseUrlV1;

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Response<AcademicSubject[]>> {
    return this.http.get<Response<AcademicSubject[]>>(`${this.baseUrl}/Subject/GetAll`)
      .pipe(catchError(err => {
        throw err;
      }));
  }

  public getAllByUser(): Observable<Response<AcademicSubject[]>> {
    return this.http.get<Response<AcademicSubject[]>>(`${this.baseUrl}/Subject/GetAllByUser`)
      .pipe(catchError(err => {
        throw err;
      }));
  }

  public getByCode(subjectCode: string): Observable<Response<AcademicSubject>> {
    return this.http.get<Response<AcademicSubject>>(`${this.baseUrl}/Subject/GetByCode/${subjectCode}`)
      .pipe(catchError(err => {
        throw err;
      }));
  }

  public update(student: AcademicSubject): Observable<Response<AcademicSubject[]>> {
    return this.http.put<Response<AcademicSubject[]>>(`${this.baseUrl}/Subject/Update`, student)
      .pipe(catchError(err => {
        throw err;
      }))
  }

  public save(student: AcademicSubject): Observable<Response<AcademicSubject[]>> {
    return this.http.post<Response<AcademicSubject[]>>(`${this.baseUrl}/Subject/Create`, student)
      .pipe(catchError(err => {
        throw err;
      }))
  }
}
