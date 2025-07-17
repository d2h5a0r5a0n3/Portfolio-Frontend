  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';

  export interface Project {
    id?: number;
    title: string;
    techStack: string;
    description: string;
    github: string;
    demo?: string;
    startDate: Date;
    endDate?: Date;
  }


  @Injectable({ providedIn: 'root' })
  export class ProjectService {
    private apiUrl = 'http://localhost:9091/api/projects';

    constructor(private http: HttpClient) {}

    getProjects(): Observable<Project[]> {
      return this.http.get<Project[]>(this.apiUrl);
    }

    getProjectById(id: number): Observable<Project> {
      return this.http.get<Project>(`${this.apiUrl}/${id}`);
    }

    addProject(project: Project): Observable<Project> {
      return this.http.post<Project>(this.apiUrl, project, {
        withCredentials: true
      });
  }
    

    updateProject(id: number, project: Project): Observable<Project> {
      return this.http.put<Project>(`${this.apiUrl}/${id}`, project,{
        withCredentials:true
      });
    }

    deleteProject(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`,{
        withCredentials:true
      });
    }
  }
