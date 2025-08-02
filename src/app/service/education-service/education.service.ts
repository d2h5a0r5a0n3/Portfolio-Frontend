import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Education } from '../../educations/education';


@Injectable({ providedIn: 'root' })
export class EducationService {
  private apiUrl = 'http://localhost:9091/api/educations';

  constructor(private http: HttpClient) {}

  getEducations(): Observable<Education[]> {
    return this.http.get<Education[]>(this.apiUrl);
  }

  getEducationById(id: number): Observable<Education> {
    return this.http.get<Education>(`${this.apiUrl}/${id}`);
  }

  addEducation(education: Education): Observable<Education> {
    return this.http.post<Education>(this.apiUrl, education, {
      withCredentials: true
    });
  }

  updateEducation(id: number, education: Education): Observable<Education> {
    return this.http.put<Education>(`${this.apiUrl}/${id}`, education, {
      withCredentials: true
    });
  }

  deleteEducation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      withCredentials: true
    });
  }
}